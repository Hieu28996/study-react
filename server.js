/* eslint-disable @typescript-eslint/no-var-requires */
// import bodyParser from "body-parser";
// import cors from "cors";
// import { properties } from "./config/properties.js";
// import apiRoutes from "./routes/routes.js";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const properties = require("./config/properties");
const apiRoutes = require("./routes/routes");

const app = express();
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });
const router = express.Router();
const whitelist = properties.CORS;
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use("/api", router);
apiRoutes(router);

app.listen(properties.PORT, (req, res) => {
  console.log(`Server is running on ${properties.PORT} port.`);
});
