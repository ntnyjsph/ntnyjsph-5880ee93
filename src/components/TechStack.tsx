import { useEffect, useRef, useState } from "react";
import { 
  Database, 
  Code2, 
  FileSpreadsheet, 
  Workflow, 
  Sparkles, 
  Zap,
  Layers,
  BarChart3,
  PieChart,
  Cog,
  Bot
} from "lucide-react";

const technologies = [
  {
    name: "Power Apps",
    description: "Building low-code business applications",
    icon: Layers,
    size: "large",
  },
  {
    name: "SQL",
    description: "Database design & optimization",
    icon: Database,
    size: "medium",
  },
  {
    name: "Google AppScript",
    description: "Custom G-Suite integrations",
    icon: Code2,
    size: "medium",
  },
  {
    name: "JavaScript",
    description: "Dynamic web solutions",
    icon: Sparkles,
    size: "small",
  },
  {
    name: "Excel & Sheets",
    description: "Advanced formulas & automation",
    icon: FileSpreadsheet,
    size: "large",
  },
  {
    name: "Workflow Automation",
    description: "End-to-end process automation",
    icon: Workflow,
    size: "medium",
  },
  {
    name: "Content Automation",
    description: "Automated content pipelines",
    icon: Zap,
    size: "small",
  },
  {
    name: "Power BI",
    description: "Business intelligence & data visualization",
    icon: BarChart3,
    size: "medium",
  },
  {
    name: "Tableau",
    description: "Interactive data dashboards",
    icon: PieChart,
    size: "medium",
  },
  {
    name: "Make",
    description: "Visual workflow automation platform",
    icon: Cog,
    size: "small",
  },
  {
    name: "UiPath",
    description: "Enterprise RPA solutions",
    icon: Bot,
    size: "large",
  },
];

const TechStack = () => {
  const [isVisible, setIsVisible] = useState(false);
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
      id="skills"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24 border-t border-border"
    >
      <div className="w-full">
        <span 
          className={`text-muted-foreground font-body text-sm tracking-widest uppercase mb-6 md:mb-8 block transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Tech Stack
        </span>
        
        <h2 
          className={`font-heading text-3xl sm:text-4xl md:text-5xl leading-tight mb-10 md:mb-16 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Tools I work with
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[180px]">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            const gridClass = 
              tech.size === "large" 
                ? "col-span-2 row-span-1" 
                : tech.size === "medium" 
                ? "col-span-1 row-span-1" 
                : "col-span-1 row-span-1";

            return (
              <div
                key={tech.name}
                className={`${gridClass} group relative bg-card border border-border rounded-lg p-4 md:p-6 hover-lift cursor-default transition-all duration-700 ${
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${150 + index * 75}ms` }}
              >
                <div className="h-full flex flex-col justify-between">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  <div>
                    <h3 className="font-heading text-base sm:text-lg md:text-xl mb-0.5 md:mb-1">
                      {tech.name}
                    </h3>
                    <p className="font-body text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {tech.description}
                    </p>
                  </div>
                </div>
                
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
