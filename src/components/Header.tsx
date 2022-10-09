import React from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { AstronautStat } from "~/modules/home/AstronautStat";
import { openDrawer } from "~/modules/home/AstronautDrawer";
import { AddIcon } from "@chakra-ui/icons";

export const Header: React.FC = () => (
  <Box as="header" display="flex" flexDir="column" mb="6">
    <Heading as="h1" mb="3">
      Astronauts Dashboard
    </Heading>
    <Box mb="5">
      Track all your astronauts in one single table. Create their profiles, edit
      or delete them.
    </Box>

    <AstronautStat />

    <Box className="flex" mt="4">
      <Button
        mb="8"
        size="sm"
        ml="auto"
        colorScheme="linkedin"
        leftIcon={<AddIcon />}
        onClick={() => openDrawer({ mode: "create" })}
      >
        Create new Astronaut
      </Button>
    </Box>
  </Box>
);
