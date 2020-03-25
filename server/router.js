const express = require('express');
const router = express.Router();
const controllers = require('./controllers.js');

router
  .route('/')
  .get()

module.exports = router;