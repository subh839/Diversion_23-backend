import mongoose from "mongoose";

const pemSchema = mongoose.Schema({
  name: String,
  phoneNo: Number,
  email: String,
  userName: String,
  passWord: String,
  city: String,
  address: String,
  occupation: String,
  gender: String,
  workexperience:String,
  selectedFile: String
});

const PEMdetails = mongoose.model("PEMdetails", pemSchema);

export default PEMdetails;
