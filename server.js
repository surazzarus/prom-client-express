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
  res.end(`
    This app is an example app for prom-client.

    Navigate http://localhost:4000 for default route
    Navigate http://localhost:4000/metrics for Metrics.
    Navigate http://localhost:9090 for Prometheus.
    Navigate http://localhost:3000 for Grafana.

    These volume mounts provides development process faster. 
    
    volumes: 
            - ./:/usr/src/app
            - /usr/src/app/node_modules

    With these volume mounts in place, it creates empty 'node_modules' folder in the root directory after 'docker compose up'.
  `);
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
