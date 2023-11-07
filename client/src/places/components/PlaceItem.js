import React, { useState, useContext } from "react";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Map from "../../shared/UIElements/Map";
import "./PlaceItem.css";
import Modal from "../../shared/UIElements/Modal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

function PlaceItem(props) {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarnHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      sendRequest(`http://localhost:5000/api/places/${props.id}`, "DELETE");
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>THE MAP</h2>
          <div className="map-container">
            <Map />
          </div>
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to delete this place? Please note that it can`t be undone
          there after
        </p>
      </Modal>
      <div>
        <li className="place-item">
          <Card className="place-item__content">
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="place-item__image">
              <img
                src={`http://localhost:5000/${props.image}`}
                alt={props.title}
              />
            </div>
            <div className="place-item__info">
              <h2>{props.title}</h2>
              <h3>{props.address}</h3>
              <p>{props.description}</p>
            </div>
            <div className="place-item__actions">
              <Button inverse onClick={openMapHandler}>
                VIEW ON MAP
              </Button>
              {auth.userId === props.creatorId && (
                <Button to={`/places/${props.id}`}>EDIT</Button>
              )}
              {auth.userId === props.creatorId && (
                <Button danger onClick={showDeleteWarnHandler}>
                  DELETE
                </Button>
              )}
            </div>
          </Card>
        </li>
      </div>
    </React.Fragment>
  );
}

export default PlaceItem;
