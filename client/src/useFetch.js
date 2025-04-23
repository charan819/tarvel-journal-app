import { useEffect, useState } from "react";
import axios from "./axios"; // Use centralized Axios instance with baseURL + withCredentials

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url); // Backend base URL handled
      setData(res.data);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [url]);

  const reFetch = () => {
    fetchData();
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
