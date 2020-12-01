import React, { useState } from "react";
import { Box, useColorMode } from "@chakra-ui/core";
import { withApollo } from "../utils/withApollo";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { MAPBOX_ACCESS_TOKEN, initialViewState } from "../utils/mapUtils";
import Navbar from "../components/Navbar";

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
  transitionDuration?: number;
  transitionInterpolator?: any;
}

interface MapProps {
  defaultColor: string;
}

const Map: React.FC<MapProps> = ({ defaultColor }) => {
  const { colorMode } = useColorMode();
  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const handleChangeViewState = ({ viewState }: any) => setViewState(viewState);
  const mapStyle = {
    light: "mapbox://styles/mapbox/light-v10",
    dark: "mapbox://styles/mapbox/dark-v10",
  };

  return (
    <Box w="100vw" h="100vh">
      <Navbar defaultColor={defaultColor} />
      <DeckGL
        viewState={viewState}
        onViewStateChange={handleChangeViewState}
        controller={true}
      >
        <StaticMap
          mapStyle={mapStyle[colorMode]}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          width={"100vw"}
          height={"100vh"}
        />
      </DeckGL>
    </Box>
  );
};

export default withApollo({ ssr: true })(Map);
