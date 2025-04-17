import { useState, useEffect } from 'react';
import { TESTIMONIALS } from '@/lib/constants';

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? TESTIMONIALS.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleDotClick = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <i key={i} className={`fas fa-star ${i < rating ? 'text-[#D4AF37]' : 'text-gray-300'}`}></i>
    ));
  };

  return (
    <div className="testimonial-slider relative">
      <div className="overflow-hidden">
        <div 
          className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="bg-[#F9F9F9] p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="text-[#D4AF37]">
                {renderStars(TESTIMONIALS[currentIndex].rating)}
              </div>
              <span className="ml-2 text-gray-600">{TESTIMONIALS[currentIndex].rating}.0</span>
            </div>
            <p className="text-gray-700 italic mb-6">
              "{TESTIMONIALS[currentIndex].content}"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-300">
                <img 
                  src={TESTIMONIALS[currentIndex].image} 
                  alt={TESTIMONIALS[currentIndex].author} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-primary">{TESTIMONIALS[currentIndex].author}</h4>
                <p className="text-gray-600 text-sm">{TESTIMONIALS[currentIndex].location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button 
        onClick={handlePrev}
        className="prev-testimonial absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center focus:outline-none"
        aria-label="Previous testimonial"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button 
        onClick={handleNext}
        className="next-testimonial absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center focus:outline-none"
        aria-label="Next testimonial"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      
      {/* Dots */}
      <div className="flex justify-center mt-8 testimonial-dots">
        {TESTIMONIALS.map((_, index) => (
          <button 
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${
              index === currentIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
