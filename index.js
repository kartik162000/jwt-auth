const express=require('express');
const app=express();
app.use(express.json());
app.use('/user',require('./src/routes/userRoutes'));

app.listen(8000,()=>{
    console.log("I am running server");
});