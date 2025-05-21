import { Link } from "@inertiajs/react";

const Challenge = () => {
    return (
      <div className="bg-gray-900 text-white py-16 px-4 text-center">
        <h5 className="text-[#23B5D3] uppercase text-lg font-semibold">5-Day <span>Challenge</span></h5>
        <h2 className="text-3xl font-extrabold mt-2 mb-4 font-alfarn">
          5 Days to a Stronger, Healthier You
        </h2>
        <p className="max-w-4xl mx-auto text-gray-300 mb-6 text-md">
          For the next 5 days, you’re about to prove to yourself what’s possible. This isn’t forever—it’s just 5 days.
          You won’t die. You won’t starve. But you WILL see results. Most people spend months, even years, spinning their
          wheels. Not you. You’re going to drop weight—fast. Even if it’s just water, it’s a win that builds momentum.
        </p>
  
        <h3 className="text-lg font-semibold mb-4">The Rules (No Negotiations, No Shortcuts)</h3>
  
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left mb-8">
          <div>
            <h4 className="text-[#23B5D3] font-bold text-md">Protein? High.</h4>
            <ul className="list-none list-inside text-md">
              <li> <span className="text-[#23B5D3] font-bold mr-2">✓</span>Meat, eggs, fish—every meal.</li>
              <li> <span className="text-[#23B5D3] font-bold mr-2">✓</span>Keeps you full, fuels fat burning, and prevents muscle loss.</li>
              <li> <span className="text-[#23B5D3] font-bold mr-2">✓</span>Eat 1g of protein per pound of goal weight.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#23B5D3] font-bold text-md">Fats and Sugars? Only the Good Stuff.</h4>
            <ul className="list-none list-inside text-md">
              <li>  <span className="text-[#23B5D3] font-bold mr-2">✓</span>Avocado, olive oil, eggs, and small amounts of cheese.</li>
              <li>  <span className="text-[#23B5D3] font-bold mr-2">✓</span>No junk oils, no processed fats or sugars.</li>
              <li>  <span className="text-[#23B5D3] font-bold mr-2">✓</span>Limited fresh fruit.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#23B5D3] font-bold text-md">Water? A Lot.</h4>
            <ul className="list-none list-inside text-md">
              <li>   <span className="text-[#23B5D3] font-bold mr-2">✓</span>At least 100 oz per day.</li>
              <li>   <span className="text-[#23B5D3] font-bold mr-2">✓</span>No sugary drinks, no alcohol. Black coffee & tea are fine.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#23B5D3] font-bold text-lg">Workouts? Move Every Day.</h4>
            <ul className="list-none list-inside">
              <li>  <span className="text-[#23B5D3] font-bold mr-2">✓</span>Walk, lift, or sweat daily.</li>
              <li>   <span className="text-[#23B5D3] font-bold mr-2">✓</span>At least 20 minutes—non-negotiable.</li>
            </ul>
          </div>
        </div>
  
        <Link
          href="/register"
          className="mt-6 sm:mt-8 bg-[#23B5D3] hover:bg-[#23B5E3] text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold py-2 sm:py-3 px-5 sm:px-5 rounded-full shadow-md w-full sm:w-auto text-center block sm:inline-block"
        >
          Start Your 5-Day Challenge for $1 Now
        </Link>

      </div>
    );
  };
  
  export default Challenge;