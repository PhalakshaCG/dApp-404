import React from "react";
import { useState, useEffect } from "react";
import open from "../assets/open.svg";
import report from "../assets/report.svg";
import "../static/Common.css";

import _ from "lodash";

function Post({
  title,
  description,
  tags,
  setPostData,
  truthRating,
  setMaximizedPost,
  setReportPost,
  interactions,
  count,
}) {
  const [showReportPosts, setShowReportPosts] = useState(false);
  const [reportPosts, setReportPosts] = useState([]);
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  const getColour = () => {
    let num = Math.round((truthRating / 1000000 + Number.EPSILON) * 100) / 100;
    let percent = num / 1;
    let r =
      percent < 50 ? 255 : Math.floor(255 - ((percent * 2 - 100) * 255) / 100);
    let g = percent > 50 ? 255 : Math.floor((percent * 2 * 255) / 100);
    return rgbToHex(r, g, 0);
  };

  useEffect(() => {
    if (count > 0) {
      //write function to get all post that have reported current post in the format
      // [
      // {
      //         "id": "",
      //         "title": "",
      //         "description": "",
      //       }
      //       {
      //         "id": "",
      //         "title": "",
      //         "description": "",
      //       }]
      let arr = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          id: i,
          title: title + i,
          description: description + i,
        });
      }
      setReportPosts(arr);
    }
  }, []);

  const [color] = useState(getColour());

  return (
    <div className="pt-10 pl-[6rem] pr-[4rem] mb-3">
      <div>
        <div className="content flex flex-col">
          <div className="">
            <span
              className="w-[70%] bg-inherit focus:outline-none border-b-black border-b-2 text-2xl text-[#D1F5FF]"
              type="text"
              placeholder="  Heading"
              style={{ textShadow: "2px 2px rgb(100, 149, 237)" }}
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
            <div
              className="pl-3 cursor-pointer"
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
            <div className="flex items-center gap-10">
              {count > 0 ? (
                <div
                  className="cursor-pointer"
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
                className={"w-12 h-12 text-center pt-3 rounded-[50%] "}
                style={{
                  backgroundColor: color,
                }}
              >
                {Math.round((truthRating / 1000000 + Number.EPSILON) * 100) /
                  100}
              </div>
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
          {reportPosts.map((post) => (
            <div key={post.id}>
              <div className="content flex flex-col">
                <div className="">
                  <span
                    className="w-[70%] bg-inherit focus:outline-none border-b-black border-b-2 text-2xl text-[#D1F5FF]"
                    type="text"
                    placeholder="  Heading"
                  >
                    {post.title}
                  </span>
                </div>
                <div className="newpost my-3">
                  <span className="newpost-text w-[90%] text-[#D1F5FF] bg-inherit focus:outline-none resize-none">
                    {post.description}
                  </span>
                </div>
                <div className="flex gap-[6rem] justify-center mb-7">
                  <div className="flex gap-7">
                    <div className="">Confirmed By: {count}</div>
                    <div className="bg-green-600 rounded-[69px] px-5 py-1 ">
                      Confirm
                    </div>
                  </div>
                  <div className="flex gap-7">
                    <div className="rounded-[69px] px-5 py-1 bg-[#E63A0B]">
                      Refute
                    </div>
                    <div className="">Reported By: {count}</div>
                  </div>
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
