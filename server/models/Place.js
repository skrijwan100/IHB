import mongoose from "mongoose";
const placeSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
    unique: true
  },
  tags:{
    type:String,
    require:true
  },
  imgUrl:{
    type:String,
    require:true
  },
  description:{
    type:String,
    require:true
  },
  LocUrl:{
    type:String,
    require:true
  },
  budget:{
    type:String,
    require:true
  },
  temperature:{
    type:String,
    require:true
  },
})
const Place = mongoose.model("Place", placeSchema);
export default Place;