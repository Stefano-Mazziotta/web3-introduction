# Conventions

This document defines coding and delivery conventions for this project.

## Code Style

- Match existing style in each file before introducing new patterns.
- Keep functions focused and small where practical.
- Prefer explicit names over short ambiguous names.
- Add comments only for non-obvious logic or important invariants.

## TypeScript Conventions

- Prefer strict typing and avoid `any` unless unavoidable.
- Use interfaces/types for shared contracts.
- Validate external inputs at boundaries.
- Surface user-friendly error messages while preserving debug context.

## Solidity Conventions

- Use a pinned compiler version and keep it consistent.
- Validate function inputs and emit events for state-changing actions.
- Favor clear access control patterns.
- Keep gas optimization secondary to correctness and readability unless required.

## Web3 and Security

- Never commit private keys, mnemonics, RPC secrets, or wallet credentials.
- Treat signing and transaction submission paths as sensitive.
- Verify expected chain ID/network before write operations.
- Sanitize and validate user-provided addresses and amounts.

## Testing

- Add or update tests with behavior changes.
- Include unit tests for contract logic and boundary cases.
- Keep tests deterministic and avoid external network dependence in CI.

## Git and PRs

- Keep commits scoped to one intent.
- Use clear commit messages that explain why the change is needed.
- Do not include unrelated file changes.
- Update docs when setup or behavior changes.

## Definition of Done

- Requested behavior is implemented and validated.
- Lint/tests/build pass when configured.
- Relevant docs are updated.
