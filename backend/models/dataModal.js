const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    name:{
        type:String,
    } ,
    value :{
        type: Boolean
    },
    led2 : {
        type:Boolean
    },
    led3 : {
        type : Boolean
    },
    fan : {
        type : Boolean
    }
})

module.exports = mongoose.model('Component',dataSchema)