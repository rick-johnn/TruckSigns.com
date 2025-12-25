import { Layout } from '../components/layout';
import {
  Hero,
  Features,
  HowItWorks,
  ProductPreview,
  CallToAction,
} from '../components/home';

const Home = () => {
  return (
    <Layout fullWidth>
      <Hero />
      <Features />
      <HowItWorks />
      <ProductPreview />
      <CallToAction />
    </Layout>
  );
};

export default Home;
