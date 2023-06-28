# UW-TransactionsOrginizer

Please, copy content of `/back-initial-data` directory into root before start

Run docker for dev (with front hot-reloading):
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache
docker-compose -f docker-compose.yml -f docker-compose.dev.yml uo
```