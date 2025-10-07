# Tuition Class Admin Panel - MERN Stack Application

A full-stack web application for managing tuition class students, built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

### Backend (Server)
- **RESTful API** with Express.js
- **MongoDB** integration with Mongoose ODM
- **Full CRUD Operations** for student management
- **Data Validation** with express-validator
- **Error Handling** with detailed error responses
- **CORS Configuration** for frontend integration
- **MVC Architecture** for clean code organization

### Frontend (Client)  
- **React 18** with modern hooks
- **React Router DOM** for navigation
- **Tailwind CSS** for beautiful styling
- **Glassmorphism Design** with modern UI elements
- **Responsive Layout** for all devices
- **Real-time Notifications** with react-hot-toast
- **Form Validation** with user-friendly error messages
- **Loading States** and smooth animations

## 📁 Project Structure

```
Practical - 17/
├── server/                  # Backend (Node.js + Express)
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   ├── controllers/
│   │   └── studentController.js
│   ├── models/
│   │   └── Student.js      # Student schema
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── .env               # Environment variables
│   ├── package.json
│   └── server.js          # Entry point
├── client/
│   └── practical17/       # Frontend (React + Vite)
│       ├── src/
│       │   ├── api/
│       │   │   └── studentAPI.js
│       │   ├── components/
│       │   │   ├── Navbar.jsx
│       │   │   ├── LoadingSpinner.jsx
│       │   │   └── ConfirmationModal.jsx
│       │   ├── pages/
│       │   │   ├── StudentList.jsx
│       │   │   ├── AddStudent.jsx
│       │   │   └── EditStudent.jsx
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── index.css
│       ├── index.html
│       ├── package.json
│       └── tailwind.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Backend Setup
1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/tuition_admin
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   # or for development with auto-restart
   npm run dev
   ```

### Frontend Setup
1. Navigate to client directory:
   ```bash
   cd client/practical17
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get single student |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

## 🎯 Usage

1. **Start both servers** (backend on port 5000, frontend on port 5173)
2. **Open browser** and navigate to `http://localhost:5173`
3. **Add students** using the "Add New Student" button
4. **View all students** in the responsive table
5. **Edit student information** using the edit button
6. **Delete students** with confirmation modal
7. **Search and filter** students by name, email, phone, or course

## 🎨 Features Showcase

### Student Management
- ✅ **Add Student**: Complete form with validation
- ✅ **View Students**: Beautiful table with search and filters
- ✅ **Edit Student**: Modal form with pre-filled data
- ✅ **Delete Student**: Confirmation modal with loading states

### UI/UX Features
- 🎨 **Glassmorphism Design**: Modern glass-like effects
- 📱 **Responsive Layout**: Works on all screen sizes
- 🔍 **Search Functionality**: Real-time search across all fields
- 🎯 **Filter by Course**: Dropdown filter for courses
- 🎭 **Smooth Animations**: Fade-in, slide-up, bounce effects
- 🔔 **Toast Notifications**: Success/error messages
- ⚡ **Loading States**: Spinners and loading indicators

### Data Validation
- **Frontend**: Real-time form validation with error messages
- **Backend**: Server-side validation with express-validator
- **Database**: Mongoose schema validation

## 🔧 Technical Details

### Backend Technologies
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **express-validator**: Input validation

### Frontend Technologies
- **React 18**: UI library
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS framework
- **React Hot Toast**: Toast notifications
- **Lucide React**: Beautiful icons
- **Vite**: Build tool and dev server

### Styling Approach
- **Tailwind CSS**: Utility classes
- **Custom Components**: Reusable styled components
- **Glassmorphism**: Modern glass effect design
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: CSS transitions and keyframes

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use local MongoDB
2. Update environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3

## 📝 Environment Variables

### Server `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/tuition_admin
PORT=5000
NODE_ENV=development
```

## 🎓 Student Schema

```javascript
{
  name: String (required, 2-50 chars, letters only),
  email: String (required, unique, valid email),
  phone: String (required, 10 digits),
  course: String (required, enum values),
  fees: Number (required, 0-100000),
  dateOfAdmission: Date (required, not future),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🏆 Project Highlights

- ✨ **Production-Ready**: Clean code, error handling, validation
- 🎨 **Modern Design**: Glassmorphism UI with smooth animations
- 📱 **Fully Responsive**: Works perfectly on all devices
- 🔒 **Data Validation**: Both client and server-side validation
- 🚀 **Performance Optimized**: Efficient API calls and state management
- 📚 **Well Documented**: Comprehensive comments and documentation
- 🔧 **Scalable Architecture**: MVC pattern, modular components

## 👨‍💻 Author

**Meet Patel**
- Student ID: TY - Sem 5
- Course: CSE304 Full Stack Development
- Project: Lab Practical - 17

---

**🎯 This project demonstrates proficiency in the MERN stack and modern web development practices.**