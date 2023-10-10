const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const HttpError = require("./models/http-error");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const mongoose = require("mongoose");
app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

mongoose
  .connect(
    "mongodb+srv://socialApp_data:kimani35@cluster0.ypfmwea.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("app listening on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
