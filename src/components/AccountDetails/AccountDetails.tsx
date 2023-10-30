import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface EditableInput {
  id: number;
  text: string;
  isEditing: boolean;
  type: string;
  label_text: string;
}

const EditableInputs: React.FC = () => {
  const [inputs, setInputs] = useState<EditableInput[]>([
    { id: 1, text: 'Rival Rides', isEditing: false , type: 'text', label_text:'Company name'},
    { id: 2, text: 'Johny', isEditing: false , type: 'text', label_text:'Your name'},
    { id: 3, text: 'Johny@rivalrides.mail', isEditing: false , type: 'email', label_text:'Email'},
    { id: 4, text: 'Optional', isEditing: false , type: 'tel', label_text:'Phone'},
    { id: 5, text: '1111 1111 1111 1111', isEditing: false , type: 'password', label_text:'Payment method'},
  ]);

  const handleEditClick = (id: number) => {
    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, isEditing: true } : input
    );
    setInputs(updatedInputs);
  };

  const handleSaveClick = (id: number) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, isEditing: false };
      }
      return input;
    });
    setInputs(updatedInputs);
  };

  const handleInputChange = (id: number, text: string) => {
    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, text } : input
    );
    setInputs(updatedInputs);
  };

  
  return (
    <div className='account_details white_box'>
      {inputs.map((input) => (
        <div key={input.id} className='box_list'>
          <label>{input.label_text}</label>  
          {input.isEditing ? (
            <div className='textbox_edit'>
              <div className='midd_col'>      
                <input
                    type={input.type}
                    value={input.text}
                    placeholder={input.text}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                />
              </div>
              <button onClick={() => handleSaveClick(input.id)} className='btn btn_save'>Save</button>
            </div>
          ) : (
            <div className='textbox_edit'>
              <div className='midd_col'>{input.text}</div>
              <button onClick={() => handleEditClick(input.id)} className='btn btn_edit'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M13.4487 6.95159L17.0487 10.5516M4.44873 19.5516L8.81472 18.6719C9.04649 18.6252 9.25931 18.511 9.42645 18.3438L19.2001 8.56477C19.6687 8.09591 19.6684 7.33592 19.1994 6.86746L17.129 4.79939C16.6602 4.33112 15.9006 4.33144 15.4322 4.8001L5.65749 14.5802C5.49068 14.7471 5.37678 14.9594 5.33003 15.1907L4.44873 19.5516Z" stroke="#343434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EditableInputs;


