const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  name: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = imgModel = mongoose.model("Image", imgSchema);
