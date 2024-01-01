const mongoose = require('mongoose');

const jobModel = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    companyName:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    isActive:{
        type:Number,
        require:true
    },
    isDeleted:{
        type:Number,
        require:true
    },
    fulltime:{
        type:String,
        require:true
    },
    schedule:{
        type:String,
        require:true
    },
    salary:{
        type:String,
        require:true
    },
    shift:{
        type:String,
        require:true
    },
})




const jobModels = mongoose.model('jobs', jobModel);

module.exports = jobModels;
