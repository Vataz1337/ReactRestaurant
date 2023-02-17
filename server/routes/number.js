const express = require('express');
const router = express.Router();

let currentNumber = 1;

router.get('/', (req, res) => {
    res.send({ number: currentNumber });
    currentNumber = (currentNumber % 10) + 1;
});

module.exports = router;