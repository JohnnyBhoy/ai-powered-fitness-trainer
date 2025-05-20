import { Link } from "@inertiajs/react";

const KeyDiff = () => {
    return (
        <div className="flex flex-col items-center px-4 text-black py-20  bg-gray-100">
          <div className="flex flex-col md:flex-row max-w-5xl w-full gap-8">
            {/* Left Column - Image */}
            <div className="w-full">
              <img
                src="/images/key-diff.png"
                alt="Key Difference"
                className="w-full h-70 object-cover rounded-lg"
              />
            </div>
  
            {/* Right Column - Content */}
            <div className="w-full flex flex-col justify-center pt-10 h-full">
              <h2 className="text-3xl font-bold mb-4 text-[#23B5D3]">THE KEY DIFFERENCE?</h2>
              <h2 className="text-4xl font-bold mb-4 font-alfarn max-w-sm">You Won’t Quit!</h2>
  
              <p className="max-w-2xl mx-auto  mb-4 text-md">
                 Most programs leave you on your own. We don’t. We make sure you follow
                 through, stay consistent, and actually see results.
              </p>

            <div>
                <ul className="list-none list-inside text-md">
                    <li> <span className="text-[#23B5D3] font-bold mr-2">✓</span>No more starting and stopping. No more “I’ll do it later.”</li>
                    <li> <span className="text-[#23B5D3] font-bold mr-2">✓</span>This time, you follow through. Because we won’t let you fail.</li>
                    <li> <span className="text-[#23B5D3] font-bold mr-2">✓</span>Are you ready for that kind of accountability? Let’s get to work.</li>
                </ul>
            </div>
  
             
  
             <Link
                href="/register"
                className="mt-5 bg-black text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-gray-800 transition-all duration-200 w-full sm:w-fit text-center block sm:inline-block"
                >
                Start Your 5-Day Challenge for $1 Now
            </Link>

            </div>
          </div>
        </div>
  );
};

export default KeyDiff;
