import { useState, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {UserContext} from "../pages/UserContext";
import "./YearBooks.css"

const YearBooks = () => {
const location = useLocation()
const navigate = useNavigate()
const { user, setUser } = useContext(UserContext);
const [years, setYears] = useState(location.state.years)
const [selectedYear, setSelectedYear] = useState(location.state.selectedYear)
const [books, setBooks] = useState(location.state.books)




let filteredBooks = books?.filter(book => book.Year===selectedYear)
let pageDisplay =
<div className="yearBooksContainer">
<h1 className='selectedYearHeading'>{`Books for ${selectedYear}`}</h1>
{filteredBooks?.map((book, idx) => {

  
        
    return (
    <p key={idx}>{`${idx+1}) ${book.Title} - ${book.Author}`}</p>

    )
  
    
  
})}
<button onClick={() => navigate("/")} className="yearBooksButton">Return Home</button>
</div>


return pageDisplay


}

export default YearBooks