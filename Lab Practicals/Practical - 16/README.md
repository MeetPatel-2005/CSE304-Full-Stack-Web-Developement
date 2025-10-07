# Portfolio Contact Form

A modern, professional contact form built with React (Vite) frontend and Node.js + Express backend with email functionality using NodeMailer.

## Features

- ✨ Modern glassmorphic design with animations
- 📱 Fully responsive layout
- ✅ Real-time form validation
- 📧 Professional email templates
- 🚀 Fast Vite development server
- � Error handling and user feedback

## Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Axios

**Backend:**
- Node.js
- Express.js
- NodeMailer
- Gmail SMTP

## Quick Setup

### 1. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in server directory:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Important:** Use Gmail App Password, not your regular password. Enable 2FA and generate an app password from your Google Account settings.

Start the server:
```bash
npm start
```

### 2. Frontend Setup

```bash
cd client/practical16
npm install
npm run dev
```

## Usage

1. Start both backend (port 5000) and frontend (port 5173)
2. Fill out the contact form
3. Emails will be sent to the configured Gmail account
4. Professional HTML email templates included

## Project Structure

```
Practical - 16/
├── client/practical16/     # React frontend
├── server/                 # Express backend
└── README.md              # This file
```

## Email Configuration

The system uses Gmail SMTP with app passwords for secure authentication. All emails are sent with professional HTML templates including contact details and reply buttons.