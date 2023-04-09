const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const generateURL = require('./generate_URL')
const bodyParser = require('body-parser')
const URL = require('./models/url')

const mongoose = require('mongoose')
const dotenv = require("dotenv");

dotenv.config()
mongoose.connect( process.env.MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req,res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  if (!req.body.originalURL) {
    return res.render("error")
  }
  const originalURL = req.body.originalURL
  const shortenURL = generateURL()
  URL.findOne({ originalURL })
    .then(data =>
      data ? data : URL.create({ originalURL, shortenURL })
    )
    .then(data =>
      res.render("index", {
        originalURL,
        shortenURL: data.shortenURL,
      })
    )
    .catch(error => console.error(error))
})

app.get('/:URLId', (req, res) => {
  
} )

app.listen(port, ()=> {
  console.log(`The web is on local:${port}`)
})