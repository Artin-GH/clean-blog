const express = require("express");
const router = express.Router();
const controller = require('../controllers/posts.controller');

router.get("/", controller.index);
router.get('/post/:id', controller.post);

module.exports = router;
