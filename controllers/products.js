const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  //   console.log(req.query);
  const { featured, company, title, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  let result = Product.find(queryObject);
  if (sort) {
    // products = products.sort()
    console.log(sort);
    const shortList = sort.split(",").join(" ");
    result = result.sort(shortList);
  } else {
    result = result.sort("createAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.sort(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const getProduct = async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ _id: productID });

  res.status(200).json({ product });
};

const updateProduct = async (req, res, next) => {
  const { id: productID } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ product });
};

const deleteProduct = async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Product.findOneAndDelete({ _id: productID });

  res.status(200).json({ product });
};

module.exports = {
  getAllProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
