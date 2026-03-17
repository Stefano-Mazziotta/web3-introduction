# Step 1 - Foundation Setup

This stage establishes the local-first workflow for a Web3 backend.

## What we build

- pnpm workspace with API and contracts packages.
- NestJS API with a minimal health endpoint.
- Hardhat project with a starter Solidity contract.
- Deployment script that writes deployment metadata.

## Why this stage matters

It builds the mental model that a backend and blockchain are separate runtimes:
- backend runtime (NestJS API process)
- blockchain runtime (local Hardhat node / Sepolia network)

Learning this boundary early prevents confusion in later tx-signing stages.

## Tasks

1. Install workspace dependencies.
2. Compile and test the starter contract.
3. Run local node and deploy contract.
4. Run API and verify health endpoint.

## Commands

Install:

```bash
pnpm install
```

Contracts:

```bash
pnpm run contracts:compile
pnpm run contracts:test
```

Run local node in terminal A:

```bash
pnpm run contracts:node
```

Deploy in terminal B:

```bash
pnpm run contracts:deploy:local
```

API:

```bash
pnpm run api:start:dev
curl http://localhost:3000/health
```

## Expected outcomes

- Contract compiles and tests pass.
- A local deployment file appears at `packages/contracts/deployments/localhost.json`.
- API returns `{ "status": "ok" }` for the health endpoint.

## Concepts learned

- ABI and contract address as backend integration primitives.
- Chain-specific deployment (localhost vs Sepolia).
- Difference between read/call actions and transaction-based actions.

## Branch workflow for this step

- branch name: `step-1-setup`
- commit scope: setup only (no NFT logic yet)
- merge condition: all Step 1 commands run successfully
