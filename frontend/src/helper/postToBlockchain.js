import { startLoading, stopLoading } from "./loader";
const postToBlockchain = async (Contract, Provider, address,  newsLang, tags, headline, content, rating) => {
      console.log(address,  newsLang, tags, headline, content, rating);
      startLoading();
      let nonce = await Provider.eth.getTransactionCount(address);
      console.log(nonce);
      let post = await Contract.methods.postArticle(address,  newsLang, tags, headline, content, rating).send({
            from:address,
            gas:1000000,
            nonce
      })
      console.log(post.events.post.returnValues)
      stopLoading();
      alert("Article posted successfully")
      fetch("http://localhost:4000/post/addpost",{
            method: "post",
            body: JSON.stringify({
                  postid : post.events.post.returnValues.id,
                  tagid : tags,
                  userid: address
            }),
            headers: {
                  'Content-Type': 'application/json'
                },
      }).then((data)=> data.json().then((_data)=> console.log(_data)))
      .catch((err)=>console.log(err));
};

export default postToBlockchain;