# URL-Shortener | Take Home Assessment


# Tech Stack 

- React | frontend
- Tailwind CSS | styling
- Node & Express | Backend

# Setup

First make sure Docker Desktop is installed, you can install Docker from [official website](https://www.docker.com/products/docker-desktop/)
> Clone this repo

```
git clone https://github.com/1HoWK/URL-Shortener.git
```

> Navigate to the project directory 

```
cd URL-Shortener/
```

Make sure Docker Desktop is opened before proceeds with the following commands.

> Start Docker Compose

```
docker compose up
```

> Verify Docker containers are Running, it lists all running services defined in the docker-compose.yaml

```
docker compose ps
```

> Verify that the web app is running from the following endpoints

```
http://localhost:5173/ : frontend

http://localhost:8000/shorten_url_records : backend
```

> End Docker Service once you are done

```
docker compose down
```


