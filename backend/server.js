const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(morgan("common"));
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT} port.`);
});

const db = require("./models");
const Role = db.role;

mongoose
  .connect((process.env.MONGODB_URL), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }

          console.log("added 'user' to roles collection");
        });

        new Role({
          name: "moderator",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }

          console.log("added 'moderator' to roles collection");
        });

        new Role({
          name: "admin",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }

          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
  initial;

app.use("/api/auth", authRoute);
app.use("/api/test", userRoute);
