const WhatWeOffer = () => {
    return (
        <div id="what-we-offer" className="flex flex-col items-center px-4 bg-white text-black text-center pb-10">
            <h2 className="text-3xl font-bold mt-2 font-alfarn text-gray-800">Start Your $1 Challenge Now</h2>
            <p className="max-w-3xl mt-4 text-gray-700 text-sm">
            For 5 days, we’re stripping away the excuses, the half-measures, and the endless cycle of “I’ll start tomorrow.”
            For just $1, you’ll get the exact plan to <span className="font-bold">reset your body, take control of your diet,</span> and <span className="font-bold">build the discipline</span> that leads to real, lasting results.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 max-w-4xl">
                <div className="p-6 bg-gray-100 rounded-lg">
                    <h4 className="text-sm font-bold text-[#23B5D3] text-left">Structured 5-Day Nutrition Plan</h4>
                    <p className="text-gray-600 mt-2 text-left text-xs">No fads, no starving, just a clear, science-backed system to fuel your body.</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-md">
                    <h4 className="text-sm font-bold text-[#23B5D3] text-left">Daily Fitness Challenges</h4>
                    <p className="text-gray-600 mt-2  text-left text-xs">Because real change happens when you stop playing xsall.</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-md">
                    <h4 className="text-sm font-bold text-[#23B5D3] text-left">Accountability & Support</h4>
                    <p className="text-gray-600 mt-2  text-left text-xs">You won’t do this alone. We’ll push you to stay locked in.</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-md">
                    <h4 className="text-sm font-bold text-[#23B5D3] text-left">A Proven System for Lasting Change</h4>
                    <p className="text-gray-600 mt-2 text-left text-xs">This isn’t about 5 days—it’s about starting the routine where you won’t quit.</p>
                </div>
            </div>
            
           
        </div>
    );
};

export default WhatWeOffer;
