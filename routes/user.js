const express = require('express');
const fs = require('fs');
const { user } = require('../db');
const { addUser, getUser } = require('../controllers/user');

const router = express.Router();

router.post('/add', (req, res) => {
  addUser(req.body);
  res.send({ message: 'Success' });
});

router.get('/get', async (req, res) => {
  const user = await getUser(req.query.uid);
  res.send(user);
});

module.exports = router;
