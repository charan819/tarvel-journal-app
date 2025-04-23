import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../useFetch";
import Card from "../components/Card";
import { AuthContext } from "../authContext";

const Home = () => {
  const [query, setQuery] = useState("");
  const { user } = useContext(AuthContext);

  const { data, loading } = useFetch(`/entries/author/${user._id}`);

  const keys = ["title", "location", "date"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some(
        (key) =>
          item[key]?.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Navbar />
      <div className="search">
        <div className="searchBar">
          <h2>Explore</h2>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search places or dates"
              onChange={(e) => setQuery(e.target.value)}
            />
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>

      <div className="searchedPosts">
        {loading ? (
          <div style={{ color: "var(--dark)" }}>Loading...</div>
        ) : (
          <>
            {search(data)?.map((item, i) => (
              <Card
                key={item._id || i}
                _id={item._id}
                photos={item.photos}
                title={item.title}
                date={item.date}
                location={item.location}
                text={item.text}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
