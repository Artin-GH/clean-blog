const express = require('express');
const router = express.Router();
const controller = require('../controllers/main.controller')

router.get('/', controller.index);
router.get("/about", controller.about);
router.get("/contact", controller.contact);
router.get("/login", controller.login);
router.get("/register", controller.register);

module.exports = router;
