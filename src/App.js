import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Input route headers
import ExcelReader from "./Components/ExcelReader";
import DetailPage from "./Components/TestCase";
import TestCaseForm from "./Components/TestCaseForm";
import DownloadButton from "./Components/Index";

const App = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true, // Opting in for React Router v7's startTransition feature
      }}
    >
      <Routes>
        {/* Input routes */}
        <Route path="" element={<DownloadButton />} />
        <Route path="upload/test/cases" element={<ExcelReader />} />
        <Route path="test/case/:id" element={<DetailPage />} />
        {/* New route for editing or creating test case */}
        <Route path="test/case/edit/:id?" element={<TestCaseForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
