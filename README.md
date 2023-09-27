# TransactionsOrginizer - how to deploy

The deployment should be perfomed on the VPS or Dedicated server with Docker installed.

1. Copy project files to the server.
2. Copy content of `/back-initial-data` directory into root.
3. Copy .env.exmaple to .env and make changes if necessary.
4. Run with command `docker compose up -d`.

Run in dev mode (with front hot-reloading):
```
docker compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

# TransactionsOrginizer - how to add/edit users.

You can editing or adding users using the Directus application interface.
With the default .env settings this app available by url http://127.0.0.1:3021.
Here you can sign in with your credentials and make needed changes.
