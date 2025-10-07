# DEVELOPMENT SETUP INSTRUCTIONS

## Quick Start
1. Open 2 terminal windows

### Terminal 1 - Backend Server
```bash
cd server
npm install
npm start
```

### Terminal 2 - Frontend Server  
```bash
cd client/practical17
npm install
npm run dev
```

2. Open browser at http://localhost:5173

## MongoDB Setup Options

### Option 1: Local MongoDB (Recommended for Development)
1. Install MongoDB locally
2. Start MongoDB service
3. Backend will connect to: mongodb://localhost:27017/tuition_admin

### Option 2: MongoDB Atlas (Cloud)
1. Create MongoDB Atlas account
2. Create a cluster
3. Get connection string
4. Update .env file in server folder:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tuition_admin
   ```

## Features to Test
- ✅ Add new students
- ✅ View all students in table
- ✅ Search students by name/email/phone
- ✅ Filter students by course
- ✅ Edit student information
- ✅ Delete students (with confirmation)
- ✅ Responsive design (try on mobile)
- ✅ Form validation
- ✅ Toast notifications
- ✅ Loading states

## Troubleshooting

### Common Issues:
1. **CORS errors**: Make sure backend server is running on port 5000
2. **MongoDB connection**: Check if MongoDB is running locally
3. **Port conflicts**: Make sure ports 5000 and 5173 are free
4. **Module errors**: Run `npm install` in both server and client folders

### API Testing:
- GET http://localhost:5000 (server info)
- GET http://localhost:5000/api/students (all students)
- POST http://localhost:5000/api/students (create student)

## Tech Stack Summary
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React 18, Vite, Tailwind CSS, Axios
- **UI Library**: Lucide React (icons), React Hot Toast (notifications)
- **Styling**: Tailwind CSS with Glassmorphism design