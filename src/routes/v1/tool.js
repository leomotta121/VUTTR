const express = require('express');
const router = express.Router();

const isAuth = require('../../middlewares/isAuth');

const toolController = require('../../controllers/toolController');

const passport = require('passport');
require('../../middlewares/passport')(passport);

// /v1/tools
router.get('/tools', toolController.getTools);

// /v1/tools
router.post('/tools', isAuth, toolController.postTool);

// /v1/tool/delete
router.delete('/tools/:id', isAuth, toolController.deleteTool);

module.exports = router;
