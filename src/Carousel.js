import faculty from "./images/faculty.png";
import student from "./images/studentcar.png";
import admin from "./images/facultycar.png";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Carousel() {
  const navigate = useNavigate();
  return (
    <>
      <div id="carouselExampleCaptions" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={faculty} style={{ width: "800px" }} alt="Faculty" />
            <div
              class="carousel-caption d-none d-md-block"
              style={{
                backgroundColor: "black",
                borderRadius: "25px",
                transform: "scale(0.7)",
              }}
            >
              <h5>Create / Edit Events as a Faculty</h5>
              <p>
                Faculty members can effortlessly create and edit events with
                this intuitive event management system.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img src={student} style={{ width: "800px" }} alt="Student" />
            <div
              class="carousel-caption d-none d-md-block"
              style={{
                backgroundColor: "black",
                borderRadius: "25px",
                transform: "scale(0.7)",
              }}
            >
              <h5>RSVP to Events as a Student</h5>
              <p>
                Students can easily RSVP to events with a single click, securing
                their spot instantly.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img src={admin} style={{ width: "1000px" }} alt="Admin" />
            <div
              class="carousel-caption d-none d-md-block"
              style={{
                backgroundColor: "black",
                borderRadius: "25px",
                transform: "scale(0.7)",
              }}
            >
              <h5>Oversee Event reports as an Admin </h5>
              <p>
                Admins have full access to event reports, allowing them to track
                attendance, engagement, and overall event success.
              </p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <button
        type="button"
        className="btn btn-light"
        onClick={() => navigate("/Users")}
      >
        Get Started
      </button>
    </>
  );
}

export default Carousel;
