import React, { useEffect, useRef, useState } from "react";
import { select, area, scaleLinear, pointers } from "d3";

interface HistogramPickerProps {
  svgRef: any;
  width: number;
  height: number;
  data: any[];
  color: string;
  highlightColor: string;
  muteColor: string;
  strokeColor: string;
  fillColor: string;
  initialValue: number;
  handleUpdatePrice: (...args: any) => any;
  handleUpdateTarget: (...args: any) => any;
}

export const HistogramPicker: React.FC<HistogramPickerProps> = ({
  svgRef,
  width,
  height,
  data,
  color,
  highlightColor,
  muteColor,
  strokeColor,
  fillColor,
  initialValue,
  handleUpdatePrice,
  handleUpdateTarget,
}) => {
  const pointer = useRef<number[] | null>(null);
  const position = useRef<number[] | null>(null);
  const isSet = useRef<boolean>(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (width && height) {
      //   const xTicks = 5;
      //   const yTicks = 3;

      const xValues = data.map((value) => value[0]);
      const yValues = data.map((value) => value[1]);
      const xMin = Math.min(...xValues);
      const xMax = Math.max(...xValues);
      const yMin = Math.min(...yValues);
      const yMax = Math.max(...yValues);
      const domain = [xMin, xMax];
      const range = [yMin, yMax];

      // const getValue = (value: number) => {
      //   switch (true) {
      //     case value > xMax:
      //       return xMax;
      //     case value > 1000000:
      //       return `${(value / 1000000).toFixed(2)}M`;
      //     case value > 1000:
      //       return `${(value / 1000).toFixed(0)},000`;
      //     case value > xMin:
      //       return value.toFixed(0);
      //     default:
      //       return 0;
      //   }
      // };

      const xScale = scaleLinear().domain(domain).range([0, width]);
      const yScale = scaleLinear().domain(range).range([height, 0]);

      //   const xAxis = (g: any) =>
      //     g
      //       .attr("transform", `translate(0,${height})`)
      //       .attr("color", color)
      //       .call(axisBottom(xScale).ticks(xTicks));

      //   const yAxis = (g: any) =>
      //     g.attr("color", color).call(axisLeft(yScale).ticks(yTicks));

      const getLine = area()
        .x((d) => xScale(d[0]))
        .y0(yScale(0))
        .y1((d) => yScale(d[1]));

      const chart = () => {
        const svg = select(svgRef.current);
        svg.selectAll("g").remove();
        svg.attr("width", `${width}px`).attr("height", `${height}px`);

        const path = () => {
          svg
            .append("g")
            .attr("fill", fillColor)
            .attr("stroke", strokeColor)
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .selectAll("path")
            .data([data])
            .join("path")
            .attr("class", "line")
            .attr("d", (d) => getLine(d))
            .attr("pointer-events", "none");
        };

        svg.call(path);

        const xRule = svg
          .append("g")
          .attr("stroke-width", 1)
          .attr("display", "none");
        xRule
          .append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", height);

        const cursor = svg
          .append("g")
          .attr("stroke-width", 1)
          .attr("display", "none");

        if (initialValue && !position.current) {
          cursor.attr("display", null).attr("stroke", highlightColor);
          cursor
            .append("line")
            .attr("x1", xScale(initialValue))
            .attr("y1", 0)
            .attr("x2", xScale(initialValue))
            .attr("y2", height);
        }
        if (position.current) {
          const [x] = position.current;
          cursor.attr("display", null).attr("stroke", highlightColor);
          cursor
            .append("line")
            .attr("x1", x)
            .attr("y1", 0)
            .attr("x2", x)
            .attr("y2", height);
        }

        const withinBounds = (arr: [number, number]) => {
          switch (true) {
            case arr[0] < 0:
              return false;
            case arr[0] > width:
              return false;
            case arr[1] < 0:
              return false;
            case arr[1] > height:
              return false;
            default:
              return true;
          }
        };

        const onEvent = (event: any) => {
          if (event.cancelable) {
            event.preventDefault();
          }
          const type = event.type;

          if (["mouseenter"].includes(type)) {
            // svg.selectAll(".line").attr("stroke", muteColor);
          }
          if (["touchstart", "mousedown"].includes(type)) {
            // svg.selectAll(".line").attr("stroke", muteColor);
          }
          if (["touchmove", "mousemove"].includes(type)) {
            const [x, y] = pointers(event)[0];
            if (withinBounds([x, y])) {
              handleUpdatePrice(+(xScale.invert(x) / 1000).toFixed(0) * 1000);
              pointer.current = [x, y];
              position.current = [x, y];
              xRule
                .attr("display", null)
                .attr("stroke", highlightColor)
                .attr("transform", `translate(${x},0)`);
              if (!isSet.current) {
                cursor
                  .attr("display", null)
                  .attr("stroke", highlightColor)
                  .attr("x1", x)
                  .attr("y1", 0)
                  .attr("x2", x)
                  .attr("y2", height);
              }
            } else {
              position.current = null;
            }
          }
          if (["touchend", "click", "mouseup"].includes(type)) {
            cursor.attr("display", null).attr("stroke", highlightColor);
            if (position.current && isSet.current) {
              const [x] = pointer.current!;
              cursor
                .attr("x1", x)
                .attr("y1", 0)
                .attr("x2", x)
                .attr("y2", height);
              isSet.current = true;
              handleUpdateTarget(
                +(xScale.invert(position.current[0]) / 1000).toFixed(0) * 1000
              );
            }
            if (position.current && !isSet.current) {
              isSet.current = true;
              handleUpdateTarget(
                +(xScale.invert(position.current[0]) / 1000).toFixed(0) * 1000
              );
            }
            if (!pointers(event)[0]) {
              svg.selectAll(".line").attr("stroke", strokeColor);
              xRule.attr("display", "none");
            }
            setUpdate((prev) => !prev);
          }
          if (["mouseout"].includes(type)) {
            cursor.attr("display", null).attr("stroke", highlightColor);
            svg.selectAll(".line").attr("stroke", strokeColor);
            xRule.attr("display", "none");
          }
        };

        const rect = (g: any) =>
          g
            .append("rect")
            .attr("fill", "transparent")
            .attr("width", width)
            .attr("height", height)
            .on(
              "click " +
                "mouseenter mouseout mousedown mouseup mousemove " +
                "touchstart touchend touchmove",
              onEvent,
              false
            );

        // svg.append("g").call(xAxis);
        // svg.append("g").call(yAxis);
        svg.append("g").call(rect);
      };
      chart();
    }
  }, [
    width,
    height,
    svgRef,
    update,
    color,
    highlightColor,
    muteColor,
    strokeColor,
    fillColor,
  ]);

  return (
    <div>
      <svg ref={svgRef} overflow="visible"></svg>
    </div>
  );
};
