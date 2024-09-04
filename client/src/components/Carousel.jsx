import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../pages/UserContext";
import "./Carousel.css";

const Carousel = () => {
    const { user } = useContext(UserContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % user.discoveries.length);
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + user.discoveries.length) % user.discoveries.length);
    };

    let carousel;

    if (user?.discoveries?.length) {
        if (isMobile) {
            // Render only one card on mobile
            const discovery = user.discoveries[currentIndex];
            carousel = (
                <div className="card">
                    <div className="image-container">
                        <img src={discovery.discoveryPictureURL} alt={discovery.title} className='carouselImage'/>
                    </div>
                    <div className="card-content">
                        <h3>{discovery.discoveryYear}</h3>
                        <h3>{discovery.discoveryTitle}</h3>
                        <p>{discovery.discoveryBlurb}</p>
                    </div>
                </div>
            );
        } else {
            // Render three cards side by side on larger screens
            carousel = (
                <div className="carousel-wrapper">
                    {user.discoveries.slice(currentIndex, currentIndex + 3).map((discovery, index) => (
                        <div key={index} className="card">
                            <div className="image-container">
                                <img src={discovery.discoveryPictureURL} alt={discovery.title} className='carouselImage'/>
                            </div>
                            <div className="card-content">
                                <h3>{discovery.discoveryYear}</h3>
                                <h3>{discovery.discoveryTitle}</h3>
                                <p>{discovery.discoveryBlurb}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    }

    return (
        <div className="carousel-container">
            <div className="carousel">
                {carousel}
            </div>
            <div className="carousel-buttons-container">
                <button className="carousel-button prev" onClick={prev}>Previous</button>
                <button className="carousel-button next" onClick={next}>Next</button>
            </div>
        </div>
    );
};

export default Carousel;
