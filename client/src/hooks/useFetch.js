import React, { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const item = data.results;
    setData(item);
    setLoading(false);
  };
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("hello");
    fetchData();
  }, []);

  return { data, loading };
};

export default useFetch;
