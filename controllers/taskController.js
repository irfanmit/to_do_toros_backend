const Task = require("../models/taskModel");

const createTask = async (req, res) => {
  const { title, description, dueDate, status, priority, assignedUser } = req.body;
  
  console.log("Received task creation request:", req.body); // Log request data

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      status,
      priority,
      assignedUser,
    });

    console.log("Saving new task:", newTask); // Log the task object before saving

    await newTask.save();

    console.log("Task successfully saved:", newTask); // Log after task is saved

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error); // Log any errors
    res.status(500).json({ message: "Server error" });
  }
};

const getTasks = async (req, res) => {
    console.log("Received task fetch request");
  
    try {
      // Fetch all tasks from the database
      const tasks = await Task.find().populate("assignedUser", "username");
  
      console.log("Fetched tasks:", tasks); // Log the fetched tasks
  
      res.json({ tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error); // Log any errors
      res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports = { createTask, getTasks };
  

module.exports = { createTask, getTasks };
