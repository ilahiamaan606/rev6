const express=require("express");
const {connection}=require("./db");
const {userrouter}=require("./routes/user.routes")
const {flightrouter}=require("./routes/flight.routes")
const {bookrouter}=require("./routes/book.route")
require("dotenv").config()

const app=express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.use("/user",userrouter);
app.use("/flights",flightrouter);
app.use("/book",bookrouter);

app.listen(process.env.port,async ()=>{
    await connection;
    console.log(`Server running at ${process.env.port}`)
})