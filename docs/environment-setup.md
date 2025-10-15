 

## ⚙️ `docs/environment-setup.md`


# 🧩 Environment Setup


This document describes how to configure tools, IDEs, and local services for an efficient development workflow.

---

## 🖥️ System Setup


### macOS (recommended)

1. Install [Homebrew](https://brew.sh/)

2. Install core tools:

### ⚙️ Download and Install NVM 0.40.x
	  
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

#### Add NVM to $PATH in ~/.zshrc (or ~/.bashrc if you are using Bash)

`vi ~/.zsh`
	  
	  export NVM_DIR="$HOME/.nvm"
	  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
	  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
         
#### Source the ~/.zsh file (or close the current terminal and open a new one)

`source ~/.zshrc`

#### Verify the installation

`nvm --version`

### ⚙️ Install Node 20.x with NVM

`nvm install 20`

`nvm use 20` (for current terminal only)

`nvm alias default 20` (globally)

#### Verify the installation

`node -v`

`npm -v`	

### ⚙️ Install Yarn Package Manager 1.22 with NPM

`npm install --global yarn`

#### Verify the installation

`yarn -v`

### ⚙️ Install MySQL 8.4.6 LTS

#### Download the MySQL installer

On the webpage at `https://dev.mysql.com/downloads/mysql/8.4.html` select 

the MySQL Community Server 8.4.6 LTS for macOS:

Select the correct download file for your Mac's processor:
ARM64: If you have an **Apple Silicon Mac (M1, M2, M3, etc.)**. 
x86: If you have an **Intel-based Mac**.

Download the installer without logging in and run the installation, installing the DBS for all users on the machine. You will need to supply a password for the root MySQL user for your local machine. 

It should automatically be started, which you can confirm (or start / stop it) under System Settings: MySQL (probably at the very bottom).

#### Create a devuser

On the command line type `mysql -u root` use the MySQL CLI (entering the root user password -- if mysql is not found you may need to locate the installation directory and add it to your $PATH in .zshrc and run `source .zshrc`)

In the CLI run the command:


CREATE USER 'devuser'@'%' IDENTIFIED BY 'PASSWORD';

GRANT ALL PRIVILEGES ON *.* TO 'devuser'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES

---

Optionally install Docker Desktop
🧰 Editor Setup

Visual Studio Code

Install these recommended extensions:

ESLint — code linting
Prettier — formatting
GraphQL: Language Feature Support
EditorConfig
DotENV
Recommended VSCode settings (.vscode/settings.json):

{

  "editor.formatOnSave": true,

  "eslint.validate": ["typescript", "typescriptreact", "javascript"],

  "files.exclude": {

    "node_modules": true,

    "dist": true,

    "build": true

  }

}

🗄️ Database Setup

Option 1: Local MySQL

#### Create the development database

In the MySQL CLI run the command:

CREATE DATABASE IF NOT EXISTS tarocco_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;


Option 2: Dockerized DB

<!-- TODO -->

docker-compose up -d db

### 🔐 Environment Variables

Run `cp .env.example .env.local` to copy the default development settings into you own environment file and customize is if applicable. This file is defined in `.gitignore`, so it will not be checked into the respository.

#### Example .env.local:

NODE_ENV=development

PORT=3000

DATABASE_URL=mysql://localhost:3306/tarocco_db

GRAPHQL_ENDPOINT=http://localhost:4000/graphql

🧱 Optional Tooling

#### Docker

Containerized environments

https://docs.docker.com/desktop/setup/install/mac-install/

#### MySQL Workbench

GUI for MySQL

#### Postman / Insomnia

Test GraphQL queries

## 🧭 Next Steps

Proceed to Local Development Guide
Learn about Project Architecture
 

---