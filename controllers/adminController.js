const User = require('../models/User')
const Student = require('../models/Student')

module.exports = async (req, res) => {
 
    if(req.session.userId == "65cf202d5c3b8db9dfdc7689"){
        let UserData = await User.find({ /* ตัวกรองข้อมูล (ถ้ามี) */ }).exec();
        let students = await Student.find();
        let DemoData = await User.findById(req.session.userId);
res.render('admin', { UserData , students,DemoData});
    }else {
        res.redirect('home')
    }
   
    
}