import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import close from "../assets/close.svg";

function Maximized({
  setConfirmPost,
  setMaximizedPost,
  PostData,
  setPostData,
}) {
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

  useEffect(() => {
    if (PostData.heading) {
      setHeading(PostData.heading);
      setContent(PostData.content);
      setTags(PostData.tags);
    }
  }, [PostData]);

  const onSelect = (selectedList, selectedItem) => {
    setTags(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setTags(selectedList);
  };

  return (
    <div>
      <div className="px-[4vw] flex flex-row justify-between items-center">
        <div className="pl-3 cursor-pointer">
          <img
            className="w-6"
            src={close}
            alt=""
            onClick={() => {
              setMaximizedPost(false);
              setConfirmPost(false);
              setPostData({
                heading: heading,
                content: content,
                tags: tags,
              });
            }}
          />
        </div>
        <div className="submit">
          <button
            className="bg-[#D1F5FF] rounded-[69px] px-5 py-2 text-[#E63A0B] font-bold cursor-pointer"
            onClick={() => {
              setMaximizedPost(false);
              setConfirmPost(true);
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
      <div className="pt-10 pl-[6rem] pr-[4rem] pb-[2rem] mb-7">
        <div className="content flex flex-col">
          <div className="mb-3">
            <h2 className="text-4xl mb-5">Heading</h2>
            <input
              className="w-[70%] bg-inherit focus:outline-none text-3xl text-[#D1F5FF]"
              type="text"
              placeholder=" Heading is Missing"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>
          <h2 className="text-2xl mt-5">Content</h2>
          <div className="newpost my-5">
            <textarea
              className="newpost-text w-[90%] text-[#D1F5FF] bg-inherit focus:outline-none"
              rows="12"
              placeholder=" News article content is missing"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="options">
          <div className="flex flex-row justify-center items-center">
            <div className="tags w-[500px]">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maximized;
