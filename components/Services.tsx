'use client';

import { useState, useEffect, useRef } from 'react';

const services = [
  { title: 'Video Editing', description: 'Cinematic cuts, seamless transitions, and professional color grading that transform raw footage into compelling visual narratives.' },
  { title: 'Motion Graphics', description: 'Dynamic animations, visual effects, and kinetic typography that bring static ideas to life with movement and energy.' },
  { title: 'Videography', description: 'Professional video shooting for brands, events, and content creators with attention to lighting and composition.' },
  { title: 'Creative Direction', description: 'End-to-end visual strategy, concept development, and artistic oversight to ensure cohesive brand storytelling.' },
];

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="relative py-32"
    >
      <div className="container-custom">
        {/* Label */}
        <span className={`inline-flex items-center gap-3 text-sm font-medium text-secondary/40 tracking-[0.2em] uppercase mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="w-8 h-px bg-accent" />
          What I Do
        </span>

        {/* Two Column Layout */}
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Left - Service Titles */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`block text-left text-3xl md:text-4xl lg:text-5xl font-display font-bold transition-all duration-300 ${
                  activeIndex === index 
                    ? 'text-accent' 
                    : 'text-secondary/30 hover:text-secondary/60'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Right - Active Description */}
          <div className="flex items-center">
            <div className="relative">
              <p className="text-xl md:text-2xl text-secondary/70 leading-relaxed">
                {services[activeIndex].description}
              </p>
              <div className="mt-8 flex items-center gap-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeIndex === index 
                        ? 'w-8 bg-accent' 
                        : 'w-2 bg-secondary/20 hover:bg-secondary/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
