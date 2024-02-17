const User = require('../models/User')
const Student = require('../models/Student')

module.exports = async (req, res) => {
 
    if(req.session.userId !== "65cf202d5c3b8db9dfdc7689"){
        let UserData = await User.findById(req.session.userId)
        let students = await Student.find();
        res.render('home', { UserData: UserData, students: students });

    }else {
        res.redirect('admin')
    }
    
}