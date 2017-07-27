var express = require('express');

app = express();

app.get("/",(req,res) => {
    res.setHeaders(200, {"Content-Type":"text/html"})
    res.send("<title></title>")
});

app.listen(80, () => {
    console.log("Server now running..");
});