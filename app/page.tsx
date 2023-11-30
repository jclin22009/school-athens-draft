'use client'
import { useState } from 'react';
import ImageMapper, { MapAreas } from 'react-img-mapper'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, Button,
  HStack,
  Input,
  Box,
  Heading,
  Text
} from '@chakra-ui/react'
import OpenAI from 'openai';
import Chat from './components/chat';


export default function Home() {


  const [hoveredAreaName, setHoveredAreaName] = useState("intialized");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [input, setInput] = useState("");
  const [activeName, setActiveName] = useState("");

  const athensMap = {
    name: "my-map",
    areas: [
      { id: "Plato", shape: "circle", coords: [1817, 1316, 70] },
      { id: "Aristotle", shape: "circle", coords: [1963, 1311, 70] },
      { id: "Anaximander", shape: "circle", coords: [765, 1926, 70] },
      { id: "Socrates", shape: "circle", coords: [1324, 1307, 70] },
      { id: "Diogenes", shape: "circle", coords: [2146, 1738, 70] },
      { id: "Heraclitus", shape: "circle", coords: [1648, 1870, 70] },
      { id: "Epicurus", shape: "circle", coords: [573, 1611, 70] },
      { id: "Euclid", shape: "circle", coords: [2997, 1920, 70] },
      { id: "Ptolemy", shape: "circle", coords: [3321, 1620, 70] },
      { id: "Pythagoras", shape: "circle", coords: [948, 1846, 70] },
      { id: "Zoroaster", shape: "circle", coords: [3245, 1593, 70] },
    ]
  };

  const handleMouseEnter = (area: MapAreas) => {
    if (area.id) {
      setHoveredAreaName(area.id);
    }
  };

  const handleMouseLeave = () => {
    setHoveredAreaName("");
  };

  const handleMouseClick = (area: MapAreas) => {
    if (area.id) {
      onOpen();
      setActiveName(area.id);
    }
  }

  return (
    <Box style={{ width: '100%', height: '100%' }}>
      <HStack
        justifyContent={'center'}
        p={6}
        m={2}
        borderBottomWidth={1}
        borderBottomColor={'gray.700'}
      >
        <Box>
          <Heading as="h1" size="2xl" pb={4} textAlign="center">
            AI School of Athens
          </Heading>
          <Text textAlign="center" fontFamily={'montserrat'}>
            Talk to your favorite philosophers
          </Text>
        </Box>
      </HStack>
      <p>Hovering over: {hoveredAreaName}</p>
      <HStack justifyContent="center">
        <ImageMapper
          src={'/athens_school.jpg'}
          map={athensMap}
          responsive={true}
          natural={true}
          parentWidth={700}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleMouseClick}
        />
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chat with {activeName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Chat philosopher={activeName} />
          </ModalBody>

        </ModalContent>
      </Modal>
    </Box>
  )
}
