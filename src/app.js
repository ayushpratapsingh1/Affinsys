const express = require('express');
const morgan = require('morgan');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', userRoutes);
app.use('/', transactionRoutes);

// Route for the main page - serve the HTML tester
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
//   console.log(`Access the API tester at: http://localhost:${PORT}`);
//   console.log('IMPORTANT: Open the page through the server URL, not directly from the file system');
});

module.exports = app;
