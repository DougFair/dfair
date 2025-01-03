import React, { useState, useContext } from "react";
import { UserContext } from "../pages/UserContext";
import "./Thumbs_OG.css";

const Thumbs_OG = () => {
  const { user } = useContext(UserContext);

  // For mobile inline expansions
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleCardClick = (index) => {
    // On small screens, toggle inline expansion
    if (window.innerWidth <= 768) {
      if (expandedIndex === index) {
        setExpandedIndex(null); // collapse it
      } else {
        setExpandedIndex(index); // expand it in place
      }
    }
    // On larger screens, do nothing on click 
    // (Hover-based flip is handled purely by CSS).
  };

  return (
    <div className="codingDisplayContainer">
      <h1 className="codeHeading">coding</h1>

      <div className="codeGrid">
        {user?.coding?.map((item, index) => {
          // If the screen is <= 768px, check if we should show the expanded content
          const isExpandedOnMobile = (window.innerWidth <= 768 && expandedIndex === index);

          return (
            <div
              key={index}
              className={`codeCard ${isExpandedOnMobile ? "expanded" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="codeCardInner">
                {isExpandedOnMobile ? (
                  // Inline Expanded Content on Mobile
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
                  // Default Front/Back faces for desktop or non-expanded mobile
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
