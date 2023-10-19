import React from "react";
import Modal from "../../images/modal.svg";
import Prompt from "./Prompt";

const SelectMYW = ({ formData, handleChange, nextStep }) => {
  const handleClick = (event) => {
    Array.from(document.querySelectorAll('.figure')).forEach(item => item.classList.remove('active'))
    event.currentTarget.classList.add('active');
  };
  return (
    <div className="screen screen2">
      <h2>Make your wish</h2>
      <div className="chooseModalWrap">
        <div onClick={handleClick} className="figure fig1">
          <img src={Modal} alt="modal" />
          <p>Continue with this texture</p>
        </div>
        <div onClick={handleClick} className="figure fig2">
          <img src={Modal} alt="modal" />
          <p>Continue with this Boats</p>
        </div>
        <div onClick={handleClick} className="figure fig3">
          <img src={Modal} alt="modal" />
          <p>Continue with this Rockets</p>
        </div>
      </div>
      <div className="regenerate">
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.3068 7.1999C18.6388 4.33046 15.5213 2.3999 11.9507 2.3999C7.90235 2.3999 4.43643 4.88171 3.00539 8.3999M17.3769 8.3999H22.2002V3.5999M3.69364 16.7999C5.36157 19.6693 8.47907 21.5999 12.0497 21.5999C16.098 21.5999 19.564 19.1181 20.995 15.5999M6.62347 15.5999H1.80019V20.3999"
              stroke="#343434"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Regenerate
        </button>
      </div>
      <div className="promptBar">
        <div className="promptBarWrap">
          <Prompt
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectMYW;
