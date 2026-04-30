import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  IoPeopleOutline,
  IoCalendarOutline,
  IoTrashOutline,
  IoRefreshOutline,
  IoMailOutline,
  IoCallOutline,
  IoBriefcaseOutline,
  IoSearchOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import "./AdminPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEvent, setFilterEvent] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [regRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/api/registrations`),
        axios.get(`${API_URL}/api/registrations/stats`),
      ]);
      setRegistrations(regRes.data.data);
      setStats(statsRes.data.data);
    } catch (error) {
      toast.error("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete registration for "${name}"?`)) return;
    try {
      await axios.delete(`${API_URL}/api/registrations/${id}`);
      toast.success("Registration deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete registration");
    }
  };

  const filtered = registrations.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = filterEvent === "all" || r.event === filterEvent;
    return matchesSearch && matchesEvent;
  });

  const uniqueEvents = [...new Set(registrations.map((r) => r.event))];

  return (
    <div className="admin-page">
      <div className="admin-page__container container">
        <div className="admin-page__header animate-fade-in-up">
          <div>
            <h1 className="section-title">Admin Dashboard</h1>
            <p className="section-subtitle">Manage all event registrations</p>
          </div>
          <button className="btn btn-outline" onClick={fetchData} disabled={loading}>
            <IoRefreshOutline /> Refresh
          </button>
        </div>

        {/* ===== Stats Cards ===== */}
        <div className="stats-grid animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="stat-card glass-card">
            <div className="stat-card__icon stat-card__icon--primary">
              <IoPeopleOutline />
            </div>
            <div>
              <div className="stat-card__value">
                {stats?.totalRegistrations || 0}
              </div>
              <div className="stat-card__label">Total Registrations</div>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-card__icon stat-card__icon--accent">
              <IoCalendarOutline />
            </div>
            <div>
              <div className="stat-card__value">
                {stats?.eventStats?.length || 0}
              </div>
              <div className="stat-card__label">Active Events</div>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-card__icon stat-card__icon--success">
              <IoTrendingUpOutline />
            </div>
            <div>
              <div className="stat-card__value">
                {stats?.eventStats?.[0]?.count || 0}
              </div>
              <div className="stat-card__label">
                Top Event Registrations
              </div>
            </div>
          </div>
        </div>

        {/* ===== Event Breakdown ===== */}
        {stats?.eventStats?.length > 0 && (
          <div
            className="event-breakdown glass-card animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="event-breakdown__title">Registrations by Event</h3>
            <div className="event-breakdown__bars">
              {stats.eventStats.map((es, i) => {
                const maxCount = stats.eventStats[0].count;
                const pct = (es.count / maxCount) * 100;
                return (
                  <div key={i} className="event-bar">
                    <div className="event-bar__label">
                      <span className="event-bar__name">{es._id}</span>
                      <span className="event-bar__count">{es.count}</span>
                    </div>
                    <div className="event-bar__track">
                      <div
                        className="event-bar__fill"
                        style={{ width: `${pct}%`, animationDelay: `${i * 0.1}s` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== Filters ===== */}
        <div
          className="admin-filters animate-fade-in-up"
          style={{ animationDelay: "0.25s" }}
        >
          <div className="admin-filters__search">
            <IoSearchOutline className="admin-filters__search-icon" />
            <input
              type="text"
              className="form-input"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="form-select admin-filters__select"
            value={filterEvent}
            onChange={(e) => setFilterEvent(e.target.value)}
          >
            <option value="all">All Events</option>
            {uniqueEvents.map((ev) => (
              <option key={ev} value={ev}>
                {ev}
              </option>
            ))}
          </select>
        </div>

        {/* ===== Registrations Table ===== */}
        <div
          className="registrations-table-wrap glass-card animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          {loading ? (
            <div className="admin-loading">
              <div className="spinner spinner--lg"></div>
              <p>Loading registrations...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="admin-empty">
              <IoPeopleOutline className="admin-empty__icon" />
              <h3>No Registrations Found</h3>
              <p>
                {registrations.length === 0
                  ? "No one has registered yet. Be the first!"
                  : "No registrations match your search."}
              </p>
            </div>
          ) : (
            <div className="registrations-table-scroll">
              <table className="registrations-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      <IoPeopleOutline /> Name
                    </th>
                    <th>
                      <IoMailOutline /> Email
                    </th>
                    <th>
                      <IoCallOutline /> Phone
                    </th>
                    <th>
                      <IoCalendarOutline /> Event
                    </th>
                    <th>
                      <IoBriefcaseOutline /> Org
                    </th>
                    <th>Registered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((reg, index) => (
                    <tr key={reg._id}>
                      <td className="registrations-table__index">
                        {index + 1}
                      </td>
                      <td className="registrations-table__name">
                        {reg.fullName}
                      </td>
                      <td>{reg.email}</td>
                      <td>{reg.phone}</td>
                      <td>
                        <span className="registrations-table__badge">
                          {reg.event}
                        </span>
                      </td>
                      <td>{reg.organization || "—"}</td>
                      <td className="registrations-table__date">
                        {new Date(reg.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(reg._id, reg.fullName)}
                          title="Delete registration"
                        >
                          <IoTrashOutline />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
