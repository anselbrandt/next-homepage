import React, { useEffect, useRef, useState } from "react";

export const Ellipsis: React.FC = () => {
  const frame = useRef<number | undefined>();
  const last = useRef(Date.now());
  const [dots, setDots] = useState<string>("");
  useEffect(() => {
    const draw = () => {
      const now = Date.now();
      const delta = now - last.current;
      if (delta > 1000) {
        setDots((prev) => {
          if (prev.length > 2) {
            return "";
          } else {
            return prev + ".";
          }
        });
        last.current = now;
      }

      frame.current = requestAnimationFrame(draw);
    };
    frame.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame.current as number);
  }, [dots]);
  return <>{dots}</>;
};
