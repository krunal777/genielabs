import React, { useState } from "react";

const Prompt = ({ formData, handleChange, prevStep, nextStep }) => {
  const [isInputFocused, setInputFocused] = useState(false);

  const handleFocus = () => {
    setInputFocused(true);
    Array.from(document.querySelectorAll(".screen figure")).forEach(item => item.classList.add('blur'))
  };

  const handleBlur = () => {
    setInputFocused(false);
    Array.from(document.querySelectorAll(".screen figure")).forEach(item => item.classList.remove('blur'))
  };
  return (
    <div className="promptInput">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Furry purple jacket with green stripes"
      />
      <button onClick={nextStep}>Create the magic!</button>
    </div>
  );
};

export default Prompt;
