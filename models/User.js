const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    studentID: {
        type: String,
        required: [true, 'กรุณากรอกรหัสนักศึกษา 13 หลัก']
    },
    username: {
        type: String,
        required: [true, 'กรุณากรอกชื่อผู้ใช้งาน']
    },
    email: {
        type: String,
        required: [true, 'กรุณากรอก email']
    },
    password: {
        type: String,
        required: [true, 'กรุณากรอกรหัสผ่าน']
    }
})

UserSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        next()
    }).catch(error => {
        console.error(error)
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User