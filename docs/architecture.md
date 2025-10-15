# 🏗️ Architecture Overview

 

This document describes the overall architecture of the project, its major components, and how they interact.

 

---

 

## 🧱 Tech Stack

 

| Layer | Technology |

|--------|-------------|

| Frontend | React 19 + TypeScript |

| Backend | Node.js 20 (Express 5/ Apollo Server) |

| API | GraphQL 16|

| Database | MySQL 8 |

| Tooling | pnpm (TBD), ESLint, Prettier, Docker |

 
---

## 🧩 Directory Structure

### Frontend

tarocco-frontend/
│
├── public/                      # Static assets served as-is (e.g. favicon, robots.txt)
│   ├── favicon.ico
│   ├── manifest.json
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── App.jsx              # Root component
│   │   ├── App.css
│   │   └── routes.jsx           # Route configuration
│   │
│   ├── components/              # Reusable UI components
│   │   ├── common/              # Buttons, modals, inputs, etc.
│   │   ├── layout/              # Header, Footer, Sidebar
│   │   └── cards/               # Domain-specific components
│   │
│   ├── features/                # Redux Toolkit feature slices or domain-specific logic
│   │   ├── auth/
│   │   │   ├── AuthSlice.js
│   │   │   └── LoginForm.jsx
│   │   └── users/
│   │       ├── UserSlice.js
│   │       └── UserList.jsx
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   │
│   ├── pages/                   # Route-based page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── services/                # API clients or data fetching logic
│   │   ├── apiClient.js         # Axios or Fetch wrapper
│   │   └── userService.js
│   │
│   ├── store/                   # Redux store or Zustand/Recoil setup
│   │   ├── store.js
│   │   └── rootReducer.js
│   │
│   ├── styles/                  # Global CSS / SCSS / Tailwind configs
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   ├── utils/                   # Helper functions, constants, formatters
│   │   ├── formatDate.js
│   │   └── constants.js
│   │
│   ├── index.jsx                # Entry point for ReactDOM.createRoot()
│   └── main.jsx                 # Vite entry or router setup (if separated)
│
├── .env                         # Environment variables
├── .eslintrc.cjs                # Linter config
├── .prettierrc                  # Code formatting rules
├── vite.config.js               # or webpack.config.js
├── package.json
└── README.md


### Backend

tarocco-backend/
│
├── src/
│   ├── app.js                     # Express app initialization
│   ├── server.js                  # Entry point (loads app, starts server)
│   │
│   ├── config/                    # Configuration and environment management
│   │   ├── config.js              # Global config loader (dotenv, env vars)
│   │   ├── database.js            # Sequelize init & connection setup
│   │   └── logger.js              # Winston or Pino logger
│   │
│   ├── models/                    # Sequelize models (one per table)
│   │   ├── index.js               # Model registration & associations
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   └── ...
│   │
│   ├── graphql/                   # GraphQL setup
│   │   ├── schema/
│   │   │   ├── typeDefs/          # Modular SDL files
│   │   │   │   ├── user.graphql
│   │   │   │   └── post.graphql
│   │   │   └── resolvers/         # Resolver implementations
│   │   │       ├── user.resolver.js
│   │   │       └── post.resolver.js
│   │   ├── context.js             # Auth, loaders, and per-request context
│   │   └── index.js               # Schema merging and ApolloServer setup
│   │
│   ├── routes/                    # REST endpoints (if hybrid GraphQL + REST)
│   │   ├── index.js
│   │   └── health.route.js
│   │
│   ├── controllers/               # REST controllers (optional)
│   │   ├── user.controller.js
│   │   └── post.controller.js
│   │
│   ├── services/                  # Business logic (used by resolvers/controllers)
│   │   ├── user.service.js
│   │   └── post.service.js
│   │
│   ├── repositories/              # Sequelize data access logic
│   │   ├── user.repository.js
│   │   └── post.repository.js
│   │
│   ├── middlewares/               # Express middlewares (auth, error handling)
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── utils/                     # Helper functions and shared utilities
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   └── errorHandler.js
│   │
│   ├── loaders/                   # App initialization modules
│   │   ├── expressLoader.js
│   │   ├── graphqlLoader.js
│   │   └── sequelizeLoader.js
│   │
│   └── tests/                     # Jest / Mocha / Supertest specs
│       ├── unit/
│       │   ├── user.service.test.js
│       │   └── post.resolver.test.js
│       └── integration/
│           └── graphql.api.test.js
│
├── migrations/                    # Sequelize CLI migrations
│   ├── 20251015-create-user.js
│   └── 20251015-create-post.js
│
├── seeders/                       # Sequelize seed data
│   ├── 20251015-demo-users.js
│   └── 20251015-demo-posts.js
│
├── .env                           # Environment variables (ignored by git)
├── .env.example                   # Template for environment variables
├── .sequelizerc                   # Sequelize CLI path config
├── package.json
├── README.md
└── Dockerfile / docker-compose.yml


---

## 🔁 Data Flow

1. **React UI** triggers GraphQL queries/mutations.

2. **Apollo Client** sends requests to the backend endpoint (`/graphql`).

3. **Apollo Server** processes requests, resolving data via resolvers.

4. **Resolvers** access PostgreSQL via ORM or query builder.

5. **Response** returns JSON to the frontend.

 
```mermaid

sequenceDiagram

  React ->> Apollo Client: Query (e.g., getUser)

  Apollo Client ->> GraphQL Server: POST /graphql

  GraphQL Server ->> Resolver: resolve(getUser)

  Resolver ->> Database: SELECT * FROM users WHERE id = $id

  Database -->> Resolver: User object

  Resolver -->> GraphQL Server: Data

  GraphQL Server -->> React: JSON Response

🧠 Design Principles

Component-driven UI architecture
Type safety from front to back (TypeScript + GraphQL Codegen)
Single source of truth for schema (schema.graphql)
Declarative data fetching with Apollo hooks
🚀 Deployment

<!-- TODO: TBD >
Frontend: Deployed via Vercel(?) / Netlify(?)
Backend: Deployed via Docker + Railway(?) / AWS(?) / Render(?)
Database: Managed MySQL instance
📚 Related Docs

Local Development Guide
Environment Setup
Troubleshooting Guide
 