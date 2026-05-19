# Assignment 15 - Online Event Registration System

## Problem Statement

Deploy a web application where users can register for an event by submitting their details, which are stored in a cloud-hosted database.

---

# Repository

```text
https://github.com/4SNA/Event-Registration_LP2
```

---

# Technologies Used

- AWS EC2 Ubuntu Instance
- React + Vite Frontend
- Node.js + Express.js Backend
- MongoDB Atlas Database
- PM2 Process Manager
- Git
- npm

---

# Features

- Event registration form
- Store registration details
- Admin dashboard
- Search and filter registrations
- Delete registrations
- MongoDB Atlas cloud database
- Cloud deployment using AWS EC2

---

# Architecture

```text
User Browser
     |
     v
AWS EC2 Instance
     |
     |-- React + Vite Frontend
     |-- Express Backend API (Port 5000)
     |
     v
MongoDB Atlas Database
```

---

# Step 1 - Create AWS EC2 Instance

1. Open AWS Console.
2. Go to EC2.
3. Click Launch Instance.
4. Select Ubuntu 22.04 LTS.
5. Select t2.micro.
6. Create/select key pair.
7. Download `.pem` file.
8. Configure Security Group.

---

# Security Group Inbound Rules

| Type | Port | Source |
|---|---|---|
| SSH | 22 | My IP |
| HTTP | 80 | 0.0.0.0/0 |
| Custom TCP | 5000 | 0.0.0.0/0 |
| Custom TCP | 5173 | 0.0.0.0/0 |

---

# Step 2 - Connect to EC2

Open terminal or PowerShell where `.pem` file exists.

```bash
chmod 400 your-key.pem
```

```bash
ssh -i your-key.pem ubuntu@YOUR_PUBLIC_IP
```

Example:

```bash
ssh -i event.pem ubuntu@15.206.xxx.xxx
```

---

# Step 3 - Update Ubuntu

```bash
sudo apt update
sudo apt upgrade -y
```

---

# Step 4 - Install Node.js, npm, Git and PM2

Install Node.js 20:

```bash
sudo apt install curl -y
```

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
```

```bash
sudo apt install -y nodejs
```

Install Git:

```bash
sudo apt install -y git
```

Install PM2:

```bash
sudo npm install -g pm2
```

Verify:

```bash
node -v
npm -v
git --version
pm2 --version
```

---

# Step 5 - MongoDB Atlas Setup

Use MongoDB Atlas cloud database.

---

# MongoDB Atlas Details

```text
Username: lp2_user
Password: lp2password123
Database Name: event-registration
Cluster Name: Cluster0
```

---

# Atlas Setup Steps

1. Open MongoDB Atlas.
2. Create free M0 cluster.
3. Create database user:
   ```text
   lp2_user
   ```
4. Set password:
   ```text
   lp2password123
   ```
5. Go to:
   ```text
   Network Access
   ```
6. Click:
   ```text
   Add IP Address
   ```
7. Click:
   ```text
   Allow Access From Anywhere
   ```
8. Confirm:
   ```text
   0.0.0.0/0
   ```

MongoDB Atlas automatically creates database `event-registration` after first registration.

---

# Step 6 - Clone Repository

```bash
git clone https://github.com/4SNA/Event-Registration_LP2.git event-registration
```

```bash
cd event-registration
```

Check files:

```bash
ls
```

Expected:

```text
backend
frontend
README.md
```

---

# Step 7 - Backend Setup

Go to backend:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Create backend `.env`:

```bash
nano .env
```

Paste:

```env
PORT=5000
MONGO_URI=
NODE_ENV=production
```

Save:

```text
CTRL + X → Y → Enter
```

Check file:

```bash
cat .env
```

---

# Step 8 - Frontend Setup

Go to frontend:

```bash
cd ../frontend
```

Install frontend dependencies:

```bash
npm install
```

Create frontend `.env`:

```bash
nano .env
```

Paste this after replacing IP:

```env
VITE_API_URL=http://YOUR_PUBLIC_IP:5000
```

Example:

```env
VITE_API_URL=http://15.206.xxx.xxx:5000
```

Save:

```text
CTRL + X → Y → Enter
```

---

# Step 8.1 - Fix localhost API Issue

Search localhost references:

```bash
grep -R "localhost" .
```

If you find:

```text
http://localhost:5000
```

replace with your EC2 public IP.

Example:

```text
http://15.206.xxx.xxx:5000
```

Quick replace:

```bash
grep -rl "localhost:5000" . | xargs sed -i 's|http://localhost:5000|http://YOUR_PUBLIC_IP:5000|g'
```

---

# Step 8.2 - Configure Vite Public Hosting

Open Vite config:

```bash
nano vite.config.js
```

OR:

```bash
nano vite.config.ts
```

Ensure:

```js
server: {
  host: "0.0.0.0",
  port: 5173
}
```

Example:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173
  }
})
```

