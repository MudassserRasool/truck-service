**Quote Factory: Full System Documentation Plan**

**A phased plan to understand the system, follow its workflows, and define what we need to clone**

Prepared October 23, 2026 | Based on the existing Markdown guides, the user's ten browser comments, a basic live broker-app exploration, and the official references linked below.

**Status (October 23, 2026):** Phase 0 documentation baseline delivered: [Scope and Decisions](Phase%200%20Scope%20and%20Decisions.md), [Coverage and Open Questions](Documentation%20Coverage%20and%20Open%20Questions.md), and [Evidence Register](Documentation%20Evidence%20Register.md). Phase 1 is delivered in the [main guide](Quote%20Factory%20Quote%20Workflow%20Guide.md): hierarchy, actors, navigation, lifecycle, glossary and exercises. Phase 2 observed-form documentation is delivered in main-guide sections 12–13; Phase 3 observed documentation is delivered in main §14; Phase 4 observed documentation is delivered in main §15; Phase 5 observed documentation is delivered in main §16; Phase 6 is next. Client scope/reviewer/test-access decisions, detailed module behavior and full workflow validation remain pending.

**In one sentence:** Build a guide that moves from the whole business to each module, then each use case, screen, field, button, calculation, document, and external dependency, with instructions the reader can follow in the app.

**1\. What this documentation must achieve**

The reader should be able to answer: Who is doing this? Why? Where do I start? What do I enter? Where does that value come from? What happens when I click? What changes elsewhere? Which integration is involved? What remains a client decision?

The documentation has two connected purposes:

1. **Learning and operations:** Explain freight terminology in simple language and provide practical walkthroughs.
2. **Clone requirements:** Record the observed behavior, validation, permissions, status rules, calculations, and integrations that developers need to reproduce.

**Scope rule:** Discover the entire accessible app, but track which discovered features belong in the clone's first release. A visible feature is not automatically an approved implementation requirement.

**Existing material to build on**

| Document | How we will use it |
| --- | --- |
| [Quote Factory Quote Workflow Guide](Quote%20Factory%20Quote%20Workflow%20Guide.md) | Preserve as the plain-language entry guide; expand it with links to the detailed chapters once written. |
| [10-4 TMS API Access Guide](../thrid_party/10-4-tms-api-access-guide.md) | Use as the starting provider inventory; verify its dated statuses and provider instructions before treating them as current requirements. |
| This plan | Defines the order of work, coverage, writing format, evidence standard, and completion checks. |

The existing DOCX and PDF are separate exports. Future Markdown changes must be exported and checked separately before calling those copies updated.

**2\. How the system will be explained from top to bottom**

This is a proposed learning hierarchy based on the broker navigation and inspected screens. It is not a claim about Quote Factory's internal database or software architecture.

```text
Freight brokerage business
├── People and access
│   ├── Broker company, users, teams, representatives
│   └── Customer access and other portals, if accessible and in scope
├── Business records
│   ├── Customers, contacts, billing preferences, saved locations
│   ├── Carriers, contacts, equipment and onboarding information
│   └── Service vendors: crane, insurance, warehouse, etc.
├── Quote lifecycle
│   ├── Customer request → shipment requirements
│   ├── Freight details → carrier offers / manual pricing
│   └── Customer price → sharing / approval or tender → booking
├── Shipment operations
│   ├── Create shipment directly or continue from a quote
│   ├── Cover the load / assign carrier and other vendors
│   ├── Schedule → confirm pickup → track → confirm delivery
│   └── Edit, exceptions, notes, documents and activity history
├── Money and documents
│   ├── Customer confirmation, BOL, carrier rate confirmation, POD
│   ├── Carrier/vendor bills → review / approval → payment records
│   └── Customer invoices → sending / disputes → payment records
└── Shared capabilities
    ├── Search, filters, sorting, exports and reporting
    ├── Settings, permissions, notifications and external references
    └── Carrier APIs, accounting, tracking, maps and other integrations
```

**Important distinctions to teach early**

