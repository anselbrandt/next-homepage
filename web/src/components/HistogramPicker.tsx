import React, { useEffect, useRef, useState } from "react";
import { select, line, axisBottom, axisLeft, scaleLinear, pointers } from "d3";

interface HistogramPickerProps {
  svgRef: any;
  width: number;
  height: number;
  data: any[];
  color: string;
  chartColor: string;
  muteColor: string;
  initialValue: number;
  handleUpdatePrice: (...args: any) => any;
}

export const HistogramPicker: React.FC<HistogramPickerProps> = ({
  svgRef,
  width,
  height,
  data,
  color,
  chartColor,
  muteColor,
  initialValue,
  // handleUpdatePrice,
}) => {
  const pointer = useRef<number[] | null>(null);
  const position = useRef<number[] | null>(null);
  const isSet = useRef<boolean>(false);
  const [update, setUpdate] = useState(false);
  const [values, setValues] = useState<[any, any] | undefined>();

  useEffect(() => {
    if (width && height) {
      console.log(chartColor);
      const xTicks = 5;
      const yTicks = 3;

      const xValues = data.map((value) => value[0]);
      const yValues = data.map((value) => value[1]);
      const xMin = Math.min(...xValues);
      const xMax = Math.max(...xValues);
      const yMin = Math.min(...yValues);
      const yMax = Math.max(...yValues);
      const domain = [xMin, xMax];
      const range = [yMin, yMax];

      const getValue = (value: number) => {
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

      const xAxis = (g: any) =>
        g
          .attr("transform", `translate(0,${height})`)
          .attr("color", color)
          .call(axisBottom(xScale).ticks(xTicks));

      const yAxis = (g: any) =>
        g.attr("color", color).call(axisLeft(yScale).ticks(yTicks));

      const getLine = line()
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]));

      const chart = () => {
        const svg = select(svgRef.current);
        svg.selectAll("g").remove();
        svg.attr("width", `${width}px`).attr("height", `${height}px`);

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
        const yRule = svg
          .append("g")
          .attr("stroke-width", 1)
          .attr("display", "none");
        // yRule
        //   .append("line")
        //   .attr("x1", 0)
        //   .attr("y1", 0)
        //   .attr("x2", width)
        //   .attr("y2", 0);

        const dot = svg.append("g").attr("display", "none");
        dot.append("circle").attr("r", 2.5);
        if (initialValue && !position.current) {
          dot
            .attr("display", null)
            .attr("fill", chartColor)
            .attr("transform", `translate(${xScale(initialValue)},${0})`);
        }
        if (position.current) {
          const [x, y] = position.current;
          dot
            .attr("display", null)
            .attr("fill", chartColor)
            .attr("transform", `translate(${x},${y})`);
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
            svg.selectAll(".line").attr("stroke", muteColor);
          }
          if (["touchstart", "mousedown"].includes(type)) {
            svg.selectAll(".line").attr("stroke", muteColor);
          }
          if (["touchmove", "mousemove"].includes(type)) {
            const [x, y] = pointers(event)[0];
            if (withinBounds([x, y])) {
              setValues([
                getValue(xScale.invert(x)),
                getValue(yScale.invert(y)),
              ]);
              pointer.current = [x, y];
              position.current = [x, y];
              xRule
                .attr("display", null)
                .attr("stroke", chartColor)
                .attr("transform", `translate(${x},0)`);
              yRule
                .attr("display", null)
                .attr("stroke", chartColor)
                .attr("transform", `translate(0,${y})`);
              if (!isSet.current) {
                dot
                  .attr("display", null)
                  .attr("stroke", chartColor)
                  .attr("transform", `translate(${x},${y})`);
              }
            } else {
              position.current = null;
            }
          }
          if (["touchend", "click", "mouseup"].includes(type)) {
            if (position.current && isSet.current) {
              const [x, y] = pointer.current!;
              dot.attr("transform", `translate(${x},${y})`);
              isSet.current = true;
            }
            if (position.current && !isSet.current) {
              isSet.current = true;
            }
            if (!pointers(event)[0]) {
              svg.selectAll(".line").attr("stroke", chartColor);
              xRule.attr("display", "none");
              yRule.attr("display", "none");
            }
            setUpdate((prev) => !prev);
          }
          if (["mouseout"].includes(type)) {
            svg.selectAll(".line").attr("stroke", chartColor);
            xRule.attr("display", "none");
            yRule.attr("display", "none");
            if (!isSet.current) {
              dot.attr("display", "none");
            }
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

        svg.append("g").call(xAxis);
        svg.append("g").call(yAxis);
        svg.append("g").call(rect);

        const path = () => {
          svg
            .append("g")
            .attr("fill", "none")
            .attr("stroke", chartColor)
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
      };
      chart();
    }
  }, [width, height, svgRef, update, color, chartColor, muteColor]);

  return (
    <div>
      <svg ref={svgRef} overflow="visible"></svg>
      <div style={{ marginTop: 30 }}>
        {values ? `${values[0]}, ${values[1]}` : "0, 0"}
      </div>
    </div>
  );
};
