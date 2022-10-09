import React from "react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { trpc } from "~/utils/trpc";

export const AstronautStat: React.FC = () => {
  const { data } = trpc.astronauts.count.useQuery();

  return (
    <Stat p="4" border="1px" borderColor="gray.700" rounded="md">
      <StatLabel>Registered astronauts</StatLabel>
      <StatNumber>{data ?? "-"}</StatNumber>
    </Stat>
  );
};
