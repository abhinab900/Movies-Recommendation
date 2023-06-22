const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

const Movie = require('./models/Movie')

mongoose.connect('mongodb://127.0.0.1:27017/moviesDB')
.then((res)=>{console.log('Connected to DB');})
.catch((err)=>{console.log(`error connecting to DB, reason : ${err}`);})

const PORT = process.env.PORT || 5000

app.use(express.json())

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))



app.get('/',(req,res)=>{
    res.render('homepage')
})

app.post('/',(req,res)=>{
    for(let movie of req.body.movies){
        Movie.create({
            name:movie.title,
            rating:movie.vote_average,
            release_date:movie.release_date,
            img_url:movie.poster_path
        })
    }
    res.send({message:"Sent data successfully"})
})

app.listen(PORT,()=>{console.log(`Server running at http://localhost:${PORT}`);})