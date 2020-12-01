import { useEffect, useState } from "react";

export const useGetViewport = () => {
  const [width, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();

  useEffect(() => {
    if (process.browser) {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  });

  return { width, height };
};
