import React, { createContext, useState } from "react";
import { ethers } from "ethers";
import { abi } from "../utils/constants.js";
import { contractAddress } from "../utils/constants.js";

const { ethereum } = window;

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [user, setUser] = useState(null);

  async function getProfile(publicAddress) {
    fetch("http://localhost:4000/profile/" + publicAddress)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }

  const createEthereumContract = async () => {
    try {
      if (!ethereum) return console.log("Please install metamask");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const _account = await ethereum.request({
        method: "eth_requestAccounts",
      });
      await getProfile(_account[0]);
      setAccount(_account[0]);
      const signer = provider.getSigner();
      const Contract = new ethers.Contract(contractAddress, abi, signer);
      console.log("Logged in as:", _account);

      return Contract;
    } catch (err) {
      console.log(err);
    }
  };

  const login = async () => {
    const _contract = await createEthereumContract();
    setContract(_contract);
  };

  const getUser = () => {
    if (user) return user;
  };

  const getPA = () => {
    return account;
  };

  const SetUser = (_user) => {
    setUser(_user);
  };
  const logout = async () => {};
  const isLoggedIn = () => {
    return account !== "";
  };

  return (
    <AuthContext.Provider
      value={{
        account,
        contract,
        login,
        logout,
        isLoggedIn,
        getUser,
        SetUser,
        getPA,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
