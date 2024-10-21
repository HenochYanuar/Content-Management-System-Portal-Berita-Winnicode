const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const port = 3000

const server = express()

server.use(express.json())


server.listen(port, () => console.log(`Server is running at http://localhost:${port}`))