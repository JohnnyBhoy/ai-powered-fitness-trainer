import { useState } from "react";
import { faChevronDown,faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const steps = [
    {
        id: 1,
        title: "We Learn About You",
        content: [
            "Your goals, struggles, and lifestyle matter.",
            "Before we build your plan, we take the time to understand what’s been holding you back—and what it will take to push you forward.",
        ],
    },
    {
        id: 2,
        title: "We Build Your Custom Plan",
        content: [
            "Nutrition that fits your body, preferences, and lifestyle - we match you with the right plan for real results.",
            "Fitness that matches your level and goals—whether you're starting fresh or leveling up.",
            "Wellness strategies to keep you mentally healthy, focused, and fully dialed in.",
        ],
    },
    {
        id: 3,
        title: "We Hold You Accountable",
        content: [
            "Daily check-ins, real-time adjustments, and no room for excuses.",
            "We keep you on track, even when motivation fades.",
            "You’re not doing this alone—we are at your side, pushing you through.",
        ],
    },
];

function HowItWorks() {
    const [openStep, setOpenStep] = useState(1);
    const toggleStep = (id:number) => {
        setOpenStep(openStep === id ? 0 : id);
    };

    return (
        <>
            <div id="how-it-works" className="flex flex-col items-center px-4 bg-white text-black text-center pb-10 bg-[#f5f5f5]">
                <h4 className="text-lg font-bold text-[#23B5D3] uppercase text-center w-full max-w-lg">
                    How It Works
                </h4>
                <h2 className="text-2xl font-extrabold mt-2 text-gray-800 max-w-sm text-center">
                    ACCOUNTABILITY THAT DRIVES RESULT
                </h2>
                <a
                    href="/register"
                    className="mt-4 bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition inline-block text-center"
                >
                Start Your $1 Trial Now
                </a>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-15 max-w-6xl w-full pt-10">

                    <div className="text-left max-w-md mx-auto">
                        {steps.map((step) => (
                           <div key={step.id} className="border-b border-gray-300 py-4">
                                <button
                                    className="flex justify-between items-center w-full font-bold text-gray-800"
                                    onClick={() => toggleStep(step.id)}
                                >
                                    <span className="text-sm flex items-center">
                                        <span className="bg-[#23B5D3] text-white px-2 py-1 text-sm font-bold mr-2 rounded">
                                            STEP {step.id}
                                        </span>
                                        {step.title}
                                    </span>
                                    <span>{openStep === step.id ?   <FontAwesomeIcon icon={faChevronUp} size="lg" /> :   <FontAwesomeIcon icon={faChevronDown} size="lg" />}</span>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openStep === step.id ? "max-h-40" : "max-h-0"}`}>
                                    <ul className="text-gray-600 mt-2 text-sm min-h-[60px] list-none space-y-2">
                                        {step.content.map((point, index) => (
                                            <li key={index} className="flex items-start">
                                                {(step.id === 2 || step.id === 3) ? (
                                                    <span className="text-[#23B5D3] font-bold mr-2">✓</span>
                                                ) : null}
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex justify-center items-center ">
                        <img
                            src="/images/how-it-works.png"
                            alt="How It Works"
                            className="w-full max-w-3xl"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HowItWorks;