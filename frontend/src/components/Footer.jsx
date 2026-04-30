import { IoHeart } from "react-icons/io5";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__content">
          <p className="footer__text">
            © {new Date().getFullYear()} EventHub — Online Event Registration System
          </p>
          <p className="footer__built">
            Built with <IoHeart className="footer__heart" /> using MERN Stack
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
