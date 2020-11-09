import { useColorMode, Switch } from "@chakra-ui/core";

interface DarkModeSwitchProps {
  defaultColor: string;
}

export const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({
  defaultColor,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Switch
      position="fixed"
      top="1rem"
      right="1rem"
      colorScheme={defaultColor}
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
};
