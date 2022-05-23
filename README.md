# defi-robo-advisor

Making DeFi easily accessible to everyone! For more info, check out the [wiki](https://github.com/cibr-qcri/defi-robo-advisor/wiki) for an overview and the [project's board](https://github.com/orgs/cibr-qcri/projects/3) for tasks and planning.

## Starting

```zsh
# In developement
docker-compose -f docker-compose.dev.yaml up --build --detach

# In production
# Clone the repo in /usr/local directory if not found
cd /usr/local/defi && git pull
docker-compose -f docker-compose.prod.yaml up --build --detach
```

## Stopping

```zsh
# In developement
# Add --volumes to remove named vols
docker-compose -f docker-compose.dev.yaml down

# In production
# Remove all images for a clean start
docker-compose -f docker-compose.prod.yaml down --rmi all
```
