**Quote Factory: Phase 0 — Scope and Decisions**

**The starting agreement for documenting the app and deciding what the clone must include**

Prepared October 23, 2026 | Broker app discovery and local-document review.

**Status:** Phase 0 documentation baseline delivered. Client scope, named reviewers, test access and implementation priorities are awaiting confirmation. This is not an approved build specification.

**1\. Start here**

Read this file → review the [Coverage and Open Questions](Documentation%20Coverage%20and%20Open%20Questions.md) → use the [Evidence Register](Documentation%20Evidence%20Register.md) to check what was actually observed → return to the [Documentation Plan](Quote%20Factory%20Documentation%20Plan.md) for the later phases.

**What “first phase” means:** The agreed plan begins with **Phase 0**. This delivery implements its inventory, scope matrix, guide-gap review, evidence rules and decision log. Phase 1 has since been delivered in the main guide: business overview, navigation and terminology. Phase 2 observed-form documentation has also been delivered; Phase 3 observed documentation is delivered in main §14; Phase 4 observed documentation is delivered in main §15; Phase 5 observed documentation is delivered in main §16; Phase 6 observed documentation is delivered in main §17; Phase 7 observed documentation is delivered in main §18; Phase 8 is next.

**2\. Confirmed instructions and working boundaries**

| ID | Instruction or boundary | Basis | Status |
| --- | --- | --- | --- |
| D-01 | Document the system from the top-level business down to individual use cases, terminology, fields, buttons and dependencies. | User request in this chat | Confirmed documentation direction |
| D-02 | Use the existing Markdown guide's plain language, numbered sections and examples; include URLs and click paths. | User request in this chat | Confirmed writing format |
| D-03 | Work in phases and explain what the user should do next after each delivery. | User request in this chat | Confirmed delivery approach |
| D-04 | Implement Phase 0 documentation. | User's instruction to start the first phase | Baseline delivered |
| D-05 | Inspect accessible broker screens and read-only controls for evidence. | User asked for exploration through interaction | Current exploration method |
| D-06 | Keep first-release clone scope distinct from the full documentation inventory. | Planning convention; no client selection supplied | Proposed scope-control method |
| D-07 | No production records or settings need to be changed to establish this baseline. | Phase 0 discovery does not require submissions | No save, booking, status change, message or payment performed |
| D-08 | Maintain one main document containing the content delivered across phases. | User clarified the final delivery format in this chat | Confirmed; Phase 1 written directly in the workflow guide |

**Important:** The user has authorized documentation work. That does not tell us which modules the client wants implemented, who holds final approval, or which live records can be used for mutation tests.

**3\. Scope matrix — documentation discovery versus clone implementation**

**Documentation scope:** Discover all accessible areas and register missing access. Detailed coverage is delivered in the assigned phase.  
**Clone scope:** Every row below is **Awaiting client decision**. Nothing has been silently excluded or approved.  
**Owners:** The roles below are suggested reviewers, not confirmed assignments. Team lead must supply names.

