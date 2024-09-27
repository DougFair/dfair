import { useEffect, useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import './ScienceDashboard.css';
import { UserContext } from "../pages/UserContext";

const ScienceDashboard = () => {
  const [citations, setCitations] = useState(null);
  const [hindex, setHIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, setUser } = useContext(UserContext);
const navigate = useNavigate()


  // useEffect(() => {
  //   const fetchScholarData = async () => {
  //     try {
  //       setLoading(true);

  //       const response = await axios.post('/api/scholar', {apiKey: import.meta.env.VITE_SERP_API_KEY, scholarId: import.meta.env.VITE_GOOGLE_SCHOLAR_ID})
       

  //       const cites = response.data.cited_by.table[0].citations.all
  //       console.log("cityes" + cites)
  //       const hidx = response.data.cited_by.table[1].h_index.all
  //       console.log("hindex" + hidx)
  //       setCitations(cites);
  //       setHIndex(hidx);
  //     } catch (err) {
  //       setError('An error occurred while fetching data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchScholarData();
  // }, [])


let websites
if(user?.dashboardLinks?.length) {
  websites = 
  user?.dashboardLinks?.map(link => <a href={link.linkURL} key={link.linkName} target="_blank" rel="noopener noreferrer">{link.linkName}</a>)
  
}

let publicationData = 
<div className="publicationContainer">
<p className="dashItem">{`Total: ${user?.publications?.length || "Calculating..."}`}</p>
<p className="dashItem">{`h-index: ${hindex || "57"}`}</p>
<p className="dashItem">{`h-index: ${citations || "27000"}`}</p>

</div>


  return (
    <div className="statsDashboard">
      <div className="publicationsContainer">
      <h4 className="dashSubheading">Publications</h4>
    {publicationData}
    <button onClick={() => navigate("/publications")} className='pubsButton'>View Publications</button>
      </div>
      <div className='linkContainer'>
        <h4 className="dashSubheading">Links</h4>
      {websites}
      </div>
    </div>
  );
};

export default ScienceDashboard