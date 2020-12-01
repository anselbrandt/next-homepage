import React, { useEffect, useRef, useState } from "react";
import { useColorMode, Box, Input, Flex } from "@chakra-ui/core";
import colors from "../utils/colors";
import { examples } from "./examples";

interface GridProps {
  defaultColor: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
}

const Grid: React.FC<GridProps> = ({
  canvasRef,
  width,
  height,
  defaultColor,
}) => {
  const { colorMode } = useColorMode();
  const dotColor = {
    light: colors[defaultColor][500],
    dark: colors[defaultColor][200],
  };
  const bgColor = {
    light: "white",
    dark: colors["gray"][800],
  };
  const frame = useRef<number | undefined>();
  const [time, setTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [input, setInput] = useState<string | undefined>(
    "hypot(x-=t%4*5,y-=8)<6&&x<y|y<-x"
  );
  const [currFunc, setCurrFunc] = useState<string | undefined>(
    "hypot(x-=t%4*5,y-=8)<6&&x<y|y<-x"
  );
  const [example, setExample] = useState<number>(1);

  const handleClick = () => {
    // setIsPaused((prev) => !prev);
    setTime(0);
    setInput(examples[example]);
    setExample((prev) => (prev === examples.length - 1 ? 0 : prev + 1));
  };

  const handleInput = (event: any) => {
    setInput(event.target.value);
  };

  const gridSize = 16;
  const incr = gridSize / 1000;
  const maxRadius = (width / gridSize / 2) * 0.95;
  const offset = 0.5;
  const xScale = width / gridSize;
  const yScale = height / gridSize;
  const pixels = Array(gridSize * gridSize)
    .fill(1)
    .map((_, index) => {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      return {
        x: col,
        y: row,
        canvasX: xScale * (col + offset),
        canvasY: yScale * (row + offset),
      };
    });
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas!.width = width;
    canvas!.height = height;
    const context = canvas!.getContext("2d");
    const draw = () => {
      context!.fillStyle = bgColor[colorMode];
      context!.fillRect(0, 0, width, height);
      pixels.forEach((pixel, index) => {
        const canvasX = pixel.canvasX;
        const canvasY = pixel.canvasY;
        const t = time;
        const i = index;
        const x = pixel.x;
        const y = pixel.y;
        let getValue;
        try {
          getValue = new Function(
            "t",
            "i",
            "x",
            "y",
            `try {
                with (Math) {
                    return ${input!.replace(/\\/g, ";")};
                  }
          } catch (error) {
            with (Math) {
                return 0;
              }
          }`
          );
        } catch (error) {
          getValue = new Function(
            "t",
            "i",
            "x",
            "y",
            `with (Math) {
            return 0;
          }`
          );
        }
        if (typeof getValue !== "number") {
          setCurrFunc(input);
        }
        const clamp = (num: number) => (num <= -1 ? -1 : num >= 1 ? 1 : num);
        const value = clamp(getValue(t, i, x, y));
        const radius = Math.abs(maxRadius * value);
        const circle = new Path2D();
        circle.arc(canvasX, canvasY, radius, 0, 2 * Math.PI);
        context!.fillStyle = value > 0 ? dotColor[colorMode] : "tomato";
        context!.fill(circle);
      });
      frame.current = requestAnimationFrame(draw);
      if (!isPaused) {
        setTime((prev: number) => {
          return prev + incr;
        });
      }
    };
    frame.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame.current as number);
  }, [
    canvasRef,
    width,
    height,
    gridSize,
    pixels,
    maxRadius,
    time,
    isPaused,
    input,
  ]);

  useEffect(() => {
    setTime(0);
    setIsPaused(false);
  }, [currFunc]);

  return (
    <Box>
      <Flex direction="column" alignItems="center">
        <Box onClick={handleClick}>
          <canvas ref={canvasRef}></canvas>
        </Box>
        <Box mt="2rem" color="tomato">
          <Box>click dots or use math</Box>
          <Box mt="1rem">{`(t,i,x,y) =>`}</Box>
        </Box>
        <Box color={dotColor[colorMode]}>
          <Input
            type="text"
            value={input}
            onChange={handleInput}
            borderColor="transparent"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Grid;
