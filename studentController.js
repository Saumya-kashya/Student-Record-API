const Student = require("../models/Student");

exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

exports.addStudent = async (req, res) => {
  const { name, course, age, city } = req.body;

  if (!name || !course) {
    return res.status(400).json({ message: "Name & Course are required" });
  }

  const newStudent = new Student({ name, course, age, city });
  await newStudent.save();
  res.status(201).json({ message: "Student added", newStudent });
};

exports.updateStudent = async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
};