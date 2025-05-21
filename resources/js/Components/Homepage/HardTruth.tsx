import { Link } from "@inertiajs/react";

const HardTruth = () => {
    return (
        <div className="flex flex-col items-center px-4 bg-white text-black py-10">
          <div className="flex flex-col md:flex-row max-w-6xl w-full gap-8">
            {/* Left Column - Image */}
            <div className="w-full">
              <img
                src="/images/hardtruth1.png"
                alt="Hard Truth Illustration"
                className="w-full h-70 object-cover rounded-lg"
              />
            </div>
  
            {/* Right Column - Content */}
            <div className="w-full flex flex-col justify-center pt-10 h-full">
              <h2 className="text-xl font-bold mb-4 text-[#23B5D3]">THE HARD TRUTH</h2>
              <h2 className="text-3xl font-bold mb-4 font-alfarn max-w-sm">Most People Won't Even Try</h2>
  
              <p className="max-w-2xl mx-auto text-gray-700 mb-4 text-md">
                They’ll make excuses. They’ll keep doing what they’ve always done—and stay exactly where they are.
              </p>
  
              <p className="max-w-2xl mx-auto text-gray-700 mb-6 text-md">
                <span className="font-bold">That’s not you.</span> You’re here because you’re ready to step up. To prove that
                you can stick to something. To show yourself that you have more in you than you’ve been giving.
              </p>
              <p className="font-bold text-md max-w-xs mb-8">
                Take the Challenge. Change Your Life. 5 Days. $1. Zero Excuses.
              </p>
  
              <Link
                href="/register"
                className="mt-2 bg-black text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-gray-800 transition-all duration-200 w-full sm:w-fit text-center block sm:inline-block"
              >
                Start Your 5-Day Challenge for $1
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row  max-w-6xl w-full  pt-20">
            {/* Left Column - Content */}
            <div id="pricing" className="w-full  flex flex-col justify-center pt-10 h-full">
              <h2 className="text-xl font-semibold mb-4 text-[#23B5D3]">PRICING ($49 per month)</h2>
              <h2 className="text-4xl font-bold mb-4 font-alfarn max-w-lg">Invest In Your Health For Less Than $2/Day</h2>
              
              <ul className="list-none list-inside text-md mb-8">
                <li><span className="text-[#23B5D3] font-bold mr-2">✓</span>Personalized protein meal plan</li>
                <li><span className="text-[#23B5D3] font-bold mr-2">✓</span>Progressive strength workouts (3x/week)</li>
                <li><span className="text-[#23B5D3] font-bold mr-2">✓</span>Daily wellness checklists (sleep, water, sunlight)</li>
                <li><span className="text-[#23B5D3] font-bold mr-2">✓</span>24/7 coach and community support</li>
              </ul>
            
              <Link
                href="/register"
                className="mt-4 bg-black text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-gray-800 transition-all duration-200 w-full sm:w-fit text-center block sm:inline-block"
              >
                Try 5 Days for $1—Unlock Lifetime 
              </Link>

            </div>
  
            {/* Right Column - Image */}
            <div className="w-full relative pt-4">
              <img
                src="/images/hardtruth2.png"
                alt="Hard Truth Illustration"
                className="w-full h-full  rounded-lg"
              />
               {/* Workout Notification Image */}
               <img 
                    src="/images/hardtruthstar.png" 
                    alt="Workout Notification Images" 
                    className="rounded-xl md:w-56 w-40 absolute bottom-20 md:left-[-100px]"
                />

        </div>
      </div>
    </div>
  );
};

export default HardTruth;
