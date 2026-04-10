<div align="center">

# DropDoubt

### Centralized platform for academic inquiries and knowledge sharing.

<br>

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br>

A full-stack **Q&A platform** built for collaborative environments. The system enables users to submit detailed inquiries, construct formatted technical responses, evaluate submissions through voting mechanics, and browse profile directories. Developed on the **MERN** stack leveraging optimized data storage and secure routing architectures.

<br>

---

</div>

<br>

## Core Features

<table>
<tr>
<td width="50%">

### Inquiries & Structured Answers
- **Query Posting**: Submit questions alongside descriptive contextual breakdowns.
- **Rich Text Integration**: Leverages React Quill facilitating code blocks, bold strings, and formatted answers.
- **Evaluation Engine**: Upvote and downvote systems filtering the most optimal technical responses automatically.
- **Threaded Architecture**: Multiple independent response threads attached sequentially per question.
- **Aggregated Feeds**: Clean interface browsing all submitted active platform queries.

</td>
<td width="50%">

### User Authentication & Profiles
- **Encrypted Entry**: Sign up and login pathways fortified via strict bcrypt authentication algorithms.
- **Profile Configuration**: Individual user mapping encompassing Multer-based image integration.
- **Global Directory**: Browse an aggregated list mapping active system users.
- **Persistent Operations**: Continual session maintenance utilizing structured cookie authorization.

</td>
</tr>
</table>

<br>

## Operational Highlights

- **Dynamic Navigation Transitions**: Framer Motion implementations maintaining fluid page mappings.
- **Modern Interface Execution**: Responsive custom CSS structuring focusing on minimal overlapping components.
- **Secure Handling**: Complete password hashing resolving directly to backend nodes via bcrypt.
- **Responsive Architecture**: Interfaces scale and adjust appropriately spanning desktop and mobile viewports.

<br>

## Quick Start

### Prerequisites
- **Node.js** (v16+ required for optimal module parsing)
- **MongoDB** (Executing local instance or valid cloud URI string)

### 1. Repository Configuration

```bash
git clone https://github.com/punitxdev/DropDoubt.git
cd DropDoubt
```

### 2. Initialize Backend Operations

```bash
cd Backend
npm install
node doubtDrop\(Backend\)/server.js
```

### 3. Initialize Frontend Assembly

```bash
# Execute within a secondary terminal context relative to root:
cd Frontend
npm install
npm start
```

> **Frontend Deployment:** http://localhost:3000 • **Backend API Binding:** http://localhost:5000

<br>

## Project Structure

```text
DropDoubt
 ├── Frontend/                      → React SPA Implementation (CRA)
 │  └── src/
 │     ├── App.js                   → Router integration and layout definitions
 │     └── frontend/
 │        ├── JS/
 │        │  ├── Home/              → Landing index and query feed
 │        │  ├── Post/              → Query submission block and editor implementation
 │        │  ├── Answers/           → Threaded operational response sequences
 │        │  ├── Profile/           → User-specific structural properties
 │        │  ├── People/            → Global directory arrays
 │        │  ├── Authentication/    → Security and authorization pathways
 │        │  ├── Navbar             → Primary directional framework
 │        │  └── Footer             → Persistent presentation footer
 │        ├── css/                  → Component-based scoped layouts
 │        ├── Contexts/             → Global React Context parameter definitions
 │        └── pics/                 → Defined static assets
 │
 └── Backend/
    └── doubtDrop(Backend)/
       ├── server.js               → Primary Express runtime entry node
       ├── db.js                    → External Mongoose database initialization
       ├── models/                  → Pre-mapped structural schemas (User, Question, Answer)
       ├── routes/                  → Network routing logic nodes (User API, queries)
       └── profilePicUploads/       → Designated Multer write target for avatar arrays
```

<br>

## Built With

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 (CRA) | Component-centric UI rendering logic |
| **Routing** | React Router v7 | Structured client-side navigational pathing |
| **Animations** | Framer Motion | Smooth transitional component implementations |
| **Icons** | React Icons | Icon library component representations |
| **Rich Text** | React Quill | Formatted editor parsing properties |
| **Backend** | Node.js + Express 5 | Scalable REST API gateway routing |
| **Database** | MongoDB + Mongoose | Active document-oriented NoSQL storage |
| **Security** | bcrypt / bcryptjs | Cryptographic hashing mapping representations |
| **Uploads** | Multer | File processing mapping structure |

<br>

## Contributing

Structural revisions expanding queries architectures and general platform additions are highly encouraged.

```bash
git checkout -b feature/search-questions
git commit -m "Initialize structural question search functions"
git push origin feature/search-questions
```

<br>
