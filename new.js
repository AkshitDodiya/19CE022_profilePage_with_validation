const { urlencoded } = require('express');
const express= require('express');
// const helmet=require('helmet');

const https= require('https');
const path= require('path');
const fs= require('fs');

const app=express();
// app.use(helmet());

app.use(express.urlencoded({
    extended:true
}))


const httpsServer=https.createServer({
    key:fs.readFileSync(path.join(__dirname,'certi','key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'certi','cert.pem'))
},app);

app.listen(3030,()=> console.log('Server Listening on Port number 3030'));
