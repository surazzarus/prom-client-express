const express = require("express");
const app = express();
const port = 3000;

const client = require("prom-client");

// Create a Registry which registers the metrics
const register = new client.Registry();

// Define a counter
const userDetails = new client.Gauge({
  name: "total_users",
  help: "Users Count",
  labelNames: ["users"],
  registers: [register],
});
const activeUsers = new client.Gauge({
  name: "active_users",
  help: "Active Users Count",
  labelNames: ["users"],
  registers: [register],
});

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});
let userCount = 15;
let activeUsersCount = 5;

app.get("/metrics", async (req, res) => {
  userDetails.labels("total").set(userCount);
  activeUsers.labels("active").set(activeUsersCount);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
