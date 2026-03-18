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

type SupportedContractName = "HelloChain" | "MyFirstNft";

function parseContractName(argv: string[]): SupportedContractName {
  const envValue = process.env.CONTRACT_NAME;

  if (envValue === "HelloChain" || envValue === "MyFirstNft") {
    return envValue;
  }

  const contractFlagIndex = argv.indexOf("--contract");
  const flagValue = contractFlagIndex === -1 ? undefined : argv[contractFlagIndex + 1];

  if (flagValue === "HelloChain" || flagValue === "MyFirstNft") {
    return flagValue;
  }

  throw new Error(
    'Invalid or missing contract name. Use "--contract HelloChain" or "--contract MyFirstNft".'
  );
}

async function deployHelloChain(): Promise<string> {
  const helloChainFactory = await ethers.getContractFactory("HelloChain");
  const helloChain = await helloChainFactory.deploy("hello from chain");

  await helloChain.waitForDeployment();

  return helloChain.getAddress();
}

async function deployMyFirstNft(): Promise<string> {
  const [deployer] = await ethers.getSigners();
  const myFirstNftFactory = await ethers.getContractFactory("MyFirstNft");
  const myFirstNft = await myFirstNftFactory.deploy(
    "Web3 Introduction NFT",
    "W3I",
    await deployer.getAddress()
  );

  await myFirstNft.waitForDeployment();

  return myFirstNft.getAddress();
}

async function main(): Promise<void> {
  const contractName = parseContractName(process.argv);
  const contractAddress =
    contractName === "HelloChain" ? await deployHelloChain() : await deployMyFirstNft();
  const { chainId } = await ethers.provider.getNetwork();

  const deploymentInfo: DeploymentInfo = {
    network: network.name,
    chainId: Number(chainId),
    contractName,
    contractAddress,
    deployedAt: new Date().toISOString()
  };

  const deploymentsDir = join(__dirname, "..", "deployments");
  await mkdir(deploymentsDir, { recursive: true });

  const defaultOutPath = join(deploymentsDir, `${network.name}.json`);
  const contractOutPath = join(deploymentsDir, `${network.name}.${contractName}.json`);

  await writeFile(defaultOutPath, `${JSON.stringify(deploymentInfo, null, 2)}\n`, "utf8");
  await writeFile(contractOutPath, `${JSON.stringify(deploymentInfo, null, 2)}\n`, "utf8");

  console.log(`${contractName} deployed:`);
  console.log(JSON.stringify(deploymentInfo, null, 2));
  console.log(`Saved deployment files: ${defaultOutPath} and ${contractOutPath}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
