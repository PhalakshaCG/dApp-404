import React from "react";
import open from "../assets/open.svg";
import report from "../assets/report.svg";
import "../static/Common.css";

function Post({ title, description, tags }) {
  return (
    <div className=" pt-10 pl-[6rem] pr-[4rem] pb-[2rem] mb-7">
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
        <div className="flex flex-row justify-between items-center">
          <div className="pl-3">
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
          <div className=" flex gap-8  border-1 rounded-[69px] report py-1 px-3 mr-1 transition ease-in-out duration-75">
            <img className="w-5" src={report} alt="" />
            <span className="text-black hidden transition ease-in-out duration-500">
              Report
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
