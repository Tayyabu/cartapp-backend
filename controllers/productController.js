import Product from "./../models/Product.js";
import { z } from "zod";

const productSchema = z.object({
  name: z.string(),
  price: z.coerce.number().min(0, "Price should be greater than 0"),
  fileUrls:z.array(z.string()),
  category: z.string(),
});



export const createProduct = async (req, res) => {


  const productData = req.body;


  const { success, data, error } = productSchema.safeParse(productData);

  if (success === false) {
    return res.status(400).json({ error: error.formErrors.fieldErrors });
  }
  console.log(data);
  

  try {
    const duplicate = await Product.findOne({ name: data.name });

    if (duplicate) {
      return res.status(409).json({ error: "Product already exist" });
    }

    const newProduct = await Product.create(data);

    return res
      .status(201)
      .json({
        success: `A product with of name ${newProduct.name} is created`,
      });
  } catch (error) {
    console.log(error);
    
    return res
      .status(500)
      .json({ error: "Some thing went wrong on server.Please , try later" });
  }
};

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();

    return res.status(200).json(products);
  } catch (error) {
    return res.sendStatus(500);
  }
}



