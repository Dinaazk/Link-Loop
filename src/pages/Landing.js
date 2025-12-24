import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Landing() {
  const texts = [
    "Connect students by skills.",
    "Learn together, not alone.",
    "Build projects with the right peers."
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (charIndex < texts[textIndex].length) {
        setDisplayText(displayText + texts[textIndex][charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setDisplayText("");
          setTextIndex((textIndex + 1) % texts.length);
        }, 1500);
      }
    }, 80);

    return () => clearTimeout(timeout);
  }, [charIndex, displayText, textIndex, texts]);

  return (
    <div className="landing-container">
      <h1 className="brand-title">Link&Loop</h1>

      <h2 className="typing-text">{displayText}</h2>

      <p className="landing-desc">
        A college-centric platform that helps students discover peers based on
        verified skills, collaborate on projects, and grow together.
      </p>

      <div className="landing-buttons">
        <Link to="/login">
          <button className="primary-btn">Login</button>
        </Link>
        <Link to="/login">
          <button className="secondary-btn">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
