import Product from "./../models/Product.js";
import { z } from "zod";

const productSchema = z.object({
  name: z.string(),
  price: z.number().min(0, "Price should be greater than 0"),
  category: z.string(),
});

export const createProduct = async (req, res) => {
 console.log(req.body);
 console.log(req.files);
 
 res.sendStatus(200)
  // const productData = req.body;

  // const { success, data, error } = productSchema.safeParse(productData);

  // if (success === false) {
  //   return res.status(400).json({ error: error.formErrors.fieldErrors });
  // }
  // try {
  //   const duplicate = await Product.findOne({ name: data.name });

  //   if (duplicate) {
  //     return res.status(409).json({ error: "Product already exist" });
  //   }

  //   const newProduct = await Product.create(data);

  //   return res
  //     .status(201)
  //     .json({
  //       success: `A product with of name ${newProduct.name} is created`,
  //     });
  // } catch (error) {
  //   return res
  //     .status(500)
  //     .json({ error: "Some thing went wrong on server.Please , try later" });
  // }
};

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();

    return res.status(200).json(products);
  } catch (error) {
    return res.sendStatus(500);
  }
}
