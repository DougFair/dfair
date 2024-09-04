
import "./BooksThisYearDisplay.css"

const BooksThisYearDisplay = ({booksOfYear}) => {
    let pageDisplay = 
    <div className="booksOfYearContainer">
        <h3 className="readThisYearSubHeading">Read this year</h3>
        <div className="readThisYearListContainer">
{booksOfYear.map((book, idx) =>  {
    
  
            return (    
    <p className = "readThisYearBookTitle" key={idx}>{`${idx+1}) ${book.Title} - ${book.Author}`}</p>
            )
        }
)}

    </div>
 </div>
return pageDisplay

}

export default BooksThisYearDisplay