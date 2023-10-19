import React from "react";
import Modal from "../../images/modal.svg";
import ModalCloth from "../../images/modal-cloth.svg";
import { MoodBadOutlined } from "@material-ui/icons";
import ModalTags from "../MultiStepForm/ModalTags";
import Prompt from "../MultiStepForm/Prompt";

const MakeYourWish = ({ formData, handleChange, nextStep }) => {
  console.log(formData.step === 4);
  return (
    <div className="screen screen2">
      <h2>Make your wish</h2>
      <figure>
        <img src={formData.step === 4 ? ModalCloth : Modal} alt="modal" />
      </figure>
      {formData.step === 4 ? <div className="happyWithDesign"><span>Happy with your design?</span><button>I'm done</button></div> : ""}

      <div className="promptBar">
        <ModalTags />

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

export default MakeYourWish;
