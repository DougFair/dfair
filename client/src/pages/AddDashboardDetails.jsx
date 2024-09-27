import {useState, useContext} from 'react'
import {UserContext} from "./UserContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "./AddDashboardDetails.css"
const AddDashboardDetails = () => {
    
    const [linkName, setLinkName] = useState("")
    const [linkURL, setLinkURL] = useState("")
    const [linkAdded, setLinkAdded] =useState(false)

   const { user, setUser } = useContext(UserContext);

   const navigate= useNavigate()

const handleSubmit = (evt) => {
evt.preventDefault()
const id = user._id
const link = {linkName, linkURL}
axios.patch("/api/addDashboardLink", {link, id})
.then(
    setLinkName(""),
    setLinkURL(""),
    setLinkAdded(true)
)
}


let pageDisplay
if(!linkAdded){
    pageDisplay=
    <form onSubmit={handleSubmit} className='formContainer'>
    <input type="text" value={linkName} onChange={(evt) => setLinkName(evt.target.value)} className='formInput' placeholder='Enter the name of the website'/>
    <input type="text" value={linkURL} onChange={(evt) => setLinkURL(evt.target.value)} className='formInput' placeholder='Enter the URL of the website'/>
    <input type="submit" value="Submit" />
</form>
} else {
    pageDisplay=
    <div className='resetFormContainer'>
        <button onClick={(evt) => setLinkAdded(false)} className="formButton">Add Another Link?</button>
        <button onClick={(evt) => navigate("/")} className="formButton">Home</button>
    </div>
}




   return (
<div className="pageContainer">
    <h1>Add Details</h1>
 {pageDisplay}
</div>
   )
}

export default AddDashboardDetails


