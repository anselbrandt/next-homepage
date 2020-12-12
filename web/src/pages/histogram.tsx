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
  const highlightColor = {
    light: colors.purple[600],
    dark: colors.purple[300],
  };
  const muteColor = { light: colors.purple[200], dark: colors.purple[600] };
  const strokeColor = { light: colors.gray[400], dark: colors.gray[600] };
  const fillColor = { light: colors.gray[200], dark: colors.gray[700] };

  const [price, setPrice] = useState<number | undefined>();
  const { width, height } = useGetViewport();
  const svgRef = useRef();

  const initialValue = 320000;

  const getValue = (value: number) => {
    switch (true) {
      case value > 1000000:
        return `${(value / 1000000).toFixed(2)}M`;
      case value > 1000:
        return `${(value / 1000).toFixed(0)},000`;
      default:
        return 0;
    }
  };

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
          highlightColor={highlightColor[colorMode]}
          muteColor={muteColor[colorMode]}
          strokeColor={strokeColor[colorMode]}
          fillColor={fillColor[colorMode]}
          initialValue={initialValue}
          handleUpdatePrice={handleUpdatePrice}
        />
        <Box mt={30}>{price ? price : getValue(initialValue)}</Box>
      </Flex>
    </Container>
  );
};

export default Test;
