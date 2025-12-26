import { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const socialLinks = [
  { name: "Email", icon: Mail, href: "mailto:hello@example.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "GitHub", icon: Github, href: "https://github.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
];

const Contact = () => {
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
    <footer
      id="contact"
      ref={sectionRef}
      className="py-32 px-6 md:px-12 lg:px-24 border-t border-border"
    >
      <div className="max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20">
          <div 
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-muted-foreground font-body text-sm tracking-widest uppercase mb-8 block">
              Get in Touch
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Let's build
              <br />
              <span className="italic">something great</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed max-w-md">
              Have a project in mind? I'd love to hear about it. 
              Let's discuss how automation can transform your workflows.
            </p>
          </div>
          
          <div 
            className={`flex flex-col justify-end transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex gap-6">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 rounded-full border border-border hover:border-foreground hover:bg-foreground transition-all duration-300"
                    style={{ transitionDelay: `${index * 50}ms` }}
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5 group-hover:text-background transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div 
          className={`mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-body text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="font-body text-sm text-muted-foreground">
            Built with precision & purpose.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
