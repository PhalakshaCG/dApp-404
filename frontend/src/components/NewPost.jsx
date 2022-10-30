import React, { useState } from "react";
import open from "../assets/open.svg";
import Multiselect from "multiselect-react-dropdown";
import { useEffect } from "react";

function NewPost({ setConfirmPost, setMaximizedPost, PostData, setPostData }) {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const plainArray = [
    { name: "Option 1", id: 1 },
    { name: "Option 2", id: 2 },
    { name: "Option 3", id: 3 },
    { name: "Option 4", id: 4 },
    { name: "Option 5", id: 5 },
  ];

  useEffect(() => {
    if (PostData) {
      setHeading(PostData.heading);
      setContent(PostData.content);
      setTags(PostData.tags);
    }
  }, [PostData]);
  var dropdown_style = {
    multiselectContainer: {},
    optionContainer: { backgroundColor: "#D1F5FF" },
    chips: {},
    searchBox: {
      backgroundColor: "#D1F5FF",
      border: "none",
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
    <div className="border-2 rounded-[69px] pt-10 pl-[6rem] pr-[4rem] pb-[2rem] mb-7">
      <div className="content flex flex-col">
        <div className="">
          <input
            className="w-[70%] bg-inherit focus:outline-none border-b-black border-b-2 text-2xl text-[#D1F5FF]"
            type="text"
            placeholder="  Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="newpost my-5">
          <textarea
            className="newpost-text w-[90%] text-[#D1F5FF] bg-inherit focus:outline-none resize-none"
            rows="4"
            placeholder="  Describe you news here ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="options">
        <div className="flex flex-row justify-between items-center">
          <div className="pl-3 cursor-pointer">
            <img
              className="w-6"
              src={open}
              alt=""
              onClick={() => {
                setMaximizedPost(true);
                setConfirmPost(false);
                setPostData({
                  heading: heading,
                  content: content,
                  tags: tags,
                });
              }}
            />
          </div>
          <div className="tags mx-7">
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
          <div className="submit">
            <button
              className="bg-[#D1F5FF] rounded-[69px] px-5 py-2 text-[#E63A0B] font-bold cursor-pointer"
              onClick={() => {
                setConfirmPost(true);
                setMaximizedPost(false);
                setPostData({
                  heading: heading,
                  content: content,
                  tags: tags,
                });
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
