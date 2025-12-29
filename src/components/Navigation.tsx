import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "About", target: "about" },
  { name: "Skills", target: "skills" },
  { name: "Work", target: "work" },
  { name: "Contact", target: "contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (target: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 xl:px-24 py-4 md:py-6 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <a
            href="#"
            className="font-heading text-lg md:text-xl tracking-tight transition-opacity opacity-80"
          >
            Antony's Portfolio
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <ul className="flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.target)}
                    className="font-body text-sm tracking-wide text-muted-foreground hover:text-foreground link-underline transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.target)}
              className={`font-heading text-3xl tracking-tight transition-all duration-500 ${
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {item.name}
            </button>
          ))}
          <div
            className={`transition-all duration-500 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${navItems.length * 75}ms` }}
          >
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
