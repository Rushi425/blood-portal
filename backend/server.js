const http = require('http');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Added cookie-parser import
require('dotenv').config();

const app = express();
const connectDB = require('./config/db.js');
const { updateAppointmentStatus } = require('./utils/appointmentStatus');

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); 
app.use(express.json());
app.use(cookieParser()); 

// // API routes
const authRoutes = require('./routes/authRoutes.js');
const donorRoutes = require('./routes/donorRoutes.js');
const statsRoutes = require('./routes/stats.js'); 
const adminRoutes = require('./routes/adminRoutes.js'); // Added adminRoutes
const bloodBankRoutes = require('./routes/bloodBankRoutes.js');
app.use('/api/v1', authRoutes);
app.use('/api/v1', donorRoutes);
app.use('/api/v1', statsRoutes); 
app.use('/api/v1', adminRoutes); 
app.use('/api/v1', bloodBankRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Check appointment statuses every 5 minutes
setInterval(async () => {
  try {
    await updateAppointmentStatus();
  } catch (error) {
    console.error('Error in appointment status check:', error);
  }
}, 5 * 60 * 1000); // Run every 5 minutes

connectDB().then(() => {
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database:', err);
});