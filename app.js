const express = require('express');
const reportsRoute = require('./routes/report');
const usersRoute = require('./routes/user');
const cors = require('cors');


const app = express();
const PORT=process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use('/report', reportsRoute);
app.use('/user', usersRoute);

app.listen(PORT, () => {
  console.log('server is running on 5000');
});
