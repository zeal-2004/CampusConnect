import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function StudentDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const location = useLocation();
  const username = location.state?.username;

  useEffect(() => {
    if (!username) {
      navigate("/", { replace: true });
      return;
    }
    fetchAllEvents();
    fetchRegisteredEvents();
  }, [username]);

  const fetchAllEvents = () => {
    fetch("http://localhost:5020/events/upcoming/all")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events", err));
  };

  const fetchRegisteredEvents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5020/registrations/${username}`
      );
      setRegisteredEvents(res.data); // Expecting an array of event objects
    } catch (err) {
      console.error("Failed to fetch registered events", err);
    }
  };

  const handleRegister = async (event) => {
    try {
      const res = await axios.post("http://localhost:5020/events/register", {
        username,
        eventId: event.id,
      });
      alert(res.data.message);
      await fetchRegisteredEvents(); // Make sure it's awaited
      await fetchAllEvents(); // Refresh to update registered_count
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  const handleDeregister = async (eventId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5020/registrations/${eventId}/${username}`
      );
      alert(res.data.message);
      await fetchRegisteredEvents(); // Refresh registered list
      await fetchAllEvents(); // Refresh full event data
    } catch (err) {
      console.error("Failed to deregister", err);
      alert("Failed to deregister.");
    }
  };

  const toggleDescription = (id) => {
    setExpandedEventId((prevId) => (prevId === id ? null : id));
  };

  const isRegistered = (eventId) => {
    return registeredEvents.some((event) => event.id === eventId);
  };

  const isEventFull = (event) => {
    return event.registered_count >= event.max_headcount;
  };

  return (
    <div className="faculty-dashboard-bg">
      <h2 className="text-center mb-5 fw-bold text-white display-5">
        🎓 Student Dashboard
      </h2>

      <div className="d-flex justify-content-end mb-3 me-3">
        <button
          className="btn btn-danger"
          onClick={() => navigate("/", { replace: true })}
        >
          Log out
        </button>
      </div>

      <div className="container">
        {/* Upcoming Events */}
        <div className="glass-card p-4">
          <h4 className="text-white mb-3">
            Upcoming Events - Click on event for more details
          </h4>
          <div className="d-flex flex-column gap-3">
            {(showAll ? events : events.slice(0, 3)).map((event) => {
              const registered = isRegistered(event.id);
              const full = isEventFull(event);

              return (
                <div
                  key={event.id}
                  className="glass-card p-3 text-white student-pink event-hover"
                  onClick={() => toggleDescription(event.id)}
                >
                  <div className="d-flex justify-content-between align-items-start flex-wrap">
                    <div
                      style={{ flex: 1, minWidth: "200px", maxWidth: "75%" }}
                    >
                      <h5 className="fw-bold mb-1">{event.name}</h5>
                      <div className="text-white small">
                        {event.description}
                      </div>
                    </div>
                    <div className="ms-3 mt-2 mt-md-0">
                      <button
                        className="btn btn-sm btn-dark"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRegister(event);
                        }}
                        disabled={registered || full}
                      >
                        {registered
                          ? "Already Registered"
                          : full
                          ? "Event Full"
                          : "Register Now"}
                      </button>
                    </div>
                  </div>

                  {expandedEventId === event.id && (
                    <div className="mt-2 text-muted">
                      <div className="mb-2 text-white">
                        <hr style={{ borderColor: "white" }} />
                        📅 {new Date(
                          event.event_date
                        ).toLocaleDateString()}{" "}
                        <br />
                        🕒{" "}
                        {new Date(event.event_date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}{" "}
                        <br />
                        📍 {event.venue}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {events.length > 3 && (
              <div className="text-center mt-2">
                <button
                  className="btn btn-danger"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "See Less" : "See More"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Registered Events */}
        <div className="glass-card p-4 mt-5">
          <h4 className="text-white mb-3">Your Registered Events</h4>
          {registeredEvents.length === 0 ? (
            <p className="text-white">
              You haven't registered for any events yet.
            </p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {registeredEvents.map((event) => (
                <div
                  key={event.id}
                  className="glass-card p-3 text-white student-pink event-hover"
                >
                  <div className="d-flex justify-content-between align-items-start flex-wrap">
                    <div
                      style={{ flex: 1, minWidth: "200px", maxWidth: "75%" }}
                    >
                      <h5 className="fw-bold mb-1">{event.name}</h5>
                      <div className="text-white small">
                        {event.description}
                      </div>
                    </div>
                    <div className="ms-3 mt-2 mt-md-0">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeregister(event.id)}
                      >
                        De-register
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-muted">
                    <div className="mb-2 text-white">
                      📅 {new Date(event.event_date).toLocaleDateString()}{" "}
                      <br />
                      🕒{" "}
                      {new Date(event.event_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      <br />
                      📍 {event.venue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
