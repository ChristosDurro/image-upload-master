const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const dbConnection = require("./controllers/db");
const ImgModel = require("./models/image");
const path = require("path");

require("dotenv").config();

app.use(cors());
app.use(express.static(__dirname));

port = process.env.PORT || 8000;

// Database Connection
dbConnection(process.env.DATABASE_URL);

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: (req, file, cb) => {
    //null as first arg means no error
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Main route to show error and what api endpoint to use
app.get("/", (req, res) => {
  res.send("Invalid API Endpoint!");
});

// Retrieve Image Uploaded and Show it
app.get("/preview/:id", (req, res) => {
  ImgModel.findById(req.params.id, (err, result) => {
    if (err) console.log("Error retrieving image", err);
    if (!result) console.log("Such image doesn't exist");
    if (result) res.send(result);
  });
});

// Route to Upload Image
app.post("/upload", upload.single("image"), async (req, res) => {
  const saveImage = new ImgModel({
    name: req.file.filename,
    image: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
  saveImage
    .save()
    .then(() => res.send(saveImage))
    .catch((err) => console.log("Error saving image", err));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
