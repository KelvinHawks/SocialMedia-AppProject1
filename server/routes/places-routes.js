const express = require("express");

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
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (place) {
    res.json({ title: place.title, description: place.description });
  } else {
    res.json({ message: "Error" });
  }
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creator === userId);
  res.json({ place });
});

module.exports = router;
