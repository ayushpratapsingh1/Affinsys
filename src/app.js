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
// app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', userRoutes);
app.use('/', transactionRoutes);

// Route for the main page - serve the HTML tester
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });
app.get('/', (req, res) => {
  // Change this line to send a message instead of the file
  res.send(`
    <html>
      <head>
        <title>Affinsys Server</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 100px; }
          h1 { color: #4CAF50; }
          .status { padding: 20px; background-color: #f8f8f8; border-radius: 5px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="status">
          <h1>Server Running</h1>
          <p>Affinsys API server is up and running on port ${PORT}</p>
          <p>Server time: ${new Date().toLocaleString()}</p>
        </div>
      </body>
    </html>
  `);
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
