import React from "react";
import { ethers } from "ethers";
import  abi from "../utils/constants.js";
import  contractAddress from "../utils/constants.js";

const { ethereum } = window;

let account = ""

const createEthereumContract = async () => {
  try {
    if(!ethereum)
        return console.log("Please install metamask");
    const provider = new ethers.providers.Web3Provider(ethereum);
    account = await ethereum.request({ method: "eth_requestAccounts", });   
    const signer = provider.getSigner();
    const Contract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );
    console.log(account);
    return Contract;
  } catch (err) {
    console.log(err);
  }
};

const postArticle = async ( newsLang, tags, headline, content) => {
    const Contract = await createEthereumContract();
}

const ArticleContext = React.createContext({
    post: postArticle
});

export const Provider = () => {
    return (
        <ArticleContext.Provider
          value={{
            post: postArticle
          }}
        >
        </ArticleContext.Provider>
      );
}
export default ArticleContext
