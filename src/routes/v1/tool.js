const express = require('express');
const router = express.Router();

const isAuth = require('../../middlewares/isAuth');

const toolController = require('../../controllers/toolController');

const passport = require('passport');
require('../../middlewares/passport')(passport);

// /v1/tool/register
router.post('/register', isAuth, toolController.postTool);

// /v1/tool/delete
router.delete('/delete', isAuth, toolController.deleteTool);

module.exports = router;
