const Coach = require('../models/coach');

exports.coachSignup = (req, res) => {
    console.log('req.body', req.body)
    const coach = new Coach(req.body)

    coach.save((err, user) => {
        if (err) {
            return console.error(err, "bad gateway")
        }
        res.json(user)
    })
}