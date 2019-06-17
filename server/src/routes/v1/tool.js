const express = require('express');
const router = express.Router();

const isAuth = require('../../services/isAuth');

const toolController = require('../../controllers/toolController');

// /tools
router.get('/tools', toolController.getTools);

// /tools
router.post('/tools', isAuth, toolController.postTool);

// /tools:id
router.patch('/tools/:id', isAuth, toolController.patchTool);

// /tools/:id
router.delete('/tools/:id', isAuth, toolController.deleteTool);

module.exports = router;
