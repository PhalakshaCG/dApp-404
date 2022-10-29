const postToBlockchain = async (Contract, address,  newsLang, tags, headline, content) => {
      Contract.postNewsArticle(address,  newsLang, tags, headline, content)
};

module.exports = postToBlockchain;