- **Customer:** The party buying the broker's shipping service. Record the bill-to customer separately from the actual pickup company and delivery recipient; confirm when these are the same business.
- **Carrier:** The transportation company moving the freight. The live creation chooser describes it as a freight carrier with an MC or DOT number.
- **Vendor:** A provider of another shipment service. The same chooser gives crane, insurance, and warehouse as examples. The Vendors tab also showed towing, transloader, and lumper categories. Define each with an operational example in the glossary.
- **Quote:** Proposed service and price before the relevant booking/tender step.
- **Shipment:** The operational record tying together parties, stops, freight, service providers, charges, progress, documents, and history.
- **Customer invoice versus carrier/vendor bill:** Keep the amount charged to the customer separate from the amount owed to service providers.

**3\. What was inspected for this plan**

Initial exploration used navigation, an existing shipment, its edit form, the quote form and freight-class dropdown, the Carriers/Vendors tabs and creation chooser, Customers, Bills & Invoices, and the Settings landing page. No shipment was updated, booked, marked delivered, or submitted for payment; no messages were sent.

| Observation | What it proves | What still needs investigation |
| --- | --- | --- |
| Sidebar exposes Customers, Quotes, Shipments, Carriers, Bills & Invoices, Reporting, Training, Settings and Support. | These are visible broker entry points. | Full contents, permissions and alternate roles. |
| Separate Cover, Confirm pickups and Confirm deliveries links exist. | The app has operational work queues in addition to the shipment list. | Exact inclusion rules, counts, available actions and exceptions. |
| Quote form shows Freight class and optional NMFC. | Both are separate inputs. | Source of valid commodity codes, class selection policy and any automatic lookup. |
| Freight-class dropdown shows 50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500. | These were the visible options during inspection. | Whether all modes/accounts use the same options; do not infer a commodity's class from this list alone. |
| Customer Confirmation link targets a customer-rate-confirmation document route. | This control is a document link in the inspected record. | Document contents, revisions, delivery, acceptance and signatures. |
| Carrier card has Rate con and Bill; customer card has Confirmation and Invoice. | The app separates carrier and customer documents/accounting. | Rate con modal actions and the meaning of its checkmark. |
| Shipment map credits Mapbox and OpenStreetMap. | The inspected map uses Mapbox branding and OpenStreetMap attribution. | Routing, geocoding, distance and live-location data sources. |
| Edit form shows Partial disabled with “Locked after coverage.” | One field is locked in the inspected covered shipment. | Which statuses lock other fields and whether permissions also affect editing. |
| Edit form shows checked “Send updated documents → Rate Con” near Update shipment. | Updating may involve document delivery controls. | Recipients, triggering changes, resend behavior and integration effects. Do not submit to discover these on a live load. |
| Accounting exposes bills, POD, invoice sending, factoring and dispute queues. | Accounting has multiple workflows beyond listing charges. | Approval rules, reconciliation, integrations and first-release scope. |
| Settings exposes profile, company, users, teams, carriers, customers, accounting, notifications and external references. | These are visible configuration categories. | Detailed configuration and access-control behavior. |

**4\. Documentation format for every module and use case**

Keep the existing guide's numbered sections, bold labels, plain English, examples, and comparison tables. Use proper Markdown tables for field lists. Define a term at its first use and link to its glossary entry.

**Module chapter template**

1. **Purpose:** What this module does and who uses it.
2. **Where it fits:** What happens before and after it in the business flow.
3. **Open this screen:** Clickable URL, exact navigation labels, prerequisites and role.
4. **Screen overview:** Annotated screenshot and explanation of each region.
5. **Common use cases:** Numbered, followable steps with expected results.
6. **Fields and choices:** Complete field dictionary, including dropdown options and conditional fields.
7. **Buttons and menus:** Inputs, effect, destination, status change and side effects.
8. **Calculations and rules:** Formula, units, worked example, rounding and exceptions.
9. **Connections:** Related records, documents, notifications and third parties.
10. **Other states:** Empty, loading, validation failure, disabled controls, failed external calls and permissions.
11. **Try it yourself:** Safe exploration instructions and a clear stopping point before actions that affect a live shipment.
12. **Evidence and open questions:** Observed facts, official terminology sources, client decisions, date and remaining gaps.

