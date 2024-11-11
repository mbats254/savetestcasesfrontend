import React, { useState, useEffect } from "react";

const FormComponent = ({ fields, initialFormData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({});

  // Update formData when initialFormData changes
  useEffect(() => {
    if (initialFormData) {
        console.log(initialFormData);
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
   
        <div key={field.name}>
          <label>{field.label}:</label>
          {field.type === "textarea" ? (
            
            <textarea
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <div>
        <button type="submit">{formData.id ? "Update" : "Create"}</button>
      </div>
    </form>
  );
};

export default FormComponent;
