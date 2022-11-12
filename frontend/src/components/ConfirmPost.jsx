import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import post from "../helper/postToBlockchain";
import Multiselect from "multiselect-react-dropdown";

function ConfirmPost({
  setConfirmPost,
  setMaximizedPost,
  PostData,
  setPostData,
}) {
  const context = useContext(AuthContext);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState(null);
  const [plainArray, setPlainArray] = useState([
    { name: "Option 1", id: 1 },
    { name: "Option 2", id: 2 },
    { name: "Option 3", id: 3 },
    { name: "Option 4", id: 4 },
    { name: "Option 5", id: 5 },
  ]);

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
    const getTags = async () => {
      fetch("http://localhost:4000/tags")
        .then((res) => res.json())
        .then((data) => {
          setPlainArray(data);
        });
    };
    getTags();
    if (PostData.heading) {
      setHeading(PostData.heading);
      setContent(PostData.content);
      setTag(PostData.tags);
    }
  }, [PostData]);

  const submit = () => {
    let rating = 85000000;
    post(
      context.contract,
      context.backend_provider,
      context.account,
      "NewsLang",
      tag[0].id,
      heading,
      content,
      rating
    );
    setHeading("");
    setContent("");
    setTag(null);
    setPostData(null);
    setConfirmPost(false);
    setMaximizedPost(false);
  };

  const onSelect = (selectedList, selectedItem) => {
    setTag(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setTag(selectedList);
  };

  return (
    <div>
      <div className="px-[4vw] flex flex-row justify-between items-center">
        <div className="pl-3 cursor-pointer">
          <span
            className="w-6"
            onClick={() => {
              setMaximizedPost(false);
              setConfirmPost(false);
              setPostData({
                heading: heading,
                content: content,
                tags: tag,
              });
            }}
          >
            <button className="bg-[#D1F5FF] rounded-[69px] px-5 py-2 text-[#E63A0B] font-bold cursor-pointer">
              Edit
            </button>
          </span>
        </div>
        <div className="text-4xl text-[#E63A0B]">Confirm Your Post</div>
        <div className="submit">
          <button
            className="bg-[#D1F5FF] rounded-[69px] px-5 py-2 text-[#E63A0B] font-bold cursor-pointer"
            onClick={submit}
          >
            Confirm & Post
          </button>
        </div>
      </div>
      <div className="pt-10 pl-[6rem] pr-[4rem] pb-[2rem] mb-7">
        <div className="content flex flex-col">
          <div className="mb-10">
            <h2 className="text-4xl mb-5">Given Heading</h2>
            <input
              className="w-[70%] bg-inherit focus:outline-none text-3xl text-[#D1F5FF]"
              type="text"
              placeholder=" Heading is Missing"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              disabled
            />
          </div>
          <h2 className="text-4xl mb-5">Heading In News Langauge</h2>
          <div className="news-lang w-full h-[200px] bg-white "></div>
          <h2 className="text-2xl mt-10">Content</h2>
          <div className="newpost my-5">
            <textarea
              className="newpost-text w-[90%] text-[#D1F5FF] bg-inherit focus:outline-none"
              rows="12"
              placeholder=" News article content is missing"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled
            ></textarea>
          </div>
        </div>
        <div className="options">
          <div className="flex flex-row justify-center items-center">
            <div className="tags w-[500px] pointer-events-none">
              <Multiselect
                className=""
                showArrow
                options={plainArray}
                isObject={true}
                placeholder="Add Tags"
                style={dropdown_style}
                avoidHighlightFirstOption={true}
                closeOnSelect={true}
                hidePlaceholder={true}
                selectedValues={tag}
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

export default ConfirmPost;
