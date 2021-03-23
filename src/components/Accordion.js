import React, { useState } from "react";

// note that the items prop is named
const Accordion = ({ items }) => {
  // array destructuring syntax: assigns first and second element to the vars
  // activeIndex (value) and setActiveIndex (function to update state)
  // useState takes the initial value of activeIndex
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

  // index arg is the second arg to the map function
  const renderedItems = items.map((item, index) => {
    const active = index === activeIndex ? "active" : "";

    return (
      // remember every top level element in a jsx list should have a key
      <React.Fragment key={item.title}>
        {/* use arrow func for onTitleClick because
        we don't want to invoke it until event; with args it looks invok-able 
        otherwise with no args we can just pass in the function pointer */}
        <div onClick={() => onTitleClick(index)} className={`title ${active}`}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordion;
