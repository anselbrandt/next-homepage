import React from "react";
import { LoremIpsum as Lorem } from "react-lorem-ipsum";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";

interface TestProps {
  defaultColor: string;
}

const Test: React.FC<TestProps> = ({ defaultColor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container>
      <Navbar defaultColor={defaultColor} />
      <Box mt="30vh" maxW="48rem">
        <Button mt={3} onClick={onOpen}>
          Trigger modal
        </Button>

        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={"inside"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Lorem p={7} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Container>
  );
};

export default Test;
