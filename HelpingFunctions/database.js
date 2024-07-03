const mongoose = require("mongoose");

// const options = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

// Connect and handle initial connection errors
const DB = async (uri) => {
  await mongoose.connect(uri).then(
    () => {
      console.log("connected to mongodb");
    },
    (err) => {
      console.log("mongodb initial connection error", err);
    }
  );
};

// To handle errors after initial connection was established
mongoose.connection.on("error", (err) => {
  console.log("mongodb runtime error", err);
});

module.exports = DB;