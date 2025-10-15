# 🧑‍💻 Tarocco Frontend Local Development Guide

 

This guide walks you through setting up the local development environment for the React 19 + GraphQL + SQL project.

Since all developers in the Tarocco project are currenly usings macOS, all of the instructions here are for Mac using zsh. 
If you are using a different OS or shell, please find installation instructions for Linux or Windows (or Bash) and create 
a pull request to update this guide. 

---

## ⚙️ Prerequisites

In the `localdev` environment will will be using the following tools and versions:

| Tool | Recommended Version | Purpose |

|------|----------------------|----------|

| [NVM](https://nvmnode.com) | ≥ 0.40.x | Version Management |

<!-- TODO: Use PNMN? -->
| [pnpm](https://pnpm.io/) | ≥ 9.x | Package manager |

| [MySQL](https://www.mysql.com/) | MySQL Community Server 8.4.6 LTS  | Database |

| [Node.js](https://nodejs.org/) | ≥ 20.x | Runtime |

| [Git](https://git-scm.com/) | ≥ 2.39 | Version control |

| [Yarn](https://yarnpkg.com/) | ≥ 1.22.x | Version control |

| [Docker](https://www.docker.com/) *(optional)* | latest | Containerized services |

## See the ENVIRONMENT SETUP GUIDE FOR DETAILED INSTALLATION INSTRUCTIONS (environment-setup.md)

## 🏗️ Initial Setup 

1. **Clone the repository**

   ```git clone https://github.com/renerr23/tarocco-frontend.git

      cd tarocco-frontend```

2. **Install dependencies**
	`yarn install`

	or 

	`npm install`

3. **Set up environment variables**  
	`cp .env.example .env.local`

4. **Edit .env.local with your local credentials**

`DATABASE_URL=mysql://localhost:3306/tarocco_db`

`GRAPHQL_ENDPOINT=http://localhost:4000/graphql`

5. Start the local database (optional)
   `docker-compose up -d db`

6. **Run the backend**
  <!-- TODO -->
  pnpm dev:server

7. **Run the React frontend**
  <!-- TODO -->
  pnpm dev:web
