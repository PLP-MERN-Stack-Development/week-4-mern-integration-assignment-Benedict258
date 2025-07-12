# 📰 MERN Stack Blog Platform

A full-stack **blog management system** built with the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. It supports user authentication, post CRUD operations, categories, comments, and a clean modern UI.

---

## 🚀 Project Overview

This platform allows users to:
- ✅ Register & Login
- ✍️ Create, Read, Update, Delete (CRUD) blog posts
- 📁 Organize posts by category
- 💬 Comment on blog posts
- 🔍 Search posts by title/content
- 📄 Paginate posts for better performance

---

## 🌟 Features

### 🧩 Core Features
- **User Authentication** – Secure login, JWT tokens
- **Blog Management** – Create, edit, delete your blog posts
- **Categories** – Classify posts by categories
- **Comments** – Comment on posts as an authenticated user
- **Search & Filter** – Search posts by keywords or filter by category
- **Pagination** – Loads posts efficiently
- **Responsive UI** – Works on both mobile and desktop

### 🚀 Advanced Features
- **User Profile Page** – View your posts
- **Draft System** *(Optional)*
- **Optimistic UI** – Powered by React Query
- **Form Validation** – Frontend & backend validation
- **Security** – Protected routes, hashed passwords, CORS, Helmet

---

## 🛠️ Tech Stack

### 🔧 Backend
- **Node.js**, **Express.js**
- **MongoDB**, **Mongoose**
- **JWT**, **Bcrypt**, **Joi**, **Helmet**

### 🎨 Frontend
- **React.js** (with **Vite**)
- **React Router DOM**, **React Query**
- **Tailwind CSS**, **Lucide Icons**
- **React Hook Form**, **Axios**

---

## 📁 Project Structure

mern-blog/
├── client/ # React Frontend
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── hooks/
│ ├── services/
│ └── App.jsx
├── server/ # Express Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
└── README.md

yaml
Copy
Edit

---

## ⚙️ Getting Started

### ✅ Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 📦 Installation

```bash
git clone https://github.com/yourusername/mern-blog.git
cd mern-blog

# Install all dependencies
npm install
npm run install-server
npm run install-client
⚙️ Environment Setup
📁 /server/.env
ini
Copy
Edit
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
📁 /client/.env
bash
Copy
Edit
VITE_API_URL=http://localhost:5000/api
🧪 Running the App
bash
Copy
Edit
# Start fullstack dev server
npm run dev

# Or run client and server separately
npm run server
npm run client
Frontend: http://localhost:3000

Backend: http://localhost:5000/api

🔗 API Endpoints
🔐 Auth Routes
POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

📘 Post Routes
GET /api/posts

GET /api/posts/:id

POST /api/posts

PUT /api/posts/:id

DELETE /api/posts/:id

POST /api/posts/:id/comments

🗂 Category Routes
GET /api/categories

POST /api/categories

PUT /api/categories/:id

DELETE /api/categories/:id

📚 Database Schemas
👤 User Model
js
Copy
Edit
{
  name, email, password (hashed), role, avatar
}
📝 Post Model
js
Copy
Edit
{
  title, content, author, category, tags, views, comments
}
🏷 Category Model
js
Copy
Edit
{
  name, color, description
}
🧩 UI Components & Pages
Components
PostForm, PostCard, CommentSection, Layout, Header, ProtectedRoute

Pages
/ – Home

/posts/:id – Post Detail

/create – Create Post

/edit/:id – Edit Post

/profile – My Posts

/login & /register

🔐 Security
JWT Authentication

Bcrypt for password hashing

Input validation (Joi)

Helmet (Security Headers)

CORS Configuration

Protected backend routes

🚀 Deployment
Backend
Deploy on Render, Railway, or Heroku

Use MongoDB Atlas

Set env vars in dashboard

Frontend
Build: npm run build

Deploy to Netlify, Vercel, or S3

Configure VITE_API_URL for production

🤝 Contribution
bash
Copy
Edit
# Fork and clone
git checkout -b feature-name
git commit -m "New feature"
git push origin feature-name
Create a pull request 🚀