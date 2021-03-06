import React, { useEffect, useState } from "react";
import { Link, Flex, useColorMode, Box, useMediaQuery } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { HomeButton } from "./HomeButton";
import LogoutModal from "./LogoutModal";
import MenuDrawer from "./MenuDrawer";
import { pages } from "../../constants";
import { withApollo } from "../utils/withApollo";

interface NavbarProps {
  defaultColor: string;
}

const Navbar: React.FC<NavbarProps> = ({ defaultColor }) => {
  const [isWide] = useMediaQuery("(min-width: 1200px)");
  const [isNarrow, setIsNarrow] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const { data } = useMeQuery({
    skip: isServer(),
  });
  let body = null;
  if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link href="/login" mr={8}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link href="/register" mr={8}>
            Register
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Box mr={8}>
          <LogoutModal defaultColor={defaultColor} label={data.me.username} />
        </Box>
      </>
    );
  }

  useEffect(() => {
    setIsNarrow(!isWide);
  }, [isWide]);

  return (
    <Flex
      direction="row"
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={1}
      bg={bgColor[colorMode]}
      width="100vw"
    >
      <Box m={2}>
        <HomeButton defaultColor={defaultColor} />
      </Box>
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        ml="auto"
        mr={2}
        display={isNarrow ? "none" : "flex"}
      >
        {pages.map((page, index) => (
          <NextLink key={index} href={page.path}>
            <Link href={page.path} mr={8}>
              {page.title}
            </Link>
          </NextLink>
        ))}
        <NextLink href="/favorites">
          <Link href="/favorites" mr={8}>
            Favorites
          </Link>
        </NextLink>
        {body}
        <DarkModeSwitch defaultColor={defaultColor} />
      </Flex>
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        ml="auto"
        mr={2}
        display={isNarrow ? "flex" : "none"}
      >
        <MenuDrawer defaultColor={defaultColor}>
          {pages.map((page, index) => (
            <Box key={index} mt={6}>
              <NextLink href={page.path}>
                <Link href={page.path}>{page.title}</Link>
              </NextLink>
            </Box>
          ))}
          {data?.me ? (
            <Box mt={6}>
              <NextLink href="/favorites">
                <Link href="/favorites">Favorites</Link>
              </NextLink>
            </Box>
          ) : null}
          {!data?.me ? (
            <Box mt={6}>
              <NextLink href="/register">
                <Link href="/register">Register</Link>
              </NextLink>
            </Box>
          ) : null}
          <Box mt={10}>
            <DarkModeSwitch defaultColor={defaultColor} />
          </Box>
        </MenuDrawer>
      </Flex>
    </Flex>
  );
};

export default withApollo({ ssr: false })(Navbar);
