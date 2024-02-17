const User = require('../models/User'); // Import User model

module.exports = async (req, res) => {
    let studentID = ""
    let username = ""
    let email = ""
    let password = ""
    let data = req.flash('data')[0]

    if (typeof data != "undefined") {
        studentID = data.studentID
        username = data.username
        email = data.email
        password = data.password
    }

    try {
        const existingUser = await User.findOne({ email: email }); // Check if email already exists in database
        if (existingUser) {
            req.flash('validationErrors', 'Email already exists'); // Flash error message
            return res.redirect('/register'); // Redirect back to registration page
        }

        res.render('register', {
            errors: req.flash('validationErrors'),
            studentID:studentID,
            username: username,
            email: email,
            password: password
        });
    } catch (error) {
        console.error(error);
        req.flash('validationErrors', 'Server error');
        res.redirect('/register');
    }
}
