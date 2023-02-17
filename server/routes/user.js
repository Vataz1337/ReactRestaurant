const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post("/", (req, res) => {
    fs.readFile("json_files/users.json", (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                fs.writeFile("json_files/users.json", JSON.stringify([]), function (err) {
                    if (err) {
                        res.status(500).send("Error creating users data file");
                    } else {
                        addUser(req, res);
                    }
                });
            } else {
                res.status(500).send("Error reading users data file");
            }
        } else {
            addUser(req, res, JSON.parse(data));
        }
    });
});

function addUser(req, res, users = []) {
    const { user, pwd, email } = req.body;
    if (users.find(u => u.email === email || u.user === user)) {
        res.status(409).send("User with the same email or name already exists");
    } else {
        users.push({ user, pwd, email });
        fs.writeFile("json_files/users.json", JSON.stringify(users), err => {
            if (err) {
                res.status(500).send("Error saving users data");
            } else {
                res.status(201).send("User created");
            }
        });
    }
}

router.post("/login", (req, res) => {
    const { user, pwd } = req.body;
    fs.readFile("json_files/users.json", (err, data) => {
        if (err) {
            res.status(500).send("Error reading users data file");
        } else {
            const users = JSON.parse(data);
            const foundUser = users.find(u => u.user === user && u.pwd === pwd);
            if (foundUser) {
                res.status(200).send(user);
            } else {
                res.status(401).send("Invalid username or password");
            }
        }
    });
});

module.exports = router;