import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";
import productRouter from "./routes/product.js";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
const app = express();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

main();
app.use(express.json());
app.use(express.static(join(__dirname,"public")))
app.use((err, req, res, next) => {
  console.log("error", err);
  next();
});
app.use((req, res, next) => {
  console.log(`${req.url}\n${req.originalUrl}\n${req.method}`);
  next();
});
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "views", "index.html"));
});

app.use("/users", userRouter);
app.use("/products", productRouter);

app.all("*", (req, res) => {
  if (req.accepts("text/html")) {
    res.status(404).send("404 Not Found");
  } else if (req.accepts("json")) {
    res.status(404).json({ error: "404 Not Found" });
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(3000, () => {
    console.log("running on port 3000");
  });
});
async function main() {
  await mongoose.connect("mongodb://localhost:27017/cartapp");
}
