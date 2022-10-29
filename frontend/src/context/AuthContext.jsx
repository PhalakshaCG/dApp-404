import React from "react";
import { ethers } from "ethers";
import { abi } from "../utils/constants.js";
import { contractAddress } from "../utils/constants.js";

const { ethereum } = window;

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = React.useState("");
  const [contract, setContract] = React.useState(null);
  const createEthereumContract = async () => {
    try {
      if (!ethereum) return console.log("Please install metamask");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const _account = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(_account[0]);
      const signer = provider.getSigner();
      const Contract = new ethers.Contract(contractAddress, abi, signer);
      console.log("Logged in as:",_account);
      return Contract;
    } catch (err) {
      console.log(err);
    }
  };

  const login = async () => {
    const _contract = await createEthereumContract();
    setContract(_contract); 
  };

  const logout = async () => {};
  const isLoggedIn = () => {
    return account!=="";
  };

  return (
    <AuthContext.Provider
      value={{
        account,
        contract,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
