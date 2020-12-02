import React from "react";
import { Box, useColorMode, IconButton, Flex, Text } from "@chakra-ui/core";
import { SearchIcon, RepeatIcon } from "@chakra-ui/icons";

interface MapControlsProps {
  defaultColor: string;
  handleFlyTo: any;
  handleOrient: any;
}

export const MapControls: React.FC<MapControlsProps> = ({
  defaultColor,
  handleFlyTo,
  handleOrient,
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "black", dark: "white" };

  return (
    <Box
      position="absolute"
      zIndex={10}
      top="58px"
      right="2px"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      p={1}
      borderWidth="2px"
      rounded="lg"
    >
      <Flex p={1}>
        <Box p={1}>
          <IconButton
            icon={<SearchIcon />}
            aria-label="reset zoom"
            onClick={() => handleFlyTo()}
            colorScheme={defaultColor}
          />
        </Box>
        <Box p={1}>
          <IconButton
            aria-label="orientation"
            icon={<RepeatIcon />}
            onClick={() => handleOrient()}
            colorScheme={defaultColor}
          />
        </Box>
      </Flex>
      <Flex>
        <Box p={1}>
          <Text>Reset</Text>
        </Box>
        <Box p={1}>
          <Text>Rotate</Text>
        </Box>
      </Flex>
    </Box>
  );
};
