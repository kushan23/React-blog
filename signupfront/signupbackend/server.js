const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')
const path = require('path')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("DataBase Active"))


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use('/app', routesUrls)



app.listen(4000, () => {
    console.log("Suppppp");
})

