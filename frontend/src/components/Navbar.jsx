import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoListOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { path: "/", label: "Home", icon: <IoHomeOutline /> },
    { path: "/register", label: "Register", icon: <IoPersonAddOutline /> },
    { path: "/admin", label: "Dashboard", icon: <IoListOutline /> },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container container">
        <Link to="/" className="navbar__brand">
          <div className="navbar__logo-icon">
            <IoCalendarOutline />
          </div>
          <span className="navbar__logo-text">
            Event<span className="navbar__logo-accent">Hub</span>
          </span>
        </Link>

        <div className={`navbar__links ${mobileOpen ? "navbar__links--open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link ${
                location.pathname === link.path ? "navbar__link--active" : ""
              }`}
            >
              <span className="navbar__link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/register" className="navbar__cta btn btn-primary btn-sm">
          Register Now
        </Link>

        <button
          className="navbar__toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
