const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();

const schema = Joi.object({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(2).max(30)
    .required(),

  password: Joi.string().min(10).required()

})


router.get('/', (req, res) => {
  res.json({
    message: 'Auth Route'
  });
})

router.post('/signup', (req, res) => {


  const result = schema.validate(req.body)
  res.json(result);

})

module.exports = router;