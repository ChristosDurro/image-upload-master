import "./ChooseFile.css";

const ChooseFile = (props) => {
  return (
    <div className="choose-file-container">
      <label htmlFor="file" className="choose-label">
        Choose File
      </label>
      <input
        id="file"
        type="file"
        className="choose-btn"
        name="file"
        onChange={(e) => props.image(e.target.files[0])}
      />
    </div>
  );
};

export default ChooseFile;
