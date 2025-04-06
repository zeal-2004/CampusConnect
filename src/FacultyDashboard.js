import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaCalendarPlus, FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./App.css";

function FacultyDashboard() {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [maxHeadCount, setMaxHeadCount] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const username = location.state?.username;

  useEffect(() => {
    if (!username) navigate("/", { replace: true });
    else fetchEvents();
  }, [username]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5020/events/upcoming/${username}`
      );
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventName || !description || !date || !time || !venue) {
      setMessage("Please fill in all fields.");
      return;
    }

    const eventDate = new Date(`${date}T${time}`);
    const now = new Date();
    if (eventDate <= now) {
      setMessage("Event date must be in the future.");
      return;
    }

    try {
      if (editingEvent) {
        await axios.put(`http://localhost:5020/events/${editingEvent.id}`, {
          name: eventName,
          description,
          date,
          time,
          venue,
          max_headcount: maxHeadCount,
        });
        setMessage("Event updated successfully!");
      } else {
        const response = await axios.post("http://localhost:5020/events", {
          name: eventName,
          description,
          date,
          time,
          venue,
          created_by: username,
          max_headcount: maxHeadCount,
        });
        setMessage(response.data.message);
      }
      resetForm();
      fetchEvents();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error creating/updating event."
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5020/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setEventName(event.name);
    setDescription(event.description);
    setDate(event.event_date.split("T")[0]);
    const localTime = new Date(event.event_date).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    setTime(localTime);

    setVenue(event.venue);
    setMessage("");
    setMaxHeadCount(event.max_headcount || "");
  };

  const resetForm = () => {
    setEventName("");
    setDescription("");
    setDate("");
    setTime("");
    setVenue("");
    setEditingEvent(null);
    setMaxHeadCount("");
  };

  return (
    <div className="faculty-dashboard-bg">
      <h2 className="text-center mb-5 fw-bold text-white display-5">
        🎓 Faculty Dashboard
      </h2>

      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-danger"
          onClick={() => navigate("/", { replace: true })}
        >
          Log out
        </button>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Create/Edit Event Card */}
        <div className="col-md-6 col-lg-5">
          <div className="glass-card">
            <h5 className="mb-3 text-white">
              <FaCalendarPlus className="me-2" />
              {editingEvent ? "Edit Event" : "Create New Event"}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-white">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={eventName}
                  placeholder="eg: Google Hackathon"
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white">Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  placeholder="Provide a brief information about the event."
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white">Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white">Venue</label>
                <input
                  type="text"
                  className="form-control"
                  value={venue}
                  placeholder="eg: SJT Homi Baba Gallery"
                  onChange={(e) => setVenue(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white">Max Head Count</label>
                <input
                  type="number"
                  className="form-control"
                  value={maxHeadCount}
                  placeholder="eg: 100"
                  min="1"
                  onChange={(e) => setMaxHeadCount(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#D9415D",
                  color: "white",
                  width: "100%",
                  fontWeight: "bold",
                  borderRadius: "10px",
                }}
              >
                {editingEvent ? "Update Event" : "+ Create Event"}
              </button>

              {editingEvent && (
                <button
                  type="button"
                  className="btn mt-2"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                    fontWeight: "bold",
                    borderRadius: "10px",
                  }}
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}

              {message && (
                <div className="alert alert-info text-center mt-3">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="col-md-6 col-lg-5">
          <div className="glass-card">
            <h5 className="mb-3 text-white">
              <FaCalendarAlt className="me-2" />
              Upcoming Events
            </h5>

            {events.length === 0 ? (
              <div className="text-white">No upcoming events.</div>
            ) : (
              <>
                <div
                  className="d-flex flex-column gap-3 scrollable-events"
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    widht: "100%",
                  }}
                >
                  {(showAll ? events : events.slice(0, 3)).map((event) => (
                    <div
                      key={event.id}
                      className="event-card-pink p-3 rounded shadow-sm"
                      style={{ width: "100%" }}
                    >
                      <div className="d-flex justify-content-between align-items-start flex-wrap">
                        <div style={{ maxWidth: "80%" }}>
                          <h6 className="fw-bold mb-1">{event.name}</h6>
                          <small>{event.description}</small>
                          <div className="mt-2" style={{ fontSize: "0.9rem" }}>
                            📅 {new Date(event.event_date).toLocaleDateString()}
                            <br />
                            🕔{" "}
                            {new Date(event.event_date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                            <br />
                            📍 {event.venue}
                            <br />
                            👥{" "}
                            {event.registered_count !== undefined &&
                            event.max_headcount
                              ? `${event.registered_count} / ${event.max_headcount} students registered`
                              : "Registration data unavailable"}
                          </div>
                        </div>

                        <div className="mt-2 d-flex gap-2">
                          <button
                            className="btn btn-sm btn-light"
                            onClick={() => handleEdit(event)}
                            title="Edit"
                          >
                            <FaEdit style={{ color: "#D9415D" }} />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(event.id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {events.length > 3 && (
                  <button
                    className="btn btn-sm mt-3"
                    style={{
                      backgroundColor: "transparent",
                      color: "#D9415D",
                      fontWeight: "bold",
                      border: "none",
                      textDecoration: "underline",
                    }}
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? "See Less..." : "See More..."}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
