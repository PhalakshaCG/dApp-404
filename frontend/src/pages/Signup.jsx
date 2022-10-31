import React, { useState } from "react";

import Multiselect from "multiselect-react-dropdown";

function Signup(setRegister) {
  const [tags, setTags] = useState([]);
  const plainArray = [
    { name: "Option 1", id: 1 },
    { name: "Option 2", id: 2 },
    { name: "Option 3", id: 3 },
    { name: "Option 4", id: 4 },
    { name: "Option 5", id: 5 },
  ];

  var dropdown_style = {
    multiselectContainer: {},
    optionContainer: { backgroundColor: "white" },
    chips: {},
    searchBox: {
      backgroundColor: "#D1F5FF",
      border: "1px solid #E63A0B",
      borderRadius: "69px",
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
    inputField: {},
    option: { color: "black" },
  };

  const onSelect = (selectedList, selectedItem) => {
    setTags(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setTags(selectedList);
  };
  return (
    <div className="px-[4vw]">
      <div className="flex justify-center gap-5 items-center bg-[#D1F5FF] text-black py-10">
        <div className="w-[50%] h-5"></div>
        <div className="w-[50%] pl-10 align-left">
          <div className="text-2xl">Sign Up to CheckMate</div>
          <div className="text-sm ">
            Create an account to get started with CheckMate
          </div>
          <div className="ml-2 mr-[6rem] mt-10 flex flex-col gap-10">
            <div className="flex justify-between">
              <div>Name:</div>
              <input
                type="text"
                className="border-[#E63A0B] border-[1px] focus:outline-none w-[75%] pl-2"
              />
            </div>
            <div className="flex justify-between">
              <div>Username:</div>
              <input
                type="text"
                className="border-[#E63A0B] border-[1px] focus:outline-none w-[75%] pl-2"
              />
            </div>
            <div className="flex justify-between">
              <div>Email:</div>
              <input
                type="text"
                className="w-[75%] border-[#E63A0B] border-[1px] focus:outline-none pl-2"
              />
            </div>
            <div className="tags">
              <Multiselect
                className=""
                showArrow
                options={plainArray}
                isObject={true}
                placeholder="Add Tags"
                style={dropdown_style}
                avoidHighlightFirstOption={true}
                closeOnSelect={false}
                hidePlaceholder={true}
                selectedValues={tags}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name"
                // customArrow={true}
              />
            </div>
            <div className="text-center">
              <button>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
