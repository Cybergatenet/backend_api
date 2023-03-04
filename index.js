const express = require('express')
const app = express()
const PORT = 5001

app.get('/', (req, res) => {
    res.json('Server is now running...')
})


app.listen(PORT, () => console.log(`Fundmenaija Server Started on port ${PORT}`))