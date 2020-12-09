import React, { useEffect, useRef, useState } from "react";
import { useColorMode, Box, Input, Flex } from "@chakra-ui/core";
import colors from "../utils/colors";
import { examples } from "./examples";

interface DotColor {
  [name: string]: string;
}

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
  const dotColor: DotColor = {
    light: colors[defaultColor][500],
    dark: colors[defaultColor][200],
  };
  const bgColor = {
    light: "white",
    dark: colors["gray"][800],
  };

  const [example, setExample] = useState<number>(1);

  const timerFrame = useRef<number | undefined>();
  const renderFrame = useRef<number | undefined>();
  const [time, setTime] = useState<number>(0);
  const [isPaused] = useState<boolean>(false);
  const currentFunc = useRef<Function | undefined>();
  const [input, setInput] = useState<string>(
    `hypot(x-=t%4*5,y-=8)<6&&x<y|y<-x`
  );

  const handleClick = () => {
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
    const render = () => {
      timerFrame.current = requestAnimationFrame(render);
      if (!isPaused) {
        setTime((prev: number) => {
          return prev + incr;
        });
      }
    };
    timerFrame.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(timerFrame.current as number);
  }, [isPaused]);

  useEffect(() => {
    let mathFunc;
    try {
      mathFunc = new Function(
        "t",
        "i",
        "x",
        "y",
        `try {
            with (Math) {
                return ${input!.replace(/\\/g, ";")};
              }
      } catch (error) {
        return 'error';
      }`
      );
    } catch (error) {
      mathFunc = () => "error";
    }
    let result = mathFunc(1, 1, 1, 1);
    if (!isNaN(result)) {
      currentFunc.current = mathFunc;
      setTime(0);
    }
    mathFunc = null;
    result = null;
  }, [input]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas!.style.width = width + "px";
    canvas!.style.height = height + "px";
    const scale = window.devicePixelRatio;
    canvas!.width = Math.floor(width * scale);
    canvas!.height = Math.floor(height * scale);

    const context = canvas!.getContext("2d");
    context!.scale(scale, scale);
    context!.fillStyle = bgColor[colorMode];
    context!.fillRect(0, 0, width, height);

    const render = () => {
      pixels.forEach((pixel, index) => {
        const canvasX = pixel.canvasX;
        const canvasY = pixel.canvasY;
        const t = time;
        const i = index;
        const x = pixel.x;
        const y = pixel.y;

        const clamp = (num: number) => (num <= -1 ? -1 : num >= 1 ? 1 : num);
        const value = clamp(currentFunc.current!(t, i, x, y));
        const radius = Math.abs(maxRadius * value);
        const circle = new Path2D();
        circle.arc(canvasX, canvasY, radius, 0, 2 * Math.PI);
        context!.fillStyle = value > 0 ? dotColor[colorMode] : "tomato";
        context!.fill(circle);
      }, []);

      renderFrame.current = requestAnimationFrame(render);
    };
    renderFrame.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(renderFrame.current as number);
  });
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
