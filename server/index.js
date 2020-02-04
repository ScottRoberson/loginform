const express = require('express');
const volleyball = require('volleyball');

const app = express();

const auth = require('./auth/index.js');

app.use(volleyball);
app.use(express.json());


app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
})

app.use('/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})