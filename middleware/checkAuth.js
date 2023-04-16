const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    var x = req.headers.authorization.split(' ')[1]; //This is just an example, please send token via header
        if (x && jwt.verify(x,'teststring'))
        {
           req.user = jwt.decode(x);
           next();
        }
        else
        {
           res.status(401).send({'error': "Unauthorized"})
        }
        }

module.exports = checkToken;