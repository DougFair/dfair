import * as xlsx from "xlsx";

export const handleBooksUpload = (workBook) => {
  console.log("sheets");
  const ws = workBook.Sheets["Books"];
  const data = xlsx.utils.sheet_to_json(ws);
  console.log("data" + JSON.stringify(data));
  return data;
};
