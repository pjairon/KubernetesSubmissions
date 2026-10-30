# Log output

Generates a random UUID on startup, keeps it in memory and prints it with a timestamp every 5 seconds.

## Build and push the image

    docker build -t pjairon/log-output:1.1 .
    docker push pjairon/log-output:1.1

## Deploy to Kubernetes

    kubectl create deployment log-output --image=pjairon/log-output:1.1
    kubectl logs -f <pod-name>
