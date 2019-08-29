const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const schedule = require('node-schedule');
const user =  require('./routes/api/user');
const employee =  require('./routes/api/employee');
const metrics =  require('./routes/api/metrics');

// cron.schedule('0 0 10 * * Mon', () => {
//     console.log('running on Sundays of January and September');
//   });

const app = express();
// app.use(express.static('public'));
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(()=>console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.use('/api/user', user);
app.use('/api/employee', employee);
app.use('/api/metrics', metrics);

app.get('/', (req,res,next) => {
    res.send("server Connected");
});


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

const port = process.env.PORT || 5000;
app.listen(port,()=> {
console.log(`Server is Listening on ${port}`);
});

