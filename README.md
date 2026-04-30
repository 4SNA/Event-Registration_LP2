# Online Event Registration System — MERN Stack

A full-stack MERN application for registering users for tech events. Registrations are stored in a cloud-hosted MongoDB Atlas database.

## 🏗️ Tech Stack

| Layer     | Technology                  |
| --------- | --------------------------- |
| Frontend  | React + Vite                |
| Backend   | Node.js + Express           |
| Database  | MongoDB Atlas (Cloud)       |
| Styling   | Vanilla CSS (Dark Theme)    |
| Deploy    | AWS EC2                     |

## 📁 Project Structure

```
event-registration/
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── models/Registration.js # Mongoose schema
│   ├── routes/registrations.js # CRUD API routes
│   ├── server.js              # Express entry point
│   ├── .env                   # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Navbar, Footer
│   │   ├── pages/             # HomePage, RegisterPage, AdminPage
│   │   ├── App.jsx            # Router setup
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Design system
│   ├── .env                   # API URL config
│   └── package.json
└── README.md
```

## 🚀 Local Development

### 1. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or `0.0.0.0/0` for development)
5. Get your connection string

### 2. Configure Backend

```bash
cd event-registration/backend
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/event-registration?retryWrites=true&w=majority
NODE_ENV=development
```

Install and start:
```bash
npm install
npm run dev
```

### 3. Configure Frontend

```bash
cd event-registration/frontend
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000
```

Install and start:
```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, Backend on `http://localhost:5000`

---

## ☁️ AWS EC2 Deployment Guide

### Step 1: Launch EC2 Instance

- AMI: **Ubuntu 22.04 LTS**
- Instance type: **t2.micro** (free tier)
- Security Group: Open ports **22 (SSH)**, **5000 (Backend/App)**
- Create/download your `.pem` key pair

### Step 2: Connect to EC2

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@<YOUR_EC2_PUBLIC_IP>
```

### Step 3: Install Dependencies on EC2

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node -v
npm -v

# Install Git
sudo apt install -y git

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 4: Clone & Setup Project

```bash
cd ~
git clone <YOUR_GITHUB_REPO_URL> event-registration
cd event-registration
```

### Step 5: Configure Backend

```bash
cd backend
npm install

# Create .env file
nano .env
```

Paste:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/event-registration?retryWrites=true&w=majority
NODE_ENV=production
```

### Step 6: Build Frontend

```bash
cd ../frontend
npm install

# Set the API URL to your EC2 public IP
echo "VITE_API_URL=http://<YOUR_EC2_PUBLIC_IP>:5000" > .env

# Build for production
npm run build
```

### Step 7: Start Backend with PM2

```bash
cd ../backend
pm2 start server.js --name event-registration
pm2 save
pm2 startup   # follow the printed command to auto-start on reboot
```

### Step 8: Access the Application

Open your browser:
```
http://<YOUR_EC2_PUBLIC_IP>:5000
```

The backend serves the React build in production mode.

---

## 📡 API Endpoints

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| GET    | `/api/registrations`      | Get all registrations    |
| GET    | `/api/registrations/stats`| Get registration stats   |
| GET    | `/api/registrations/:id`  | Get single registration  |
| POST   | `/api/registrations`      | Create new registration  |
| DELETE | `/api/registrations/:id`  | Delete a registration    |
| GET    | `/api/health`             | Health check             |

### POST `/api/registrations` — Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "event": "Tech Conference 2026",
  "organization": "ACME Corp",
  "dietaryPreference": "vegetarian",
  "additionalNotes": "Need wheelchair access"
}
```

---

## 🔒 MongoDB Atlas — Whitelist EC2 IP

In MongoDB Atlas → Network Access → Add your EC2's public IP, or `0.0.0.0/0` (allow from anywhere) for testing.

## 📝 Key Features

- ✅ Event registration with form validation
- ✅ Duplicate registration prevention (same email + event)
- ✅ Admin dashboard with statistics & analytics
- ✅ Search & filter registrations
- ✅ Delete registrations
- ✅ Responsive dark-themed UI
- ✅ Cloud-hosted database (MongoDB Atlas)
- ✅ Production-ready with PM2 process manager
- ✅ Single-server deployment (backend serves frontend build)
