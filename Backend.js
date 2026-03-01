const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port =3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
const  authRoutes = require('./routes/authRoutes');
app.use("/api/auth",authRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/authDB")
.then(()=>{console.log("Mongodb Connected Succesfully");
    app.listen(port,()=>{console.log(`Server is running on port ${port}`)});
})
.catch(error=> console.log(error));




