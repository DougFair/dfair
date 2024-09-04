import "./BookYears.css"
import { useNavigate } from "react-router-dom"

const BookYears = ({years, books, heading}) => {
const navigate = useNavigate()


let pageDisplay = 
<div className="bookYearsContainer">
<h3 className="bookYearsSubHeading">{heading}</h3>
<div className="bookYearsListContainer">
{years.map(year => {
   
    return (
    
// {/* <p  className="year" key={year} onClick={() => selectYear(year)}>{year}</p> */}
<p  className="year" key={year} onClick={() => navigate("/year-books", {state: {selectedYear: year, years, books}})}>{year}</p>
     

    )
})
}
</div>
</div>
  
    
    return pageDisplay


}

export default BookYears