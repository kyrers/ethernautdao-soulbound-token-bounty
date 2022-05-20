require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const ropstenAccountPk = "YOUR_ROPSTEN_ACCOUNT_PK";
const infuraID = "YOUR_INFURA_ID";
const etherscanApiKey = "YOUR_ETHERSCAN_API_KEY";

module.exports = {
  solidity: "0.8.13",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  etherscan: {
    apiKey: `${etherscanApiKey}`
  },
  networks: {
    localhost: {
      url: "http://localhost:8545"
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${infuraID}`,
      accounts: [`${ropstenAccountPk}`],
    }
  }
};
