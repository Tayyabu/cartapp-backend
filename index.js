import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/users.js'
import productRouter from './routes/product.js'
const app = express();

main();
app.use(express.json())

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users",userRouter)
app.use("/products",productRouter)

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(3000, () => {
    console.log("running on port 3000");
  });
});
async function main() {
  await mongoose.connect("mongodb://localhost:27017/cartapp");
}
