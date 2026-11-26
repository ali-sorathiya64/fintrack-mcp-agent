import { createApplication } from "./services/applications.js";

const run = async () => {

  const app1 = await createApplication({
    company: "Google",
    role: "SDE",
    appliedAt: "2025-11-15",

  });
  console.log("Case 1 (defaults):", app1);


  const app2 = await createApplication({
    company: "Razorpay",
    role: "Backend Developer",
    status: "interview",
    appliedAt: "2025-11-20",
    salary: "18 LPA",
    location: "Bangalore",
  });
  console.log("Case 2 (custom):", app2);
};

run();