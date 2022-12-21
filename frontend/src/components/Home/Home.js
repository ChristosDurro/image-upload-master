import React from "react";
import "./Home.css";
import Uploader from "../Uploader/Uploader";
import ChooseFile from "../ChooseFile/ChooseFile";
import Loading from "../Loading/Loading";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [imageDetails, setImageDetails] = useState(null);
  const [uploadDone, setUploadDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  // Function is passed as a prop to another component making the prop that it gets being set as the image selected to the chooseFile component
  const handleImageChange = (image) => {
    setImageDetails(image);
  };

  // Upload image if when it's set
  useEffect(() => {
    const uploadImage = (imageDetails) => {
      const formData = new FormData();
      formData.append("image", imageDetails);

      const config = {
        onUploadProgress: (progressEvent) => {
          const loadedSizeInMB = progressEvent.loaded / 1000000;
          const totalSizeInMB = progressEvent.total / 1000000;
          const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
          setProgress(uploadPercentage.toFixed(2));
        },
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      axios
        .post(
          "https://image-upload-master.onrender.com/upload",
          formData,
          config
        )
        .then((res) => {
          console.log(res.data);
          setUploadDone(true);
          navigate({
            pathname: "/preview",
            search: `?id=${res.data._id}`,
          });
        })
        .catch((err) => console.log(err));
    };
    if (imageDetails !== null) {
      uploadImage(imageDetails);
    }
  }, [imageDetails]);

  return (
    <div>
      {imageDetails && !uploadDone && progress !== 100 ? (
        <Loading />
      ) : (
        <div>
          <div className="container">
            <h2 className="heading">Upload your image</h2>
            <p className="file-type">File should be Jpeg, Png...</p>
            <Uploader image={handleImageChange} />
            <p className="or">Or</p>
            <ChooseFile image={handleImageChange} />
          </div>
          <div className="credits">
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/christos-durro-53b33320a"
              target="_blank"
            >
              Christos Durro{" "}
            </a>{" "}
            - <a href="https://devchallenges.io/"> devChallenges.io</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
