const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();
// console.log(process.env.MONGO_URI);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
