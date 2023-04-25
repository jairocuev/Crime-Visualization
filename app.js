const express = require('express');
const reportsRoute = require('./routes/report');
const usersRoute = require('./routes/user');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());

app.use('/report', reportsRoute);
app.use('/user', usersRoute);

app.listen(5000, () => {
  console.log('server is running on 5000');
});
