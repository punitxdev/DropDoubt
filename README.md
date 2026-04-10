<div align="center">

# ❓ DropDoubt

### _Drop your doubts, get answers, help others_

<br>

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br>

A full-stack **Q&A platform** for students — ask questions, write rich-text answers, upvote the best responses, browse user profiles, and build a community of knowledge sharing. Built with the **MERN** stack featuring smooth Framer Motion animations and a premium glassmorphism UI.

<br>

---

</div>

<br>

## 🎯 Core Features

<table>
<tr>
<td width="50%">

### 💬 Questions & Answers
- **Post questions** with detailed descriptions
- **Rich text editor** (React Quill) for formatted answers
- **Upvote/downvote** system to surface best answers
- **Threaded answers** — multiple responses per question
- **Browse all posts** in a clean question feed

</td>
<td width="50%">

### 👤 Users & Profiles
- **Sign up / Login** with secure bcrypt authentication
- **User profiles** with avatar uploads (Multer)
- **People directory** — discover other users
- **About page** — learn about the platform
- **Persistent sessions** with cookie-based auth

</td>
</tr>
</table>

<br>

## ✨ Highlights

- 🎬 **Smooth Animations** — Framer Motion transitions across pages and components
- 🎨 **Premium UI** — Modern dark glassmorphism design with custom CSS
- 📝 **Rich Text Editor** — Format answers with bold, italics, code blocks, and more
- 📸 **Profile Pictures** — Upload and display custom avatars
- 🔐 **Secure Auth** — Passwords hashed with bcrypt
- 📱 **Responsive** — Works on desktop, tablet, and mobile

<br>

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16+)
- **MongoDB** running locally or a cloud URI

### 1. Clone

```bash
git clone https://github.com/punitxdev/DropDoubt.git
cd DropDoubt
```

### 2. Start Backend

```bash
cd Backend
npm install
node doubtDrop\(Backend\)/server.js
```

### 3. Start Frontend

```bash
# In a new terminal, from project root
cd Frontend
npm install
npm start
```

> Frontend runs on **http://localhost:3000** • Backend API on **http://localhost:5000**

<br>

## 📁 Project Structure

```
📦 DropDoubt
 ┣ 📂 Frontend/                      → React App (CRA)
 ┃  ┗ 📂 src/
 ┃     ┣ 📄 App.js                   → Router & page layout
 ┃     ┗ 📂 frontend/
 ┃        ┣ 📂 JS/
 ┃        ┃  ┣ 🏠 Home/              → Landing & question feed
 ┃        ┃  ┣ 📝 Post/              → Question posting & editor
 ┃        ┃  ┣ 💬 Answers/           → Answer threads per question
 ┃        ┃  ┣ 👤 Profile/           → User profile pages
 ┃        ┃  ┣ 👥 People/            → User directory
 ┃        ┃  ┣ 🔐 Authentication/    → Login & Sign Up
 ┃        ┃  ┣ 🧭 Navbar             → Navigation bar
 ┃        ┃  ┗ 📌 Footer             → Site footer
 ┃        ┣ 📂 css/                  → Component stylesheets
 ┃        ┣ 📂 Contexts/             → React Context providers
 ┃        ┗ 📂 pics/                 → Static images
 ┃
 ┗ 📂 Backend/
    ┗ 📂 doubtDrop(Backend)/
       ┣ 🗄️ server.js               → Express server entry
       ┣ 🔌 db.js                    → MongoDB connection
       ┣ 📂 models/                  → User, Question, Answer schemas
       ┣ 📂 routes/                  → user, question, answer API routes
       ┗ 📂 profilePicUploads/       → Uploaded avatar storage
```

<br>

## 🛠️ Built With

| Layer | Tech | Purpose |
|---|---|---|
| **Frontend** | React 18 (CRA) | Component-based UI |
| **Routing** | React Router v7 | Client-side navigation |
| **Animations** | Framer Motion | Smooth page transitions |
| **Icons** | React Icons | Icon library |
| **Rich Text** | React Quill | Formatted answer editor |
| **Backend** | Node.js + Express 5 | REST API server |
| **Database** | MongoDB + Mongoose | Document storage |
| **Auth** | bcrypt / bcryptjs | Password hashing |
| **Uploads** | Multer | Profile picture handling |

<br>

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

```bash
# Fork → Branch → Commit → Push → PR
git checkout -b feature/search-questions
git commit -m "Add question search functionality"
git push origin feature/search-questions
```

<br>

