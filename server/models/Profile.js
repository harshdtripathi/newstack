const mongoose=require("mongoose");
const ProfileSchema= new mongoose.Schema({
  gender: {
    type:String,
  },
  dateofBirth:{
    type: String,


  },
  about:{
    type: String,
    trim:true,
  },
  ContactNumber:{
    type: Number,
    trim :true,
  }


});
module.exports= mongoose.model("Profile",ProfileSchema);