const User = require('../models/User');

module.exports = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            req.flash('error', 'Email already exists');
            return res.send('<script>alert("สมัครไม่สำเร็จ !!!! Email already exists"); window.location.href = "/register";</script>');
        } else {
            await User.create(req.body);
            res.send('<script>alert("สมัครข้อมูลนักศึกษาสำเร็จ"); window.location.href = "/login";</script>');
        }
    } catch (error) {
        console.error(error);
        req.flash('error', 'Server error');
        res.redirect('/register');
    }
};