import { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24 border-t border-border"
    >
      <div className="w-full">
        <span 
          className={`text-muted-foreground font-body text-sm tracking-widest uppercase mb-6 md:mb-8 block transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          About
        </span>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          <div 
            className={`transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 md:mb-6">
              Transforming complex processes into{" "}
              <span className="italic">elegant solutions</span>
            </h2>
          </div>
          
          <div 
            className={`space-y-4 md:space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-body text-muted-foreground leading-relaxed text-sm md:text-base">
              With a passion for efficiency and a deep understanding of modern automation tools, 
              I help organizations break free from manual workflows that drain time and resources.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed text-sm md:text-base">
              My approach combines technical expertise with strategic thinking—ensuring every 
              automation I build not only works flawlessly but also aligns with your broader 
              business objectives.
            </p>
            <p className="font-body leading-relaxed text-sm md:text-base">
              From Power Apps to custom scripts, I craft solutions that scale with your ambitions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
