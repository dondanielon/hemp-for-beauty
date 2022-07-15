const { Product, Op, Ingredient } = require("../db");

async function getAllProducts ({ order, option }) {
  const products = await Product.findAll({
    order: [[option, order]],
    include: { model: Ingredient, attributes: ["name", "description"], through: { attributes: [] } }
  });
  return {
   message: "Products List",
   status: 200,
   data: products 
  };
};

async function getProductDetails({ id }) {
  const product = await Product.findOne({ 
    where: { id: id },
    include: { model: Ingredient, attributes: ["name", "description"], through: { attributes: [] } }
  });
  return {
    message: "Product found",
    status: 200,
    data: product 
   };
};

module.exports = {
  getAllProducts,
  getProductDetails
};