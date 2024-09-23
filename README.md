<u>TODO: (2024/09/21, 20:24)</u>: remove the Meteor packages calles `insecure` and `autopublish`

navigate into the project folder and run:

```bash
USER_1_USERNAME=test1 \
  USER_1_PASSWORD=pass1 \
  USER_2_USERNAME=test2 \
  USER_2_PASSWORD=pass2 \
  ~/.meteor/meteor run
```

if your development machine is running a Linux OS,
you can use the following command in order to
connect to the MongoDB server:

```bash
docker run \
    --network host \
    --name container-a-b-mongosh \
    -it \
    --rm \
    mongodb/mongodb-community-server:6.0.12-ubuntu2204 \
        mongosh \
            mongodb://127.0.0.1:3001/meteor
```

(
On Linux, you can use the `--network host` option
to make the container share the host’s network namespace.
This allows the container
to access services running on the host
using `127.0.0.1`.
)

```bash
meteor [direct: primary] meteor> show tables;
tasks
users

meteor [direct: primary] meteor> db.users.find()
[
  {
    _id: 'z4nCiKS6249DcYxB6',
    createdAt: ISODate('2024-09-21T12:16:52.549Z'),
    services: {
      password: {
        bcrypt: '$2b$10$lPp7jhRf87SwBhI9mc7m9ecs7oFLIGW5kQbTvyCmm33oCMYmnMnhi'
      }
    },
    username: 'meteorite'
  }
]
```
