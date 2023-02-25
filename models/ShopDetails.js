import mongoose from "mongoose";

const shopSchema = mongoose.Schema({
  ownerName: String,
  phoneNo: Number,
  email: String,
  userName: String,
  passWord: String,
  city: String,
  address: String,
  description: String,
  shopType: String,
  workexperience:String,
  selectedFile: String
});

const ShopSchema = mongoose.model("ShopSchema", shopSchema);

export default ShopSchema;
