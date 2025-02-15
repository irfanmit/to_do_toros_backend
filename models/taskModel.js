const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["To Do", "In Progress", "Completed"], default: "To Do" },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  assignedUser: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId},
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
