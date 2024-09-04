import { useNavigate } from "react-router-dom"

const Admin = () => {
const navigate = useNavigate()
const handleAddPapers = () => {
   navigate("/admin/add-publications")
}

const handleBooksUpload = () => {
    navigate("/admin/upload-books")
 }

 const handleDiscoveryUpload = () => {
    navigate("/admin/upload-discoveries")
 }

 const handleEditCurrentBooks = () => {
   navigate("/admin/current-reading-edit")
}

const handleAddCurrentBooks = () => {
   navigate("/admin/current-reading-add")
}

const handleWebsites = () => {
   navigate("/admin/add-websites")
}

    return(
        <div>
<h1>Dssh</h1>
<button onClick={() => navigate("/register")}>Register</button>
<button onClick={handleAddPapers}>Add papers</button>
<button onClick={handleBooksUpload}>Upload Books List</button>
<button onClick={handleDiscoveryUpload}>Upload Discoveries</button>
<button onClick={handleWebsites}>Add a website</button>
<button onClick={handleAddCurrentBooks}>Add to current reading list</button>
<button onClick={handleEditCurrentBooks}>Edit current reading list</button>
</div>
    ) 

}
export default Admin