**Field dictionary template**

| Field / exact label | Meaning and example | Source of value | Type / units / options | Required / default | Validation / edit restrictions | Used by / downstream effect | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NMFC | Commodity classification item code; distinct from freight class | Shipper's verified commodity information / approved classification reference; automatic lookup unverified | Text in inspected quote form | Displayed as optional | Exact accepted format and mode rules to verify | Rating and shipment documents to verify | UI + official reference |

**Button/action dictionary template**

| Exact label | Available when / role | What opens or changes | Data saved | Status effect | Documents / notifications / API effect | Failure / retry / duplicate behavior | Verified or open |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Confirmation | Customer card on inspected shipment | Customer-rate-confirmation document route | No save observed from link navigation | No transition established | Document actions to inspect | To verify | Route observed; full behavior open |

**Use case template**

**Use case ID:** SHP-EDIT-01  
**Goal:** Review an existing shipment's edit options.  
**Actor:** Broker user with access.  
**Start:** [Open the inspected shipment](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4).  
**Steps:** Click **Edit shipment** → review **Equipment** → inspect **Locations** → inspect **Items to be shipped** → review **Cost & price** → review **Send updated documents**.  
**Expected observation:** Sections appear; the inspected record shows Partial locked after coverage.  
**Stop here:** Do not click **Update shipment** while learning on this live record. Use a designated test shipment for save/error/re-send scenarios.  
**Next:** Link to edit rules, document behavior, and the relevant scope questions.

Example record links require account access and can become unavailable. Always include the general module URL and click path as a fallback.

**5\. Phase 0 — Agree scope, evidence rules and the documentation inventory**

**Goal:** Make “everything” measurable and agree which discovered behaviors the clone must implement.

**Work:**

- Inventory all navigation items, nested screens, tabs, filters, forms, dialogs and document actions. Assign a chapter and a use case ID to each.
- Compare existing guide coverage against the inventory. Mark each item Not explored, Observed, Partly documented, Documented, or Blocked.
- Keep an evidence register: date, role, URL, navigation/action, visible result, screenshot reference, open question and responsible reviewer.
- Separate **Observed in app**, **Industry definition**, **Client confirmed rule**, **Proposed clone behavior**, and **Unverified**. A term definition alone does not establish app behavior.
- Record hidden or inaccessible roles/modules explicitly; arrange a walkthrough rather than treating them as absent.
- Keep credentials and unnecessary private contact information out of the documentation. Use fictional examples for exercises.

**Questions for the client/team lead:**

1. Visual match, workflow match, or both? Which differences are allowed?
2. Which modules, freight modes, equipment types, territories and user portals are in the first release?
3. Which existing workflows are essential, optional, replaced or excluded?
4. Who provides the operational answers, approves the documentation and signs off on clone requirements?
5. Which roles and test environment can we access? Which test records may be created, changed and removed?
6. Which actions trigger bookings, customer/carrier emails, document resends, charges or accounting sync?
7. Must we migrate records, historical documents, users and accounting balances? What volume and retention are required?
8. Which third parties must be live at launch, and which workflows may be manual initially?
9. What are the expected deadline, priority order and acceptance scenarios?

**Output:** Scope matrix, screen inventory, existing-guide gap list, evidence register and decision log.

**Done when:** Every known module has an owner, exploration status and scope status. Unanswered decisions remain visible with an owner.

**6\. Phase 1 — Business overview, navigation and terminology**

**Goal:** A beginner can explain the system and follow its hierarchy before using forms.

**Work:**

- Write the overall request → quote → booking/coverage → pickup → transit → delivery → billing story. Mark branches and manual steps; do not assume all shipments follow one path.
- Explain broker, customer, pickup shipper/consignor, consignee, carrier, driver, rep, dispatcher and service vendor separately.
- Document the dashboard, global search, task queues, navigation, profile and help entry points.
- Build a glossary: LTL, TL, equipment, partial, handling unit, pallet, commodity, accessorial, NMFC, freight class, cf, pcf, linear feet, BOL, PRO, POD, rate con, tender, invoice, bill, target cost, price, profit, margin and markup/Cost+.
- For each term, include meaning, example, source, where it appears and why the user needs it at that phase.

