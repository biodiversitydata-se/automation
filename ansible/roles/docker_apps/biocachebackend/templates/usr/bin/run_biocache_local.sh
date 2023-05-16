#!/bin/sh
export DOCKER_CTX={{ docker_ctx | default('/docker') }}
export DOCKER_LOCAL_CTX="/docker_local"

{% raw %}
CASSANDRA_NODE_IP=$(docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -qf "name=^cassandra"))
{% endraw %}
echo $CASSANDRA_NODE_IP
NEWCONFIG="local.node.ip="$CASSANDRA_NODE_IP
echo $NEWCONFIG
sed -i "/local.node.ip/c\\$NEWCONFIG" ${DOCKER_LOCAL_CTX}/etc/biocachebackend/config/biocache-config.properties

echo "Creating local volume for nameindex using global nameindex data"

docker volume create --driver local \
    --opt type=none \
    --opt device=${DOCKER_CTX}/var/volumes/nameindex/data_nameindex \
    --opt o=bind local_data_nameindex

echo "Creating local volume for biocachebackend"

docker volume create --driver local \
    --opt type=none \
    --opt device=${DOCKER_LOCAL_CTX}/var/volumes/biocachebackend/data_biocachebackend \
    --opt o=bind local_data_biocachebackend

echo "Starting biocachebackend container"

docker run --rm --network=sbdi_frontend \
-v local_data_nameindex:/data/lucene/namematching \
-v local_data_biocachebackend:/data \
--mount type=bind,source=${DOCKER_LOCAL_CTX}/etc/biocachebackend/config/blacklistMediaUrls.txt,target=/data/biocache/config/blacklistMediaUrls.txt \
--mount type=bind,source=${DOCKER_LOCAL_CTX}/etc/biocachebackend/config/biocache-config.properties,target=/data/biocache/config/biocache-config.properties  \
--mount type=bind,source=${DOCKER_LOCAL_CTX:-/docker}/tmp,target=/tmp \
-e BIOCACHE_MEMORY_OPTS="-Xmx16g -Xms1g" \
--env-file=${DOCKER_LOCAL_CTX:-/docker}/etc/biocachebackend/env/.envbiocachebackend \
-it bioatlas/ala-biocachebackend:v2.6.1 bash
