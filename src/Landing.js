import { useRef, useEffect } from "react";
import "./Landing.css";
import Navbar from "./Navbar";
import Carousel from "./Carousel";

function Landing() {
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