**Output:** System overview, navigation map, actor/relationship map and glossary.

**Done when:** A reader can identify who pays whom, who moves the freight and how a quote connects to operations and accounting.

**7\. Phase 2 — Customers, carriers, vendors and reusable records**

**Goal:** Explain the records needed before quotes and shipments can be handled.

**Work:**

- **Customers:** List, filters, creation, detail page, contacts, reps, credit/payment labels, customer login/access, addresses, notes and linked quotes/shipments. Confirm customer-level overrides separately from global settings.
- **Carriers:** List, search/filter, creation by MC/DOT where applicable, details, contacts, equipment, documents, onboarding/compliance and carrier integration relationship. Investigate actual forms before defining required fields.
- **Vendors:** Explain each observed type; inspect creation/details, adding a vendor to a quote/shipment, service charges and its bill.
- **Locations and templates:** Saved company/address/contact records versus shipment-specific values; editing a template versus editing only a stop.
- Distinguish a vendor business from a software/API provider. A warehouse vendor does not automatically require a warehouse API.

**Output:** Master-record chapters, field/action dictionaries and relationship diagram.

**Done when:** Readers can distinguish all parties, find the right record and understand how it gets reused downstream.

**8\. Phase 3 — Quote creation, freight classification and pricing**

**Delivery status:** Observed documentation added to main §14, evidence E-51–61 and updated QTE-01–12. One unsaved measurement example and existing request-to-shipment navigation verified. Submission, save, sharing sends, booking/dispatch, all subtype and role tests remain pending; owned gaps are explicit. Phase 4 observed documentation is delivered in main §15; Phase 5 observed documentation is delivered in main §16; Phase 6 is next.

**Goal:** Document the quote workflow from inputs through offers, customer pricing and the booking handoff.

**Work:**

- Inspect LTL and representative truckload equipment separately. Record every equipment/packaging/location/service option and which controls appear or disappear.
- Explain customer/contact, dates, pickup/delivery locations, service requirements, dimensions, quantities, weights, units, freight class, NMFC, stackable, hazmat and estimated length.
- For NMFC/class, identify whether the source is user entry, commodity template, licensed lookup or integration. Confirm responsibility for choosing and correcting values.
- Document Get quotes, returned offers, carrier groupings, service filters, guarantees, transit estimates, manual quotes, extra vendors, sharing, customer visibility, expiration and unavailable offers.
- Explain cost, price, profit, margin and Cost+/markup with arithmetic examples and rounding rules; identify global defaults, customer overrides and per-quote overrides.
- Document customer approval/tender versus broker booking, all prerequisites, resulting record links and any external dispatch step. Test booking only in a designated environment.
- Capture no-rate, partial carrier failure, stale quote, missing-field and duplicate-submission cases.

**Output:** Detailed quote chapter, option catalog, calculation examples, offer/action dictionary and quote-to-shipment walkthrough.

**Done when:** Every quote input and offer action has an explanation, source, effect and evidence or a clearly owned open question.

**9\. Phase 4 — Shipment lists, coverage and shipment detail screens**

**Delivery status:** Observed documentation added to main §15 and evidence E-62–75. List filtering/rows, queue states, coverage/candidate/packet forms, direct creation, detail regions, financial/freight examples and related document navigation inspected. Creation/assignment/posting/send/status/role/file outcomes and date/provider rules remain untested; Phase 5 observed documentation is delivered in main §16; Phase 6 is next.

**Goal:** Explain daily broker work and every section of a shipment record.

**Work:**

