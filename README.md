# 🎉 EventEase – Smart Event Management System

EventEase is a full-stack MERN application designed to simplify and enhance event creation, ticketing, and admin management. Built with modern UI/UX using Chakra UI, secure authentication, and real-time features — it's ideal for event organizers and attendees.

---
## 🧱 Tech Stack

| Layer        | Tech Used                          |
|--------------|------------------------------------|
| Frontend     | React, Vite, Chakra UI             |
| Backend      | Node.js, Express.js, MongoDB       |
| Auth         | JWT + Google OAuth + Email Verify  |
| Storage      | Firebase (Event image uploads)     |
| Email        | Nodemailer + HTML Templates        |
| Styling      | Chakra UI + Dark Mode              |
| Extras       | Excel Export, Role-based UI, Admin Panel |

---
## ⚙️ Setup Instructions
### 🔧 Backend

```bash
cd backend
npm install
cp .env.example .env  # fill with your values
npm run dev

cd frontend
npm install
npm run dev

Admin	admin@example.com	admin123
User	user@example.com	user123
