import React from "react";
import { Box, useColorMode } from "@chakra-ui/core";

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
  transitionDuration?: number;
  transitionInterpolator?: any;
}

interface MapInfoProps {
  viewState: ViewState;
}

export const MapInfo: React.FC<MapInfoProps> = ({ viewState }) => {
  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };
  return (
    <Box
      position="absolute"
      zIndex="10"
      top="32px"
      ml="auto"
      mr="auto"
      left="0"
      right="0"
      textAlign="center"
      color={color[colorMode]}
      p={1}
      fontSize="sm"
      pointerEvents="none"
    >
      {`${viewState.latitude.toFixed(3)}, ${viewState.longitude.toFixed(
        3
      )} ${viewState.zoom.toFixed(1)}x ${viewState.bearing.toFixed(1)}°`}
    </Box>
  );
};
