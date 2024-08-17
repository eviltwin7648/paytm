const express = require("express");
const cors = require("cors");
const app = express();
const rootRouter = require("./routes/index");
const bodyParser = require("body-parser");
require('dotenv').config();


app.use(bodyParser.json());
app.use(cors());



app.use("/api/v1", rootRouter);

app.listen(process.env.PORT, () => {
  console.log("The server is Up and Running on PORT " + process.env.PORT);
});
