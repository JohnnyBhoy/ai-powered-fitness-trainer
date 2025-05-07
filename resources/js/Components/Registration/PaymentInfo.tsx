import { loadStripe } from '@stripe/stripe-js';

function PaymentInfo({ onComplete }: { onComplete: () => void }) {
  const stripePromise = loadStripe(import.meta.env.STRIPE_KEY);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
  
    const response = await fetch('/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document?.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify({}),
    });
  
    const session = await response.json();
  
    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 bg-white text-black text-center py-10">
      <h1 className="text-xl font-semibold mt-2 text-[#23B5D3]">JOIN GOPEAKFIT TODAY</h1>
      <h2 className="text-2xl md:text-4xl font-bold mt-2 text-gray-800 max-w-4xl font-alfarn">
        Start now & Stay Accountable Eat more. Achieve More.
      </h2>
      <p className="max-w-3xl text-xs md:text-sm py-2 text-gray-600">
        For just $1, you’re getting 5 days of structure, accountability, and real results. No guesswork, no gimmicks—just a
        proven plan to jumpstart your transformation.
      </p>

      <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-2 w-full max-w-6xl pb-10">
        {/* Right Side - Form Section (appears first on mobile) */}
        <div className="w-full lg:w-1/2 bg-slate-50 px-10 py-10 rounded-xl shadow-md text-left order-1 lg:order-2">
          <form className="space-y-4">
              <div className="relative p-4 mt-6">
                  <h4 className="text-lg font-semibold mb-5">Summary</h4>
                  <div className="flex justify-between text-sm mb-1">
                      <span>5-Day Challenge</span>
                      <span>$1.00 USD</span>
                  </div>
                  <hr className="my-2 border-gray-500" />
                  <div className="flex justify-between text-sm font-semibold">
                      <span>Total</span>
                      <span>$1.00 USD</span>
                  </div>
              </div>
              {/* Submit Button */}
              <a href="checkout">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full bg-[#23B5D3] text-white py-2 font-alfarn text-white rounded-md font-semibold hover:bg-[#1b9bb6] transition"
                >
                    Start 5-day challenge for $1
                </button>
              </a>
                    
            
              <div className="mt-4">
                  <h3 className="text-xs font-semibold">RECURRING BILLING & TRIALS</h3>
                  <p className="text-[8px] mt-1">
                      All subscriptions automatically renew unless canceled at least 24 hours before the current period ends. You need to manage your subscription on the platform where you signed up.
                  </p>
              </div>
              <div className="mt-2">
                  <h3 className="text-xs font-semibold">CANCEL ANYTIME</h3>
                  <p className="text-[8px] mt-1">
                      The 5-Day Challenge trial is for new customers and can only be redeemed once. After the challenge, the monthly subscription will begin unless canceled 24 hours before the end of the trial.
                  </p>
              </div>
          </form>
        </div>

        {/* Left Side - checklist*/}
        <div className="relative w-full lg:w-1/2 flex flex-col  order-2 lg:order-1 mb-2">

            <h1 className="text-2xl font-semibold mt-2 text-[#23B5D3] text-left pb-5">
             HOW IT WORKS
            </h1>
        
            <ul className="list-none list-inside text-md text-left max-w-lg space-y-6 text-justify">
              <li><span className="text-[#23B5D3] font-bold mr-2">✓</span>
                Today is Day 1 – You start strong with your customized plan
              </li>
              <li><span className="text-[#23B5D3] font-bold mr-2">✓</span>
                On Day 6, you’ll be automatically enrolled in the full program
                for $49/month (less than $2 a day).
              </li>
              <li><span className="text-[#23B5D3] font-bold mr-2">✓</span>
                Day 6, your real transformation begins. With continued
                accountability, guidance, and progress tracking, you’ll have
                everything you need to turn these 5 days into lifelong
                success.
              </li>

              <li><span className="text-[#23B5D3] font-bold mr-2">✓</span>
                No Risk. Cancel Anytime. If you decide the program isn’t for
                you, simply cancel before the end of your 5-day challenge,
                and you won’t be charged. No stress, no questions, no hassle.
              </li>

              <li><span className="text-[#23B5D3] font-bold mr-2">✓</span>
                You can do anything for 5 days. Prove it to yourself.
              </li>

              <li><span className="text-[#23B5D3] font-bold mr-2">✓</span>
                Sign Up Now for Just $1 & Get Started Today!
              </li>
            </ul>

            <img 
                src="/images/hardtruthstar.png" 
                alt="Rating Image" 
                className="rounded-xl h-16 absolute bottom-[-80px] right-[-50px] transform -translate-x-1/2"
            />

        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
