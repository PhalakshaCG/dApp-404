require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    polygon_mumbai:{
      // url:"https://eth-goerli.g.alchemy.com/v2/IMsKGIGsekapyhhiAkuml6OX-eriF-l-",
      url:"https://polygon-mumbai.g.alchemy.com/v2/kMNv2zP52eGL5HBkC1pwMzpaJ8NVaRGn",
      accounts: ["4c8a52ed8e2f98296928613c4b66964f6e65ccd85466468e1d405bd52b296e37"],
      gas: 2100000, 
      gasPrice: 8000000000
    }
  }
};
