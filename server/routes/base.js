app.get("/", indexPage);

app.all("*", errorPage);
