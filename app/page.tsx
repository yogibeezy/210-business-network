import InquiryForm from '@/components/InquiryForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-amber-500/30">
      
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/sa-skyline-night.jpg" 
            alt="San Antonio skyline"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full py-20">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-neutral-500 mb-6 md:mb-8">
            San Antonio & South Texas
          </p>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-8">
            <span className="block">210</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Business
            </span>
            <span className="block">Network</span>
          </h1>

          <p className="text-xl md:text-3xl lg:text-4xl text-neutral-300 font-light max-w-3xl leading-relaxed mb-12">
            Where South Texas business happens.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent z-10" />
      </section>

      {/* THE NETWORK */}
      <section className="px-8 md:px-16 lg:px-24 py-32 md:py-40 border-t border-neutral-900">
        <div className="max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-amber-500 mb-6">Membership</p>
              <h2 className="text-3xl md:text-4xl font-light leading-tight">
                A private network for business owners who build things.
              </h2>
            </div>
            <div className="space-y-6 text-neutral-400 font-light leading-relaxed">
              <p>
                HVAC. Plumbing. Automotive. Roofing. Electrical. Landscaping. 
                Concrete. Painting. Pools. Restaurants. Retail. Professional services. 
                If you operate a business in South Texas, you belong here.
              </p>
              <p className="text-neutral-300">
                This is not a directory. This is a network of operators who 
                understand what it takes to build something real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE TERRITORY */}
      <section className="px-8 md:px-16 lg:px-24 py-32 md:py-40 bg-neutral-900/30">
        <div className="max-w-6xl">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-500 mb-6">Territory</p>
          <h2 className="text-3xl md:text-5xl font-light mb-8">Border to coast.</h2>
          <p className="text-neutral-400 font-light text-lg max-w-2xl mb-16">
            Eagle Pass to Corpus Christi. Laredo to Lockhart. 
            The full sweep of South Texas.
          </p>

          <div className="flex justify-center">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-neutral-800 max-w-4xl">
              {[
                'San Antonio', 'New Braunfels', 'Schertz', 'Seguin', 'Cibolo', 'Converse',
                'Universal City', 'Helotes', 'Boerne', 'Kyle', 'San Marcos', 'Lockhart',
                'Pleasanton', 'Jourdanton', 'Devine', 'Hondo', 'Bandera', 'Kerrville',
                'Uvalde', 'Carrizo Springs', 'Crystal City', 'Eagle Pass', 'Corpus Christi', 'Laredo'
              ].map((city) => (
                <div key={city} className="bg-neutral-950 py-4 px-2 text-center">
                  <p className="text-neutral-500 text-sm font-light">{city}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INQUIRY */}
      <section className="px-8 md:px-16 lg:px-24 py-32 md:py-40 border-t border-neutral-900">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-500 mb-6">Inquiry</p>
          <h2 className="text-3xl md:text-4xl font-light mb-6">Request an introduction.</h2>
          <p className="text-neutral-400 font-light mb-12">
            Membership is curated. Tell us about your business and we&apos;ll be in touch.
          </p>

          <InquiryForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 lg:px-24 py-12 border-t border-neutral-900">
        <div className="max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-sm font-light">
            210 Business Network
          </p>
          <p className="text-neutral-700 text-sm font-light">
            South Texas
          </p>
        </div>
      </footer>
    </main>
  )
}