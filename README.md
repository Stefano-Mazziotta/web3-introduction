# web3-introduction

Learning-oriented Proof of Concept for a Web3 backend using NestJS + ethers.js + Hardhat + Solidity.

## Goals

- Learn how smart contracts and ERC721 NFTs work.
- Learn how contracts are deployed and called.
- Learn how a backend creates and signs blockchain transactions.
- Learn metadata flow and request -> blockchain -> response lifecycle.

## Stage 1 Scope

- Workspace boilerplate with pnpm workspaces.
- NestJS API with health endpoint.
- Hardhat contracts package with starter contract, deployment script, and tests.
- Local-node-first workflow.

## Quick Start

```bash
pnpm install
pnpm run contracts:compile
pnpm run contracts:test
```

Run local chain and deploy:

```bash
pnpm run contracts:node
# in another terminal
pnpm run contracts:deploy:local
```

Run API:

```bash
pnpm run api:start:dev
```

Health check:

```bash
curl http://localhost:3000/health
```

## Suggested Branch Workflow

- `step-1-setup`
- `step-2-erc721`
- `step-3-deploy`
- `step-4-read-api`
- `step-5-mint-api`
- `step-6-metadata`
- `step-7-tx-lifecycle`
- `step-8-sepolia-e2e`
