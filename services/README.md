# Services

This repo contains a set of services that are used for collecting data about DeFi protocols

## Structure

Each service has its own directory (e.g. bootstrap). Inside the service directory, you will find a file called `run.js`, which contains the code that the service will execute. There is also `package.json` which contains the node project settings. `Dockerfile.dev and Dockerfile.prod` are used to setup the docker container that the service will run inside.

`Common` directory contains utilities that are shared between services.

```
db/connect.js
```

This file contains the DB connection details. The function connectDB is used to establish a connection to the database in order to enable DB operations. It should be called once in the beginning of your service.

```
db/models
```

This directory contains DB models. These models are used to define the schema of entities used by services. They are also used to communicate with the DB (i.e. to read/write).

## Running The Service

To run your service, you need to build the docker container

```
docker-compose -f docker-compose.dev.yaml up --build --detach
```

To stop the container

```
docker-compose -f docker-compose.dev.yaml down -v (adding -v will delete the volumes/DB)
```
