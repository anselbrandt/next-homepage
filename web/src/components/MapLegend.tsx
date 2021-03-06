import React from "react";
import {
  Box,
  useColorMode,
  IconButton,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/core";
import { EditIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
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

  const startRow = [2, 4, 6, 8, 10, 12, 14, 16];

  const getValue = (value: number) => {
    switch (true) {
      case value > 1000000:
        return `${(value / 1000000).toFixed(2)}M`;
      case value > 1000:
        return `${(value / 1000).toFixed(0)}K`;
      default:
        return 0;
    }
  };

  return (
    <Box
      position="absolute"
      zIndex={10}
      bottom="78px"
      left="2px"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      p={1}
      borderWidth="2px"
      rounded="lg"
    >
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Legend
                </Box>
                {isExpanded ? (
                  <ChevronDownIcon fontSize="20px" />
                ) : (
                  <ChevronUpIcon fontSize="20px" />
                )}
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Grid
                  templateRows="repeat(17, 1fr)"
                  templateColumns="repeat(6, 1fr)"
                  gap={1}
                >
                  {colorsArr.map((color, index) => (
                    <GridItem
                      key={index}
                      colStart={1}
                      rowSpan={2}
                      colSpan={1}
                      bgColor={color}
                    />
                  ))}
                  <GridItem colStart={2} rowStart={1} colSpan={5} />
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
                        ${getValue(value)}
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
                  <GridItem colStart={5} rowStart={8} rowSpan={2} colSpan={2}>
                    <IconButton
                      variant="link"
                      colorScheme={defaultColor}
                      aria-label="Edit price"
                      icon={<EditIcon />}
                      onClick={handleOpen}
                      fontSize="25px"
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
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
