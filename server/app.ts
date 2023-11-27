import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = 6000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
