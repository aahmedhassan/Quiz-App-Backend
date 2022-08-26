const app = require("./App");
const dotenv = require("dotenv");
const conneciton = require("./config/db");
const admin = require("./models/users/admin");

dotenv.config();

conneciton.once("open", async () => {
  const exAdmin = await admin.find({ email: "admin@decotechs.com" });
  if (exAdmin.length == 0) {
    const newAdmin = new admin({
      email: "admin@decotechs.com",
      password: "Admin123",
    });

    newAdmin.save();
  }
  console.log(`Database Connected`);
});
const PORT = process.env.PORT || 8000; //not working from env

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
