**Quote Factory: Documentation Coverage and Open Questions**

**The screen inventory, existing-guide gaps, and follow-up work for every phase**

Prepared October 23, 2026 | Phase 0 baseline, updated after Phase 9 writing/audit and live CDP shipment detail/document/editor follow-up on October 31; validation pending.

**1\. How to use this inventory**

Each ID below is a stable documentation/use-case ID. Start with its link or click path, check the evidence, then write the detailed explanation in the named section of the main guide during its assigned phase. Chapter codes below refer to sections in that one document, not separate reader-facing files. Split a broad ID into child IDs when exploration reveals more fields, dialogs or role variants; retain the parent for traceability.

**Status key:**

- **O — Observed:** Screen or control inspected; detailed behavior not yet documented.
- **P — Partly documented:** Existing guide explains part of it; fields/actions/branches remain.
- **N — Not explored:** Entry point discovered, destination/actions not inspected.
- **B — Blocked:** Required role, test access or business evidence is not available.
- **D — Documented:** Detailed instructions, rules and evidence reviewed. No full application use case has this status yet; Phase 1 is a delivered overview, with detailed behavior/role reviews still open.

**Scope:** Every inventory item inherits **Awaiting client decision** from the [scope matrix](Phase%200%20Scope%20and%20Decisions.md). An O or P status means documentation evidence exists, not that the feature is approved for the clone.  
**Owner:** Documentation author maintains every row. Chapter reviewer roles below are proposed; named assignments await SC-04.  
**Evidence:** E-IDs resolve in the [Evidence Register](Documentation%20Evidence%20Register.md). No screenshot files are attached; Phases 2–4 used unsaved visual inspections alongside text observations.
**Coverage limit:** This is the known accessible-surface inventory, not a claim that every hidden form/role/option has been discovered. Each detailed phase must extend it.

**Phase 0 baseline totals:** 89 inventory items — 33 Observed, 21 Partly documented, 33 Not explored and 2 Blocked.

**After Phase 1:** The same 89 items comprise 30 Observed, 25 Partly documented, 32 Not explored and 2 Blocked. No full module/use case is marked Documented or approved for the clone. The 2 blocked items are alternate-role access and mutation tests requiring a designated test environment.

**After Phase 2:** 89 items — 25 Observed, 42 Partly documented, 20 Not explored and 2 Blocked. All 17 customer/carrier/vendor rows now have observed field/flow documentation in main-guide sections 12–13, with explicit untested outcomes. No complete application use case or clone scope approval is inferred.

**After Phase 3:** 89 items — 24 Observed, 43 Partly documented, 20 Not explored and 2 Blocked. All 12 quote rows have field/action explanations or owned gaps in main §14. One unsaved measurement example and existing quote-to-shipment navigation were checked; submitted quote/save/share/booking outcomes remain untested.

**After Phase 4:** 89 items — 13 Observed, 58 Partly documented, 16 Not explored and 2 Blocked. Main §15 documents shipment lists/queues, direct-entry form, coverage candidates/forms, assigned-carrier/detail regions and document destinations. Existing rows/calculations and view navigation were checked; create/assign/send/status/financial/role outcomes remain untested.

**After Phase 5:** 89 items — 7 Observed, 64 Partly documented, 16 Not explored, 2 Blocked and 0 Documented. Main §16 documents editor fields, locks, Notes/PRO, appointment/ETA/driver forms, transition evidence and validation cases. Submitted changes and role/state effects remain untested.

**After Phase 6:** 89 items — 5 Observed, 68 Partly documented, 14 Not explored, 2 Blocked and 0 Documented. Main §17 adds document catalog, preview/form/queue/accounting configuration evidence; no operational financial or document action submitted.

**After Phase 7:** 89 items — 5 Observed, 68 Partly documented, 14 Not explored, 2 Blocked and 0 Documented. Main §18 and existing API guide map every dependency category/17carriers to source evidence, access needs and tests; no provider marked ready.

**After Phase 8:** 89 items — 0 Observed, 87 Partly documented, 0 Not explored, 2 Blocked and 0 Documented. All known accessible inventory entries have guide content or explicit owned gaps. Full workflows, alternate roles, submissions, exports and client acceptance remain unvalidated; P does not imply signed-off completeness.

