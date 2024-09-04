import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import "./AddCurrentReadingList.css"
import { UserContext } from "./UserContext"
import axios from "axios"

const AddCurrentReadingList = () => {
    const [Title, setTitle] = useState("")
    const [Author, setAuthor] = useState("")
    const [Fiction, setFiction] = useState("Fiction")
    const [added, setAdded] = useState(false)

    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext);
    const handleBookSubmit = (evt) => {
        evt.preventDefault()
        const book = {Title, Author, Fiction, Year: new Date().getFullYear()}
        axios.patch("/api/addCurrentBook", {userId: user._id, book})
        .then(response => setUser(prevState => ({...prevState,  currentBooks: response.data})))
        .then(setAdded(true))
    }

    let pageDisplay
if(!added) {
pageDisplay =
    <div className="formContainer">
    <form onSubmit={handleBookSubmit} className="form">
    <div className="labelInput">
    <label>
    Title
    </label>
    <input type="text" className="textInput" value={Title} onChange={(evt)=> setTitle(evt.target.value)}/>
    </div>
    <div className="labelInput">
    <label>
    Author
    </label>
    <input type="text" className="textInput" value={Author} onChange={(evt)=> setAuthor(evt.target.value)}/>
    </div>
    <div className="labelInput">
    <label>
    Fiction/Non-fiction
    </label>
    <select className="selectInput" value={Fiction} onChange={(evt)=> setFiction(evt.target.value)}>
    <option defaultValue="fiction">Fiction</option>
    <option value="Non-fiction">Non-fiction</option>
    </select>
    
    </div>
    <input type="submit" value="Submit"/>
    </form>
    </div>
} else {
navigate("/admin")
} 

return pageDisplay
}

export default AddCurrentReadingList