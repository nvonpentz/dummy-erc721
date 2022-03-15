const { expect } = require("chai");
const { ethers } = require("hardhat");
const defaultTokenUri = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1817"

describe("DummyNFT", function () {
  let wallets;
  let deployerWallet;
  let userAddress;
  let contract;

  beforeEach(async () => {
    wallets = await ethers.getSigners();
    deployerWallet = wallets[0]
    userWallet = wallets[1]

    const DummyNFT = await ethers.getContractFactory("DummyNFT");
    dummyNft = await DummyNFT.deploy("DummyNFT", "DNFT", defaultTokenUri);
    console.log("DummyNFT deployed to:", dummyNft.address, "used", dummyNft.deployTransaction.gasLimit.toString(), "gas.");
  });

  it("It should mint", async function () {
      const [deployerWallet] = await ethers.getSigners();
      let tokenId = await dummyNft.connect(deployerWallet).mint(deployerWallet.address);
      expect(await dummyNft.balanceOf(deployerWallet.address)).to.equal(1);
  });

  it("it should return the defaultTokenUri after minting", async function () {
      const [deployerWallet] = await ethers.getSigners();
      let tokenId = await dummyNft.connect(deployerWallet).mint(deployerWallet.address);
      let uri = await dummyNft.tokenURI(1);
      expect(uri).to.equal(defaultTokenUri);
  });

  it("it should update the tokenUri after minting", async function () {
      const [deployerWallet] = await ethers.getSigners();
      let tokenId = await dummyNft.connect(deployerWallet).mint(deployerWallet.address);
      let newTokenURI = "https://brave.com";
      let tx = await dummyNft.updateTokenUri(1, newTokenURI);
      let uri = await dummyNft.tokenURI(1);
      expect(uri).to.equal(newTokenURI);
      uri = await dummyNft.tokenURI(10);
  });
});
