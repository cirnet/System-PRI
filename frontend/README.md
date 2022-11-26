Build the Docker image:

```
docker build . -t dockerized-react
```

Run the image:

```
docker run -p 3000:80 -d dockerized-react
```
