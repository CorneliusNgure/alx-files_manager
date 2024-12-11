const express = require('express');
const routes = require('./routes');

// Create an instance of an Express application
const app = express();

// Use routes defined in the routes/index.js file
app.use('/', routes);

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

