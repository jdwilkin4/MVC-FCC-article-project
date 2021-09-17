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
        console.log(`TB test: There was an error verifying the email: ${err}`)
    } else {
        console.log(`TB test: Success: ${success}`)
    }
})
exports.tbTests = (req, res) => {
    let mailOptions = {
        from: email,
        to: `${req.body.tbTestsEmails}`,
        cc: email,
        subject: "Please get your TB Test",
        text: "Our records show that you have not done your TB test. You need to complete it to start coaching.",
    }

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log(`TB test: There was an error sending the message: ${err}`)
            res.json({ status: 'Email failure' })
        } else {
            console.log(`TB test: Success: Email was sent`)
            res.json({ status: "Email sent" });
        }
    })
}