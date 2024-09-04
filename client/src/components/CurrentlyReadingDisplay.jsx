import "./CurrentlyReadingDisplay.css"


const CurrentlyReadingDisplay = ({currentBooks}) => {
    let pageDisplay = 
    <div className="currentReadingContainer">
        <h3 className="readingSubHeading">Currently Reading</h3>
        <div className="currentReadingListContainer">
{currentBooks?.map((book, idx) =>  {
    
        if(idx < currentBooks.length-1) {
            return (
              
<p className="currentBookTitleAuthor" key={idx}>{`${book.Title} - ${book.Author}, `}</p>
            )
        } else {
            return (
                <p className="currentBookTitleAuthor" key={idx}>{`${book.Title} - ${book.Author}`}</p>
            )
        }
})
}
</div>
    </div>

return pageDisplay
}

export default CurrentlyReadingDisplay