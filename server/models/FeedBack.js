import mongoose from "mongoose";
const FeedbackSchema = new mongoose.Schema({
  place:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Place',
    require:true

  },
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
},{ timestamps: true })
const Feedback = mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
