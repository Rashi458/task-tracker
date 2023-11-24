// ---Server creation---
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Load config from env file --
require("dotenv").config();
const port = process.env.PORT|| 8000;

// middleware to parse json request body(express.json is middleware here)
app.use(express.json());

// importing databases --
require("./config/database").connect();

// import routes for user --
const user = require("./routes/user");
app.use("/api/v1",user);

// import routes for todo api --
const todoroute = require("./routes/todo.js");

// mount the todo API routes --
app.use("/api/v1",todoroute);


// import routes for cat api --
const catroute = require("./routes/cat");
app.use("/api/v1",catroute);

// Activate the server on 4000 port --
app.listen(port,()=>{
    console.log("server started at 4000 port")
})




//connect to the database
// const dbconnect = require("./config/database");
// dbconnect();



// -- cat,auth,todo hi main hain tumhara --