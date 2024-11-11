// src/ExcelReader.js
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExcelReader = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        // Add an `id` field to each row
        const dataWithIds = rows.map((row, index) => ({
          id: index + 1,
          ...row,
        }));

        setJsonData(dataWithIds); // Store the data in state
        downloadJson(dataWithIds); // Optionally download the modified JSON
      };
      reader.readAsArrayBuffer(file); // Read the file
    }
  };

  const downloadJson = (data) => {
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    saveAs(jsonBlob, "data_with_ids.json"); // Trigger file download
  };

  return (
    <div>
      <h2>Upload an Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {jsonData && (
        <p>JSON file with added IDs has been generated and downloaded.</p>
      )}
    </div>
  );
};

export default ExcelReader;
