const express = require("express");
const cors = require("cors");
const app = express();
const rootRouter = require("./routes/index");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log("The server is Up and Running on PORT " + PORT);
});
