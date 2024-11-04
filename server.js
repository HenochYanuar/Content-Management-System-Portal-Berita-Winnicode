const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const { err500, err404 } = require('./utils/error')
const { loginRouter } = require('./routers/login.route')
const { dashboardRouter } = require('./routers/dashboard.route')
const { articleRouter } = require('./routers/article.route')
const { userRouter } = require('./routers/user.route')

const port = 8000

const server = express()

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'view'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, 'public')))

/* New Route to the TinyMCE Node module */
server.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')))

server.use(methodOverride('_method'))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())

server.use('/admin', loginRouter)

server.use(expressLayouts)

server.use('/admin', dashboardRouter)

server.use('/admin', articleRouter)

server.use('/admin', userRouter)

server.use((req, res, next) => {
  res.status(404).render('error/error', err404)
})

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  console.log(`Follow this url to access the dashboard: http://localhost:${port}/admin/dashboard`)
})