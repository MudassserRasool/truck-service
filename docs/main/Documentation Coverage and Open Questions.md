**Quote Factory: Documentation Coverage and Open Questions**

**The screen inventory, existing-guide gaps, and follow-up work for every phase**

Prepared October 23, 2026 | Phase 0 baseline.

**1\. How to use this inventory**

Each ID below is a stable documentation/use-case ID. Start with its link or click path, check the evidence, then write the detailed explanation in the named chapter during its assigned phase. Split a broad ID into child IDs when exploration reveals more fields, dialogs or role variants; retain the parent for traceability.

**Status key:**

- **O — Observed:** Screen or control inspected; detailed behavior not yet documented.
- **P — Partly documented:** Existing guide explains part of it; fields/actions/branches remain.
- **N — Not explored:** Entry point discovered, destination/actions not inspected.
- **B — Blocked:** Required role, test access or business evidence is not available.
- **D — Documented:** Detailed instructions, rules and evidence reviewed. No application use case has this status in the baseline.

**Scope:** Every inventory item inherits **Awaiting client decision** from the [scope matrix](Phase%200%20Scope%20and%20Decisions.md). An O or P status means documentation evidence exists, not that the feature is approved for the clone.  
**Owner:** Documentation author maintains every row. Chapter reviewer roles below are proposed; named assignments await SC-04.  
**Evidence:** E-IDs resolve in the [Evidence Register](Documentation%20Evidence%20Register.md). No screenshots are attached in this baseline.  
**Coverage limit:** This is the known accessible-surface inventory, not a claim that every hidden form/role/option has been discovered. Each detailed phase must extend it.

**Baseline totals:** 89 inventory items — 33 Observed, 21 Partly documented, 33 Not explored and 2 Blocked. None is marked fully Documented or approved for the clone. The 2 blocked items are alternate-role access and mutation tests requiring a designated test environment.

**Chapter and reviewer key**

| Code | Planned chapter | Detailed phase | Proposed reviewer |
| --- | --- | --- | --- |
| SYS | System Overview and Navigation | 1 | Operations lead |
| TERM | Freight Terminology and Calculations | 1 onward | Operations/pricing lead |
| MASTER | Customers Carriers and Vendors | 2 | Sales/carrier operations lead |
| QUOTE | Quote Creation and Pricing | 3 | Pricing lead |
| SHIP | Shipment Operations and Details | 4 | Dispatch/operations lead |
| EDIT | Shipment Editing and Tracking | 5 | Dispatch/operations lead |
| MONEY | Documents Billing and Accounting | 6 | Accounting/operations lead |
| API | Existing third-party access guide + capability matrix | 7 | Integration lead + client account owner |
| ADMIN | Settings Roles and Reporting | 8 | Admin/reporting lead |
| FLOW | End-to-End Walkthroughs | 9 | Team lead + business reviewers |

**2\. Navigation and shared surfaces**

