const express = require("express");
const app = express();
const path = require("path")


app.use(express.static("./public"))
/*
app.get("/", (req, res) =>
{
    res.status(200).sendFile(path.resolve(__dirname, "./index.html"))
});
*/

app.use(express.static("./public"))
app.get("/about", (req, res) =>
{
    res.status(200).send("<h1>About</h1>")
});

app.all("/*", (req, res) =>
{
    res.status(404).send("<h1>Error Page</h1>")
});

app.listen(5000, () =>
{
    console.log("Server listening on port 5000...")
});