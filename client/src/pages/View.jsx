import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  faCalendar,
  faMapLocationDot,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../useFetch";
import axios from "../axios";
import { AuthContext } from "../authContext";
import "../styles/view.css";

const View = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // "/view/entryId"
  const { user } = useContext(AuthContext);
  const { data, loading } = useFetch(`/entries/${id}`);
  const [slideNumber, setSlideNumber] = useState(0);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/entries/${data._id}`); // withCredentials via instance
      navigate("/");
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  const handleMove = (direction) => {
    if (!data?.photos?.length) return;

    const total = data.photos.length;
    let newSlideNumber =
      direction === "l"
        ? slideNumber === 0
          ? total - 1
          : slideNumber - 1
        : slideNumber === total - 1
        ? 0
        : slideNumber + 1;

    setSlideNumber(newSlideNumber);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="view">
      <Navbar />
      <div className="postPageBG">
        <div className="upperContent">
          <h1>{data.title}</h1>
          <p>
            <FontAwesomeIcon className="icon" icon={faCalendar} />
            {data.date}
          </p>
          <p>
            <FontAwesomeIcon className="icon" icon={faMapLocationDot} />
            {data.location}
          </p>
        </div>
      </div>

      <div className="postContainer">
        <div className="leftContainer">
          {data.photos?.length > 0 ? (
            <div className="images">
              <img
                src={data.photos[slideNumber]}
                height="300px"
                alt="entry"
              />
              {data.photos.length > 1 && (
                <div className="arrows">
                  <FontAwesomeIcon
                    icon={faCircleArrowLeft}
                    className="arrow"
                    onClick={() => handleMove("l")}
                  />
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="arrow"
                    onClick={() => handleMove("r")}
                  />
                </div>
              )}
            </div>
          ) : (
            <p>No Images</p>
          )}
        </div>

        <div className="rightContainer">
          <p>" {data.text} "</p>
          {user && user._id === data.author && (
            <button className="del_button" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
