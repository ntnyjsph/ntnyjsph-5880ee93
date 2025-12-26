import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Enterprise Workflow Automation",
    category: "Power Apps + SQL",
    description: "Automated a multi-department approval process, reducing processing time by 70%.",
    size: "large",
  },
  {
    title: "Data Pipeline Integration",
    category: "Google AppScript",
    description: "Built a real-time data sync between CRM and spreadsheets.",
    size: "medium",
  },
  {
    title: "Content Publishing System",
    category: "Content Automation",
    description: "Automated content scheduling across multiple platforms.",
    size: "medium",
  },
  {
    title: "Financial Reporting Dashboard",
    category: "Excel Automation",
    description: "Created dynamic reports with automated data refresh.",
    size: "large",
  },
];

const Projects = () => {
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
      id="work"
      ref={sectionRef}
      className="py-32 px-6 md:px-12 lg:px-24 border-t border-border"
    >
      <div className="max-w-5xl">
        <span 
          className={`text-muted-foreground font-body text-sm tracking-widest uppercase mb-8 block transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Selected Work
        </span>
        
        <h2 
          className={`font-heading text-4xl md:text-5xl leading-tight mb-16 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Projects that{" "}
          <span className="italic">deliver results</span>
        </h2>

        {/* Bento Grid for Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`${
                project.size === "large" ? "md:col-span-2" : "col-span-1"
              } group relative bg-card border border-border rounded-lg p-8 md:p-10 hover-lift cursor-pointer transition-all duration-700 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <span className="font-body text-xs tracking-widest text-muted-foreground uppercase mb-3 block">
                    {project.category}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border group-hover:border-foreground group-hover:bg-foreground transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:text-background transition-colors duration-300" />
                </div>
              </div>
              
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
