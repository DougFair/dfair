import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import DiscoveryDisplay from "../components/DiscoveryDisplay"
import Carousel from "../components/Carousel"
import CodingDisplay2 from "../components/CodingDisplay2"
import CodingDisplay_thumb from "../components/CodingDisplay_thumb"
import Thumbs_OG from "../components/Thumbs_OG"
import ScienceDisplay from '../components/ScienceDisplay'
// import Books from "./Books"
import Books2 from "./Books2"
import Navbar from '../components/Navbar'
// import BookYears from "../components/BookYears"
// import YearBooks from "../components/YearBooks"
// import CurrentlyReadingDisplay from "../components/CurrentlyReadingDisplay"
// import BooksThisYearDisplay from '../components/BooksThisYearDisplay'
import '../App.css'
import {UserContext} from "./UserContext";
import "./Home.css"

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user.firstName) {
        axios.get('/api/getUser')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}, [setUser]);




  return (
    <div className='appContainer'>
      <Navbar />

      {/* <h1>{`${user.firstName}`}</h1> */}
      <ScienceDisplay user={user} />
  
      {/* <DiscoveryDisplay user={user}/> */}
      <Thumbs_OG />
      {/* <CodingDisplay_thumb /> */}
      {/* <CodingDisplay2 /> */}
      {/* <hr style={{width: "100%", border: "1px solid lightgrey"}} /> */}

      {/* <Books /> */}
      <Books2 />
    </div>
  );
}


export default Home
