# ng-animate-leave-repro

Minimal Angular repro for [`animate.leave` being skipped when two sibling `@if` blocks toggle exclusively in the same tick](https://github.com/angular/angular/issues/69291).

> ✅ **This is the `angular-21.1` branch — the WORKING baseline (Angular 21.1.6).** Clicking "Section B" while A is open collapses A with a smooth 600 ms shrink. Compare with the [`main` branch (Angular 21.2 — broken)](https://stackblitz.com/github/kaiguogit/ng-animate-leave-repro), where A vanishes instantly.

**Open this (working, 21.1) in StackBlitz:** https://stackblitz.com/github/kaiguogit/ng-animate-leave-repro/tree/angular-21.1
**Open the broken (21.2) version:** https://stackblitz.com/github/kaiguogit/ng-animate-leave-repro

---

## The Bug

When two instances of the same component are rendered in a `@for` loop and are toggled exclusively (one `@if` collapses while a sibling expands in the same change-detection tick), the **closing** component's `animate.leave` class is never applied — the element is removed from the DOM instantly instead of running its leave animation.

The regression was introduced by [angular/angular#67032](https://github.com/angular/angular/pull/67032) and first appears in Angular 21.2.x.

## Reproduction Steps

1. Open the app (or visit the StackBlitz link above).
2. Notice that **Panel A** starts open.
3. Click **"Toggle B"** — Panel A should shrink/collapse with a 600 ms animation, and Panel B should expand.
4. **Expected:** Panel A shrinks smoothly (the `leave` CSS animation runs for 600 ms).
5. **Actual (Angular 21.2.x):** Panel A disappears instantly — no animation.

## Expected vs Actual

| | Angular ~21.1.0 | Angular ~21.2.0 |
|---|---|---|
| Toggle B while A is open | A shrinks smoothly (600 ms) | A disappears instantly (**bug**) |
| Toggle A while B is open | B shrinks smoothly (600 ms) | B disappears instantly (**bug**) |

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
