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
const books = location.state.books

let pageDisplay =
<div className="yearBooksContainer">

    <h1 className='selectedYearHeading'>{`Books for ${selectedYear}`}</h1>


{books?.map((book, idx) => {

    if(book.Year === selectedYear) {

    return (
      
<p key={idx}>{`${idx}) ${book.Title} - ${book.Author}`}</p>

    )
    }
})}
<button onClick={() => navigate("/")} className="yearBooksButton">Return Home</button>
</div>


return pageDisplay


}

export default YearBooks