# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js (MERN stack). This application demonstrates seamless integration between front-end and back-end components, including database operations, API communication, and state management.

## 🚀 Features

### Core Features
- **User Authentication**: Registration, login, and protected routes
- **Blog Management**: Create, read, update, and delete blog posts
- **Category System**: Organize posts by categories
- **Comment System**: Users can comment on blog posts
- **Search & Filter**: Search posts by title/content and filter by category
- **Pagination**: Efficient loading of posts with pagination
- **Responsive Design**: Mobile-friendly interface

### Advanced Features
- **User Profiles**: View user profiles and their posts
- **Draft System**: Save posts as drafts before publishing
- **Real-time Updates**: Optimistic UI updates for better UX
- **Input Validation**: Comprehensive validation on both client and server
- **Error Handling**: Robust error handling throughout the application
- **Security**: JWT authentication, rate limiting, and security headers

## 🛠️ Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **Joi**: Input validation
- **Bcrypt**: Password hashing
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing

### Frontend
- **React.js**: UI library
- **Vite**: Build tool
- **React Router**: Client-side routing
- **React Query**: Data fetching and caching
- **React Hook Form**: Form handling
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **Axios**: HTTP client

## 📂 Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mern-blog
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install server dependencies
   npm run install-server

   # Install client dependencies
   npm run install-client
   ```

3. **Environment Setup**
   
   Create `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d
   ```

   Create `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the application**
   ```bash
   # Start both client and server concurrently
   npm run dev

   # Or start them separately
   npm run server  # Start server only
   npm run client  # Start client only
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Posts Endpoints
- `GET /api/posts` - Get all posts (with pagination, search, filter)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `POST /api/posts/:id/comments` - Add comment to post (protected)

### Categories Endpoints
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

## 🔧 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin']),
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  title: String (required),
  content: String (required),
  excerpt: String,
  slug: String (unique),
  featuredImage: String,
  published: Boolean,
  author: ObjectId (ref: User),
  category: ObjectId (ref: Category),
  tags: [String],
  comments: [CommentSchema],
  likes: [ObjectId],
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  name: String (required, unique),
  description: String,
  slug: String (unique),
  color: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI Components

### Key Components
- **Layout**: Main application layout with header and footer
- **Header**: Navigation with authentication state
- **PostCard**: Reusable post preview component
- **PostForm**: Form for creating/editing posts
- **CommentSection**: Comment display and creation
- **ProtectedRoute**: Route protection wrapper

### Pages
- **Home**: Post listing with search and pagination
- **PostDetail**: Individual post view with comments
- **CreatePost**: Post creation form
- **EditPost**: Post editing form
- **Login/Register**: Authentication forms
- **Profile**: User profile and post management

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Security headers with Helmet
- Protected routes and API endpoints

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use a cloud MongoDB service
2. Deploy to platforms like Heroku, Railway, or DigitalOcean
3. Set environment variables in production
4. Update CORS settings for production domain

### Frontend Deployment
1. Build the React application: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or AWS S3
3. Update API URL in environment variables
4. Configure routing for SPA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js for the backend framework
- React.js for the frontend library
- Node.js for the runtime environment
- All the open-source libraries that made this project possible

## 📞 Support

If you have any questions or need help with setup, please create an issue in the repository or contact the development team.