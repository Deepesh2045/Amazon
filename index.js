import express from "express";
import productRouter from "./routes/product.routes.js";
import sellerRouter from "./routes/seller.routes.js";
const app = express();
// To make app understand json
app.use(express.json());

// register routes
app.use(productRouter);
app.use(sellerRouter);

// Port
let port = 3002;
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
