const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary in-memory storage
let jobs = [];

// Home route
app.get("/", (req, res) => {
  res.send("Job Tracker API is running 🚀");
});

// GET all jobs
app.get("/jobs", (req, res) => {
  res.json(jobs);
});

// POST a new job
app.post("/jobs", (req, res) => {
  const { company, role, status } = req.body;

  if (!company || !role || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newJob = {
    id: Date.now(),
    company,
    role,
    status,
  };

  jobs.push(newJob);
  res.status(201).json(newJob);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
