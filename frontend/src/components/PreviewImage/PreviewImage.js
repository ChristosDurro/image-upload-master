import React, { useEffect, useState } from "react";
import "./PreviewImage.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSearchParams, useParams } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";

const PreviewImage = () => {
  const [copied, setCopied] = useState(false);
  const [buttonColor, setButtonColor] = useState("#2F80ED");
  const [imageRetrieved, setImageRetrieved] = useState(null);
  let img;

  // Convert Data Buffer From Database to Image
  img = imageRetrieved
    ? new Buffer.from(imageRetrieved.image.data.data).toString("base64")
    : null;

  // Redirects User to Home Screen
  const handleUploadAgain = () => {
    window.location.replace("/");
  };

  const id = useParams().id;

  // Retrieving Image Uploaded From Database
  useEffect(() => {
    const retrieveImage = (id) => {
      axios
        .get(`https://image-upload-master.onrender.com/preview/${id}`, id)
        .then((res) => setImageRetrieved(res.data))
        .catch((err) => console.log(err));
    };
    retrieveImage(id);
  }, []);

  // Copy Button Handler
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setButtonColor("#219653");
    setCopied(true);
  };

  // If anything but the copy button is clicked then make copy button blue again
  window.addEventListener("click", (e) => {
    if (!e.target.classList.contains("copy-btn")) {
      setButtonColor("#2F80ED");

      setCopied(false);
    }
  });

  return (
    <div className="preview-container">
      <CheckCircleIcon
        sx={{ color: "#219653", width: "50px", height: "50px" }}
      />
      <h2 className="success">Uploaded Successfully!</h2>
      <div className="img-preview">
        <img
          src={`data:image/png;base64,${img}`}
          alt={imageRetrieved ? imageRetrieved.name : "preview"}
        />
      </div>
      <div className="copy-link">
        <input
          type="text"
          readOnly
          value={window.location.href}
          className="url-input"
        />
        <button
          className="copy-btn"
          onClick={handleCopy}
          style={{ background: buttonColor }}
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
      <button className="upload-again" onClick={handleUploadAgain}>
        Upload Another Image
      </button>
    </div>
  );
};

export default PreviewImage;
