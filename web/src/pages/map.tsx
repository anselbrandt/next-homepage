import React, { useState, useRef } from "react";
import {
  Box,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Link as ChakraLink,
  Image,
  Stack,
  Heading,
  Flex,
} from "@chakra-ui/core";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { withApollo } from "../utils/withApollo";
import { StaticMap, FlyToInterpolator } from "react-map-gl";
import { DeckGL } from "@deck.gl/react";
import { MVTLayer } from "@deck.gl/geo-layers";
import { IconLayer } from "@deck.gl/layers";
import { MAPBOX_ACCESS_TOKEN, initialViewState } from "../utils/mapUtils";
import Navbar from "../components/Navbar";
import { MapControls } from "../components/MapControls";
import { MapInfo } from "../components/MapInfo";
import { useGetBins } from "../hooks/useGetBins";
import { getRgb } from "../utils/getColor";
import Geocoder from "../components/Geocoder";
import { MapLegend } from "../components/MapLegend";
import { GOOGLEKEY } from "../../constants";
import { HistogramPicker } from "../components/HistogramPicker";
// import { useGetViewport } from "../hooks/useGetViewport";
import { data } from "../data/histogram";
import colors from "../utils/colors";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

const params = {
  country: "ca",
};

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
  const linkColor = {
    light: `${defaultColor}.500`,
    dark: `${defaultColor}.200`,
  };
  const color = { light: "black", dark: "white" };
  const highlightColor = {
    light: colors.purple[600],
    dark: colors.purple[300],
  };
  const muteColor = { light: colors.purple[200], dark: colors.purple[600] };
  const strokeColor = { light: colors.gray[400], dark: colors.gray[600] };
  const fillColor = { light: colors.gray[200], dark: colors.gray[700] };

  const [price, setPrice] = useState<number>(320000);
  // const { width, height } = useGetViewport();
  const [width, height] = [600, 400];
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalInfo, setModalInfo] = useState<any | undefined>();
  const [lastPicked, setLastPicked] = useState<number[]>([]);

  const {
    isOpen: isPickerOpen,
    onOpen: onPickerOpen,
    onClose: onPickerClose,
  } = useDisclosure();

  const handleUpdatePrice = (value: number) => {
    setPrice(value);
  };

  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const handleChangeViewState = ({ viewState }: any) => setViewState(viewState);
  const mapStyle = {
    light: "mapbox://styles/mapbox/light-v10",
    dark: "mapbox://styles/mapbox/dark-v10",
  };
  const [searchResult, setSearchResult] = useState<{ coordinates: any[] }[]>(
    []
  );

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

  const handleSelect = (value: any) => {
    setViewState({
      ...viewState,
      ...value,
      zoom: 18,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
    });
    const selected = [
      {
        coordinates: [value.longitude, value.latitude],
      },
    ];
    setSearchResult(selected);
  };

  const handleClearSearch = () => {
    setSearchResult([]);
  };

  const handleModal = (info: any) => {
    setModalInfo(info);
    onOpen();
  };

  // const target = price ? price : initialValue;
  const range: [number, number, number] = [0.05, 0.15, 0.3];
  const { bins } = useGetBins({ target: price, range: range });

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
      onClick: (info: any) => {
        setLastPicked(info.coordinate);
        handleModal(info.object.properties);
      },
      updateTriggers: {
        getFillColor: { bins },
      },
    } as any),
    new IconLayer({
      id: "icon-layer",
      data: searchResult,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      iconAtlas:
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
      iconMapping: ICON_MAPPING,
      getIcon: () => "marker",
      sizeScale: 15,
      getPosition: (d: any) => d.coordinates,
      getSize: () => 6,
      getColor: () => [255, 99, 71],
    }),
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
      <Box style={{ zIndex: 10, position: "absolute", top: 60, left: 5 }}>
        <Geocoder
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN!}
          onSelected={handleSelect}
          onClearSearch={handleClearSearch}
          viewport={viewState}
          hideOnSelect={true}
          initialInputValue=""
          queryParams={params}
          updateInputOnSelect={true}
        />
      </Box>
      <MapInfo viewState={viewState} />
      <MapControls
        defaultColor={defaultColor}
        handleFlyTo={handleFlyTo}
        handleOrient={handleOrient}
      />
      <MapLegend
        defaultColor={defaultColor}
        bins={bins}
        range={range}
        handleOpen={onPickerOpen}
      />
      {modalInfo && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader />
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <ChakraLink
                  isExternal
                  href={`https://maps.google.com/maps?q=${modalInfo.address.replace(
                    / /g,
                    "+"
                  )}+Montreal`}
                >
                  <Image
                    src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lastPicked[1]},${lastPicked[0]}&key=${GOOGLEKEY}`}
                  />
                </ChakraLink>
              </Box>
              <Stack mt={4} spacing={1}>
                <Box>
                  <Heading fontSize="md">{modalInfo.address}</Heading>
                </Box>
                <Box>Registration: {modalInfo.id}</Box>
                <Box>
                  Last assessment: ${modalInfo.price.toLocaleString("en-US")}
                </Box>
                <Box>
                  Area:{" "}
                  {(+(modalInfo.area * 10.7639104167).toFixed(
                    0
                  )).toLocaleString("en-US")}{" "}
                  sf
                </Box>
                <Box>
                  Price per sf: {`$${modalInfo.psqft.toLocaleString("en-US")}`}
                </Box>
                <Box color={linkColor[colorMode]}>
                  <ChakraLink
                    isExternal
                    href={`https://maps.google.com/maps?q=${modalInfo.address.replace(
                      / /g,
                      "+"
                    )}+Montreal`}
                  >
                    Streetview <ExternalLinkIcon mx="2px" />
                  </ChakraLink>
                </Box>
                <Box color={linkColor[colorMode]}>
                  <ChakraLink
                    isExternal
                    href={
                      "https://servicesenligne2.ville.montreal.qc.ca/sel/evalweb/index"
                    }
                  >
                    Tax Records <ExternalLinkIcon mx="2px" />
                  </ChakraLink>
                </Box>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme={defaultColor} mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <Modal isOpen={isPickerOpen} onClose={onPickerClose} isCentered>
        <ModalContent>
          <ModalHeader>
            <Box textAlign="center">Assessment Value</Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" alignItems="center">
              <Box mt={2} mb={10}>
                {price ? "$" + price : "$" + getValue(initialValue)}
              </Box>
              <Box mb={4}>
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
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme={defaultColor} mr={3} onClick={onPickerClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default withApollo({ ssr: true })(Map);
