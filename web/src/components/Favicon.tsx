import { StarIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/core";
import colors from "../utils/colors";

interface FaviconProps {
  defaultColor: string;
  checked: boolean;
  size?: number;
}

export const Favicon: React.FC<FaviconProps> = ({
  defaultColor,
  size,
  checked,
}) => {
  const { colorMode } = useColorMode();
  const color = {
    light: colors[defaultColor][500],
    dark: colors[defaultColor][200],
  };
  return (
    <StarIcon
      boxSize={size}
      color={color[colorMode]}
      style={{
        stroke: `${color[colorMode]}`,
        strokeWidth: "1",
        fillOpacity: checked ? 1 : 0,
      }}
    />
  );
};
