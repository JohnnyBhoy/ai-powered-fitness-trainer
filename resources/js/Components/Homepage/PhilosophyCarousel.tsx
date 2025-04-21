import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const carouselData = [
  {
    title: "Food Philosophy – F.I.R.M.",
    items: [
      { label: "F", title: "Flexibility", description: "Follow the 80/20 rule to maintain long-term adherence and avoid strict restrictions." },
      { label: "I", title: "Intentional Carbs", description: "Choose complex carbs over refined sugars to fuel your body properly." },
      { label: "R", title: "Real Food First", description: "Focus on whole, nutrient-dense foods as the foundation of your diet." },
      { label: "M", title: "Max Protein", description: "Prioritize 1g of protein per pound of your goal body weight to support muscle growth and recovery." }
    ]
  },
  {
    title: "Fitness Philosophy – S.T.R.I.D.E.",
    items: [
      { label: "S", title: "Strength Training", description: "Incorporate strength training at least 3 times a week to build muscle and improve metabolism." },
      { label: "T", title: "Target Movement Daily", description: "Aim for 10,000 steps each day to keep your body active and energized." },
      { label: "R", title: "Routine Consistency", description: "Stick to a consistent workout routine for long-term progress and injury prevention." },
      { label: "I", title: "Increase Intensity Gradually", description: "Progress your workouts in a sustainable way, focusing on incremental improvements." },
      { label: "D", title: "Dynamic Recovery", description: "Prioritize active recovery, stretching, and rest to help your muscles repair and grow stronger." },
      { label: "E", title: "Endurance Building", description: "Incorporate cardio and endurance exercises to improve heart health and stamina." }
    ]
  },
  {
    title: "Wellness Philosophy – S.L.E.E.P.",
    items: [
      { label: "S", title: "Sleep Well", description: "Aim for 7-9 hours of quality sleep to allow your body to recover and perform optimally." },
      { label: "L", title: "Limit Stress", description: "Practice mindfulness, relaxation, or meditation techniques to keep stress in check." },
      { label: "E", title: "Emotional Health", description: "Focus on mental well-being and cultivate a positive mindset to support overall health." },
      { label: "E", title: "Engage in Self-Care", description: "Take time for yourself regularly, whether it's through hobbies, rest, or social connections." },
      { label: "P", title: "Positive Environment", description: "Surround yourself with a supportive, motivating environment to stay on track with your goals." }
    ]
  }
];

const Carousel = () => {
  const [index, setIndex] = useState(1); // Start from 1 because of the fake first slide
  const [isTransitioning, setIsTransitioning] = useState(true);
  const transitionRef = useRef(null);

  const totalSlides = carouselData.length;
  const slides = [carouselData[totalSlides - 1], ...carouselData, carouselData[0]];

  const nextSlide = () => {
    if (index >= totalSlides) {
      setIsTransitioning(true);
      setIndex(index + 1);
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(1);
      }, 500); 
    } else {
      setIsTransitioning(true);
      setIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (index <= 0) {
      setIndex(index - 1);
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(totalSlides);
      }, 500); 
    } else {
      setIsTransitioning(true);
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-gray-100 rounded-lg py-10 overflow-hidden">
      {/* Slide Container */}
      <div
        className={`flex transition-transform duration-500 ease-in-out ${!isTransitioning ? "transition-none" : ""}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
        ref={transitionRef}
      >
        {slides.map((carouselItem, carouselIndex) => (
          <div key={carouselIndex} className="min-w-full px-40">
            <h2 className="text-lg font-semibold text-center font-monserrat text-[#23B5D3] mb-2">PHILOSOPHY</h2>
            <h2 className="text-2xl font-bold text-center font-alfarn mb-4 pb-5">{carouselItem.title}</h2>
            <div className="space-y-6">
              {carouselItem.items.map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex flex-col items-center relative">
                    <div className="w-11 h-11 bg-black text-white flex items-center justify-center rounded-full font-bold z-10">{item.label}</div>
                    {idx < carouselItem.items.length - 1 && (
                      <div className="absolute top-full left-1/2 w-1 h-10 bg-black transform -translate-x-1/2"></div>
                    )}
                  </div>
                  <div className="pl-5 pt-2">
                    <span className="text-[#23B5D3] text-lg font-semibold">{item.title}</span>
                    <p className="text-gray-700 text-xs">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Prev and Next Buttons */}
      <div className="absolute inset-y-0 flex items-center justify-between w-full z-10 px-10">
        <button onClick={prevSlide} className="text-gray-700 hover:text-blue-500 transition-all duration-300">
          <FontAwesomeIcon icon={faChevronLeft} size="3x" />
        </button>
        <button onClick={nextSlide} className="text-gray-700 hover:text-blue-500 transition-all duration-300">
          <FontAwesomeIcon icon={faChevronRight} size="3x" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
