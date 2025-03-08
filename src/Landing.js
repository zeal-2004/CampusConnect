import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import "./Landing.css";
import Navbar from "./Navbar";
import Carousel from "./Carousel";

function Landing() {
  const navigate = useNavigate();
  const homeRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <div className="landing-page" ref={homeRef}>
        <Navbar
          scrollToSection={scrollToSection}
          homeRef={homeRef}
          aboutRef={aboutRef}
        ></Navbar>
        <h1
          class="text-center landing-page-text"
          style={{
            marginTop: "auto",
            color: "#4B8BA3",
            textShadow: "1.5px 1.5px black",
          }}
        >
          Your Go-To Event Manager!
        </h1>
        {/*<h1>CampusConnect</h1>
      <h4>A place to manage events smoothly!</h4>
      <div class="navbar">
        <ul>
          <li>
            <a onClick={() => scrollToSection(homeRef)}>Home</a>
          </li>
          <li>
            <a onClick={() => scrollToSection(aboutRef)}>About Us</a>
          </li>
          <li>
            <a onClick={() => scrollToSection(contactRef)}>Contact</a>
          </li>
        </ul>
      </div>
      <h2>Upload an image here and it should be side to side</h2>
      <button onClick={() => navigate("/users")}>Get Started</button>
      <div ref={homeRef} style={{ height: "100vh" }}>
        <h2>Home Section</h2>
        <p>This is the Home section content.</p>
      </div>
      <div ref={aboutRef} style={{ height: "100vh" }}>
        <h2>About Us Section</h2>
        <p>This is the About Us section content.</p>
      </div>
      <div ref={contactRef} style={{ height: "100vh" }}>
        <h2>Contact Section</h2>
        <p>This is the Contact section content.</p>
      </div>*/}
      </div>
      <div
        ref={aboutRef}
        style={{
          height: "100vh",
          backgroundColor: "#4B8BA3",
          color: "whitesmoke",
        }}
        class="px-5 text-center"
      >
        <h1 className="mb-4 pt-2" style={{ textShadow: "1.5px 1.5px black" }}>
          CampusConnect
        </h1>
        <h2 className="lead">
          CampusConnect is a powerful tool designed to simplify event planning,
          making it seamless and stress-free.
        </h2>
        <Carousel></Carousel>
      </div>
    </>
  );
}

export default Landing;
