import { config as loadEnv } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

loadEnv({ path: "../../.env" });

const sepoliaRpcUrl = process.env.SEPOLIA_RPC_URL ?? "";
const sepoliaPrivateKey = process.env.SEPOLIA_PRIVATE_KEY ?? "";

const accounts = sepoliaPrivateKey ? [sepoliaPrivateKey] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: sepoliaRpcUrl,
      accounts,
      chainId: 11155111
    }
  }
};

export default config;
