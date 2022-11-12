const postReportArticle = async (Contract, Provider,reportTag, reportID, address,  newsLang, headline, content, rating) => {
    console.log(address,  newsLang, headline, content, rating);
    let nonce = await Provider.eth.getTransactionCount(address);
    console.log({
        nonce
    });
    let post = await Contract.methods.reportArticle(parseInt(reportTag), reportID, address,  newsLang, headline, content, rating)
    .send({
          from:address,
          gas:1000000,
          nonce
    })
    alert("Review posted")
    fetch("http://localhost:4000/post/addpost",{
            method: "post",
            body: JSON.stringify({
                  postid : post.events.post.returnValues.id,
                  tagid : 0,
                  userid: address
            }),
            headers: {
                  'Content-Type': 'application/json'
                },
      }).then((data)=> data.json().then((_data)=> console.log(_data)))
      .catch((err)=>console.log(err));
    console.log(post)
};

module.exports = postReportArticle;