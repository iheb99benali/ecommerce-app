import AppLayout from "../components/AppLayout";
import Banner from "../components/Banner";
import HomeLatestMenu from "../components/HomeLatestMenu";

const Home = () => {
  return (
    <AppLayout>
      <Banner />
      <HomeLatestMenu />
    </AppLayout>
  );
};

export default Home;
