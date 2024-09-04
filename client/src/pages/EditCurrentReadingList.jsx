import { useContext, useState } from "react"
import { UserContext } from "../pages/UserContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const EditCurrentReadingList = () => {

    const [updated, setUpdated] = useState(false)
    const { user, setUser } = useContext(UserContext);
   console.log("uusuusus" + JSON.stringify(user))
   const navigate= useNavigate()
const handleBookTransfer = (evt) => {
    const book=user.currentBooks.filter(b => b.Title === evt.target.value)
    console.log("book" + JSON.stringify(book[0]))
axios.patch('/api/transferCurrentBook', {userId: user._id, book: book[0]})
.then(response => setUser(response.data))
.then(setUpdated(true))
}

let pageDisplay
   if(user?.currentBooks?.length && !updated) {
    pageDisplay = 
    <div>
       {user.currentBooks.map((book,idx) => {
return (
    <div>
    <p key={idx}>{`${book.Title} - ${book.Author}`}</p>
    <button onClick={handleBookTransfer} value={book.Title} >Transfer book to "Books This Year" list</button>
    </div>
    )
        })}
    </div>
   }
   if (updated) {
    navigate("/admin")
   }
   
    return pageDisplay
}

export default EditCurrentReadingList