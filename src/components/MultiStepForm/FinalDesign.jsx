import React from 'react'
import Modal from "../../images/modal.svg";
import ModalCloth from "../../images/modal-cloth.svg";
import { Link } from 'react-router-dom';

const FinalDesign = ({formData}) => {
  return (
    <div className="screen screen2">
      <h2>Your Design is ready</h2>
      <figure>
        <img src={formData.step === 5 ? ModalCloth : Modal} alt="modal" />
      </figure>

      <div className="btnFinalize">
        <button className="prev">Generate another one</button>
        <Link to={'/gallery'}>Go to gallary</Link>
      </div>
    </div>
  )
}

export default FinalDesign
