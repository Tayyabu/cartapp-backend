import express from "express";
import { join } from "path";
import multer from "multer";
import { __dirname } from "../index.js";
import fs from "fs";
import fsPromises from "fs/promises";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    return cb(null, "./public/uploads");
  },
  filename: async function (req, file, cb) {
    const filepath = `${crypto.randomUUID()}-${file.originalname}`;
    if (!fs.existsSync(join(__dirname, "public", "uploads"))) {
      console.log("making folder uploads");

      await fsPromises.mkdir(join(__dirname, "public", "uploads"), {
        recursive: true,
      });
    }
    if (!req.body.fileUrls) {
      req.body.fileUrls = [];
    }
    req.body.fileUrls = [
      ...req.body.fileUrls,
      `http://localhost:3000/uploads/${filepath}`,
    ];

    return cb(null, filepath);
  },
});

const upload = multer({ storage });

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
