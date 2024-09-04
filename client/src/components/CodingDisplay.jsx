import { useContext, useState, useEffect } from "react"
import { UserContext } from "../pages/UserContext"
import "./CodingDisplay.css"

const CodingDisplay = () => {
  const { user, setUser } = useContext(UserContext);


const [images, setImages] = useState([])
const [currentImageIndex, setCurrentImageIndex] = useState(0);

let interval=3000  
useEffect(() => {
  if(images.length){
    console.log("IMAGES")
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }
  }, [images]);


useEffect(() => {
        if(user?.coding?.length){


            const imageArray = user.coding.map(item => item.photoURL)
            console.log("array" + imageArray)
            setImages(imageArray)
        }
    }, [user?.coding]);
    
    let pageDisplay
    if (images?.length && user?.coding?.length) {
      pageDisplay = (
       <div className="codeContainer">
       {/* <div className="image-slider">
          {images.map((image, index) => (
            <img key={index} src={image}
            className={`slider-image ${index === currentImageIndex ? 'active' : ''}`}/>
          ))}

        </div> */}
<div>
    {user.coding?.map((item,index) => {
        return (
            <div className="codeItem" key={index}>
   <img  className="codeImage" src={item.photoURL}/>
              <div className="codeItemText">
           <h4 className="codeTitle">{item.codeTitle}</h4> 
           <p  className="codeBlurb">{item.codeBlurb}</p> 
           <a href={item.codeURL}  className="codeURL">Website</a> 
           </div>
           </div>
        )
    })}
</div>


        </div>
      );
    }
  



    return (
        <div>
    {pageDisplay}
    </div>
    )

}       
export default CodingDisplay