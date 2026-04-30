import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
      <div className="text-center z-10">
        <h1 className="text-5xl md:text-7xl mb-6">
          {t('hero.title_start')} <span className="text-primary">{t('hero.title_accent')}</span>
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-10 text-gray">{t('hero.subtitle')}</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/services" className="bg-primary text-black px-8 py-3 rounded-lg font-bold hover:shadow-[0_0_20px_theme(colors.primary)] transition inline-block text-center">{t('hero.cta_services')}</Link>
          <Link to="/contact" className="border border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary/10 transition inline-block text-center">{t('hero.cta_contact')}</Link>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      {/* Additional sections like Services preview can be added here later */}
    </>
  );
};

export default Home;
