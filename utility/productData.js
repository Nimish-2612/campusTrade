const fs = require("fs");
const path = require("path");
const FilePath = path.join(__dirname, "..", "data", "products.json");



function getStoredProducts() {
  const fileData = fs.readFileSync(FilePath);
  const storedProducts = JSON.parse(fileData);

  return storedProducts;
}



function storeProducts(storableProducts) {
  fs.writeFileSync(FilePath, JSON.stringify(storableProducts));
}

module.exports = {
  getStoredProducts: getStoredProducts,
  storeProducts: storeProducts,
};
