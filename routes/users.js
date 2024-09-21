import express from "express";

import {
  createUser,
  getAllUsers,
  deleteUser,
  updateUsername,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").delete(deleteUser).put(updateUsername);
export default router;
