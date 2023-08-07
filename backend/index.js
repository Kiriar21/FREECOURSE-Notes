const express = require('express');
const app = express();
const { port } = require('./config');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');

//db
require('./db/mongoose');

//parsery
//Content-type: applications/json
app.use(bodyParser.json());

// routes
app.use('/api', apiRouter);

// server
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});