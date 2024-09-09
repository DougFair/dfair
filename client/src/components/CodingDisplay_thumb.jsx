import React, { useContext } from "react";
import { UserContext } from "../pages/UserContext";
import "./CodingDisplay_thumb.css";

const CodingDisplay_thumb = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1 className="codingHeading">CODING</h1>
            <div className="codingDisplayContainer">
                <div className="codeGrid">
                    {user?.coding?.map((item, index) => (
                        <div key={index} className="codeCard flippable">
                            <div className="codeCardInner">
                                <div className="codeCardFront">
                                    <img className="codeImage" src={item.photoURL} alt={item.codeTitle} />
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
        </div>
    );
};

export default CodingDisplay_thumb;
