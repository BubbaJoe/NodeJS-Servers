const http = require('http'),
    mime = require('mime'),
    fs = require('fs'),
    formidable = require('formidable');

http.createServer(function (req, res) {
  if (req.url == '/filesubmit') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if(files.file==null) {
          // Redirect Header
        res.writeHead(301, {
            Location: '/'
        });
        res.end();
        return;
      }
      var oldpath = files.file.path;
      var newpath = __dirname + "/files/" + files.file.name;
      res.writeHead(200,{'Content-Type': 'text/html'})
      fs.rename(oldpath, newpath, function (err) {
        if (err) {
            res.write('Error occured: File not uploaded!');
        } else
          res.write('File uploaded and moved! ');
        res.write('<a href="files">View files</a>');
        res.end();
      });
    });
  } else if(req.url == "/files") {
      // 
      res.writeHead(200,{'Content-Type': 'text/html'})
      fs.readdir("files/", (err,items) => {
        res.write("<title>Files</title><h1>Files</h1><hr>");
        if (err) {
            throw err;
            //return;
        }
        res.write("<ul>");
        for(var i=0; i < items.length; i++)
            res.write("<li><a href='files/" + items[i]
                + "'>"+ items[i] +"</a></li>");
        res.write("</ul>");
         res.end();
      });
      
  } else if(fs.statSync(__dirname + req.url).isFile()) {
    var request = __dirname + req.url;
    var ext = mime.lookup(request); 
    // Gets the MIME Type of the requested file
    res.writeHead(200, { 
        'Content-Length': fs.statSync(request).size, 
        // File Size
        "Content-Type" : ext.toString() });
        // File MIME ex: text/html, image/jpeg
    fs.createReadStream(request).pipe(res);
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="filesubmit" method="post" enctype="multipart/form-data">');
    res.write('Select File: <input type="file" name="file"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();
  }
}).listen(80, () => {
    console.log("Server is running");
});