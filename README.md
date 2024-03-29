# Prom-Client demo example build on top of Express

Ref from: https://betterprogramming.pub/node-js-application-monitoring-with-prometheus-and-grafana-b08deaf0efe3

````
NOTE: For the url use as follows based on the operation system. 
For MAC --> http://docker.for.mac.host.internal
For Linux --> http://localhost 
````

Be in the root folder of the project and run:
````
docker compose up
````
It will install 3 containers `prom-client-app`, `prometheus` & `grafana`

## Some features include
- Auto change the content in node app because of volume mount of whole app inside the container. i.e. 
````
volumes: 
    - ./:/usr/src/app
    - /usr/src/app/node_modules
````
- Installed nodemon inside Dockerfile as global installation 
- Docker Compose to build and run 3 services.
    - prom-client-express (nodejs app)
    - prometheus
    - grafana


### prom-client-app
- `localhost:4000/metrics` displays the prom-client data

### prometheus
- `localhost:9090` displays the prometheus query
- Scrape interval is 5s which is defined Inside `prometheus.yml` file
- Search for `total_users` or `active_users`

### grafana
- `localhost:3000` displays the grafana dashboard
- Create a dashboard and search for `total_users` or `active_users` in the query