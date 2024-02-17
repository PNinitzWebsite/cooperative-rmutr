const mongoose = require('mongoose');

// สร้างโครงสร้างของข้อมูลนักศึกษา
const studentSchema = new mongoose.Schema({
    companyName: { type: String, required: [true,'อย่าลืมกรอกชื่อสถานที่ฝึกงาน' ]},
    companyAddress: { type: String, required:[ true,'อย่าลืมกรอกที่อยู่สถานที่ฝึกงาน'] },
    firstName: { type: String, required:[ true,'อย่าลืมกรอกชื่อ']},
    lastName: { type: String, required: [ true,'อย่าลืมกรอกนามสกุล'] },
    studentID: { type: String, required: [ true,'อย่าลืมกรอกรหัสนักศึกษา 13 หลัก'] },
    phoneNumber: { type: String, required: [ true,'อย่าลืมกรอกเบอร์โทรศัพท์'] },
    jobDetails: { type: String, required: [ true,'อย่าลืมกรอกที่หน้าที่การทำงานของนักศึกษา'] }, // เปลี่ยนชื่อฟิลด์
    image: { type: String, required: [ true,'อย่าลืมเพิ่มรูปภาพ'] },
    dateTime: { type: Date, default: Date.now }, // เพิ่มฟิลด์ dateTime
    isApproved: { type:String ,required: false}

});

// สร้างโมเดลของข้อมูลนักศึกษา
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;