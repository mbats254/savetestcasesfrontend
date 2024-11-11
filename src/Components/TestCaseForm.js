import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FormComponent from './FormComponent';

const TestCaseForm = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Fetch the test case data when an `id` is available
      axios.get(`http://127.0.0.1:8000/test/testcases/${id}/`)
        .then((response) => {
          setFormData(response.data); // Populate the form with the current test case data
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          console.error("Error fetching test case data:", error);
          setLoading(false); // Stop loading on error
        });
    } else {
      setLoading(false); // Stop loading if no `id`
    }
  }, [id]);

  const testCaseFields = [
    { name: "Test Case", label: "Test Case", type: "text" },
    { name: "Pre-condition", label: "Pre-condition", type: "text" },
    { name: "Test Steps", label: "Test Steps", type: "textarea" },
    { name: "Test Data", label: "Test Data", type: "textarea" },
    { name: "Expected Result", label: "Expected Result", type: "textarea" },
    { name: "Pass/Fail", label: "Pass/Fail", type: "text" },
  ];

  const handleSubmit = (formData) => {
    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://127.0.0.1:8000/test/testcases/${id}/`
      : "http://127.0.0.1:8000/test/testcases/";

    axios.request({
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    })
      .then((response) => {
        if (method === "POST") {
          navigate(`/test/case/${response.data.id}`);
        } else {
          console.log("Test case updated successfully");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div>
      <h2>{id ? "Edit Test Case" : "Create Test Case"}</h2>
      <FormComponent
        fields={testCaseFields}
        initialFormData={formData}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default TestCaseForm;
