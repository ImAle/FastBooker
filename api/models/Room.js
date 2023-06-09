import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    price: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true,
    },
    maxPeople: {
      type: Number,
      default: true,
    },
    roomNumbers: [{number:Number, unavailableDates: {type: [Date]} }],
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
