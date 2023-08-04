import React, { useState } from "react";
import Register from "./Register";
import Viewletter from "./Viewletter";

function Coverletterparent({ onFormSubmit }) {
  const [formData, setFormData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmit = (formData) => {
    setFormData(formData);

    setFormSubmitted(true);
    onFormSubmit(formData);
  };

  return (
    <div>
      <Register onFormSubmit={handleFormSubmit} />{" "}
      {formSubmitted && (
        <div>
          <Viewletter formData={formData} />{" "}
        </div>
      )}{" "}
    </div>
  );
}

export default Coverletterparent;
