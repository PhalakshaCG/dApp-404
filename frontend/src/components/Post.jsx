import React from "react";
import { useState } from "react";
import open from "../assets/open.svg";
import report from "../assets/report.svg";
import "../static/Common.css";

import _ from "lodash";

function Post({
  title,
  description,
  tags,
  setPostData,
  setMaximizedPost,
  setReportPost,
}) {
  const [count, setCount] = useState(2);
  const [showReportPosts, setShowReportPosts] = useState(false);

  return (
    <div className="pt-10 pl-[6rem] pr-[4rem] mb-3">
      <div>
        <div className="content flex flex-col">
          <div className="">
            <span
              className="w-[70%] bg-inherit focus:outline-none border-b-black border-b-2 text-2xl text-[#D1F5FF]"
              type="text"
              placeholder="  Heading"
            >
              {title}
            </span>
          </div>
          <div className="newpost my-5">
            <span className="newpost-text w-[90%] text-[#D1F5FF] bg-inherit focus:outline-none resize-none">
              {description}
            </span>
          </div>
        </div>
        <div className="options">
          <div className="cursor-pointer flex flex-row justify-between items-center">
            <div
              className="pl-3"
              onClick={() => {
                setPostData({
                  title: title,
                  description: description,
                  tags: tags,
                });
                setMaximizedPost(true);
              }}
            >
              <img className="w-5" src={open} alt="" />
            </div>
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
            <div className="flex items-center gap-10">
              {count > 0 ? (
                <div
                  className=""
                  onClick={() => {
                    setShowReportPosts(!showReportPosts);
                  }}
                >
                  Reported By: {count}
                </div>
              ) : (
                <></>
              )}
              <div
                className="cursor-pointer flex gap-8  border-1 rounded-[69px] report py-1 px-3 mr-1 transition ease-in-out duration-75"
                onClick={() => {
                  setPostData({
                    title: title,
                    description: description,
                    tags: tags,
                  });
                  setReportPost(true);
                }}
              >
                <img className="w-5" src={report} alt="" />
                <span className="text-black hidden transition ease-in-out duration-500">
                  Report
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showReportPosts ? (
        <div className="mt-7 px-10 w-full">
          {_.range(1, count + 1).map((i) => (
            <div key={i}>
              <div className="content flex flex-col">
                <div className="">
                  <span
                    className="w-[70%] bg-inherit focus:outline-none border-b-black border-b-2 text-2xl text-[#D1F5FF]"
                    type="text"
                    placeholder="  Heading"
                  >
                    {title}
                  </span>
                </div>
                <div className="newpost my-5">
                  <span className="newpost-text w-[90%] text-[#D1F5FF] bg-inherit focus:outline-none resize-none">
                    {description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Post;
