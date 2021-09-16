require('dotenv').config();
const nodeMailer = require('nodemailer');
const Coach = require('../models/coach');
const email = process.env.EMAIL;
const password = process.env.PASSWORD


let transporter = nodeMailer.createTransport({
    service: 'outlook',
    port: 587,
    secure: false,
    auth: {
        user: email,
        pass: password
    }
});

transporter.verify((err, success) => {
    if (err) {
        console.log(`There was an error verifying the email: ${err}`)
    } else {
        console.log(`Success: ${success}`)
    }
})
exports.applications = (req, res) => {
    let mailOptions = {
        from: email,
        to: `${req.body.applicationEmails}`,
        cc: email,
        subject: "Please Complete your application",
        text: "Our records show that you have not completed your application. You need to complete it to start coaching.",
    }

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log(`There was an error sending the message: ${err}`)
            res.json({ status: 'Email failure' })
        } else {
            console.log(`Success: Email was sent`)
            res.json({ status: "Email sent" });
        }
    })
    console.log(`this is an application post:`)
}