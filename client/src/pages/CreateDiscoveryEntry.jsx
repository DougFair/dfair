import {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import "./createDiscoveryEntry.css"
import {UserContext} from "./UserContext";
import axios from 'axios'

const CreateDiscoveryEntry = () => {

    const [discoveryYear, setDiscoveryYear] = useState("")
    const [discoveryTitle, setDiscoveryTitle] = useState("")
    const [discoveryBlurb, setDiscoveryBlurb] = useState("")
    const [discoveryPictureURL, setDiscoveryPictureURL] = useState("")
    const [paperURL, setPaperURL] = useState("")
    const [file, setFile] = useState("")

    const [fileUploaded, setFileUploaded] = useState(false)
    const [entryCreated, setEntryCreated] = useState(false)
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext);

const handleSubmit = () => {
  
    const id = user._id
    let discovery = {discoveryYear, discoveryTitle, discoveryBlurb, discoveryPictureURL, paperURL}
    console.log("submissiomn")
    axios.patch("/api/addDiscovery", {discovery, id })
    .then(setEntryCreated(true))
    .catch(err => console.log(err))
}

useEffect(() => {
    if(file) {
        let url="/api/discoveryPhotoUpload"  

        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(url, formData, config)
        .then(response => setDiscoveryPictureURL(response.data))
    }
}, [file]);

  
 let pageDisplay = ""
  if(!entryCreated){
    pageDisplay = 
    <div className="addBlogPostContainer">

        <div className="addBlogPostHeading">
            <h1>Enter DiscoveryDeatils</h1>
        </div> 

    
        <form onSubmit={handleSubmit} className="addBlogItemForm" encType="multipart/form-data">
    
                <label htmlFor="discoveryTitle" className="blogFormLabel">Title</label>
                <input type="text" id="discoveryTitle" name="discoveryTitle" value={discoveryTitle} onChange={(evt) => setDiscoveryTitle(evt.target.value)} className="blogPostTitleInput" placeholder="Enter the event associated with the photo"/>
              
                <label htmlFor="discoveryYear" className="blogFormLabel">Year</label>
                <input type="text" id="discoveryYear" name="discoveryYear" value={discoveryYear} onChange={(evt) => setDiscoveryYear(evt.target.value)} className="blogPostTitleInput" placeholder="Year of publication for discovery?"/>

                <label htmlFor="paperURL" className="blogFormLabel">Paper URL</label>
                <input type="text" id="paperURL" name="paperURL" value={paperURL} onChange={(evt) => setPaperURL(evt.target.value)} className="blogPostTitleInput" placeholder="URL of publication for discovery?"/>

                <label htmlFor="discoveryBlurb" className="blogFormLabel">Blurb</label>
                <textarea id="discoveryBlurb" name="discoveryBlurb" value={discoveryBlurb} onChange={(evt) => setDiscoveryBlurb(evt.target.value)} rows={4} cols={50} />
           
                
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <div className="uploadForm">
                        <label htmlFor="documentUpload">Upload photo for this discovery</label>
                        <input type="file" className="uploadFileInput" name="documentUpload" onChange={(evt) => setFile(evt.target.files[0])}/>
                    </div>
                 
                </div>
                
                <input className="blogPostAddButton" type="submit" value="Submit"/>
                
    </form>
    </div>
    } else if (entryCreated){
        alert("Photo Created")
        navigate("/")
        
    } 

    return(
       <div>
       {pageDisplay} 
       </div> 
    )
}

export default CreateDiscoveryEntry