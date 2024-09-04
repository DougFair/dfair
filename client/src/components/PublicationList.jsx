import { useState, useEffect, useContext } from "react";
import {UserContext} from "../pages//UserContext";
import axios from "axios";
import "./PaperList.css";
import PublicationListFilter from "./PublicationListFilter"

const PublicationList = () => { 
    const [userPapers, setUserPapers] = useState([])
    const [selectedPapers, setSelectedPapers] = useState([])
    const [allTags, setAllTags]= useState([])
    const [allCategories, setAllCategories] = useState([])
    const { user, setUser } = useContext(UserContext);




const handleFilterTag = (selectedTag) => {
 
  const filteredPapers = userPapers.filter(paper => paper.tags.some(tag => tag.tagName === selectedTag))

  setSelectedPapers(filteredPapers)
}

const handleFilterCategory = (category) => {
  console.log("categorjorjro" + category)
  const filteredPapers = userPapers.filter(paper => paper?.categories?.some(cat => cat === category))
  console.log("filterd" + filteredPapers)
  setSelectedPapers(filteredPapers)
}

useEffect(() => {
    if(!userPapers?.length){
      const id = user._id
  
      axios.get(`/api/getPapers/${id}`).then(response =>  {
      
        response.data.forEach(paper => {
          setUserPapers(response.data) 
        })
      })
    }
  }, []);

  useEffect(() => {
    if(userPapers?.length){
     let newCats = [] 
     let newTags = []  
      userPapers.forEach(paper => {
        if(paper?.tags?.length){     
          newTags = [...newTags, ...paper.tags]
          let jsonObj = newTags.map(JSON.stringify)
          let uniqueSet =  new Set(jsonObj)
          let uniqueArray=Array.from(uniqueSet).map(JSON.parse)
          newTags = uniqueArray
        }
        if(paper?.categories?.length){   
          newCats = [...newCats, ...paper.categories]
        }
      })
      setAllTags(newTags)
      setAllCategories([...new Set(newCats)])
    }
  }, [userPapers]);



  let listDisplay = "";

  if (userPapers?.length) {
let papersToDisplay
    if (selectedPapers.length) {
      papersToDisplay = selectedPapers
    } else {
      papersToDisplay = userPapers
    }


    listDisplay = papersToDisplay.map((data) => {
      let volume = "";
      if (data.volume === "") {
        volume = " volume/pages not yet available";
      } else {
        volume = `${data.volume}: `;
      }

      return (
        <div className="paperlistItem" key={data.id}>
          <span className="paperDetailsSpan">
            <span className="title">{`${data.title} `}</span>
            <span className="authors">{`${data.authors}, `}</span>
            <span className="year">{`(${data.pubdate}), `}</span>
            <span className="journal">{`${data.journal},  `}</span>
            <span className="volume">{`${volume} `}</span>
            <span className="pages">{`${data.pages},  `}</span>
            <span className="doi">{`${data.doi}, `}</span>
            <span className="pmid">
              PMID:{" "}
              <a
                href={`https://www.ncbi.nlm.nih.gov/pubmed/${data.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.id}.
              </a>
            </span>
          </span>
          <div className="categoriesContainer">

          <span className="tagSpan">
          {data?.tags?.length ?
          data.tags.map(tag => <span className={tag.style} key={tag.tagName}>{tag.tagName}</span>
            ) : null}
            </span>


{/* 
       {data?.tags?.length?       
       <div className="categoryList">
         <p>Categories:</p>
        {data.categories?.map((cat) => <p key={data.id}className="categoryItem">{cat}</p>)}
         </div>
      : null
      } */}
    </div>
      <div className="categoriesContainer">
       {data?.categories?.length?       
       <div className="categoryList">
         <p>Categories:</p>
        {data.categories?.map((cat) => <p key={data.id}className="categoryItem">{cat}</p>)}
         </div>
      : null
      }
    </div>
</div>
    );
  });
}


  return <div className="paperListContainer">
    <h1>Publications</h1>
   <PublicationListFilter
    allTags={allTags}
    allCategories={allCategories} 
    handleFilterTag={handleFilterTag} 
    handleFilterCategory={handleFilterCategory}
    />
    {listDisplay}
    </div>;
};

export default PublicationList;
