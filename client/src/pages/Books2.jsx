import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "./Books2.css";
import BookYears from "../components/BookYears";
import YearBooks from "../components/YearBooks";
import CurrentlyReadingDisplay from "../components/CurrentlyReadingDisplay";
import BooksThisYearDisplay from '../components/BooksThisYearDisplay';
import { UserContext } from "./UserContext";

const Books = () => {
    const { user, setUser } = useContext(UserContext);
    const [years, setYears] = useState([] || user.booksReadList);
    const [selectedYear, setSelectedYear] = useState("");
    const [booksThisYear, setBooksThisYear] = useState([]);
    const [activeTab, setActiveTab] = useState('currentReading'); // Set 'currentReading' as the default active tab

    const handleSelectYear = (year) => {
        setSelectedYear(year);
    };

    useEffect(() => {
        if (user.firstName && !years.length) {
            let bookYears = [];
            let booksOfThisYear = [];
            user.booksReadList.forEach(book => {
                if (!bookYears.includes(book.Year)) bookYears.push(book.Year);
                if (book.Year === new Date().getFullYear()) booksOfThisYear.push(book);
            });
            setYears(bookYears);
            setBooksThisYear(booksOfThisYear);
        }
    }, [user, years]);

    useEffect(() => {
        if (!user.firstName) {
            axios.get('/api/getUser')
                .then(response => {
                    const newUser = response.data;
                    let bookYears = [];
                    let booksOfThisYear = [];
                    response.data.booksReadList.forEach(book => {
                        if (!bookYears.includes(book.Year)) bookYears.push(book.Year);
                        if (book.Year === new Date().getFullYear()) booksOfThisYear.push(book);
                    });
                    setUser(newUser);
                    setYears(bookYears);
                    setBooksThisYear(booksOfThisYear);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [setUser]);

    return (
        <div className="booksContainer">
            <h1 className="booksHeading2">BOOKS</h1>
            <div className='imageText'>
                <p className="booksText">Access my library database <a href="https://mybooksapp.herokuapp.com/">here</a> if you want to delve in a bit deeper. See below current and past reading lists.</p>
                <img src="Case2.jpg" alt="bookcase" className="booksImage" />
            </div>

            <div className="tabsContainer">
                <ul className="tabs">
                    <li className={`tabItem ${activeTab === 'currentReading' ? 'active' : ''}`} onClick={() => setActiveTab('currentReading')}>Currently Reading</li>
                    <li className={`tabItem ${activeTab === 'booksThisYear' ? 'active' : ''}`} onClick={() => setActiveTab('booksThisYear')}>Books This Year</li>
                    <li className={`tabItem ${activeTab === 'yearlyLists' ? 'active' : ''}`} onClick={() => setActiveTab('yearlyLists')}>Yearly Reading Lists</li>
                </ul>

                {activeTab === 'currentReading' && <CurrentlyReadingDisplay currentBooks={user.currentBooks} />}
                {activeTab === 'booksThisYear' && <BooksThisYearDisplay booksOfYear={booksThisYear} />}
                {activeTab === 'yearlyLists' && <BookYears years={years} selectYear={handleSelectYear} books={user.booksReadList} heading={"Yearly Reading Lists"} />}
            </div>

            {selectedYear && <YearBooks books={user.booksReadList} year={selectedYear} />}
        </div>
    );
};

export default Books;
