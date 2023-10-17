import React, { useState } from "react";

const Users = [
  {
    "id": 1,
    "character_name": "Rainbow",
  },
  {
    "id": 2,
    "character_name": "Lorem",
  },
  {
    "id": 3,
    "character_name": "Ipsum",
  },
  {
    "id": 4,
    "character_name": "Hulp",
  },
  {
    "id": 5,
    "character_name": "Travus",
  },
];


const ChooseCharecter = () => {
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleClick = (event) => {
    document.querySelectorAll('.char_box').classList.remove('active');
    event.currentTarget.classList.add('active');

  }

  return (
    <div className="screen">
      <div className="header">
        <h1>Start creating something cool!</h1>
      </div>
      <div className="sub-header">
        <h3>Choose the character you'd like to dress up</h3>
      </div>
      <div className="search-header">
        <input
          id="search-box"
          placeholder="Know the character’s name?"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="wrap_charchter row">
        {Users.filter(user=>
          user.character_name.toLocaleLowerCase().includes(query)
        ).map((user) => (
          <div key={user.id} className="char_box col" onClick={handleClick} >
            <div className="char_img">
              <img src="../../../images/box_1.png" alt="" />
            </div>
            <div className="char_name">
              <h3>{user.character_name}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="start_btn_container">
        <button className="btn_black">
          I picked my character, Let’s continue
        </button>
      </div>
    </div>
  );
};

export default ChooseCharecter;
