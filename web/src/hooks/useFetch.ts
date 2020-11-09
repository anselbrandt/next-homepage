import { useEffect, useState } from "react";
import { API_URL } from "../../constants";

const useFetch = () => {
  const [data, setData] = useState<undefined | string>();
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const text = await response.text();
        setData(text);
      } catch (err) {
        setError(true);
      }
    };
    fetchData();
  }, []);
  return { data, error };
};

export default useFetch;
