# Tests

## How to Run

```bash
npm test
```

## Test File: `audit-engine.test.ts`

| # | Test Name | What it Covers |
|---|-----------|----------------|
| 1 | should return no savings for optimal Cursor Pro plan | Verifies engine returns 0 savings when plan is already optimal |
| 2 | should recommend downgrade from Cursor Business for small team | Verifies Cursor Business → Pro downgrade logic for ≤2 seats |
| 3 | should recommend downgrade from Claude Team for single user | Verifies Claude Team → Pro downgrade for single user |
| 4 | should calculate correct annual savings | Verifies annual = monthly × 12 |
| 5 | should handle multiple tools and sum savings correctly | Verifies total savings across multiple tools |
| 6 | should recommend downgrade from GitHub Copilot Enterprise for small team | Verifies Enterprise → Business downgrade for ≤5 seats |
| 7 | should flag high API spend for optimization | Verifies API spend >$200/mo triggers optimization recommendation |

All 7 tests pass. Run with `npm test`.