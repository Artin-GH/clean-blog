const express = require("express");
const router = express.Router();
const controller = require("../controllers/manage.controller");

router.get('/', controller.index);
router.get("/addpost", controller.addpost);
router.post("/addpost", controller.addpostPost);
router.get('/delete/:id', controller.del);
router.get('/edit/:id', controller.editGet);
router.post("/edit/:id", controller.editPost);

module.exports = router;
