import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import "./Books.css"
import BookYears from "../components/BookYears"
import YearBooks from "../components/YearBooks"
import CurrentlyReadingDisplay from "../components/CurrentlyReadingDisplay"
import BooksThisYearDisplay from '../components/BooksThisYearDisplay'
import {UserContext} from "./UserContext";
const Books = () => {
    const { user, setUser } = useContext(UserContext);
    const [years, setYears] = useState([] || user.booksReadList)
   
  const [selectedYear, setSelectedYear] = useState("")
  const [booksThisYear, setBooksThisYear] = useState([])

  const handleSelectYear = (year) => {
    setSelectedYear(year)
  } 
  
  useEffect(() => {
    if(user.firstName && !years.length) {
  
   
        let bookYears = []
        let booksOfThisYear = []
        user.booksReadList.forEach(book => {
          if (!bookYears.includes(book.Year)) bookYears.push(book.Year)
          if (book.Year === new Date().getFullYear()) booksOfThisYear.push(book)
        })
     
        setYears(bookYears)
        setBooksThisYear(booksOfThisYear)
    }
  
  }, []);

  useEffect(() => {
    if(!user.firstName)

    axios.get('/api/getUser')
      .then(response => {
        const newuser = response.data
        let bookYears = []
        let booksOfThisYear = []
        response.data.booksReadList.forEach(book => {
          if (!bookYears.includes(book.Year))bookYears.push(book.Year)
          if (book.Year === new Date().getFullYear()) booksOfThisYear.push(book)
        })
        setUser(response.data);
        setYears(bookYears)
        setBooksThisYear(booksOfThisYear)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


return (
    <div className="booksContainer">
        <h1 className="booksHeading">BOOKS</h1>
      <div className='imageText'>
   
      <p className="booksText">I am an avid reader and have been accumulating books for many years. Your can acess my library data base <a href="https://mybooksapp.herokuapp.com/">here</a> if you want to delve in a bit deeper. See below current and past reading lists.</p>
      <img src="Case2.jpg" alt="bookcase" className="booksImage"/>
      </div>


      <CurrentlyReadingDisplay currentBooks={user.currentBooks} />
      <BooksThisYearDisplay booksOfYear={booksThisYear} /> 
     
      <BookYears years={years} selectYear={handleSelectYear}  books={user.booksReadList} heading={"Yearly Reading Lists"} />
     
    
    
      {selectedYear && <YearBooks books={user.booksReadList} year={selectedYear}/>}
    </div>
)
}

export default Books