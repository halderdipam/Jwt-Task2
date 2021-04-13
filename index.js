const express = require('express');
const app = express()
const request = require('request');
const jwt = require('jsonwebtoken');

const auth = require('./middleware/auth')


url = 'https://jsonplaceholder.typicode.com/posts'

app.get('/', (req, res) => {
    res.send({ message: 'Hi dipam' })
})


app.get('/login', (req, res) => {

    const userId = 'dipam'
    const user = { name: userId }
    const accessToken = jwt.sign(user, 'auth', {
        expiresIn: 24 * 60 * 60
    })
    res.header('authorization', accessToken)
    res.send(user)
})

app.get('/api/link',auth,(req, res) => {
    request(url, { json: true }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
      
        return res.send(body)
    });

})
app.get('/link',(req, res) => {
    request(url, { json: true }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
      
        return res.send(body)
    });

})



const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listing on port ${port}..`))