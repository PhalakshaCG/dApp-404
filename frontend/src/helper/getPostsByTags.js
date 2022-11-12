import getAdByTag from "./getAdByTags";

const rpcCallForTransaction = async (provider, contract, tag) => {
    try {
      console.log(`Performing RPC`);
      const post = await contract.methods.getPostByTag(tag).call();
      console.log(post)
      return post;
      // const gas = await trx.estimateGas({ from: ownerWallet });
      // const gasPrice = await provider.eth.getGasPrice();
      // const data = trx.encodeABI();
      // const nonce = await provider.eth.getTransactionCount(ownerWallet);
      // console.log('nonce :>> ', nonce);
      // const trxData = {
      //   from: ownerWallet,
      //   to: contractAddress,
      //   data,//:"0x61c445d1000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002",
      //   gas,
      //   gasPrice,
      //   nonce
      // };
      // console.log(trxData);
      // console.log('Transaction ready to be sent');
      // const signedTrx = await provider.eth.accounts.signTransaction(trxData, private_key);
      // let tx = await provider.eth.sendSignedTransaction(signedTrx.rawTransaction);
      // console.log(signedTrx, tx);
      // let post = await contract.getPastEvents('viewPost', {
      //   filter: {id:tx.blockNumber},
      //   fromBlock: 0,
      //   toBlock: 'latest'
      // });
      // console.log(post)
      // return post[0]?.returnValues?.post;
    } catch (error) {
      console.error('Error in transferTokens >', error);
      return false;
    }
  };

const getPostByTags = async (provider, Contract, adContract, tags, limit) => {
         
    tags = [1,2,5]
    const tag_list_json = await fetch("http://localhost:4000/tags");
    const tag_list = await tag_list_json.json();
    let posts = []
    for(let i=0; i<limit; i++){
      let tag = tags[i % tags.length];
      let post = await rpcCallForTransaction(provider, Contract, tag);
      if(!post)
        continue;
      if(i==2){
        getAdByTag(adContract, [0,1,2]).then((ad)=>{
          console.log(ad, post);
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
                }]
        }
      posts.push(post);
    }
    return posts;
}

export default getPostByTags;