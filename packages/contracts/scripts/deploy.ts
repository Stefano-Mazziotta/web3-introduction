import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { ethers, network } from "hardhat";

type DeploymentInfo = {
  network: string;
  chainId: number;
  contractName: string;
  contractAddress: string;
  deployedAt: string;
};

async function main(): Promise<void> {
  const helloChainFactory = await ethers.getContractFactory("HelloChain");
  const helloChain = await helloChainFactory.deploy("hello from chain");

  await helloChain.waitForDeployment();

  const contractAddress = await helloChain.getAddress();
  const { chainId } = await ethers.provider.getNetwork();

  const deploymentInfo: DeploymentInfo = {
    network: network.name,
    chainId: Number(chainId),
    contractName: "HelloChain",
    contractAddress,
    deployedAt: new Date().toISOString()
  };

  const deploymentsDir = join(__dirname, "..", "deployments");
  await mkdir(deploymentsDir, { recursive: true });

  const outPath = join(deploymentsDir, `${network.name}.json`);
  await writeFile(outPath, `${JSON.stringify(deploymentInfo, null, 2)}\n`, "utf8");

  console.log("HelloChain deployed:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
