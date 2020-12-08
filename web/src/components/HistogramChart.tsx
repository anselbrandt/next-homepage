// cornflower #1E90FF
// tomato #FF6347

import React, { useEffect, useState, useRef } from "react";
import { select, pointers, scaleLinear, area, curveBasis } from "d3";

interface HistogramChartProps {
  canvasRef: any;
  width: number;
  height: number;
  data: any[];
  color: string;
  initialValue: number;
  handleUpdatePrice: (...args: any) => any;
}

export const HistogramChart: React.FC<HistogramChartProps> = ({
  canvasRef,
  width,
  height,
  data,
  color,
  initialValue,
  handleUpdatePrice,
}) => {
  const renderFrame = useRef<number | undefined>();
  const [isDown, setIsDown] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [position, setPosition] = useState<[number, number] | undefined>();
  const [pointer, setPointer] = useState<[number, number] | undefined>();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    const xValues = data.map((value) => value[0]);
    const yValues = data.map((value) => value[1]);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const domain = [xMin, xMax];
    const range = [yMin, yMax];

    const getValue = (value: any) => {
      switch (true) {
        case value > xMax:
          return xMax;
        case value > 1000000:
          return `${(value / 1000000).toFixed(2)}M`;
        case value > 1000:
          return `${(value / 1000).toFixed(0)},000`;
        case value > xMin:
          return value.toFixed(0);
        default:
          return 0;
      }
    };

    const xScale = scaleLinear().domain(domain).range([0, width]);
    const yScale = scaleLinear().domain(range).range([height, 0]);

    const getArea = area()
      .curve(curveBasis)
      .x((value) => xScale(value[0]))
      .y1((value) => yScale(value[1]))
      .y0(yScale(0))
      .context(context);

    const withinBounds = (x: number, y: number) => {
      switch (true) {
        case x < 0:
          return false;
        case x > width:
          return false;
        case y < 0:
          return false;
        case y > height:
          return false;
        default:
          return true;
      }
    };

    const onEvent = (event: any) => {
      event.preventDefault();
      const type = event.type;

      if (pointers(event) && pointers(event)[0]) {
        const [x, y] = pointers(event)[0];

        if (["mouseenter", "pointerenter"].includes(type)) {
          setIsEntered(true);
          setIsClicked(false);
        }
        if (["mousedown", "pointerdown", "touchstart"].includes(type))
          setIsDown(true);
        if (type === "click") {
          setIsClicked((prev) => !prev);
          setPosition(pointers(event)[0]);
          handleUpdatePrice(getValue(xScale.invert(x)));
        }
        if (["mousemove", "touchmove", "pointermove"].includes(type)) {
          if (withinBounds(x, y)) {
            setPointer(pointers(event)[0]);
            if (!isClicked) {
              setPosition(pointers(event)[0]);
              handleUpdatePrice(getValue(xScale.invert(x)));
            }
          }
        }

        if (["mouseup", "pointerup", "touchend"].includes(type))
          setIsDown(false);
        if (["mouseout", "pointerout"].includes(type)) {
          setIsEntered(false);
          setIsDown(false);
          setPointer(undefined);
        }
      }
    };

    select(context.canvas).on(
      "click " +
        "mouseenter mouseout mousedown mouseup mousemove " +
        "touchstart touchend touchmove " +
        "pointerenter pointerout pointerup pointerdown pointermove",
      onEvent
    );

    const borderColor = isEntered ? "#1E90FF" : "#FF6347";

    const cursor = {
      x: position ? position[0] : xScale(initialValue),
      color: isDown ? "#1E90FF" : "#FF6347",
    };

    function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = borderColor;
      context.strokeRect(0, 0, width, height);

      context.beginPath();
      getArea(data);
      context.fillStyle = color;
      context.strokeStyle = color;
      context.fill();

      context.beginPath();
      context.moveTo(cursor.x, 0);
      context.lineTo(cursor.x, height);
      context.strokeStyle = cursor.color;
      context.stroke();

      renderFrame.current = requestAnimationFrame(draw);
    }
    renderFrame.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(renderFrame.current as number);
  }, [
    canvasRef,
    width,
    height,
    isDown,
    isEntered,
    position,
    pointer,
    color,
    data,
    initialValue,
  ]);
  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};
