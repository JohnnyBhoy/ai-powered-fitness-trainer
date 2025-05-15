<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>GoPeakFit</title>
    @vite(['resources/js/app.tsx'])
</head>

<body class="bg-gray-100 text-gray-900">
    <form action="{{ route('session') }}" method="POST">
        @csrf
        <div class="flex flex-col items-center px-4 bg-white text-black text-center py-10">
            <h1 class="text-xl font-semibold mt-2 text-[#23B5D3]">JOIN GOPEAKFIT TODAY</h1>
            <h2 class="text-2xl md:text-4xl font-bold mt-2 text-gray-800 max-w-4xl font-alfarn">
                Start now & Stay Accountable Eat more. Achieve More.
            </h2>
            <p class="max-w-3xl text-xs md:text-sm py-2 text-gray-600">
                For just $1, you’re getting 5 days of structure, accountability, and real results. No guesswork, no gimmicks—just a
                proven plan to jumpstart your transformation.
            </p>

            <div class="mt-10 flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-2 w-full max-w-6xl pb-10">

                <!-- Right Side - Form Section -->
                <div class="w-full lg:w-1/2 bg-slate-50 px-10 py-10 rounded-xl shadow-md text-left order-1 lg:order-2">
                    <div class="relative p-4 mt-6">
                        <h4 class="text-lg font-semibold mb-5">Summary</h4>
                        <div class="flex justify-between text-sm mb-1">
                            <span>{{ request(key: 'amount') == '1' ? '5-Day Challenge' : 'GoPeakFit 1-on-1 Coaching'}}</span>
                            <span>${{ request(key:'amount') }}.00 USD</span>
                        </div>
                        <hr class="my-2 border-gray-500" />
                        <div class="flex justify-between text-sm font-semibold">
                            <span>Total</span>
                            <span>${{ request(key:'amount') }}.00 USD</span>
                        </div>
                    </div>

                    <input type="text" value={{ request()->get('id') }} name="user_id" id="user_id" hidden />
                    <input type="number" value={{ request()->get('amount') }} name="amount" id="amount" hidden />

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        class="w-full bg-[#23B5D3] text-white py-2 font-alfarn rounded-md font-semibold hover:bg-[#1b9bb6] transition">
                        {{ request(key: 'amount') == '1' ? 'Start 5-day challenge for $1' : 'Personalized 1-on-1 coaching for just $49/month.' }}
                    </button>


                    <div class="mt-4">
                        <h3 class="text-xs font-semibold">RECURRING BILLING & TRIALS</h3>
                        <p class="text-[8px] mt-1">
                            All subscriptions automatically renew unless canceled at least 24 hours before the current period ends. You need to manage your subscription on the platform where you signed up.
                        </p>
                    </div>
                    <div class="mt-2">
                        <h3 class="text-xs font-semibold">CANCEL ANYTIME</h3>
                        <p class="text-[8px] mt-1">
                            The 5-Day Challenge trial is for new customers and can only be redeemed once. After the challenge, the monthly subscription will begin unless canceled 24 hours before the end of the trial.
                        </p>
                    </div>
                </div>

                <!-- Left Side - Checklist -->
                <div class="relative w-full lg:w-1/2 flex flex-col order-2 lg:order-1 mb-2">
                    <h1 class="text-2xl font-semibold mt-2 text-[#23B5D3] text-left pb-5">
                        HOW IT WORKS
                    </h1>

                    @if(request('amount') == 1)
                    <ul class="list-none list-inside text-md text-left max-w-lg space-y-6 text-justify">
                        <li><span class="text-[#23B5D3] font-bold mr-2">✓</span>Today is Day 1 – You start strong with your customized plan</li>
                        <li><span class="text-[#23B5D3] font-bold mr-2">✓</span>On Day 6, you’ll be automatically enrolled in the full program for $49/month (less than $2 a day).</li>
                        <li><span class="text-[#23B5D3] font-bold mr-2">✓</span>Day 6, your real transformation begins. With continued accountability, guidance, and progress tracking, you’ll have everything you need to turn these 5 days into lifelong success.</li>
                        <li><span class="text-[#23B5D3] font-bold mr-2">✓</span>No Risk. Cancel Anytime. If you decide the program isn’t for you, simply cancel before the end of your 5-day challenge, and you won’t be charged. No stress, no questions, no hassle.</li>
                        <li><span class="text-[#23B5D3] font-bold mr-2">✓</span>You can do anything for 5 days. Prove it to yourself.</li>
                        <li><span class="text-[#23B5D3] font-bold mr-2">✓</span>Sign Up Now for Just $1 & Get Started Today!</li>
                    </ul>
                    @else
                    <ul class="list-none list-inside text-md text-left max-w-lg space-y-6 text-justify">
                        <li><span class="text-[#23B5D3] font-bold mr-2">✓</span>1-on-1 SMS coaching with a real human fitness expert</li>
                        <li><span class="text-[#23B5D3] font-bold mr-2">✓</span>Custom weekly workout and diet plans tailored to your goals</li>
                        <li><span class="text-[#23B5D3] font-bold mr-2">✓</span>Daily accountability, motivation, and expert guidance</li>
                        <li><span class="text-[#23B5D3] font-bold mr-2">✓</span>Progress tracking and plan adjustments every week</li>
                        <li><span class="text-[#23B5D3] font-bold mr-2">✓</span>Unlimited access to support via text</li>
                        <li><span class="text-[#23B5D3] font-bold mr-2">✓</span>Just $49/month – cancel anytime</li>
                    </ul>
                    @endif


                    <img
                        src="{{ asset('images/hardtruthstar.png') }}"
                        alt="Rating pics"
                        class="rounded-xl h-16 absolute bottom-[-80px] right-[-50px] transform -translate-x-1/2" />
                </div>

            </div>
        </div>

    </form>
</body>

</html>