import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../static/Common.css";
import MyPost from "../components/MyPost";
import getPostByTags from "../helper/getPostsByTags";

function Profile() {
  const { getUser } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const { contract } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const tags = [1, 2, 3, 4, 5];
    setUser(getUser());
    let Name = getUser()?.name;
    const NameArray = Name.split(" ");
    Name = "";
    for (let i = 0; i < NameArray.length; i++) {
      Name = Name + NameArray[i][0].toUpperCase();
    }
    setName(Name);
    getPostByTags(contract, tags, 3).then((_posts) => {
      setPosts(_posts);
      console.log(_posts);
    });
  }, [contract, getUser]);

  return (
    <div className="">
      <div className="flex flex-col items-center ">
        <div className="px-10 flex flex-row box-border gap-5 pb-10 rounded-3xl bg-[#D1F5FF] w-[70%]">
          <div className="pt-10 flex flex-col items-center gap-10 w-[50%] box-border">
            <div className="w-[150px] h-[150px] rounded-[50%] bg-[#4d25aa] text-[32px] leading-[150px] text-center">
              {name}
            </div>
            <div className="text-black text-3xl" I>
              {user.name}
            </div>
          </div>
          <div className="box-border pt-10 w-[35%] text-xl flex flex-col gap-10 text-black">
            <div className="flex flex-row justify-between">
              <div>Public ID: </div>
              <div>{user?.public_id?.substr(0, 15) + "..."}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div>Email: </div>
              <div>{user?.email}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div>Brownies: </div>
              <div>{user?.brownies}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div>Penalties: </div>
              <div>{user?.penalties}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[14rem] mt-[2rem] text-3xl ">My Posts</div>
      <div className="mt-5">
        {posts.map((post) => {
          if (post.title) {
            return (
              <MyPost
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
}

export default Profile;
