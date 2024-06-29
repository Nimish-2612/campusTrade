const express = require("express");
const uuid = require("uuid");

const prodData = require("../utility/productData");
const router = express.Router();

router.get("/products", function (req, res) {
  let order = req.query.order;
  let nextOrder = 'desc';
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if(order === 'desc'){
    nextOrder='asc';
  }
  const storedProducts = prodData.getStoredProducts();

  storedProducts.sort(function (item1, item2) {
    if (
      (order === "asc" && item1.name > item2.name) ||
      (order === "desc" && item2.name > item1.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("products", {
    numberOfItems: storedProducts.length,
    items: storedProducts,
    nextOrder:nextOrder
  });
});

router.get("/products/:id", function (req, res) {
  const itemID = req.params.id;
  const storedProducts = prodData.getStoredProducts();

  for (const item of storedProducts) {
    if (item.id === itemID) {
      return res.render("item-detail", { item: item });
    }
  }

  res.status(404).render("404");
});

router.get("/list-products", function (req, res) {
  res.render("list-products");
});

router.post("/list-products", function (req, res) {
  const product = req.body;
  product.id = uuid.v4();

  const storedProducts = prodData.getStoredProducts();

  storedProducts.push(product);

  prodData.storeProducts(storedProducts);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
