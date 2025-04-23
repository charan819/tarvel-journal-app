import React, { useContext, useState } from "react";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Navbar from "../components/Navbar";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/create.css";

const Create = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let photoUrls = [];

    try {
      if (files.length > 0) {
        photoUrls = await Promise.all(
          Array.from(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");

            const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
            const uploadRes = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                data
              );
              

            return uploadRes.data.url;
          })
        );
      }

      const newEntry = {
        ...info,
        author: user._id,
        photos: photoUrls,
      };

      const response = await axios.post("/entries", newEntry);
      navigate(`/view/${response.data._id}`);
    } catch (err) {
      console.error("Entry creation failed:", err);
    }
  };

  return (
    <div className="create">
      <Navbar />
      <div className="createContainer">
        <div className="picsContainer">
          <div className="formInput">
            <h2>Upload Images (Max 3)</h2>
            <label htmlFor="file">
              <FontAwesomeIcon className="icon" icon={faPlusCircle} />
            </label>
            <input
              type="file"
              id="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              style={{ display: "none" }}
            />
          </div>

          <div className="uploadedPictures">
            {Array.from(files).map((file, i) => (
              <div className="upload_pic" key={i}>
                <img src={URL.createObjectURL(file)} alt="" height="80px" />
              </div>
            ))}
          </div>
        </div>

        <div className="input">
          <label htmlFor="title">Title</label>
          <input
            onChange={handleChange}
            type="text"
            id="title"
            placeholder="Enter Title"
          />
        </div>

        <div className="input">
          <label htmlFor="location">Location</label>
          <input
            onChange={handleChange}
            type="text"
            id="location"
            placeholder="Enter Location"
          />
        </div>

        <div className="input">
          <label htmlFor="date">What is the Date</label>
          <input
            onChange={handleChange}
            type="date"
            id="date"
            placeholder="Choose Date"
          />
        </div>

        <div className="input">
          <label htmlFor="text">Write your thoughts..</label>
          <textarea
            id="text"
            cols="150"
            rows="25"
            onChange={handleChange}
            autoFocus
          ></textarea>
        </div>

        <button className="createBtn" onClick={handleClick}>
          Create Entry
        </button>
      </div>
    </div>
  );
};

export default Create;