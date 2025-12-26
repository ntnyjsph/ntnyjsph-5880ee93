import { useState, useEffect } from "react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-6 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl flex items-center justify-between">
        <a 
          href="#" 
          className="font-heading text-xl tracking-tight hover:opacity-70 transition-opacity"
        >
          Portfolio
        </a>
        
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="font-body text-sm tracking-wide text-muted-foreground hover:text-foreground link-underline transition-colors duration-300"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button 
          className="md:hidden font-body text-sm tracking-wide"
          aria-label="Menu"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
