const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile("json_files/foods.json", (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

module.exports = router;