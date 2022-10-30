import React, { useContext, useState } from "react";
import NewPost from "../components/NewPost";
import "../static/Common.css";
import Post from "../components/Post";
import { AuthContext } from "../context/AuthContext";
import getPostByTags from "../helper/getPostsByTags";

function Home() {
  const tags = [1,2,3,4,5];
  const [posts, setPosts] = useState([]);
  const context = useContext(AuthContext);
  getPostByTags(context.contract, tags, 10).then((_posts)=>{
    setPosts(_posts);
  })
  // [
  //   {
  //     id: 1,
  //     title: "Post 1",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus illum repellat ullam aspernatur sed impedit excepturi dolorum, quasi velit vel in nesciunt, pariatur dolores ab temporibus dolor officia, iste recusandae?",
  //     tags: [
  //       {
  //         id: 1,
  //         name: "tag1",
  //       },
  //       {
  //         id: 2,
  //         name: "tag1",
  //       },
  //       {
  //         id: 2,
  //         name: "tag1",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "Post 1",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus illum repellat ullam aspernatur sed impedit excepturi dolorum, quasi velit vel in nesciunt, pariatur dolores ab temporibus dolor officia, iste recusandae?",
  //     tags: [],
  //   },
  //   {
  //     id: 3,
  //     title: "Post 1",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus illum repellat ullam aspernatur sed impedit excepturi dolorum, quasi velit vel in nesciunt, pariatur dolores ab temporibus dolor officia, iste recusandae?",
  //     tags: [
  //       {
  //         id: 1,
  //         name: "tag1",
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: "Post 1",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus illum repellat ullam aspernatur sed impedit excepturi dolorum, quasi velit vel in nesciunt, pariatur dolores ab temporibus dolor officia, iste recusandae?",
  //     tags: [
  //       {
  //         id: 1,
  //         name: "tag1",
  //       },
  //       {
  //         id: 2,
  //         name: "tag1",
  //       },
  //     ],
  //   },
  // ];
  return (
    <>
      <div className="px-[4vw]">
        <NewPost />
      </div>
      <hr />
      <div className="posts mt-5 px-[4vw]">
        {posts.map((post) => {
          if(post.title){
            return (
            <div key={posts.id} className="post">
              <Post
                title={post.title}
                description={post.description}
                tags={post.tags}
              />
            </div>
          );
        }
        })}
      </div>
    </>
  );
}

export default Home;
