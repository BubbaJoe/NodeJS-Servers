const http = require('http'),
    fs = require('fs');

http.createServer((req,res) => {
    res.writeHead(200,{"Content-Type":"video/mp4"});
    fs.createReadStream("video/god_knows_video.mp4")
        .pipe(res);
}).listen(80, () => {
    console.log('server is runnning');
});

