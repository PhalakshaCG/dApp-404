import React, { useState, useEffect } from "react";
import report from "../assets/report.svg";
import _ from "lodash";
import close from "../assets/close.svg";

function MaximizedPost({
  setMaximizedPost,
  PostData,
  setPostData,
  setReportPost,
}) {
  const [heading, setHeading] = useState("");
  const [count, setCount] = useState(2);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (PostData.title) {
      setHeading(PostData.title);
      setContent(PostData.description);
      setTags(PostData.tags);
    }
  }, [PostData]);

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
            }}
          />
        </div>
        <div
          className="cursor-pointer flex gap-8  border-1 rounded-[69px] report py-1 px-3 mr-1 transition ease-in-out duration-75"
          onClick={() => {
            setPostData({
              title: heading,
              description: content,
              tags: tags,
            });
            setMaximizedPost(false);
            setReportPost(true);
          }}
        >
          <img className="w-5" src={report} alt="" />
          <span className="text-black hidden transition ease-in-out duration-500">
            Report
          </span>
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
              rows="7"
              placeholder=" News article content is missing"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
      <div className="px-[6rem] mb-[1rem] text-2xl">Reported By</div>
      <div className="mt-7 px-[7rem] w-full">
        <div>
          {_.range(1, count + 1).map(() => (
            <div className="content flex flex-col">
              <div className="">
                <span
                  className="w-[70%] bg-inherit focus:outline-none border-b-black border-b-2 text-2xl text-[#D1F5FF]"
                  type="text"
                  placeholder="  Heading"
                >
                  {heading}
                </span>
              </div>
              <div className="newpost my-5">
                <span className="newpost-text w-[90%] text-[#D1F5FF] bg-inherit focus:outline-none resize-none">
                  {content}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MaximizedPost;
