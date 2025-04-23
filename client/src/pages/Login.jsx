import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/login.css";
import axios from "../axios"; // Using centralized axios config
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../authContext";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/users/login", credentials); // withCredentials handled by instance
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.details,
      });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          err.response?.data || "An error occurred while logging in",
      });
    }
  };

  return (
    <div className="login">
      <Navbar />
      <div className="loginCard">
        <div className="center">
          <h1>Welcome Back!</h1>
          <form>
            <div className="txt_field">
              <input
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
                className="lInput"
              />
            </div>
            <div className="txt_field">
              <input
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                className="lInput"
              />
            </div>
            <div className="login_button">
              <button className="button" onClick={handleClick}>
                Login
              </button>
            </div>
            <div className="signup_link">
              <p>
                Not registered? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