| Area | Documentation coverage required | Detailed phase | Proposed business reviewer | Clone scope |
| --- | --- | --- | --- | --- |
| Dashboard and global navigation | Task queues, map, search, shortcuts, counters and navigation | 1, 8 | Operations lead | Awaiting decision |
| Actors and terminology | Broker, customer, pickup/delivery parties, carrier, vendor, rep and freight terms | 1 | Operations lead | Awaiting decision |
| Customers | Creation, details, contacts, credit/billing, quote settings, addresses, linked activity | 2 | Sales/operations lead | Awaiting decision |
| Carriers and service vendors | Separate creation paths, details, provider types, assignment and onboarding | 2 | Carrier operations lead | Awaiting decision |
| Quotes | LTL/TL inputs, freight options, class/NMFC, rates, offers, pricing, sharing and booking handoff | 3 | Pricing/operations lead | Awaiting decision |
| Shipment lists and coverage | Direct creation, lists, filters, leads, coverage and provider assignment | 4 | Dispatch/operations lead | Awaiting decision |
| Shipment detail | Cards, stops, financial summary, freight, map, notes and related documents | 4 | Operations lead | Awaiting decision |
| Editing and progress | Edit rules, status transitions, scheduling, pickup, tracking, delivery and exceptions | 5 | Dispatch/operations lead | Awaiting decision |
| Documents | Customer/carrier confirmations, BOL, POD, other files, revisions and delivery | 6 | Operations/accounting lead | Awaiting decision |
| Bills and invoices | Upload/review, approvals, disputes, terms, payment recording and accounting queues | 6 | Accounting lead | Awaiting decision |
| External dependencies | Carrier services, maps, tracking, accounting, classification, communication and others | 7 | Integration lead + client account owner | Awaiting decision |
| Settings and permissions | Company, users, teams, customer/carrier/accounting settings and external references | 8 | Admin/team lead | Awaiting decision |
| Reports and exports | Lanes, report definitions, filters, metrics, exports and access | 8 | Reporting/accounting lead | Awaiting decision |
| Support and training | External links, support controls and whether equivalent features are wanted | 8 | Client product owner | Awaiting decision |
| Customer/other portals | Role-specific access, quote approval/tender, tracking and documents | 1–9 as applicable | Client product owner | Awaiting decision; alternate-role session not inspected |
| Migration and operating requirements | Historical records/documents, volume, audit retention, backup and performance targets | 0, 8, 9 | Team lead + client product owner | Awaiting decision |

**How to approve a row:** Record Included in release 1 / Later release / Excluded, the exact included use cases, any manual fallback, the approver's name and decision date. For broad rows such as Quotes, select specific modes and workflows rather than approving an ambiguous label.

**4\. Client/team-lead decision log**

All questions are **Open** as of October 23, 2026. No response is inferred from silence. The “needed before” column identifies dependent work; learning documentation can continue where the answer is unnecessary.

| ID | Exact question to resolve | Proposed answer owner | Needed before |
| --- | --- | --- | --- |
| SC-01 | Are we matching appearance, workflows, or both? Which changes to Quote Factory behavior/design are allowed? | Client product owner | Clone design and acceptance criteria |
| SC-02 | For each scope-matrix row, what is included in release 1, later, or excluded? Which LTL/TL/equipment workflows and territories? | Client product owner + team lead | Release estimate and implementation |
| SC-03 | Which roles and portals must we support? Please identify broker/admin/customer/carrier/driver access actually required. | Client product owner | Role-specific requirements |
| SC-04 | Who answers operational questions, reviews each chapter and gives final scope approval? Please supply names. | Team lead | Business-rule sign-off |
| SC-05 | Is there a test environment? Which records may be created/edited, and which sends, bookings or accounting syncs are suppressed there? | Team lead + account administrator | Save, validation, transition and integration tests |
| SC-06 | How does an actual customer request arrive, who approves price, and who tenders/books each LTL and TL workflow? | Operations lead | Verified business lifecycle |
| SC-07 | Which providers and operations must work at launch? Which may be manual? Who owns each account and test access? | Integration lead + client account owner | Integration requirements and estimates |
| SC-08 | Which rules govern price, margin, credit, added charges, bill approval and customer payment terms? | Pricing/accounting lead | Financial behavior and acceptance criteria |
| SC-09 | Which documents must be generated/shared/signed, who receives them, and which edits trigger a resend? | Operations/accounting lead | Document and edit side-effect requirements |
| SC-10 | Which records/documents/history must migrate? What are the volume, retention and operating targets? | Team lead + client product owner | Data/hosting design and migration estimate |
| SC-11 | What are the deadline, phase priorities and required acceptance scenarios? | Team lead + client product owner | Delivery commitment |
| SC-12 | Accounting currently displays “Not connected to QuickBooks”; the older guide says enabled. Is this expected, and is QuickBooks required for the clone? | Accounting lead + account administrator | Accounting integration readiness |

