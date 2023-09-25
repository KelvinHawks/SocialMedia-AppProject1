const express = require('express')
const app = express()

app.use((req,res)=>{
    res.send('<h1>Hello people</h1>')
})

app.listen(5000, ()=>{
    console.log('app listening on port 5000');
})