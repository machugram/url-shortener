const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const connection = require('./model/config')
connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))

// Routes Config
app.use(express.json({
    extended: false
})) //parse incoming request body in JSON format.
app.use('/', require('./routes/redirect'))
app.use('/api/url', require('./routes/url'))
app.listen(port,()=>{
    console.log(`Server started. Listening on port : ${port}`);
})