const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist'));

app.get('*',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'../dist/app.html'));
});
app.get('/space',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'../dist/space.jpg'));
});




app.listen(3000,()=>{
    console.log('app is listening on port 3000');
});