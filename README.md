navigate into the project folder and run:

```bash
~/.meteor/meteor run
```

connect to the MongoDB server:

```bash
docker run \
    --network host \
    --name container-m-j-3-mongosh \
    -it \
    --rm \
    mongodb/mongodb-community-server:6.0.12-ubuntu2204 \
        mongosh \
            mongodb://127.0.0.1:3001/meteor
```

On Linux, you can use the `--network host` option
to make the container share the host’s network namespace.
This allows the container
to access services running on the host
using `127.0.0.1`.
