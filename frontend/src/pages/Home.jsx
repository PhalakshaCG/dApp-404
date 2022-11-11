import React, { useState, useContext, useEffect } from "react";
import NewPost from "../components/NewPost";
import "../static/Common.css";
import Post from "../components/Post";
import ConfirmPost from "../components/ConfirmPost";
import Maximized from "../components/Maximized";
import getPostByTags from "../helper/getPostsByTags";
import { AuthContext } from "../context/AuthContext";
import Signup from "./Signup";
import MaximizedPost from "../components/MaximizedPost";
import ReportPost from "../components/ReportPost";

function Home() {
  const { contract, isLoggedIn, getPA } = useContext(AuthContext);
  const tags = [1, 2, 3, 4, 5];
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function checkProfile() {
      fetch("http://localhost:4000/profile/check/" + getPA())
        .then((res) => res.json())
        .then((data) => {
          setRegister(!data);
        });
    }
    checkProfile();
    getPostByTags(contract, tags, 10).then((_posts) => {
      setPosts(_posts);
    });
  }, [isLoggedIn]);

  const [register, setRegister] = useState(false);
  const [confirmPost, setConfirmPost] = useState(false);
  const [maximizedPost, setMaximizedPost] = useState(false);
  const [maximizedNewPost, setMaximizedNewPost] = useState(false);
  const [reportPost, setReportPost] = useState(false);
  const [NewPostData, setNewPostData] = useState({});
  const [PostData, setPostData] = useState({});
  if (register) {
    return (
      <>
        <Signup key="0" setRegister={setRegister} />
      </>
    );
  }
  if (!confirmPost && !maximizedNewPost && !maximizedPost && !reportPost) {
    return (
      <div className="px-[4vw]" key="1">
        <div className="">
          <NewPost
            setConfirmPost={setConfirmPost}
            setMaximizedPost={setMaximizedNewPost}
            PostData={NewPostData}
            setPostData={setNewPostData}
          />
        </div>
        <hr />
        <div className="posts mt-5 ">
          {posts.map((post) => {
            if (post.title) {
              return (
                <Post
                  key={post.id}
                  title={post.title}
                  description={post.description}
                  tags={post.tags}
                  setPostData={setPostData}
                  setMaximizedPost={setMaximizedPost}
                  setReportPost={setReportPost}
                />
              );
            }
            return <></>;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <>
        {confirmPost ? (
          <div key="2" className="px-[4vw]">
            <ConfirmPost
              setConfirmPost={setConfirmPost}
              setMaximizedPost={setMaximizedNewPost}
              PostData={NewPostData}
              setPostData={setNewPostData}
            />
          </div>
        ) : maximizedNewPost ? (
          <div key="3" className="px-[4vw]">
            <Maximized
              setConfirmPost={setConfirmPost}
              setMaximizedPost={setMaximizedNewPost}
              PostData={NewPostData}
              setPostData={setNewPostData}
            />
          </div>
        ) : maximizedPost ? (
          <div key="4" className="px-[4vw]">
            <MaximizedPost
              setMaximizedPost={setMaximizedPost}
              PostData={PostData}
              setPostData={setPostData}
              setReportPost={setReportPost}
            />
          </div>
        ) : (
          <div key="5" className="px-[4vw]">
            <ReportPost setReportPost={setReportPost} PostData={PostData} />
          </div>
        )}
      </>
    );
  }
}

export default Home;
