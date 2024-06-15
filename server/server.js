const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./controllers/logger");
const { User, Account } = require("./models/models");
const accounts = require("./routes/accounts");
const authRoute = require("./routes/auth");


const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(logger);
app.use("/accounts", accounts);
app.use("/auth", authRoute);


app.get("/", () => "Hello world");

// app.all("*", errorPage);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
