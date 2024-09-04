import { useState } from "react";

import "./PublicationDisplay.css";

const AddPublicationDisplay = ({ paperList, claimPaper, addTag,pubIds, addCategory, allCategories }) => { 
const [addCat, setAddCat] = useState(false)
const [newCat, setNewCat] = useState("")



const handleNewCategory = (evt) => {
evt.preventDefault()
  alert("here")
  addCategory(newCat.id, newCat.category)
  setAddCat(false)
  setNewCat("")
}


  let listDisplay = "";

  if (paperList.length) {
    listDisplay = paperList.map((data) => {
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

          <div
            className={
              pubIds.includes(data.id)
                ? "checkInputTagsGroupClaimed"
                : "checkInputTagsGroup"
            }
          >
            {pubIds.includes(data.id) ? (
              <p className="claimedMessage">
                Paper is in your publication list.
              </p>
            ) : (
              <div className="tagInputLabel">
                <input
                  className="tagInput"
                  type="checkbox"
                  value={data.claimed}
                  checked={data.claimed}
                  onChange={() => claimPaper(data.id)}
                />
                <label>Claim</label>
              </div>
            )}
            {data.claimed ? (
              <div className="tagInputLabel">
                <input
                  className="tagInput"
                  name="First/Last Author"
                  type="checkbox"
                  value="firstLastAuthor"
                  checked={data.tags.some(
                    (el) => el.tagName === "First/Last Author"
                  )}
                  onChange={(evt) =>
                    addTag(data.id, {
                      style: evt.target.value,
                      tagName: evt.target.name,
                    })
                  }
                />
                <label>First/Last Author</label>

                <input
                  className="tagInput"
                  name="Corresponding Author"
                  type="checkbox"
                  value="coresponding"
                  checked={data.tags.some(
                    (el) => el.tagName === "Corresponding Author"
                  )}
                  onChange={(evt) =>
                    addTag(data.id, {
                      style: evt.target.value,
                      tagName: evt.target.name,
                    })
                  }
                />
                <label>Corresponding Author</label>

                <input
                  className="tagInput"
                  name="International Collaboration"
                  type="checkbox"
                  value="international"
                  checked={data.tags.some(
                    (el) => el.tagName === "International Collaboration"
                  )}
                  onChange={(evt) =>
                    addTag(data.id, {
                      style: evt.target.value,
                      tagName: evt.target.name,
                    })
                  }
                />
                <label>International Collaboration</label>

                <input
                  className="tagInput"
                  name="Clinical Trial"
                  type="checkbox"
                  value="clinical"
                  checked={data.tags.some(
                    (el) => el.tagName === "Clinical Trial"
                  )}
                  onChange={(evt) =>
                    addTag(data.id, {
                      style: evt.target.value,
                      tagName: evt.target.name,
                    })
                  }
                />
                <label>Clinical Trial</label>
              </div>
            ) : null}
          </div>
      
      {data?.claimed ?
      <div className="categoriesContainer">
      
       {data?.categories?.length? 
       
       <div className="categoryList">
         <p>Categories:</p>
        {data.categories.map((cat) => <p key={data.id}className="categoryItem">{cat}</p>)}
         </div>
      : null
      }

      {allCategories.length ? 
       <select onChange={(evt) => addCategory(data.id, evt.target.value)} className="categoryDropdown">
         <option>Select a category</option>
      {allCategories.map((cat) => {
        return (
      !data?.categories?.includes(cat) && <option  value={cat}>{cat}</option> 
      )}
    )}
      </select>  
    : null
    }
      {!addCat ?
        <button className="categoryButton" onClick={() => setAddCat(true)}>+ New Category</button>
      : <form onSubmit={handleNewCategory}>
        <input className="categoryInput" type="text" placeholder="Input New Category" onChange={(evt) => setNewCat({id: data.id, category: evt.target.value})}/>
        <input className="categoryInput" type="submit" value="Submit"/>
        </form>
      }


</div>
: null}

</div>
    );
  });
}


  return <div className="paperListContainer">{listDisplay}</div>;
};

export default AddPublicationDisplay;
