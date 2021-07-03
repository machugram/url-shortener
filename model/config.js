const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/urlshortener';

mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
module.exports = connection;