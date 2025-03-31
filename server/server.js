const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const setupSwagger = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const path = require('path');

dotenv.config();

// Connect to MongoDB
connectDB();


const app = express();


// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

// Serve frontend in production
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname1, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Setup Swagger
setupSwagger(app);

// Define port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
