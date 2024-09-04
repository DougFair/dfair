import { useContext, useState, useEffect } from "react";
import { UserContext } from "../pages/UserContext";
import "./CodingDisplay2.css";

const CodingDisplay2 = () => {
  const { user } = useContext(UserContext);

  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  let interval = 3000;

  useEffect(() => {
    if (images.length) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [images]);

  useEffect(() => {
    if (user?.coding?.length) {
      const imageArray = user.coding.map((item) => item.photoURL);
      setImages(imageArray);
    }
  }, [user?.coding]);

  let pageDisplay;
  if (images?.length && user?.coding?.length) {
    pageDisplay = (
      <div className="codeContainer">
        <div className="codeGrid">
          {user.coding?.map((item, index) => (
            <div className="codeCard" key={index}>
              <div className="codeCardInner">
                <div className="codeCardFront">
                  <img className="codeImage" src={item.photoURL} alt={item.codeTitle} />
                  <h4 className="codeTitle">{item.codeTitle}</h4>
                </div>
                <div className="codeCardBack">
                  <p className="codeBlurb">{item.codeBlurb}</p>
                  <a href={item.codeURL} className="codeURL" target="_blank" rel="noopener noreferrer">Visit Website</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="codeDisplayContainer">
      <h1 className="codingHeading">CODING</h1>
      {pageDisplay}
    </div>
  );
};

export default CodingDisplay2;
