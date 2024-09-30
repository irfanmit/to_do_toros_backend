const express = require("express");
const { createTask, getTasks } = require("../controllers/taskController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/",  createTask);
router.get("/",  getTasks);

module.exports = router;
