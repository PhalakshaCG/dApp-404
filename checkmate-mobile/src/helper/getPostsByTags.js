import getAdByTag from "./getAdByTags";

const rpcCallForTransaction = async (contract, Provider, tag, address) => {
    try {
      console.log(`Performing RPC`);
      
      let nonce = await Provider.eth.getTransactionCount(address);
      console.log(nonce);
      const _post = contract.methods.getPostByTag(tag);
      let post = await _post.call();
      console.log(post)
      _post.send({
        from:address,
        gas:10000000,
        nonce
      }).then((res)=>{
        console.log(res);
      });
      return post;
    } catch (error) {
      console.error('Error in transferTokens >', error);
      return false;
    }
  };

const getPostByTags = async (Contract, adContract, Provider, tags, limit, address) => {
         
    tags = [1,2,5]
    const tag_list_json = await fetch("http://localhost:4000/tags");
    const tag_list = await tag_list_json.json();
    let posts = []
    for(let i=0; i<limit; i++){
      let tag = tags[i % tags.length];
      let post = await rpcCallForTransaction( Contract, Provider, tag, address);
      if(!post)
        continue;
      if(i==2){
        getAdByTag(adContract, [0,1,2]).then((ad)=>{
          post.ad = ad;
        })
      }
      let tagInd = null
      if(post.tag==0)
            tagInd = 7
        else
            tagInd = post.tag -1
      let _post = {
            id: parseInt(post.id),
            title: post.headline,
            description: post.content,
            tags: [{
                    id: post.tag,
                    name: tag_list[tagInd].name,//should add db query here
                }],
            reportIDs: post.reports,
            rating:post.rating,
            interactions:post.interactions,
            truth:post.truth,
        }
        if(post.isReportPost){
          let report = await Contract.methods.reportStats(post.id).call();
          console.log(report);
          post.confirmations = report.confirmations;
          post.refutations = report.refutations;
      }
      posts.push(_post);
    }
    console.log(posts);
    return posts;
}

export default getPostByTags;