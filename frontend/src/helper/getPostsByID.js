const rpcCallForTransaction = async (contract, tag, id) => {
    try {
      console.log(`Performing RPC`);
      const post = await contract.methods.getPostByID(id, tag).call();
      console.log(post)
      return post;
    } catch (error) {
      console.error('Error in transferTokens >', error);
      return false;
    }
  };

const getPostByID = async (Contract, tags) => {
    const tag_list_json = await fetch("http://localhost:4000/tags");
    const tag_list = await tag_list_json.json();
    let posts = []
    for(let i=0; i<tags.length; i++){
      let tag = tags[i];
      let post = await rpcCallForTransaction( Contract, tag.tagid, tag.postid);
      if(!post)
        continue;
      post = {
            id: parseInt(post.id),
            title: post.headline,
            description: post.content,
            tags: [{
                    id: post.tag,
                    name: tag_list[post.tag -1].name,//should add db query here
                }]
        }
      posts.push(post);
    }
    return posts;
}

export default getPostByID;