import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  // Fallback to prevent infinite loading if splash screen fails
  useEffect(() => {
    const backupTimer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(backupTimer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Duran.dev | Portfolio</title>
        <meta name="description" content="Professional portfolio of Duran, a full-stack developer specializing in modern web technologies." />
      </Helmet>
      
      {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <Layout>
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Services />
          <Testimonials />
          <Contact />
        </Layout>
      )}
    </>
  );
}

export default App;
