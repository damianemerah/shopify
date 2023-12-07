const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//static files
app.use(express.static(path.join(__dirname, 'public')));

console.log(process.env.NODE_ENV);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Body parser
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).render('base');
});
//ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/category', categoryRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
