const Task = require('../models/task')
const express = require('express')

const route = express.Router()

/* HTML Routes */
route.get('/', async function (req, res) {
  const data = await Task.findAll()
  res.render('app', { tasks: data })
})


// /* API ROUTES */
// //SOME DATA FOR TASK.IT
// //not sure if the task deadline is a string or a date
// let tasks = [
//   {

//     routeName: "dancing-practice",
//     taskName: "Dancing Practice",
//     taskDescription: "Go for dance practice at 5pm",
//     taskDeadline: "Today at 5pm",
//   },

//   {
//     routeName: "swimming-practice",
//     taskName: "Swimming Practice",
//     taskDescription: "Go for swim practice tomorrow",
//     taskDeadline: "Tomorrow at 2pm",
//   },

//   {
//     routeName: "homework",
//     taskName: "Homework",
//     taskDescription: "Finish homework tonight!",
//     taskDeadline: "Tomorrow at 11:59pm",
//   },
// ];
//loop through array and for each element assign an id

// for (let i = 0; i < tasks.length; i++){
//   tasks[i].id = generateID();
// }
//Function that generates random id for user
function generateID(){
  let char = "1234567890qwertyuiopasdfghjklzxcvbnm"
  let id = ""
  for (let i = 0; i < 8; i++) {
    let index = Math.floor(Math.random() * char.length)
    id += char[index]
  }
  return id
}

// Routes
// // Basic route that sends the user first to the AJAX Page
// router.get("/", function (req, res) {
//   res.render("app");
// });
// Displays all tasks
route.get("/api/tasks", function (req, res) {
  return res.json(tasks);
});

// Displays a single task, or returns false
route.get("/api/tasks/slug/:slug", function (req, res) {
  const slug = req.params.slug;
  console.log(slug);

  for (const task of tasks) {
    if (task.routeName === slug) {
      return res.json(task);
    }
  }

  return res.json(false);
});

// Displays a single task, but get by id
route.get("/api/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId)
  if(!task){
   return res.status(404).json({ message: "task not found"})
  }
  return res.json(task);
});

//For user testing
route.get("/signup", (req, res) => {
  res.render("signup", users);
});

route.get("/login", (req, res) => {
  res.render("login", users[0]);
});

//To add a new task - takes in JSON input
route.post("/api/tasks", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user

  const newTask = new Task({
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    taskDeadline: req.body.taskDeadline,
    routeName: req.body.taskName.replace(/\s+/g, "-").toLowerCase()
  });
    newTask.save()
  
  console.log(newTask);

  res.json(newTask);
});

//to edit/update a task
route.put("/api/tasks/:id", async function (req, res) {
  const task = await Task.findById(req.params.id)
  if (!task) return res.status(404).json({

    message: "task not found"
  })

  task.taskName = req.body.taskName
  task.taskDescription = req.body.taskDescription
  task.taskDeadline = req.body.taskDeadline

  try {
    await task.save()
    return res.status(200).json(task)
  } catch (err) {
    res.status(500).json(err)
  }
    }
  
  
);

//To delete a task
route.delete("/api/tasks/:slug", function (req, res) {
  const slug = req.params.slug;
  console.log(slug);
  tasks = tasks.filter((task) => {
    return task.routeName != slug;
  });
  console.log(tasks);
  res.json({ message: "Task has been deleted" });
});

//Adding Users

route.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: req.body.password };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

//Verifying Login

route.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user === null) {
    return res.status(400).send("User not found");
  }
  try {
    bcrypt.compare(req.body.password, user.password);
  } catch {
    res.status(500).send();
  }
});

module.exports = route
