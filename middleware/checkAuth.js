const jwt = require('jsonwebtoken');
const { getUser } = require('../controllers/user');

function checkToken(req, res, next) {
  if (!req.headers.authorization) {
    next();
  }
  const token = req.headers.authorization.split(' ')[1];
  if (token && jwt.verify(token, 'teststring')) {
    req.user = jwt.decode(token);
    getUser(req.user.uid).then((d) => {
      req.user.role = d.role;
      next();
    });
  } else {
    res.status(401).send({ error: 'Unauthorized' });
  }
}

function checkAdmin(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (token && jwt.verify(token, 'teststring')) {
    req.user = jwt.decode(token);
    getUser(req.user.uid).then((d) => {
      if (d.role === 'admin') {
        next();
      } else res.status(401).send({ error: 'Unauthorized' });
    });
  } else {
    res.status(401).send({ error: 'Unauthorized' });
  }
}

module.exports.checkToken = checkToken;
module.exports.checkAdmin = checkAdmin;
