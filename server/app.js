const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const placesRoutes = require("./routes/places-routes");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/places", placesRoutes);
app.listen(5000, () => {
  console.log("app listening on port 5000");
});
