const express = require('express')
// const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const app = express()
const port = 8000

dotenv.config()

const { ZOHO_USER, ZOHO_PASS } = process.env;

app.use(express.urlencoded({ extended: true }));
// app.use(cors())

// const corsOptions = {
//   origin: '*' //'https://elliotec.com'
// }

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: ZOHO_USER,
      pass: ZOHO_PASS
    }
});

let mailOptions

app.post('/contact', (req, res) => {
  console.log(req.body)
  mailOptions = {
    to: ZOHO_USER,
    from: `"elliotec.com contact form" <${ZOHO_USER}>`,
    subject: req.body.subject,
    html: `<h4>From: ${req.body.name} - ${req.body.email}</h4><hr/><p>${req.body.message}</p>`
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('ERROR!', err)
      res.send(err)
    } else {
      console.log('SUCCESS!', info)
      res.redirect('https://elliotec.com')
    }
  })
})

app.listen(port, () => console.log(`elliomail listening on port ${port}!`))

