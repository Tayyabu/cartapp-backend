import express from "express";
import multer from "multer";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
const upload = multer({ dest: "/uploads" });
const router = express.Router();

router
  .route("/")
  .post(
    upload.fields([
      { name: "name", maxCount: 1 },
      { name: "price", maxCount: 1 },
      { name: "category", maxCount: 1 },
      { name: "images", maxCount: 3 },
    ]),
    createProduct
  )
  .get(getAllProducts);
export default router;
