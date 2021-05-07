const express = require("express");
const app = express();
const port = 4000;

const client = require("prom-client");

const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'prom-client-express'
})

// Define a counter
const totalUsers = new client.Gauge({ name: "total_users", help: "Users Count", labelNames: ["users"], registers: [register] });
const activeUsers = new client.Gauge({ name: "active_users", help: "Active Users Count", labelNames: ["users"], registers: [register] });

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("This app is an example app for prom-client.\nNavigate /metrics for Metrics.");
});


app.get("/metrics", async (req, res) => {
  let totalUsersCount = Math.random() * 15;
  let activeUsersCount = Math.random() * 5;

  totalUsers.labels("total").set(totalUsersCount);
  activeUsers.labels("active").set(activeUsersCount);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
