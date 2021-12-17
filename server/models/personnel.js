const mongoose = require("mongoose");
const { Schema } = mongoose;

const Person = new Schema(
    {
        avatar: { default: null, type: String},
        name: { required: true, type: String },
        rank: {
            type: String,
            enum: [
                "General",
                "Colonel",
                "Major",
                "Captain",
                "Lieutenant",
                "Warrant Officer",
                "Sergeant",
                "Corporal",
                "Specialist",
                "Private",
            ],
            default: "Private",
        },
        sex: { type: String, enum: ["M", "F", "O"], default: null },
    startDate: { default: new Date(), type: Date },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "personnel",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("personnel", person)