**After Phase 9 writing/audit:** 89 items remain 87 P and 2 B; no D claimed without reviewed rules and required tests. Main §20 maps every inventory ID to seven walkthroughs/exception cases and an owned completion audit (E-109–110). All known items have documentation or an explicit gap; unresolved behavior is not silently excluded.

**Network discovery update (October 31):** Sanitized artifact [quote-factory-network.json](network/quote-factory-network.json) and main guide §§12, 15–18 now include Dashboard/Mapbox, Quotes list/form/existing result, shipment Active/All/filter controls, one shipment detail and Documents index, one read-only Edit shipment form, and Carriers/Vendors/All list reads (E-114–127). Clean bounded captures for dashboard, detail, document, editor and provider lists drained without CDP truncation. Filestack and the Quote Factory S3 document host appeared in preview resources; S3 static assets included carrier logos and a country flag. These observations do not change the 89-feature coverage totals: filter semantics and all submissions remain untested, response bodies were excluded, server-to-server integrations remain outside browser evidence, and no screenshot file was saved from the production data-bearing viewport.

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
| SYS-01 | [Dashboard](https://app.quotefactory.com/broker/dashboard) | P | SYS | E-04–05, E-28 | Main guide §§2,6,11 explains navigation; counter/date/map-data rules remain open |
| SYS-02 | Sidebar → Find / Find anything | P | SYS, ADMIN | E-28, E-107 | Main §§6,11,19.6: known BOL and no-match search observed; other entities/permission filtering pending |
| SYS-03 | Dashboard → Quote / Requested / Quoted shortcuts | P | SYS, QUOTE | E-05, E-28 | Main guide §6 maps entry targets; exact queue inclusion and request handoff remain open |
| SYS-04 | Dashboard → Dispatch queue | P | SYS, SHIP | E-63 | Main §15.2: direct dispatch route loaded No active shipments; populated workflow/shortcut behavior pending |
| SYS-05 | Sidebar → [Cover](https://app.quotefactory.com/broker/shipments/covering/all) | P | SYS, SHIP | E-63, E-68–69 | Main §15.2/6–7: coverage workspace/candidates/forms; source/count/posting/assignment tests pending |
| SYS-06 | Sidebar → [Confirm pickups](https://app.quotefactory.com/broker/shipments/scheduled/all) | P | SYS, EDIT | E-63 | Main §§15.2,16,20 W-02: pickup queue/forms; confirmation/date rules remain untested |
| SYS-07 | Sidebar → [Confirm deliveries](https://app.quotefactory.com/broker/shipments/delivering/all) | P | SYS, EDIT | E-63 | Main §15.2: populated In transit delivery queue; rules, POD and status outcomes pending |
| SYS-08 | Sidebar → [Training](https://quotefactory.talentlms.com/) | P | ADMIN | E-108 | Main §19.6: TalentLMS learner landing observed; course content/licensing/SSO pending |
| SYS-09 | Sidebar → Support | P | ADMIN | E-107 | Main §19.6: Help Scout Search/Ask Us; no message/attachment |
| SYS-10 | Sidebar → [Profile](https://app.quotefactory.com/profile) | P | ADMIN | E-99 | Main §19.1: Member/profile fields observed; no account changes |
| SYS-11 | Customer/other role portals | B | SYS, ADMIN, FLOW | E-09, E-24 expose login controls only | SC-03/05: provide role walkthrough/test access |

**3\. Customers, carriers and vendors**

Customer example: [open the inspected customer](https://app.quotefactory.com/broker/customer/66c366f48a53dbc0fdaed429). Fallback: sidebar → Customers → choose an authorized example. A record-specific URL can stop working; keep both paths in future chapters.

| ID | Screen / control and how to open it | Status | Chapter | Evidence | Next detail to document |
| --- | --- | --- | --- | --- | --- |
| CUS-01 | [Customers list](https://app.quotefactory.com/broker/customers) | P | MASTER | E-35 | Main §12.1: list/filters documented; applied search/sort/count and permission rules untested |
| CUS-02 | Customers → Add a new customer / sidebar plus | P | MASTER | E-35 | Main §12.2: name suggestions and create action; submission/duplicate handling pending |
| CUS-03 | Customer → Overview / Edit customer details | P | MASTER | E-36 | Main §12.3: identity fields; save/validation/logo/shortcut behavior pending |
| CUS-04 | Customer → Contacts / View all customer contacts | P | MASTER | E-37 | Main §12.3: contact view/create/edit/cancel fields; primary/reorder/delete/save rules pending |
| CUS-05 | Customer → Manage reps | P | MASTER, ADMIN | E-38 | Main §12.5: new-shipment-only rep message observed; assignments/commissions/roles untested |
| CUS-06 | Customer → Manage credit limits / Edit customer billing | P | MASTER, MONEY | E-39–40 | Main §12.4: billing/credit/address/POD fields; enforcement/due-date/save behavior pending |
| CUS-07 | Customer → Booking & quoting | P | MASTER, QUOTE | E-41 | Main §12.5: portal/automation and per-carrier pricing controls; inheritance/enforcement untested |
| CUS-08 | Customer → Shipments / Quotes tabs | P | MASTER, SHIP, QUOTE | E-42 | Main §12.5: customer-linked shipment/quote views; detailed actions/counts pending |
| CUS-09 | Customer → Addresses tab | P | MASTER | E-43 | Main §13: template fields/types/services; existing-card editor and propagation unresolved |
| CUS-10 | Customer → Invoices / Payments tabs | P | MASTER, MONEY | E-42 | Main §12.5: invoice/payment history and statement controls; accounting actions Phase 6 |
| CUS-11 | Customer → Documents / external references / note / Timeline | P | MASTER, ADMIN | E-42 | Main §12.5: Documents dialog inspected; external-reference/note/timeline behavior remains open |
| CAR-01 | [Carriers / Vendors](https://app.quotefactory.com/broker/vendors/carriers) → Carriers / All | P | MASTER | E-44 | Main §12.1: provider list/filter fields; applied filtering and identifiers policy untested |
| CAR-02 | Create new vendor → Carrier | P | MASTER | E-44 | Main §12.6: MC/DOT input only; lookup/import/create validation pending |
| CAR-03 | Shipment → carrier detail, or Bill → carrier link | P | MASTER | E-47–48 | Main §12.6: profile/onboarding/docs/history observed; eligibility, contacts editor and packet effects pending |
| VEN-01 | Carriers / Vendors → Vendors tab | P | MASTER | E-45–46 | Main §12.7: vendor list/detail/type distinctions; tab behavior partly unresolved |
| VEN-02 | Create new vendor → Vendor | P | MASTER | E-45–46 | Main §12.7: wizard/identity/billing/multiple types/sync preference; saves untested |
| VEN-03 | Quote/shipment → Add another vendor | P | MASTER, QUOTE, SHIP | E-49 | Main §12.7: shipment type dialog only; actual service/vendor assignment and charges Phase 4/6 |

**4\. Quotes and freight details**

| ID | Screen / control and how to open it | Status | Chapter | Evidence | Next detail to document |
| --- | --- | --- | --- | --- | --- |
| QTE-01 | [Quote history](https://app.quotefactory.com/broker/quote-history) | P | QUOTE | E-60 | Main §14: Search/paging/role tests pending |
| QTE-02 | [Quote form](https://app.quotefactory.com/broker/quote) → customer/equipment/date | P | QUOTE | E-51 | Main §14: Customer/contact/defaults and all subtype validation pending |
| QTE-03 | Quote → origin/destination, expand location, pickup/delivery services | P | QUOTE | E-53 | Main §14: Populated expansion, service pricing and destination parity pending |
| QTE-04 | Quote → packaging/quantity/dimensions/weight/units | P | QUOTE, TERM | E-52, E-54 | Main §14: Mixed groups, conversions and input validation pending |
| QTE-05 | Quote → Freight class / NMFC | P | QUOTE, TERM, API | E-52, E-54 | Main §14: Est: 70 observed separately from empty class; algorithm, lookup and owner pending |
| QTE-06 | Quote → Stackable / Hazmat / Protect from freezing | P | QUOTE, TERM | E-51, E-52 | Main §14: Hazmat flag checked unsaved; carrier restrictions/details pending |
| QTE-07 | Quote → add item, estimated total length, Linear Feet Visualizer | P | QUOTE, TERM | E-54 | Main §14: Two-pallet example verified; stack/override/layout edge cases pending |
| QTE-08 | Quote → Get quotes | P | QUOTE, API | E-57 | Main §14: Historical partial failures inspected; real submit/loading/retry/no-rate tests pending |
| QTE-09 | History → [booked result example](https://app.quotefactory.com/broker/quote-results/6ada31e36fac98ba0aa91bcb); shipment → View quote details | P | QUOTE | E-55, E-59, E-111–112 | Main §§14,15.5a: shipment offer fields, expanded signed cost lines, pricing/state variants and results link; provider/date/account/lock rules pending |
| QTE-10 | Offer → cost/margin/profit/price | P | QUOTE, TERM | E-55, E-59, E-61 | Main §14: Pricing states and matching shipment figures observed; saves/precedence/guardrails pending |
| QTE-11 | Result → Sharing / customer visibility / reference/menu | P | QUOTE | E-56 | Main §14: Visibility versus Not sent and view-only restriction observed; actual sends/access/approval pending |
| QTE-12 | Result → manual quote / Book / View Shipment | P | QUOTE, SHIP | E-58, E-59, E-61 | Main §14: Manual dialog and existing shipment handoff inspected; Book entry-point discrepancy and creation/duplicates pending |

**5\. Shipments, edits and tracking**

Reference: [open shipment](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4). All controls below refer to this inspected example unless stated otherwise. Status-specific variants require later examples.

| ID | Screen / control and how to open it | Status | Chapter | Evidence | Next detail to document |
| --- | --- | --- | --- | --- | --- |
| SHP-01 | [Shipments](https://app.quotefactory.com/broker/shipments) → Active / All | P | SHIP | E-62 | Main §15.2–3: Active/All, row meanings, sort/export menus; complete date/icon/paging/export tests pending |
| SHP-02 | Shipments → View shipment filters | P | SHIP | E-62 | Main §15.3: filter catalog and one known-BOL result verified; range/multi-filter/timezone rules pending |
| SHP-03 | Sidebar / list → [Create new shipment](https://app.quotefactory.com/broker/shipment/new) | P | SHIP | E-64 | Main §15.4: direct blank form/defaults and final controls; requiredness, numbering, draft/initial state untested |
| SHP-04 | Cover queue → shipment/leads | P | SHIP | E-68–69 | Main §15.6–7: candidates, history/warning, add-carrier/packet/send branches; actual sourcing/assignment pending |
| SHP-05 | Shipment → header, reps and status progression | P | SHIP, EDIT | E-65–66 | Main §15.5: status progression and shipment rep/commission dialog; transitions/permissions/payment effects pending |
| SHP-06 | Shipment → carrier/customer/vendor cards | P | SHIP | E-65, E-67, E-111 | Main §15.5–7 including LTL quote card/modal §15.5a; assigned/candidate/provider relationships; removal/replacement/assignment pending |
| SHP-07 | Shipment → financial summary / Expand itemized view | P | SHIP, MONEY | E-65 | Main §15.8: expanded Freight cost/price, Margin/Cost+/Profit; autosave/rounding/reconciliation pending |
| SHP-08 | Shipment → stops / appointments / In / Out / ETA | P | SHIP, EDIT | E-65, E-74 | Main §15.9: stops/contacts/hours/appointments/ETA/In/Out; timestamp discrepancy OQ-25 and Phase 5 outcomes pending |
| SHP-09 | Shipment → driver information / tracking controls | P | EDIT, API | E-65 | Main §§15.9,16.7–9,18: driver/tracking forms and provider requirements; submitted events/source rules pending |
| SHP-10 | Shipment → add tracking update / Delivered | P | EDIT | E-78, E-81 | Main §16.7–9: exact Tracking update Notes/PRO, ETA forms; actual transitions/visibility pending |
| SHP-11 | Shipment → freight summary / volume / density / length / map | P | SHIP, TERM, API | E-65, E-74 | Main §15.10: saved two-group freight arithmetic and Mapbox attribution; route/feed/rounding/layout rules pending |
| SHP-12 | Shipment → note / Timeline | P | SHIP, EDIT | E-65 | Main §15.11: notes and expanded lifecycle/document/tracking Timeline; audience/actor/save/edit rules pending |
| SHP-13 | Shipment → action menu | P | SHIP, EDIT | E-75, E-15 | Main §15.11: menu variant recorded; duplicate/change/cancel/simulate eligibility/effects pending |
| EDT-01 | Shipment → [Edit shipment](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4/edit) | P | EDIT | E-76–82 | Main §16: field rules, UI matrix/forms and downstream tests; submitted saves/status/roles remain unverified |
| EDT-02 | Edit → equipment / Partial / Tanker endorsement / Team service | P | EDIT, TERM | E-76–82 | Main §16: field rules, UI matrix/forms and downstream tests; submitted saves/status/roles remain unverified |
| EDT-03 | Edit → Locations / reorder / add location / templates | P | EDIT, MASTER | E-76–82 | Main §16: field rules, UI matrix/forms and downstream tests; submitted saves/status/roles remain unverified |
| EDT-04 | Edit → items / more handling units / length / total value | P | EDIT, TERM | E-76–82 | Main §16: field rules, UI matrix/forms and downstream tests; submitted saves/status/roles remain unverified |
| EDT-05 | Edit → Cost & price / lane history / calculators / add item | P | EDIT, MONEY | E-76–82 | Main §16: field rules, UI matrix/forms and downstream tests; submitted saves/status/roles remain unverified |
| EDT-06 | Edit → Hide contacts / Send updated documents / Update shipment | P | EDIT, MONEY | E-76–82 | Main §16: field rules, UI matrix/forms and downstream tests; submitted saves/status/roles remain unverified |
| EDT-07 | Mutation scenarios in an approved test environment | B | EDIT, FLOW | SC-05 pending | Required-field failures, role locks, cancellation, status correction, duplicate submissions and retries |

**6\. Documents and accounting**

| ID | Screen / control and how to open it | Status | Chapter | Evidence | Next detail to document |
| --- | --- | --- | --- | --- | --- |
| DOC-01 | Shipment → Confirmation | P | MONEY | E-70, E-88 | Main §§15.11,17,20: customer confirmation preview/fields/navigation; send/access/acceptance tests pending |
| DOC-02 | Shipment → Rate con | P | MONEY | E-71, E-89, E-101 | Main §§17,19.2,20: carrier rate-con/fields/settings; signature/send/regenerate/access effects pending |
| DOC-03 | Shipment → Documents | P | MONEY | E-73, E-87–89, E-109 | Main §17: document index/upload forms/catalog; upload/file limits/revisions/access pending |
| DOC-04 | BOL / POD generation, upload, preview and sharing flows | P | MONEY | E-87–89 | Main §17.2/7: BOL/labels/POD generic upload and preview fields; generation/sends/revision/file rules pending |
| ACC-01 | [Bills & Invoices](https://app.quotefactory.com/broker/accounting/shipments/bills-invoices) | P | MONEY | E-83 | Main §17.3: queue/state dictionary and selected populated/empty examples; aging/all filters/exports pending |
| ACC-02 | Shipment → Bill | P | MONEY | E-72, E-84–85 | Main §17.4: bill form/approval/payment entries; lifecycle/ledger effects untested |
| ACC-03 | Shipment → Invoice | P | MONEY | E-72, E-86, E-88 | Main §17.5: invoice preview/send/payment forms; delivery/allocation/settlement pending |
| ACC-04 | Bill approval/payments and invoice payment allocation | P | MONEY | E-84–86 | Main §17.4–5: approval and payment forms; actual approval/payment/allocation/reconciliation pending |
| ACC-05 | QuickPay / factoring / disputes / overdue workflows | P | MONEY, ADMIN | E-91 | Main §17.6: factoring/QuickPay disabled forms and dispute entry; execution/approval/scope pending |

**7\. Settings, integrations and reporting**

| ID | Screen / control and how to open it | Status | Chapter | Evidence | Next detail to document |
| --- | --- | --- | --- | --- | --- |
| SET-01 | [Settings index](https://app.quotefactory.com/broker/settings) | P | ADMIN | E-99–103 | Main §19: settings hierarchy; administrator variants pending |
| SET-02 | Settings → [Company](https://app.quotefactory.com/broker/account) | P | ADMIN | E-99 | Main §19.1: company identity fields; no edit exposed in sampled Member view |
| SET-03 | Settings → [Users](https://app.quotefactory.com/broker/users) / [Teams](https://app.quotefactory.com/broker/teams) | P | ADMIN | E-99 | Main §19.1/4: Member verified, Owner control disabled, empty Teams; alternate roles/invites pending |
| SET-04 | Settings → [Carriers](https://app.quotefactory.com/broker/settings/carriers) | P | ADMIN, API | E-93, E-101 | Main §§18–19: carrier configuration hierarchy and document defaults |
| SET-05 | Carrier settings → [Carrier integrations](https://app.quotefactory.com/broker/carrier-integrations) | P | API | E-93–98 | Main §18/API guide: 17 providers and operation-specific access gaps; no runtime proof |
| SET-06 | Carrier settings → [Carrier T&Cs](https://app.quotefactory.com/broker/settings/carriers/termsandconditions) | P | ADMIN, MONEY | E-101 | Main §19.2: packet/agreement help and legal settings; no changes or acceptance |
| SET-07 | Carrier settings → [Rate confirmations](https://app.quotefactory.com/broker/settings/carriers/ratecons) | P | ADMIN, MONEY | E-101 | Main §19.2: future-shipment rule and contact defaults; amendment effects untested |
| SET-08 | Carrier settings → Tracking / Compliance / monitoring / ClassIT+ | P | API, ADMIN | E-93–98 | Main §18/API guide: provider/link preferences separated from connectivity; runtime gaps owned |
| SET-09 | Settings → [Customers](https://app.quotefactory.com/broker/settings/customers) | P | ADMIN, QUOTE | E-102–103 | Main §19.3: margins, mode visibility, credit and customer-access explanations; saves/enforcement untested |
| SET-10 | Settings → [Accounting](https://app.quotefactory.com/broker/settings/accounting) | P | ADMIN, MONEY, API | E-90–91 | Main §17.6: Oct26 connected QuickBooks mapping state replaces Oct23 UI state; sync transactions/policies pending |
| SET-11 | Settings → Notifications | P | ADMIN | E-100 | Main §19.1: no in-app sources configured; outbound delivery not established |
| SET-12 | Settings → [External references](https://app.quotefactory.com/broker/settings/external-references) | P | ADMIN, API | E-100 | Main §19.1: external reference definition fields; uniqueness/templates/sync untested |
| RPT-01 | [Reporting index](https://app.quotefactory.com/broker/reports) | P | ADMIN | E-104–106 | Main §19.5: Lanes plus all eight named data exports; account-specific definitions |
| RPT-02 | Reporting → Lanes | P | ADMIN | E-104 | Main §19.5: lane filters/metrics/sample arithmetic; source/grouping/timezone open |
| RPT-03 | Reporting → Carriers / Customers exports | P | ADMIN | E-105 | Main §19.5: carrier/customer filters and selected columns; files/permissions pending |
| RPT-04 | Reporting → LTL Report / LTL Report - QF / Monthly Margin | P | ADMIN | E-106 | Main §19.5: all named definitions, filters and 14/48-column selections; exports/reconciliation pending |
| RPT-05 | Reporting → Shipments / Shipments copy / Shipments copy 2 | P | ADMIN | E-106 | Main §19.5: all three variants share observed14 selection; hidden equality not claimed |
| API-01 | [Existing access guide](../thrid_party/10-4-tms-api-access-guide.md) → carrier table | P | API | E-93–98 | Main §18 and revised API guide: capability/source/access decisions; client selection/entitlement/runtime tests pending |
| API-02 | Map / geocoding / routing / tracking dependencies | P | API | E-93–98 | Main §18 and revised API guide: capability/source/access decisions; client selection/entitlement/runtime tests pending |
| API-03 | Accounting, compliance, classification, boards, notifications, storage/signatures, payments and training | P | API | E-93–98 | Main §18 and revised API guide: capability/source/access decisions; client selection/entitlement/runtime tests pending |

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

**Phase 1 progress against the original gaps:** Source section numbers above refer to the pre-expansion guide inspected in Phase 0. The current main guide has been reorganized into sections 1–14.

| Gap | Phase 1 resolution | What remains |
| --- | --- | --- |
| G-01 | Hierarchy, actors, bill-to/consignee/vendor distinctions and lifecycle added in main guide §§2–5. | Real intake/role rules and Phase 2 forms. |
| G-03 | NMFC/class/ClassIT+ meanings, current-source distinction and observed choices added in §9.2. | Commodity-specific lookup, responsible user and automatic population rules. |
| G-04 | Volume/density, margin/markup and units examples added in §§8–9. | App calculation tests, rounding and linear-foot layout rules. |
| G-05 | Customer/carrier confirmations and Bill/Invoice distinguished in §§8–9.4. | Full document/accounting actions and acceptance lifecycle. |
| G-09 | Incorrect Prepaid timing definition corrected using ODFL's billing-party explanation in §8. | Account-specific payer/terms approval. |
| G-06 | Booked meaning corrected after observing a Booked shipment with Needs a carrier. | Full transition/coverage specification and test environment. |

**Phase 4 progress:** Main §15 adds detailed shipment/list/coverage/document-navigation content for G-05/06/10 and a saved two-group measurement example for G-04. Direct dispatch empty-state evidence supersedes the earlier uninspected destination; it does not explain the old shortcut no-op. Menu, timestamp and carrier-packet/rate-con distinctions remain explicit open rules.

**Phase 3 progress:** G-02–04 now have detailed quote fields/options/actions, current classification context, a measured UI example and pricing/sharing/manual/handoff evidence in main §14. Remaining submission, policy, provider and role tests are preserved in QTE-01–12 and OQ-01/02/10/17/22–24.

**Phase 2 progress:** Customer identity/contact/billing/credit/rep/quoting forms and all customer tabs were inspected; carrier/provider list and creation entry, carrier overview/documents/history, vendor creation/type/identity/billing/sync forms and saved-location options are documented in main §§12–13. G-01/G-08 now have record-level content; their remaining role, intake, settings/reporting and tested-outcome work stays open. G-03 gains evidence that 04821J also appears beside ArcBest in customer pricing, without assigning it a commodity meaning.

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

**Additional questions from Phase 2**

| ID | Question / investigation | Related inventory | Proposed reviewer | Phase |
| --- | --- | --- | --- | --- |
| OQ-16 | What are the actual create/update/autosave, required-field, duplicate and cancel-after-edit rules for master records? | CUS-02–07, CAR-02, VEN-02 | Operations/admin lead | 2, 3, 8; SC-05 test access |
| OQ-17 | What is the precedence of global/customer/per-carrier/offer pricing, and what do Volume multiplier and carrier-side identifiers mean? | CUS-07, QTE-05/10 | Pricing/integration lead | 3, 7, 8 |
| OQ-18 | How do saved templates, shipment-only stop edits and explicit template edits affect future/existing records and generated documents? | CUS-09, EDT-03 | Operations lead | 5 |
| OQ-19 | Does contact position/selection designate a primary contact or change recipients, and which notes/contacts are shared? | CUS-04/11, CAR-03 | Operations/admin lead | 2, 5, 8 |
| OQ-20 | Which source powers carrier MC/DOT lookup, what is imported/refreshed, and how do approval/packet/authority/insurance interact? | CAR-02/03, API-03 | Carrier operations/integration lead | 2, 7, 8 |
| OQ-21 | Why did the vendor Shipments click not visibly navigate, and where are vendor payments, type-change history and billing editors saved? | VEN-01/02 | Provider/accounting lead | 2, 6, 8 |

**Additional questions from Phase 3**

| ID | Question | Related inventory | Proposed reviewer | Phase |
| --- | --- | --- | --- | --- |
| OQ-22 | Why does a past-date request disable row Book while offer-detail Book lacks a disabled marker, and what is the intended consistent eligibility rule? | QTE-12 | Operations/product owner | 3–5 |
| OQ-23 | What do XN credit and offer expiry mean, how do they differ from customer credit/pickup cutoff, and who may override them? | QTE-08/09/12, CUS-06 | Accounting/integration lead | 3, 6–8 |
| OQ-24 | How do visible contacts, Not sent, view-only links and customer portal permissions map to email delivery, approval/tender and booking authority? | QTE-11/12, SYS-04 | Operations/admin lead | 3, 8 |

**Additional questions from Phase 4**

| ID | Question | Related inventory | Proposed reviewer | Phase |
| --- | --- | --- | --- | --- |
| OQ-25 | Which planned/actual timestamps and timezones drive list pickup time, detail Out time, document window and queue inclusion? Reference displays differ. | SHP-01/02/08, SYS-06/07 | Operations/product lead | 4–5, 8 |
| OQ-26 | What do coverage Save for later and Cover & request packet persist, when is the carrier committed, which checks are mandatory, and when is rate con sent? | SHP-04/06, CAR-03, DOC-02 | Carrier operations/integration lead | 4–7 |
| OQ-27 | What state/results do direct Book shipment and Save for later create, which fields/BOL are required, and what prevents duplicate creation? | SHP-03, EDT-07 | Operations/product lead | 4–5 |

**10\. Phase tracking and next delivery**

| Phase | Current state | Next output |
| --- | --- | --- |
| 0 | Baseline artifacts delivered; scope/reviewer/test-access decisions pending | Client answers entered into decision log |
| 1 | Delivered in main guide §§1–14; business/role review pending | Overview, navigation, relationships, terminology, arithmetic and exercises delivered |
| 2 | Observed-form documentation delivered in main §§12–13; mutation/role tests pending | Read Phase 2 exercises and provide test access for unresolved save/validation/propagation rules |
| 3 | Observed documentation delivered in main §14; submission/save/role/booking tests pending | Read §14.12 exercises and resolve owned quote rules |
| 4 | Observed documentation delivered in main §15; creation/coverage/status/role/document tests pending | Read §15.13 exercises and resolve OQ-09/12/25–27 |
| 5 | Observed documentation delivered in main §16; tests/review pending | Submitted transitions, role matrix, validation, autosave and resend effects pending. |
| 6 | Observed documentation delivered in main §17; tests/review pending | Upload/send/signature/approval/payment/sync and role validation pending. |
| 7 | Observed documentation delivered in main §18; tests/review pending | Client provider/account/licensing decisions, access and runtime tests pending. |
| 8 | Observed documentation delivered in main §19; tests/review pending | Alternate roles, setting effects, exports and metric reconciliation |
| 9 | Walkthroughs/scenarios/audit written in main §20; validation blocked | Designated test environment, access, named review, sign-off and reviewed exports |

**Your next action:** Read main §20 and resolve the validation handoff when the unavailable inputs become available. All phase chapters are written; unverified outcomes remain tracked.

**Phase 9 validation handoff (October 26)**

W-01–07 and X-01–09 in main §20 are the acceptance workbook; all89 item IDs map there. Reviewer roles are proposed, not assigned. The user explicitly replied “unavailable” on October 26 to the request for a test URL, disposable customer/shipment IDs, suppressed sends/bookings/accounting syncs and reviewer names (D-01). Validation and sign-off remain blocked; no test waiver or scope approval was supplied. SYS-11 and EDT-07 remain blocked. Other P rows retain their particular unverified details; no exclusions or passed functional cases inferred.

| Gate | Concrete missing input / evidence | Proposed owner |
| --- | --- | --- |
| Workflow submissions | Test URL, disposable customer/shipment/provider IDs, allowed operations, reset and side-effect suppression | Team lead/account administrator; SC-05 |
| Role/portal behavior | Separate included-role test sessions and expected permissions | Administrator/product owner; SC-03/05 |
| Business review | Named chapter reviewers, scope selections and answers to operational/pricing/accounting questions | Team lead/client reviewers; SC-01/02/04/06/08/09/11 |
| Providers and reconciliation | Selected capabilities, licensed access, provider/accounting sandbox and acknowledgments | Integration/account owners; SC-07/12 |
| Operating targets | Migration inventory, audit/retention, backup/restore, volumes and performance | Product owner/team lead; SC-10 |
| Final artifacts | Source review, resolved/deferred defects, sign-off and refreshed exports | Documentation author + appointed reviewers |

**October 26 user-review correction:** E-111–112 add the previously insufficiently detailed LTL shipment quote dialog to main §15.5a: exact entry, fields, collapsed/expanded Cost, carrier-dependent components, arithmetic, disabled-price variant and View quote results navigation. Existing QTE-09/SHP-06 entries extended; inventory totals/statuses unchanged. No validation/sign-off blocker waived.

**October 26 classification reference:** E-113/main §14.5a adds the official NMFTA density bands, inclusive/exclusive boundaries, conditional example and source/local PDF links for QTE-05. Commodity selection, app estimation and reviewer tests remain pending.
