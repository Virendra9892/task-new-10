var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

/* GET users listing. */
router.post('/register',userController.regesterUser);
router.post("/login",userController.loginUser);
router.get("/allUser",auth,userController.getallUser);

module.exports = router;
