const express = require('express');
const AppController = require('../controllers/AppController');

// Create a router
const router = express.Router();

// Define routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// Export the router
module.exports = router;

