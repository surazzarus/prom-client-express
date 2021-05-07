
# Chanage Directory to parent folder, since the file 'prometheus.yml' is in the parent directory
cd ..

docker run --rm -p 9090:9090 \
  -v `pwd`/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus:v2.20.1

# cd to folder 'scripts'
cd scripts