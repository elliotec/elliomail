// "use strict";
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//      user: 'sydnie.watsica15@ethereal.email',
//      pass: 'MznSzyrmgybWYtH3kM'
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
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

