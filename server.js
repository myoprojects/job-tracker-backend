 const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.json());

// MongoDB connection
mongoose
  .connect(
   "mongodb+srv://jobtracker:jobtracker123@cluster0.zb0nub9.mongodb.net/?appName=Cluster0"
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

// Job Schema
const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, required: true },
});

const Job = mongoose.model("Job", jobSchema);

// Home
app.get("/", (req, res) => {
  res.send("Job Tracker API with MongoDB 🚀");
});

// GET jobs
app.get("/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// POST job
app.post("/jobs", async (req, res) => {
  const { company, role, status } = req.body;

  if (!company || !role || !status) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newJob = new Job({ company, role, status });
  await newJob.save();

  res.status(201).json(newJob);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
