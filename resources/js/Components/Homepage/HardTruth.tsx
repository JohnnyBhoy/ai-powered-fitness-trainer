const HardTruth = () => {
    return (
      <>
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
              <p className="font-bold text-md max-w-xs">
                Take the Challenge. Change Your Life. 5 Days. $1. Zero Excuses.
              </p>
  
              <button className="mt-4 bg-black text-white px-6 py-2 rounded-full text-xs hover:bg-gray-800 transition w-fit">
                Start Your 5-day Challenge for $1
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row  max-w-6xl w-full  pt-20">
            {/* Left Column - Content */}
            <div id="pricing" className="w-full  flex flex-col justify-center pt-10 h-full">
              <h2 className="text-xl font-semibold mb-4 text-[#23B5D3]">PRICING ($49 per month)</h2>
              <h2 className="text-4xl font-bold mb-4 font-alfarn max-w-lg">Invest In Your Health For Less Than $2/Day</h2>
              
              <ul className="list-none list-inside text-md">
                <li><span className="text-[#23B5D3] font-bold mr-2">✔</span>Personalized protein meal plan</li>
                <li><span className="text-[#23B5D3] font-bold mr-2">✔</span>Progressive strength workouts (3x/week)</li>
                <li><span className="text-[#23B5D3] font-bold mr-2">✔</span>Daily wellness checklists (sleep, water, sunlight)</li>
                <li><span className="text-[#23B5D3] font-bold mr-2">✔</span>24/7 coach and community support</li>
              </ul>
            
              <button className="mt-4 bg-black text-white px-6 py-2 rounded-full text-xs hover:bg-gray-800 transition w-fit">
                Try 5 Days for $1—Unlock Lifetime Hab
              </button>
            </div>
  
            {/* Right Column - Image */}
            <div className="w-full relative">
              <img
                src="/images/hardtruth2.png"
                alt="Hard Truth Illustration"
                className="w-full h-full  rounded-lg"
              />
               {/* Workout Notification Image */}
               <img 
                    src="/images/hardtruthstar.png" 
                    alt="Workout Notification Image" 
                    className="rounded-xl w-64 absolute bottom-20 left-[-100px]"
                />

            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default HardTruth;
  