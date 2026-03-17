# AGENTS

Guide for coding agents working in this repository.

## Purpose

- Provide practical build/lint/test commands.
- Define coding and delivery conventions.
- Capture repository-specific guardrails for safe autonomous edits.

## Repository Context

- Project name: `web3-introduction`.
- Intended stack: TypeScript + Solidity.
- Package manager target: pnpm.
- Current repo state is docs/config heavy and code-light.
- Treat missing scripts/config as "not yet configured," not as failure.

## Source-of-Truth Files

- `AGENTS.md` (this file): agent workflow and command policy.
- `docs/CONVENTIONS.md`: baseline style and engineering conventions.
- `opencode.config.json`: project metadata and expected workflows.

## Cursor/Copilot Rules Check

Checked for:
- `.cursor/rules/`
- `.cursorrules`
- `.github/copilot-instructions.md`

Result:
- No Cursor rules found.
- No Copilot instructions file found.
- If these files are added later, follow them as higher-priority local policy.

## Agent Working Rules

- Prefer small, reversible changes.
- Keep diffs tightly scoped to the task.
- Avoid touching unrelated files.
- Follow existing patterns before introducing new abstractions.
- For non-trivial tasks, create a short explicit plan.
- Document assumptions when repo signals are incomplete.

## Command Discovery Workflow

Before running checks, inspect available config/scripts:

1. If `package.json` exists, use its scripts first.
2. If `hardhat.config.*` exists, use Hardhat commands.
3. If `foundry.toml` exists, use Foundry commands.
4. If `vitest.config.*` exists, use Vitest test selectors.
5. If `jest.config.*` exists, use Jest test selectors.

If none exist, report what was checked and continue with best-effort static review.

## Build/Lint/Test Commands

Use script-based commands when available.

### Dependency Install

- `pnpm install`

### Lint

- Preferred: `pnpm run lint`
- If script absent, use framework lints only when config exists.

### Build

- Preferred: `pnpm run build`
- Solidity compile equivalents (if configured):
  - `npx hardhat compile`
  - `forge build`

### Test (All)

- Preferred: `pnpm test`
- Alternate script form: `pnpm run test`

### Test (Single Test) - Important

Use the matcher for the detected framework.

- Vitest single file: `npx vitest run path/to/file.test.ts`
- Vitest single case: `npx vitest run path/to/file.test.ts -t "case name"`
- Jest single file: `npx jest path/to/file.test.ts`
- Jest single case: `npx jest path/to/file.test.ts -t "case name"`
- Hardhat single file: `npx hardhat test test/Example.ts`
- Hardhat single case: `npx hardhat test --grep "case name"`
- Foundry single file: `forge test --match-path test/Example.t.sol`
- Foundry single case: `forge test --match-test testFunctionName`

### Type Check

- Preferred script: `pnpm run typecheck`

## Code Style Guidelines

Apply `docs/CONVENTIONS.md` first, then these details.

### Imports

- Group imports in this order: standard library, third-party, internal.
- Prefer named imports over wildcard imports.
- Keep import lists minimal; remove unused entries.
- Use existing path alias strategy if one is configured.

### Formatting

- Respect configured formatter/linter rules when present.
- Match local file style (indentation, spacing, line wrapping).
- Avoid formatting-only edits in unrelated files.

### Types

- Prefer strict types; avoid `any` unless truly necessary.
- Use `type`/`interface` for shared contracts.
- Keep exported API signatures explicit.
- Validate unknown external input at module boundaries.

### Naming

- Use descriptive, intent-revealing names.
- `PascalCase`: classes, types, interfaces, contracts.
- `camelCase`: variables, functions, methods.
- `UPPER_SNAKE_CASE`: constants and env vars.
- Test names should describe behavior and expected outcome.

### Error Handling

- Fail fast for invalid arguments and malformed inputs.
- Do not silently swallow exceptions.
- Add context when rethrowing errors.
- Return user-safe messages while preserving debug detail for logs.
- Handle async rejection paths explicitly.

### Solidity-Specific

- Keep compiler version pinned and consistent.
- Validate function inputs.
- Enforce access control clearly and early.
- Emit events for meaningful state changes.
- Prioritize correctness/readability over premature gas micro-optimizations.

### Testing

- Add/update tests when behavior changes.
- Cover happy path, edge cases, and failure modes.
- Keep tests deterministic and isolated.
- Avoid dependence on live external networks in automated runs.

## Security and Web3 Safety

- Never commit private keys, seed phrases, or RPC secrets.
- Treat signing and transaction submission flows as sensitive.
- Verify chain/network assumptions before write operations.
- Validate and sanitize user-supplied addresses and amounts.

## Git and Change Hygiene

- Do not rewrite history unless explicitly requested.
- Keep commits scoped to one intent.
- Do not include unrelated changes.
- Use commit messages that explain why the change exists.

## Definition of Done

- Requested behavior is implemented.
- Relevant lint/test/build checks pass when configured.
- Documentation is updated when behavior or setup changes.
- Assumptions are documented in the final report.
