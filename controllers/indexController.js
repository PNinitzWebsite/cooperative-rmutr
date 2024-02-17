const User = require('../models/User')

module.exports = (req, res) => {
    User.findById(req.session.userId).then((user) => {
        if (!user) {
            res.render('index')
        }
        if(user && req.session.userId == "65cf202d5c3b8db9dfdc7689"){
            res.redirect('admin')
        }
        if(user){
            res.redirect('home')
        }
        console.log('User logged in successfully')
        next()
    }).catch(error => {
        console.error(error)
    })
    
}