const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const jwt = require('jsonwebtoken')
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const { loginRouter } = require('./routers/login.route')
const { dashboardRouter } = require('./routers/dashboard.route')

const port = 3000

const server = express()

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'view'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, 'public')))

server.use(methodOverride('_method'))

server.use(express.json())

server.use('/admin/login', loginRouter)

server.use('/dashboard', dashboardRouter)

server.listen(port, () => console.log(`Server is running at http://localhost:${port}`))