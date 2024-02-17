const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    const { email, password } = req.body 

    User.findOne({ email: email }).then((user) => {
        console.log(user)

        if (user) {
            let cmp = bcrypt.compare(password, user.password).then((match) => {
                // if (match) {
                //     req.session.userId = user._id
                //     res.redirect('/home')
                // }
                if (match && user._id == "65cf202d5c3b8db9dfdc7689") {
                    req.session.userId = user._id
                    res.redirect('/admin')
                } else {
                    req.session.userId = user._id
                    res.redirect('/home')
                }
            })
        } else {
            res.redirect('/login')
        }
    })
}