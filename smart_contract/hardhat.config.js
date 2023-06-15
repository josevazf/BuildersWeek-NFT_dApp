require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");

let apiurl = process.env.API_URL;
let privatekey = process.env.PRIVATE_KEY;
let scanKey = process.env.SCAN_API_KEY;

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "matic",
  networks: {
	hardhat: {
    },
    matic: {
      url: apiurl,
      accounts: [privatekey],
    },
  },
  etherscan: {
    apiKey: {
		polygon: scanKey,
	}
  }
};