import React, { useState, useContext } from "react";
import { UserContext } from "../pages/UserContext"; // Assuming UserContext is here
import "./CodingDisplay_thumb.css";

const CodingDisplay_thumb = () => {
    const { user } = useContext(UserContext); // Pull user context
    const [expandedIndex, setExpandedIndex] = useState(null); // For handling expansion on mobile

    // Handle card click to expand or collapse (mobile only)
    const handleCardClick = (index) => {
        if (window.innerWidth <= 768) { // Only apply expansion behavior on small screens
            if (expandedIndex === index) {
                setExpandedIndex(null); // Collapse if clicked again
            } else {
                setExpandedIndex(index); // Expand the selected card
            }
        }
    };

    return (
        <div className="codingDisplayContainer">
            {/* Conditionally render the expanded card for mobile */}
            {window.innerWidth <= 768 && expandedIndex !== null && (
                <div className="expandedCard" onClick={() => setExpandedIndex(null)}> {/* Collapse on click */}
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

            {/* Thumbnails in the grid */}
            <div className="codeGrid">
                {user?.coding?.map((item, index) => (
                    expandedIndex !== index && (  // Hide expanded card from grid
                        <div
                            key={index}
                            className={`codeCard ${expandedIndex === index ? 'expanded' : ''}`}
                            onClick={() => handleCardClick(index)} // Handle click for mobile
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
                    )
                ))}
            </div>
        </div>
    );
};

export default CodingDisplay_thumb;
