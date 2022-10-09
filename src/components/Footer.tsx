import React from "react";
import { Box, Link } from "@chakra-ui/react";

export const Footer: React.FC = () => (
  <Box as="footer" mt="10" textAlign="center" color="gray.400">
    Coded by{" "}
    <Link rel="noreferrer noopener" target="_blank" href="https://jakubh.com/">
      Jakub Habrcetl
    </Link>
  </Box>
);
