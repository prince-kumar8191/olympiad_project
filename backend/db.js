const mongoose = require("mongoose");

// ⚠️ IMPORTANT:
// Password: Prince@12345
// @ ka encode = %40

const MONGO_URI =
  "mongodb://localhost:27017/";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

module.exports = mongoose;







// const mongoose = require("mongoose");


// const MONGO_URI = "mongodb+srv://arpits2618_db_user:Pqe5Pody5fuTnLhN@bhayat.d8qthl6.mongodb.net/?appName=Bhayat";

// mongoose.connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
//   .catch((err) => console.log("❌ MongoDB Error:", err));

// module.exports = mongoose;