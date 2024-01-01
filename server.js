const express = require('express');
const app = express();
const port = 8005;
const path= require('path');
const moment = require('moment');

app.set('views','./views');
app.set('view engine','pug');
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
   const currentDay = moment().format('dddd');
   const currentHour = moment().format('HH');
   const workingHours = (currentDay === 'Monday' || currentDay === 'Tuesday' || currentDay === 'Wednesday' || currentDay === 'Thursday' || currentDay === 'Friday') && currentHour >= 9 && currentHour < 17;
  
   if (workingHours) {
     next();
   } else {
     res.status(403).send('Access denied. The website is only available during working hours (Monday to Friday, from 9 to 17).');
   }
});

app.get('/', (req, res) => {
   res.render('home');
});

app.get('/service', (req, res) => {
   res.render('service');
});

app.get('/contact', (req, res) => {
   res.render('Contact');
});


app.listen(port, () => {
 console.log(`Server is running on localhost:${port}`);
});
