# Task-Manager

## Running the Application as a Docker Container

### Prerequisites

- Docker installed on your machine

### Pull the Docker Image

To run the application as a Docker container, first, pull the Docker image from GitHub container registry using the following command:

```bash
docker pull Muzi-M/Task-Manager:latest

### Run the docker container
docker run -p 3000:3000 Muzi-M/Task-Manager:latest

## This command will start the application inside a Docker container and map port 3000 of the container to port 3000 on your host machine. You can access the application by visiting http://localhost:3000 in your web browser.
```
