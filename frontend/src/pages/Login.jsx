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
      <div className="posts mt-5 px-[4vw]"></div>
    </>
  );
}

export default Home;
