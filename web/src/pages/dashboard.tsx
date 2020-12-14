import React, { useState, useEffect } from "react";
import { Box, Flex, useColorMode, Button } from "@chakra-ui/core";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";
import {
  StaticMap,
  FlyToInterpolator,
  WebMercatorViewport,
} from "react-map-gl";
import { DeckGL } from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { MAPBOX_ACCESS_TOKEN } from "../utils/mapUtils";
import { multiPoint } from "@turf/helpers";
import bbox from "@turf/bbox";
import { useGetViewport } from "../hooks/useGetViewport";
import { Bounds } from "viewport-mercator-project";

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
  transitionDuration?: number;
  transitionInterpolator?: any;
}

interface TestProps {
  defaultColor: string;
}

const Test: React.FC<TestProps> = ({ defaultColor }) => {
  const { width: screenWidth, height: screenHeight } = useGetViewport();
  const width = screenWidth! * 0.5;
  const height = screenHeight! * 0.5;
  const { colorMode } = useColorMode();

  const mapStyle = {
    light: "mapbox://styles/mapbox/light-v10",
    dark: "mapbox://styles/mapbox/dark-v10",
  };

  const data = [
    { coordinates: [-73.587862, 45.508869] },
    { coordinates: [-73.6264192, 45.5344128] },
    { coordinates: [-77.4874416, 39.0437567] },
    { coordinates: [-121.8863286, 37.3382082] },
  ];

  const initialViewState = {
    longitude: -73.61,
    latitude: 45.52,
    zoom: 10,
    pitch: 0,
    bearing: 0,
  };

  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const [extents, setExtents] = useState<any | undefined>();
  const handleChangeViewState = ({ viewState }: any) => setViewState(viewState);

  const handleFlyTo = (destination: ViewState) => {
    setViewState({
      ...viewState,
      ...destination,
      transitionDuration: 1500,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  useEffect(() => {
    if (width && height) {
      const locations = data.map((value) => value.coordinates);
      const points = multiPoint(locations);
      const bounding = bbox(points);
      const corners = [bounding.slice(0, 2), bounding.slice(2, 4)];
      const viewport = new WebMercatorViewport({
        width: width * 0.99,
        height: height * 0.99,
      }).fitBounds(corners as Bounds, {
        padding: Math.min(width * 0.6, height * 0.4) * 0.25,
      });
      handleFlyTo(viewport);
      setExtents(viewport);
    }
  }, [width, height]);

  const layer = new ScatterplotLayer({
    id: "scatterplot-layer",
    data,
    pickable: true,
    opacity: 0.8,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 5,
    radiusMaxPixels: 5,
    getPosition: (d: any) => d.coordinates,
    getRadius: () => 5,
    getFillColor: () => [255, 99, 71],
  });

  return (
    <Container>
      <Navbar defaultColor={defaultColor} />
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box>{`${viewState.latitude.toFixed(3)}, ${viewState.longitude.toFixed(
          3
        )} ${viewState.zoom.toFixed(2)}`}</Box>
        <Box>
          <DeckGL
            layers={[layer]}
            viewState={viewState}
            onViewStateChange={handleChangeViewState}
            controller={true}
            width={width}
            height={height}
            style={{ position: "relative" }}
          >
            <StaticMap
              mapStyle={mapStyle[colorMode]}
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              width={width}
              height={height}
            />
          </DeckGL>
        </Box>
        <Flex>
          <Button m={2} onClick={() => handleFlyTo(extents)}>
            Extents
          </Button>
          <Button m={2} onClick={() => handleFlyTo(initialViewState)}>
            Montreal
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Test;
