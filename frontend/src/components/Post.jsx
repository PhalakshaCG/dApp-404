import React from "react";
import { useState } from "react";
import open from "../assets/open.svg";
import report from "../assets/report.svg";
import "../static/Common.css";
import _ from "lodash";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import getPostByID from "../helper/getPostsByID";
function Post({
  id,
  title,
  description,
  tags,
  setPostData,
  setMaximizedPost,
  setReportPost,
  reportIDs,
}) {
  const [count, setCount] = useState(reportIDs.length);
  const [showReportPosts, setShowReportPosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const {Contract} = useContext(AuthContext);
  reportIDs = reportIDs.map((id)=>{
    return [0, id]
  });
  getPostByID(Contract, reportIDs)
  .then((_posts)=>{
    setPosts(_posts);
  });
  return (
    <div className="pt-10 pl-[6rem] pr-[4rem] mb-3">
      <div>
        <div className="content flex flex-col">
          <div className="">
            <span
              className="w-[70%] bg-inherit focus:outline-none border-b-black border-b-2 text-2xl text-[#D1F5FF]"
              type="text"
              placeholder="  Heading"
              style={{textShadow:"2px 2px rgb(100, 149, 237)"}}
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
        <div className="posts mt-5 ">
        {posts.map((post) => {
          if (post.title) {
            let ad = {
              __html: ""
            };
            if (post.ad) {
              ad.__html = `<h>Advertisement</h>${post.ad.content}`;
            }
            return (
              <div>
                <Post
                  key={post.id}
                  title={post.title}
                  description={post.description}
                  tags={post.tags}
                  setPostData={setPostData}
                  setMaximizedPost={setMaximizedPost}
                  setReportPost={setReportPost}
                  reportIDs={post.reportIDs}
                />{" "}
                <div style={{textAlign:"center", padding:20, justifyContent:"center"} } dangerouslySetInnerHTML = {ad}></div>
              </div>
            );
          }
          return <></>;
        })}
      </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Post;
