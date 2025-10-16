# NowShare

![License](https://img.shields.io/badge/license-MIT-blue) ![Python](https://img.shields.io/badge/python-3.11%2B-blue?logo=python) ![FastAPI](https://img.shields.io/badge/FastAPI-0.110%2B-green?logo=fastapi) ![Strawberry](https://img.shields.io/badge/Strawberry-GraphQL-ff5a5f?logo=strawberry) ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088ff?logo=githubactions) ![Docker Swarm](https://img.shields.io/badge/Docker%20Swarm-Orchestration-2496ed?logo=docker)

[NowShare](https://nowshare.luis0ares.com) is a modern **knowledge sharing platform**, enabling communities to create, share, and discuss content efficiently.
This project is structured as a **monorepo**, containing both **backend** and **frontend** applications.

> _Note: This is a side project developed for learning and experimentation purposes._

---

## 🛠 Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** FastAPI & Strawberry (Python)
- **Database:** PostgreSQL (SQLAlchemy)
- **Testing:** Pytest, FastAPI TestClient
- **CI/CD:** GitHub Actions
- **Deployment:** Docker Swarm

---

## ✅ To-Do List

- [x] Set up CI/CD pipeline (GitHub Actions)

### **Frontend**

- [x] Project setup with Next.js 15 + Tailwind CSS
- [x] Basic UI for knowledge pages
- [x] Implement **oauth flow with github**
- [x] Implement **pages for article crud**
- [x] Implement **components for article comment crud**
- [x] Integrate with backend API for data persistence

### **Backend**

- [x] Project setup (FastAPI)
- [x] Database schema for users, articles and comments
- [x] Set up **graphql schemas** and **mutations** for articles and comments
- [x] Oauth with github
- [x] Implement **article CRUD** (read, update, delete)
- [x] Implement **user comment CRUD** (read, update, delete)
- [ ] Tests

---

## ▶️ Getting Started

### **Clone the repository**

```bash
git clone https://github.com/your-username/knowledge-platform.git
cd knowledge-platform
```

### **Install dependencies and run applications**

For **frontend**:

```bash
cd frontend
npm install
npm run dev
```

For **backend**:

First, install [Poetry](https://python-poetry.org/docs/#installation), then install the project dependencies:

```bash
cd backend
poetry install
poetry run task run
```

---

## 📜 Changelog

### **v0.1.0 - Initial Setup**

- ✅ Created monorepo structure
- ✅ Initialized frontend with Next.js and Tailwind CSS
- ✅ Initialized backend with FastAPI & Strawberry
- ✅ Created basic project structure
- ✅ Set up basic backend project configuration and dependencies
- ✅ CI/CD pipelines for frontend and backend applications
- ✅ Project entities created
- ✅ Alembic setup with first migration
- ✅ REST API endpoints to handle github oauth, logout and token refresh
- ✅ GraphQL queries and mutations for user, articles and comments

### **v1.0.0 - Frontend Integration**

- ✅ Apollo client (graphql) configured
- ✅ Navbar and articles listing
- ✅ Article inspect using tailwind prose to render article content formated in markdown
- ✅ Theme toggle and code highlight for article content
- ✅ Page to create articles using rich markdown editior with preview and fullscreen mode
- ✅ Oauth flow with api implemented, custom hook to get user data stored in the context api, component to control interface rendering only when user is authenticated
- ✅ Custom Apollo link to refresh access token and retry request when the access token expires (if the request fails again, the user session is terminated)
- ✅ Page to list all articles owned by the current user and actions to edit the article and also delete
- ✅ Articles comments implemented