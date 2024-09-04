import { useContext, useRef } from "react"
import { UserContext } from "../pages/UserContext"
import "./DiscoveryDisplay.css"

const DisplayDiscoveries2 = () => {
    const { user, setUser } = useContext(UserContext);

let pageDisplay


if(user?.discoveries?.length) {

  
    pageDisplay =    
            <div className="slider-container">
         
                 {user.discoveries.map(discovery => {
                    return (
                <div className="discoveryContainer"> 
                
                    <img src={discovery.discoveryPictureURL} className="discoveryImage" alt="Discovery representation" width= "200" height="auto"/>
          
                <div className="discoveryTextContainer">
                <h3 className="discoveryTextYear">{discovery.discoveryYear}</h3>
                <h3 className="discoveryTextTitle ">{discovery.discoveryTitle}</h3>
                <p className="discoveryTextBlurb">{discovery.discoveryBlurb}</p>
                <a href={discovery.paperURL} className="discoveryTextURL">Publication</a>
                </div>
                </div>
                    )
                 })}

           </div>
                }



    return pageDisplay

            }
export default DisplayDiscoveries2