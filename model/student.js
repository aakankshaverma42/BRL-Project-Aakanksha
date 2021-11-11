const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: String,
  rollNo: Number,
  branch: String,
  hobbies: String
});

const studentModel = mongoose.model("studentModel", studentSchema);

module.exports = studentModel;
