import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<undefined | string>();
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        setData(text);
      } catch (err) {
        setError(true);
      }
    };
    fetchData();
  }, []);
  return [data, error];
};

export default useFetch;
