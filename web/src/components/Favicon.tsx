import { StarIcon } from "@chakra-ui/icons";
import { useColorMode, IconButton } from "@chakra-ui/core";
import colors from "../utils/colors";

interface FaviconProps {
  defaultColor?: string;
  checked: boolean;
  size?: number;
  overlay?: boolean;
}

export const Favicon: React.FC<FaviconProps> = ({
  defaultColor,
  size,
  checked,
  overlay,
}) => {
  const { colorMode } = useColorMode();
  const color = {
    light: colors[defaultColor ? defaultColor : "gray"][500],
    dark: colors[defaultColor ? defaultColor : "gray"][200],
  };
  if (overlay) {
    return (
      <StarIcon
        boxSize={size}
        color="white"
        style={{
          stroke: "white",
          strokeWidth: "1",
          fillOpacity: checked ? 1 : 0,
        }}
      />
    );
  } else {
    return (
      <IconButton
        aria-label="Favorite"
        colorScheme={defaultColor}
        variant="ghost"
        icon={
          <StarIcon
            boxSize={size}
            color={color[colorMode]}
            style={{
              stroke: `${color[colorMode]}`,
              strokeWidth: "1",
              fillOpacity: checked ? 1 : 0,
            }}
          />
        }
      />
    );
  }
};
