import publicIp from "public-ip";
import fetch from "node-fetch";
import { GOOGLEKEY } from "../../../constants";
import { NowRequest, NowResponse } from "@vercel/node";

export default async (__: NowRequest, res: NowResponse) => {
  const serverIP = await publicIp.v4();
  const response = await fetch(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLEKEY}`,
    {
      method: "POST",
      body: JSON.stringify({ considerIp: true }),
    }
  );
  const data = await response.json();
  const location = {
    location: await data.location,
    ip: await serverIP,
  };
  await res.status(200).send(JSON.stringify(location));
};
