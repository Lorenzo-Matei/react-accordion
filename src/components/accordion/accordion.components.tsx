import { useState } from "react";
import accordion_data from "../../../backend/data/accordion_data.tsx";

import "./accordion.styles.css";

export default function Accordion() {
  // single selection accordion
  const [selected, setSelected] = useState(null);

  const [multiSelectionBtnTxt, setMultiSelecitonBtnTxt] = useState(
    "Multi-selection: Disabled"
  );
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleItems, setMultipleItems] = useState([]);

  function handleSingleSelection(getCurrentId) {
    console.log(getCurrentId);
    // checks to see if the current id clicked is the same as the existing selected(or last clicked)
    // if it is the same then it returns null which makes it look like its closed
    // otherwise it returns the new id and subsequently returns the string.
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let temp_multipleItems = [...multipleItems]; // copies all data from this state
    const indexOfCurrentId = temp_multipleItems.indexOf(getCurrentId);
    console.log(indexOfCurrentId); // this wil return -1 if that id doesnt exist in temp_multipleItems array

    if (indexOfCurrentId === -1) {
      // if the id were looking for doesnt exist
      temp_multipleItems.push(getCurrentId); // add id to working multipleItems list
    } else {
      temp_multipleItems = temp_multipleItems.splice(indexOfCurrentId); // removes id from the index specified which should be the last id selected
    }
    setMultipleItems(temp_multipleItems);
  }

  function changeBtnTxtHandler() {
    enableMultiSelection
      ? setMultiSelecitonBtnTxt("Multi-selection: Disabled")
      : setMultiSelecitonBtnTxt("Multi-selection: Enabled");
    console.log("multi select: ", multiSelectionBtnTxt);
  }

  return (
    <div className="wrapper">
      <button
        onClick={() => {
          setEnableMultiSelection(!enableMultiSelection);
          changeBtnTxtHandler();
        }}
      >
        {multiSelectionBtnTxt}
      </button>
      <div className="accordion">
        {accordion_data && accordion_data.length > 0 ? (
          accordion_data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span> {/* this is used as the icon to open accordion*/}
              </div>
              {/* shows only accordion item selected */}
              {/* checks what number is selected and renders the content for that dataitem selected */}
              {enableMultiSelection // if multiselection enabled
                ? multipleItems.indexOf(dataItem.id) !== -1 && ( // check if id for this item is in multipleitems array
                    <div className="content">{dataItem.answer}</div> // if it is then display content info
                  )
                : selected === dataItem.id && ( //otherwise check if item in single selection list
                    <div className="content">{dataItem.answer}</div> // if in list then display content
                  )}
            </div>
          ))
        ) : (
          <div>No Data found</div>
        )}
      </div>
    </div>
  );
}
