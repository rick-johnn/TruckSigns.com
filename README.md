# TruckSigns.com

A web application for designing and ordering custom aluminum truck bed advertising signs.

## Features

- **Design Tool**: Fabric.js-based canvas editor for creating custom truck sign designs
  - Add images, text, and shapes
  - Full text formatting (fonts, colors, alignment, styles)
  - Object manipulation (move, resize, rotate, flip, layer ordering)
  - Three sign sizes: Small (48"x18"), Standard (60"x24"), Large (72"x24")

- **Design Management**: Save, load, edit, and delete designs with preview thumbnails

- **Inquiry System**: Submit design inquiries with quantity, timeline, and contact preferences

- **User Authentication**: Registration and login with protected routes

## Tech Stack

- **Frontend**: React 18, React Router DOM
- **Canvas**: Fabric.js
- **Styling**: Tailwind CSS
- **Build**: Vite
- **Email**: EmailJS
- **Deployment**: Docker, Nginx

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173

### Production Build

```bash
npm run build
npm run preview
```

### Docker

```bash
# Production (port 3000)
docker-compose up -d

# Development with hot reload (port 5173)
docker-compose --profile dev up
```

## Project Structure

```
src/
├── components/
│   ├── auth/           # Login, signup, protected routes
│   ├── design-tool/    # Canvas editor components
│   ├── home/           # Landing page sections
│   ├── layout/         # Header, footer, layout wrapper
│   └── ui/             # Reusable UI components
├── context/            # Auth and design state management
├── pages/              # Route pages
└── utils/              # Storage, constants, email service
```

## Configuration

### EmailJS Setup

Edit `src/utils/constants.js` with your EmailJS credentials in the `EMAIL_CONFIG` object:

| Property | Description |
|----------|-------------|
| `serviceId` | Your EmailJS service ID. Found in your EmailJS dashboard under "Email Services". This identifies which email service (Gmail, Outlook, etc.) to use for sending. |
| `templateId` | Your EmailJS template ID. Found under "Email Templates" in your dashboard. This determines the email format and layout. |
| `publicKey` | Your EmailJS public key. Found in "Account" > "API Keys". This authenticates requests from your application. |
| `toEmail` | The destination email address where inquiry submissions will be sent. |

To get these values:
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Add an email service (e.g., Gmail, Outlook)
3. Create an email template for inquiries
4. Copy your credentials from the dashboard

## Notes

This is an MVP with client-side storage (localStorage). Data is not persisted to a backend server.
