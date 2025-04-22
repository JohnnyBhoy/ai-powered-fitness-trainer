import { useState } from 'react';


function TheGoal() {
  const [goal, setGoal] = useState('');
  const [why, setWhy] = useState('');
  const [pastObstacles, setPastObstacles] = useState('');
  const [currentStruggles, setCurrentStruggles] = useState('');

  return (
    <div className="flex flex-col items-center px-4 bg-white text-black py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mt-2 text-[#23B5D3] mb-6 ">THE GOAL</h1>
      <h2 className="text-3xl font-semibold mb-8 font-alfarn">ACCOUNTABILITY THAT DRIVES RESULTS</h2>
      
      <div className="flex flex-wrap w-full gap-6 mb-8 mt-10">
        <div className="flex-1 min-w-[300px]">
          <label className="block text-left font-medium mb-2">What's your primary health and fitness goal?</label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-1 h-40 bg-gray-200 resize-none"
          
          />
           <p className='text-[10px] text-gray-400 italic'>Example: lose 10 pounds and increase lean muscle mass.</p>
        </div>
        
        <div className="flex-1 min-w-[300px]">
          <label className="block text-left font-medium mb-2">Why do you want this?</label>
          <textarea
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-1 h-40 bg-gray-200 resize-none"
           
          />
          <p className='text-[10px] text-gray-400 italic'>Example: Beach Vacation in 3 months and I want to look good in a swimsuit.</p>
        </div>
      </div>
      
      <div className="flex flex-wrap w-full gap-6 mb-10">
        <div className="flex-1 min-w-[300px]">
          <label className="block text-left font-medium mb-2">What stopped you from reaching your goals in the past?</label>
          <textarea
            value={pastObstacles}
            onChange={(e) => setPastObstacles(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-1 h-40 bg-gray-200 resize-none"
            
          />
          <p className='text-[10px] text-gray-400 italic'>Example: Lack of consistency, no accountability, emotional eating, busy schedule.</p>
        </div>
        
        <div className="flex-1 min-w-[300px]">
          <label className="block text-left font-medium mb-2">What's the biggest struggle you face when trying to stay on track?</label>
          <textarea
            value={currentStruggles}
            onChange={(e) => setCurrentStruggles(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-1 h-40 bg-gray-200 resize-none"
          />
         <p className='text-[10px] text-gray-400 italic'>Example: Late-night snacking, skipping workouts, not knowing what to eat.</p>
        </div>
      </div>
      
      <button className="w-full max-w-md bg-[#23B5D3] text-white py-2 rounded-md font-semibold hover:bg-[#1b9bb6] transition mt-6">
        CONTINUE
      </button>
    </div>
  );
}

export default TheGoal;