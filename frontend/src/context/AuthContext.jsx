import React from "react";
// import { ethers } from "ethers";
// import abi from "../utils/constants.js";
// import contractAddress from "../utils/constants.js";

const { ethereum } = window;

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  let account = "";
  // const createEthereumContract = async () => {
  //   try {
  //     if (!ethereum) return console.log("Please install metamask");
  //     const provider = new ethers.providers.Web3Provider(ethereum);
  //     account = await ethereum.request({ method: "eth_requestAccounts" });
  //     const signer = provider.getSigner();
  //     const Contract = new ethers.Contract(contractAddress, abi, signer);
  //     console.log(account);
  //     return Contract;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const post = async (headline, content, newsLang, tags) => {
  //   const Contract = await createEthereumContract();
  // };

  const login = async () => {};
  const logout = async () => {};
  const isLoggedIn = () => {
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        // post,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
