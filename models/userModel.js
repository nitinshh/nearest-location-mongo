const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    location: {
      type: { 
            type: String,
            require: true
        },
      coordinates: {
        type: [Number],
        default: [0, 0]
      },
    },
  },
  { timestamps: true }
);
userSchema.index({ location: '2dsphere' });
const user = mongoose.model("user", userSchema);
module.exports = user;
