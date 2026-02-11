# Productized Offer Design: The Signals Spark

## Overview
**The Signals Spark** is a low-friction, high-impact entry point designed to bridge the gap between "legacy" Angular (RxJS/Zone.js) and "modern" Angular (Signals/Zoneless). It provides a tangible code example within the client's own repository to prove the benefits of modernization.

## Strategic Positioning
*   **Target Client:** Engineering managers or lead devs who want to modernize their stack but are struggling to find the time or "proof of concept" to show their stakeholders.
*   **The Problem:** The app is stuck in complex RxJS patterns and "spaghetti" change detection. The team is hesitant to move to Signals without a clear pattern.
*   **The Solution:** A 48-hour "Surgical Refactor" of one core service and component to serve as the master blueprint for the rest of the app.

## Value Proposition
*   **For the Manager:** Immediate proof that the app can be faster and easier to maintain.
*   **For the Developers:** A clear, production-ready "Golden Path" to follow for all future refactoring.

## Deliverables

### 1. The "Modern Core" Pull Request
*   **Service Refactor:** One core stateful service converted from `BehaviorSubject` to `Signal`.
*   **Component Refactor:** One complex component updated to use `inject()`, `Signal` inputs, and `computed()` logic.
*   **Boilerplate Removal:** Drastic reduction in RxJS subscriptions and manual change detection calls.

### 2. The Migration Masterclass (Video)
*   **Code Walkthrough:** A 15-minute Loom video explaining the specific refactor decisions.
*   **Strategy Guide:** A "Cheat Sheet" for the team: "When to Signal vs. When to RxJS."

## The 48-Hour Schedule
*   **Day 1: Discovery & Draft.** Identification of the "best candidate" service/component and initial refactor.
*   **Day 2: Validation & Handover.** Final testing, video recording, and PR submission.

## Pricing & Guardrails
*   **Investment:** $1,497 (Fixed Price).
*   **Timeline:** 2 Business Days.
*   **Guardrails:** 
    *   Applies to **one** service and **one** component only.
    *   Requires the application to be on Angular v16+.
    *   Focuses purely on logic/reactive state; no UI/UX changes.
