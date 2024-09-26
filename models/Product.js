import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type:Number,
    min: 0,
    default: 0,
    required: true,
  },

  category: {
    type: String,
    required:true
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: { type: Date, default: () => Date.now() },
});

productSchema.statics.findByName = async function (name) {
  return await this.findOne({ name });
};

export default mongoose.model("Product", productSchema);

//https://docs.mongodb.com/manual/?utm_source=vscode&utm_medium=product
