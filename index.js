const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')
const Student = require('./models/Student');
const path = require('path');
const multer = require('multer');
const moment = require('moment');



// MongoDB Connection
mongoose.connect('mongodb+srv://RMUTR:13791@cluster0.vmclul4.mongodb.net/RMUTR?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

global.loggedIn = null

// Controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homeController')
const adminController = require('./controllers/adminController')

// Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.set('view engine', 'ejs')


app.get('/', indexController)
app.get('/admin', authMiddleware, adminController)
app.get('/home', authMiddleware, homeController)
app.get('/login', redirectIfAuth, loginController)
app.get('/register', redirectIfAuth, registerController)
app.post('/user/register', redirectIfAuth, storeUserController)
app.post('/user/login', redirectIfAuth, loginUserController)
app.get('/logout', logoutController)



// ตั้งค่า Multer สำหรับการอัปโหลดไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img'); // กำหนดโฟลเดอร์ที่จะเก็บไฟล์
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname)); // กำหนดชื่อไฟล์ใหม่
    }
});

const upload = multer({storage: storage });



// เส้นทางสำหรับการอัปโหลดไฟล์

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        
        // อัปโหลดไฟล์ลง MongoDB
        const student = new Student({
            companyName: req.body.companyName,
            companyAddress: req.body.companyAddress,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            studentID: req.body.studentID,
            phoneNumber: req.body.phoneNumber,
            jobDetails: req.body.jobDetails,
            image: 'img/' + req.file.filename,// เก็บ URL ของไฟล์ภาพ
            dateTime:moment(req.body.dateTime, 'YYYY-MM-DDTHH:mm').locale('th').format('YYYY-MM-DD HH:mm'),
            isApproved: "รอดำเนินการตรวจสอบ"
        });
        await student.save();

        
        res.send('<script>alert("บันทึกข้อมูลนักศึกษาสำเร็จ"); window.location.href = "/home";</script>');
        
        
       
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// GET route เพื่อแสดงข้อมูลนักศึกษาทั้งหมด


// POST route เพื่ออัปเดตสถานะการอนุมัติ (approve)
app.post('/admin/:id/approve', async (req, res) => {
    try {
        const studentId = req.params.id;
        const { isApproved } = req.body;
        await Student.findByIdAndUpdate(studentId, { isApproved });
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// POST route เพื่ออัปเดตสถานะการไม่อนุมัติ (deny)
app.post('/admin/:id/deny', async (req, res) => {
    try {
        const studentId = req.params.id;
        const { isApproved } = req.body;
        await Student.findByIdAndUpdate(studentId, { isApproved });
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});




app.listen(4000, () => {
    console.log("App listening on port 4000")
})