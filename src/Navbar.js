import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Navbar({ scrollToSection, homeRef, aboutRef }) {
  const navigate = useNavigate();
  return (
    <div>
      <nav class="navbar navbar-expand-lg background">
        <div class="container-fluid">
          <a href="www.google.com" class="navbar-brand logo">
            CampusConnect ♡
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a
                  class="nav-link active color"
                  aria-current="page"
                  onClick={() => scrollToSection(homeRef)}
                  style={{ cursor: "pointer" }}
                  href="#"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link color"
                  onClick={() => scrollToSection(aboutRef)}
                  style={{ cursor: "pointer" }}
                >
                  About
                </a>
              </li>
              <li className="ms-lg-3">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => navigate("Users")}
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
