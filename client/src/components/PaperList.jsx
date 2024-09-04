const PaperList = (myObj) => {
 
    let paperList = []
    Object.keys(myObj).forEach(key => {
        let paperObj = {}
        if (key !== "uids") {
        let id = myObj[key].uid
        let title = myObj[key].title
        let  journal = myObj[key].fulljournalname
        let  volume = myObj[key].volume
        let  pages = myObj[key].pages
        let  doi = myObj[key].elocationid
        let  authors = myObj[key].authors
        let  pubdate = myObj[key].pubdate.slice(0,4)
            

        let authorList = []
        
        authors.map((author, idx) => {
          if (idx > 0 && idx < 30){
            return(
          authorList.push(" " + author.name)
            )
         } else if (idx === 0) {
          return(
           authorList.push(author.name)
          )
         } else if (idx === 30) {
           return(
          authorList.push(" et al.")
           )
         } else return null
        })

      paperObj.id = id;
      paperObj.title = title;
      paperObj.journal = journal;
      paperObj.volume = volume;
      paperObj.pages = pages;
      paperObj.authors = authorList.toString();
      paperObj.doi = doi;
      paperObj.pubdate = pubdate;
      paperObj.tags=[]
      paperObj.categories=[]
      paperList.push(paperObj)
      }})

      return paperList

}

export default PaperList