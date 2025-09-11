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

- [ ] Set up CI/CD pipeline (GitHub Actions)

### **Frontend**

- [x] Project setup with Next.js 15 + Tailwind CSS
- [ ] Basic UI for knowledge pages and categories
- [ ] Implement **oauth flow with github**
- [ ] Implement **pages for article crud**
- [ ] Implement **components for article comment crud**
- [ ] Integrate with backend API for data persistence

### **Backend**

- [x] Project setup (FastAPI)
- [x] Database schema for users, articles and comments
- [ ] Set up **graphql schemas** and **mutations** for articles and comments
- [ ] Oauth with github
- [ ] Implement **article CRUD** (read, update, delete)
- [ ] Implement **category CRUD** (read, update, delete)

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
