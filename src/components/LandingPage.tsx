import { useTranslations } from 'next-intl';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';

import Navbar from './Navbar';

const LandingPage = () => {
  const t = useTranslations('LandingPage');

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
      {/* Header */}
      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col items-center bg-blue-100 p-6 text-center sm:p-12">
        <h2 className="mb-4 text-3xl font-semibold text-blue-700 md:text-4xl">
          {t('description')}
        </h2>
        <div className="mt-8">
          <Button label={t('getStarted')} icon="pi pi-arrow-right" />
        </div>
      </section>

      {/* Features Section */}
      <section className="grid gap-6 p-4 sm:p-8 md:grid-cols-3">
        <Card className="bg-white shadow-md">
          <h3 className="mb-2 text-xl font-semibold text-blue-700">{t('features.trackIntake')}</h3>
          <p className="text-gray-600">Monitor your daily sugar, salt, and fat levels with real-time analytics.</p>
        </Card>
        <Card className="bg-white shadow-md">
          <h3 className="mb-2 text-xl font-semibold text-blue-700">{t('features.personalJourney')}</h3>
          <p className="text-gray-600">Get personalized recommendations and reminders based on your health profile.</p>
        </Card>
        <Card className="bg-white shadow-md">
          <h3 className="mb-2 text-xl font-semibold text-blue-700">{t('features.ocrScanner')}</h3>
          <p className="text-gray-600">Scan food labels to track hidden sugars with our advanced OCR technology.</p>
        </Card>
      </section>

      {/* Call-to-Action Section */}
      <section className="flex flex-col items-center bg-blue-200 px-4 py-8 text-center sm:py-12">
        <h2 className="mb-4 text-3xl font-semibold text-blue-700 md:text-3xl">{t('features.ctaTitle')}</h2>
        <p className="max-w-xl text-lg text-gray-700">{t('features.ctaDescription')}</p>
        <div className="mt-6 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <InputText placeholder="Enter your email" className="p-inputtext-sm w-64" />
          <Button label="Subscribe" className="p-button p-button-success" />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 bg-white p-6 text-center shadow-inner">
        <p className="text-gray-600">{t('footer')}</p>
      </footer>
    </div>
  );
};

export default LandingPage;
