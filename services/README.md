# Services

This directory contains a set of services that are used for collecting data about DeFi protocols

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

## Debugging

To be able to debug your service, you need to access the logs of the container

```
docker-compose -f docker-compose.dev.yaml logs --follow service_name
```

Each time you modify the code of your service, you need to re-build the containers

```
docker-compose -f docker-compose.dev.yaml up --build --detach
```

Sometimes you might need to `down` then `up` your container to pick up the changes (with `down -v` if you need to wipe the database)

## Notes

- Make sure to implement your service following the functional requirements. You might need to keep your service running in an event-loop (e.g. infinite loop with a timeout/sleep, but be careful here!).

- Your service might depend on some other service that is already running. You can, for example, check if that service did already run by checking if that service had written data to its collection.
