import express from "express";

import {
  createUser,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").delete(deleteUser);
export default router;
