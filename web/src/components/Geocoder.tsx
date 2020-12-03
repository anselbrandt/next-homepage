import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import MapboxClient from "mapbox";
import { WebMercatorViewport } from "viewport-mercator-project";
import { Box, Input, useColorMode } from "@chakra-ui/core";

interface GeocoderProps {
  timeout?: number;
  queryParams?: object;
  viewport: {};
  onSelected: (...args: any) => any;
  onClearSearch?: (...args: any) => any;
  transitionDuration?: number;
  hideOnSelect?: boolean;
  pointZoom?: number;
  mapboxApiAccessToken: string;
  formatItem?: (...args: any) => any;
  limit?: number;
  localGeocoder?: (...args: any) => any;
  localOnly?: boolean;
  updateInputOnSelect?: boolean;
  initialInputValue?: string;
}

const Geocoder: React.FC<GeocoderProps> = ({
  timeout,
  queryParams,
  viewport,
  onSelected,
  onClearSearch,
  transitionDuration,
  hideOnSelect,
  pointZoom,
  mapboxApiAccessToken,
  formatItem,
  limit,
  localGeocoder,
  localOnly,
  updateInputOnSelect,
  initialInputValue,
}) => {
  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };
  const bgColor = { light: "white", dark: "gray.800" };
  const hoverColor = { light: "gray.200", dark: "gray.600" };

  const debounceRef = useRef<number | undefined>();
  const client = new MapboxClient(mapboxApiAccessToken);

  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [inputValue, setInputValue] = useState<string | undefined>("");

  const handleOnChange = (event: any) => {
    const queryString = event.target.value;
    setInputValue(queryString);
    if (queryString === "" && onClearSearch) {
      onClearSearch();
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const localResults = localGeocoder ? localGeocoder(queryString) : [];
      const params = {
        ...queryParams,
        ...{ limit: limit! - localResults.length },
      };
      if (params.limit > 0 && !localOnly && queryString.length > 0) {
        client.geocodeForward(queryString, params).then((res: any) => {
          setResults([...localResults, ...res.entity.features]);
        });
      } else {
        setResults(localResults);
      }
    }, timeout);
  };

  const handleOnSelected = (item: any) => {
    let newViewport = new WebMercatorViewport(viewport);
    const { bbox, center } = item;
    if (bbox) {
      newViewport = newViewport.fitBounds([
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ]);
    } else {
      newViewport = {
        longitude: center[0],
        latitude: center[1],
        zoom: pointZoom,
      } as any;
    }
    const { longitude, latitude, zoom } = newViewport;
    onSelected(
      { ...viewport, ...{ longitude, latitude, zoom, transitionDuration } },
      item
    );
    if (hideOnSelect) {
      setResults([]);
    }
    if (updateInputOnSelect) {
      setInputValue(formatItem!(item));
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleHideResults = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 300);
  };

  useEffect(() => {
    if (inputValue?.length === 0 && initialInputValue !== "") {
      setInputValue(initialInputValue);
    }
  }, [inputValue, initialInputValue]);

  return (
    <Box bgColor={bgColor[colorMode]} color={color[colorMode]}>
      <Input
        onChange={handleOnChange}
        onBlur={handleHideResults}
        onFocus={handleShowResults}
        value={inputValue}
        placeholder="search..."
      />

      {showResults && !!results.length && (
        <Box m={4}>
          {results.map((item, index) => (
            <Box
              key={index}
              onClick={() => handleOnSelected(item)}
              item={item}
              _hover={{
                bgColor: hoverColor[colorMode],
                cursor: "pointer",
              }}
            >
              {formatItem!(item)}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

Geocoder.propTypes = {
  timeout: PropTypes.number,
  queryParams: PropTypes.object,
  viewport: PropTypes.object.isRequired,
  onSelected: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func,
  transitionDuration: PropTypes.number,
  hideOnSelect: PropTypes.bool,
  pointZoom: PropTypes.number,
  mapboxApiAccessToken: PropTypes.string.isRequired,
  formatItem: PropTypes.func,
  limit: PropTypes.number,
  localGeocoder: PropTypes.func,
  localOnly: PropTypes.bool,
  updateInputOnSelect: PropTypes.bool,
  initialInputValue: PropTypes.string,
};

Geocoder.defaultProps = {
  timeout: 300,
  transitionDuration: 0,
  hideOnSelect: false,
  updateInputOnSelect: false,
  pointZoom: 16,
  formatItem: (item) => item.place_name,
  queryParams: {},
  limit: 5,
  initialInputValue: "",
};

export default Geocoder;
