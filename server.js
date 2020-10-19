const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLUS_URI;
mongoose.connect(
    // process.env.MONDODB_URI ||
    "mongodb+srv://Admin:Admin123@cluster0.qzape.gcp.mongodb.net/<test>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.on('connected', () => {
    console.log("MongoDB database connection established successfully bro");
});

const postroute = require('./routes/post');
const userroute = require('./routes/user');
const todoroute = require('./routes/todo');

app.use('/post', postroute);
app.use('/user', userroute);
app.use('/todo', todoroute);


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('../build'));
// }

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}

app.listen(port, () => {
    console.log(`Serve is running on port: ${port}`);
})