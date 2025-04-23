# 🌍 Travel Journal MERN App

A full-stack travel journaling application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can register, log in, upload photos, and create journal entries with location, date, and rich descriptions.

##  Features

- User registration & login (with profile pictures)
- JWT-based authentication
- Create and view personal travel journal entries
- Upload multiple images per entry (via Cloudinary)
- Search through journal entries by title, date, or location
- Protected routes (only logged-in users can access main features)

## Tech Stack

- **Frontend**: React.js, Axios, React Router DOM
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Image Storage**: Cloudinary
- **Authentication**: JWT, bcrypt

---

## Getting Started Locally

### 1. Clone the repository

git clone https://github.com/charan819/tarvel-journal-app.git
cd tarvel-journal-app

 Backend Setup
cd backend
npm install

Create a .env file in backend with:

MONGO_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT= port_nuumber

Start the server : node index.js


Frontend Setup

cd ../client
npm install

Create a .env file in client with:

REACT_APP_CLOUD_NAME=your_cloudinary_cloud_name

Start the React app:

npm start
Now visit http://localhost:3000
