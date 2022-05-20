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

  describe("### MINT ###", function () {
    it("Should fail because minter is not approved", async function () {
      await expect(contract.mint(ethers.constants.AddressZero, 1)).to.be.reverted;
    });

    it("Should mint 1 token", async function () {
      const [owner] = await ethers.getSigners();

      await contract.setApprovedMinter(owner.address, true);

      const mintTx = await contract.mint(owner.address, 1);
      const balance = await contract.balanceOf(owner.address);

      expect(balance).to.equal(1);
    });
  });

  describe("### MINT ###", function () {
    it("Should fail because minter is not approved", async function () {
      await expect(contract.mint(ethers.constants.AddressZero, 1)).to.be.reverted;
    });

    it("Should mint 1 token", async function () {
      const [owner] = await ethers.getSigners();

      await contract.setApprovedMinter(owner.address, true);

      const mintTx = await contract.mint(owner.address, 1);
      const balance = await contract.balanceOf(owner.address);

      expect(balance).to.equal(1);
    });
  });

  describe("### OVERRIDDEN ERC20 FUNCTIONS ###", function () {
    it("Transfer() should return IsSoulbound() error", async function () {
      const [owner, signer] = await ethers.getSigners();
      await expect(contract.transfer(signer.address, 1)).to.be.reverted;
    });

    it("Allowance() should return IsSoulbound() error", async function () {
      const [owner, signer] = await ethers.getSigners();
      await expect(contract.allowance(owner.address, signer.address)).to.be.reverted;
    });

    it("Approve() should return IsSoulbound() error", async function () {
      const [owner, signer] = await ethers.getSigners();
      await expect(contract.approve(signer.address, 1)).to.be.reverted;
    });

    it("TransferFrom() should return IsSoulbound() error", async function () {
      const [owner, signer] = await ethers.getSigners();
      await expect(contract.transferFrom(owner.address, signer.address, 1)).to.be.reverted;
    });

    it("IncreaseAllowance() should return IsSoulbound() error", async function () {
      const [owner, signer] = await ethers.getSigners();
      await expect(contract.increaseAllowance(signer.address, 1)).to.be.reverted;
    });

    it("DecreaseAllowance() should return IsSoulbound() error", async function () {
      const [owner, signer] = await ethers.getSigners();
      await expect(contract.decreaseAllowance(signer.address, 1)).to.be.reverted;
    });
  });
});