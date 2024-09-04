import axios from "axios";
// import dayjs from 'dayjs'
import PaperList from "../components/PaperList";

export const GetPapersLocal = async (searchName) => {
  // const dateParams = dayjs(date).format("YYYY/MM/DD"
  const parametersEncoded = encodeURIComponent(`${searchName}[Author]`);

  // const parametersEncoded = encodeURIComponent(`(Olivia Newton-John Cancer Research Institute[Affiliation]`)
console.log(parametersEncoded)
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=10000&term=${parametersEncoded}&api_key=${import.meta.env.VITE_PUBMED_API_KEY}`;

  let list = [];

  const response = await axios.get(url);
console.log("response" + JSON.stringify(response))
  list = [...response.data.esearchresult.idlist];

  let idlistString = list.toString();

  if (!list.length) {
    return [];
  } else {
    if (list.length > 300) {
      return "lengthError";
    } else {
      let paperList = [];
      const response2 = await axios.get(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${idlistString}&api_key=${import.meta.env.VITE_PUBMED_API_KEY}`
      );
      // .then(response => paperList = PaperList(response.data.result))
console.log("list2" + response2.data.result)
      paperList = PaperList(response2.data.result);

      return paperList;
    }
  }
};
