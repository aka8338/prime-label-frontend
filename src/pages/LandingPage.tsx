// src/pages/LandingPage.tsx
import landingBackImage from '../assets/landingBack.png';
import landingPageBackImage from '../assets/landingPageBack.png';

export default function LandingPage() {
  const backgroundStyle = {
    backgroundImage: `url(${landingBackImage}), url(${landingPageBackImage})`,
    backgroundSize: 'cover, cover',
    backgroundPosition: 'center, center',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundBlendMode: 'overlay',
    minHeight: '100vh',
  };

  const headerStyle = {
    fontSize: '40px',
    fontWeight: 800,
    lineHeight: 1.5,
  };

  return (
    <div className="relative w-full overflow-auto">
      <div style={backgroundStyle} className="min-h-screen">
        <header className="w-full flex justify-center pt-16">
          <h1 style={headerStyle} className="!text-[180px] font-black text-white/80 backdrop-blur-sm py-12 px-8 max-w-[90%]">
            Welcome to clinicalLabel.io
          </h1>
        </header>

        <section className="w-full flex justify-center mt-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white/90 text-center mb-8 backdrop-blur-sm py-4">Empowering Patients, Transforming Trials</h2>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg">
              <p className="text-xl text-white/85 leading-relaxed">
                At clinicalLabel.io, we believe clinical trial labels should put patients first. Our eLabels are designed to be clear, intuitive, and accessible — empowering participants with the
                information they need, when they need it, right from their smartphones.
              </p>

              <p className="text-xl text-white/85 leading-relaxed mt-6">No more confusion, no more outdated paper labels. Just clarity, confidence, and care.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
