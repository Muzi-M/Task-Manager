const express = require("express");
const router = express.Router();

// data for candidates and tasks
let candidates = [];
let currentId = 1;

const tasks = [
  { task: "Task 1", completed: false },
  { task: "Task 2", completed: false },
  { task: "Task 3", completed: false },
  { task: "Task 4", completed: false },
  { task: "Task 5", completed: false },
];

// Home route - show candidate list and weather
router.get("/", (req, res) => {
  const { filterCandidate, filterTask, filterCandidateId, sortBy } = req.query;

  // Set the selectedTask based on the query parameter
  const selectedTask = filterTask || "";

  // Sort candidates based on the query parameter
  let sortedCandidates = [...candidates];
  if (sortBy === "id") {
    sortedCandidates.sort((a, b) => a.id - b.id);
  } else if (sortBy === "name") {
    sortedCandidates.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Filter candidates based on the query parameters
  const filteredCandidates = sortedCandidates.filter(
    (candidate) =>
      !filterCandidate ||
      candidate.name.toLowerCase().includes(filterCandidate.toLowerCase())
  );

  // Function to filter candidates based on selected candidate ID
  const filterCandidatesById = (candidates, selectedCandidateId) => {
    if (!selectedCandidateId) return candidates;
    return candidates.filter(
      (candidate) => candidate.id === parseInt(selectedCandidateId)
    );
  };

  const filteredCandidatesById = filterCandidatesById(
    filteredCandidates,
    filterCandidateId
  );

  // Function to filter candidates based on selected task
  const filterCandidatesByTask = (candidates, selectedTask) => {
    if (!selectedTask) return candidates;
    return candidates.map((candidate) => {
      const filteredCandidate = { ...candidate };
      filteredCandidate.tasks = filteredCandidate.tasks.filter(
        (task) => task.task === selectedTask
      );
      return filteredCandidate;
    });
  };

  const filteredCandidatesByTask = filterCandidatesByTask(
    filteredCandidatesById,
    selectedTask
  );

  // Render the index page with candidate and task data
  res.render("index", {
    candidates: filteredCandidatesByTask,
    tasks,
    filterCandidate,
    filterTask: selectedTask,
    filterCandidateId,
    sortBy,
  });
});

// Add new candidate
router.post("/add", (req, res) => {
  const { name } = req.body;
  const id = currentId++; // Assign the currentId and then increment it

  const candidateTasks = tasks.map((task) => ({ ...task })); // Create a copy of the tasks for the candidate
  const candidate = { id, name, tasks: candidateTasks };
  candidates.push(candidate);
  res.redirect("/");
});

// Show edit form for a candidate
router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  const candidate = candidates.find(
    (candidate) => candidate.id === parseInt(id)
  );

  if (candidate) {
    res.render("edit", { candidate });
  } else {
    res.status(404).send("Candidate not found.");
  }
});

// Update candidate's name
router.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const candidate = candidates.find(
    (candidate) => candidate.id === parseInt(id)
  );
  if (candidate) {
    candidate.name = name;
    res.redirect("/");
  } else {
    res.status(404).send("Candidate not found.");
  }
});

// Delete a candidate
router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  candidates = candidates.filter((candidate) => candidate.id !== parseInt(id));
  res.redirect("/");
});

// Mark a task as completed for a candidate
router.get("/markCompleted/:candidateId/:taskId", (req, res) => {
  const { candidateId, taskId } = req.params;

  const candidate = candidates.find(
    (candidate) => candidate.id === parseInt(candidateId)
  );
  if (candidate) {
    const task = candidate.tasks.find((task) => task.task === taskId);
    if (task) {
      task.completed = true;
    }
  }

  res.redirect("/");
});

module.exports = router;
