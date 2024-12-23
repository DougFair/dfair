import React, { useState, useContext } from "react";
import { UserContext } from "../pages/UserContext";
import "./Thumbs_OG.css";

const Thumbs_OG = () => {
    const { user } = useContext(UserContext);
    const [flippedIndex, setFlippedIndex] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);
console.log("fsdkajsdgklsdjfg")
    // Handle card click to flip or expand
    const handleCardClick = (index) => {
        console.log("jsfkljgfhkdsfwjejfjfjfjfjfjk")
        if (window.innerWidth <= 768) {
            // Handle expansion for mobile view
            if (expandedIndex === index) {
                setExpandedIndex(null); // Collapse if the same card is clicked again
            } else {
                setExpandedIndex(index); // Expand the selected card
            }
        } else if ('ontouchstart' in window) {
            console.log("Touch device detected, handling flip.")
            // For touch-enabled devices like iPads
            setFlippedIndex(prevIndex => (prevIndex === index ? null : index));
        }
    };

    return (
        <div className="codingDisplayContainer">
            <h1 className="codeHeading">coding</h1>
            {window.innerWidth <= 768 && expandedIndex !== null && (
                <div className="expandedCard" onClick={() => setExpandedIndex(null)}>
                    <div className="expandedCardContent">
                        <img
                            src={user.coding[expandedIndex].photoURL}
                            alt={user.coding[expandedIndex].codeTitle}
                            className="expandedCardImage"
                        />
                        <h3 className="expandedCardTitle">{user.coding[expandedIndex].codeTitle}</h3>
                        <p className="expandedCardBlurb">{user.coding[expandedIndex].codeBlurb}</p>
                        <a href={user.coding[expandedIndex].codeURL} className="expandedCardURL" target="_blank" rel="noopener noreferrer">
                            Visit Website
                        </a>
                    </div>
                </div>
            )}

<div className="codeGrid">
  {user?.coding?.map((item, index) => {
    // Remove the card from the grid only if:
    // 1) We are on a small screen (<= 768px)
    // 2) A card is actually expanded (expandedIndex is not null)
    // 3) This particular card is the expanded one (expandedIndex === index)
    if (window.innerWidth <= 768 && expandedIndex !== null && expandedIndex === index) {
      return null;
    }

    return (
      <div
        key={index}
        className={`codeCard ${flippedIndex === index ? 'flipped' : ''}`}
        onClick={() => handleCardClick(index)}
      >
        <div className="codeCardInner">
          <div className="codeCardFront">
            <img src={item.photoURL} alt={item.codeTitle} className="codeImage" />
            <h4 className="codeTitle">{item.codeTitle}</h4>
          </div>
          <div className="codeCardBack">
            <p className="codeBlurb">{item.codeBlurb}</p>
            <a href={item.codeURL} className="codeURL" target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </div>
        </div>
      </div>
    );
  })}
</div>

        </div>
    );
};

export default Thumbs_OG;
