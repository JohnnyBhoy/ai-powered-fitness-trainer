import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type CarouselItem = {
  label: string;
  title: string;
  description: string;
};

type CarouselSlide = {
  title: string;
  items: CarouselItem[];
};

const carouselData: CarouselSlide[] = [
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
  const totalSlides = carouselData.length;
  const [currentIndex, setCurrentIndex] = useState(1); 
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);


  const slides = [carouselData[totalSlides - 1], ...carouselData, carouselData[0]];


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTransitionEnd = () => {
      if (currentIndex === 0) {
  
        setIsTransitioning(false);
        setCurrentIndex(totalSlides);
      } else if (currentIndex === totalSlides + 1) {
 
        setIsTransitioning(false);
        setCurrentIndex(1);
      }
    };

    container.addEventListener('transitionend', handleTransitionEnd);
    return () => container.removeEventListener('transitionend', handleTransitionEnd);
  }, [currentIndex, totalSlides]);

  // Re-enable transition after jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);



  const goToNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const goToPrev = () => {
    setCurrentIndex(prev => prev - 1);
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - go to next slide
      goToNext();
    } else if (touchEnd - touchStart > 50) {
      // Swipe right - go to previous slide
      goToPrev();
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto bg-gray-100 rounded-lg py-10 overflow-hidden">
      {/* Slide Container */}
      <div
        ref={containerRef}
        className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((carouselItem, carouselIndex) => (
          <div key={carouselIndex} className="min-w-full px-20 sm:px-10 md:px-20 lg:px-40">
            <h2 className="text-lg font-semibold text-center font-monserrat text-[#23B5D3] mb-2">PHILOSOPHY</h2>
            <h2 className="text-2xl font-bold text-center font-alfarn mb-4 pb-5">{carouselItem.title}</h2>
            <div className="space-y-6">
              {carouselItem.items.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center">
                  <div className="flex flex-col items-center relative">
                    <div className="w-14 h-14 bg-black text-white flex items-center justify-center rounded-full font-bold z-10">{item.label}</div>
                    {/* Hide connecting lines on mobile */}
                    {idx < carouselItem.items.length - 1 && (
                      <div className="absolute top-full left-1/2 w-1 h-12 bg-black transform -translate-x-1/2 sm:block hidden"></div>
                    )}
                  </div>
                  <div className="pl-5 pt-2 sm:pl-10 sm:pt-0 text-center sm:text-left">
                    <span className="text-[#23B5D3] text-lg font-semibold">{item.title}</span>
                    <p className="text-gray-700 text-md sm:text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    
      {/* Prev and Next Buttons */}
      <div className="absolute inset-y-0 flex items-center justify-between w-full z-10 px-5 sm:px-10">
        <button 
          onClick={goToPrev} 
          className="text-gray-700 hover:text-blue-500 transition-all duration-300"
          aria-label="Previous slide"
        >
          <FontAwesomeIcon icon={faChevronLeft} size="3x" />
        </button>
        <button 
          onClick={goToNext} 
          className="text-gray-700 hover:text-blue-500 transition-all duration-300"
          aria-label="Next slide"
        >
          <FontAwesomeIcon icon={faChevronRight} size="3x" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {carouselData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx + 1)}
            className={`w-3 h-3 rounded-full ${currentIndex === idx + 1 ? 'bg-[#23B5D3]' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;