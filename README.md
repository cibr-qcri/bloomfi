# bloomfi

BloomFi is the easiest way to invest in DeFi! For more info, check out the project's [wiki](https://github.com/cibr-qcri/defi-robo-advisor/wiki) and [issues](https://github.com/orgs/cibr-qcri/projects/3).

## Starting

```zsh
# In developement
AMPLITUDE_DEV_API_KEY="REPLACE" TWITTER_BEARER_KEY="REPLACE" docker-compose -f docker-compose.dev.yaml up --build --detach

# In production
# Clone the repo in /usr/local directory if not found
cd /usr/local/defi && git pull
SMTP_PASSWORD="REPLACE" AMPLITUDE_PROD_API_KEY="REPLACE" TWITTER_BEARER_KEY="REPLACE" docker-compose -f docker-compose.prod.yaml up --build --detach
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
