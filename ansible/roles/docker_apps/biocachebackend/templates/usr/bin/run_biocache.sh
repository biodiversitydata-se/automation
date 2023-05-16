#!/bin/bash
export DOCKER_CTX={{ docker_ctx | default('/docker') }}

echo "Creating volume for biocachebackend"

docker volume create --driver local \
    --opt type=none \
    --opt device=${DOCKER_CTX}/var/volumes/nameindex/data_nameindex \
    --opt o=bind biocachebackend_data_nameindex

docker volume create --driver local \
    --opt type=none \
    --opt device=${DOCKER_CTX}/var/volumes/biocachebackend/data_biocachebackend \
    --opt o=bind biocachebackend_data_biocachebackend

echo "Starting biocachebackend container"

docker run --rm --network=sbdi_frontend \
-v biocachebackend_data_nameindex:/data/lucene/namematching \
-v biocachebackend_data_biocachebackend:/data \
--mount type=bind,source=${DOCKER_CTX:-/docker}/etc/biocachebackend/config/blacklistMediaUrls.txt,target=/data/biocache/config/blacklistMediaUrls.txt \
--mount type=bind,source=${DOCKER_CTX:-/docker}/etc/biocachebackend/config/biocache-config.properties,target=/data/biocache/config/biocache-config.properties  \
--mount type=bind,source=${DOCKER_CTX:-/docker}/tmp,target=/tmp \
-e BIOCACHE_MEMORY_OPTS="-Xmx16g -Xms1g" \
--env-file=${DOCKER_CTX:-/docker}/etc/biocachebackend/env/.envbiocachebackend \
-it bioatlas/ala-biocachebackend:v2.6.1 bash
