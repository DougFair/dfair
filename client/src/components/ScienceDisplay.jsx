import Carousel from "./Carousel"
import ScienceDashboard from './ScienceDashboard';
import "./ScienceDisplay.css"
const ScienceDisplay = ({user}) => {

    return (
        <div className="scienceDisplayContainer">
            <h1 className="scienceHeading">SCIENCE</h1>
            <ScienceDashboard />
            <Carousel user={user}/>
        </div>
    )
}

export default ScienceDisplay