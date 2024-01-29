const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  routes 
app.use('/api/task', require('./routers/taskRoute.js'));

// error handling 
app.use(require('./middlewares/error-contoller.js'));


module.exports = app;