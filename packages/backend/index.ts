"use strict";

const express = require('express');
const app = express();
const port = 3000;

app.get(`/`, (request: any, response: any) => {
    response.send('Hello from Express!')
});

app.listen(port, (err: Error) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});