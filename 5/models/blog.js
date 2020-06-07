//const config = require("../utils/config.js");
//const dbUri = process.env.MONGODB_URI
const config = require("../utils/config");
const mongoose = require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");
/* mongoose.set("useCreateIndex", true); */

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//personSchema.plugin(uniqueValidator);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Blog", blogSchema);
