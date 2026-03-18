import { expect } from "chai";
import hre from "hardhat";

const { ethers } = hre;

describe("HelloChain", () => {
  it("stores initial message and updates message", async () => {
    const helloChainFactory = await ethers.getContractFactory("HelloChain");
    const helloChain = await helloChainFactory.deploy("initial message");

    await helloChain.waitForDeployment();

    expect(await helloChain.getMessage()).to.equal("initial message");

    const tx = await helloChain.setMessage("updated message");
    const receipt = await tx.wait();

    expect(receipt).to.not.equal(null);
    expect(receipt?.status).to.equal(1);

    expect(await helloChain.getMessage()).to.equal("updated message");
  });

  it("rejects empty message", async () => {
    const helloChainFactory = await ethers.getContractFactory("HelloChain");
    const helloChain = await helloChainFactory.deploy("initial message");

    await helloChain.waitForDeployment();

    let reverted = false;

    try {
      await helloChain.setMessage("");
    } catch {
      reverted = true;
    }

    expect(reverted).to.equal(true);
  });
});
