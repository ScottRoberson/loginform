const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');


const app = express();

const middlewares = require('./auth/middlewares');

const auth = require('./auth/index');

app.use(volleyball);
app.use(cors({
  origin: 'http://localhost:8080'
}))
app.use(express.json());
app.use(middlewares.checkTokenSetUser);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
    user: req.user,
  });

})

app.use('/auth', auth);

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found-' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}


app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});