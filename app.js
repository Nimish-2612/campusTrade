const fs = require('fs');
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

app.get("/products", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "products.html");
  res.sendFile(htmlFilePath);
});

app.get("/list-products", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "list-products.html");
  res.sendFile(htmlFilePath);
});

app.post("/list-products", function (req, res) {
  const product = req.body;
  const FilePath = path.join(__dirname, "data", "products.json");
  const fileData = fs.readFileSync(FilePath);
  const storedProducts = JSON.parse(fileData);

  storedProducts.push(product);
  fs.writeFileSync(FilePath,JSON.stringify(storedProducts));

  res.redirect('/confirm');
});

app.get("/confirm", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(htmlFilePath);
});

app.listen(5000);
