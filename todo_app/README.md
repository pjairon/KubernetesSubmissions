# Todo app

Web server that prints "Server started in port NNNN" on startup. The port is set with the `PORT` environment variable (default 3000).

## Run locally

    docker build -t pjairon/todo-app:1.2 .
    docker run --rm --init -e PORT=4000 pjairon/todo-app:1.2

## Deploy to Kubernetes

    docker push pjairon/todo-app:1.2
    kubectl create deployment todo-app --image=pjairon/todo-app:1.2
    kubectl logs <pod-name>
