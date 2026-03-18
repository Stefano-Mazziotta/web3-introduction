# Production Deployment Flow - Ethereum Mainnet

This guide explains a practical, safety-first flow to deploy your NFT contract (`MyFirstNft`) to Ethereum mainnet.

## Objective

- Deploy a tested NFT contract to Ethereum mainnet.
- Verify contract source publicly.
- Move ownership to secure operations (multisig).
- Keep an auditable deployment record.

## Prerequisites

- Contract logic is feature-complete (mint permissions, metadata strategy, limits).
- Tests pass locally and on Sepolia.
- You understand constructor parameters and cannot change them after deploy.
- Deployer wallet is secured and funded with ETH.

## Step 1: Security and Readiness Gates

Before mainnet deployment, require all of these:

1. `pnpm run contracts:compile` passes.
2. `pnpm run contracts:test` passes.
3. Manual review of access control paths (`onlyOwner`, ownership transfer).
4. Metadata URLs are final and stable (prefer IPFS or durable hosting).
5. Deployment configuration is peer-reviewed.

Recommended extras:

- Run static analysis tooling (for example, Slither).
- External audit for high-value collections.

## Step 2: Configure Mainnet Network in Hardhat

In `packages/contracts/hardhat.config.ts`, add an `ethereum` network entry.

Example shape:

```ts
ethereum: {
  url: process.env.ETH_MAINNET_RPC_URL ?? "",
  accounts: process.env.ETH_MAINNET_PRIVATE_KEY ? [process.env.ETH_MAINNET_PRIVATE_KEY] : [],
  chainId: 1
}
```

Add these variables to your `.env` (never commit secrets):

- `ETH_MAINNET_RPC_URL`
- `ETH_MAINNET_PRIVATE_KEY`
- `ETHERSCAN_API_KEY`

## Step 3: Add a Mainnet Deploy Script Target

Use your existing deploy script (`packages/contracts/scripts/deploy.ts`) and add scripts like:

- `deploy:ethereum:nft`
- `deploy:ethereum:hello` (optional, for learning parity)

From root, add passthrough script(s):

- `contracts:deploy:ethereum:nft`

## Step 4: Dry Run on Sepolia

Run the exact command pattern on Sepolia first.

Example:

```bash
pnpm run contracts:deploy:sepolia:nft
```

Verify:

- constructor args are correct
- owner address is expected
- mint function works from intended backend signer

## Step 5: Deploy to Ethereum Mainnet

Run deployment:

```bash
pnpm run contracts:deploy:ethereum:nft
```

Capture and store:

- deployment tx hash
- deployed contract address
- deployer address
- deployed bytecode hash (optional but useful)
- git commit SHA used for deployment

## Step 6: Verify on Etherscan

Use Hardhat verification with constructor args. Verification makes the contract transparent for users and integrators.

Store links in release notes:

- Etherscan contract page
- verified source page

## Step 7: Post-Deploy Hardening

1. Transfer ownership to multisig (for example, Safe).
2. Confirm `owner()` is multisig address.
3. Restrict backend mint signer operationally (least privilege).
4. Set up event monitoring for mint activity and failures.

## Step 8: Backend Production Cutover

Update backend environment:

- `CHAIN_ID=1`
- `RPC_URL=...mainnet...`
- `NFT_CONTRACT_ADDRESS=...`
- backend signer key (secure store, not plaintext in repo)

Then run smoke checks:

- read endpoint (`ownerOf`/`tokenURI`) works
- mint endpoint behavior is as expected
- logs include tx hash and status lifecycle

## Common Mainnet Mistakes

- Deploying with wrong constructor params.
- Using a wallet without enough ETH for deployment gas.
- Pointing backend to wrong chain ID.
- Keeping ownership on a single hot EOA.
- Unstable metadata hosting.

## Deployment Checklist (Quick)

- [ ] Compile and tests green.
- [ ] Sepolia rehearsal completed.
- [ ] Mainnet RPC and key configured.
- [ ] Contract deployed and address recorded.
- [ ] Source verified on Etherscan.
- [ ] Ownership transferred to multisig.
- [ ] Backend updated with mainnet contract and chain ID.
- [ ] Monitoring and runbook prepared.
