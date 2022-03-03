const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const app = express();

//1. MIDDLEWARE
//To Use a Middleware  ----app.use
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Create a Middleware
app.use((req, res, next) => 
{
    req.requestTime = new Date().toISOString();
    next();
});

//Mounting the Route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

