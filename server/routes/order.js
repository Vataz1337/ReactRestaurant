const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post("/", (req, res) => {
    fs.readFile("json_files/orders.json", (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                fs.writeFile("json_files/orders.json", JSON.stringify([]), function (err) {
                    if (err) {
                        res.status(500).send("Error creating users data file");
                    } else {
                        addOrder(req, res);
                    }
                });
            } else {
                res.status(500).send("Error reading users data file");
            }
        } else {
            addOrder(req, res, JSON.parse(data));
        }
    });
});

function addOrder(req, res, orders = []) {
    const { value, payment } = req.body;
    orders.push({ value, payment });
    fs.writeFile("json_files/orders.json", JSON.stringify(orders), err => {
        if (err) {
            res.status(500).send("Error saving users data");
        } else {
            res.status(201).send("User created");
        }
    });
}

router.get('/', (req, res) => {
    fs.readFile("json_files/orders.json", (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

module.exports = router;