- Inspect all shipment-list tabs, queues, sorting, filters, row values, colors, indicators, lead counts, export and direct shipment creation.
- Separate quote conversion from creating a shipment directly; record required information and resulting initial state for each.
- Explore coverage: carrier leads/offers, target cost, carrier selection, assignment/replacement, multiple providers and relevant posting options. Do not infer what “leads” counts without inspecting it.
- Document shipment header/identifiers, reps, status timeline, carrier/customer/vendor cards, financial summary, stops, contacts, equipment, items, summary calculations, map, notes and timeline.
- Inspect customer Confirmation, carrier Rate con, Bill, Invoice, Documents, driver information and shipment action menu as distinct use cases.
- Record document preview/download/edit/send/signature controls separately from shipment-status actions.

**Output:** Shipment operations chapter, coverage walkthrough, complete shipment-detail map and button dictionary.

**Done when:** A reader can explain every displayed region and reach related records/documents using exact links or click paths.

**10\. Phase 5 — Edit shipment, scheduling, tracking and exceptions**

**Delivery status:** Observed Phase 5 content is in main §16, E-76–82. Save/status/role/outbound validation remains pending.

**Goal:** Explain which changes are allowed and what they affect.

**Work:**

- Inventory Custom BOL, customer/contact, equipment, Partial, Tanker endorsement, Team service, vendor/carrier assignment, distance and stops.
- Document stop ordering, multiple stops, location type, address/contact, Share BOL, pickup/delivery instructions, opening/closing times, dates, appointments, references and private notes.
- Document item description, contains/packaging/quantity, dimensions/units, total weight, stackability, hazmat, adding items, estimated total length, total value and visualizer.
- Explain line-item cost/price calculators, additional charges, margin/Cost+/profit, lane history and financial rounding.
- Inspect Hide contacts from carrier, Send updated documents, Update shipment, cancel/back navigation and timeline entries.
- Build a field × shipment status × role editability matrix. Recheck the observed “Locked after coverage” behavior across representative records.
- Determine whether edits save only on submission or any controls save immediately. Check document regeneration/resend, carrier amendments, repricing and accounting effects in the test environment.
- Document pickup/delivery confirmation dialogs, appointment/ETA, In/Out times, PRO entry, driver/truck/trailer, tracking updates, POD, cancellation and other exposed exception actions.
- Build a status-transition table: from state, trigger, actor, required fields, validation, resulting state, side effects and correction path. Include manual versus integrated updates and duplicate/out-of-order updates.

**Output:** Edit and tracking chapters, validation catalog, editability matrix and status-transition map.

**Done when:** Each editable field has a rule and downstream effect; each transition has evidence or a client-confirmed rule.

**11\. Phase 6 — Documents, bills, invoices and accounting**

**Goal:** Follow the money and document lifecycle without confusing customer and carrier obligations.

**Work:**

- Explain BOL versus customer confirmation versus carrier rate confirmation versus POD versus carrier bill versus customer invoice.
- Document each template's fields, number/reference source, generation trigger, recipients, visibility, revisions, download/upload/send controls and relationship to status.
- Follow vendor/carrier bill entry/upload, approval, disputes/adjustments, due dates and payment records.
- Follow customer invoice draft, references, supporting documents, sending, disputes, overdue state and payment records.
- Inspect Bills to Upload, Bills to Approve, Bills to Pay, overdue queues, missing POD, Invoices to Send, Invoices to Factor, outstanding and disputed invoices. Confirm which are in scope.
- Define accounting synchronization direction, entity mapping, external IDs, duplicates, failures, retries and reconciliation with the selected provider.
- Confirm payment terms and payer from account setup and business owners. Review the existing guide's prepaid explanation against a reliable freight reference; avoid treating prepaid as proof of payment before pickup.

**Output:** Document catalog, accounting walkthroughs and integration mapping.

**Done when:** The reader can distinguish document creation, sending, acceptance, bill approval and recording payment as separate events.

**12\. Phase 7 — Third-party dependency and API requirements**

**Goal:** Expand the existing access guide into a feature-to-provider map with confirmed launch requirements.

**Inventory categories to investigate**

