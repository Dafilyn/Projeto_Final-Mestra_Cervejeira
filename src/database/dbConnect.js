const DATABASE_MONGO = process.env.MONGO_DATABASE;

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(DATABASE_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = db