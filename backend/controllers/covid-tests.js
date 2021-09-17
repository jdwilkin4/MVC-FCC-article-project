require('dotenv').config();
const nodeMailer = require('nodemailer');
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
        console.log(`Covid Test: There was an error verifying the email: ${err}`)
    } else {
        console.log(`Covid Test: Success: ${success}`)
    }
})
exports.covidTests = (req, res) => {
    let mailOptions = {
        from: email,
        to: `${req.body.covidTestsEmails}`,
        cc: email,
        subject: "Please get your Covid Vaccine",
        text: "Our records show that you have not received a Covid Vaccine. You need to get the vaccine to start coaching.",
    }

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log(`Covid Test: There was an error sending the message: ${err}`)
            res.json({ status: 'Email failure' })
        } else {
            console.log(`Covid Test: Success: Email was sent`)
            res.json({ status: "Email sent" });
        }
    })
}