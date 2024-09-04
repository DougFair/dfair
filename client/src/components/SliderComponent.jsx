import Slider from "react-slick"
import { useRef } from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DiscoveryDisplay.css"


const SliderComponent = ({user}) => {
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    centerMode: true,
    adaptiveHeight: true
  };

    let sliderRef = useRef(null);
    const play = () => {
      sliderRef.slickPlay();
    };
    const pause = () => {
      sliderRef.slickPause();
    };


    return (
        <div className="slider-container">
        <Slider ref={slider => (sliderRef = slider)} {...settings} className="slider">
        {user.discoveries.map(discovery => {
                return (
            <div className="sliderContents">
            <div className="discoveryContainer"> 
            
            <img src={discovery.discoveryPictureURL} className="discoveryImage" alt="Discovery representation" width= "200" height="auto"/>
      
            <div className="discoveryTextContainer">
            <h3 className="discoveryTextYear">{discovery.discoveryYear}</h3>
            <h3 className="discoveryTextTitle ">{discovery.discoveryTitle}</h3>
            <p className="discoveryTextBlurb">{discovery.discoveryBlurb}</p>
            <a href={discovery.paperURL} className="discoveryTextURL">Publication</a>
            </div>
            </div>
            </div>
                )
             })}
        </Slider>
           <div  className="sliderButtonsContainer">
           <button className="sliderButtonPlay" onClick={play} >
             Play
           </button>
           <button className="sliderButtonPause" onClick={pause}>
             Pause
           </button>
         </div>
       </div>
    )
}

export default SliderComponent