| Category | App use case | Starting evidence / candidate | Confirmation needed |
| --- | --- | --- | --- |
| Carrier rating and operations | Rates, service/transit estimates, pickup/dispatch, tracking, BOL, documents | Carriers listed in the existing API guide | Per-carrier capabilities, account eligibility, sandbox, credentials and launch priority; each operation separately. |
| Maps / rendering | Show stops and shipment route | Mapbox attribution observed live | Map display requirements, client-owned account and appropriate public access token. |
| Address search / geocoding | Find locations and turn addresses into coordinates | Address inputs visible; provider unverified | Which service supplies suggestions and coordinates; autocomplete alone does not prove a provider. |
| Routing / mileage / ETA | Route line, distance, travel estimates | Route/map and distance visible; computation source unverified | Ordinary route versus truck-specific restrictions, source of mileage, recalculation and overrides. |
| Live tracking | Driver positions, breadcrumbs, tracking requests and events | Existing guide names Trucker Tools; not reverified this session | Launch provider, consent workflow, update transport, freshness, completion and failure behavior. |
| Accounting | Customer invoices, carrier bills, payment reconciliation | Existing guide names QuickBooks Online; current connection unverified | Sync direction, accounts/items, OAuth ownership, test company, failures and duplicate prevention. |
| Carrier onboarding / monitoring | Qualification, authority, insurance and document checks | Existing guide names MyCarrierPackets, Carrier411, CarrierOK and Highway | Required checks, launch providers, actual API access and manual fallback. |
| Freight classification | Commodity/NMFC/class lookup | Existing guide names ClassIT+; UI lookup behavior unverified | Licensed data/API access, manual entry policy, rule versions and responsibility. |
| Load boards / market data | Post loads, receive interest, lane/rate reference data | Existing guide names DAT / Truckstop; lane history source unknown | Posting versus rate intelligence, manual versus automatic workflow, launch scope. |
| Email / notifications / SMS | Quotes, confirmations, BOL, invoices, driver requests, operational alerts | Document-sharing controls visible; delivery providers unverified | Channels, recipients, templates, sender domain, delivery history and resend rules. |
| Documents / storage / signatures | Generate, retain, upload, share and possibly sign shipment documents | Documents entry and document links visible | Storage/PDF implementation, retention, permissions; signature provider only if signatures are required. |
| Payments / factoring | Collect or record payments, invoice factoring | Accounting actions and factoring tab visible | Record-only versus actual processing, required integrations and launch scope. |
| Support / training | Help and learning | Support entry and TalentLMS training link visible | Reproduce, link externally, replace or exclude. |

**Important:** These are dependency categories to assess, not a requirement to buy or integrate every service. Some features can be implemented internally or handled manually. A tracking provider supplies location data; the map renderer alone does not track the truck.

**For every approved provider, record:** Business capability, exact triggering action, data sent/received, identifiers, sandbox/production access, client account owner, credential mechanism (no secrets), API/webhook/polling/manual mode, constraints, costs to confirm, failure/retry behavior and acceptance scenario. Link official provider documentation.

**Existing-guide audit items:**

- The ArcBest row currently points to Averitt instructions; validate and replace with ArcBest-owned instructions during the integration phase.
- The Double D Express row describes employment applications; that does not establish API access. Obtain a carrier-owned integration contact/path.
- October 9 connection statuses and access claims must be dated and rechecked; enabled in Quote Factory does not establish credentials or feature access for our clone.
- Confirm which listed integrations are actually needed, used separately, inactive, optional or excluded. Treat “not needed for now” as a scope decision to reconfirm.

**Output:** Updated third-party guide, capability matrix and integration decision/blocker list.

**Done when:** Each launch feature has a supported provider or agreed manual/internal implementation; no provider is marked ready from a portal feature alone.

**13\. Phase 8 — Settings, access, reporting and remaining modules**

**Goal:** Finish the modules and shared behaviors outside the main shipment flow.

**Work:**

