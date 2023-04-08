const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req,res) => {
  res.render('index')
})

app.get('/:URLId', (req, res) => {
  
} )

app.listen(port, ()=> {
  console.log(`The web is on local:${port}`)
})