import CategoryNavbar from '../../components/CategoryNavbar'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import Instructions from './Instructions'
import Testimonials from './Testimonials'
import FrequentlyAskedQns from './FrequentlyAskedQns'
import ContactUs from './ContactUs'

const HomePage = () => {
  return (
    <div className="md:px-36 px-14 pt-10 mb-32 font-noto">
      <div className="flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <Instructions />
        <div className="my-20 flex flex-col gap-14">
          <h1 className="text-3xl font-bold text-center">
            Explore a diverse range of categories from local farmers
          </h1>
          <CategoryNavbar />
        </div>
        <Testimonials />
        <FrequentlyAskedQns />
        <ContactUs />
      </div>
    </div>
  )
}

export default HomePage