- Inspect company/profile, users/teams/reps, carrier settings, legal agreements/rate-confirmation configuration, customer margins/login/quote settings, accounting, notifications and external references.
- Build a role × action matrix, including customer visibility, private notes, hidden contacts, pricing, exports and accounting access. Mark unavailable portals as blocked.
- Inventory every report, its filters, definition of each metric, date/time basis, totals, export and permissions.
- Document global search, list pagination, URL/filter persistence, date/time zones, unit formatting, loading/empty/error states and external support/training handoff.
- Ask about requirements not discoverable from UI: migration, audit retention, backups, expected volume, performance and access isolation. Label these client requirements rather than observed Quote Factory internals.

**Output:** Settings, roles, reporting and shared-behavior chapters; complete coverage inventory.

**Done when:** Every accessible screen/menu has a documentation entry and every inaccessible area has a clear follow-up owner.

**14\. Phase 9 — End-to-end walkthroughs, gap review and sign-off**

**Goal:** Turn the collected chapters into a connected learning guide and an implementable clone specification.

**Walkthroughs to validate in a designated test environment:**

1. New customer → LTL quote → compare offers → customer price/share → required approval/tender → book → shipment → pickup/tracking → delivery/POD → carrier bill → customer invoice/payment record.
2. Truckload request → direct shipment/manual pricing → coverage/lead handling → carrier assignment → rate confirmation → scheduling → delivery/accounting.
3. Shipment with another service vendor → separate service charge → provider bill and customer charge treatment.
4. Multi-item/multi-stop shipment with mixed dimensions, units, appointments and instructions.
5. Post-coverage edit → locked fields → updated charges/documents → notification and accounting consequences.
6. Exceptions supported by the app: no rates, expired quotes, changed dates, reassignment/cancellation, tracking failure, missing documents, disputes and integration retries.
7. Role and customer-portal variations that the client includes in scope.

**Final checks:** Replay instructions using the documented role; validate links, screenshots, field coverage, formulas, actor permissions, document effects and approved requirements. Log unresolved gaps instead of filling them with guesses. Export revised DOCX/PDF copies only after source review.

**Output:** Reviewed guide index, signed-off scope matrix, unresolved-question register and acceptance scenarios linked to use case IDs.

**Done when:** Every inventory item is documented or explicitly excluded/blocked; every in-scope feature maps to a reviewed workflow, rules and an acceptance scenario.

**15\. Your ten browser questions — where they will be answered**

| Question | Starting explanation / evidence | Detailed documentation task | Phase |
| --- | --- | --- | --- |
| Where does freight class come from, and what does a value mean? | An LTL classification number, not a price or weight. NMFTA describes density, handling, stowability and liability as classification factors. The app exposes a dropdown; its presence does not prove automatic calculation. | Explain every offered class, commodity/code source, who selects it, applicable classification rules and correction/reclassification flow. | 1, 3, 7 |
| What does customer Confirmation do? | On the inspected shipment, it links to the customer-rate-confirmation document route. | Open preview safely, inventory document contents/actions and verify whether acceptance/signatures exist separately. | 4, 6 |
| How are volume and density calculated? | For identical units measured in inches: volume in cubic feet = quantity × L × W × H ÷ 1,728. Density in lb/cf = total weight in lb ÷ total volume in cf. | Verify quantity semantics, outer packaging dimensions, mixed items, unit conversion, rounding, blank/zero values and any manual overrides in test examples. | 3, 5 |
| What notes are normally entered? | Operational examples could include “Pickup appointment requested; awaiting confirmation” or “POD requested from carrier.” These are examples, not observed requirements for the selected Notes field. | Identify which Notes form this is, audience, timeline behavior and distinction from stop instructions/private notes and bill notes. | 4, 5, 6 |
| What is PRO? | A carrier-assigned shipment/tracking reference, distinct from the broker's shipment/BOL reference. | Document when it is entered, whether imported or manual, carrier format, tracking use and correction rules. | 1, 5 |
| Which API/key is needed for the map? | The inspected map shows Mapbox attribution. Mapbox requires an access token; a Google key is not established by this evidence. | Confirm map provider choice plus separate geocoding, routing/mileage and tracking data requirements. | 7 |
| What is Rate con? | Short for rate confirmation; the carrier card has this control separately from the customer's Confirmation link. | Inspect preview/send/edit/acceptance actions, document contents and checkmark meaning. | 4, 6 |
| What is Bill? | On the carrier card, the link targets that carrier's bill record for the shipment. | Explain bill entry/upload, approval, due dates, payment records and accounting sync. | 6 |
| What should be considered when editing a shipment? | Required fields, status/role locks, valid dates/units, charges, private/shared contacts and document resends. Partial was locked after coverage in the inspected record. | Complete editability and side-effect matrices; verify save behavior and updated-document recipients. | 5 |
| What are Tanker endorsement and Team service? | They appear as separate equipment requirement toggles. In freight operations, tanker endorsement concerns driver qualification for tank-related loads; team service generally requests a driving team. The app's exact eligibility/dispatch effects remain unverified. | Confirm applicability by equipment/load, selection defaults, document/rating effects, and carrier validation; source any qualification rules from current official guidance. | 1, 3, 5 |

