# Ping-pong

Aplicación que responde `pong N` a un GET en `/pingpong` e incrementa un contador en memoria en cada petición (se reinicia si el pod se reinicia).

## Imagen

    docker build -t pjairon/ping-pong:1.9 .
    docker push pjairon/ping-pong:1.9

## Despliegue

    kubectl apply -f manifests

El Ingress `shared-ingress` es compartido con "Log output": `/pingpong` va a ping-pong y `/` va a log-output. Requiere que no exista otro Ingress que reclame `/`.

## Exercise 1.11: persisting data

The request counter is saved in the file `pingpong.txt` in the folder `FILES_DIR`
(default `/usr/src/app/files`), which is mounted from the PersistentVolumeClaim `shared-claim`.
The counter is read again at startup, so it survives pod restarts.

Build and push the new image, then deploy (the volume is created from `persistentvolumes/`):

    docker build -t pjairon/ping-pong:1.11 .
    docker push pjairon/ping-pong:1.11
    kubectl apply -f manifests/deployment.yaml
