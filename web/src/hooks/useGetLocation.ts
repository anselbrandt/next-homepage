import { useEffect, useState } from "react";
import { GOOGLEKEY } from "../../constants";

export default function useGetLocation() {
  const [location, setLocation] = useState();

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLEKEY}`,
      {
        method: "POST",
        body: JSON.stringify({ considerIp: true }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setLocation(response.location);
      });
  }, []);

  return { location };
}
