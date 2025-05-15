// import express from 'express'
// import dotenv from 'dotenv'
// import cookieParser from 'cookie-parser'
// import cors from 'cors'
// import mongoose from 'mongoose'
// import AuthRoute from './routes/Auth.route.js'
// import UserRoute from './routes/User.route.js'
// import CategoryRoute from './routes/Category.route.js'
// import BlogRoute from './routes/Blog.route.js'
// import CommentRouote from './routes/Comment.route.js'
// import BlogLikeRoute from './routes/Bloglike.route.js'

// dotenv.config()

// const PORT = process.env.PORT
// const app = express()

// app.use(cookieParser())
// app.use(express.json())
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }))


// // route setup  

// app.use('/api/auth', AuthRoute)
// app.use('/api/user', UserRoute)
// app.use('/api/category', CategoryRoute)
// app.use('/api/blog', BlogRoute)
// app.use('/api/comment', CommentRouote)
// app.use('/api/blog-like', BlogLikeRoute)



// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('Database connected.'))
//     .catch(err => console.log('Database connection failed.', err))

// app.listen(PORT, () => {
//     console.log('Server running on port:', PORT)
// })


// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500
//     const message = err.message || 'Internal server error.'
//     res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message
//     })
// })






// new code

// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import mongoose from 'mongoose';

// import AuthRoute from './routes/Auth.route.js';
// import UserRoute from './routes/User.route.js';
// import CategoryRoute from './routes/Category.route.js';
// import BlogRoute from './routes/Blog.route.js';
// import CommentRoute from './routes/Comment.route.js';
// import BlogLikeRoute from './routes/Bloglike.route.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cookieParser());
// app.use(express.json());

// // ✅ CORS Configuration
// const allowedOrigin = process.env.FRONTEND_URL; // example: https://your-frontend.vercel.app

// app.use(cors({
//   origin: allowedOrigin,
//   credentials: true,
// }));

// // ✅ Optional: Handle preflight requests
// app.options('*', cors({
//   origin: allowedOrigin,
//   credentials: true,
// }));

// // ✅ Logging origin for debugging (optional)
// app.use((req, res, next) => {
//   console.log('Request Origin:', req.headers.origin);
//   next();
// });

// // ✅ Default Route for health check
// app.get('/', (req, res) => {
//   res.send('Backend is running...');
// });

// // ✅ API Routes
// app.use('/api/auth', AuthRoute);
// app.use('/api/user', UserRoute);
// app.use('/api/category', CategoryRoute);
// app.use('/api/blog', BlogRoute);
// app.use('/api/comment', CommentRoute);
// app.use('/api/blog-like', BlogLikeRoute);

// // ✅ Error Handling Middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal server error.';
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

// // ✅ MongoDB Connection and Start Server
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('Database connected.');
//   app.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`);
//   });
// })
// .catch(err => {
//   console.error('Database connection failed.', err);
// });




// new debug code
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import AuthRoute from './routes/Auth.route.js';
import UserRoute from './routes/User.route.js';
import CategoryRoute from './routes/Category.route.js';
import BlogRoute from './routes/Blog.route.js';
import CommentRoute from './routes/Comment.route.js';
import BlogLikeRoute from './routes/Bloglike.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration for multiple environments (Vercel + localhost)
const allowedOrigins = [
  'http://localhost:5173',
  'https://new-blog-web-izjz.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Handle preflight requests
app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());

// ✅ Debugging origin (optional)
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  next();
});

// ✅ Default health check route
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// ✅ API Routes
app.use('/api/auth', AuthRoute);
app.use('/api/user', UserRoute);
app.use('/api/category', CategoryRoute);
app.use('/api/blog', BlogRoute);
app.use('/api/comment', CommentRoute);
app.use('/api/blog-like', BlogLikeRoute);

// ✅ Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error.';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
})
.catch(err => {
  console.error('Database connection failed.', err);
});

