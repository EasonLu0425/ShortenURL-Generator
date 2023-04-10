const express = require("express")
const exphbs = require("express-handlebars")
require("./config/mongoose")

const URL = require("./models/url")
const generateURL = require("./generate_URL")

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
app.use(express.static("public"))
process.on('uncaughtException', function (err) {
    console.log(err);
}); 

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

app.get("/:shortenURL", (req, res) => {
  const { shortenURL } = req.params

  URL.findOne({ shortenURL })
    .then(data => {
      if (!data) {
        return res.render("nourl",)
      }
      res.redirect(data.originalURL)
    })
    .catch(error => console.error(error))
})

app.listen(port, ()=> {
  console.log(`The web is on local:${port}`)
})