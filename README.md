install the project dependencies:

```bash
~/.meteor/meteor npm install
```

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
appointments
users

meteor [direct: primary] meteor> db.users.find()
[
  {
    _id: 'khSS7ZQj2ED7Jfr8r',
    createdAt: ISODate('2024-09-23T20:44:11.223Z'),
    services: {
      password: {
        bcrypt: '$2b$10$yHao57lYiQqr2Nd25q9F1u29VK71SDL1MktbJX9a.iHCI2LtzDBL.'
      },
      resume: {
        loginTokens: [
          {
            when: ISODate('2024-09-23T20:45:18.929Z'),
            hashedToken: 'sZqGSWfwoamaeGFfnkBz6TFlE2tRKsVR64LjUNLw8ew='
          }
        ]
      }
    },
    username: 'test1'
  },
  {
    _id: '5uugraCA7ehiD5r7L',
    createdAt: ISODate('2024-09-23T20:44:11.361Z'),
    services: {
      password: {
        bcrypt: '$2b$10$s/G0rnDgBaBdB07A3ehxyeUSYU3L.M.invx5DL3f9TSUJBMFHK1F6'
      },
      resume: { loginTokens: [] }
    },
    username: 'test2'
  }
]
```
