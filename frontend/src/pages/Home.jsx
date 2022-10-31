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
  const { contract, isLoggedIn, getUser } = useContext(AuthContext);
  const tags = [1, 2, 3, 4, 5];
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (true) {
      setRegister(true);
    }
    getPostByTags(contract, tags, 10).then((_posts) => {
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
        <Signup setRegister />
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
