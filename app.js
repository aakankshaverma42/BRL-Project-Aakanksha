const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ejs = require('ejs');

const PORT = 3800;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var dbURL = require("./properties").DB_URL;
app.set('view engine','ejs');

mongoose.connect(dbURL);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb");
});

//then we created a model
const studentModel = require("./model/student");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/docs/crud.html");
});

app.get("/dataEntry", function (req, res) {
  res.sendFile(__dirname + "/docs/data_entry.html");
});

app.get("/table", function (req, res) {
  studentModel.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.render("table", {
        studentlist: result,
      });
    }
  });
});

app.post("/create", function (req, res) {
  const student = new studentModel({
    name: req.body.name,
    rollNo: req.body.rollNo,
    branch: req.body.branch,
    hobbies: req.body.hobbies,
  });

  student.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.sendFile(__dirname + "/docs/crud.html");
    }
  });
});

app.post("/delete", function (req, res) {
  console.log(req.body)
  studentModel.deleteOne({_id : req.body.submit}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/table")
    }
  });
});

app.listen(PORT, function () {
  console.log("http://localhost:" + PORT);
});
