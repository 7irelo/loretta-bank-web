const express = require("express");
const logger = require("./middlewares/logger");
const accounts = require("./routes/accountRoutes");
const authRoute = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(logger);
app.use("/accounts", accounts);
app.use("/auth", authRoute);


app.get("/", () => "Hello world");

function errorPage(req, res) {
  res.status(404).send("404 - Not Found");
}

app.all("*", errorPage);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
