import { useColorMode, Switch, Flex } from "@chakra-ui/core";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

interface DarkModeSwitchProps {
  defaultColor: string;
}

export const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({
  defaultColor,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex>
      <MoonIcon
        mr={2}
        mt={1}
        size="14px"
        opacity={colorMode !== "dark" ? 0.3 : 1}
      />
      <Switch
        colorScheme={defaultColor}
        isChecked={colorMode === "light" ? true : false}
        onChange={toggleColorMode}
      />
      <SunIcon
        ml={2}
        mt={1}
        size="14px"
        opacity={colorMode !== "dark" ? 0.3 : 1}
      />
    </Flex>
  );
};
