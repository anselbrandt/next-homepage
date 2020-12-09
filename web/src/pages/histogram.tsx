import React, { useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/core";
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
      <Flex direction="column" justifyContent="center" h="100vh">
        <HistogramChart
          canvasRef={canvasRef}
          width={+(width! * 0.5).toFixed(0)}
          height={+(height! * 0.25).toFixed(0)}
          data={data}
          color={"lightgray"}
          initialValue={320000}
          handleUpdatePrice={handleUpdatePrice}
          axisColor={"dimgray"}
        />
        <Box>{price}</Box>
      </Flex>
    </Container>
  );
};

export default Test;
