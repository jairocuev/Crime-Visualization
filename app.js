const express= require("express");
const reportsRoute = require('./routes/report')

const app= express();

app.use(express.json());

app.use('/report', reportsRoute);


app.listen(5000, ()=> {console.log("server is running on 5000")});