# Basil Moolman - Business Profile Website

This is a full-stack web application designed for a premium steel fabrication business.

## Features
- **Responsive Design**: Adapts beautifully to mobile phones, tablets, desktops, and ultrawide monitors.
- **Modern UI**: Clean, intuitive layout emphasizing the company's steelwork portfolio.
- **SEO Optimized**: Includes meta tags, semantic HTML5 structure, and image `alt` attributes.
- **Contact Form Integration**: Configured to send an email upon form submission.

## File Structure
- `public/`: The frontend application
  - `index.html`: The landing/overview page.
  - `about.html`: Company history and values.
  - `services.html`: Detailed product showcase.
  - `contact.html`: Dedicated contact page.
  - `css/style.css`: Global stylesheet.
  - `js/main.js`: Interactivity and form handling.
  - `images/`: Stores the project imagery.
- `server.js`: Express.js backend for serving the site and handling emails.
- `package.json`: Node dependencies.

## How to Run

### Option 1: Static Viewing (No Backend Required)
You can simply open the `public/index.html` file in any modern web browser to view the website instantly. The contact form will simulate a successful submission.

### Option 2: Full Stack (With Email Functionality)
To utilize the contact form to actually send emails to your inbox, you will need Node.js installed.

1. Open your terminal in this directory.
2. Run `npm install` to install dependencies (Express, Nodemailer).
3. Create a `.env` file in the root directory with your email credentials:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   CONTACT_EMAIL=info@basilmoolman.com
   PORT=3000
   ```
4. Run `npm start` to launch the server.
5. Open `http://localhost:3000` in your browser.
