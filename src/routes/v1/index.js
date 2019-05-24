const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const toolRoutes = require('./tool');

router.use(authRoutes);
router.use(toolRoutes);

module.exports = router;
