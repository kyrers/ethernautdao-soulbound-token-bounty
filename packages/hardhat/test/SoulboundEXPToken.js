const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Soulbound EXP Token", function () {
  let factory;
  let contract;

  beforeEach(async function () {
    factory = await ethers.getContractFactory("SoulboundEXPToken");
    contract = await factory.deploy();
  });


  describe("### DEPLOYMENT ###", function () {
    it("Should set owner to msg.sender", async function () {
      const [owner] = await ethers.getSigners();
      const contractOwner = await contract.owner();

      expect(owner.address).to.equal(contractOwner);
    });
  });

  describe("### APPROVE MINTER ###", function () {
    it("Should fail to approve minter because of zero address", async function () {
      await expect(contract.setApprovedMinter(ethers.constants.AddressZero, true)).to.be.reverted;
    });

    it("Should fail to approve minter because of onlyOwner", async function () {
      const [owner, signer] = await ethers.getSigners();

      await expect(contract.connect(signer).setApprovedMinter(owner.address, true)).to.be.reverted;
    });

    it("Should approve minter", async function () {
      const [owner] = await ethers.getSigners();

      const approveTx = await contract.setApprovedMinter(owner.address, true);
      const approveTxReceipt = await approveTx.wait();
      const newMinter = approveTxReceipt.events[0].args[0];
      const status = approveTxReceipt.events[0].args[1];

      expect(newMinter).to.equal(owner.address);
      expect(status).to.be.true;
    });
  });
});