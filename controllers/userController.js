import mongoose from "mongoose";
import Users from "../models/Users.js";
import bcrypt from "bcrypt";
export const createUser = async (req, res) => {
  const { username, password } = req.body;
  const duplicate = await Users.findOne({ username });
  if (duplicate) {
    return res
      .status(409)
      .json({ error: `User with username ${username} already exists` });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const user = await Users.create({
      username,
      password: await bcrypt.hash(password, salt),
    });

    return res.status(201).json({
      success: `user with ${username} is created`,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().select("username").lean();
    console.log(users);

    return res.json(users);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findOne({ _id: id }).exec();

    if (!user) return res.sendStatus(204);

    user.deleteOne({ _id: id });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);

    return res.sendStatus(500);
  }
};
