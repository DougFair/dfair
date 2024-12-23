import React, { useState, useContext } from "react";
import { UserContext } from "../pages/UserContext";
import "./Thumbs_OG.css";

// Helper function to detect mobile devices via user agent
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const Thumbs_OG = () => {
  const { user } = useContext(UserContext);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleCardClick = (index) => {
    // 1) If it's an actual mobile device (phone/tablet in mobile mode):
    if (isMobileDevice()) {
      // Use inline expansion
      if (expandedIndex === index) {
        setExpandedIndex(null); // collapse
      } else {
        setExpandedIndex(index); // expand
      }

    // 2) Else if the window width is small for a desktop/laptop
    } else if (window.innerWidth <= 1024) {
      // Flip the card
      setFlippedIndex((prev) => (prev === index ? null : index));

    } else {
      // 3) For larger desktops, do whatever you prefer (flip or expand)
      // Let's assume we flip for demonstration
      setFlippedIndex((prev) => (prev === index ? null : index));
    }
  };

  return (
    <div className="codingDisplayContainer">
      <h1 className="codeHeading">coding</h1>

      <div className="codeGrid">
        {user?.coding?.map((item, index) => {
          // Are we on a mobile device, and is this the expanded card?
          const isExpandedOnMobile =
            isMobileDevice() && expandedIndex === index;

          // Otherwise, if not mobile, do we flip?
          const isFlipped =
            !isMobileDevice() && flippedIndex === index;

          return (
            <div
              key={index}
              className={`codeCard 
                ${isFlipped ? "flipped" : ""} 
                ${isExpandedOnMobile ? "expanded" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="codeCardInner">
                {isExpandedOnMobile ? (
                  // Inline expanded content for mobile devices
                  <div className="expandedMobileContent">
                    <img
                      src={item.photoURL}
                      alt={item.codeTitle}
                      className="expandedCardImage"
                    />
                    <h3 className="expandedCardTitle">{item.codeTitle}</h3>
                    <p className="expandedCardBlurb">{item.codeBlurb}</p>
                    <a
                      href={item.codeURL}
                      className="expandedCardURL"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  </div>
                ) : (
                  // Default front/back faces
                  <>
                    <div className="codeCardFront">
                      <img
                        src={item.photoURL}
                        alt={item.codeTitle}
                        className="codeImage"
                      />
                      <h4 className="codeTitle">{item.codeTitle}</h4>
                    </div>
                    <div className="codeCardBack">
                      <p className="codeBlurb">{item.codeBlurb}</p>
                      <a
                        href={item.codeURL}
                        className="codeURL"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Thumbs_OG;
