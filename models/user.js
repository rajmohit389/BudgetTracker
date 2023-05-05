const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const ExpendSchema=new mongoose.Schema({
    value:Number,
    mark:Number
})

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: String,
    totalBalance: {
        type:Number,
        default: 0
    },
    foodExpenditure:[ExpendSchema],
    medicineExpenditure: [ExpendSchema],
    gymExpenditure: [ExpendSchema],
    groceryExpenditure: [ExpendSchema],
    leisureExpenditure: [ExpendSchema],
    miscExpenditure: [ExpendSchema]
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
