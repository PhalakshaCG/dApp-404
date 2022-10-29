require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url:"https://eth-goerli.g.alchemy.com/v2/sB5uUVZZ0BZbmPbRv7ZqNgYC3VlyNXxJ",
      accounts: ["4c8a52ed8e2f98296928613c4b66964f6e65ccd85466468e1d405bd52b296e37"]
    }
  }
};
