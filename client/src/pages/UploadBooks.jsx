import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as xlsx from "xlsx";
import { useNavigate } from "react-router-dom";


import "./UploadBooks.css";
import { handleBooksUpload } from "./uploadSpreadsheets";
import {AuthContext} from "./AuthContext"

const UploadBooks = (props) => {
  const [workBook, setWorkBook] = useState("");

  const [booksUploadData, setBooksUploadData] = useState([]);
  const [booksUploaded, setBooksUploaded] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  // const staffMemberId = useSelector(state => state.allStaff.loginStaffMember)
  const user = useContext(AuthContext)
  const handleFileDataUpload = (evt) => {
    setFile(evt.target.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(evt.target.files[0]);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = xlsx.read(bufferArray, { type: "buffer" });
      setWorkBook(wb);
    };
  };

  const uploadSpreadsheets = (evt) => {
    evt.preventDefault();
    const setBooks = async () => {
      const booksData = await handleBooksUpload(workBook);
      if (!booksData.length) {
        alert("There are no books in the list");
      } else {
        setBooksUploadData(booksData);
        setUploaded(true);
      }
    };
    setBooks();
  };

  useEffect(() => {
    if (booksUploadData.length) {
      axios
        .patch("/api/uploadBooksList", {
          id: user.auth.userId,
          books: booksUploadData,
        })
        .then((response) => setBooksUploaded(true));
    }
  }, [uploaded]);

  // useEffect(() => {
  //   if (internalUploaded && grantUploaded && studentUploaded && industryUploaded && patentUploaded && clinicalUploaded && engagementUploaded) {
  //     alert("Data has been uploaded")
  //     setLoading(true);
  //     dispatch(staffActions.updateLoggedInUser(staffMemberId._id))
  //       .then(() => setLoading(false))
  //       .then(() => setReduxReset(true));
  //   }
  // }, [internalUploaded, grantUploaded, studentUploaded, industryUploaded, patentUploaded, clinicalUploaded, engagementUploaded]);

  let pageDisplay;

  if (loading) {
    pageDisplay = (
      <div className="loaderContainer">
        {/* <Loader
          type="ThreeDots"
          color="#2ca3da"
          height={80}
          width={80}
          className="loader"
        /> */}
        <h1 className="loaderLabel">Uploading Data...</h1>
      </div>
    );
  } else if (!booksUploaded) {
    pageDisplay = (
      <div className="uploadDataContainer">
        <h1 className="uploadHeader">Upload Book List</h1>
        <p className="uploadInstructions">
          Select your Excel file containing your data.
        </p>
        <p className="uploadInstructions">then "Upload" when prompted</p>
        <form className="uploadForm" onSubmit={uploadSpreadsheets}>
          <input
            type="file"
            onChange={handleFileDataUpload}
            className="fileInput"
          />
          {file && (
            <input className="fileSubmitButton" type="submit" value="Upload" />
          )}
        </form>
      </div>
    );
  } else if (booksUploaded) {
    navigate("/");
  }
  return pageDisplay;
};

export default UploadBooks;
