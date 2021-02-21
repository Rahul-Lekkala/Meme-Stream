const mongoose = require("mongoose");

const memeSchema = mongoose.Schema({
      name: {
            type: String,
            required: [true, "Please provide the name"]
      },
      caption: {
            type: String,
            required: [true, "Please provide the caption"]
      },
      url: {
            type: String,
            required: [true, "Please provide a url of the image"]
      },
      id: String
      // likeCount: {
      //       type: Number,
      //       default: 0
      // },
      // createdAt:{
      //       type: Date,
      //       default: new Date()
      // , { versionKey: false }}
}, { versionKey: false });

const Meme = mongoose.model("Meme",memeSchema);

module.exports = Meme;

//module.export default Meme;