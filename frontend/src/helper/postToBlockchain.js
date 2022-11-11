const postToBlockchain = async (Contract, address,  newsLang, tags, headline, content, rating) => {
      console.log(address,  newsLang, tags, headline, content, rating);
      Contract.postArticle(address,  newsLang, tags, headline, content, rating);
};

module.exports = postToBlockchain;