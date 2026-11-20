# Ping-pong

Aplicación que responde `pong N` a un GET en `/pingpong` e incrementa un contador en memoria en cada petición (se reinicia si el pod se reinicia).

## Imagen

    docker build -t pjairon/ping-pong:1.9 .
    docker push pjairon/ping-pong:1.9

## Despliegue

    kubectl apply -f manifests

El Ingress `shared-ingress` es compartido con "Log output": `/pingpong` va a ping-pong y `/` va a log-output. Requiere que no exista otro Ingress que reclame `/`.
