import { Schema, model } from "mongoose";

const conversionSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content : {
        type: String,
        required: true
    }
}, { timestamps: true });

const Conversion = model("Conversion", conversionSchema);
export default Conversion;
