const mongoose = require('mongoose');
const dbConf = require('../config/db');
const {sessionSchema} = require('../schema');

mongoose.set('runValidators', true);
mongoose.connect(dbConf.url,{ useNewUrlParser: true }).catch(err=>console.log(err));

const Session = mongoose.model('Session',sessionSchema);


module.exports = {Session};
