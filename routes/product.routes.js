import express from "express";

const router = express.Router();

// Mock Database
let productList = [
  {
    id: 1,
    productName: "Iphone 15 Pro Max",
    price: 250000,
    category: "Mobile",
    rating: 4.5,
  },
  {
    id: 2,
    productName: "Apple Laptop",
    price: 300000,
    category: "Laptop",
    rating: 3.5,
  },
  {
    id: 3,
    productName: "Adidas Shoes",
    price: 25000,
    category: "Shoes",
    rating: 4.0,
  },
];

//add product-------------------------------------------------------------
router.post("/product/add", (req, res) => {

  // extract new Product from req.body
  const newProduct = req.body;
  productList.push(newProduct);

  return res.status(201).send({ message: "Added Product Successfully" });
});
// To get product List---------------------------------------------------
router.get("/product/list", (req, res) => {
  return res.status(201).send({ message: "Success", productList });
});
// Product Delete--------------------------------------------------------
router.delete("/product/delete/:id", (req, res) => {

  // To extract req.params.id from postman
  const deletedProduct = Number(req.params.id);
  const newProductList = productList.filter((item, index, array) => {
    return item.id !== deletedProduct;
  });
  productList = structuredClone(newProductList);

  return res.status(200).send({ message: "Product Deleted successfully" });
});
// Product Edit------------------------------------------------------------
router.put("/product/edit/:id", (req, res) => {

  // To extract req.params.id from postman
  const toEditedProduct = Number(req.params.id);

  // To extract req.body from postman
  const editedValues = req.body;

  // To find product which is available or not
  const productFindResult = productList.find((item, index, array) => {
    if (item.id === toEditedProduct) {
      return item;
    }
  });

  // If product not available
  if (!productFindResult) {
    return res.status(400).send({ message: "Product does not match" });
  }
  // If product available
  const newEditedList = productList.map((item, index, array) => {
    const newArr = { ...item };
    if (newArr.id === toEditedProduct) {
      return editedValues;
    } else {
      return item;
    }
  });

  productList = structuredClone(newEditedList);

  return res.status(201).send({ message: "Product Updated Successfully" });
});

export default router;
