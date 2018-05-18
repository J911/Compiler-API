const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const fs = require('fs');
require('dotenv').config();

const runJs = require('./run-js');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/js', (req, res) => {
    const uid = req.body.uid;
    const code = req.body.code;
    const fileName = req.body.fileName;

    fs.writeFileSync(`files/${uid}`, code);
    runJs(uid, fileName, (result)=>{
        exec(`rm files/${uid}`);
        res.end(result);
    });
});

app.listen(PORT);