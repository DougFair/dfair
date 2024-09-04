import {useState} from 'react'
import "./PublicationListFilter.css"
const PublicationListFilter = ({handleFilterTag, handleFilterCategory, allTags, allCategories}) => {
   
   
   const [tagValue, setTagValue] = useState("")
   const [categoryValue, setCategoryValue] = useState("")
   
   
    const handleTagChange = (evt) => {
    
        setTagValue(evt.target.value)
        handleFilterTag(evt.target.value)
    }

    const handleCategoryChange = (evt) => {
        setCategoryValue(evt.target.value)
        handleFilterCategory(evt.target.value)
    }

    return(
       
       <div>
        <form>
            <label>Filter by tags</label>
                <select value={tagValue} onChange={handleTagChange} className="dropdown">
                  <option value="" >No filter</option>
                    {allTags.map((tag) => {
                        
                        return (
            
                        <option value={tag?.tagName}>{tag.tagName}</option>
                        )
                    })
                }
                </select>
                </form>
                   <form>
                   <label>Filter by categories</label>
                       <select value={categoryValue} onChange={handleCategoryChange} className="dropdown">
                         <option value="" >No filter</option>
                           {allCategories.map((category) => {
                               
                               return (
                   
                               <option value={category}>{category}</option>
                               )
                           })
                       }
                       </select>
                       </form>
                       </div>
  
       
    )
}

export default PublicationListFilter