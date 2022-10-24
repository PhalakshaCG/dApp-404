import React from "react";
import open from "../assets/open.svg";
import Multiselect from "multiselect-react-dropdown";

function NewPost() {
  const plainArray = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];
  return (
    <div className="border-2 rounded-[69px] pt-10 pl-[6rem] pr-[4rem] pb-[2rem] mb-7">
      <div className="content flex flex-col">
        <div className="">
          <input
            className="w-[70%] bg-inherit focus:outline-none border-b-black border-b-2 text-2xl text-[#D1F5FF]"
            type="text"
            placeholder="  Heading"
          />
        </div>
        <div className="newpost my-5">
          <textarea
            className="newpost-text w-[90%] text-[#D1F5FF] bg-inherit focus:outline-none resize-none"
            rows="4"
            placeholder="  Describe you news here ..."
          ></textarea>
        </div>
      </div>
      <div className="options">
        <div className="flex flex-row justify-between items-center">
          <div className="pl-3">
            <img className="w-6" src={open} alt="" />
          </div>
          <div className="tags">
            <Multiselect showArrow options={plainArray} isObject={false} />
          </div>
          <div className="submit">
            <button className="bg-[#D1F5FF] rounded-[69px] px-5 py-2 text-[#E63A0B] font-bold">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
