import express from "express";

const router = express.Router();

// Mock Database
let sellerList = [
  {
    id: "20",
    name: {
      title: "Mr.",
      firstName: "Deepesh",
      lastName: "Lama",
    },
    email: "rddesign64@gmail.com",
    phoneNumber: null,
    nationality: "Nepal",
  },
  {
    id: "21",
    name: {
      title: "Mr.",
      firstName: "Samir",
      lastName: "Thapa",
    },
    email: "thapa_samir003@gmail.com",
    phoneNumber: null,
    nationality: "Nepal",
  },
  {
    id: "22",
    name: {
      title: "Mr.",
      firstName: "Bijay",
      lastName: "Gurung",
    },
    email: "gurungbj45@gmail.com",
    phoneNumber: null,
    nationality: "Nepal",
  },
];

//Added Seller-------------------------------------------------------------
router.post("/seller/add", (req, res) => {
  return res.status(200).send({ message: "Seller Details added Successfully" });
});

//Seller List-------------------------------------------------------------
router.get("/seller/list", (req, res) => {
  return res.status(201).send({ message: "success", sellerList });
});
// Product Delete--------------------------------------------------------
router.delete("/seller/delete/:id", (req, res) => {
  // To extract req.params.id from postman
  const toDeleteSeller = req.params.id;
  const newSellerList = sellerList.filter((element, index, array) => {
    if (element.id !== toDeleteSeller) {
      return element;
    }
  });
  sellerList = structuredClone(newSellerList);
  return res
    .status(201)
    .send({ message: "Seller Details Deleted Successfully" });
});
// Seller Edit------------------------------------------------------------
router.put("/seller/edit/:id", (req, res) => {
  // To extract req.params.id from postman
  const toEditSeller = req.params.id;
  // To extract req.body from postman
  const toEditedValues = req.body;
  // To find product which is available or not
  const editedList = sellerList.find((element, index, array) => {
    return element.id === toEditSeller;
  });
  // If seller not available
  if (!editedList) {
    return res.status(404).send({ message: "Seller Details does not match" });
  }
  // If seller available can edit
  const newEditedSellerList = sellerList.map((element, index, array) => {
    const newElement = { ...element };
    if (newElement.id === toEditSeller) {
      return toEditedValues;
    } else {
      return element;
    }
  });
  sellerList = structuredClone(newEditedSellerList);

  return res.status(200).send({ message: "Seller Details Edited Successfully" });
});

export default router;