---

# Step 8.3 - Build Frontend

```bash
npm run build
```

This creates a `dist` folder.

---

# Step 9 - Run Backend Using PM2

Go to backend:

```bash
cd ../backend
```

Check files:

```bash
ls
```

If `server.js` exists:

```bash
pm2 start server.js --name event-registration
```

Save PM2 process:

```bash
pm2 save
```

Check status:

```bash
pm2 list
```

---

# Step 10 - Test Backend Locally

```bash
curl http://localhost:5000
```

If HTML or JSON appears, backend is working.

---

# Step 11 - Run Frontend Publicly

Open another SSH terminal.

Go to frontend:

```bash
cd ~/event-registration/frontend
```

Run frontend:

```bash
npm run dev -- --host 0.0.0.0
```

Expected:

```text
Local:   http://localhost:5173
Network: http://172.xxx.xxx.xxx:5173
```

---

# Step 12 - Open Application Publicly

## Backend / Production App

```text
http://YOUR_PUBLIC_IP:5000
```

---

## Frontend Vite Dev Server

```text
http://YOUR_PUBLIC_IP:5173
```

Example:

```text
http://15.206.xxx.xxx:5173
```

---

# Step 13 - Verify MongoDB Atlas

1. Open MongoDB Atlas.
2. Go to Database.
3. Click Browse Collections.
4. Register for one event using the app.
5. Database `event-registration` should appear.
6. Collection should contain registration documents.

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/registrations | Get all registrations |
| GET | /api/registrations/stats | Get registration stats |
| GET | /api/registrations/:id | Get single registration |
| POST | /api/registrations | Create registration |
| DELETE | /api/registrations/:id | Delete registration |
| GET | /api/health | Health check |

---

# Useful Commands

## Check PM2

```bash
pm2 list
```

---

## View Logs

```bash
pm2 logs event-registration
```

---

## Restart Backend

```bash
pm2 restart event-registration
```

---

## Stop Backend

```bash
pm2 stop event-registration
```

---

## Delete Backend Process

```bash
pm2 delete event-registration
```

---

## Test Backend

```bash
curl http://localhost:5000
```

---

# Common Errors and Fixes

---

## 1. pm2 command not found

```bash
sudo npm install -g pm2
```

---

## 2. Website not opening publicly

Check Security Group.

Required:

| Type | Port |
|---|---|
| Custom TCP | 5000 |
| Custom TCP | 5173 |

Source:

```text
0.0.0.0/0
```

---

## 3. MongoDB Atlas connection failed

Check:

```text
Network Access → 0.0.0.0/0
```

Check `.env`:

```env
MONGO_URI=mongodb+srv://lp2_user:lp2password123@cluster0.tki1kaj.mongodb.net/event-registration?retryWrites=true&w=majority&appName=Cluster0
```

Restart:

```bash
pm2 restart event-registration
pm2 logs event-registration
```

---

## 4. Frontend works only on localhost

Fix Vite config:

```js
server: {
  host: "0.0.0.0",
  port: 5173
}
```

Run:

```bash
npm run dev -- --host 0.0.0.0
```

---

## 5. localhost API issue

Replace:

```text
http://localhost:5000
```

with:

```text
http://YOUR_PUBLIC_IP:5000
```

Also update frontend `.env`:

```env
VITE_API_URL=http://YOUR_PUBLIC_IP:5000
```

---

## 6. EADDRINUSE port 5000 already in use

Fix:

```bash
pm2 delete event-registration
pm2 start server.js --name event-registration
```

---

## 7. Cannot find module

Run:

```bash
npm install
```

inside frontend/backend.

---

## 8. server.js not found

Check:

```bash
ls
```

If app.js exists:

```bash
pm2 start app.js --name event-registration
```

If index.js exists:

```bash
pm2 start index.js --name event-registration
```

---

# Viva Questions

## What is EC2?

AWS virtual machine service used to deploy cloud applications.

---

## What is MongoDB Atlas?

Cloud-hosted MongoDB database service.

---

## What is PM2?

Node.js process manager used to keep backend running continuously.

---

## Why port 5000?

Backend API runs on port 5000.

---

## Why port 5173?

React + Vite frontend runs on port 5173 during development.

---

## What is VITE_API_URL?

Frontend environment variable used to connect React frontend with backend API.

---

## What is Security Group?

AWS firewall that controls inbound and outbound traffic.

---

# Output

The Online Event Registration System is successfully deployed and publicly accessible using:

```text
http://YOUR_PUBLIC_IP:5173
```

or production backend-served app:

```text
http://YOUR_PUBLIC_IP:5000
```

---

# Conclusion

The Online Event Registration System was successfully deployed on AWS EC2 Ubuntu using React + Vite frontend, Node.js/Express backend, and MongoDB Atlas database. Users can register for events and registration data is stored in a cloud-hosted MongoDB Atlas database.
