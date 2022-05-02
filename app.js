const express = require('express')
const app = express()
const port = 3000

app.use(async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-auth-token, Accept,X-Access-Token, X-Key");
    next();
})

app.use("/api/github", require('./router/github-api'));

app.listen(port, () => {
    console.log(`app server listening on port ${port}`)
})