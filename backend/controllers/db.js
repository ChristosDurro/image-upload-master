const mongoose = require("mongoose");

const dbConnection = (uri) => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database Successfully Connected."))
    .catch((err) => console.log("Error Connecting to Database", err));
};

module.exports = dbConnection;
