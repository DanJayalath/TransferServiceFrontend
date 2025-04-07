import Header from '../Components/Header'; 
import ChauffeurService from './ChauffeurService';
import Services from './Services';
import Fleet from './Fleet';
import TripAdvisorReviews from './TripAdvisorReviews';
import WhyChooseUs from './WhyChooseUs';
import Deal from './Deal';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
 <Header /> 
 <ChauffeurService/>
      <Services />
{/*       <Fleet /> */}
      <WhyChooseUs />
      <TripAdvisorReviews/>
{/*       <Deal /> */}
 <Footer />
    </div>
  );
};

export default Home;