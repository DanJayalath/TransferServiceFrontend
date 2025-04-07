import Header from '../Components/Header'; 
import Services from './Services';
import Fleet from './Fleet';
import WhyChooseUs from './WhyChooseUs';
import Deal from './Deal';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
 <Header /> 
      <Services />
      <Fleet />
      <WhyChooseUs />
      <Deal />
 <Footer />
    </div>
  );
};

export default Home;