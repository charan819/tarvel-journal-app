import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/register.css";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";


function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      let profileUrl = "";

      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        const uploadRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          data
        );

        profileUrl = uploadRes.data.url;
      }

      const newUser = {
        ...info,
        profilePicture: profileUrl || "",
      };

      await axios.post("/users/register", newUser);
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="register">
      <Navbar />
      <div className="registerCard">
        <div className="center">
          <h1>Join Us</h1>

          <form>
            <div className="image">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                height="100px"
              />

              <div className="txt_field_img">
                <label htmlFor="file">
                  Image
                  <FontAwesomeIcon className="icon" icon={faPlusCircle} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="formInput">
              <div className="txt_field">
                <input
                  type="text"
                  placeholder="username"
                  id="username"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="txt_field">
                <input
                  type="email"
                  placeholder="email"
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="txt_field">
                <input
                  type="password"
                  placeholder="password"
                  id="password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="login_button">
              <button className="button" onClick={handleClick}>
                Register
              </button>
            </div>
            <div className="signup_link">
              <p>
                Already Registered? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;