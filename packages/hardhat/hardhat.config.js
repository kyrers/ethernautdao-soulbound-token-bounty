require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.13",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
