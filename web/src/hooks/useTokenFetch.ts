import { useEffect, useState } from "react";
import { REDDITKEY } from "../../constants";

export default function useTokenFetch() {
  const [token, setToken] = useState<string>();
  const [expires, setExpires] = useState<number>(0);
  const [isExpired, setIsExpired] = useState<boolean>(true);

  useEffect(() => {
    const now = Date.now();
    if (expires < now) {
      setIsExpired(true);
    }
  });

  useEffect(() => {
    if (isExpired) {
      const credentials = Buffer.from(`${REDDITKEY}:`).toString("base64");
      const searchParams = new URLSearchParams([
        ["grant_type", "https://oauth.reddit.com/grants/installed_client"],
        ["device_id", "DO_NOT_TRACK_THIS_DEVICE"],
      ]);
      fetch(`https://www.reddit.com/api/v1/access_token?${searchParams}`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const current = Date.now();
          const expiresAt = current + response.expires_in * 1000;
          setExpires(expiresAt);
          setIsExpired(false);
          setToken(response.access_token);
        });
    }
  }, [isExpired]);
  return { token };
}
