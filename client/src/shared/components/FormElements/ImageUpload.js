import React from "react";
import "./ImageUpload.css";
import Button from "./Button";

function ImageUpload(props) {
  return (
    <div className="form-control">
      <input
        type="file"
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload-center">
          <Button>Show item</Button>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
