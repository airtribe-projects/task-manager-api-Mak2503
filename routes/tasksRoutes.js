const express = require("express");
const {
  getAllTasks,
  getAllTasksByPriority,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

const router = express.Router();

router.get("/", getAllTasks);

router.get("/priority/:level", getAllTasksByPriority);

router.post("/", createTask);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
