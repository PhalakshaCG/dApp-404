const rpcCallForTransaction = async (contract, tag, id) => {
    try {
      console.log(`Performing RPC`, id, tag);
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
    console.log(tags)
    for(let i=0; i<tags.length; i++){
        let tag = tags[i];
        let post = await rpcCallForTransaction( Contract, tag[1], tag[0]);
        if(!post)
        continue;
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
            _post.confirmations = report.confirmations;
            _post.refutations = report.refutations;
        }
        posts.push(_post);
    }
    return posts;
}

export default getPostByID;