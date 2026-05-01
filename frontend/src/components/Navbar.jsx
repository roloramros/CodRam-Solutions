import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.portfolio'), path: '/portfolio' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-primary font-bold text-2xl tracking-tighter" onClick={() => setIsOpen(false)}>CodRam</Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-gray hover:text-primary transition-colors text-sm font-medium uppercase border border-white/10 px-3 py-1 rounded-md"
          >
            <Globe size={16} />
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="hidden sm:block bg-primary text-black px-6 py-2 rounded-full font-bold hover:shadow-[0_0_15px_theme(colors.primary)] transition-all duration-300">
            {t('nav.quote')}
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 py-6 px-4 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-white text-lg hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <button 
              onClick={() => { toggleLanguage(); setIsOpen(false); }}
              className="flex items-center gap-2 text-white hover:text-primary transition-colors font-medium"
            >
              <Globe size={20} />
              {i18n.language === 'es' ? 'English' : 'Español'}
            </button>
            <button className="bg-primary text-black px-6 py-3 rounded-full font-bold">
              {t('nav.quote')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
