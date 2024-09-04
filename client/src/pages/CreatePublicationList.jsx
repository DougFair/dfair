import React, { useState, useEffect, useContext } from "react";
import { GetPapersLocal } from "./GetPapersLocal";
import axios from "axios";
import {AuthContext} from "./AuthContext"
import AddPublicationDisplay from "../components/AddPublicationDisplay";

import { useNavigate } from "react-router-dom";
import "./CreatePublicationList.css";

// import dayjs from 'dayjs'

const CreatePublicationList = () => {  
  // const loginStaffMember = useSelector(state => state.allStaff.loginStaffMember);
  const [pubmedName, setPubmedName] = useState("");
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pubIds, setPubIds] = useState([])
  const [paperList, setPaperList] = useState([]);
  const [allCategories, setAllCategories] = useState([])
  const [userPapers, setUserPapers] = useState([])
  

  const user = useContext(AuthContext)

  const claimPaper = (paperId) => {
    const checkPaperPresent = userPapers?.findIndex(paper => paper.id === paperId)
if (checkPaperPresent > -1) {
  alert("You already have this paper in your list")
  return
} else {
    const paperToAdd = paperList.filter((paper) => paper.id === paperId)
    const idx = paperList.findIndex((paper) => paper.id === paperId);
    let newPaperList = [...paperList]
    let listItem = paperList[idx];
    if (!paperList[idx].claimed) {
      listItem.claimed = true;
      newPaperList[idx] = listItem;
    } else {
      listItem.claimed = false;
      newPaperList[idx] = listItem;
    }

    setPaperList(newPaperList);
    setUpdated(true)
  }
  };

  const addTag = (paperId, name) => {
    const idx = paperList.findIndex((paper) => paper.id === paperId);
    let newPaperList = [...paperList];
    let listItemTags = paperList[idx].tags;

    if (listItemTags.length) {
      let listItemTagValues = listItemTags.map((tag) => tag.tagName);
      if (!listItemTagValues.includes(name.tagName)) {
        listItemTags.push(name);
      } else {
        listItemTags = listItemTags.filter(
          (tag) => tag.tagName !== name.tagName
        );
      }
    } else {
      listItemTags.push(name);
    }
    newPaperList[idx].tags = listItemTags;
    setPaperList(newPaperList);
  };


  const addCategory = (paperId, category) => {
    const idx = paperList.findIndex((paper) => paper.id === paperId);
    let newPaperList = [...paperList];
    let listItemCategories = paperList[idx]?.categories || []

    if (listItemCategories.length) {

      if (!listItemCategories.includes(category)) {
    
        listItemCategories.push(category);
      } else {

      alert("Category already exists")
      }
    } else {

      listItemCategories.push(category);
    }

    newPaperList[idx].categories = listItemCategories;
    if(!allCategories.includes(category)) setAllCategories([...allCategories, category])
    setPaperList(newPaperList);
  };


  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    const newPaperList = async () => GetPapersLocal(pubmedName);
    newPaperList().then((value) => {
      if (value.length && value !== "lengthError") {
        value.sort((a, b) => b.id - a.id);
        setPaperList(value);
        setLoading(false);
      } else if (value === "lengthError") {
        alert("Too many papers retrieved. Try to narrow the search dates");
        setPubmedName("");
        setLoading(false);
      } else {
        alert(
          "No publications identified with those parameters. Enter another search name or seatch start data"
        );
        setPubmedName("");
        setLoading(false);
      }
    });
  };


  const handleSubmitPublications = (evt) => {
    evt.preventDefault();
    setLoading(true);
    let publicationList = paperList.filter((paper) => paper.claimed);
    publicationList.forEach((pub, idx) => {
    axios
      .patch("/api/addPublications", { pub, id:user.auth.userId })
      .then(() => {
        if (idx === publicationList.length-1) {
          setLoading(false)
        }})
      .catch((err) => console.log(err));
  })
};


useEffect(() => {
  if(!userPapers.length){
    const id = user.auth.userId
    axios.get(`/api/getPapers/${id}`).then(response =>  {
      let newCategories
      response.data.forEach(paper => {
        setUserPapers(response.data) 
      })
    })
  }
}, []);


useEffect(() => {
  if(userPapers.length){
   let newCats = []   
    userPapers.forEach(paper => {
      if(paper.categories){
        newCats = [...newCats, ...paper.categories]
      }
    })
    setAllCategories([...new Set(newCats)])
  }
}, [userPapers]);




  let pageDisplay = "";
  if (!loading) {
    pageDisplay = (
      <>
        {!paperList.length ? (
          <div className="searchFormContainer">
            <div className="searchPubsSubHeadings">
              <p className="searchSubheading">
                Enter your search details to retrieve your ONJCRI papers
              </p>
              <p className="searchSubheadingAffiliation">
                Check "Search all affiliations" if you think your papers could
                have issues with your ONJCRI affiliation spelling, listing etc.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="publicationSearchForm">
              <div className="formLabelInput">
                <label className="createPublicationFormLabel">
                  Pubmed search name
                </label>
                <input
                  required
                  type="text"
                  className="formInput"
                  value={pubmedName}
                  placeholder="Enter as for Pubmed e.g. Smith AB"
                  onChange={(evt) => setPubmedName(evt.target.value)}
                />
              </div>

              <div className="formLabelInput">
                <label className="createPublicationFormLabel">
                  Search Start Date (defaults to your ONJCRI start date)
                </label>
              </div>

              <input
                type="submit"
                value="Fetch papers..."
                className="createPubsSubmitButton"
              />
            </form>
          </div>
        ) : null}

        {paperList.length ? (
          <div className="publicationsDisplayContainer">
            <p className="searchSubheading2">
              Claim and tag any papers you want to appear in your publication
              list.{" "}
            </p>
            <p className="searchSubheading3">
              Hit submit at the bottom of the page to create the list.
            </p>
            <AddPublicationDisplay
              paperList={paperList}
              claimPaper={claimPaper}
              addTag={addTag}
              pubIds={pubIds}
              addCategory = {addCategory}
              allCategories = {allCategories}
            />
            <form onClick={handleSubmitPublications}>
              <input
                type="submit"
                value="Submit"
                className="createPubsSubmitButton"
              />
            </form>
          </div>
        ) : <p>Loading...</p>}
      </>
    );
  } else if (updated) {
    navigate("./admin");
  }

  return <div className="createPublicationsContainer">{pageDisplay}</div>;
};

export default CreatePublicationList;
