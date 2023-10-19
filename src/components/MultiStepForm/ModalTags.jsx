import React, { useState, useRef } from "react";

const ModalTags = () => {
  const [selectedText, setSelectedText] = useState("");
  const [elements, setElements] = useState([
    { text: "Hat", selected: false },
    { text: "Jacket", selected: false },
    { text: "Boots", selected: false },
    { text: "1", selected: false },
    { text: "2", selected: false },
    { text: "3", selected: false },
    { text: "Hat", selected: false },
    { text: "Jacket", selected: false },
    { text: "Boots", selected: false },
  ]);

  const [scrollIndex, setScrollIndex] = useState(0);
  const containerRef = useRef(null);

  const handleElementClick = (index) => {
    if (!elements[index].selected) {
      elements[index].selected = true;
      setElements([...elements]);
      const selectedItems = elements
        .filter((element) => element.selected)
        .map((element) => element.text);

      setSelectedText(selectedItems.join(", "));
    }
  };

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const newScrollIndex = scrollIndex + direction;
      if (newScrollIndex >= 0 && newScrollIndex <= elements.length - 4) {
        setScrollIndex(newScrollIndex);
      }
    }
  };

  return (
    <div>
      <div className="tagsWrapper">
        <ul ref={containerRef}>
          {elements.map((element, index) => (
            <li style={{display:index >= scrollIndex && index < scrollIndex + 4 ? "inline":"none",} } className={element.selected ? "active":""} key={index} onClick={() => handleElementClick(index)} >
              {element.text}
            </li>
          ))}
        </ul>
        {elements.length > 4 && (
          <div className="controller">
            <button  disabled={scrollIndex === 0} onClick={() => handleScroll(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><line x1="19" y1="12" x2="5" y2="12" /> <polyline points="12 19 5 12 12 5" /> </svg>
            </button>
            <button  disabled={scrollIndex === elements.length - 4} onClick={() => handleScroll(1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <line x1="5" y1="12" x2="19" y2="12" /> <polyline points="12 5 19 12 12 19" /> </svg>
            </button>
          </div>
        )}
      </div>
      <p>You are currently generating the {selectedText}</p>
    </div>
  );
};

export default ModalTags;
