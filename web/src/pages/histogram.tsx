import React, { useRef, useState } from "react";
import { Box } from "@chakra-ui/core";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";
import { HistogramChart } from "../components/HistogramChart";
import { useGetViewport } from "../hooks/useGetViewport";
import { data } from "../data/histogram";

interface TestProps {
  defaultColor: string;
}

const Test: React.FC<TestProps> = ({ defaultColor }) => {
  const [price, setPrice] = useState<number | undefined>();
  const { width, height } = useGetViewport();
  const canvasRef = useRef();

  const handleUpdatePrice = (value: number) => {
    setPrice(value);
  };
  return (
    <Container>
      <Navbar defaultColor={defaultColor} />
      <Box mt="30vh" maxW="48rem">
        <HistogramChart
          canvasRef={canvasRef}
          width={+(width! * 0.5).toFixed(0)}
          height={+(height! * 0.25).toFixed(0)}
          data={data}
          color={"lightgray"}
          initialValue={320000}
          handleUpdatePrice={handleUpdatePrice}
        />
      </Box>
      <Box>{price}</Box>
    </Container>
  );
};

export default Test;
