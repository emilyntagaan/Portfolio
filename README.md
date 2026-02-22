# Emilyn B. Tagaan — IT Portfolio

A personal IT portfolio website for my BS Information Technology course,
specializing in Frontend UI Design.

---

## 🌐 Live Demo
🔗 https://emilyntagaan.netlify.app/

---

## 📋 Project Overview

This portfolio website includes:
- Home section with profile introduction
- About Me section (background, goals, interests)
- Technical Skills section
- Featured Projects with live GitHub API carousel
- Robotics photo gallery ("Robotehcs")
- Contact form with email functionality
- Newsletter subscription

---

## 🔌 APIs Used

| API | Purpose |
|-----|---------|
| **GitHub REST API** | Fetches and displays my public repositories dynamically as a scrollable carousel in the Projects section |
| **EmailJS** | Powers the contact form — sends messages directly to my inbox without needing a backend server |
| **Mailchimp** | Newsletter subscription — collects visitor emails via a Netlify serverless function |

---

## 💳 Transaction Feature

The **Contact Form** (EmailJS) is the main transaction feature.
When a visitor submits the form, the data is sent to EmailJS servers
which deliver it to my email in real time — no backend required.

The **Newsletter Form** (Mailchimp) is the second transaction feature.
When a visitor enters their email and clicks Subscribe, it is sent
to my Mailchimp audience list via a serverless Netlify function.

---

## 🚀 How to Run / View the Project

### Option 1: View Live
Click the Live Demo link above.

### Option 2: Run Locally
1. Clone this repository:
   git clone https://github.com/emilyntagaan/portfolio.git
2. Open the folder
3. Open index.html in your browser

> Note: GitHub API and EmailJS work locally and online.
> The Newsletter (Mailchimp) requires the Netlify deployment to function.

---

## 📁 File Structure

portfolio/
├── index.html
├── styles.css
├── carousel-styles.css
├── script.js
├── api-integration.js
├── netlify.toml
├── netlify/
│   └── functions/
│       └── mailchimp-subscribe.js
├── images/
└── README.md

---

## 🛠️ Technologies Used
HTML5, CSS3, JavaScript, GitHub REST API, EmailJS, Mailchimp, Netlify