| ID | Screen / control and how to open it | Status | Chapter | Evidence | Next detail to document |
| --- | --- | --- | --- | --- | --- |
| SYS-01 | [Dashboard](https://app.quotefactory.com/broker/dashboard) | O | SYS | E-04–05 | Panels, counters, date basis, shortcuts and map behavior |
| SYS-02 | Sidebar → Find / Find anything | N | SYS, ADMIN | E-04 | Search dialog, searchable entities, results and permission filtering |
| SYS-03 | Dashboard → Quote / Requested / Quoted shortcuts | O | SYS, QUOTE | E-05 | Queue inclusion and requested-to-quoted handoff |
| SYS-04 | Dashboard → Dispatch queue | N | SYS, SHIP | E-05 | Who dispatches, prerequisites, list/actions and resulting state |
| SYS-05 | Sidebar → [Cover](https://app.quotefactory.com/broker/shipments/covering/all) | O | SYS, SHIP | E-04; T0 user-selected cover screen | List values, leads, coverage decisions and counter rules |
| SYS-06 | Sidebar → [Confirm pickups](https://app.quotefactory.com/broker/shipments/scheduled/all) | N | SYS, EDIT | E-04 | Queue filters, confirmation form and saved result |
| SYS-07 | Sidebar → [Confirm deliveries](https://app.quotefactory.com/broker/shipments/delivering/all) | O | SYS, EDIT | E-04; T0 queue navigation | Queue filters, confirmation form, POD and saved result |
| SYS-08 | Sidebar → [Training](https://quotefactory.talentlms.com/) | N | ADMIN | E-04 | External handoff and learning resources relevant to clone scope |
| SYS-09 | Sidebar → Support | N | ADMIN | E-04 | Help widget, knowledge base and contact boundaries |
| SYS-10 | Sidebar → [Profile](https://app.quotefactory.com/profile) | N | ADMIN | E-04, E-22 | Profile fields and role/account information without changing credentials |
| SYS-11 | Customer/other role portals | B | SYS, ADMIN, FLOW | E-09, E-24 expose login controls only | SC-03/05: provide role walkthrough/test access |

**3\. Customers, carriers and vendors**

Customer example: [open the inspected customer](https://app.quotefactory.com/broker/customer/66c366f48a53dbc0fdaed429). Fallback: sidebar → Customers → choose an authorized example. A record-specific URL can stop working; keep both paths in future chapters.

| ID | Screen / control and how to open it | Status | Chapter | Evidence | Next detail to document |
| --- | --- | --- | --- | --- | --- |
| CUS-01 | [Customers list](https://app.quotefactory.com/broker/customers) | O | MASTER | E-08 | Columns, sorting/filtering, credit and rep indicators |
| CUS-02 | Customers → Add a new customer / sidebar plus | O | MASTER | E-08 | Name matching, duplicate handling, submit result and next form |
| CUS-03 | Customer → Overview / Edit customer details | O | MASTER | E-09 | All detail fields, save rules, vendor number and contact links |
| CUS-04 | Customer → Contacts / View all customer contacts | N | MASTER | E-09 | Primary/billing contacts, multiple contacts and validation |
| CUS-05 | Customer → Manage reps | N | MASTER, ADMIN | E-09 | Assignment, ownership, teams and visibility |
| CUS-06 | Customer → Manage credit limits / Edit customer billing | N | MASTER, MONEY | E-09 | Credit eligibility, terms, invoice preferences, required POD and overrides |
| CUS-07 | Customer → Booking & quoting | N | MASTER, QUOTE | E-09 | Customer margins, login, auto-quoting/dispatch and global inheritance |
| CUS-08 | Customer → Shipments / Quotes tabs | N | MASTER, SHIP, QUOTE | E-09 | Linked histories, columns and actions |
| CUS-09 | Customer → Addresses tab | N | MASTER | E-09 | Location templates, creation/reuse and shipment-only edits |
| CUS-10 | Customer → Invoices / Payments tabs | N | MASTER, MONEY | E-09 | Receivables and payment allocation/history |
| CUS-11 | Customer → Documents / external references / note / Timeline | N | MASTER, ADMIN | E-09 | Attachments, mapping IDs, note audience and audit behavior |
| CAR-01 | [Carriers / Vendors](https://app.quotefactory.com/broker/vendors/carriers) → Carriers / All | O | MASTER | E-10 | Filters, identifiers, carrier details and duplicate handling |
| CAR-02 | Create new vendor → Carrier | N | MASTER | E-10 chooser observed | MC/DOT lookup, required fields, onboarding and save result |
| CAR-03 | Shipment → carrier detail, or Bill → carrier link | N | MASTER | E-13, E-19 | Carrier detail tabs, contacts, equipment, compliance and document access |
| VEN-01 | Carriers / Vendors → Vendors tab | O | MASTER | E-10 | Service types, list fields and separation from carriers |
| VEN-02 | Create new vendor → Vendor | N | MASTER | E-10 chooser observed | Full form, type options, billing/contact fields and creation rules |
| VEN-03 | Quote/shipment → Add another vendor | N | MASTER, QUOTE, SHIP | E-07, E-13 | Service selection, multiple providers and cost/bill effects |

**4\. Quotes and freight details**

| ID | Screen / control and how to open it | Status | Chapter | Evidence | Next detail to document |
| --- | --- | --- | --- | --- | --- |
| QTE-01 | [Quote history](https://app.quotefactory.com/broker/quote-history) | O | QUOTE | E-11 | Search, booked/expired indicators, pagination and record relationships |
| QTE-02 | [Quote form](https://app.quotefactory.com/broker/quote) → customer/equipment/date | P | QUOTE | E-01 §§2–3, E-07 | Dropdown catalog, required/default values and LTL/TL variants |
| QTE-03 | Quote → origin/destination, expand location, pickup/delivery services | P | QUOTE | E-01 §6, E-07 | Addresses, location types, service options and dependencies |
| QTE-04 | Quote → packaging/quantity/dimensions/weight/units | P | QUOTE, TERM | E-01 §6, E-07 | Units, quantity semantics, mixed items, formulas and validation |
| QTE-05 | Quote → Freight class / NMFC | P | QUOTE, TERM, API | E-01 §6, E-06 | Value meanings, classification source/owner, lookup and reclassification |
| QTE-06 | Quote → Stackable / Hazmat / Protect from freezing | P | QUOTE, TERM | E-01 §6, E-07 | Conditional fields, service effects and carrier restrictions |
| QTE-07 | Quote → add item, estimated total length, Linear Feet Visualizer | P | QUOTE, TERM | E-01 §6, E-07 | Multi-unit calculations, floor layout, stacking and overrides |
| QTE-08 | Quote → Get quotes | P | QUOTE, API | E-01 §§2,4, E-07 | Validation, loading/no rates, partial provider failure and retry |
| QTE-09 | History → [booked result example](https://app.quotefactory.com/broker/quote-results/6ada31e36fac98ba0aa91bcb) | P | QUOTE | E-01 §4, E-12 | Offer details, filters, guarantees, network/direct rates and stacked offers |
| QTE-10 | Offer → cost/margin/profit/price | P | QUOTE, TERM | E-01 §5, E-12 | Editable versus locked state, overrides, rounding and guardrails |
| QTE-11 | Result → Sharing / customer visibility / reference/menu | P | QUOTE | E-01 §2, E-12 | Recipients, public/private access, approval/tender and audit history |
| QTE-12 | Result → manual quote / Book / View Shipment | P | QUOTE, SHIP | E-01 §§2,4; E-12 confirms booked banner/View Shipment | Inspect manual/eligible offer states; test actual booking and duplicates in test environment |

**5\. Shipments, edits and tracking**

Reference: [open shipment](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4). All controls below refer to this inspected example unless stated otherwise. Status-specific variants require later examples.

| ID | Screen / control and how to open it | Status | Chapter | Evidence | Next detail to document |
| --- | --- | --- | --- | --- | --- |
| SHP-01 | [Shipments](https://app.quotefactory.com/broker/shipments) → Active / All | O | SHIP | E-27 | Row fields, list states, sorting, pagination and export menu |
| SHP-02 | Shipments → View shipment filters | O | SHIP | E-27 | Search/status/equipment/date/address/carrier/customer/rep filters; URL persistence and See shipments behavior |
| SHP-03 | Sidebar / list → [Create new shipment](https://app.quotefactory.com/broker/shipment/new) | N | SHIP | E-04 link | Direct creation versus quote conversion, fields and initial state |
| SHP-04 | Cover queue → shipment/leads | N | SHIP | E-04; user cover screenshot | Lead source, carrier offers, selection/assignment and state rules |
| SHP-05 | Shipment → header, reps and status progression | P | SHIP, EDIT | E-01 §8, E-13 | Status transitions, assigned actors and rep management |
| SHP-06 | Shipment → carrier/customer/vendor cards | O | SHIP | E-13 | Card fields, detail links, invoice reference and provider relationship |
| SHP-07 | Shipment → financial summary / Expand itemized view | P | SHIP, MONEY | E-01 §5, E-13 | Target cost versus actual bills, line-item details and totals |
| SHP-08 | Shipment → stops / appointments / In / Out / ETA | O | SHIP, EDIT | E-13 | Dates/time zones, arrival/departure and confirmation controls |
| SHP-09 | Shipment → driver information / tracking controls | P | EDIT, API | E-01 §7, E-13 | Driver/truck/trailer, tracking requests, completed/off-route and external event source |
| SHP-10 | Shipment → add tracking update / Delivered | P | EDIT | E-01 §§7–8, E-13 | Form fields, Notes/PRO, confirmation/POD and transition effects; user's exact Notes form still to identify |
| SHP-11 | Shipment → freight summary / volume / density / length / map | P | SHIP, TERM, API | E-01 §6, E-13; user volume screenshot | Units, formulas/rounding, layouts, routing and location freshness |
| SHP-12 | Shipment → note / Timeline | O | SHIP, EDIT | E-13 | Note audience, editing/deletion, actor/time and automatic events |
| SHP-13 | Shipment → action menu | O | SHIP, EDIT | E-15 | Duplicate, Change customer, Cancel, Simulate location updates; prerequisites and effects not executed |
| EDT-01 | Shipment → [Edit shipment](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4/edit) | O | EDIT | E-14 | All field dictionaries and role/status editability matrix |
| EDT-02 | Edit → equipment / Partial / Tanker endorsement / Team service | O | EDIT, TERM | E-14 | Locked-after-coverage rule, equipment applicability and service effects |
| EDT-03 | Edit → Locations / reorder / add location / templates | O | EDIT, MASTER | E-14 | Stop order, address/contact changes versus template changes, time windows and references |
| EDT-04 | Edit → items / more handling units / length / total value | O | EDIT, TERM | E-14 | Multi-item validation, quantity/weight basis, units and calculations |
| EDT-05 | Edit → Cost & price / lane history / calculators / add item | O | EDIT, MONEY | E-14 | Line items, margin/Cost+ and lane-history data source |
| EDT-06 | Edit → Hide contacts / Send updated documents / Update shipment | O | EDIT, MONEY | E-14 | Save/autosave boundaries, document recipients, repricing, carrier amendment and accounting effects |
| EDT-07 | Mutation scenarios in an approved test environment | B | EDIT, FLOW | SC-05 pending | Required-field failures, role locks, cancellation, status correction, duplicate submissions and retries |

**6\. Documents and accounting**

| ID | Screen / control and how to open it | Status | Chapter | Evidence | Next detail to document |
| --- | --- | --- | --- | --- | --- |
| DOC-01 | Shipment → Confirmation | P | MONEY | E-01 §7, E-16 | Customer document preview, fields, access and acceptance versus navigation |
| DOC-02 | Shipment → Rate con | O | MONEY | E-17 | Carrier document, Confirmed/by, Share and Regenerate document; no actions executed |
| DOC-03 | Shipment → Documents | O | MONEY | E-18 | POD, provider bill, provider-specific and miscellaneous files; upload rules and unclear labels |
| DOC-04 | BOL / POD generation, upload, preview and sharing flows | P | MONEY | E-01 §7, E-18 identifies POD upload link | Exact forms, required attachments, recipients, revisions and storage policy |
| ACC-01 | [Bills & Invoices](https://app.quotefactory.com/broker/accounting/shipments/bills-invoices) | O | MONEY | E-20 | Every accounting tab, filter, count and row action |
| ACC-02 | Shipment → Bill | O | MONEY | E-19 | Upload bill/POD, Expected bill, dispute, balance and Record payment |
| ACC-03 | Shipment → Invoice | O | MONEY | E-26 | PDF/Regenerate/Remove, Upload POD, In dispute, Send invoice and customer-payment record |
| ACC-04 | Bill approval/payments and invoice payment allocation | N | MONEY | E-19–20, E-26 entry controls | Who approves, due dates, terms, actual payment versus record-only and reconciliation |
| ACC-05 | QuickPay / factoring / disputes / overdue workflows | N | MONEY, ADMIN | E-20, E-25 | Optional workflows, settings, approvals and first-release decision |

**7\. Settings, integrations and reporting**

| ID | Screen / control and how to open it | Status | Chapter | Evidence | Next detail to document |
| --- | --- | --- | --- | --- | --- |
| SET-01 | [Settings index](https://app.quotefactory.com/broker/settings) | O | ADMIN | E-22 | Configuration hierarchy and allowed roles |
| SET-02 | Settings → [Company](https://app.quotefactory.com/broker/account) | N | ADMIN | E-22 link | Company identity/branding and document effects |
| SET-03 | Settings → [Users](https://app.quotefactory.com/broker/users) / [Teams](https://app.quotefactory.com/broker/teams) | N | ADMIN | E-22 links | Roles, membership, invitation, visibility and audit rules |
| SET-04 | Settings → [Carriers](https://app.quotefactory.com/broker/settings/carriers) | O | ADMIN, API | E-23 | Configuration categories; connection status versus link visibility |
| SET-05 | Carrier settings → [Carrier integrations](https://app.quotefactory.com/broker/carrier-integrations) | N | API | E-23 link; E-02 dated inventory | Provider-by-provider capabilities and access/readiness evidence |
| SET-06 | Carrier settings → [Carrier T&Cs](https://app.quotefactory.com/broker/settings/carriers/termsandconditions) | N | ADMIN, MONEY | E-23 link | Templates, versioning, recipient acceptance and client-owned terms |
| SET-07 | Carrier settings → [Rate confirmations](https://app.quotefactory.com/broker/settings/carriers/ratecons) | N | ADMIN, MONEY | E-23 link | Document customization and default versus shipment behavior |
| SET-08 | Carrier settings → Tracking / Compliance / monitoring / ClassIT+ | O | API, ADMIN | E-23 | Selectable providers, exact status, external separate use and applicable use cases |
| SET-09 | Settings → [Customers](https://app.quotefactory.com/broker/settings/customers) | O | ADMIN, QUOTE | E-24 | Margin limits, carrier-name visibility, login/auto-quote/dispatch, credit and customer visibility dialogs |
| SET-10 | Settings → [Accounting](https://app.quotefactory.com/broker/settings/accounting) | O | ADMIN, MONEY, API | E-25 | QuickBooks connection, Cc invoices, customer/vendor terms, factoring and QuickPay dialogs |
| SET-11 | Settings → Notifications | N | ADMIN | E-22 | In-app alert types, defaults, recipients and delivery channels |
| SET-12 | Settings → [External references](https://app.quotefactory.com/broker/settings/external-references) | N | ADMIN, API | E-22 link | Entity mappings, uniqueness, sync identifiers and editing |
| RPT-01 | [Reporting index](https://app.quotefactory.com/broker/reports) | O | ADMIN | E-21 | Analytics versus export reports; account-specific names |
| RPT-02 | Reporting → Lanes | N | ADMIN | E-21 link to `/broker/reports/lanes` | Lane metrics, data source, filters and time period |
| RPT-03 | Reporting → Carriers / Customers exports | N | ADMIN | E-21 | Columns, filtering, download formats and permissions |
| RPT-04 | Reporting → LTL Report / LTL Report - QF / Monthly Margin | N | ADMIN | E-21 | Definitions, grouped totals, timezone/date basis and export |
| RPT-05 | Reporting → Shipments / Shipments copy / Shipments copy 2 | N | ADMIN | E-21 | Differences between saved report definitions and editable report behavior |
| API-01 | [Existing access guide](../thrid_party/10-4-tms-api-access-guide.md) → carrier table | P | API | E-02 | Each rate/pickup/dispatch/tracking/BOL/document capability, test access and readiness |
| API-02 | Map / geocoding / routing / tracking dependencies | P | API | E-13, E-23; plan §12 | Separate rendering from addresses, truck route/mileage and tracking data |
| API-03 | Accounting, compliance, classification, boards, notifications, storage/signatures, payments and training | P | API | E-02, E-18, E-20, E-23–26; plan §12 | Confirm required providers, internal/manual alternatives and feature contracts |

**8\. Existing-guide gap review**

The observations below concern the checked-in Markdown. Existing DOCX/PDF exports were not edited or regenerated.

| Gap ID | Existing source | Present coverage / issue | Required addition or verification | Linked work |
| --- | --- | --- | --- | --- |
| G-01 | Workflow Guide §§1–2 | Actors and overview exist; vendor/consignee/bill-to distinctions and system hierarchy are incomplete. | Business hierarchy, actor diagram, concrete request paths and carrier/vendor examples. | SYS, TERM, MASTER; Phase 1–2 |
| G-02 | Workflow Guide §§2–4 | Quote steps and offers described without full field catalog, options, validations or navigation links. | Exact inputs/actions, conditional LTL/TL variants, errors, manual rates and disabled-state evidence. | QTE-01–12; Phase 3 |
| G-03 | Workflow Guide §6 | Freight class/NMFC only briefly defined. | Meaning, source, commodity relationship, responsibility and lookup/provider decisions. | QTE-05; Phase 1, 3, 7 |
| G-04 | Workflow Guide §§5–6 | Pricing example exists; volume/density formulas, units/rounding and linear-foot layout rules absent. | Worked calculations, quantity semantics, mixed items and validation. | QTE-04/07/10, SHP-11; Phase 3–5 |
| G-05 | Workflow Guide §7 | Rate confirmation definition blurs customer and carrier documents; Bill not explained as a separate provider obligation. | Separate Confirmation / Rate con / Bill / Invoice / BOL / POD walkthroughs and document lifecycle. | DOC-01–04, ACC-02/03; Phase 4, 6 |
| G-06 | Workflow Guide §§7–8 | Status meanings exist without exact actors, forms, triggers, allowed transitions or queue rules. | Transition matrix, scheduling/pickup/delivery forms, PRO/Notes and exception correction. | SYS-03–07, SHP-05/08–10; Phase 4–5 |
| G-07 | Workflow Guide | Shipment editing and field restrictions are missing. | Field × status × role matrix, locked Partial, toggles, stops, save/send side effects. | EDT-01–07; Phase 5 |
| G-08 | Workflow Guide | Settings, permissions, detailed reporting, customer/carrier/vendor management absent. | Dedicated chapters and role/visibility variants. | MASTER, ADMIN; Phase 2, 8 |
| G-09 | Workflow Guide §9 | Prepaid described as timing of payment. This needs authoritative terminology review before reuse. | Clarify payer/billing arrangement versus proof/timing of payment; confirm account-specific policy. | TERM, MONEY; Phase 1, 6 |
| G-10 | API Guide carrier table | ArcBest row uses Averitt instructions; Double D row describes employment applications. | Replace with provider-owned integration access evidence. | API-01; Phase 7 |
| G-11 | API Guide §2 | QuickBooks enabled claim conflicts with current settings. | Date both claims, ask SC-12, confirm account and launch requirements. | SET-10, EC-01; Phase 6–7 |
| G-12 | API Guide overall | Provider names/statuses do not establish per-operation support or clone account access. | Capability matrix, sandbox/production readiness, failure behavior and ownership. | API-01–03; Phase 7 |
| G-13 | Both guides | No exhaustive coverage/evidence/decision tracking, alternate-role checklist or end-to-end acceptance cases. | This Phase 0 baseline, role access follow-up and reviewed walkthroughs. | SYS-11, FLOW; Phase 0, 8–9 |

**9\. Operational questions to resolve during detailed documentation**

All items below are **Open**. Named reviewers await SC-04. They supplement the [client scope questions SC-01–12](Phase%200%20Scope%20and%20Decisions.md); they are not assumed business rules.

| ID | Question / investigation | Related inventory | Proposed reviewer | Phase |
| --- | --- | --- | --- | --- |
| OQ-01 | Who selects freight class/NMFC, from which current source, and does the app ever populate them automatically? | QTE-05, API-03 | Pricing lead | 1, 3, 7 |
| OQ-02 | What are the quantity, outer-dimension, total-weight and rounding rules behind volume/density/linear feet? | QTE-04/07, SHP-11 | Pricing/operations lead | 3, 5 |
| OQ-03 | What makes a customer confirmation or carrier rate con accepted/confirmed? What does each checkmark mean? | DOC-01/02 | Operations lead | 4, 6 |
| OQ-04 | Which form contains the user's Notes and PRO inputs, who sees them, and what event saves them? | SHP-10/12 | Dispatch lead | 5 |
| OQ-05 | Which services supply map rendering, geocoding, route/mileage and live locations? Are truck restrictions required? | API-02, SHP-11 | Integration lead | 7 |
| OQ-06 | What are the bill/invoice lifecycle, approval rules, payment recording and synchronization boundaries? | ACC-01–05 | Accounting lead | 6 |
| OQ-07 | Which fields lock after coverage or other stages, and do edits require rerating or carrier amendments? | EDT-01–06 | Operations lead | 5 |
| OQ-08 | When do Tanker endorsement and Team service apply, and what rating/dispatch/document effects follow? | EDT-02 | Carrier operations lead | 1, 3, 5 |
| OQ-09 | What is a lead in the Cover queue, how is it sourced, and how does it become coverage? | SHP-04 | Carrier operations lead | 4 |
| OQ-10 | How do quote approval, customer tender, broker Book and external carrier dispatch differ for LTL versus TL? | QTE-11/12, SYS-04 | Operations lead | 3–5 |
| OQ-11 | Which notes/contacts/charges/documents are visible to customers, carriers and teams? | CUS-05/11, SHP-12, EDT-06, SET-09 | Operations/admin lead | 2, 5, 8 |
| OQ-12 | Which reports/queues are standard versus account-specific, and what date/status rules drive them? | SYS-03–07, RPT-01–05 | Reporting/operations lead | 4, 8 |
| OQ-13 | Is “Not showing links” only a UI preference, and is a provider used separately outside this app? | SET-08, API-03 | Integration lead | 7 |
| OQ-14 | Which fields/actions save immediately? Which edits resend documents, and who receives them? | EDT-06, DOC-01–04 | Operations lead | 5–6 |
| OQ-15 | What is behind unknown/unlabeled document controls, and what are file limits/retention/access rules? | DOC-03/04 | Operations/admin lead | 6, 8 |

**10\. Phase tracking and next delivery**

| Phase | Current state | Next output |
| --- | --- | --- |
| 0 | Baseline artifacts delivered; scope/reviewer/test-access decisions pending | Client answers entered into decision log |
| 1 | Ready to start | System overview, actor relationships, navigation and terminology |
| 2 | Not started | Customers, carriers, vendors and location records |
| 3 | Not started | Quote fields, classification, offers, pricing and booking |
| 4 | Not started | Shipment lists, coverage and detailed screen guide |
| 5 | Not started | Editing, status transitions, confirmations and tracking |
| 6 | Not started | Document and accounting lifecycles |
| 7 | Not started | Validated third-party capability/access requirements |
| 8 | Not started | Settings, permissions, reports and remaining surfaces |
| 9 | Not started | Reviewed end-to-end exercises and acceptance scenarios |

**Your next action:** Take SC-01–05 in the [Phase 0 report](Phase%200%20Scope%20and%20Decisions.md) to the team lead first, then collect the other decisions. The next documentation task is Phase 1. Open questions stay visible while independent read-only learning work continues.
