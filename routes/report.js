const express = require('express');
const checkToken = require('../middleware/checkAuth');
const {addReport} = require('../controllers/report')

const router = express.Router();

router.post('/add', checkToken, (req, res) => {
  if (req.user.role === 'admin') {
    addReport(req.body, 'approved')
  }else if(req.user.role === 'user'){
    addReport(req.body, 'pending')
  }
  res.send({message: "Success"});
});

module.exports = router;
