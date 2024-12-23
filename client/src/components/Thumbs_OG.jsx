import React, { useState, useContext } from "react";
import { UserContext } from "../pages/UserContext";
import "./Thumbs_OG.css";

const Thumbs_OG = () => {
  const { user } = useContext(UserContext);

  // Index of the card that is flipped (for desktop)
  const [flippedIndex, setFlippedIndex] = useState(null);

  // Index of the card that is expanded inline (for mobile)
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleCardClick = (index) => {
    // If screen width is 768px or below, toggle inline expansion
    if (window.innerWidth <= 768) {
      if (expandedIndex === index) {
        setExpandedIndex(null); // collapse it
      } else {
        setExpandedIndex(index); // expand it
      }

    } else {
      // If screen width is above 768px, toggle flip
      if (flippedIndex === index) {
        setFlippedIndex(null); 
      } else {
        setFlippedIndex(index);
      }
    }
  };

  return (
    <div className="codingDisplayContainer">
      <h1 className="codeHeading">coding</h1>

      <div className="codeGrid">
        {user?.coding?.map((item, index) => {
          // For small screens: check if this card is expanded
          const isExpandedOnMobile = (window.innerWidth <= 768 && expandedIndex === index);

          // For large screens: check if this card is flipped
          const isFlippedOnDesktop = (window.innerWidth > 768 && flippedIndex === index);

          return (
            <div
              key={index}
              className={`codeCard 
                          ${isExpandedOnMobile ? "expanded" : ""} 
                          ${isFlippedOnDesktop ? "flipped" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="codeCardInner">
                {isExpandedOnMobile ? (
                  // Inline Expanded Content for mobile
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
