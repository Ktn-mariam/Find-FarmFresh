import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = 6000
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
