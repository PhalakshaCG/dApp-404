import React, { useState } from "react";
import NewPost from "../components/NewPost";
import "../static/Common.css";
import Post from "../components/Post";
import ConfirmPost from "../components/ConfirmPost";
import Maximized from "../components/Maximized";
import getPostByTags from "../helper/getPostsByTags";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
import Signup from "./Signup";
function Home() {
  const { contract, isLoggedIn, getPA, backendContract, backend_provider } = useContext(AuthContext);
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
    // if (true) {
    //   setRegister(true);
    // }
    getPostByTags(backend_provider, backendContract, tags, 5).then((_posts) => {
      setPosts(_posts);
    });
  }, [isLoggedIn]);

  const [register, setRegister] = useState(false);
  const [confirmPost, setConfirmPost] = useState(false);
  const [maximizedPost, setMaximizedPost] = useState(false);
  const [PostData, setPostData] = useState({});
  if (register) {
    return (
      <>
        <Signup setRegister={setRegister} />
      </>
    );
  }
  if (!confirmPost && !maximizedPost) {
    return (
      <div className="px-[4vw]" key="1">
        <div className="">
          <NewPost
            setConfirmPost={setConfirmPost}
            setMaximizedPost={setMaximizedPost}
            PostData={PostData}
            setPostData={setPostData}
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
              setMaximizedPost={setMaximizedPost}
              PostData={PostData}
              setPostData={setPostData}
            />
          </div>
        ) : (
          <div key="3" className="px-[4vw]">
            <Maximized
              setConfirmPost={setConfirmPost}
              setMaximizedPost={setMaximizedPost}
              PostData={PostData}
              setPostData={setPostData}
            />
          </div>
        )}
      </>
    );
  }
}

export default Home;
