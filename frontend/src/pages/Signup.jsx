import { AuthContext } from "../context/AuthContext";
import React, { useState, useContext, useEffect } from "react";
import "../static/Common.css";

import Multiselect from "multiselect-react-dropdown";

function Signup({ setRegister }) {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plainArray, setPlainArray] = useState([
    { name: "Option 1", id: 1 },
    { name: "Option 2", id: 2 },
    { name: "Option 3", id: 3 },
    { name: "Option 4", id: 4 },
    { name: "Option 5", id: 5 },
  ]);

  useEffect(() => {
    const getTags = async () => {
      fetch("http://localhost:4000/tags")
        .then((res) => res.json())
        .then((data) => {
          setPlainArray(data);
        });
    };
    getTags();
  }, []);

  const { getPA, SetUser } = useContext(AuthContext);
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

  const addUser = () => {
    let tagNames = [];
    for (var i = 0; i < tags.length; i++) {
      tagNames.push(tags[i].name);
    }
    async function getProfile(setRegister) {
      fetch("http://localhost:4000/profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          public_id: getPA(),
          tags: tagNames,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setRegister(false);
          SetUser(data);
        });
    }
    getProfile(setRegister);
  };
  return (
    <div className="px-[4vw]">
      <div className="rounded-[50px] flex justify-center gap-5 items-center bg-[#D1F5FF] text-black py-10">
        <div className="w-[50%] h-5"></div>
        <div className="w-[50%] pl-10 align-left">
          <div className="text-2xl">Sign Up to CheckMate</div>
          <div className="text-sm ">
            Create an account to get started with CheckMate
          </div>
          <div className="ml-2 mr-[6rem] mt-10 flex flex-col gap-10 pr-4">
            <div className="flex justify-between">
              <div>Name:</div>
              <input
                type="text"
                className="border-[#E63A0B] border-[1px] rounded-xl focus:outline-none w-[65%] pl-2"
              />
            </div>
            <div className="flex justify-between">
              <div>Username:</div>
              <input
                type="text"
                className="border-[#E63A0B] border-[1px] rounded-xl  focus:outline-none w-[65%] pl-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <div>Email:</div>
              <input
                type="text"
                className="w-[65%] border-[#E63A0B] border-[1px] rounded-xl focus:outline-none pl-2"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
            <div className="flex justify-center items-centers">
              <div
                className="cursor-pointer text-center bg-[#E63A0B] text-white pt-1 rounded-xl h-8 w-[40%]"
                onClick={addUser}
              >
                Register
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
