const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 

const sessionSchema = new Schema({

    namePlayer:{type:String,required: true,unique: true},
    dataSession:{ type: Date, default: Date.now},
    amountStep:{type:Number, min:3,required:true}

  });



module.exports =  sessionSchema;
