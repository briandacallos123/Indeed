require('dotenv').config()

const cors = require('cors')
const mongoose = require('mongoose');
const express = require('express');
const Job = require('./route/job')
const Auth = require('./route/auth')
const app = express();


app.use(express.json())
app.use(cors({origin:"*"}))

app.use('/job', Job)
app.use('/auth', Auth)
app.use("/uploads", express.static("uploads"))
mongoose.connect(process.env.DB_CONN)
  .then(() => {
    app.listen(5000, ()=>{
      console.log("Listening on port 5000")
    })
  });

