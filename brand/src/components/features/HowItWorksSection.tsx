export function HowItWorksSection() {
  return (
    <section className="py-16 px-4 max-w-5xl mx-auto bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">仕組みについて</h2>
        
        <div className="relative rounded-lg overflow-hidden">
          <div className="aspect-video bg-gradient-to-r from-primary-800 to-primary-600 flex items-center justify-center">
            <button className="w-20 h-20 bg-primary-400 bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
              <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 