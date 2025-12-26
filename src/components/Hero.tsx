import { ArrowDown } from "lucide-react";
const Hero = () => {
  return <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 lg:px-[10px] py-[20px] text-sm font-normal font-sans">
      <div className="max-w-5xl">
        <p className="text-muted-foreground font-body text-sm tracking-widest normal-case mb-6 animate-fade-up">​Hi there, I'm Antony       </p>
        
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8 animate-fade-up-delay-1">
          Building intelligent
          <br />
          <span className="italic">automation systems</span>
          <br />
          that work.
        </h1>
        
        <p className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-12 animate-fade-up-delay-2">
          I design and develop workflow automations that streamline operations, 
          eliminate repetitive tasks, and unlock efficiency for businesses ready to scale.
        </p>
        
        <a href="#about" className="inline-flex items-center gap-3 text-sm font-body tracking-wide group animate-fade-up-delay-3">
          <span className="link-underline">Explore my work</span>
          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </section>;
};
export default Hero;