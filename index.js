const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const app = express()

const port = 8000

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors())

// const corsOptions = {
//   origin: '*' //'https://elliotec.com'
// }

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'sydnie.watsica15@ethereal.email',
        pass: 'MznSzyrmgybWYtH3kM'
    }
});

let mailOptions

app.post('/contact', (req, res) => {
  console.log(req.body)
  mailOptions = {
    to: 'sydnie.watsica15@ethereal.email',
    from: req.body.email,
    subject: req.body.subject,
    text: req.body.message
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) res.send(err)
    else res.redirect('https://elliotec.com')
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

