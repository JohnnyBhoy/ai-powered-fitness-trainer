const Footer = () => {
  return (
    <footer className="bg-[#141619] text-white py-6 pb-14 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Left Side */}
        <div className="flex flex-col items-start gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <img 
              src="/logos/mobile-header-logo.png" 
              alt="Go Peak Fit Logo" 
              className="w-[50px] sm:w-[60px] lg:w-[70px]"  // Responsive width for logo
            />
            <span className="font-bold text-white text-xl sm:text-2xl font-alfarn">PEAK FIT</span>
          </div>
          <div className="text-sm">
            Copyright © 2025 GoPeakFit |&nbsp;
            <a href="#" className="hover:underline">Privacy Policy</a> |&nbsp;
            <a href="#" className="hover:underline">Terms & Conditions</a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm md:text-base">
          <a href="#what-we-offer" className="hover:text-cyan-400">What We Offer</a>
          <a href="#how-it-works" className="hover:text-cyan-400">How It Works</a>
          <a href="#pricing" className="hover:text-cyan-400">Pricing</a>
          <a href="#philosophy" className="hover:text-cyan-400">Programs</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
