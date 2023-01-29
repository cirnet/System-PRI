1. Stwórz plik .env na podstawie pliku .env_example.

2. Build the Docker image:

```
docker build . -t dockerized-react
```

3. Run the image:

```
docker run -p 3000:80 -d dockerized-react
```
