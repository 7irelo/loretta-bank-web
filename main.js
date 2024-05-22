const http = require("http")
const { readFileSync } = require("fs")

const index = readFileSync("index.html")
const about = readFileSync("about.html")

const server = http.createServer((req, res) =>
{
    if (req.url === "/")
    {
        res.writeHead(200, {"content-type": "text/html"})
        res.write(index)
        res.end()
    }
    else if (req.url === "/about")
    {
        res.writeHead(200, {"content-type": "text/html"})
        res.write(about)
        res.end()
    }
    else 
    {
        res.writeHead(404, {"content-type": "text/html"})
        res.write("<h1>404 Page Not Found</h1>")
        res.end()
    }
});

server.listen(5000, () =>
{
    console.log("Server listening on port 5000...")
});