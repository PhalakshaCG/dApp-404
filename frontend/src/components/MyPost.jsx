import React from "react";
import remove from "../assets/remove-file.svg";
import "../static/Common.css";
import withdraw from "../helper/withdraw";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Post({ truth, id, title, description, tags, interactions, setPostData, setMaximizedPost }) {
  const {contract, backend_provider, account} = useContext(AuthContext);
  return (
    <div  className=" px-[14rem] mb-10">
      <div  style={truth?{}:{backgroundImage : "linear-gradient(25deg,#d64c7f,#ee4758 50%)" , borderRadius:"15px"}}>
        <div className="content flex flex-col">
          <div className="">
            <span
              className="w-[70%] bg-inherit focus:outline-none border-b-black border-b-2 text-2xl text-[#D1F5FF]"
              type="text"
              placeholder="  Heading"
            >
              {title} {truth?"":" (Fake)"}
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
        <div className="">Post Viewed By : {interactions}</div>
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
              <img className="w-6" src={remove} alt="" onClick={() => {
                withdraw(
                  contract,
                  backend_provider,
                  id,
                  tags[0].id,
                  account
                )
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
