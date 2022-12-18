import "./Uploader.css";
import uploadImg from "../../assets/image.svg";
import { useRef } from "react";

const Uploader = (props) => {
  const uploadWrapper = useRef(null);

  const handleImageChange = (e) => {
    props.image(e.target.files[0]);
  };

  const handleDragEnter = () => {
    uploadWrapper.current.classList.add("drag-over");
  };

  const handleDragLeave = () => {
    uploadWrapper.current.classList.remove("drag-over");
  };

  const handleDragDrop = () => {
    uploadWrapper.current.classList.remove("drag-over");
  };

  return (
    <div
      className="upload-container"
      ref={uploadWrapper}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDragDrop}
    >
      <div className="input-file-content">
        <img src={uploadImg} className="upload-img" alt="Upload" />
        <p className="drag">Drag & Drop your image here</p>
      </div>
      <input
        type="file"
        className="file-input"
        name="file"
        id="fileUpload"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default Uploader;
