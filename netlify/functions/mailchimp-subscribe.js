// netlify/functions/mailchimp-subscribe.js
// This is a serverless function that securely handles Mailchimp subscriptions

const https = require('https');

exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    try {
        // Parse the request body
        const { email } = JSON.parse(event.body);

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid email address' })
            };
        }

        // Get Mailchimp credentials from environment variables
        const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
        const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
        const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

        if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
            console.error('Missing Mailchimp configuration');
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Server configuration error' })
            };
        }

        // Prepare the Mailchimp API request
        const data = JSON.stringify({
            email_address: email,
            status: 'subscribed', // Can be 'subscribed' or 'pending' (requires double opt-in)
        });

        const options = {
            hostname: `${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com`,
            port: 443,
            path: `/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'Authorization': `apikey ${MAILCHIMP_API_KEY}`
            }
        };

        // Make the request to Mailchimp
        const mailchimpResponse = await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let responseBody = '';

                res.on('data', (chunk) => {
                    responseBody += chunk;
                });

                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode,
                        body: responseBody
                    });
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.write(data);
            req.end();
        });

        // Handle Mailchimp response
        const mailchimpData = JSON.parse(mailchimpResponse.body);

        if (mailchimpResponse.statusCode === 200) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Successfully subscribed!',
                    email: email
                })
            };
        } else if (mailchimpResponse.statusCode === 400 && mailchimpData.title === 'Member Exists') {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'This email is already subscribed'
                })
            };
        } else {
            console.error('Mailchimp error:', mailchimpData);
            return {
                statusCode: mailchimpResponse.statusCode,
                body: JSON.stringify({
                    message: mailchimpData.detail || 'Subscription failed'
                })
            };
        }

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal server error'
            })
        };
    }
};