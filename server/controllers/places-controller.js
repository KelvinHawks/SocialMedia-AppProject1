const uuid = require("uuid");
const HttpError = require("../models/http-error");

const uniqueId = uuid.v4();
let DUMMY_PLACES = [
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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for the provided placeId", 404);
  } else {
    res.json({ place });
  }
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });
  if (!places || places.length === 0) {
    throw new Error("Could not find places for the provided userId", 404);
  } else {
    res.json({ places });
  }
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uniqueId,
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place successfully" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;