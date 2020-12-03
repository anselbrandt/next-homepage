import React, { useState } from "react";
import { Box, useColorMode } from "@chakra-ui/core";
import { withApollo } from "../utils/withApollo";
import { StaticMap, FlyToInterpolator } from "react-map-gl";
import { DeckGL } from "@deck.gl/react";
import { MVTLayer } from "@deck.gl/geo-layers";
import { MAPBOX_ACCESS_TOKEN, initialViewState } from "../utils/mapUtils";
import Navbar from "../components/Navbar";
import { MapControls } from "../components/MapControls";
import { MapInfo } from "../components/MapInfo";
import { useGetBins } from "../hooks/useGetBins";
import { getRgb } from "../utils/getColor";

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
  const handleFlyTo = () => {
    setViewState({
      ...viewState,
      ...initialViewState,
      transitionDuration: 500,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };
  const handleOrient = () => {
    setViewState((prev: any) => {
      return {
        ...prev,
        bearing: prev.bearing !== 0 ? 0 : -57.2,
        transitionDuration: 500,
      };
    });
  };

  const target = 500000;
  const range: [number, number, number] = [0.05, 0.15, 0.3];
  const { bins } = useGetBins({ target: target, range: range });

  const layers = [
    new MVTLayer({
      id: "values",
      data: `https://a.tiles.mapbox.com/v4/mappingmtl.anlfff5k/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
      getFillColor: (d: any) => getRgb(d.properties.price, bins),
      getLineWidth: 1,
      lineWidthUnits: "pixels",
      pickable: true,
      autoHighlight: true,
      uniqueIdProperty: "id",
      onClick: (info: any) => console.log(info.object.properties),
      updateTriggers: {
        getFillColor: { bins },
      },
    } as any),
  ];

  return (
    <Box w="100vw" h="100vh">
      <Navbar defaultColor={defaultColor} />
      <DeckGL
        viewState={viewState}
        layers={layers as any}
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
      <MapInfo viewState={viewState} />
      <MapControls
        defaultColor={defaultColor}
        handleFlyTo={handleFlyTo}
        handleOrient={handleOrient}
      />
    </Box>
  );
};

export default withApollo({ ssr: true })(Map);
