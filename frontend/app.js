const API_URL = "http://job-tracker-backend-2z99.onrender.com/jobs";

const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");

const companyInput = document.getElementById("company");
const positionInput = document.getElementById("position");
const statusInput = document.getElementById("status");

jobForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const job = {
    company: companyInput.value,
    position: positionInput.value,
    status: statusInput.value
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job)
  });

  jobForm.reset();
  loadJobs();
});

async function loadJobs() {
  const res = await fetch(API_URL);
  const jobs = await res.json();

  jobList.innerHTML = "";

  jobs.forEach(job => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${job.company} - ${job.position} (${job.status})
      <button onclick="deleteJob('${job._id}')">X</button>
    `;
    jobList.appendChild(li);
  });
}

window.deleteJob = async function(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadJobs();
};

loadJobs();
