import React from "react";
import { Box, useColorMode, IconButton, Grid, GridItem } from "@chakra-ui/core";
import { EditIcon } from "@chakra-ui/icons";
import { colorsArr } from "../utils/mapUtils";

interface MapLegendProps {
  defaultColor: string;
  bins: number[];
  range: number[];
  handleOpen: () => void;
}

export const MapLegend: React.FC<MapLegendProps> = ({
  defaultColor,
  bins,
  range,
  handleOpen,
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "black", dark: "white" };

  const startRow = [4, 6, 8, 10, 12, 14, 16, 18];

  return (
    <Box
      position="absolute"
      zIndex={10}
      bottom="2px"
      left="2px"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      p={1}
      borderWidth="2px"
      rounded="lg"
    >
      <Grid
        templateRows="repeat(19, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={1}
      >
        <GridItem colSpan={6} rowSpan={2} textAlign="center" fontSize="md">
          Assessments
        </GridItem>
        {colorsArr.map((color, index) => (
          <GridItem
            key={index}
            colStart={1}
            rowSpan={2}
            colSpan={1}
            bgColor={color}
          />
        ))}
        <GridItem colStart={2} rowStart={3} colSpan={5} />
        {bins
          .filter((value) => value !== 0)
          .map((value, index) => (
            <GridItem
              key={index}
              colStart={2}
              rowStart={startRow[index]}
              rowSpan={2}
              colSpan={3}
              fontSize="sm"
            >
              ${(+(value / 1000).toFixed(0)).toLocaleString()}k
            </GridItem>
          ))}
        {range.reverse().map((value, index) => (
          <GridItem
            key={index}
            colStart={5}
            rowStart={startRow[index]}
            rowSpan={2}
            colSpan={2}
            fontSize="sm"
          >
            +{value * 100}%
          </GridItem>
        ))}
        <GridItem colStart={5} rowStart={10} rowSpan={2} colSpan={2}>
          <IconButton
            variant="link"
            colorScheme={defaultColor}
            aria-label="Edit price"
            icon={<EditIcon />}
            onClick={handleOpen}
          />
        </GridItem>
        {range.sort().map((value, index) => (
          <GridItem
            key={index}
            colStart={5}
            rowStart={startRow[index + 4]}
            rowSpan={2}
            colSpan={2}
            fontSize="sm"
          >
            -{value * 100}%
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
