import getAdByTag from "./getAdByTags";

const rpcCallForTransaction = async (contract, tag) => {
    try {
      console.log(`Performing RPC`);
      const post = await contract.methods.getPostByTag(tag).call();
      console.log(post)
      return post;
    } catch (error) {
      console.error('Error in transferTokens >', error);
      return false;
    }
  };

const getPostByTags = async (Contract, adContract, tags, limit) => {
         
    tags = [1,2,5]
    const tag_list_json = await fetch("http://localhost:4000/tags");
    const tag_list = await tag_list_json.json();
    let posts = []
    for(let i=0; i<limit; i++){
      let tag = tags[i % tags.length];
      let post = await rpcCallForTransaction( Contract, tag);
      if(!post)
        continue;
      if(i==2){
        getAdByTag(adContract, [0,1,2]).then((ad)=>{
          post.ad = ad;
        })
      }
      post = {
            id: parseInt(post.id),
            title: post.headline,
            description: post.content,
            tags: [{
                    id: post.tag,
                    name: tag_list[post.tag -1].name,//should add db query here
                }],
            reportIDs: post.reports,
        }
      posts.push(post);
    }
    console.log(posts);
    return posts;
}

export default getPostByTags;