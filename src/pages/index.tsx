import AstronautTable from "~/modules/home/AstronautTable";
import { Container } from "~/components/Container";
import { Header } from "~/components/Header";
import { AstronautDrawer } from "~/modules/home/AstronautDrawer";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <Container title="Home">
      <Header />
      <AstronautDrawer />
      <AstronautTable />
    </Container>
  );
};

export default HomePage;
