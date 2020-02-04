const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Auth Route'
  });
})

router.post('/signup', (req, res) => {
  console.log('body', req.body);
  res.json({
    message: 'Signup occured'
  })
})

module.exports = router;