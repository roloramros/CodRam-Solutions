import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';

// Placeholder components for other pages
const Services = () => <div className="min-h-screen flex items-center justify-center text-3xl">Services Page (Coming Soon)</div>;
const Contact = () => <div className="min-h-screen flex items-center justify-center text-3xl">Contact Page (Coming Soon)</div>;

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
