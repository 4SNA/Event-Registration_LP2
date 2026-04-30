import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoCalendarOutline,
  IoBriefcaseOutline,
  IoRestaurantOutline,
  IoChatbubbleOutline,
  IoCheckmarkCircle,
  IoArrowForward,
} from "react-icons/io5";
import "./RegisterPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const events = [
  "Tech Conference 2026",
  "AI & ML Workshop",
  "Web Development Bootcamp",
  "Cloud Computing Summit",
  "Cybersecurity Seminar",
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    event: "",
    organization: "",
    dietaryPreference: "none",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/registrations`, formData);
      if (res.data.success) {
        setSuccess(true);
        toast.success("Registration successful! 🎉");
        setTimeout(() => {
          navigate("/admin");
        }, 2500);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="register-page">
        <div className="register-page__container container">
          <div className="success-card glass-card animate-fade-in-up">
            <div className="success-card__icon">
              <IoCheckmarkCircle />
            </div>
            <h2 className="success-card__title">Registration Successful!</h2>
            <p className="success-card__text">
              Thank you for registering, <strong>{formData.fullName}</strong>!
              <br />
              You've been registered for <strong>{formData.event}</strong>.
            </p>
            <p className="success-card__redirect">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-page__container container">
        <div className="register-page__header animate-fade-in-up">
          <h1 className="section-title">Event Registration</h1>
          <p className="section-subtitle">
            Fill in your details below to register for an upcoming event
          </p>
        </div>

        <form
          className="register-form glass-card animate-fade-in-up"
          style={{ animationDelay: "0.15s" }}
          onSubmit={handleSubmit}
        >
          <div className="register-form__grid">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">
                <IoPersonOutline className="form-label__icon" /> Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                <IoMailOutline className="form-label__icon" /> Email Address *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                <IoCallOutline className="form-label__icon" /> Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                className="form-input"
                placeholder="10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
            </div>

            {/* Event Selection */}
            <div className="form-group">
              <label className="form-label" htmlFor="event">
                <IoCalendarOutline className="form-label__icon" /> Select Event *
              </label>
              <select
                id="event"
                name="event"
                className="form-select"
                value={formData.event}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Choose an event...
                </option>
                {events.map((ev) => (
                  <option key={ev} value={ev}>
                    {ev}
                  </option>
                ))}
              </select>
            </div>

            {/* Organization */}
            <div className="form-group">
              <label className="form-label" htmlFor="organization">
                <IoBriefcaseOutline className="form-label__icon" /> Organization
              </label>
              <input
                id="organization"
                type="text"
                name="organization"
                className="form-input"
                placeholder="Company or institution (optional)"
                value={formData.organization}
                onChange={handleChange}
              />
            </div>

            {/* Dietary Preference */}
            <div className="form-group">
              <label className="form-label" htmlFor="dietaryPreference">
                <IoRestaurantOutline className="form-label__icon" /> Dietary Preference
              </label>
              <select
                id="dietaryPreference"
                name="dietaryPreference"
                className="form-select"
                value={formData.dietaryPreference}
                onChange={handleChange}
              >
                <option value="none">No Preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten Free</option>
              </select>
            </div>
          </div>

          {/* Additional Notes - full width */}
          <div className="form-group">
            <label className="form-label" htmlFor="additionalNotes">
              <IoChatbubbleOutline className="form-label__icon" /> Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              className="form-textarea"
              placeholder="Any special requirements or notes? (optional)"
              value={formData.additionalNotes}
              onChange={handleChange}
              maxLength={500}
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg register-form__submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Registering...
              </>
            ) : (
              <>
                Submit Registration <IoArrowForward />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
