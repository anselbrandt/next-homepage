import React, { useRef, useState } from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/core";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";
import { HistogramPicker } from "../components/HistogramPicker";
import { useGetViewport } from "../hooks/useGetViewport";
import { data } from "../data/histogram";
import colors from "../utils/colors";

interface TestProps {
  defaultColor: string;
}

const Test: React.FC<TestProps> = ({ defaultColor }) => {
  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };
  const chartColor = { light: colors.purple[600], dark: colors.purple[300] };
  const muteColor = { light: colors.purple[200], dark: colors.purple[600] };

  const [price, setPrice] = useState<number | undefined>();
  const { width, height } = useGetViewport();
  const svgRef = useRef();

  const handleUpdatePrice = (value: number) => {
    setPrice(value);
  };
  return (
    <Container>
      <Navbar defaultColor={defaultColor} />
      <Flex direction="column" justifyContent="center" h="100vh">
        <HistogramPicker
          svgRef={svgRef}
          width={+(width! * 0.5).toFixed(0)}
          height={+(height! * 0.25).toFixed(0)}
          data={data}
          color={color[colorMode]}
          chartColor={chartColor[colorMode]}
          muteColor={muteColor[colorMode]}
          initialValue={320000}
          handleUpdatePrice={handleUpdatePrice}
        />
        <Box>{price}</Box>
      </Flex>
    </Container>
  );
};

export default Test;
