import React, { useState, useEffect } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
const Userplaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `https://social-app-6p55.onrender.com/api/places/user/${userId}`
        );

        setLoadedPlaces(responseData.place);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);
  const placeDeleteHandler = (deletePlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletePlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverLay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default Userplaces;
