const express = require('express')
const bodyParser = require('body-parser')
const uploader = require('express-fileupload')

const app = express()

const PORT = 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(uploader())

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST,GET')
  next()
})

app.post('/upload_video', (req, res) => {
  console.log(req);
  res.send({
    msg: 'ok',
    code: 0
  })
})

app.listen(PORT, () => {
  console.log('Server is running on ' + PORT)
})
