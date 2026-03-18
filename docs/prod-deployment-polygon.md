# Production Deployment Flow - Polygon Mainnet

This guide explains how to deploy your NFT contract (`MyFirstNft`) to Polygon mainnet with production safety practices.

## Why Polygon Is Different

- Lower gas fees than Ethereum mainnet.
- Same EVM contract model and tooling (Hardhat/ethers still apply).
- Different chain and explorer configuration:
  - Chain ID: `137`
  - Native token for gas: `POL` (historically MATIC naming appears in tools/docs)

## Objective

- Deploy NFT contract to Polygon mainnet.
- Verify source on Polygonscan.
- Secure ownership and production operations.

## Prerequisites

- Contract and tests already validated in local and testnet environments.
- You have funded deployer wallet for Polygon gas.
- You understand constructor arguments and admin responsibilities.

## Step 1: Readiness Gates

Require before deployment:

1. `pnpm run contracts:compile` passes.
2. `pnpm run contracts:test` passes.
3. Access control and mint restrictions reviewed.
4. Metadata strategy is finalized and available.

Recommended:

- Run static analysis.
- Use a deployment checklist sign-off.

## Step 2: Configure Polygon in Hardhat

In `packages/contracts/hardhat.config.ts`, add a `polygon` network:

```ts
polygon: {
  url: process.env.POLYGON_RPC_URL ?? "",
  accounts: process.env.POLYGON_PRIVATE_KEY ? [process.env.POLYGON_PRIVATE_KEY] : [],
  chainId: 137
}
```

Add env vars (do not commit secrets):

- `POLYGON_RPC_URL`
- `POLYGON_PRIVATE_KEY`
- `POLYGONSCAN_API_KEY`

## Step 3: Add Polygon Deploy Commands

Add package scripts similar to:

- `deploy:polygon:nft`
- `deploy:polygon:hello` (optional learning parity)

Add root passthrough script:

- `contracts:deploy:polygon:nft`

## Step 4: Rehearse on Polygon Amoy (Recommended)

Before mainnet, run on Polygon testnet (Amoy):

- validate deployment script behavior
- validate constructor args and owner
- validate backend read and mint flow

## Step 5: Deploy to Polygon Mainnet

Run:

```bash
pnpm run contracts:deploy:polygon:nft
```

Record:

- deployment tx hash
- deployed address
- deployer address
- git commit SHA

## Step 6: Verify on Polygonscan

Verify source code and constructor args on Polygonscan.

Store links:

- contract page
- source verification page

## Step 7: Post-Deploy Security Steps

1. Transfer ownership to multisig.
2. Confirm `owner()` returns multisig address.
3. Restrict backend signer usage.
4. Monitor `NftMinted` events and tx failures.

## Step 8: Backend Cutover to Polygon

Update backend env:

- `CHAIN_ID=137`
- `RPC_URL=...polygon...`
- `NFT_CONTRACT_ADDRESS=...`
- production signer secret in secure store

Run smoke checks:

- read endpoints return expected values
- mint endpoint sends transaction and returns tx hash
- status flow is observable in logs and explorer

## Polygon-Specific Pitfalls

- Assuming Ethereum mainnet chain ID (`1`) in backend config.
- RPC provider limits causing intermittent failures.
- Confusing MATIC/POL naming in wallets and docs.
- Skipping testnet rehearsal and discovering config issues on mainnet.

## Deployment Checklist (Quick)

- [ ] Compile and tests green.
- [ ] Amoy rehearsal completed.
- [ ] Polygon RPC/key configured.
- [ ] Contract deployed and address recorded.
- [ ] Source verified on Polygonscan.
- [ ] Ownership transferred to multisig.
- [ ] Backend switched to chain ID `137`.
- [ ] Monitoring and runbook in place.
