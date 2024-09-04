import {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
// import "./createDiscoveryEntry.css"
import {UserContext} from "./UserContext";
import axios from 'axios'

const CreateCodeEntry = () => {

    const [codeURL, setCodeURL] = useState("")
    const [photoURL, setPhotoURL] = useState("")
    const [codeTitle, setCodeTitle] = useState("")
    const [codeBlurb, setCodeBlurb] = useState("")
    const [codeCategory, setCodeCategory] = useState("")
    const [file, setFile] = useState("")
      
    const [entryCreated, setEntryCreated] = useState(false)
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext);

const handleSubmit = () => {
    console.log(":submitted")

    const userId = user._id
    let website = {codeTitle, codeURL, codeBlurb, codeCategory, photoURL}
    console.log("website" + website)
    axios.patch("/api/addWebsite", {website, userId })
    .then(response => setUser(prevState => ({...prevState,  coding: response.data})))
    .then(setEntryCreated(true))
    .catch(err => alert("There was an error -" + err))
}


useEffect(() => {
    if(file) {
        console.log("file uploading")
        let url="/api/codingPhotoUpload"  

        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(url, formData, config)
        .then(response => setPhotoURL(response.data))
    }
}, [file]);

  
 let pageDisplay = ""
  if(!entryCreated){
    pageDisplay = 
    <div className="addBlogPostContainer">

        <div className="addBlogPostHeading">
            <h1>Add Website</h1>
        </div> 

    
        <form onSubmit={handleSubmit} className="addBlogItemForm" encType="multipart/form-data">
    
                <label htmlFor="codeTitle" className="blogFormLabel">Website Title</label>
                <input type="text" id="codeTitle" name="codeTitle" value={codeTitle} onChange={(evt) => setCodeTitle(evt.target.value)} className="blogPostTitleInput" placeholder="Enter the name of the website"/>
              
                <label htmlFor="codeTitle" className="blogFormLabel">Website Category</label>
                <select style={{height: "2rem"}} id="codeTitle" name="codeTitle" value={codeCategory} onChange={(evt) => setCodeCategory(evt.target.value)} className="blogPostTitleInput">
                    <option value="" disabled={true}>Select a category</option>
                    <option value="Research Tools">Research Tools</option>
                    <option value="Science Resources">Science Resources</option>
                    <option value="General">General</option>
                </select>


                <label htmlFor="codeURL" className="blogFormLabel">Website URL</label>
                <input type="text" id="codeURL" name="codeURL" value={codeURL} onChange={(evt) => setCodeURL(evt.target.value)} className="blogPostTitleInput" placeholder="URL of website"/>

                <label htmlFor="codeBlurb" className="blogFormLabel">Blurb</label>
                <textarea id="codeBlurb" name="codeBlurb" value={codeBlurb} onChange={(evt) => setCodeBlurb(evt.target.value)} rows={4} cols={50} />
           
                
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <div className="uploadForm">
                        <label htmlFor="documentUpload">Upload photo for this website</label>
                        <input type="file" className="uploadFileInput" name="documentUpload" onChange={(evt) => setFile(evt.target.files[0])}/>
                    </div>
                 
                </div>
                
                <input className="blogPostAddButton" type="submit" value="Submit"/>
                
    </form>
    </div>
    } else if (entryCreated){
        alert("Code Entry Created")
        navigate("/")
        
    } 

    return(
       <div>
       {pageDisplay} 
       </div> 
    )
}

export default CreateCodeEntry