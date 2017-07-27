const guid = require('guid'),
    http = require('http'),
    formidable = 
    require('formidable'),
    mysql = require('mysql');

const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    database : "netcode"
});

// Queries
function GetUsers(funct)  {
    con.connect(); var val;
        con.query("SELECT * FROM Users", funct);
    con.end();
}

function Register(usr,pw)  {
    con.connect(); var val;
        id = guid.raw();
        con.query("INSERT INTO Users (user_id,username,password) "+
            "VALUES ('" +id+"','"+usr+"','"+pw+"')", (error,results,fields) => {
             val = (results.affectedRows == 1);
        });
    con.end();
    return val;
}

function Login(usr,pw)  {
    con.connect(); var val;
        con.query("SELECT username FROM Users WHERE username = '"+usr+"'"+
        " AND password = '"+pw+"';", (error,results,fields) => {
            val = (results.username == usr);
        });
    con.end();
    return val;
}

http.createServer(function (req, res) {
    console.log("Request - " + req.url);
    switch (req.url) {
        case '/favicon.ico':
            res.writeHead(200,{"Content-Type":"image/ico"});
            fs.createReadStream("video/god_knows_video.mp4")
            .pipe(res);
            res.end();
        break;
        case "/users": // Only available to see if logged in
            res.writeHead(200,{'Content-Type':'text/html'})
            items = GetUsers( (error,items,fields) => {
                if(error) throw error;
                res.write("<ul>");
                for(var i=0; i < items.length; i++)
                    res.write("<li><a href='users/" + items[i]
                        + "'>"+ items[i].username +"</a></li>");
                res.write("</ul>");
                res.end();
            });
            break;
        default:
            res.writeHead(301, {
                Location: '/login'
            });
            res.end();
        break;
  }
}).listen(8080, () => {
    console.log("Server is running");
});