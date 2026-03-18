# Step 2 - ERC721 NFT Basics

This stage adds a minimal ERC721 NFT contract without removing the Step 1 starter contract.

## What we build

- `MyFirstNft.sol` using OpenZeppelin `ERC721URIStorage` and `Ownable`.
- Owner-only `mintTo(address to, string metadataUri)` function.
- Custom errors for invalid recipient and empty metadata URI.
- Tests covering minting behavior, access control, metadata, and token ID increments.

## Why this stage matters

It introduces the on-chain model behind NFTs:
- unique token IDs
- wallet ownership via `ownerOf`
- metadata references via `tokenURI`

This is the foundation for backend read endpoints (Step 4) and mint endpoint (Step 5).

## Tasks

1. Add OpenZeppelin contracts dependency.
2. Implement `MyFirstNft` with per-token URI storage.
3. Update deployment script to support both `HelloChain` and `MyFirstNft`.
4. Add ERC721-specific behavior tests alongside starter tests.
5. Compile, test, and deploy locally.

## Commands

Install:

```bash
pnpm install
```

Compile and test:

```bash
pnpm run contracts:compile
pnpm run contracts:test
```

Deploy to localhost:

```bash
pnpm run contracts:node
# in another terminal
pnpm run contracts:deploy:local:nft
```

## Expected outcomes

- ERC721 contract compiles and tests pass.
- Deployment output shows `contractName: "MyFirstNft"`.
- Local deployment file updates at `packages/contracts/deployments/localhost.json`.
- Contract-specific artifact is also written at `packages/contracts/deployments/localhost.MyFirstNft.json`.

## Concepts learned

- How ERC721 ownership and metadata are represented on-chain.
- Why access control (`onlyOwner`) is critical for mint functions.
- How per-token URI storage enables simple metadata integration.

## Branch workflow for this step

- branch name: `step-2-erc721`
- commit scope: contract + tests + deploy script + docs
- merge condition: compile, tests, and local deploy all succeed
