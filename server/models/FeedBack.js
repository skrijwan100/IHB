import mongoose from "mongoose";
const FeedbackSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
  },
  nationality:{
    type:String,
    require:true
  },
  rating:{
    type:Number,
    require:true
  },
  Feedbackdisc:{
    type:String,
    require:true
  }
})
const Feedback = mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
