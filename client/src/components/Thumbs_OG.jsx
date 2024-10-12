import React, { useState, useContext } from "react";
import { UserContext } from "../pages/UserContext";
import "./Thumbs_OG.css";

const Thumbs_OG = () => {
    const { user } = useContext(UserContext);
    const [flippedIndices, setFlippedIndices] = useState({}); // Track flipped state for multiple cards
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Handle card click to flip or expand
    const handleCardClick = (index) => {
        if (window.innerWidth <= 768) {
            // Handle expansion for mobile view
            if (expandedIndex === index) {
                setExpandedIndex(null);
            } else {
                setExpandedIndex(index);
            }
        } else if ('ontouchstart' in window) {
            // Handle flipping for touch-enabled devices like iPads
            setFlippedIndices((prevFlipped) => ({
                ...prevFlipped,
                [index]: !prevFlipped[index] // Toggle flip state for the touched card
            }));
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
                {user?.coding?.map((item, index) => (
                    <div
                        key={index}
                        className={`codeCard ${flippedIndices[index] ? 'flipped' : ''}`}
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
                ))}
            </div>
        </div>
    );
};

export default Thumbs_OG;
