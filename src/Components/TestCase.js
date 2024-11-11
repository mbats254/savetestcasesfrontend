import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState(null);
  const [testResult, setTestResult] = useState(""); // test result state
  const [data, setData] = useState([]);

  // Get the test result from localStorage if it exists
  useEffect(() => {
    const savedResult = localStorage.getItem(`testResult_${id}`);
    if (savedResult) {
      setTestResult(savedResult);
    }

    fetch("/data/data_with_ids.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);

        const item = jsonData.find((item) => item.id === parseInt(id));

        if (item) {
          const filteredItem = Object.fromEntries(
            Object.entries(item).filter(
              ([key, value]) => value !== "TEST" && value !== "FAIL"
            )
          );
          setItemDetails(filteredItem);

          // Check if Pass/Fail is not empty or null
          if (item["Pass/Fail"] && item["Pass/Fail"].trim() !== "") {
            setTestResult(`The result is: ${item["Pass/Fail"]}`);
          }
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleTestCaseResult = (result) => {
    const resultText = `The result is: ${result}`;
    setTestResult(resultText);

    // Save the result in localStorage so it persists across page refreshes
    localStorage.setItem(`testResult_${id}`, resultText);

    const updatedData = data.map((item) => {
      if (item.id === parseInt(id)) {
        return { ...item, "Pass/Fail": result === "Passed" ? "Pass" : "Fail" };
      }
      return item;
    });

    setData(updatedData);

    // Send updated data to the backend
    fetch(`http://127.0.0.1:8000/test/testcases/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pass_fail: result === "Passed" ? "Pass" : "Fail" }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Test result updated successfully on the backend");
        } else {
          console.error("Error updating test result on the backend");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleNavigation = (direction) => {
    // Reset test result before navigating
    setTestResult("");
    localStorage.removeItem(`testResult_${id}`); // Remove the test result from localStorage before navigation

    const currentIndex = data.findIndex((item) => item.id === parseInt(id));
    const nextIndex =
      direction === "next"
        ? currentIndex + 1 < data.length
          ? currentIndex + 1
          : currentIndex
        : currentIndex - 1 >= 0
        ? currentIndex - 1
        : currentIndex;

    const nextId = data[nextIndex]?.id;
    if (nextId) {
      navigate(`/test/case/${nextId}`);
    }
  };

  // Navigate to the Add Test Case page
  const handleAddTestCase = () => {
    navigate("/test/case/add");
  };

  // Navigate to the Edit Test Case page
  const handleEditTestCase = () => {
    navigate(`/test/case/edit/${id}`);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        {/* Add New Test Case Button */}
        <button
          onClick={handleAddTestCase}
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            padding: "10px 20px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Add New Test Case
        </button>

        {/* Edit Test Case Button */}
        <button
          onClick={handleEditTestCase}
          style={{
            backgroundColor: "orange",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Edit Test Case
        </button>
      </div>

      {itemDetails ? (
        <div>
          <h2>Details for ID: {id}</h2>

          {itemDetails.__EMPTY && <h3>{itemDetails.__EMPTY}</h3>}
          {itemDetails["Test Case"] && <h3>{itemDetails["Test Case"]}</h3>}

          <div>
            <h4>Pre-condition:</h4>
            <p>{itemDetails["Pre-condition"]}</p>
          </div>

          <div>
            <h4>Test Steps:</h4>
            <p>{itemDetails["Test Steps"]}</p>
          </div>

          <div>
            <h4>Test Data:</h4>
            <p>{itemDetails["Test Data"]}</p>
          </div>

          <div>
            <h4>Expected Result:</h4>
            <p>{itemDetails["Expected Result"]}</p>
          </div>

          {/* Only display test result if it's not empty */}
          {testResult.trim() !== "" && <h4>{testResult}</h4>}

          <div>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px 20px",
                margin: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleTestCaseResult("Failed")}
            >
              Failed
            </button>
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "10px 20px",
                margin: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleTestCaseResult("Passed")}
            >
              Passed
            </button>
          </div>

          <div>
            <button
              onClick={() => handleNavigation("prev")}
              style={{
                backgroundColor: "lightgray",
                color: "black",
                border: "none",
                padding: "10px 20px",
                margin: "10px",
                cursor: "pointer",
              }}
            >
              &lt; Previous
            </button>
            <button
              onClick={() => handleNavigation("next")}
              style={{
                backgroundColor: "lightgray",
                color: "black",
                border: "none",
                padding: "10px 20px",
                margin: "10px",
                cursor: "pointer",
              }}
            >
              Next &gt;
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailPage;
