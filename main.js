const express = require("express");
const app = express();
const path = require("path")


// app.use(express.static("./public"))
/*
app.get("/", (req, res) =>
{
    res.status(200).sendFile(path.resolve(__dirname, "./index.html"))
});
*/

app.get("/", (req, res) =>
{
    res.json([{name: "Messi", number: 10}, {name: "Ronaldo", number: 7}])
});

// app.use(express.static("./public"))
app.get("/contact", (req, res) =>
{
    res.status(200).sendFile(path.resolve(__dirname, "./public/contact.html"))
});

app.all("/*", (req, res) =>
{
    res.status(404).send("<h1>Error Page</h1>")
});

app.listen(5000, () =>
{
    console.log("Server listening on port 5000...")
});