import AboutBackground from "../components/AboutBackground";
import AboutClients from "../components/AboutClients";
import AboutHeading from "../components/AboutHeading";
import AboutServices from "../components/AboutServices";
import AboutTeam from "../components/AboutTeam";
import AppLayout from "../components/AppLayout";
import Footer from "../components/Footer";

const About = () => {
  return (
    <AppLayout>
      <AboutHeading />

      <AboutBackground />

      <AboutTeam />

      <AboutServices />

      <AboutClients />

      <Footer />
    </AppLayout>
  );
};

export default About;
