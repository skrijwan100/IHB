/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-ethers");
module.exports = {
  solidity: "0.8.28",
};
require("dotenv").config();
module.exports = {
  solidity: "0.8.28",
  defaultNetwork:"sepolia",
  networks:{
    hardhat:{},
    sepolia:{
      url:`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts:[process.env.PRIVATE_KEY]
    }
  }
};
