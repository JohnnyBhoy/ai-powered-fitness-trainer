import { Link } from "@inertiajs/react";

const Join = () => {
    return (
      <div className="bg-[#f5f8fe] text-center py-20">
        <p className="text-[#23B5D3] font-bold tracking-wide uppercase mb-4 text-2xl">
          Join GoPeakFit Today
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 font-alfarn">
          Start now & Stay Accountable
        </h1>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 font-alfarn">
          Eat more. Achieve More.
        </h2>
        <Link
          href="/register"
          className="bg-[#23B5D3] hover:bg-cyan-600 text-white font-medium px-6 py-3 rounded-full shadow-md transition duration-300 inline-block text-center"
        >
          Start Your $1 Trial—See Results in 5 Days!
        </Link>
      </div>
    );
  };
  
  export default Join;
  