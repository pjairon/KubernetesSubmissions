# Log output

Aplicación dividida en dos contenedores dentro de un mismo pod, que comparten un volumen `emptyDir`:

- `writer`: al arrancar genera una cadena aleatoria y cada 5 segundos escribe en `log.txt` una línea con la hora y la cadena.
- `reader`: servidor HTTP que, en un GET a `/`, devuelve el contenido de ese fichero.

## Imágenes

    docker build -t pjairon/log-output-writer:1.10 log_output/writer
    docker build -t pjairon/log-output-reader:1.10 log_output/reader
    docker push pjairon/log-output-writer:1.10
    docker push pjairon/log-output-reader:1.10

## Despliegue

    kubectl apply -f log_output/manifests/deployment.yaml -f log_output/manifests/service.yaml

La ruta `/` se publica con el Ingress compartido `shared-ingress` de `ping_pong/manifests`. No aplicar `log_output/manifests/ingress.yaml`, que choca con él.

Las carpetas `writer/` y `reader/` contienen el código y el Dockerfile de cada contenedor. El `index.js` y el `Dockerfile` de la raíz son los de los ejercicios anteriores (1.1 a 1.9) y ya no se usan en el Deployment.

## Exercise 1.11: persisting data

The reader container also mounts the PersistentVolumeClaim `shared-claim` in `/usr/src/app/pings`
and shows the number of pings saved by ping-pong in the line `Ping / Pongs: N`.

Create the folder in the node and the volume first (see `persistentvolumes/`):

    docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
    kubectl apply -f ../persistentvolumes

Build and push the new reader image, then deploy:

    docker build -t pjairon/log-output-reader:1.11 reader
    docker push pjairon/log-output-reader:1.11
    kubectl apply -f manifests/deployment.yaml
