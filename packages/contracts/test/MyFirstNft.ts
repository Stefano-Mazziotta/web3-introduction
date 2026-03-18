import { expect } from "chai";
import hre from "hardhat";

const { ethers } = hre;

describe("MyFirstNft", () => {
  it("stores name and symbol from constructor", async () => {
    const [owner] = await ethers.getSigners();
    const myFirstNftFactory = await ethers.getContractFactory("MyFirstNft");
    const myFirstNft = await myFirstNftFactory.deploy("Web3 Intro NFT", "W3I", owner.address);

    await myFirstNft.waitForDeployment();

    expect(await myFirstNft.name()).to.equal("Web3 Intro NFT");
    expect(await myFirstNft.symbol()).to.equal("W3I");
  });

  it("allows owner to mint and stores owner/tokenURI", async () => {
    const [owner, recipient] = await ethers.getSigners();
    const metadataUri = "https://example.com/metadata/0";
    const myFirstNftFactory = await ethers.getContractFactory("MyFirstNft");
    const myFirstNft = await myFirstNftFactory.deploy("Web3 Intro NFT", "W3I", owner.address);

    await myFirstNft.waitForDeployment();

    const mintTx = await myFirstNft.mintTo(recipient.address, metadataUri);
    const mintReceipt = await mintTx.wait();

    expect(mintReceipt).to.not.equal(null);
    expect(mintReceipt?.status).to.equal(1);

    expect(await myFirstNft.ownerOf(0)).to.equal(recipient.address);
    expect(await myFirstNft.tokenURI(0)).to.equal(metadataUri);
  });

  it("increments token ids across mints", async () => {
    const [owner, recipient] = await ethers.getSigners();
    const myFirstNftFactory = await ethers.getContractFactory("MyFirstNft");
    const myFirstNft = await myFirstNftFactory.deploy("Web3 Intro NFT", "W3I", owner.address);

    await myFirstNft.waitForDeployment();

    await (await myFirstNft.mintTo(recipient.address, "https://example.com/metadata/0")).wait();
    await (await myFirstNft.mintTo(recipient.address, "https://example.com/metadata/1")).wait();

    expect(await myFirstNft.ownerOf(0)).to.equal(recipient.address);
    expect(await myFirstNft.ownerOf(1)).to.equal(recipient.address);
    expect(await myFirstNft.tokenURI(1)).to.equal("https://example.com/metadata/1");
  });

  it("rejects mint from non-owner", async () => {
    const [deployer, owner, recipient] = await ethers.getSigners();
    const myFirstNftFactory = await ethers.getContractFactory("MyFirstNft");
    const myFirstNft = await myFirstNftFactory.deploy("Web3 Intro NFT", "W3I", owner.address);

    await myFirstNft.waitForDeployment();

    let reverted = false;

    try {
      await myFirstNft.mintTo(recipient.address, "https://example.com/metadata/0");
    } catch {
      reverted = true;
    }

    expect(await myFirstNft.owner()).to.equal(owner.address);
    expect(deployer.address).to.not.equal(owner.address);
    expect(reverted).to.equal(true);
  });

  it("rejects mint to zero address", async () => {
    const [owner] = await ethers.getSigners();
    const myFirstNftFactory = await ethers.getContractFactory("MyFirstNft");
    const myFirstNft = await myFirstNftFactory.deploy("Web3 Intro NFT", "W3I", owner.address);

    await myFirstNft.waitForDeployment();

    let reverted = false;

    try {
      await myFirstNft.mintTo(ethers.ZeroAddress, "https://example.com/metadata/0");
    } catch {
      reverted = true;
    }

    expect(reverted).to.equal(true);
  });

  it("rejects empty metadata uri", async () => {
    const [owner, recipient] = await ethers.getSigners();
    const myFirstNftFactory = await ethers.getContractFactory("MyFirstNft");
    const myFirstNft = await myFirstNftFactory.deploy("Web3 Intro NFT", "W3I", owner.address);

    await myFirstNft.waitForDeployment();

    let reverted = false;

    try {
      await myFirstNft.mintTo(recipient.address, "");
    } catch {
      reverted = true;
    }

    expect(reverted).to.equal(true);
  });
});
