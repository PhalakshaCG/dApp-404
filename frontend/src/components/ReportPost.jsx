import React, { useState, useEffect } from "react";
import open from "../assets/open.svg";
// import Multiselect from "multiselect-react-dropdown";
import postReportArticle from "../helper/postReportArticle";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
function ReportPost({ setReportPost, PostData }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const context = useContext(AuthContext);
  const [originalID, setOriginalID] = useState("");
  //   const [newtags, setNewTags] = useState("");
  //   const [plainArray, setPlainArray] = useState([{ name: "Option 1", id: 1 }]);

  useEffect(() => {
    const getTags = async () => {
      fetch("http://localhost:4000/tags")
        .then((res) => res.json())
        .then((data) => {
          //   setPlainArray(data);
        });
    };
    getTags();
  }, [PostData]);
  //   var dropdown_style = {
  //     multiselectContainer: {},
  //     optionContainer: { backgroundColor: "#D1F5FF" },
  //     chips: {},
  //     searchBox: {
  //       backgroundColor: "#D1F5FF",
  //       border: "none",
  //       borderRadius: "69px",
  //       paddingLeft: "1rem",
  //       paddingRight: "1rem",
  //     },
  //     inputField: {},
  //     option: { color: "black" },
  //   };
  //   const onSelect = (selectedList, selectedItem) => {
  //     setTags(selectedList);
  //   };

  //   const onRemove = (selectedList, removedItem) => {
  //     setTags(selectedList);
  //   };

  useEffect(() => {
    if (PostData.title) {
      setTitle(PostData.title);
      setDesc(PostData.description);
      setTags(PostData.tags);
      setOriginalID(PostData.id);
    }
  }, [PostData]);

  return (
    <div>
      <div className="pt-10 pl-[6rem] pr-[4rem] pb-[2rem] mb-7">
        <div className="description flex flex-col">
          <div className="mb-3">
            <h2 className="text-4xl mb-5">Heading</h2>
            <input
              className="w-[70%] bg-inherit focus:outline-none text-3xl text-[#D1F5FF]"
              type="text"
              placeholder=" Heading is Missing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled
            />
          </div>
          <h2 className="text-2xl mt-5">Content</h2>
          <div className="newpost my-5">
            <textarea
              className="newpost-text w-[90%] text-[#D1F5FF] bg-inherit focus:outline-none"
              rows="7"
              placeholder=" News article description is missing"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              disabled
            ></textarea>
          </div>
        </div>
        <div className="options">
          <div className="flex flex-row justify-center items-center">
            <div className="tags flex gap-4">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="bg-[#D1F5FF] rounded-[69px] px-5 py-1 text-[#E63A0B]"
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-[6rem] mb-[1rem] text-2xl">
        To Report A Post in Checkmate - Create a New Article{" "}
      </div>
      <div className="mx-[5rem] border-2 rounded-[69px] pt-10 pl-[6rem] pr-[4rem] pb-[2rem] mb-7 mt-10">
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
            {/* <div className="tags mx-7">
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
            </div> */}
            <div className="submit">
              <button
                className="bg-[#D1F5FF] rounded-[69px] px-5 py-2 text-[#E63A0B] font-bold cursor-pointer"
                onClick={() => {
                  let rating = 85000000+parseInt(Math.random()*10000000);
                  postReportArticle(
                    context.contract,
                    context.backend_provider,
                    tags[0].id,
                    originalID,
                    context.account,
                    "NewsLang",
                    heading,
                    content,
                    rating
                  );
                  setReportPost(false);
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[4vw] flex flex-row justify-center items-center">
        <div
          className="cursor-pointer p-2 w-[20%] text-center bg-[#e63a0b] rounded-xl"
          onClick={() => {
            setReportPost(false);
          }}
        >
          Cancel
        </div>
      </div>
    </div>
  );
}

export default ReportPost;
