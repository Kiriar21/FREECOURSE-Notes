const express = require('express');
const router = express.Router();

const testActions = require('../actions/api/test');


// router.get('/', (req, res) => {
//     res.send('Server running!');
//   });
  
router.get('/', testActions.homepage);

module.exports = router;