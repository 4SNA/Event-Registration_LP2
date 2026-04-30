import { Link } from "react-router-dom";
import {
  IoCalendarOutline,
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoGlobeOutline,
  IoPeopleOutline,
  IoArrowForward,
  IoCheckmarkCircle,
} from "react-icons/io5";
import "./HomePage.css";

const events = [
  {
    name: "Tech Conference 2026",
    date: "June 15-17, 2026",
    description: "Explore cutting-edge technologies with industry leaders and innovators.",
    icon: <IoRocketOutline />,
    color: "#6366f1",
    spots: 250,
  },
  {
    name: "AI & ML Workshop",
    date: "July 8-10, 2026",
    description: "Hands-on workshop covering deep learning, NLP, and generative AI.",
    icon: <IoGlobeOutline />,
    color: "#8b5cf6",
    spots: 100,
  },
  {
    name: "Web Development Bootcamp",
    date: "August 1-5, 2026",
    description: "5-day intensive bootcamp on modern full-stack development.",
    icon: <IoCalendarOutline />,
    color: "#a855f7",
    spots: 150,
  },
  {
    name: "Cloud Computing Summit",
    date: "September 20-21, 2026",
    description: "Master AWS, Azure, and GCP cloud architectures and deployments.",
    icon: <IoShieldCheckmarkOutline />,
    color: "#10b981",
    spots: 200,
  },
  {
    name: "Cybersecurity Seminar",
    date: "October 12, 2026",
    description: "One-day deep dive into ethical hacking and security best practices.",
    icon: <IoShieldCheckmarkOutline />,
    color: "#06b6d4",
    spots: 120,
  },
];

const features = [
  {
    icon: <IoCheckmarkCircle />,
    title: "Instant Registration",
    desc: "Quick and seamless event sign-up with real-time confirmation.",
  },
  {
    icon: <IoShieldCheckmarkOutline />,
    title: "Cloud-Hosted Data",
    desc: "All registrations securely stored on MongoDB Atlas cloud database.",
  },
  {
    icon: <IoPeopleOutline />,
    title: "Admin Dashboard",
    desc: "Full visibility into registrations with analytics and management tools.",
  },
];

const HomePage = () => {
  return (
    <div className="home">
      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero__bg-orbs">
          <div className="hero__orb hero__orb--1"></div>
          <div className="hero__orb hero__orb--2"></div>
          <div className="hero__orb hero__orb--3"></div>
        </div>

        <div className="hero__container container">
          <div className="hero__badge animate-fade-in-up">
            <IoRocketOutline />
            <span>Online Event Registration Platform</span>
          </div>

          <h1 className="hero__title animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Register for
            <br />
            <span className="hero__title-gradient">Amazing Events</span>
          </h1>

          <p className="hero__subtitle animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Discover, register, and participate in world-class tech events.
            <br />
            Your details are securely stored in our cloud-hosted database.
          </p>

          <div className="hero__actions animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              Register Now <IoArrowForward />
            </Link>
            <Link to="/admin" className="btn btn-outline btn-lg">
              View Dashboard
            </Link>
          </div>

          <div className="hero__stats animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="hero__stat">
              <span className="hero__stat-value">5</span>
              <span className="hero__stat-label">Upcoming Events</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-value">820+</span>
              <span className="hero__stat-label">Available Spots</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-value">100%</span>
              <span className="hero__stat-label">Cloud Secured</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="features">
        <div className="container">
          <div className="features__grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card glass-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-card__icon">{feature.icon}</div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Events Section ===== */}
      <section className="events-section">
        <div className="container">
          <div className="events-section__header">
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle">
              Choose from our curated selection of tech events and workshops
            </p>
          </div>

          <div className="events-grid">
            {events.map((event, index) => (
              <div
                key={index}
                className="event-card glass-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div
                  className="event-card__icon-wrap"
                  style={{ background: `${event.color}20`, color: event.color }}
                >
                  {event.icon}
                </div>
                <div className="event-card__content">
                  <h3 className="event-card__name">{event.name}</h3>
                  <p className="event-card__date">{event.date}</p>
                  <p className="event-card__desc">{event.description}</p>
                </div>
                <div className="event-card__footer">
                  <span className="event-card__spots">
                    <IoPeopleOutline /> {event.spots} spots
                  </span>
                  <Link to="/register" className="btn btn-primary btn-sm">
                    Register <IoArrowForward />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card glass-card">
            <h2 className="cta-card__title">Ready to Join?</h2>
            <p className="cta-card__text">
              Don't miss out on these incredible events. Register now and secure your spot!
            </p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started <IoArrowForward />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
