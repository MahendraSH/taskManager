
const app = require("./app")
const dbConnect = require("./config/DBconnect")
const dotenv = require("dotenv").config({ path: "./.env" })
const PORT = process.env.PORT || 4000;

dbConnect();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
