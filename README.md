# fs-demo-rest-services
## Installation

Requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd fs-demo-rest-services
npm i
npm start
```

## Testing

Verify the GET method api once application server started
your preferred browser or postman.

```sh
localhost:3000/api/github/repositories?q=created:>2022-01-01&sort=stars&per_page=10
```
