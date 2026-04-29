import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <Link to="/" className="text-primary font-bold text-2xl tracking-tighter">CodRam</Link>
      <div className="hidden md:flex space-x-8">
        <Link to="/" className="hover:text-primary transition-colors duration-300">Home</Link>
        <Link to="/services" className="hover:text-primary transition-colors duration-300">Services</Link>
        <Link to="/portfolio" className="hover:text-primary transition-colors duration-300">Portfolio</Link>
        <Link to="/contact" className="hover:text-primary transition-colors duration-300">Contact</Link>
      </div>
      <button className="bg-primary text-black px-6 py-2 rounded-full font-bold hover:shadow-[0_0_15px_#00AEEF] transition-all duration-300">
        Request Quote
      </button>
    </div>
  </nav>
);

export default Navbar;
