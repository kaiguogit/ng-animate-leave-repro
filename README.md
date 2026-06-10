# ng-animate-leave-repro

Minimal Angular repro for [`animate.leave` being skipped when two sibling `@if` blocks toggle exclusively in the same tick](https://github.com/angular/angular/issues/69291).

**Open in StackBlitz:** https://stackblitz.com/github/kaiguogit/ng-animate-leave-repro

---

## The Bug

When two instances of the same component are rendered in a `@for` loop and are toggled exclusively (one `@if` collapses while a sibling expands in the same change-detection tick), the **closing** component's `animate.leave` class is never applied — the element is removed from the DOM instantly instead of running its leave animation.

The regression was introduced by [angular/angular#67032](https://github.com/angular/angular/pull/67032) and first appears in Angular 21.2.x.

## Reproduction Steps

1. Open the app (or visit the StackBlitz link above).
2. Notice that **Section A** starts open.
3. Click **"Section B"** — Panel A should shrink/collapse with a 600 ms animation while Panel B expands.
4. **Expected:** Panel A shrinks smoothly (the `leave` CSS animation runs for 600 ms).
5. **Actual (Angular 21.2.x):** Panel A disappears instantly — no animation.

## Expected vs Actual

The bug is **order-dependent** — it only breaks when the *closing* section comes **before** the *opening* one in DOM order. (Both sections update in one tick, walked in order, so the closing element is detached and tracked first, then the entering sibling removes it. Opening an earlier section inserts before anything is tracked, so its sibling's leave runs uncancelled.)

| | Angular ~21.1.0 | Angular ~21.2.0 |
|---|---|---|
| **Click Section B while A is open** (close earlier, open later) | A shrinks smoothly (600 ms) | **A disappears instantly — the bug** |
| Click Section A while B is open (close later, open earlier) | B shrinks smoothly (600 ms) | B shrinks smoothly (600 ms) — happens to work |

> ⚠️ Use the **first** direction (Section B while A is open) to see the bug. The second direction animates even on 21.2, so don't be misled by it.

## How to Switch Angular Versions

To **see the bug** (current state — `~21.2.0`):
```
npm install
npm run build   # or: npm start
```

To **see it work** (regression baseline — `~21.1.0`), edit `package.json` and change every `~21.2.0` to `~21.1.0`:
```json
"@angular/common":       "~21.1.0",
"@angular/compiler":     "~21.1.0",
"@angular/core":         "~21.1.0",
"@angular/forms":        "~21.1.0",
"@angular/platform-browser": "~21.1.0",
"@angular/router":       "~21.1.0",
"@angular/build":        "~21.1.0",
"@angular/cli":          "~21.1.0",
"@angular/compiler-cli": "~21.1.0"
```
Then:
```
npm install
npm start
```

## Project Info

- **Scaffolded with:** `@angular/cli@~21.2.0` (`ng new`)
- **Change-detection mode:** Zoneless (no `zone.js` — the CLI now scaffolds zoneless apps by default in Angular 21.2)
- **Framework:** Angular 21.2.x standalone components, `@if`, `@for`, `animate.enter` / `animate.leave`

## Related

- Issue: https://github.com/angular/angular/issues/69291
- Regression PR: https://github.com/angular/angular/pull/67032