**Decision record to fill after an answer**

| Decision ID | Related SC / inventory IDs | Agreed behavior or release choice | Decided by | Date | Evidence/reference | Documentation affected |
| --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending client/team-lead replies | No client build decisions recorded yet | Unassigned | — | — | — |

The approved answer should be copied here or linked to an accessible written record. A developer's recommendation remains a proposal until the business reviewer agrees.

**5\. Evidence and writing rules**

| Label | Meaning | Example |
| --- | --- | --- |
| Observed in app | Visible result from a documented screen/action and date | Accounting settings displays “Not connected to QuickBooks.” |
| Existing-guide claim | What the dated local guide says; not proof of current state | API guide says QuickBooks is enabled. |
| Industry definition | Meaning checked against a named authoritative source | Freight-class definition; to be sourced in the glossary phase. |
| Client confirmed | Written operational requirement agreed by the named reviewer | None recorded yet for clone scope. |
| Proposed clone behavior | Recommended implementation awaiting agreement | A possible manual fallback for an unavailable provider. |
| Unverified | A question or behavior not established by available evidence | Exact effect of Update shipment on carrier dispatch. |

For each observation, record evidence ID, date, actor/session context, URL, path/action, visible result, limitations, capture reference and proposed reviewer. Keep a single observation narrow enough to verify.

**Current actor context:** The session displays the Stackup Solutions profile in the 10-4 Global broker app. This proves the visible session context, not its exact permission role or administrator privileges.

**Capture policy:** Phase 0 uses summarized DOM/accessibility observations. Screenshots are not attached in this baseline; screenshot reference is explicitly recorded as “Not captured.” Later annotated screenshots should mask unrelated contacts/financial data and preserve the label being explained. Do not save keys, passwords, raw account payloads or unnecessary private details.

**Conflict policy:** Keep the old claim and the newer observation separately, record the dates, and assign a follow-up. Do not silently rewrite a provider's account state or conclude why it changed.

**6\. Completion and handoff**

| Phase 0 deliverable | Delivery state | Remaining qualification |
| --- | --- | --- |
| Scope matrix | Delivered | All clone decisions await client selection |
| Known-screen/use-case inventory | Delivered | Baseline of discovered surfaces; expands as deeper phases reveal controls |
| Existing-guide gap review | Delivered | Corrections scheduled with the relevant chapter/provider research |
| Evidence register and evidence labels | Delivered | Text evidence; screenshots not captured |
| Client decision log | Delivered | Questions open; named owners not supplied |
| Phase 1 handoff | Delivered | Read-only learning work can start while scope answers are collected |

**Phase 0 exit status:** The documentation work for this baseline is complete. The scope-agreement portion remains pending the decisions above. Do not call the entire scope approved, or the whole app exhaustively documented, from this delivery.

**What you should do next**

1. Read the [scope matrix and questions in this file](Phase%200%20Scope%20and%20Decisions.md). Take SC-01 through SC-05 to your team lead first: target, release scope, roles, reviewers and test access.
2. Ask the team lead/client to answer the remaining business/integration questions with names and dates. You can paste the answers into this chat; they will then be reflected in the decision log.
3. Read the delivered **Phase 1** content and exercises in the [main guide](Quote%20Factory%20Quote%20Workflow%20Guide.md). Phase 2 customer/carrier/vendor/location documentation is now in main §§12–13. Phase 3 quote/classification/pricing documentation is now in main §14. Phase 4 lists/coverage/detail documentation is now in main §15. Phases 5–6 observed content is now in main §§16–17. Phase 7 research is in main §18 and the existing API guide. The next phase is **Phase 8 — Settings, access, reporting and remaining modules**. Independent read-only documentation can continue while scope answers are collected.

No third party was contacted and no approval was requested through the app during Phase 0. This handoff is a review checklist for you, not a sent message to the client.
