import React, { useState } from "react";
import NewPost from "../components/NewPost";
import "../static/Common.css";
import Post from "../components/Post";
import ConfirmPost from "../components/ConfirmPost";
import Maximized from "../components/Maximized";

function Home() {
  let posts = [
    {
      id: 1,
      title: "Post 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus illum repellat ullam aspernatur sed impedit excepturi dolorum, quasi velit vel in nesciunt, pariatur dolores ab temporibus dolor officia, iste recusandae?",
      tags: [
        {
          id: 1,
          name: "tag1",
        },
        {
          id: 2,
          name: "tag1",
        },
        {
          id: 3,
          name: "tag1",
        },
      ],
    },
    {
      id: 2,
      title: "Post 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus illum repellat ullam aspernatur sed impedit excepturi dolorum, quasi velit vel in nesciunt, pariatur dolores ab temporibus dolor officia, iste recusandae?",
      tags: [],
    },
    {
      id: 3,
      title: "Post 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus illum repellat ullam aspernatur sed impedit excepturi dolorum, quasi velit vel in nesciunt, pariatur dolores ab temporibus dolor officia, iste recusandae?",
      tags: [
        {
          id: 1,
          name: "tag1",
        },
      ],
    },
    {
      id: 4,
      title: "Post 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus illum repellat ullam aspernatur sed impedit excepturi dolorum, quasi velit vel in nesciunt, pariatur dolores ab temporibus dolor officia, iste recusandae?",
      tags: [
        {
          id: 1,
          name: "tag1",
        },
        {
          id: 2,
          name: "tag1",
        },
      ],
    },
  ];
  const [confirmPost, setConfirmPost] = useState(false);
  const [maximizedPost, setMaximizedPost] = useState(false);
  const [PostData, setPostData] = useState({});
  if (!confirmPost && !maximizedPost) {
    return (
      <div>
        <div className="px-[4vw]">
          <NewPost
            setConfirmPost={setConfirmPost}
            setMaximizedPost={setMaximizedPost}
            PostData={PostData}
            setPostData={setPostData}
          />
        </div>
        <hr />
        <div className="posts mt-5 px-[4vw]">
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                title={post.title}
                description={post.description}
                tags={post.tags}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <>
        {confirmPost ? (
          <div className="px-[4vw]">
            <ConfirmPost
              setConfirmPost={setConfirmPost}
              setMaximizedPost={setMaximizedPost}
              PostData={PostData}
              setPostData={setPostData}
            />
          </div>
        ) : (
          <div className="px-[4vw]">
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
