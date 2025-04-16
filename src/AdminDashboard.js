import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5020/admin/events");
        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="faculty-dashboard-bg d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
      <h2 className="fw-bold text-white display-5 text-center mb-2">
        🎓 Admin Dashboard
      </h2>
      <div
        className="w-100 d-flex justify-content-end mb-3"
        style={{ maxWidth: "1000px" }}
      >
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-card w-100" style={{ maxWidth: "1000px" }}>
        {error && <div className="error">{error}</div>}

        <table className="glass-card event-table w-100">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Created By</th>
              <th>Max Headcount</th>
              <th>Registrations</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.name} className="student-event student-pink">
                  <td>{event.name}</td>
                  <td>{event.venue}</td>
                  <td>{formatDate(event.event_date)}</td>
                  <td>{event.created_by}</td>
                  <td>{event.max_headcount}</td>
                  <td>{event.registrations || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