**Volume/density example using your screenshot:** 12,753 lb ÷ 533.3 cf ≈ 23.91 pcf, matching the displayed density to two decimals. That checks the displayed ratio; it does not establish the unseen item dimensions or the app's exact rounding sequence. With multiple items, divide total weight by total volume rather than averaging item densities. Linear feet is a separate floor-space measure and requires its own layout/stacking rules.

Freight-class reference: [NMFTA — NMFC and classification factors](https://nmfta.org/standards/classification/nmfc/). Map access reference: [Mapbox — access tokens](https://docs.mapbox.com/help/glossary/access-token/). These explain industry/provider concepts; they do not prove Quote Factory's internal implementation.

**16\. Recommended document structure and work order**

**User-confirmed delivery format:** Maintain one consolidated reader-facing document: [Quote Factory Quote Workflow Guide](Quote%20Factory%20Quote%20Workflow%20Guide.md). Add each phase's completed content directly to it. The labels below describe planned sections, not separate chapter files. Keep scope/coverage/evidence and provider-access files as supporting records:

| Proposed chapter | Primary contents | Phase |
| --- | --- | --- |
| System Overview and Navigation | Hierarchy, actors, business lifecycle, route index | 0–1 |
| Freight Terminology and Calculations | Plain meanings, examples, units, formulas, sources | 1 onward |
| Customers Carriers and Vendors | Master records, contacts, locations, relationship rules | 2 |
| Quote Creation and Pricing | All quote inputs, offers, pricing, sharing and booking | 3 |
| Shipment Operations and Details | Lists, coverage, detail cards and daily tasks | 4 |
| Shipment Editing and Tracking | Field rules, status transitions, confirmations, exceptions | 5 |
| Documents Billing and Accounting | Documents, bills, invoices and reconciliation | 6 |
| Settings Roles and Reporting | Configuration, permissions, reports and shared behavior | 8 |
| End-to-End Walkthroughs | Linked steps, expected outcomes and exercises | 9 |
| Documentation Coverage and Open Questions | Inventory, evidence, ownership and scope decisions | All |

Continue maintaining third-party requirements in the existing `docs/thrid_party/` location and link to them from relevant workflow chapters. These labels are planned section topics within the main guide. They are not additional files the reader must assemble. Phase 1 content is already consolidated there.

**Recommended execution order:** Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8 → Phase 9. Start logging integration questions during Phase 0 so provider access delays are visible early; finalize the capability requirements after the relevant workflows are understood.

**Progress rule:** After each phase, deliver its chapters, checked inventory rows, evidence and open questions. Do not mark a whole module complete while required dialogs, role variants or external effects are still unverified. Phase 0 baseline, Phase 1 learning content and Phase 2 observed-form documentation have been delivered; Phase 3 observed documentation is delivered in main §14; Phase 4 observed documentation is delivered in main §15; Phase 5 observed documentation is delivered in main §16; Phase 6 is next. Phase 2 save/validation/role/propagation, Phase 3 submission/share/booking and Phase 4 creation/coverage/status/document/role tests remain pending. Preserve unresolved questions and the distinction between a written overview and validated detailed behavior.
