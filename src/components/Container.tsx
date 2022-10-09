import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, BoxProps } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const DynamicConfirmModal = dynamic(
  () => import("../components/ConfirmModal"),
  { ssr: false }
);

interface ContainerProps extends BoxProps {
  title?: string;
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  title,
  children,
  ...props
}) => {
  const siteName = "TechFides";
  return (
    <Box minH="100vh">
      <Head>
        <title>{title ? `${title} - ${siteName}` : siteName}</title>
      </Head>
      <Box
        w="full"
        pb="12"
        mx="auto"
        maxW="5xl"
        px={{ base: "6", md: "8" }}
        {...props}
      >
        <Navbar />

        {children}

        <Footer />
      </Box>

      <DynamicConfirmModal />
    </Box>
  );
};
