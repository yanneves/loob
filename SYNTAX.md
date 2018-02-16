# Syntax

```
IF [CONTEXT_VALUE] IS EQUAL TO "Value" THEN "<String>"
```

## Operators

- `IF`
- `ELSE`
- `AND`
- `OR`
- `THEN`
- `ERROR`
- `IS`
  - `NOT`
  - `EQUAL TO`
  - `MORE THAN`
  - `LESS THAN`

## Rules

There are always a minimum of two branches within an Expression.

All branches except the last one begin with `IF`.

There can only be one `IF` in a branch.

There can only be one `THEN` in a branch.

The `THEN` always comes at the end of the branch.

The last branch alway begins with `ELSE`.

The last branch always consists only of `ELSE` and `THEN`.

All Expressions will `ERROR` by default. If nothing is filled in `ELSE` then it defaults to `ERROR`.

`IS` can only be followed by `NOT` or an operator.

`NOT` can only be followed by an operator.

Branches are executed in the order in which they are written. When written order is ambiguous, use `()` parentheses.
