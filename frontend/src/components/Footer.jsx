import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link to="/" className="text-primary font-bold text-2xl tracking-tighter">CodRam</Link>
          <p className="text-gray text-sm leading-relaxed">
            Premium software agency specializing in futuristic, scalable, and high-performance digital solutions.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray hover:text-primary transition-colors"><Github size={20} /></a>
            <a href="#" className="text-gray hover:text-primary transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-gray hover:text-primary transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-bold mb-6">Services</h4>
          <ul className="space-y-4 text-sm text-gray">
            <li className="hover:text-primary transition-colors cursor-pointer">Web Development</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Mobile Apps</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Process Automation</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Custom Bots</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-white font-bold mb-6">Contact Us</h4>
          <div className="flex items-start space-x-3 text-sm text-gray">
            <MapPin size={18} className="text-primary shrink-0" />
            <span>Digital Headquarters</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray">
            <Mail size={18} className="text-primary shrink-0" />
            <span>contact@codram.com</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray">
            <Phone size={18} className="text-primary shrink-0" />
            <span>+1 (555) COD-RAM</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray/50">
        <p>© {currentYear} CodRam. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
