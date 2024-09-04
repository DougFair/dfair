import { useContext, useRef } from "react"
import { UserContext } from "../pages/UserContext"
import "./DiscoveryDisplay.css"

const DisplayDiscoveries = () => {
    const { user, setUser } = useContext(UserContext);



let pageDisplay


if(user?.discoveries?.length) {

  pageDisplay=
user.discoveries.map(discovery => {
 return (
  <div className="discoveryContainer">
<h3>{discovery.discoveryYear}</h3>
<h3>{discovery.discoveryTitle}</h3>
<p>{discovery.discoveryBlurb}</p>
</div>
)
})         
}   


    return (
      <div>
        <h1 className="scienceHeading">Science</h1>
        {pageDisplay}
      </div>
    )

            }
export default DisplayDiscoveries