import { useState, useEffect, useContext } from "react";
import { UserContext } from "../pages/UserContext";
import axios from "axios";
import "./PublicationDisplay.css";
import PublicationListFilter from "./PublicationListFilter";

const PublicationList = () => { 
  const [userPapers, setUserPapers] = useState([]);
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const { user } = useContext(UserContext);

  const handleFilterTag = (selectedTag) => {
let papersToFilter = userPapers
if (selectedPapers.length) {
  papersToFilter = selectedPapers
}

    const filteredPapers = papersToFilter.filter(paper =>
      paper.tags?.some(tag => tag.tagName === selectedTag)
    );
    setSelectedPapers(filteredPapers);
  };

  const handleFilterCategory = (category) => {
    let papersToFilter = userPapers
if (selectedPapers.length) {
  papersToFilter = selectedPapers
}

    const filteredPapers = papersToFilter.filter(paper =>
      paper?.categories?.some(cat => cat === category)
    );
    setSelectedPapers(filteredPapers);
  };

  useEffect(() => {
    if (!userPapers?.length) {
      const id = user._id;
      axios.get(`/api/getPapers/${id}`).then(response => {
        setUserPapers(response.data);
      });
    }
  }, [userPapers?.length, user._id]);

  useEffect(() => {
    if (userPapers?.length) {
      let newCats = [];
      let newTags = [];

      userPapers.forEach(paper => {
        // Collect all tags
        if (paper?.tags?.length) {
          newTags = [...newTags, ...paper.tags];
          // remove duplicates
          const jsonObj = newTags.map(JSON.stringify);
          const uniqueSet = new Set(jsonObj);
          const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
          newTags = uniqueArray;
        }
        // Collect all categories
        if (paper?.categories?.length) {
          newCats = [...newCats, ...paper.categories];
        }
      });
      setAllTags(newTags);
      setAllCategories([...new Set(newCats)]);
    }
  }, [userPapers]);

  let listDisplay = "";

  if (userPapers?.length) {
    // Choose which papers to display
    const papersToDisplay = selectedPapers.length
      ? selectedPapers
      : userPapers;

    // Map over each paper to build the JSX
    listDisplay = papersToDisplay.map((data) => {
      let volume = data.volume
        ? `${data.volume}: `
        : " volume/pages not yet available";

      return (
        <div className="paperWrapper" key={data.id}>
          {/* Paper Info */}
          <div className="paperlistItem">
            <span className="paperDetailsSpan">
              <span className="title">{`${data.title} `}</span>
              <span className="authors">{`${data.authors}, `}</span>
              <span className="pubdate">{`(${data.pubdate}), `}</span>
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
          </div>

          {/* Tags */}
          {data?.tags?.length ? (
            <div className="tagContainer">
              <div className="categoryList">
                <p>Tags:</p>
                {data.tags.map((tag) => (
                  <p className={tag.style} key={tag.tagName}>
                    {tag.tagName}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          {/* Categories */}
          {data?.categories?.length ? (
            <div className="categoriesContainer">
              <div className="categoryList">
                <p>Categories:</p>
                {data.categories.map((cat) => (
                  <p key={cat} className="categoryItem">
                    {cat}
                  </p>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      );
    });
  }

  return (
    <div className="paperListContainer">
      <h1 className="paperListHeading">Publications</h1>
      <PublicationListFilter
        allTags={allTags}
        allCategories={allCategories}
        handleFilterTag={handleFilterTag}
        handleFilterCategory={handleFilterCategory}
      />
      {listDisplay}
    </div>
  );
};

export default PublicationList;
