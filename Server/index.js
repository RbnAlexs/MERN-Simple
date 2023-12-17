const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todomodel = require("./Models/Todo");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

mongoose
  .connect(
    process.env.MONGODB_URI
  )
  //.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected :D"))
  .catch((err) => console.log(err));

//Routes

app.get("/", (req, res) => {
  Todomodel.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.get("/get", (req, res) => {
  Todomodel.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  Todomodel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

/*
app.put ('/update/:id', (req, res) => {
  const id = req.params.id;
  //console.log(id);
  Todomodel.findByIdAndUpdate({_id: id}, {done: true})
  .then((result) => res.json(result))
  .catch((err) => console.log(err));
});
*/

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  Todomodel.findById(id)
    .then((todo) => {
      // Invertir el estado de 'done'
      const newDoneStatus = !todo.done;
      return Todomodel.findByIdAndUpdate(
        id,
        { done: newDoneStatus },
        { new: true }
      );
    })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.put("/update-name/:id", (req, res) => {
  const id = req.params.id;
  const newTask = req.body.newTask; // Get the new task from the request body
  Todomodel.findByIdAndUpdate({ _id: id }, { task: newTask }, { new: true })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  //console.log(id);
  Todomodel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
