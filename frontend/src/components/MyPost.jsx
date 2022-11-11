import React from "react";
import remove from "../assets/remove-file.svg";
import "../static/Common.css";

function Post({ title, description, tags, setPostData, setMaximizedPost }) {
  return (
    <div className=" px-[14rem] mb-10">
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
          <div className="cursor-pointer flex flex-row gap-[10rem] justify-center items-center">
            {/* <div
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
            </div> */}
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
            <div className="pl-3 cursor-pointer">
              <img className="w-6" src={remove} alt="" onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
