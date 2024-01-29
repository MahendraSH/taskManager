const app = require("./app");
const dotenv = require("dotenv").config({});
const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

