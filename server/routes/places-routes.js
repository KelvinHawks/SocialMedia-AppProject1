const express = require("express");
const HttpError = require("../models/http-error");
const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire state building",
    description: "One of the most beautiful sky scrappers",
    location: {
      lat: 50,
      lng: 50,
    },
    address: "20w",
    creator: "u1",
  },
];
router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for the provided placeId", 404);
  } else {
    res.json({ place });
  }
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  if (!place) {
    throw new Error("Could not find a place for the provided userId", 404);
  } else {
    res.json({ place });
  }
});

module.exports = router;
