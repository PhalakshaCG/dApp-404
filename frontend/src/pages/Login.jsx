import React from "react";
import NewPost from "../components/NewPost";
import "../static/Common.css";

function Home() {
  return (
    <>
      <div className="px-[4vw] opacity-50 pointer-events-none select-none">
        <NewPost />
      </div>
      <hr />
      <div className="posts mt-5 px-[4vw] pl-[9vw] opacity-40">
        <div className="skeleton-zqe70d35vkl">{false && <div></div>}</div>
      </div>
    </>
  );
}

export default Home;
