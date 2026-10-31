**Quote Factory Quote Workflow Guide**

**Main system guide — business overview, navigation, workflows and terminology**

Originally prepared October 9, 2026 | Expanded October 31, 2026 | Phases 1–9 written; browser/CDP discovery ongoing; workflow validation and sign-off pending.

**This is the one main document.** Phases 1–9 are consolidated here, with explicit test and review gaps. The plan, inventory, evidence and scope files support this guide; you do not need to assemble separate phase chapters to read the final system documentation.

**In one sentence:** Quote Factory helps a freight broker arrange transportation for a customer, price the work, find a carrier, manage pickup and delivery, maintain shipment documents, and handle customer invoices and provider bills.

**Read in this order**

1. [How to use this guide](#reading-guide)
2. [System hierarchy](#system-hierarchy)
3. [People and companies](#people)
4. [Records and relationships](#records)
5. [Business lifecycle](#lifecycle)
6. [Where to go in the app](#navigation)
7. [Quote workflow and carrier offers](#quote-overview)
8. [Cost, price and payment flow](#money)
9. [Freight, service and document terminology](#terminology)
10. [Statuses and indicators](#statuses)
11. [Explore the system yourself](#explore)
12. [Customers, carriers and vendors — Phase 2](#master-records)
13. [Saved locations and address templates — Phase 2](#saved-locations)
14. [Quote creation, classification and pricing — Phase 3](#quote-details)
15. [Shipment lists, coverage and shipment detail screens — Phase 4](#shipment-operations)
16. [Shipment editing, scheduling and tracking — Phase 5](#shipment-editing)
17. [Documents, bills, invoices and accounting — Phase 6](#documents-accounting)
18. [Third-party dependencies and API requirements — Phase 7](#third-party-requirements)
19. [Settings, access, reporting and shared controls — Phase 8](#settings-reporting)
20. [Connected walkthroughs, acceptance and final review — Phase 9](#walkthroughs-acceptance)
21. [Questions still awaiting verification](#open-questions)
22. [Phase progress and what to do next](#phase-progress)
23. [Sources and supporting records](#sources)

<a id="reading-guide"></a>
**1\. How to use this guide**

**Purpose:** Understand the business first, then follow the app, then learn the detailed rules behind each field and action. The documentation also provides a basis for agreeing what the clone must implement.

**Current coverage:** Phase 0 established the discovery inventory and open decisions. Phase 1 adds the business hierarchy, actors, record relationships, navigation, lifecycle, glossary and read-only exercises. Phase 2 expands customer/carrier/vendor records and saved-location forms in sections 12–13. Phase 3 expands quote inputs, offers, pricing, sharing and the shipment handoff in section 14. Phase 4 expands shipment lists, coverage and detail screens in section 15. Phases 5–8 expand editing, accounting, integrations and settings in sections 16–19. Section 20 connects seven walkthroughs, exception cases, acceptance traceability and the completion audit.

**Evidence labels used here**

| Label | Meaning |
| --- | --- |
| Observed | A screen, route or visible result was inspected in the broker app. It does not establish hidden backend behavior. |
| Industry meaning | A freight term explained using the official references linked nearby. It does not automatically define this account's business policy. |
| Learning example | Fictional companies, amounts or scenarios used to explain a relationship. |
| Unverified | A rule, role, integration or side effect still requires inspection or a business answer. |

The inspected session displays the Stackup Solutions profile in the 10-4 Global broker app. Its Member role was verified October 26 in Users/Profile (E-99); submitted-action permissions remain untested. Customer/carrier/driver portal behavior has not been inspected through separate logins. Examples and counts can change; a specific record URL may stop working. Use the general module link and click path as a fallback.

**Scope is still pending:** The client has not selected the first-release feature set, named reviewers or designated a mutation-test environment. Learning documentation can proceed while those decisions are collected. No booking, record update, cancellation, document send or payment was performed for this phase. DOCX/PDF exports have not been regenerated.

<a id="system-hierarchy"></a>
**2\. System hierarchy — the whole app from top to bottom**

This is a business and navigation hierarchy, not a claim about Quote Factory's code or database tables.

```text
Freight brokerage company
├── People and access
│   ├── Broker staff, representatives and teams
│   └── Customer access and other portals: exact roles to verify
├── Reusable business records
│   ├── Customers and contacts
│   ├── Pickup/delivery locations and address templates
│   ├── Carriers and their contacts
│   └── Other service vendors
├── Commercial work: agree the service and price
│   ├── Customer request
│   ├── Quote inputs and carrier offers
│   ├── Customer pricing, sharing and required approval/tender
│   └── Booking / direct shipment creation
├── Operational work: arrange and follow the movement
│   ├── Carrier coverage and dispatch
│   ├── Stops, appointments, equipment and freight items
│   ├── Pickup confirmation, transit/tracking and delivery
│   └── Notes, changes, exceptions and activity history
├── Documents and money
│   ├── Customer confirmation and carrier rate confirmation
│   ├── Bill of lading, delivery evidence and other files
│   ├── Carrier/vendor bills: money owed to providers
│   └── Customer invoices: money charged to customers
└── Shared controls
    ├── Search, lists, filters, queues, reports and exports
    ├── Company, users, teams, permissions and defaults
    └── Carrier, accounting, tracking, map and other dependencies
```

**How to read it:** A customer record is reused across many quotes and shipments. A shipment combines the movement details, related parties, financial information and documents. Settings apply defaults or visibility rules across those records. Reports summarize the work already recorded.

**Work queues versus modules:** Customers, Quotes and Shipments are record areas. Cover, Confirm pickups and Confirm deliveries are focused work queues. A queue helps staff find work requiring attention; its counter is not a separate business entity.

<a id="people"></a>
**3\. The people and companies**

| Person / company | Plain meaning | Where you meet them in this app | What to keep separate |
| --- | --- | --- | --- |
| Broker company | Business arranging transportation between a customer and a carrier. | Company branding, broker workspace, quotes, shipment coordination and accounting. | Arranging transportation versus physically driving the load. |
| Broker staff / user | A person using the company workspace to do sales, pricing, dispatch, accounting or administration. | Profile, user/team settings and recorded activity. | Job responsibility versus actual app permissions; role rules remain to be verified. |
| Customer | The party buying the broker's shipping service. | Customers list, quote customer selector and shipment customer card. | Customer record versus actual pickup shipper, delivery consignee and bill-to party. They can differ. |
| Shipper / consignor | The party sending or tendering the goods from the origin. | Pickup stop/company/contact and shipping documents. | A pickup warehouse may be acting for the customer. Do not equate every pickup contact with the customer account. |
| Consignee / receiver | The party receiving the goods at the destination. | Delivery stop/company/contact and shipping documents. | Receiving goods does not by itself mean paying the broker. |
| Bill-to party | The party/address designated for billing under the shipment's billing arrangement. | Customer billing settings, invoice and carrier billing information. | Who receives the goods versus who receives an invoice. |
| Carrier | The transportation business moving the freight. | Carriers tab, carrier detail and assigned shipment provider card. | A business record alone does not prove API integration or availability for this particular shipment. |
| Dispatcher | Person coordinating a carrier's driver, equipment and load movement. | A carrier contact or confirmation actor may be labeled DISPATCH. | Carrier dispatcher versus broker staff doing dispatch work; identify the actual party. |
| Driver | Person performing the truck movement. | Shipment driver information with truck/trailer references. | The driver is not necessarily the carrier owner or billing contact. |
| Rep | Representative associated with a customer or shipment. | Rep column and Manage reps. | Exact assignment, commission, access and ownership rules are unverified. |
| Service vendor | Provider of a shipment-related service other than the primary freight movement. | Vendors tab and Add vendor controls. | A service vendor is not automatically an API/software provider. |
| Administrator | Person responsible for company configuration and access. | Settings, users and teams. | The presence of a Settings link does not establish the current user's full administrator powers. |

**Industry reference:** FMCSA distinguishes a broker arranging transportation from a motor carrier operating vehicles to move it. The descriptions above explain responsibilities; they do not assign legal authority or app permissions to a specific person. [FMCSA — carrier and broker definitions](https://www.fmcsa.dot.gov/faq/what-are-definitions-motor-carrier-broker-and-freight-forwarder-authorities).

**Carrier versus vendor — observed in the app:** The Create new vendor chooser offers **Carrier — Freight carrier with MC or DOT number** and **Vendor — Providers such as crane, insurance, warehouse, etc.** The Vendors list also displayed towing, transloader and lumper categories. The inspected forms and remaining eligibility questions are documented in [section 12](#master-records).

| Vendor example | What the service means | Learning example |
| --- | --- | --- |
| Warehouse | Storage or handling location/service. | Hold pallets until delivery can be arranged. |
| Transloader | Transfers freight between vehicles or transport units. | Move goods from one trailer to another. |
| Lumper | Loading/unloading labor provider. | A receiving facility uses a separate unloading crew. |
| Crane | Lifting service for freight requiring suitable lifting equipment. | Lift a heavy item during loading. |
| Towing | Vehicle movement/recovery assistance. | A separate provider handles a recovery service. |
| Insurance provider | Provider of an insurance service/product. | An insurance-related charge is recorded separately. Exact coverage is not defined by the vendor label. |

**Learning example — identify all parties**

Acme Manufacturing asks the broker to move goods. The pickup is at North Warehouse. Delivery is to Retail Distribution Center. Blue Road Transport moves the load, and its dispatcher assigns a driver. A separate unloading vendor may help at delivery.

- **Customer:** Acme Manufacturing, if it is the contracting customer in this example.
- **Pickup shipper/location:** North Warehouse, acting for the sending party.
- **Consignee:** Retail Distribution Center.
- **Carrier:** Blue Road Transport.
- **Other vendor:** The unloading service provider.
- **Rep:** Broker representative assigned to the customer/shipment, if applicable.
- **Bill-to:** Confirm from the billing arrangement; do not determine it from the pickup/delivery address alone.

<a id="records"></a>
**4\. The records and how they connect**

| Record | What it holds | How it connects | Where to look |
| --- | --- | --- | --- |
| Customer | Business identity, contacts and customer-specific commercial/billing information. | Can be associated with multiple quotes, shipments, invoices and payments. | Customers → select a customer. |
| Contact | A person or contact point for the customer, carrier or stop. | Sales contact, accounting contact and pickup contact can be different. | Customer overview, carrier details and stop information. |
| Location / address | A company/site and its address, contacts and access details. | Used as a stop on a shipment; reusable templates may exist. | Customer Addresses tab and shipment locations. Template-update rules remain open. |
| Quote request | The service requirements entered to obtain pricing. | Can return several carrier/service offers. | Quote form and Quotes history. |
| Carrier offer | One price/service option for the request. | Several offers can belong to one request; compare service as well as amount. | Quote results. |
| Shipment | The operational record for the work. | Connects the customer, providers, stops, freight, charges, documents and timeline. | Shipments or View Shipment on a booked quote result. |
| Carrier/vendor association | The provider relationship for this shipment. | Allows different provider services, charges, documents and bills to be represented. | Shipment provider cards / Add vendor. Exact multiplicity and assignment rules need deeper inspection. |
| Stop | An ordered pickup, delivery or other location in the movement. | Has its own timing, appointment, instructions, contacts and references. | Shipment Locations and Edit shipment. |
| Freight item / handling unit | What moves and how it is packaged/measured. | Used for pricing, equipment/space planning and shipping documents. | Quote items and shipment Items to be shipped. |
| Document | A generated or uploaded file associated with the work. | Customer confirmation, carrier rate con, BOL, POD and accounting attachments serve different purposes. | Shipment cards and Documents. |
| Bill / invoice / payment record | Provider amount owed, customer charge or recorded settlement. | Financial records link back to shipment/customer/provider. | Bill, Invoice, customer tabs and Bills & Invoices. |
| Tracking event / note / timeline entry | Progress observation, explanation or history. | Gives context to the shipment or a specific stop. | Shipment tracking controls, note box and Timeline. Audiences/save rules remain open. |

**Relationship map**

```text
Customer request → Quote request → Carrier/service offers
                       ↓ required approval/tender/booking path varies
Customer ─────────→ Shipment ←──────── Carrier and service vendors
                       ├── Ordered stops and freight items
                       ├── Tracking, notes and history
                       ├── Customer/carrier documents and delivery evidence
                       ├── Provider bill(s)
                       └── Customer invoice → payment records
```

This illustrates visible business relationships, not a verified database schema. There is also a **Create new shipment** entry point, so do not require every shipment to originate from an automatic quote-results page.

<a id="lifecycle"></a>
**5\. Business lifecycle — from a request to accounting**

This is the learning sequence. LTL automated-rate workflows and truckload coverage workflows can take different branches. Exact approval, booking, dispatch and payment rules still need the business reviewer.

| Stage | Who usually works here | What goes in / what comes out | Open this area | What to verify before moving on |
| --- | --- | --- | --- | --- |
| 1. Receive a request | Customer and broker staff | Customer's origin, destination, freight and service needs → requirements to enter. | Customers / Quote | Actual intake channel: phone, email, portal or other channel is organizational context, not established by a staff-entry form. |
| 2. Identify the parties | Broker staff | Customer/contact plus pickup and delivery parties → correct records/stops. | Customers / quote customer selector | Customer, pickup shipper, consignee and bill-to are correctly distinguished. |
| 3. Describe the move | Broker/pricing staff | Equipment/mode, dates, stops, services and freight → rate request or manually priced shipment. | Quote; alternatively Create new shipment | Dimensions/weight/units, [freight class and NMFC](#classification), accessorials and timing are understood. |
| 4. Obtain and price offers | Broker/pricing staff | Carrier/service costs → customer price and offer options. | Quote results | Service, transit, guarantees, [margin](#pricing-terms), validity and unavailable carriers. |
| 5. Share and agree work | Customer and broker staff, depending on workflow | Proposed price/service → required approval/tender and booked work. | Sharing, customer workflow and Book where available | Customer visibility does not alone prove approval; actual events and actor rules remain to verify. |
| 6. Obtain carrier coverage | Broker carrier/dispatch staff | A shipment needing a carrier → suitable carrier arrangement. | Cover queue / shipment Cover link | **Booked can still need a carrier.** Record carrier selection/confirmation separately from the booking label. |
| 7. Schedule and dispatch | Broker and carrier coordination | Carrier/stops/requirements → pickup arrangements and driver information. | Shipment, dispatch/pickup queues | Who dispatches, who receives the rate con/BOL, appointments and required contacts. |
| 8. Pickup and transit | Carrier/driver with broker monitoring | Actual pickup and movement events → progress/tracking. | Confirm pickups / shipment | Planned date versus actual event; PRO/driver info, exceptions and update source. |
| 9. Delivery and evidence | Carrier/receiver with broker follow-up | Delivery event and supporting evidence → recorded delivery/POD. | Confirm deliveries / shipment / Documents | Delivered status, delivery evidence and accounting prerequisites are separate checks. |
| 10. Reconcile and bill | Accounting and operations | Provider bill, agreed charges and supporting files → customer invoice and provider payable. | Bill / Invoice / Bills & Invoices | Adjustments, approvals, disputes, terms and required attachments. |
| 11. Record settlements | Accounting | Customer receipt/provider settlement → updated financial records. | Customer payments / bill and invoice payment controls | Recording a payment is not proof that this app executed a bank transfer. Exact processing and sync are unverified. |

**Two important branches**

- **LTL offer path:** Enter quote requirements → obtain/compare carrier services → set customer price → follow the required approval/booking steps → follow the shipment. A booked quote example visibly links to its shipment.
- **Truckload coverage path:** Enter/receive the work and price → recorded shipment can be Booked → find carrier coverage → arrange pickup/dispatch → follow movement. The inspected BOL **1047758** is Booked while displaying **Needs a carrier** and **Cover freight (Auto Transport)**. This corrects the earlier assumption that every Booked shipment already has an assigned carrier.

**Existing-account example:** [Open BOL 1047758](https://app.quotefactory.com/broker/shipment/6accf55afcc298c7a4311d79) to inspect that distinction. It is historical live data, not a practice record. Do not reschedule or assign a carrier while exploring it.

<a id="navigation"></a>
**6\. Where to go in the app**

**Open the system:** [Broker dashboard](https://app.quotefactory.com/broker/dashboard). If asked to sign in, use your authorized account. The company logo returns to the dashboard in the inspected session.

| Goal | Navigation / open URL | What you should expect | Learning boundary |
| --- | --- | --- | --- |
| Get an overall view | Company logo → [Dashboard](https://app.quotefactory.com/broker/dashboard) | Map, quote/shipment shortcuts and work queues. | Counts/map buttons vary with account data. Detailed counter and freshness rules remain open. |
| Find a known record | Sidebar **Find… / Find anything…** | **Go to...** dialog, Recently visited, search results. | Verified with shipment reference 1046693; other search types/permission filtering need later tests. |
| Start a quote | Sidebar **Quote** or plus beside Quotes → [Quote](https://app.quotefactory.com/broker/quote) | Get quotes form. | Creation/save rules are not established by opening this entry point. |
| Review quotes | Sidebar **Quotes** → [Quote history](https://app.quotefactory.com/broker/quote-history) | Searchable quote records; open a result. | Booked/expired indicators describe that record; do not assume current offer validity. |
| Review quote requests | Dashboard Quotes → [Requested](https://app.quotefactory.com/broker/quote-history?status=draft) / [Quoted](https://app.quotefactory.com/broker/quote-history?status=pending) | Status-filtered quote-history entry points. | These targets were observed; full inclusion rules remain unverified. |
| Review unfinished quote work | Dashboard **Quote** queue → [Finish quotes](https://app.quotefactory.com/broker/quote-history/finish) | Advertised queue destination. | Destination not explored; don't infer behavior from the queue label. |
| Review dispatch work | Dashboard **Dispatch** → [Dispatch queue](https://app.quotefactory.com/broker/shipments/dispatching/all) | Advertised dispatch destination. | In Phase 1, clicking the zero-count shortcut left the dashboard unchanged. Direct destination later showed No active shipments (§15.2); populated dispatch actions remain unverified. |
| Find loads requiring coverage | Sidebar **Cover** → [Shipments to cover](https://app.quotefactory.com/broker/shipments/covering/all) | Shipment rows with dates, parties, amounts and leads; open a shipment for Cover. | The inspected route applied TL/booked filters. A lead is not proof of an assigned carrier. |
| Follow pickups | Sidebar **Confirm pickups** → [Pickup queue](https://app.quotefactory.com/broker/shipments/scheduled/all) | Entry point for pickup follow-up. | Detailed confirmation form and transition rules belong to Phase 5. |
| Follow deliveries | Sidebar **Confirm deliveries** → [Delivery queue](https://app.quotefactory.com/broker/shipments/delivering/all) | Shipment rows requiring delivery follow-up. | Do not click Delivered as a navigation exercise. |
| Manage customers | Sidebar **Customers** → [Customers](https://app.quotefactory.com/broker/customers) | List with contacts, activity, credit and reps; open customer detail. | Plus opens customer creation; do not submit it during a read-only exercise. |
| Review all operational records | Sidebar **Shipments** → [Shipments](https://app.quotefactory.com/broker/shipments) | Active/All, filters and shipment links. | Work queues and a filtered list can overlap; they are not separate shipments. |
| Create without quote results | Plus beside Shipments → [Create new shipment](https://app.quotefactory.com/broker/shipment/new) | Direct-creation entry point. | Blank form/defaults are documented in §15.4; submission/save rules remain untested. |
| Manage transportation/service providers | Sidebar **Carriers** → [Carriers / Vendors](https://app.quotefactory.com/broker/vendors/carriers) | Carriers, Vendors and All tabs; creation chooser. | Carrier versus Vendor is a business distinction, not an API connection status. |
| Review accounting work | Sidebar **Bills & Invoices** → [Accounting](https://app.quotefactory.com/broker/accounting/shipments/bills-invoices) | Bill, POD, invoice, dispute and overdue work queues. | Approve, send and payment controls affect real records. |
| Review analytics/exports | Sidebar **Reporting** → [Reports](https://app.quotefactory.com/broker/reports) | Lanes and saved export/report entries. | Names such as Monthly Margin or Shipments copy may be account-specific. |
| Review configuration | Sidebar **Settings** → [Settings](https://app.quotefactory.com/broker/settings) | Company, users/teams, carriers, customers, accounting, notifications and references. | Read existing values; detailed configuration and roles belong to Phase 8. |
| Learn / get help | Sidebar **Training** → [TalentLMS](https://quotefactory.talentlms.com/); **Support** button | External training link and support entry point. | Only entry points are documented here; course access/support workflow not inspected in this phase. |
| Review your account | Profile at bottom → [Profile](https://app.quotefactory.com/profile) | Profile destination. | Form contents and account switching are not yet inspected. |

**Inside a customer:** Overview → Shipments → Quotes → Addresses → Invoices → Payments. Overview also exposes contacts, billing/credit, Booking & quoting, reps and activity. These are explained in [section 12](#master-records); they are not six interchangeable views of the same data.

**Inside a shipment:** Start with header/status → identify customer and carrier/coverage → inspect stops/freight → inspect charges → use Documents, Confirmation, Rate con, Bill or Invoice for the relevant obligation. **Edit shipment** is a separate editable view; it is not required to read the movement details.

**Settings hierarchy:** Customers controls margins/customer visibility/login; Carriers controls integrations/terms/rate-confirmation settings; Accounting controls accounting connection and payment-related defaults. These settings may interact with per-customer/per-shipment choices; inheritance rules remain to verify.

<a id="quote-overview"></a>
**7\. Quote workflow and carrier offers — the overview**

1. **Choose the customer/contact and equipment.** LTL is one visible mode/equipment choice. Truckload work uses equipment selections such as Dry Van, Refrigerated, Flatbed or Auto Transport. See §14.3 for the observed equipment catalog and conditional forms.
2. **Enter dates, locations and services.** Pickup origin and delivery destination may be different companies from the customer. Services such as special collection/delivery handling affect the requirements.
3. **Describe the freight.** Packaging, quantity, dimensions, weight, freight class/NMFC when applicable, stackability and hazmat help describe what needs to move. Class is not the shipment's weight; NMFC is not the same input as class.
4. **Get and compare offers.** Each carrier/service offer can have a different price, transit estimate and commitment. The lowest amount alone does not identify the suitable service.
5. **Set the customer price.** Review carrier cost, customer price, gross profit and margin; apply the agreed approval/guardrail rules.
6. **Share and follow the required approval/tender/booking path.** Sharing or “Customer can see these quotes” is visibility evidence, not proof that the customer accepted.
7. **Continue in the shipment.** Check status, coverage and required next work separately. A booked quote result can expose View Shipment.

| Offer label/control | What it means at this learning stage | What remains open |
| --- | --- | --- |
| Standard | Regular carrier service with an estimated transit time. | Carrier-specific terms and schedule. |
| Guaranteed | A carrier service with a stated commitment and conditions. Earlier inspected results indicated a 5 p.m. default unless specified otherwise; other offers can state AM/noon. | Read the exact offer commitment; do not treat all guarantees as identical. |
| Transit time / delivery estimate | Expected movement duration/date. The app warns that these dates are estimates. | Calendar/business days, cutoff times and exceptions. |
| All / Standard / Guaranteed / Volume | Result categories and counts in the inspected results. | Volume eligibility and how each result is categorized. |
| Carrier / Delivery / Price | Controls for organizing or narrowing results. | Exact filtering/sorting behavior. |
| Open stacked quotes | Access to additional offers in a carrier grouping. | Grouping and default-choice rules. |
| Xtended Network quote | Label on some offers, separate from another offer for the same named carrier. | Network provider, routing and pricing; the carrier name alone does not establish a direct API connection. |
| Add manual quote | Entry point for a manually supplied offer. | Required form, source, approval and update rules. |
| Book | Booking action where available; it can affect real freight operations. | Eligibility, actor, prerequisites and external carrier dispatch behavior. |
| Disabled pricing / Book / Hide quote | An action is unavailable in that visible state. | Exact reason must be verified; a displayed price does not prove booking eligibility. |

**Before booking:** Check customer/pickup/delivery/bill-to parties, dates, contacts, freight/units/classification, equipment/services, offer terms, cost/customer price, credit/payment arrangement and required approval. Use an approved test environment to validate the actual Book action.

<a id="money"></a>
**8\. Cost, price and payment flow**

**Learning example:** The broker agrees to charge the customer $1,000. The carrier is expected to charge the broker $750. With no other costs in this example, gross profit is $250. The customer receives the broker's invoice; the carrier's bill represents a separate amount owed to the provider. Receipt of one payment does not prove settlement of the other.

```text
Customer → pays broker against customer invoice
Broker   → settles carrier/service-vendor bills
Carrier  → performs the freight movement
```

These arrows explain the example's arrangement. Confirm actual payer, terms and settlement process from the specific account/shipment.

<a id="pricing-terms"></a>
| Label | Plain meaning | Example / formula |
| --- | --- | --- |
| Carrier cost | Amount charged/quoted by the carrier for its service. | $750 in the learning example. |
| Target cost | Planned or desired provider cost shown on the shipment. | May be displayed before a carrier is assigned; not proof of an actual approved bill. |
| Customer price | Amount charged/quoted to the customer. | $1,000. |
| Gross profit | Customer price minus relevant provider costs. Other operating expenses are not subtracted in this simple example. | $1,000 − $750 = $250. Additional vendors/charges require itemized reconciliation. |
| Gross margin | Gross profit divided by customer price, expressed as a percentage. | $250 ÷ $1,000 × 100 = 25%. |
| Markup / Cost+ | Increase relative to cost, using a different denominator from gross margin. | $250 ÷ $750 × 100 ≈ 33.33%. Exact app Cost+ rounding to verify. |
| Customer price from a target margin | Divide cost by one minus the margin expressed as a fraction. | $750 ÷ (1 − 0.25) = $1,000. Assumes one cost basis and no other adjustments. |
| Bill | Provider's charge/payable record. | Carrier Bill link and expected bill/balance in the inspected shipment. |
| Invoice | Broker's customer charge/receivable record. | Customer Invoice link and balance in the inspected shipment. |
| Payment record | Record of a receipt or settlement. | Record customer payment / Record payment controls; actual transfer mechanism unverified. |

**Earlier pricing example retained:** $276.58 cost and $368.77 customer price produce $92.19 gross profit, approximately 25% margin after cent rounding. Changing the customer margin/price does not establish that the carrier changed its offered rate.

**Payment terms are not payment evidence.** In freight billing, **Prepaid** generally designates billing on the shipper side, while **Collect** designates billing on the consignee side. A **Third Party** arrangement identifies another billed party. The bill-to details and carrier/account configuration determine how that applies to a particular shipment. “Prepaid” alone does not establish that cash was received before pickup. This corrects the original guide's payment-timing explanation. [Old Dominion — BOL billing terms](https://www.odfl.com/us/en/resources/freight-knowledge/how-to-fill-out-the-od-bol.html).

**Third Party Prepaid:** This combined label was noted in earlier quote details. Inspect the bill-to/customer/carrier setup and ask accounting to confirm the payer and terms. Do not infer who has already paid from that label.

**Account defaults versus current shipment:** Phase 0 observed 25% default LTL/TL margins in customer settings; this is not a requirement that every shipment uses 25%. The same pass observed “Not connected to QuickBooks,” conflicting with the older API guide's enabled claim. Keep those observations dated; integration readiness and launch scope remain open.

<a id="terminology"></a>
**9\. Freight, service and document terminology — learn it where it appears**

The meanings below are the Phase 1 glossary. The app column tells you where to look; operational examples are illustrative. Exact option eligibility, validation and side effects will be added in the relevant detailed phase.

**9.1 Freight, equipment and locations**

| Term | Simple meaning / example | Where it appears / why it matters |
| --- | --- | --- |
| TMS | Transportation Management System: software for organizing transportation work and related records. | The overall app. |
| Freight / commodity | The goods being moved / their description, such as packaged machine parts. | Quote items and shipment Items to be shipped. Describe the actual goods, not only the packaging. |
| LTL — less-than-truckload | Freight transported using shared trailer capacity with other shipments. | Quote equipment choice; item details/classification matter for pricing. |
| TL — truckload | Transportation arranged around a truck/trailer load or dedicated capacity. | Equipment and truckload coverage workflows; not a claim that the trailer must be physically full. |
| Equipment | Vehicle/trailer type needed for the job. | Dry Van, Refrigerated, Flatbed, Auto Transport and other selections. |
| Dry van / refrigerated / flatbed / auto transport | Enclosed trailer / temperature-controlled equipment / open deck / vehicle transport equipment. | Choose based on the actual commodity and service need. Observed equipment catalog: §14.3. |
| Partial | A load arrangement using part of trailer capacity; do not automatically equate it to the LTL rating workflow. | An edit control was visibly locked after coverage in one inspected shipment. Eligibility remains open. |
| Packaging | How freight is prepared/contained, such as pallets or crates. | Quote and shipment item forms. |
| Handling unit | One separately handled unit, such as a pallet holding several cartons. | Quantity/packaging; distinguish pallet count from cartons inside it. |
| Pallet | A platform used to group and handle goods. | Packaging and shipment totals. |
| Quantity / pieces | Number of units being counted. | Check whether the field counts handling units, contained pieces or another unit before multiplying dimensions/weight. |
| Dimensions | Outer length, width and height with their measurement unit. | Quote items/shipment editing; affect space and density. |
| Total weight | Weight for the field's stated item/group/shipment basis. | A total-weight field should not automatically be multiplied by quantity again. Exact handling-unit semantics remain to verify. |
| Origin / pickup | Location where the movement starts or freight is collected. | Quote origin and shipment pickup stop. |
| Destination / delivery | Location where freight is due to arrive. | Quote destination and shipment delivery stop. |
| Stop / leg / lane | Stop: visited location. Leg: a segment between locations. Lane: an origin–destination movement pattern. | Locations, lane history and Reporting → Lanes. Exact app grouping rules remain open. |
| Business with dock/forklift | Location type indicating loading/unloading equipment at a business. | Pickup/delivery location selector. It does not prove every requested service is included. |
| Accessorial | Additional service beyond the basic movement, such as liftgate service. | Pickup/delivery service catalog: §14.4; provider pricing rules remain pending. |
| Liftgate | Platform on a truck used to raise/lower freight where suitable dock equipment is unavailable. | Service requirements; exact availability must be checked for the offer/location. |
| Appointment | Agreed time/window for a stop; different from general opening hours. | Shipment stop and edit view. |
| ETA | Estimated time of arrival. | Stop/tracking information; estimated is different from an actual arrival. |
| In / Out | Arrival/departure controls or recorded times at a stop. | Shipment stops; precise save/transition behavior remains open. |
| Reference / PO | Identifier used to match the shipment with a party's records; PO commonly means purchase order. | Stop references, quote reference and invoice reference are different contexts. |

Basic shipping vocabulary reference: [FedEx — shipping terms](https://www.fedex.com/en-us/shipping/glossary.html). The business examples and app-specific limitations above are explained from the inspected screens; no carrier-specific weight threshold is being adopted as a universal app rule.

<a id="classification"></a>
**9.2 Freight class, NMFC and measurements**

| Term | Simple meaning | What the value/source means here |
| --- | --- | --- |
| NMFC | National Motor Freight Classification: a classification system for commodities; the form's NMFC field accepts the relevant item identifier. | Source the correct item/subprovision from the shipper's verified information or an appropriate current classification reference. The exact accepted app format/lookup behavior is unverified. |
| Freight class | An LTL classification category, expressed as a number from 50 to 500. | A class such as 125 is a category, not 125 pounds, $125 or a percentage. Commodity provisions can consider density, handling, stowability and liability. |
| ClassIT+ | NMFTA's digital source for searching NMFC classification information. | A reference/possible integration, not proof of an active lookup in Quote Factory. |
| cf / cu ft / ft³ | Cubic feet: a measure of volume. | Space occupied, not trailer-floor length. |
| pcf / lb/ft³ | Pounds per cubic foot: weight divided by volume. | Freight density. |
| Linear feet / estimated total length | Floor length occupied along the trailer. | Depends on layout, width, orientation and stacking; cannot be obtained from volume alone without assumptions. |
| lb / in / ft / mi | Pounds / inches / feet / miles. | Weight, item dimensions, floor length and route distance; preserve the unit shown next to the field. |

NMFTA explains the classification factors and the role of item/class identification. ClassIT+ provides current NMFC search; this does not establish automatic lookup in the inspected app. [NMFTA — NMFC](https://nmfta.org/standards/classification/nmfc/), [NMFTA — current classification resources](https://info.nmfta.org/nmfc-changes).

**Observed class choices:** 50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500. These are the dropdown choices observed in the LTL form, not a commodity-to-class lookup table. The official [density scale and applicability](#density-class-scale) are documented in §14.5a. Do not select class from a memorized density threshold without checking the applicable commodity provision and carrier arrangement.

**Where do the values come from?**

| Value | Input/source to establish | What is currently known |
| --- | --- | --- |
| Commodity and packaging | Information from the shipping party about the actual goods and packaging. | User-facing item/packaging inputs exist. |
| Dimensions, quantity and weight | Measured freight/packaging details with explicit unit and counting basis. | Corresponding inputs exist; exact field validation is still to be tested. |
| NMFC item and class | Verified commodity classification and applicable provision. | NMFC is shown as optional text; class has a dropdown. Automatic class derivation/provider is not established. |
| Density / volume | Calculation from dimensional/weight inputs. | Basic formulas explain the units; one two-pallet app example is verified in §14.6; broader aggregation/rounding still needs tests. |
| Mileage / route | Mapping/routing source, or any permitted manual override. | Mapbox attribution and distance fields are visible; complete data-source chain is unverified. |

**Basic arithmetic — learning examples, not a tested app specification**

- For `q` identical handling units measured in inches: `volume in cf = q × length × width × height ÷ 1,728`.
- Two units measuring 48 × 40 × 48 inches each occupy `2 × 48 × 40 × 48 ÷ 1,728 ≈ 106.67 cf`.
- If their combined weight is 1,600 lb, density is `1,600 ÷ 106.666... = 15 pcf`. Use full precision before the final display rounding.
- For mixed units, sum each unit/group's volume, sum the relevant weights, then divide total weight by total volume. Do not average item densities or multiply a group total weight by quantity again.
- Your earlier screenshot's `12,753 lb ÷ 533.3 cf ≈ 23.91 pcf` is consistent with the displayed ratio. The unseen dimensions and exact rounding order are not established by it.

Density reference: [NMFTA — freight classification and density](https://nmfta.org/news/shippers-solve-your-freight-classing-woes/). Specific commodity rules, packaging measurements, zero/missing-value handling and linear-foot layouts remain detailed-phase work.

**9.3 Service requirements and operational language**

| Term / control | Industry or ordinary operational meaning | App-specific boundary |
| --- | --- | --- |
| Stackable | Freight can safely have other freight placed on it under the relevant handling constraints. | A checkbox communicates a requirement; exact pricing/layout effects remain open. |
| Hazmat | Hazardous materials requiring applicable identification/handling requirements. | Detailed fields, carrier eligibility and validation remain to inspect; the checkbox alone is not qualification evidence. |
| Protect from freezing | Request to protect freight from freezing conditions. | Visible on the LTL quote form; service terms/availability need the actual offer. |
| Tanker endorsement | Driver qualification related to operating tank vehicles; distinct from simply selecting a tanker equipment type. | Toggle observed. FMCSA identifies N as tank vehicle and X as combined tank/hazmat endorsement. Exact load applicability and app validation remain open. |
| Team service | In ordinary freight operations, a request for a driving team rather than a solo-driver service. | Toggle observed; team size, eligibility, carrier matching and transit/pricing effect are unverified. |
| Cover / coverage | Arrange a suitable carrier for the freight movement. | Booked BOL 1047758 still shows Needs a carrier and a Cover link. Coverage forms are documented in §15.6–7; actual assignment/acceptance outcomes remain untested. |
| Lead | A potential coverage opportunity/contact/offer entry; the queue displays a lead count. | Exact origin and counted object are unverified. A lead is not confirmed coverage. |
| Tender | Offer of shipment work to a party for acceptance. | Customer tender versus broker booking versus carrier acceptance must be traced separately for this account. |
| Dispatch | Coordination/release of work for a carrier/driver to perform. | A Dispatch queue exists; its exact actions and automation are not yet established. |
| Auto-dispatch / auto-quoting | Configuration labels describing automated dispatch/quote behavior. | Labels are visible in customer settings; triggers, actors and external effects are unverified. Auto-dispatch is not delivery evidence. |
| Tracking update | A recorded movement milestone or location/status observation. | Could be manual or externally supplied; inspect the source and timestamp. |
| Notes / instructions / private notes | Notes explain context; stop instructions guide collection/delivery; private notes have a restricted intended audience. | Actual visibility/save rules must be checked per form. Example operational note: “Delivery appointment requested; awaiting confirmation.” |

Qualification terminology source: [FMCSA — CDL endorsements](https://www.fmcsa.dot.gov/registration/commercial-drivers-license/drivers). The exact tanker-load rules and the app's behavior require separate validation; no eligibility decision is made by this guide.

**9.4 Documents and accounting vocabulary**

| Term / label | Simple meaning | Where to inspect it / what it does not prove |
| --- | --- | --- |
| BOL — Bill of Lading | Shipment document describing the goods, parties, route/destination and instructions. | Shipment header uses a BOL reference. A custom broker BOL number and a carrier tracking number need not match. [ODFL — BOL overview](https://www.odfl.com/us/en/resources/freight-knowledge/how-to-fill-out-the-od-bol.html). |
| PRO number | Carrier shipment/tracking reference. | Used to follow the carrier movement. Do not infer one universal format or acronym expansion; confirm the assigned carrier's reference. [ODFL — shipment tracking FAQ](https://www.odfl.com/us/en/resources/freight-knowledge/odfl-blog/odfl-shipping-faq.html). |
| Customer Confirmation | Customer-facing rate-confirmation document link. | Shipment customer card targets a customer-rate-confirmation route. Clicking the link is not proof of customer approval. |
| Carrier Rate con | Rate confirmation for the assigned transportation provider. | Separate carrier page shows confirmation information, Share and Regenerate document in the inspected example. Exact acceptance workflow remains open. |
| POD — Proof of Delivery | Evidence supporting that delivery occurred. | Documents/accounting have POD upload controls. A status label and an uploaded POD are different evidence. |
| Invoice reference | Customer/accounting reference used to identify the invoice/work. | Customer card offers + invoice reference; separate from stop PO/other references. |
| Carrier/vendor bill | Provider's amount owed for its service. | Bill page showed Expected bill, balance, dispute, upload and payment-record controls. |
| Customer invoice | Customer-facing charge/receivable. | Invoice page showed document, balance, send, dispute and customer-payment controls. |
| Prepaid / Collect / Third Party | Billing-party arrangements described in [section 8](#money). | Do not infer cash receipt or account settlement merely from these terms. |
| Credit / credit limit / terms | Permission/threshold for deferred payment and when payment is due. | Customer/global settings and billing overview; exact rules/overrides need business review. |
| Balance / overdue | Outstanding amount / beyond the applicable due date. | Bills/invoices/queues; exact date and allocation logic remain to verify. |
| Dispute | Charge or accounting record being contested. | Bill/invoice pages expose In dispute; effect on approval/payment is unverified. |
| QuickPay | Optional quicker carrier-payment arrangement associated with a discount in the settings description. | Accounting setting; eligibility, discount formula and processing remain open. |
| Factoring | An arrangement involving receivables and a factoring service. | Invoice/Accounting controls; provider, terms and actual workflow remain open. |
| External reference | Identifier linking an app record to another system's record. | Customer overview and Settings → External references. Mapping/uniqueness rules await Phase 7/8. |
| Third-party integration | A software connection to another provider. | Different from a service-vendor record. A warehouse vendor does not automatically require a warehouse API. |

**Identifier context:** “Blanket (04821J)” appeared in earlier quote details and beside ArcBest in customer pricing. Phase 6 verified **Acct 04821J** on a generated BOL (§17.2, E-88). It is not evidence of an NMFC commodity assignment; the exact account/tariff linkage still needs the owner.

<a id="statuses"></a>
**10\. Statuses, confirmations and indicators**

These are learning descriptions, not a complete allowed-transition specification. Requested/Quoted can refer to quote work; Booked/Scheduled/In transit/Delivered can refer to a shipment. Read the record type and timeline together.

| Label | How to interpret it | What to check next |
| --- | --- | --- |
| Requested | Work/request waiting for the relevant next action. | Is this a quote request or shipment? Who should act? |
| Quoted | Pricing has been prepared/returned for quote work. | Available offers, validity, sharing and required customer decision. |
| Booked | Shipment/booking recorded in the app. | **Coverage may still be outstanding.** Inspect carrier/Needs a carrier, timeline and dispatch arrangements. |
| Scheduled | Scheduling information is recorded for the relevant movement. | Pickup versus delivery, appointment, assigned carrier and actual event. |
| In transit | The record indicates freight is moving following pickup. | Tracking source, last update, ETA and exceptions. |
| Delivered | Delivery is recorded. | Supporting POD, timestamps and outstanding accounting/document work. |
| Expired | The quote/rate is no longer current for use under its validity conditions. | Requote/update as needed; exact expiration rules remain open. |
| Canceled | The relevant quote/shipment work is canceled. | Cancellation actor/history, provider communication and any charges. |
| Confirmed / checkmark | A particular confirmation/document action has recorded evidence. | Which object, actor and event? A carrier rate con confirmation is not a customer approval or delivery confirmation. |
| Past planned date | A planned date has elapsed. | Actual status and history. An old pickup date alone is not cancellation or evidence of a missed real pickup. |

Pickup, transit and delivery dates are described as estimates on inspected screens. An appointment, ETA, actual In/Out event and delivery proof must be distinguished. A color, icon or queue count should be read with its label; its complete business rule remains a later-phase question.

<a id="explore"></a>
**11\. Explore the system yourself — Phase 1 exercises**

Use existing records you are authorized to view. Record the labels you see, not guesses about why a control is disabled. These exercises finish at a read-only observation.

| Exercise / ID | Open / click these steps | Expected observation | Stop before / lesson |
| --- | --- | --- | --- |
| A — NAV-01 | [Dashboard](https://app.quotefactory.com/broker/dashboard) → identify Quotes, Shipments and Cover/Confirm queues. | Record areas versus task shortcuts; map and changing counters. | Do not infer a count's exact inclusion rules. Lesson: how work is organized. |
| B — NAV-02 | Find anything → enter `1046693` → under Shipments select the matching result. | Shipment details opens for BOL 1046693; verified during Phase 1. | If unavailable, use Shipments to choose an accessible example. Lesson: search a reference without creating data. |
| C — REL-01 | [BOL 1046693](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4) → compare customer, carrier and two stops → open customer details. | Distinct customer/provider/stop roles; customer has multiple related areas. | Do not edit contacts/reps. Lesson: one shipment connects multiple business records. |
| D — QTE-LEARN-01 | [Quote](https://app.quotefactory.com/broker/quote) → identify customer, equipment, pickup/delivery, freight class and NMFC. | Separate inputs for service requirements and classification. | Stop before Get quotes/Book. Lesson: what the broker must know before rating. |
| E — COV-LEARN-01 | [Cover queue](https://app.quotefactory.com/broker/shipments/covering/all) → [BOL 1047758](https://app.quotefactory.com/broker/shipment/6accf55afcc298c7a4311d79). | The inspected example is Booked and still Needs a carrier. | Do not cover/reschedule/mark pickup. Lesson: booking and carrier coverage differ. |
| F — DOC-LEARN-01 | BOL 1046693 → locate customer Confirmation, carrier Rate con, Bill and Invoice; open Bill/Invoice only to read. | Different document/financial responsibilities. Controls vary by shipment state. | Do not Share, Regenerate, Remove, Send invoice or Record payment. Lesson: document viewing, acceptance and settlement are different events. |
| G — ADM-LEARN-01 | [Settings](https://app.quotefactory.com/broker/settings) → identify Customers, Carriers and Accounting. | Defaults/integrations sit outside the operational shipment. | Do not change settings. Lesson: account configuration versus individual record data. |

**Check your understanding:** Can you identify the customer, pickup party, consignee and carrier separately? Explain a quote versus an offer versus a shipment? Explain why a Booked load may need coverage? Distinguish a customer invoice from a carrier bill? Name the source you still need before choosing NMFC/class? If yes, the Phase 1 learning objective is met.

<a id="master-records"></a>
**12\. Customers, carriers and service vendors — Phase 2**

**Purpose:** Establish the businesses and people reused by quotes, shipments and accounting. A provider record is a business identity; adding it to a particular shipment is a different action. Phase 2 documents the visible forms and navigation, not untested submission behavior.

**Where this fits:** Identify customer and contacts → establish billing/quoting preferences → identify carrier/service providers → reuse the relevant parties and locations on quotes/shipments → follow their linked history and financial records.

**Evidence:** E-35–49 in the [Evidence Register](Documentation%20Evidence%20Register.md). The named records below are existing examples for reading, not designated practice data. Use fictional values only in a test environment approved under SC-05.

**Validation rule for all tables in this chapter:** A visible field, placeholder, check state or disabled button establishes its UI state only. Required fields, accepted formats, uniqueness, error text, save timing, permissions and downstream effects remain unverified unless stated otherwise. No Create, Add customer, Add vendor, Update, Done, Save address, Change types, Send request or financial action was submitted during inspection. Dialogs were closed without editing saved data. A selected type in an unsaved creation wizard was abandoned before Add vendor.

**12.1 Find the right business record**

| Goal | Open / click | Visible information and actions | Important distinction |
| --- | --- | --- | --- |
| Find a customer | [Customers](https://app.quotefactory.com/broker/customers) → select a row | Customer/contact, Booked/Quoted activity and last dates, Credit, Rep; column-header buttons and filter control. | Recorded activity is not a complete customer-acquisition history. Exact count/sort rules remain open. |
| Filter customers | Customers → **View shipment filters** | Search text and Rep selector with **select a team or user**; **See … customers** action. | The customer-list filter button retains this accessible label even though it filters customers. Apply behavior and visibility permissions were not tested. |
| Find a carrier | [Carriers / Vendors](https://app.quotefactory.com/broker/vendors/carriers) → **Carriers** | Name, USDOT, MC and location; open carrier detail. | Displayed identifiers do not prove current suitability for a load. |
| Find a service vendor | Carriers / Vendors → [Vendors](https://app.quotefactory.com/broker/vendors/vendors) | Vendor name, service type and location when present. | Vendors provide other shipment services; they are not necessarily transportation carriers. |
| Review both provider groups | Carriers / Vendors → **All** | Combined provider list at `/broker/vendors`. | A list view loaded in the broker session; combined filtering, sort and paging behavior remain unverified. |
| Filter providers | Carriers / Vendors → **View carrier filters** | Search, Added date range/date shortcuts, **Requires 1099**, **See … carriers / vendors**. | Requires 1099 is a recorded filter criterion, not tax advice or proof that reporting is required. Tax policy needs the accounting owner. |

**October 31 live list/CDP follow-up:** Opened Carriers, Vendors and All in turn without opening a record or changing filters. They navigated to `/broker/vendors/carriers`, `/broker/vendors/vendors` and `/broker/vendors`, with API reads to `/known-vendors`, `/custom-vendors` and `/vendors`, respectively. Returned list reads were 200 after OPTIONS 204 preflights. Each view first showed a shell/empty message and then populated after the reads; the transient empty message is not a verified empty-state outcome. The capture contained more request events than paired successful responses for each list route; the reason is unknown. Account-specific result totals and provider rows are omitted. See E-127 and run QF-2026-10-31-006 in [the network evidence](network/quote-factory-network.json).

**Loading state:** Several lists briefly displayed zero records/No … found before populated rows appeared. Wait for loading to finish before recording a genuine empty state or concluding the account contains no data. Counts are dated observations, not fixed product requirements.

**12.2 Customer creation and duplicate suggestions**

**Open:** Customers → plus / **Add a new customer**, or the sidebar plus beside Customers.

1. The dialog asks for **Customer name**.
2. Enter the intended business name. Inspect any **Did you mean?** suggestions before creating a separate record.
3. In inspection, searching `BUCHANAN` displayed the existing **BUCHANAN COMPANY, INC** suggestion and a separate **Add BUCHANAN as a new customer.** action.
4. **Add customer** is the creation action. It was not submitted. The resulting page, later setup requirements and duplicate rejection/merge rules are unverified.

**What this proves:** The app helps find a similar existing name before creation. It does not establish that duplicate creation is prohibited. Phone, email, website or in-person request intake cannot be inferred from this staff-entry dialog.

**12.3 Customer identity and contacts**

**Example:** [Open inspected customer](https://app.quotefactory.com/broker/customer/66c366f48a53dbc0fdaed429). Fallback: Customers → choose an authorized example → Overview.

**Customer detail layout:** Header and Documents/Reps → business identity → tabs → Overview panels → active shipments and note/Timeline. The header exposes **Edit customer details**, **+ vendor number**, **+ phone**, **+ website**, **+ description** and a logo control. Only the named edit dialog was inspected; individual shortcut/logo workflows remain to verify.

**Open identity form:** **Edit customer details** → **General**.

| Exact field / control | Meaning and input source | Observed UI | Usage / remaining question |
| --- | --- | --- | --- |
| Customer name | Customer business name supplied by the business/customer record. | Text, populated for the example. | Name shown on related records; renaming propagation and duplicate rules untested. |
| Vendor number | Customer-side/business reference field; the name does not establish its numbering convention. | Text with `12345` placeholder. | Ask who assigns it and which documents use it. It is not the same as creating a service vendor. |
| Phone | General business phone. | Phone input; USA country selector disabled in this dialog. | General phone versus contact/billing/stop phone. Other-country support and validation untested. |
| Website | Business website. | Text with website placeholder. | URL normalization and validation untested. |
| About | Business description. | Text area with add description placeholder. | Internal/public visibility and length limit unverified. |
| Done / Close modal | Form actions. | Done and close controls. | Persistence/autosave behavior is not established merely by the Done label. |

**Contacts workflow:** Overview → **View all customer contacts** → select a contact to view → **Edit contact** or **Add new contact** for the relevant form. Contacts were shown as draggable entries with position numbers. No reordering or deletion was attempted. The selected contact is a viewing selection; it is not evidence that the contact is the designated primary contact.

| Contact field / action | Meaning / example | Observed behavior or boundary |
| --- | --- | --- |
| First name / Last name | Person's name; e.g., Alex / Example in a test record. | Blank in New contact; populated in Editing contact. Requiredness untested. |
| Title | Person's role/title. | Separate text input; not an app permission role. |
| Contact Details | Communication details. | New field placeholder **Phone, email or URL**. Existing entries can expose type labels, phone subtype such as office, copy and remove controls. Type-detection/format rules untested. |
| Create / Update | Persist new/edited contact. | **Create contact** and **Update contact** buttons; neither submitted. |
| Cancel | Abandon the edit/new-contact form. | Returned to Viewing contact during inspection. No edited values were entered. |
| Delete contact | Remove the selected contact. | Control observed, not executed; dependency/recovery rules unknown. |
| Email / phone links | Open a mail or dial action for that contact. | `mailto:` and `tel:` links observed; no message/call initiated. |
| External references / note | Contact-specific integration identifiers/context. | Entry points visible. Their editors, audience and save rules remain unverified. |

**Do not interchange contacts:** General customer contact, customer billing recipient, pickup contact, consignee contact, carrier dispatcher and driver can all be different people. Determine which communication/document uses each field before cloning notification logic.

**12.4 Customer billing, credit and invoice preferences**

**Open billing form:** Customer Overview → **Edit customer billing** → **Accounting**. These are customer defaults/context; their exact inheritance into existing/new invoices remains unverified.

| Field / control | Plain meaning / value source | Observed state / what to verify |
| --- | --- | --- |
| Billing address | Address for billing the customer. | **Edit billing address** opens a separate address form. It is distinct from a shipment pickup/delivery address. |
| + Legal name | Entry point for the business's legal billing name. | Control visible; its nested field and document precedence were not inspected. |
| Billing email | Invoice/accounting recipient(s). | Token-style email input with **+ billing email**; sample already had a recipient. Recipient validation and send rules untested. |
| Billing phone | Phone for billing communication. | Phone and country controls; not the same field as the general business phone. |
| Tax ID / EIN | Tax identifier input context; EIN means Employer Identification Number. | Tax ID input with EIN type control. No tax identifier copied into this guide and no validation tested. |
| DUNS number | Business identifier field labeled DUNS. | DUNS selector/type label was disabled; an adjacent value input appeared. Exact editing/enrichment rules unverified. |
| LTL POD required / TL POD required | Separate delivery-proof preferences by freight mode. | LTL unchecked and TL checked in the inspected example. Whether they block invoice sending or another action needs Phase 6 tests. |
| Combine PDFs (bill and POD) | Preference for combining supporting documents. | Checked in the sample; exact resulting files, ordering and recipients unverified. |
| Days to pay | Customer payment-term duration. | Displayed as 30 in the sample; editing and due-date calculation not tested. |
| Done | Form completion control. | Not clicked; save timing/autosave behavior remains open. |

**Billing-address form:** Edit customer billing → **Edit billing address** → **Google address search**, **Search address...**, **Company**, **Country**, **Street**, **Line 2**, **City, state, zip**, **Save address**. Existing values were prefilled. The Country field was available; no selection or address was changed. This is evidence of a UI explicitly labeling Google address search, not proof of the specific Google product, credentials, billing account or API contract. The shipment map separately displays Mapbox branding.

**Credit panel:** Overview → **Manage credit limits** opened a **Credit limit reached** dialog with a message about paying the balance/requesting an increase to continue booking. It showed **Limit**, **Open**, **Current**, **1–15 / 16–30 / 31–60 / 61+ late**, **Not invoiced**, **Remaining**, **Terms**, and links to **View invoices / View payments**. Only the displayed account summary/message was inspected; actual booking enforcement, recalculation and override permissions were not tested. Do not interpret global Limits Disabled and this customer's credit message as a fully understood policy.

**Learning example:** A customer may require TL POD attachments, a billing address different from the delivery site, and 30-day terms. These are separate requirements. A POD checkbox does not indicate that a delivery document has already been uploaded, and terms do not prove a payment occurred.

**12.5 Customer quoting preferences, representatives and history**

**Open:** Overview → **Booking & quoting** → Settings dialog.

| Area / field | Observed UI | Meaning / remaining rule |
| --- | --- | --- |
| Customer-specific → Enable booking | Checked and disabled in the sample. | Why disabled, role dependency and actual booking eligibility remain open. |
| Customer-specific → Customer login | Checked in the sample. | Setting exists; portal sign-in, invitations and effective access not tested. |
| Customer-specific → Auto-quoting (LTL) | Unchecked in sample. | Trigger and returned/shared results need Phase 3 investigation. |
| Customer-specific → Auto-dispatching (LTL) | Unchecked in sample. | Trigger, customer approval and carrier dispatch side effects unverified. |
| LTL carriers → Default gross margin | Per-carrier percentage fields; sample defaults were 25. | Customer-level carrier pricing context exists. Global/customer/carrier/offer precedence untested. |
| LTL carriers → Minimum gross margin | Per-carrier percentage input. | Lower-margin constraint; exact enforcement/overrides untested. |
| LTL carriers → Minimum gross profit / Maximum gross profit | Per-carrier currency inputs. | Profit limits; currency/rounding/conflict with margin limits untested. |
| Volume multiplier | Label visible above the carrier pricing layout. | No unambiguous editable value/source was established. Do not invent its formula. |
| Xtended Network row | Separate default/minimum margin and profit fields. | Confirms a separate pricing-configuration row, not the network's provider/routing logic. |
| Done / close | Dialog controls. | No values changed or submitted. |

The carrier-pricing tab also showed identifiers beside carrier names; `04821J` appeared beside ArcBest. Its exact label/meaning was not established. Do not assume this string is an NMFC commodity code just because it appeared in earlier quote details. See [§15.5a](#shipment-quote-details) for Blanket context and §17.2 for the separately observed Acct label; exact account/tariff mapping still needs its owner.

**Representatives:** Header → **Manage reps** → **Reps assigned**. The dialog exposes **+ add user or team**, a User/Commissions layout and draggable assigned-user entries. Its explicit message says: **“Changes will only be applied to new shipments; existing shipments will not be affected.”** This is an observed UI rule for customer rep assignment. It does not establish commission formulas, access permissions or what shipment-level Manage reps does. No assignment was changed.

**Customer tabs and related actions**

| Tab / control | URL or path | Observed contents / next use |
| --- | --- | --- |
| Overview | [Reference customer](https://app.quotefactory.com/broker/customer/66c366f48a53dbc0fdaed429) | Billing/credit, contacts, Booking & quoting, external references, active shipments, note/Timeline. |
| Shipments | [Customer shipments](https://app.quotefactory.com/broker/customer/66c366f48a53dbc0fdaed429/shipments) | Links to this customer's shipment records with status, dates, parties, route, equipment and provider/lead information. |
| Quotes | [Customer quotes](https://app.quotefactory.com/broker/customer/66c366f48a53dbc0fdaed429/quotes) | Quote-result links, dates, lanes, weight/mode and booked/expired indicators; some rows include shipment/reference identifiers. |
| Addresses | [Address book](https://app.quotefactory.com/broker/customer/66c366f48a53dbc0fdaed429/address-book) | Saved location cards, address search and plus/Create template. See [section 13](#saved-locations). |
| Invoices | [Customer invoices](https://app.quotefactory.com/broker/customer/66c366f48a53dbc0fdaed429/invoices) | Aging groups, shipment/invoice links, Not Invoiced/Open/Late summaries, Record payment, Download CSV, Send statement and Download statement. Actual sending/payment/export behavior belongs to Phase 6. |
| Payments | [Customer payments](https://app.quotefactory.com/broker/customer/66c366f48a53dbc0fdaed429/payments) | Date, Amount, Method, Reference, # of shipments, Credit columns and Record payment. Existing payment rows were observed after loading. |
| Documents | Header → Documents | Customer document dialog with add document/+ add file. Upload requirements, types, limits and visibility remain open. |
| Quote / Shipment shortcuts | Overview → Quote or Shipment | Entry URLs include this customer's `customerId`. That shows customer context in the route; full form population still needs checking. |
| External references / note / Timeline | Overview | Mapping/context/history entry points. Detailed editing, audience and retention remain Phase 8/OQ-11 work. |

**Statement versus invoice:** The Invoices tab describes Send statement as emailing the billing contact with a statement PDF attached. That is an account-summary communication, not a safe read-only navigation button. It was not clicked.

**12.6 Carriers: identity, onboarding, contacts and linked work**

**Open:** Sidebar Carriers → choose a record. [Reference carrier: Pathak Express](https://app.quotefactory.com/broker/carrier/6a70a2e26de54b07f01bc668). Fallback: the assigned carrier link on its shipment/bill.

**Creation entry:** Create new vendor → **Carrier — Freight carrier with MC or DOT number** → **Carrier MC or DOT #**. The lookup field was inspected without entering an identifier or submitting a result. Auto-match/import, existing-carrier handling, required later fields, lookup source and actual creation are still unverified. Do not describe a full onboarding API based only on this initial input.

**Identifiers:** USDOT identifies an entity's operations/registration context; MC refers to operating authority. They serve different purposes. A visible number is not itself a current authorization check for the particular service. [FMCSA — operating authority](https://www.fmcsa.dot.gov/faq/what-operating-authority-mc-number-and-who-needs-it), [FMCSA SAFER — identifier help](https://safer.fmcsa.dot.gov/saferhelp.aspx).

| Carrier area / exact label | Observed information | Meaning / next investigation |
| --- | --- | --- |
| Header | Carrier name, USDOT, MC and city/location link. | Separate identifiers; the city link targets Google Maps. Source/refresh and edit policy remain open. |
| Approved | Approval label with an adjacent unlabeled control. | Account approval indication; changing it and its effect on load assignment were not tested. |
| Packet not requested / Send request | Onboarding/packet status and a request button. | This is an outbound-action boundary. No request sent; recipient, packet contents/signatures and approval path remain to inspect in a test workflow. |
| FMCSA Authorized | Authority label in the example. | Displayed app information, not an independent live FMCSA check performed by this documentation. |
| Safety / Unrated | Safety-rating area. | Unrated is the displayed label; it is not a conclusion that the carrier is safe/unsafe or acceptable. |
| Insurance / BI/PD | Insurance area. | BI/PD commonly means bodily injury/property damage. Policy amounts, expiration, cargo coverage, data source and eligibility rules were not established. |
| Trucks / Drivers | Fleet/personnel counts in the profile. | Not proof of capacity available for this shipment or a specific driver's assignment. |
| Contacts | Dispatcher/contact card and contact-list control. | The accessible label reused **View all customer contacts** even on the carrier page. Carrier contact editor not reopened; don't assume all customer contact rules are identical. |
| Payment terms | Displayed 30 days **from Vendor bill** in the sample. | Provider terms, not customer receivable terms. Due-date origin and override rules need Phase 6. |
| Tax & entity | Tax identifier and legal-entity entry point. | Values intentionally omitted here; editing/reporting policy unverified. |
| External references | External mapping entry point. | Does not establish active integration. |
| Active shipments / Shipments tab | Existing shipment links. | [Carrier shipment history](https://app.quotefactory.com/broker/carrier/6a70a2e26de54b07f01bc668/shipments) loaded the known related shipment. |
| Payments tab | Date/Amount/Method/Reference/# of shipments/Credit columns. | [Carrier payments](https://app.quotefactory.com/broker/carrier/6a70a2e26de54b07f01bc668/payments) showed No payments found after loading in this example. That is a sample empty state, not an account-wide assertion. |
| Documents | Header → Documents → add document to carrier/+ add file. | Carrier business files, distinct from a specific shipment's POD/rate con. No upload attempted. |
| Note / Timeline | Record context/history controls. | Save/visibility/edit/retention rules remain open. |

**Carrier record versus integration:** A carrier can exist as a business record regardless of whether automatic rates, pickup, tracking or document retrieval are integrated. Check those capabilities separately in Settings → Carriers → Carrier integrations during Phase 7. Approval, packet request, authority, insurance, API activation and assignment to a load are different states.

**12.7 Service vendors: create, classify and maintain**

**Open:** Carriers / Vendors → Vendors. [Inspected warehouse vendor](https://app.quotefactory.com/broker/vendor/690b6248697f83b64e804be5). Fallback: choose an authorized existing vendor in the list.

**Creation path:** Create new vendor → **Vendor — Providers such as crane, insurance, warehouse, etc.** → select a type → **Select type** → **Vendor name** → **Add vendor**. Before a type is selected, Select type is disabled. In the unsaved wizard, choosing Warehouse enabled the next step; the Vendor name field then appeared. No vendor was created.

| Visible vendor type | Plain service meaning | Example use |
| --- | --- | --- |
| Chassis | Chassis/equipment support for a container movement. | Container transport equipment service. |
| Crane | Lifting service. | Lift freight at a stop. |
| Customs broker | Customs-clearance service provider. | Handle clearance-related work where required; exact jurisdiction/service scope is not defined by this app label. |
| Insurance | Insurance-related provider/service. | Keep the service/charge distinct from the primary carrier movement. |
| Lumper | Loading/unloading labor. | Separate unloading service at a facility. |
| Steamship line | Ocean transportation line/provider. | Ocean/container-related service within the broader job. |
| Towing | Towing/recovery assistance. | Vehicle recovery or movement service. |
| Transloader | Transfer of goods between vehicles/transport units. | Unload one trailer and reload another. |
| Warehouse | Storage/handling service. | Temporary storage or facility handling. |

**New vendor versus existing vendor types:** The creation step used **radio choices** (one initial selection). Existing vendor → **Selected vendor types** opened **checkboxes** for the same nine types and **Change types**. This indicates a multi-type edit UI; persistence and the effect on existing assignments were not tested.

| Existing-vendor field / area | Open / exact controls | Meaning / observed boundary |
| --- | --- | --- |
| Vendor identity | **Edit vendor details** → Vendor name, Phone, General Email, Website → Update. | General business/contact data. Phone country selector disabled in the inspected dialog. No Update submitted. |
| Type classification | **Selected vendor types** → type checkboxes → Change types. | Service classification; no checkbox changed on the saved vendor. |
| Contacts | Overview → Add new contact. | Contact entry point; detailed vendor-specific contact form not opened. |
| Billing | **Edit billing info** → Billing address / Edit billing address and Billing email. | Billing details can be absent; inspected sample had no address on file. No changes made. Unlike customer billing, no Done action was established in this preview. Do not assume a common save boundary. |
| Payment terms | Overview displayed 30 days from Vendor bill. | Provider payable default/context. Clicking the label did not establish an editor; exact override path remains open. |
| Tax & entity type | + Add legal entity type entry. | Legal/tax classification context; editor and reporting behavior unverified. |
| Accounting integration | **Edit accounting integration settings** → **Push bills to Quickbooks Online** checkbox. | Checked in sample; this is a per-vendor preference, not proof of a working QuickBooks company connection or successful sync. |
| Active shipments | Overview. | Sample showed No active shipments; does not mean the vendor has never been used. |
| Shipments / Payments tabs | Visible alongside Overview. | Attempting Shipments in this sample did not visibly leave Overview. Destination/history behavior remains unverified; Payments contents were not opened. |
| Note | Overview note box. | Audience, save timing and editing unverified. |

**Assigning a service to a shipment is separate from creating the vendor business.** In an existing shipment, **Add another vendor** opened a **Vendor type** dialog with checkboxes for the same nine types and an **Add vendor** action disabled before selection. No type was selected there and no assignment was submitted. Whether the next step creates a service line, chooses an existing vendor, or both remains unverified. Do not document it as the same operation as the master-list Add vendor wizard.

**Charges and bills:** The shipment's vendor relationship should be investigated together with the provider's cost/price treatment and bill. Phase 2 establishes the parties and entry points; actual assignment, additional charges, provider bills and replacement/removal behavior remain Phase 4/6 work. A warehouse vendor does not automatically require a warehouse API.

**12.8 Action boundaries and record reuse**

| Action / use case | Observed result | Still to test in a designated environment |
| --- | --- | --- |
| Search customer name | Existing-name suggestion plus separate creation action. | Case/spacing matching, duplicate enforcement, merging and creation result. |
| Open customer identity/billing/contact forms | Current values and separate field groups displayed. | Requiredness, format limits, errors, save/autosave, cancellation after changes and propagation. |
| Customer Manage reps | New-shipment-only effect explicitly stated. | Actual new versus existing shipment assignments, user/team permissions and commissions. |
| New contact / Edit contact | Create/Update plus Cancel. | Primary contact/reordering rules, duplicates, deletion dependencies and recipient selection. |
| Open customer-linked histories | Customer-specific shipments, quotes, invoices, payments. | Filter/count definitions and whether record changes affect historical documents. |
| Carrier initial lookup | MC/DOT input. | Lookup source, existing match, import/update, invalid ID, manual fallback and creation. |
| Vendor wizard / type editor | One-type creation step versus multi-type edit choices. | Required name, duplicate names, multiple-type persistence and record dependencies. |
| Add vendor on shipment | Separate type-selection dialog. | Actual service/vendor assignment, changes to totals/documents and provider bill creation. |

**Relationship and reuse example**

```text
Customer business
├── Sales/operations contacts
├── Separate billing address/recipients and document preferences
├── Customer quoting/login/pricing settings
├── Representatives: UI says changes apply to new shipments
├── Saved location templates → quote/shipment stops (copy/update semantics unverified)
└── Related quotes, shipments, invoices and payment records

Carrier or service-vendor business
├── Identity, contacts and payment/tax context
├── Carrier approval/onboarding/authority information where applicable
└── Shipment provider relationship → service charges/documents/provider bill
```

**Learning example:** A warehouse business can be a service vendor, while a warehouse location can be the pickup stop for a customer. These roles can refer to related real-world businesses, but the app records and financial obligations must be followed separately. Changing a saved contact or address must not be assumed to rewrite an already issued document.

<a id="saved-locations"></a>
**13\. Saved locations and address templates — Phase 2**

**Goal:** Reuse a site without confusing the customer, the site's instructions, the billing address and an individual shipment's stop.

**Open:** Customer → **Addresses** → [reference address book](https://app.quotefactory.com/broker/customer/66c366f48a53dbc0fdaed429/address-book).

**13.1 Address-book overview**

The tab exposes **find address...**, a plus icon and cards showing company/site, pickup/delivery tags, address, contact and opening hours; some cards show a Note. Several similar-looking entries appeared. This is evidence of multiple cards, not proof of a deduplication/merge rule or that every apparent duplicate is equivalent.

The plus icon opens **Create template**. Clicking one populated card during inspection did not establish an edit/detail dialog. Do not invent an address-book edit/delete workflow. The shipment edit screen separately exposes **Edit location template for [company]**, but that template editor and propagation have not yet been tested.

**13.2 Create-template field dictionary**

| Field / exact label | Meaning / input source | Observed default or control | What needs verification |
| --- | --- | --- | --- |
| Company name | Site/company to visit. | Blank text in new template. | Required name, matching and linkage to customer/vendor records. |
| Location type | Kind of facility/access. | Business with dock/forklift initially selected in this preview. | Mode-specific options, defaults and which accessorials follow automatically. |
| LTL Services | Pickup/delivery service requirements associated with the site. | Menu of independent checkboxes; no selection changed. | Whether reused into later quotes, overridden per stop, and how charges are calculated. |
| Address | Site street address. | Search/combobox-style input. | Suggestion provider, verification and normalization; don't assume this is the same Google address-search implementation as customer billing. |
| + Address 2 | Additional street/address line. | Button visible. | Expanded field and limits not inspected. |
| City, state, zip | Site locality/postal information. | Combobox input. | Country support, postal validation, coordinate source and required parts. |
| Location contact | Person/department for this site. | Text input. | Whether linked to a reusable contact or copied text. |
| Contact phone | Site phone. | Phone input; USA country selector disabled in this form. | Accepted formats/extensions and international support. |
| Contact email (send BOL email to) | Recipient(s) intended for BOL communication. | Token-style add email field. | When mail is actually sent and whether another Share BOL control is required. Field presence alone does not establish a send. |
| Special instructions | Site-specific operational instructions. | Optional text area. | Visibility to customer/carrier and printed-document placement. |
| Open time / Close time | Facility operating hours. | 8:00 AM / 5:00 PM in the inspected new form. | Time zone, overnight hours, holidays and validation. These are not appointments. |
| Private note | Team-only context for this template. | Explicit label **visible by your team only**. | Enforced role visibility and inheritance into shipment notes still need testing. |
| Create | Template-creation action. | Button visible; not clicked. | Required inputs, creation result and subsequent reuse. |

**Example inputs for a test template:** Acme Warehouse; business with dock/forklift; a fictional test address; shipping desk contact; verified test recipient; “Use receiving entrance”; 8 a.m.–5 p.m. Do not put fictional addresses/emails into a live operational record or send documents as a learning exercise.

**13.3 Location-type options observed**

Airport; Business with dock/forklift; Business without dock/forklift; Camp; Church building; Construction site; Container freight station; Convention/trade show; Country club; Fair/amusement park; Farm; Government site; Grocery warehouse; Hospital; Hotel; Limited access; Military installation; Mine site; Native American reservation; Nursing home; Pier; Prison; Residential; School; Self-storage; Utility site.

These are the choices observed in this form, not a guarantee that every carrier supports the same accessorial/location combination. The type describes access/facility requirements, not the customer's industry or a new vendor category.

**13.4 LTL Services menu observed**

| Group | Options | What the user must understand |
| --- | --- | --- |
| Pickup | Liftgate pickup; Inside pickup; Single shipment; Sort & segregate. | Requirements at collection. The exact meaning/rating of Single shipment and Sort & segregate must be confirmed from carrier/service rules. |
| Delivery | Appointment required; Liftgate delivery; Inside delivery; Notify before delivery; Sort & segregate. | Requirements at delivery, not proof that an appointment/notification has already occurred. |

Opening the menu exposes choices; selecting a checkbox may affect the working template. No service was selected and no template was saved during this documentation pass.

**13.5 Billing address versus reusable template versus shipment stop**

| Record / editor | Purpose | Established behavior | Do not assume |
| --- | --- | --- | --- |
| Customer Billing address | Where/account name to bill. | Separate address form with Google address search and Save address. | That it is a pickup/delivery location or automatically follows a site-template change. |
| Customer Addresses template | Reusable site details. | Create template with contact/services/hours/instructions/private note. | That changing it rewrites old stops or generated documents. |
| Shipment stop fields | Requirements for a particular movement/location visit. | Edit shipment exposes company/address/contact/date/time/instructions/reference fields. | That a shipment-only edit updates the saved template. |
| Edit location template for [company] | Explicit template-edit entry inside shipment editing. | Control identified in prior shipment-form inspection. | Its save behavior and impact on future/existing shipments; inspect in Phase 5 with test data. |

**13.6 Try the Phase 2 flows yourself**

| Use case | Click path | What to learn | Read-only stopping point |
| --- | --- | --- | --- |
| CUS-LEARN-02 | Customers → plus → enter a known partial customer name. | Similar-name suggestion versus adding a new record. | Close before Add customer; selecting an existing suggestion's destination was not tested here. |
| CUS-LEARN-03 | Existing customer → Edit customer details → close → View all customer contacts → Edit contact → Cancel. | Business identity versus individual contact. | Do not update/delete/reorder contacts. |
| CUS-LEARN-04 | Customer → Edit customer billing → Edit billing address → close both dialogs. | Separate billing party/address/recipient and POD preferences. | Do not change tax, recipient, checkbox or address values. |
| CUS-LEARN-05 | Customer → Manage reps → read the new-shipment-only message → close. | Customer assignment effects are explicitly scoped. | Do not select a user/team or change order. |
| CUS-LEARN-06 | Customer → Booking & quoting → Customer-specific / LTL carriers. | Portal/automation preferences versus carrier-specific price limits. | Do not toggle login/automation or edit pricing. |
| LOC-LEARN-01 | Customer → Addresses → plus → inspect Create template, location types and LTL Services. | Saved site details, hours, instructions and private note. | Close without selecting new values or clicking Create. |
| CAR-LEARN-02 | Carriers → existing carrier → inspect approval, packet/authority/safety, contacts, Documents, Shipments and Payments. | Separate carrier identity, onboard state and shipment history. | Do not change approval or use Send request/upload. |
| VEN-LEARN-02 | Vendors → existing vendor → Edit vendor details / Selected vendor types / accounting settings. | Service type classification and sync preference. | Close without Update, Change types or checkbox changes. |
| VEN-LEARN-03 | Existing shipment → Add another vendor → inspect service-type choices. | Shipment assignment starts separately from creating a provider business. | Close before selecting a type/Add vendor. |

**13.7 What Phase 2 has and has not completed**

Delivered: customer/provider discovery paths, visible creation steps, identity/contact/billing/settings dictionaries, record-specific histories, carrier/profile/onboarding indicators, all nine vendor types, saved-location field/options catalog, explicit new-shipment rep rule, reuse distinctions and followable exercises.

Pending verification: actual create/update/duplicate/required-field results, role-based editing, save/autosave behavior, primary/reordered contact effects, full carrier lookup/import, vendor-tab behavior, address-card editing, historical record/document propagation, recipient visibility and real provider assignment. These are concrete test gaps, not assumed behavior. Detailed pricing, shipment assignment/editing and accounting outcomes continue in Phases 3–8; SC-05 test access is still pending.

<a id="quote-details"></a>
**14\. Quote creation, freight classification and pricing — Phase 3**

**Goal:** Understand what the customer wants moved, describe it accurately, compare available offers, set the customer price, share it and follow the selected offer into a shipment.

**Open:** Sidebar **Quote** or [Get quotes](https://app.quotefactory.com/broker/quote). To study saved work, use sidebar **Quotes** → [Quote history](https://app.quotefactory.com/broker/quote-history). Evidence: E-51–61; earlier observations E-07/11/12 and pricing settings E-24/41.

**14.1 The quote hierarchy and use cases**

```text
Customer's transport request
├── Customer / contact context
├── Equipment and service requirements
├── Pickup date + origin/destination (additional stops in sampled TL form)
└── Freight description / handling units
    ├── LTL: packaging, quantity, dimensions, total weight, class/NMFC
    └── Sampled TL: description/history search and weight
        ↓ Get quotes (submission not tested)
Quote request / results record
├── Multiple carrier/service/source offers
│   ├── Provider cost + customer price → profit / margin
│   └── Availability, service timing, visibility and booking conditions
├── Optional manual offer and reference
├── Customer visibility / sharing / email
└── Selected offer → Book → shipment (creation not executed)
    └── Existing booked example → View Shipment → BOL 1047885
```

A **quote request** describes one transport need; a **carrier offer** is one proposed service/price for it. Many offers can belong to one request. A history entry is not one row per carrier. A quote is commercial planning; pickup execution, carrier acceptance and invoice settlement are separate steps.

| Use case | Starting point | Expected learning / observed endpoint | Unverified outcome |
| --- | --- | --- | --- |
| QTE-LEARN-01 | Quote → blank LTL form | Discover fields, service menus and calculations without submission. | Required-field validation and real rate request. |
| QTE-LEARN-02 | Quote → equipment selector → Dry Van / Refrigerated | Compare mode-specific fields. | All equipment subtypes' special rules and returned TL offers. |
| QTE-LEARN-03 | Quotes → existing result → offer details | Compare service, source, cost, price and customer visibility. | Saved price/visibility edits and customer portal rendering. |
| QTE-LEARN-04 | Result → Sharing | Understand visible contacts, Not sent, Email quotes and view-only link. | Actual sends, link access and permissions. |
| QTE-LEARN-05 | Existing booked result → View Shipment | Reach the already-created shipment and compare financial figures. | New booking, dispatch, duplicate prevention and failure recovery. |

**14.2 Shared quote inputs — where values come from and what they affect**

| Field / control | Meaning and input source | Observed behavior | Confirm before cloning |
| --- | --- | --- | --- |
| Select customer | Business requesting/paying for the arranged service; select a saved customer. | Blank selector in new form. Results identify customer and a contact. | Contact selection/default, rep access, credit checks and customer-specific settings precedence. See §12. |
| Equipment | Vehicle/service category requested by staff/customer. | LTL initially selected; changing it changes the form. Complete visible menu in §14.3. | Whether each choice gets automatic rates, manual workflow or different provider support. |
| Pickup date / Open calendar | Requested collection date. | Empty date in new form. Existing past-date result says Pickup date has passed and offers Choose a new date. | Cutoffs, holidays, date/time zones, rerating and expiry policy. |
| origin / destination city/state/zip | Localities for the movement, entered/searched by user. | Two comboboxes in new form. | Supported countries, address suggestions, postal validation and saved-template selection. |
| Location type | Facility/access conditions at each end. | Business with dock/forklift default. Origin menu has the same 26 labels listed in §13.3. | Destination parity and carrier-specific mapping/automatic charges. |
| Expand / Collapse location | Stop-expansion control. | Keyboard activation changed origin label to Collapse location on a blank form; did not expose a verified full-address editor in that state. | Populated-location behavior and exact additional fields. Do not substitute the shipment editor's dictionary. |
| Pickup services / Delivery services | Accessorial requirements affecting service/rating. | Separate LTL menus, listed in §14.4. | Valid combinations, carrier fees and whether site defaults apply. |
| + add vendor | Additional service-provider branch. | Add another vendor entry visible; shipment version previously exposed nine service types (§12). | Quote-specific assignment form, costs and booking effect; not opened here. |
| + add item | Additional freight group. | Present in LTL and sampled TL forms. | Multiple-group aggregation, deletion, persistence and limits. |
| Estimated total length / ft | Space along the trailer floor; entered value and estimated suggestion are separate controls. | Numeric entry, units button and Linear Feet Visualizer; example in §14.6. | Override precedence, supported length-unit choices and load-layout constraints. |
| Get quotes | Submit request to obtain offers. | Visible action; never executed during this pass. | Required fields, persistence, provider fan-out, loading, retries and duplicate submission. |

No new-form contact picker was established in the unselected-customer state. Confirm its behavior after selecting an authorized test customer. A default displayed in a blank form is not a universal business requirement.

**14.3 Equipment options and conditional forms**

The following groups organize the exact visible labels for reading; they are not claimed to be app menu headings or backend enum groups.

| Reading group | Visible equipment labels |
| --- | --- |
| LTL | LTL |
| Van / enclosed | Dry Van; Dry Van 53; Dry Van 48; Straight Truck; Cargo Van; Dry Van or Refrigerated; Curtainside; Vented Van |
| Open deck / specialized | Flatbed; Flatbed 53; Flatbed 48; Step Deck; Flatbed or Step Deck; Double Drop; Removable Gooseneck; Conestoga; Stakebed; Step Deck Conestoga; Flatbed Hot Shot; Landoll Flatbed; Multi-Axle Heavy Haul |
| Refrigerated | Refrigerated; Refrigerated 53; Refrigerated 48; Refrigerated Straight Truck; Refrigerated Cargo Van |
| Intermodal | Intermodal; Intermodal 20; Intermodal 20 High Cube; Intermodal 40; Intermodal 40 High Cube; Intermodal 40 Refrigerated; Intermodal 53 |
| Drayage | Drayage; Drayage 20; Drayage 20 High Cube; Drayage 20 Refrigerated; Drayage 40; Drayage 40 High Cube; Drayage 40 Refrigerated |
| Bulk / dump | Dump; Bottom Dump; End Dump; Side Dump; Dry Bulk; Hopper Bottom |
| Power / driveaway | Power Only; Power Only Load Out; Power Only Tow Away; Driveaway |
| Other visible vehicle labels | 2-way Deck; 3-way Deck; 4-way Deck; Boom; Box Truck; Heavy Duty; Non-CDL; Single; Tractor-trailer; Utility; Vocational |
| Vehicle transport | Auto Transport; Open Auto Transport; Enclosed Auto Transport |
| Tank / other | Tanker; Tanker Aluminum; Tanker Intermodal; Tanker Steel; Other |

| Inspected selection | Controls that appeared | Interpretation / limits |
| --- | --- | --- |
| LTL | Protect from freezing; stop-service menus; packaging/quantity/dimensions/weight/class/NMFC/Stackable/Hazmat. | Detailed handling-unit input for rate comparison. |
| Dry Van | Partial; Tanker endorsement; Team service; + add location; freight-history/description search and weight; Common: 50.5' L. | Different freight entry from LTL. Common length is a displayed hint, not measured freight or a mandatory value. |
| Refrigerated | Same sampled TL controls plus two °F inputs separated by a dash. | Temperature-range inputs. Minimum/maximum order, validation, setpoint/continuous-operation semantics and °C support remain unverified. |

**Partial** describes a load using part of available truck capacity; exact app routing/rating needs operations confirmation. **Tanker endorsement** expresses a driver qualification requirement; **Team service** requests a multiple-driver service. Neither toggle proves a qualified driver or team has been assigned. See the industry terminology in §9 and Phase 5 for shipment-edit effects. These controls appeared even under Dry Van; do not restrict them to the Tanker equipment label in a clone without an agreed rule.

**14.4 Location services and LTL handling units**

| Service menu | Exact options observed | What the request does not prove |
| --- | --- | --- |
| Pickup | Liftgate pickup; Inside pickup; Single shipment; Sort & segregate. | That equipment/labor has been supplied or a provider supports the combination. |
| Delivery | Appointment required; Liftgate delivery; Inside delivery; Notify before delivery; Sort & segregate. | That an appointment is booked or a notification has been sent. |

A liftgate is lifting equipment for moving freight between ground and vehicle. Inside service concerns movement beyond the usual pickup/delivery point; exact distance, labor and restrictions must come from the provider's terms. Single shipment and Sort & segregate require carrier-specific definitions before implementation. Location type and service are separate inputs; do not silently infer a liftgate just from Residential.

| LTL field | Meaning / example | Observed source and effect | Remaining rule |
| --- | --- | --- | --- |
| Packaging | Type of handling unit, such as pallet or crate. | Dropdown with 27 labels below. Selecting Pallet (48x40) filled length 48 and width 40 in inches. | Other presets, accepted combinations, packaging charges and retained values after switching. |
| Quantity | Number of like units in this group. | Entering 2 in the example contributed two pallet volumes. | Integer/range/zero validation and mixed-group rules. |
| Dimensions | Length × width × height of each unit. | Three numeric inputs; in/cm menu observed. | Outer-dimension/overhang rules, conversion precision and field bounds. |
| Total weight | Combined weight for the group. | lb/kg menu; entering 1,600 lb with quantity 2 displayed total Weight 1,600 lb. | Tare/packaging inclusion policy and multi-group aggregation. |
| Freight class | Selected LTL classification value. | 18-option selector; a separate estimated-class button appeared after measurements. | Selection responsibility, estimation rules and mismatch handling. See §14.5. |
| NMFC | Commodity classification item/reference, potentially with subitem. | Free-text input labeled optional in this blank form. | Carrier-specific requiredness, accepted format, lookup/template population and licensing. |
| Stackable | Whether another compatible unit may be placed above this freight. | Checkbox initially clear. | Stacking limits, carrier interpretation, layout/rating changes and damage restrictions. |
| Hazmat | Hazardous-material flag. | Checking it in the unsaved form did not reveal additional fields in the sampled state. | Required hazardous details, documents, eligibility, provider mapping and booking validation. |
| Protect from freezing | Requested temperature-protection service. | Separate LTL checkbox initially clear. | Availability, season, charges, commodity restrictions and guarantee; it is not the refrigerated temperature-range form. |

**Packaging options:** Pallet (48x40); Pallet (48x48); Pallet (60x48); Pallet; Bag; Bale; Box; Bundle; Carpet; Carton; Case; Coil; Crate; Cylinder; Drum; Gallon; Keg; Pail; Piece; Pipe; Rack; Reel; Roll; Sack; Skid; Tote; Tube.

**14.5 Freight class and NMFC — answer to “where do these values come from?”**

**Industry meaning:** NMFC means **National Motor Freight Classification**. Its commodity item number identifies a freight classification entry; freight class is the rating category associated with applicable commodity/packaging rules. Classification considers density, handling, stowability and liability. The two fields are related, but a class such as 70 is not an NMFC item number. [NMFTA classification reference](https://nmfta.org/standards/classification/nmfc/).

**App observation:** The freight-class menu offers **50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500**. The numbers are categories, not pounds or percentages. NMFC is an optional text input in the inspected blank form. No integrated commodity-search or lookup source was established there.

**Important new observation:** With the measurement example in §14.6, the app displayed **Est: 70** while the selected Freight class input remained empty. Thus this app can show a class suggestion. The suggestion was not clicked; its algorithm, acceptance effect and applicability to a commodity are unverified. Do not implement a density-only assignment or treat the suggestion as authoritative NMFC selection.

**Practical selection flow to confirm with the pricing lead:** Identify the commodity and packaging → obtain accurate measurements → consult the applicable current NMFC entry using an authorized source → select the applicable class and enter the item/subitem where required → confirm carrier-specific exceptions. NMFTA identifies ClassIT+ as a classification lookup/calculation resource; its existence does not prove this app calls a ClassIT+ API. Licensing, API access and responsibility for corrections belong in Phase 7 and OQ-01.

The previously discussed **04821J** appears beside ArcBest in customer pricing (E-41). Phase 6 also verified it is labeled **Acct** on a generated BOL (E-88; §17.2). Do not put it in an NMFC commodity-code table. Its exact pricing/tariff/account linkage still needs the account owner.

<a id="density-class-scale"></a>
**14.5a NMFTA density-to-class reference**

**Source:** [NMFTA NMFC Procedures — March 26, 2026, Appendix A.1.a, PDF page 8](https://nmfta.org/wp-content/uploads/2026/03/FCDC-Procedures-3.9.26-Final.pdf#page=8); [local PDF](FCDC-Procedures-3.9.26-Final.pdf). Checked October 26 (E-113). The cover date differs from the filename's date.

**Applicability:** This full density scale concerns commodities without unusual/significant handling, stowability or liability characteristics. Confirm the applicable NMFC commodity/packaging provision before assigning class. Other characteristics can change classification; density alone does not identify an NMFC item.

| Density (pcf = lb/ft³) | Freight class |
| --- | --- |
| Below 1 | 400 |
| 1 ≤ density < 2 | 300 |
| 2 ≤ density < 4 | 250 |
| 4 ≤ density < 6 | 175 |
| 6 ≤ density < 8 | 125 |
| 8 ≤ density < 10 | 100 |
| 10 ≤ density < 12 | 92.5 |
| 12 ≤ density < 15 | 85 |
| 15 ≤ density < 22.5 | 70 |
| 22.5 ≤ density < 30 | 65 |
| 30 ≤ density < 35 | 60 |
| 35 ≤ density < 50 | 55 |
| 50 or above | 50 |

**Use:** Calculate packaged volume and density (§14.6), retain precision, then match the interval. Lower bounds are inclusive; upper bounds exclusive. Example: **23.91 pcf → class 65** under this scale; exactly **22.5 → 65**, not 70. Do not round across boundaries before lookup. Missing/zero volume cannot produce a valid density.

**App distinction:** The dropdown includes classes absent from this scale. This reference does not establish Quote Factory's Est-class algorithm, automatically select class or waive commodity review.

**14.6 Volume, density and linear feet — worked app example**

In an **unsaved** LTL form, selected Pallet (48x40), quantity **2**, height **48 in**, total weight **1,600 lb**. No customer, route, class or NMFC was selected and Get quotes was not clicked.

| Calculation / output | Arithmetic | Observed app display |
| --- | --- | --- |
| Group volume | 2 × 48 × 40 × 48 ÷ 1,728 = 106.666… cubic feet | 106.7 cf |
| Density | 1,600 ÷ 106.666… = 15 pounds per cubic foot | 15.00 pcf |
| Total weight | Input already represents the group total; do not multiply 1,600 by 2 again. | Weight 1,600 lb |
| Pallet count | Two pallet units. | pallets 2 |
| Floor-space estimate | App visualizer placed the two 48×40 footprints side by side. | Estimated total length 4 ft; Est: 4 beside entry. |
| Class suggestion | App-specific estimated category; algorithm not established. | Est: 70; Freight class still blank. |

**cf** is cubic feet; **pcf** is pounds per cubic foot; **linear feet** measure occupied floor length. Linear feet cannot be calculated by simply adding pallet lengths when units fit side by side. The 4 ft observation covers this one layout; trailer width, rotation, stacking, gaps, oversize items and manual override behavior remain OQ-02. The visualizer showed numbered floor positions and two footprints; opening it is not a load-plan guarantee.

For mixed groups, the mathematical density is **sum of group weights ÷ sum of group volumes**; do not average group densities. The app's multi-group and kg/cm conversion behavior has not yet been tested. Displaying one decimal for cf and two for pcf in this example does not prove internal precision or every screen's rounding policy.

**14.7 Quote history, results and carrier/service comparisons**

History displays a search box, date, origin/destination, customer, weight, equipment and booked/expired icons. Booked examples also display a BOL number. Clicking a result opens its quote-results record. Search matching, pagination, alternate roles and date interpretation still need tests.

**Open existing examples:** [Booked LTL request](https://app.quotefactory.com/broker/quote-results/6ada31e36fac98ba0aa91bcb) or [past-pickup-date LTL request](https://app.quotefactory.com/broker/quote-results/6ada338eca7099bc41a73261). These are existing operational records; explore view controls only.

| Result control / data | Observed meaning and behavior | Limit / question |
| --- | --- | --- |
| Customer/contact + request summary | Customer link, named contact, pickup date, lane, weight and LTL context. | Origin of selected contact and exact summary edit rules. |
| Carrier / Delivery / Price | Comparison controls above offers. | Exact sort direction, tie handling and persistence were not tested. |
| All / Standard / Guaranteed / Volume | Service-category filters with counts. Booked sample showed 37 / 26 / 11 / 0. Guaranteed click changed visible offers to guaranteed services. | Counts are sample-specific. Volume eligibility, minimum size and pricing are unknown; zero is not proof of unsupported service. |
| Carrier/service/transit | Provider name/logo and service labels such as Standard, STD, Guaranteed by AM (Noon), Guaranteed by 5 or Guaranteed by 12. | Raw labels vary by source. Business-day calculations, service commitments and exclusions require provider terms. |
| Xtended Network quote | Some offers explicitly carry this source label; other offers for the same carrier do not. | Network operator, contract/account, credit mechanics and direct/network fallback remain unverified. Do not call every offer a direct carrier account rate. |
| Open stacked quotes | Grouped-offer entry appears on cards with multiple alternatives. | Expand/collapse contents and grouping algorithm not tested; not related to Stackable freight. |
| Cost / Margin / Profit / quote price | Provider amount, gross margin percentage, price-minus-cost and customer price. | Locked/available controls differ by sampled record; see §14.8. |
| View quote details | Opens an individual offer dialog; existing shipment carrier/service cards expose a related dialog. | See [shipment dialog field dictionary and expandable Cost](#shipment-quote-details); other carrier/manual/state variants remain open. |
| Hide quote / Visible to customer | Offer visibility controls. | Never activated; exact saved state, public exposure and audit behavior unknown. |
| + Ref | Reference-entry control. | Format, persistence, document placement and uniqueness not tested. |
| Request context menu | Booked sample exposed Duplicate quote request; footer also links Duplicate quote. | Not executed; copied fields, new dates, rates and duplicate prevention unknown. |
| Choose a new date | Past-date message links to that request's /edit route. | No edit/save/rerate executed. A past pickup date and provider quote expiration are distinct checks. |

The results footer says pickup dates are not guaranteed and transit/delivery dates are estimated. It says unspecified guarantees are by **5pm**. Read the actual service label and provider terms before promising AM/noon service. A guarantee label is not evidence of pickup completion or a claim/refund workflow. The displayed liability notice is a reminder to inspect carrier terms, not a validated insurance quote or blanket coverage rule.

**Individual offer dialog observed:** Carrier/service, transit days, carrier MC/location, LTL, estimated delivery date, provider Quote reference, Third Party Prepaid, phone, Visible to customer, Cost, editable Margin/Profit/Price, Book and Save. “Prepaid” describes billing responsibility; see §9. No offer edit, Save or Book was executed. The selected dialog was an Xtended Network ArcBest offer; do not generalize all fields across providers.

**14.8 Pricing — inputs → calculation → guardrails → output**

| Layer | Where to inspect | Established evidence | Not yet established |
| --- | --- | --- | --- |
| Company defaults/limits | Settings → Customers | Default LTL/TL margins and limit controls (E-24). | Enforcement and precedence. |
| Customer / carrier settings | Customer → Booking & quoting → LTL carriers | Per-carrier margin/profit fields, Volume multiplier and separate Xtended Network row (E-41). | Meaning of multiplier, inheritance and whether changes affect old requests. |
| All offers on a request | Past-date result → Sets the margin for all quotes | Visible editable-looking 17% control. | Apply/save timing and which offers change. |
| Individual offer | Result row or offer detail | Price, margin and profit editable-looking in past-date sample; provider cost disabled. Booked sample had disabled cost/margin/profit controls. | Role/status lock policy, validation, rounding and price bounds. |
| Manual quote | + Add manual quote | Target cost and Price line items; calculated Margin, Cost+ and Profit area. | Save behavior, later provider assignment and actual bill reconciliation. |

**Learning arithmetic:** `profit = price − cost`; `margin % = profit ÷ price × 100`; `Cost+ / markup % = profit ÷ cost × 100`; `price for target margin = cost ÷ (1 − margin as a fraction)`. At cost $750 and 25% gross margin, customer price is $1,000 and profit is $250; Cost+ is 33.333…%, not 25%.

**Observed booked example:** Cost **$867.35**, customer price **$1,045.00**, profit **$177.65**, margin input **17**. Displayed rounded amounts satisfy price minus cost. Their ratio is approximately 16.999…%; that tiny difference is consistent with cent rounding, but the precise rounding order/storage policy is not established. The corresponding shipment shows the same three amounts (E-61).

Profit here is gross difference, not net profit after overhead/taxes or proof that either side has paid. Target cost in a manual quote can precede an actual carrier bill. Do not infer that the sampled 17% replaces the global/customer defaults for every request. No live pricing value was changed.

**14.9 Manual quote entry**

**Open:** Past-date example → **+ Add manual quote** → inspect → **Close modal**. This provides a manually entered commercial offer when staff have pricing to enter; the exact eligibility and sourcing policy requires the team lead.

| Field / control | Observed form / purpose | Question for operations/pricing |
| --- | --- | --- |
| Transit days / Delivery date | Sample default 3 days and a resulting Sunday date; weekend warning displayed. | Calendar versus business days, coupling, guarantees and allowed dates. |
| Equipment / Tanker endorsement | Equipment selector initially empty plus endorsement checkbox. | Mandatory equipment and whether other services appear after selection. |
| Lane / View lane history details | Prompts for locations and equipment for lane data. | History source, access and how costs are suggested. |
| Line items: Description / Target cost / Price | First description Freight, cost/price empty. | Required line values, currencies, negatives, taxes and charge categories. |
| Edit line-item note | Note control alongside description. | Visibility and printed placement; not expanded. |
| Open cost calculator | Menu shows Cost per mile and a lane mileage value. | Mileage provider, route basis, multiplication, rounding and refresh. |
| + add item | Additional financial line item. | Totals, removal and provider distribution. This is separate from adding freight groups. |
| Margin / Cost+ / Profit | Summary initially blank/dash with no amounts entered. | Recalculation and guardrails. |
| Exp: | Date picker initially showed the original past pickup date in this sample. | Exact expiry time/timezone, relationship to pickup date and stale-quote behavior. |
| Save quote | Initially disabled. | Required fields, creation result, customer visibility and subsequent Book flow. |

No carrier selection field was established in this initial manual dialog. Do not invent a mandatory carrier field or assume a manual offer assigns/dispatches a carrier.

**14.10 Sharing, booking and the shipment handoff**

**Sharing observation:** The booked request says **Customer can see these quotes**. Sharing opens **Visible to these 10 contacts**, with **Not sent** next to the sampled contacts. Controls include **Stop sharing**, **+ Add contact**, **Email quotes** and **Copy link** beneath **Need a view-only link? (can't book quotes)**. Visibility and email delivery therefore have separate displayed states. The contact count is specific to this request; actual names/emails are omitted here.

Do not use Stop sharing, add recipients or Email quotes as an exercise. Link generation/copy was not executed. Access expiry, authentication, revocation, exposed financial fields, email delivery status and customer booking permissions need separate-role/test-recipient validation. Customer approval/tender and broker booking remain distinct business questions (OQ-10); this broker view alone does not establish approval policy.

**Booking observations:** Past-date results show **Pickup date has passed** and disabled Book buttons on rows with valid prices. Some network offers additionally say **Insufficient XN credit to book this quote**. An individual offer dialog from this same request exposed a Book button without a disabled marker. This discrepancy is recorded, not an invitation to bypass the row state. No button was activated, and no universal cause for disabled booking is inferred.

**Verified navigation through existing work:** Open the booked request → read **Shipment booked from these quotes**, named booking actor/date → click **View Shipment** → [Shipment BOL 1047885](https://app.quotefactory.com/broker/shipment/6ada321dbf56ad5e17c4f8a4). The shipment displays Quoted/Booked/Scheduled/In transit history and the matching $867.35 target cost, $1,045.00 price and $177.65 profit. This confirms an existing request-to-shipment link, not the creation sequence or automatic external dispatch behavior.

For a future test booking, operations must confirm selected offer validity, pickup date, customer/contact and credit, all addresses/requirements, current class/NMFC, provider/service/source, approved price, visibility, documents and dispatch prerequisites. Verify resulting shipment, carrier acceptance, references/documents, queue changes and duplicate protection in the designated test environment. A separate TL example remains **Booked + Needs a carrier** (§10), so booking cannot universally mean carrier coverage.

**14.11 Failures and remaining tests**

The booked result returned offers while also showing **6 carriers didn't return results**. Opening it revealed invalid-account/authentication, blocked contract access, unsupported accessorial/guarantee combination, no rate, timeout/504 and rate-type-access errors. These are historical responses for this request, not a fresh connectivity health check. Account IDs, provider endpoints and support emails are intentionally omitted.

| Scenario | Evidence / current state | Required follow-up and proposed owner |
| --- | --- | --- |
| Partial carrier failure | Observed offers alongside failure list. | Integration lead: map per-provider errors, retries and user-visible recovery without discarding valid offers. |
| No rates from any provider | Not observed/tested. | Integration lead: approved sandbox inputs; establish empty-state/manual-offer path. |
| Missing/invalid input | New form inspected without submission. | Pricing/operations: requiredness, negative/zero/oversize values, dates and class/NMFC validation. |
| Past date / expired quote | History expired icon and past-date message observed. | Pricing lead: distinguish pickup cutoff, carrier quote expiry and manual Exp date; test rerating. |
| Credit / permission restrictions | Insufficient XN credit message observed; separate customer credit form exists. | Accounting/admin: identify separate credit systems, limits and override authority. |
| Save/booking lock discrepancy | Row Book disabled, detail Book not marked disabled in same sampled request. | Operations/product owner: expected consistent rule across entry points and roles. |
| Multiple units / conversions | One two-pallet example verified. | Pricing/operations: mixed items, cm/kg conversion, stacking, layout overrides and rounding. |
| Duplicate requests/bookings | Duplicate controls observed; no execution. | Product/integration lead: copied data, provider refresh, idempotency and duplicate booking handling. |
| Sharing / approval / dispatch | Visible forms and existing shipment link only. | Operations/admin: test separate customer login, recipient visibility, sending, approval and external dispatch. |

**14.12 Explore Phase 3 yourself and what comes next**

1. Open [Get quotes](https://app.quotefactory.com/broker/quote). Compare LTL, Dry Van and Refrigerated without submitting. Identify the controls that change.
2. In a fresh unsaved LTL form, choose Pallet (48x40), quantity 2, height 48 in and total weight 1,600 lb. Compare 106.7 cf, 15.00 pcf, Est: 70 and the visualizer's 4 ft estimate. Leave class unselected and do not click Get quotes. Navigate away to discard the example.
3. Open the [booked request](https://app.quotefactory.com/broker/quote-results/6ada31e36fac98ba0aa91bcb), click Guaranteed, compare a plain carrier label with Xtended Network and open the carrier-failure list. Close it without changing any offer.
4. Open Sharing, read visibility versus Not sent and the view-only-link restriction, then Close modal. Do not change sharing, copy/activate a link or send mail.
5. Click View Shipment and compare the three financial figures. Return to Quotes and inspect the past-date request/manual quote dialog, closing before Save or Book.

**Delivered:** Quote hierarchy, shared/conditional field dictionaries, full visible equipment and packaging catalogs, location/service menus, classification/suggestion distinctions, a verified measurement example, results/offer/manual/sharing actions, price arithmetic, partial failures, existing shipment handoff and exercises.

**Still pending:** Submitted validation, provider requests, all equipment variants, selected-customer/contact behavior, class-source responsibility, global/customer/offer precedence, layout/conversion edge cases, save/visibility/email effects, customer approval, new booking/dispatch and alternate roles. These remain owned open questions; no complete quote workflow or clone scope is signed off.

**Continue to Phase 4 in section 15:** Shipment lists, coverage and shipment detail screens, including queues, leads, carrier coverage and the purposes of Confirmation, Rate con, Bill, Invoice, Documents and map controls. Edit/status-transition rules follow in Phase 5.

<a id="shipment-operations"></a>
**15\. Shipment lists, coverage and shipment detail screens — Phase 4**

**Goal:** Find the day's work, identify the shipment's current operational needs, distinguish a carrier lead from an assigned carrier, and understand every inspected section and related document button.

**Open:** Sidebar **Shipments** → [shipment list](https://app.quotefactory.com/broker/shipments). Evidence E-62–75 records this phase; earlier examples E-13–20/27/29/49/61 remain useful. Live forms were viewed without submitting bookings, assignments, charges, notes, messages, documents or status changes. No payment or commission action was performed.

**15.1 Operational hierarchy and daily use cases**

```text
Shipment list / focused work queue
├── Choose Active or All where available
├── Filter / sort → open one BOL
└── Shipment detail
    ├── Header, reps and status progression
    ├── Customer relationship → customer record / Confirmation / Invoice
    ├── Transportation provider
    │   ├── Uncovered: Cover freight → candidates → coverage form
    │   └── Assigned: carrier detail / Rate con / Bill / driver information
    ├── Other service vendors → provider-specific costs/documents/bills
    ├── Cost & price → individual financial lines
    ├── Ordered stops → contacts / references / hours / appointments / events
    ├── Freight groups → counts / dimensions / weight / floor-space summary
    ├── Map / tracking information
    └── Notes / Timeline / shipment action menu
```

| Operational question | Open / click path | What to inspect | Stopping point for learning |
| --- | --- | --- | --- |
| Which loads need a carrier? | Sidebar Cover → row → Cover freight | Target cost, candidate carriers, quoted costs, eligibility warnings and packet branch. | Before Save for later, posting, carrier removal or Cover & send/request. |
| What needs pickup follow-up? | Confirm pickups → row | Assigned carrier, pickup date, appointment and events. | Before Picked up, rescheduling or time/status changes. |
| What needs delivery follow-up? | Confirm deliveries → row | In-transit state, destination, ETA, event history and delivery evidence. | Before Delivered or entering a tracking update. |
| What is this shipment worth? | Row → financial summary → Expand itemized view | Customer price versus provider target cost and gross profit. | Do not edit financial inputs, even outside Edit shipment. |
| Which document belongs to whom? | Customer Confirmation / carrier Rate con / Bill / Invoice / Documents | Party, document purpose and related obligation. | View only; do not regenerate, remove, upload or send. |
| What happened previously? | Shipment → Timeline | Dated lifecycle, document, coverage and tracking entries. | Do not treat event names as proven automatic triggers. |

**15.2 Shipment list and queue dictionary**

| Page | Open this URL / navigation | Observed page / rows | Meaning and limit |
| --- | --- | --- | --- |
| Shipments | [Shipments](https://app.quotefactory.com/broker/shipments) | Active / All tabs; Create new shipment, filter button, CSV and sort icons. Active initially selected; All was opened. | General record list. Exact Active exclusion rules and full history/loading/pagination behavior remain unverified. |
| Coverage | [Shipments to cover](https://app.quotefactory.com/broker/shipments/covering/all) | Booked rows, equipment, leads and sometimes a cost amount. BOL 1047758 displayed 19 leads in this pass. | Focused coverage work; a lead count is not an assigned-carrier count. |
| Pickup follow-up | [Shipments to confirm pickups](https://app.quotefactory.com/broker/shipments/scheduled/all) | Scheduled examples, including BOL 1047665 with VS Transit and a carrier amount. LTL and Auto Transport examples appeared. | Scheduled work does not prove pickup occurred. Actual queue cutoff/overdue/inclusion rules need verification. |
| Delivery follow-up | [Shipments to deliver](https://app.quotefactory.com/broker/shipments/delivering/all) | In transit examples, including BOL 1046693. | Delivery follow-up list; no proof of final delivery or POD. |
| Dispatch | [Shipments to dispatch](https://app.quotefactory.com/broker/shipments/dispatching/all) | Direct navigation succeeded; No active shipments. | Empty state observed. Earlier zero-count dashboard shortcut did not navigate; populated dispatch actions remain uninspected. |

Counters, dates and rows can change during exploration. Do not add queue counters together as a shipment total: focused queues and general lists can contain the same record. Queue pages did not expose the complete Active/All/filter toolbar seen on the general list. Do not assume identical controls across pages.

**How to read a row:** Shipment/BOL number and status → pickup date/time → customer and customer price → origin company/city/state → lane distance → destination company/city/state and delivery date/appointment → equipment/weight → carrier/cost or leads. Narrow layouts truncate names; open the row to read the full record.

**Verified comparison:** Filtering All for **1046693** found one row with In transit, customer price **$4,900**, Pathak Express and **$4,200**. Those amounts match the detail screen. The **P** marker on sampled Dry Van rows was explicitly labeled **partial is allowed**. A blue status marker and a small red route-like icon were visible on the reference row; no complete color/icon legend was established. Do not infer an exception's meaning from color alone.

**Date/time discrepancy to preserve:** The reference row shows **Aug 3, 11:00pm**, while the pickup detail shows **Aug 3, 2:00pm EDT** and the customer confirmation preview shows an **11:00 AM–3:00 PM** pickup window. These are different displayed values/contexts. Their source, timezone conversion and planned-versus-actual meaning require operations verification (OQ-25); do not silently normalize them or claim a known cause.

**15.3 Filters, sorting and export**

**Try:** Shipments → **All** → **View shipment filters** → enter `1046693` in **search for...** → **See shipments**. The inspected result contained one reference shipment and the filter showed **See 1 shipment**. Matching rules beyond this known BOL were not tested. Filters are view controls, not edits to a shipment.

| Filter group | Visible choices / inputs | Confirm before implementing |
| --- | --- | --- |
| Status | Requested; Booked; Scheduled; In transit; Delivered; Canceled. | Multiple selection semantics, empty selection and inclusion rules. |
| Equipment | LTL; Dry Van; Flatbed; Refrigerated; Intermodal; Drayage; Dump; Dry Bulk; Power Only; Driveaway; Auto Transport; Tanker; Select truckload shortcut. | Family/subtype mapping; Other and specialty equipment handling; shortcut behavior. This is a shorter list than quote equipment. |
| Booked date | Date range; Today, Yesterday, This week, Last week, This month, Last month, This year, Last year. | Inclusive boundaries and timezone. |
| Pickup / Delivery date | Separate ranges; Today, Tomorrow, Yesterday, This week, Next week, Last week, This month, Next month, Last month, This year, Last year. | Planned date versus event date; time zones and overnight loads. |
| Origin address / Destination | Separate location inputs. | Exact/geographic matching and radius support. |
| Carrier / Customer | Separate saved-party selectors. | Assigned carrier versus candidate; multi-provider matching. |
| Rep / Booked by / Covered by | Separate team-or-user selectors. | Different responsibilities; rep is not automatically the person who booked or covered. |

The toolbar sort menu exposes **Created date new to old**, **Pickup date new to old**, and **Pickup date old to new**. Menu labels were inspected without changing the selected sort. The CSV icon opens **Export these shipments to a .CSV file** and an **Export** button. The final Export button was not clicked; columns, limits, filtering scope, file contents and download behavior remain unverified. No pagination contract was established from the loaded examples.

**October 31 live follow-up:** The filter panel was opened with all controls untouched. It also exposed a search input; separate Status, Equipment, Booked date, Pickup date, Delivery date, Origin address, Destination, Carrier, Customer, Rep, Booked by and Covered by filters; and a button previewing the matching shipment count. Opening the panel triggered distinct carrier and customer lookup reads. The count is account-specific and omitted from the evidence files. The count-preview button was clicked without changing a filter; the modal closed, and no new request appeared in that capture. Do not infer whether it applies defaults or merely dismisses the panel. The carrier distinct GET was observed but its response was not present in the drained events; the customer distinct lookup returned 200 after a 204 preflight.

The Active tab showed Booked, Scheduled, In transit and Delivered groups in this session; All used a different route and included canceled records in an earlier sample. Active switched to `/broker/shipments?sort=pickupOn:ASC`; All switched to `/broker/shipments/all?sort=pickupOn:DESC`. Both rendered rows after API reads completed. These are session observations, not universal status-inclusion rules. One Active row showed **No carrier** while still in the Booked group, confirming that Booked alone does not mean covered. A read-only Active row opened the detail page at `/broker/shipment/:id`; see §15.5. The list/filter capture is summarized in [the sanitized network evidence](network/quote-factory-network.json).

**15.4 Direct shipment creation versus quote conversion**

**Open:** Plus beside Shipments / **Create new shipment** → [Book shipment](https://app.quotefactory.com/broker/shipment/new). This is a direct form; it does not require first opening carrier quote results. Compare the existing quote conversion in §14.10.

| Direct-form area | Observed fields/defaults | Source / intended role | Untested result |
| --- | --- | --- | --- |
| Header / customer | Custom BOL blank; customer selector blank. | Staff/reference number and saved customer. | Generated numbering, uniqueness and required customer/contact. |
| Equipment / providers | Dry Van; Partial; Tanker endorsement; Team service; + add vendor / carrier. | Requested transport and associated providers. | Required assignment and exact defaults by customer/mode. |
| Locations | Pickup and Delivery; reorder/add location; editable distance in mi. | Ordered visits and routing context. | Distance calculation, stop ordering and required addresses. |
| Stop inputs | Company, type, address/Address 2/locality, contact name/phone/email, Share BOL, instructions, hours, date, appointment, references and private note. | Movement-specific site requirements; possible template reuse (§13). | Validation, actual recipient selection and template effects. |
| Stop defaults | Business with dock/forklift; 8 AM–5 PM; pickup Share BOL checked, delivery unchecked in sampled blank form. | Visible initial values. | No sending or universal default policy inferred. |
| Freight | Description, Contains/unit, Packaging, Quantity, L/W/H in, Total weight lb, Stackable/Hazmat, + add more handling units, length/visualizer and Total value. | Actual goods and physical handling description. | Meaning of Contains versus handling-unit quantity, requiredness and item validation. |
| Cost & price | Lane history, Freight financial line, Target cost/Price, add line, Margin/Cost+/Profit. | Staff commercial entry; no automatic rate was obtained here. | Price guardrails and financial persistence. |
| Final controls | Hide contacts from carrier; Book shipment; Save for later. | Visibility preference, booking submission and a separate deferred-work action. | Required fields, saved state, documents, recipients, queue placement and duplicate handling. |

No field was entered and neither final action was clicked. Requiredness cannot be inferred from an enabled-looking button or the title Book shipment. **Save for later** is a separate exposed action; its exact draft/requested state remains unknown. Detailed input/edit rules continue in Phase 5.

**15.5 Shipment detail — read from top to bottom**

**Reference:** [BOL 1046693 — assigned Dry Van, In transit](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4). Compare [BOL 1047758 — uncovered Auto Transport](https://app.quotefactory.com/broker/shipment/6accf55afcc298c7a4311d79) and [BOL 1047829 — uncovered Dry Van with pallet groups](https://app.quotefactory.com/broker/shipment/6ad62c8868813f1637085014). Record-specific URLs can stop working; fall back to Shipments → filter by BOL.

| Region / control | Meaning / inspected content | How to explore and what remains open |
| --- | --- | --- |
| BOL header | Shipment's displayed operational reference. URL also has a separate internal record identifier. | Do not treat the internal URL ID, custom BOL, provider quote reference and PRO as the same identifier. |
| Documents / Edit shipment / action menu | File hub, full editor and shipment-level actions. | Navigation/action dictionary in §15.11. |
| Reps | Staff assigned to this shipment. | Manage reps opened Reps on BOL 1046693, + add user, Paid/User/Commission/Payout and a mark-commission-paid checkbox. No values changed. Shipment assignment is separate from customer defaults that apply only to new shipments (§12). |
| Status progression | Reference shows Booked, Scheduled and In transit dates, then Deliver. Uncovered example shows Booked followed by Cover/Pick up/Deliver prompts. | A future action label is not a completed state. Actual transition/rollback/role rules are Phase 5 tests. |
| Carrier area | Pathak Express, Dry Van, dispatch contact, Rate con and Bill on assigned example. LTL XPO example instead exposes a service/quote card and Auto dispatched text. | Carrier profile/coverage is described in §15.6; [LTL shipment quote dialog](#shipment-quote-details) has its own field/cost/navigation dictionary. |
| Uncovered area | Equipment, target amount and Cover freight link; Needs a carrier near stops. | Use coverage workspace, not a master-record Add carrier form. No assignment implied by Booked. |
| Customer area | Customer link/name, selected contact, + invoice reference and Confirmation; Invoice on the reference. | Customer record versus financial/document actions remain distinct. Invoice was absent in sampled uncovered detail, but no general visibility rule is established. |
| + add vendor | Additional provider/service line. | Nine-type chooser observed in §12; creating a vendor business and assigning it to a shipment are different flows. Multi-provider/removal/rebill effects untested. |
| Financial area | Target cost, Price, gross Profit; Expand itemized view. | Expanded view contains editable inputs; viewing shipment detail is not an assurance that all controls are read-only. See §15.8. |
| Locations | Distance and estimated duration; numbered stops and provider/driver/tracking context. | Distinguish facility hours, appointment, ETA and recorded arrival/departure (§15.9). |
| Freight / summary | Description, grouped pallets/units, dimensions, weight and length; some examples also show cf/pcf/visualizer. | Different data produces different summaries. See §15.10. |
| Map | Rendered map with Mapbox/OpenStreetMap attribution in inspected examples. Off route on the reference. | Display provider is not proof of geocoding/routing/live-tracking provider or an active driver feed. No API key was accessed. |
| Notes / Timeline | + note entry, displayed authored notes and expandable event history. On October 31, expanding Timeline showed at least Created, Booked and Updated event labels without triggering a new network request in that bounded capture. | Audience, completeness, ordering, save/edit/delete and notification behavior unverified. No note was written. The expanded list may use events already read on page load. |

**October 31 page/dependency follow-up:** One detail page exposed a Reps manager, lifecycle progression, provider card and Cover link, customer card and Confirmation link, add-provider control, target cost/price/profit summary, location distance/duration, stop-level appointment and tracking controls, item summary, estimated-date notice, map and Timeline. Controls were catalogued without activation. A sample shipment can show **No carrier** while status is Booked, and the page explicitly says pickup, transit and delivery dates are estimated. One Documents index showed Rate Confirmation, POD, Bill and Misc groups with **Add unknown to shipment**; this wording does not reveal the valid document catalogue. Opening detail triggered reads for the shipment, contacts, customer/credit use, notes, events, shares, terms, quote config, account settings and historical dispatches. Opening its Documents index triggered shipment/document reads and rendered existing document previews. All route patterns/statuses and provider-origin observations are in the network JSON; no bodies, document bytes, record values or signed URLs are stored. Filestack and the Quote Factory S3 document host served preview assets. The assets prove browser delivery paths, not upload, signature, sharing or storage lifecycle rules. No document or shipment action was executed.

<a id="shipment-quote-details"></a>
**15.5a LTL carrier quote details on an existing shipment**

**What this is:** A dialog for the carrier offer linked to the shipment. It connects the booked service, carrier quote reference and cost/customer-price calculation. It is different from the carrier's master profile, a carrier bill, the customer Confirmation PDF and the complete quote-results comparison page. Added after the user's October 26 review; the earlier offer-dialog overview did not describe this shipment entry point or expanded cost lines in sufficient detail (E-111–112).

**Open this example:** [Shipment BOL 1047912](https://app.quotefactory.com/broker/shipment/6adf5b1b243090157452c81b) → click the **XPO / Standard carrier-service card** (accessible name **View quote details**). Click **Cost** or its chevron to expand the charge lines. Close modal returns to the shipment. This exact path was replayed without updating records.

| Field / control | What you see in this example | How to understand it / what is not established |
| --- | --- | --- |
| Carrier logo/name | XPO | The provider attached to this offer; distinct from the customer or pickup/delivery business. |
| Service | Standard | The selected service label. Another offer may say Guaranteed or use provider-specific wording. Standard alone is not a delivery guarantee. |
| Transit | 2 days | Displayed service transit estimate; calendar/business-day calculation, cutoffs and exclusions need provider terms. |
| MC number and location | MC-165377; Ann Arbor, MI | Carrier identity context, not the shipment origin or destination. Current authority/eligibility is not verified by displaying an MC number. |
| Mode | LTL | Less-than-truckload offer context; not the carrier's entire supported-service catalog. |
| Est. delivery | Wed, Oct 28 | Estimated arrival date for this quote, separate from a scheduled appointment or recorded delivery. |
| Quote reference | Quote 10000465501301 | Provider quote reference shown for this offer. It differs from broker BOL1047912, internal request/URL ID, pickup confirmation and PRO. |
| Blanket (identifier) | Blanket (597961807) | Rate/account context displayed beside the quote reference. Exact contract/tariff/account meaning must be confirmed with the pricing/account owner; the modal does not explain it. Do not call this an NMFC code or proof of insurance. E-88 separately established an Acct label for a different carrier identifier on a BOL. |
| Third Party Prepaid | Billing label | Identifies billing context; does not show that the customer or carrier has already been paid. Exact bill-to arrangement and terms require accounting confirmation (§9). |
| Phone | Clickable carrier phone link | Contact shortcut (`tel:`), not a call placed by opening the dialog. No call was made. |
| Cost / chevron | $994.58; expandable | Carrier-offer cost summary, with returned component labels/amounts revealed on expansion. It is not proof of an uploaded/approved carrier bill or final settled cost. |
| Margin % | 17%, disabled input | Gross margin percentage for this displayed price/cost pair; percentage of customer price, not a 17% markup on carrier cost. |
| Profit | $203.71, disabled input | Displayed gross spread between Price and Cost; not proof of received cash, net company profit or paid commission. |
| Price | $1,198.29, disabled input | Customer selling price in this dialog; separate from Cost and from invoice payment status. |
| View quote results | Link to the original request's comparison page | Click opens [this quote-results record](https://app.quotefactory.com/broker/quote-results/6adf5a5a0ecd35f5fef15adb), showing the booked banner, View Shipment and alternative offers. Viewing alternatives does not replace the booked carrier or rebook the shipment. |

**Expand Cost — inspect all returned components.** The XPO dialog was initially collapsed. Clicking Cost revealed Item Charge **$1,206.28**, Fuel Surcharge **$360.08**, Discount **−$571.78**. The displayed total reconciles as:

```text
Carrier cost = 1,206.28 + 360.08 − 571.78 = $994.58
Customer price − carrier cost = 1,198.29 − 994.58 = $203.71 gross profit
Gross margin = 203.71 ÷ 1,198.29 × 100 ≈ 17.0001%, displayed as 17%
```

Item Charge is the line labeled as the item/freight charge; Fuel Surcharge is a separate fuel-related cost line; Discount is a negative adjustment in this returned breakdown. These are carrier-offer components, not the broker's profit. Do not assume a universal fuel percentage, discount formula, tax treatment or that every carrier returns the same lines. Additional services/accessorials may require different lines and provider rules; those variants were not established by this one dialog. Use signed component amounts when summing; do not subtract a negative discount twice. Displayed rounded values can differ slightly from unrounded pricing math.

**Your AAA Cooper screenshot is another variant (user-supplied evidence, not independently opened):** Standard /3 days, AAA Cooper Transportation / MC-55889 / Dothan, AL, LTL, Est. Thu Oct29, Quote0280784629, Blanket identifier, Third Party Prepaid, phone and View quote results. Expanded Cost shows **Item Charge $114.84 + Fuel Surcharge $62.82 = Cost $177.66**. Profit **$220** plus Cost gives Price **$397.66**; **220 ÷ 397.66 ×100 ≈55.324%**, matching its Margin. No Discount line is visible in that screenshot; do not assume a hidden discount or identical components to XPO. Its exact shipment URL, click behavior and field disabled states were not supplied/verified.

**State and permission difference:** In the live XPO shipment dialog, Margin, Profit and Price were disabled and no Save/Book control was shown. The earlier individual-offer dialog on a different quote-results record exposed editable pricing and Save/Book (§14.7). This establishes two observed variants, not a universal explanation for the lock. Status, role, source and booking rules must be verified before implementing editability. The shipment also displays **Auto dispatched** outside this dialog; that label alone does not establish the trigger, external acknowledgment or all automatic-dispatch rules.

**Try it yourself:** Open the shipment → XPO/Standard → read identity/service/reference → click Cost → reconcile the signed lines and Price−Cost → click View quote results → compare the booked banner and service alternatives → use View Shipment to return. Do not edit pricing, duplicate, book or change carriers as part of this exercise. **Follow-up owner:** Pricing/integration lead confirms Blanket/account mapping, component sources, rounding, service/date rules and all provider variants; administrator confirms view/edit rights. Existing validation blockers remain unchanged.

**15.6 Assigned carrier versus coverage candidates**

The reference carrier dialog shows carrier identity, USDOT/MC, HQ, **Packet not requested**, **Send request**, **FMCSA Authorized**, safety/insurance information, vehicle/driver counts, **View carrier**, and **Remove carrier**. These are UI claims about the saved carrier/relationship. No independent authority or insurance verification was performed, and no packet was requested.

**Important distinction:** This assigned carrier's **rate confirmation is Confirmed**, while its master-record packet status says **Packet not requested**. Packet approval, internal carrier approval, operating authority, coverage and rate confirmation are distinct indicators. The sample does not establish which checks should be mandatory for a new assignment.

**Coverage click path:** Cover → BOL 1047758 → **Cover freight (Auto Transport)** → [coverage workspace](https://app.quotefactory.com/broker/shipment/6accf55afcc298c7a4311d79/cover/6accf4a99d380197beff74fa).

| Workspace element | Observed content / meaning | Limit |
| --- | --- | --- |
| Cover load / equipment / Target cost | Auto Transport and $300 target for this shipment. | Target is a budget/planning figure, not a received carrier bill. |
| Lane / View lane history details | After loading, History $357. History dialog showed Radius 100 mi, History 6 months, equipment and Average cost for 353 mi $357 / $1.01 per mi. | Window/radius/samples and cost methodology require confirmation. Initial loading briefly said new lane; use settled data rather than a transient message. |
| Pathfinder | External link labeled Pathfinder. | Destination was not opened; source of candidates, sync direction and integration contract are unknown. Do not include the opaque external shipment token in clone requirements. |
| Loadboards / Show cost / Post | Show cost checked and Post unchecked in sampled workspace. | No posting executed. Board names, pricing, publication audience, updates and unposting behavior unverified. |
| Candidate list / Add cost | 19 named candidates matched the sample's displayed 19 leads at that moment. Most showed Add cost. | Supports candidate-list interpretation for this example; generation/source, uniqueness, refresh and offer/response counting remain OQ-09. Add cost is not an accepted carrier price. |
| Add a carrier | Opens a search/contact/coverage-entry form. | Opening is not carrier assignment or master-record creation. No search selection or save executed. |

**15.7 Candidate and coverage-form branches**

Clicking one existing candidate opened its identity/location, prior lane activity (**Covered 25x**, **Quoted 2x**) and **Don't use this carrier — Not authorized**. Its form included equipment, Freight charge description/cost, + add charge, Track with Trucker Tools checked, Save for later and **Cover & send rate con** disabled. The exact reason for disabling that action was not established; the warning is visible evidence, not a verified sole cause. No candidate was removed or changed.

**Add a carrier** opened another initial form with a carrier searchbox, contact name/phone/email, **Note for rate con and email**, equipment, charge description/cost, + add charge and tracking preference. It displayed **Needs a packet**, checked **Request packet**, and the explanation that receipt and approval of a packet precede sending the rate con. The final action was **Cover & request packet**. No carrier was selected and no final action was clicked; the branch after selection still requires validation.

| Action / value | Operational interpretation to document | Required confirmation |
| --- | --- | --- |
| Candidate lane history | Previous work/quotes, distinct from present availability. | Sample scope and whether rejected/canceled work is counted. |
| Charge cost / additional charges | Proposed provider-side commercial amounts. | Required charges, customer-price effects, save timing and reconciliation. |
| Track with Trucker Tools | Preference in the coverage form. | When a request starts, driver consent/contact, integration readiness and charges. |
| Request packet | Onboarding request branch. | Required checks, approver, sender/recipients and failure/retry behavior. |
| Save for later | Deferred-work action separate from final coverage. | Whether it saves a lead, offer, assignment or another state. |
| Cover & send rate con | Combined coverage/document-send action named by the UI. | Actual assignment, document recipients, acceptance and queue/status effects. |
| Cover & request packet | Coverage/packet-request branch named by the UI. | When coverage becomes committed and when rate con is later sent. |
| Remove coverage lead / Remove carrier | Candidate removal versus assigned-provider removal. | Recovery, permissions, cancellation notice, financial/doc effects and replacement rules. Neither executed. |

Do not use candidate history or the presence of a contact as acceptance. A final workflow needs separate evidence for chosen carrier, agreed charges, eligibility/packet checks, sent/confirmed rate con, dispatch and driver assignment. Those steps may differ for LTL and TL; no universal sequence is inferred from this Auto Transport example.

**15.8 Financial summary and itemized charges**

Reference shipment: target cost **$4,200**, customer price **$4,900**, gross profit **$700**. **Expand itemized view** revealed Freight description, line note control, cost and price inputs, cost/price calculator controls and **+ add item**. It showed **Margin 14.29%**, **Cost+ 17%**, **Profit $700**. The percentages use different denominators and display different precision here: 700/4,900 ≈ 14.2857%; 700/4,200 ≈ 16.6667%.

This is an observed display example, not a universal rounding specification. No input was changed; no autosave boundary was tested. **+ add item** in this financial area adds a commercial line, whereas adding a freight item/handling unit describes physical goods. The carrier bill page separately says **Expected bill** and shows its own amount/balance; target cost does not prove a bill was received, approved or paid.

**15.9 Stops, contacts, driver information and tracking**

| Stop/provider field | Plain meaning / observed example | What to keep separate |
| --- | --- | --- |
| Numbered stop / site | Ordered pickup or delivery visit, site type and address. | Customer billing business versus actual collection/delivery premises. |
| Contact / Hidden from carrier | Site contact details and a carrier-visibility label on inspected stops. | Label does not verify all portal/PDF/email visibility. No phone/email link was activated. |
| Open–close hours | Facility availability window, e.g. 8 AM–5 PM EDT. | An open window is not a booked appointment. |
| Add appointment / Appt | Appointment entry or displayed scheduled appointment. Reference delivery showed 5:30am plus unknown. | Meaning of unknown, confirmed status and timezone remain pending. |
| ETA | Estimated time of arrival control. | Forecast versus commitment versus actual arrival. |
| In / Out | Arrival/departure controls; reference pickup Out displayed 2:00pm. | Exact event semantics, validation and whether a pickup status changes are Phase 5 work. |
| Picked up / Delivered | Operational confirmation actions. | They may change shipment state; do not click just to inspect navigation. |
| Instructions / references | Handling/site instructions; PO, Pickup and Ref values on SANCO pickup. | Different reference types are not interchangeable with BOL or PRO. Actual values omitted. |
| Driver information | Reference shows driver name/phone, truck and trailer with Update driver information control. | Carrier dispatch contact, actual driver and truck/trailer identifiers are separate data. Form/status effects follow in Phase 5. |
| Tracking events | Dated/location events and + add tracking update. Prior LTL example linked a PRO and external carrier Track page (§14.10). | Manual entry, provider event and location ping may have different sources. No new event entered. |
| Tracking completed / Off route | Both labels coexist on BOL 1046693 while its shipment is In transit. | Tracking completion is not proof of delivery. Off-route threshold, freshness and route source remain unverified. |

**15.10 Freight summary and the annotated volume/density example**

Open [BOL 1047829](https://app.quotefactory.com/broker/shipment/6ad62c8868813f1637085014). It is Dry Van, Booked and Needs a carrier. Its two displayed freight groups are **6 pallets at 48 × 40 × 48, 5,910 lb** and **4 pallets at 48 × 40 × 48, 6,843 lb**. Descriptions also contain carton/unit counts and the text All class 55-70; text in a description is not proof of structured class/NMFC values.

| Summary | Derivation / observed output |
| --- | --- |
| Count | Group pallet quantities 6 + 4 = 10; header says 10 items to be shipped and pallet summary says 10. There are two displayed freight groups. Do not confuse groups, pallets, cartons and contained units. |
| Volume | Ten 48×40×48-inch units: 10 × 48 × 40 × 48 / 1,728 = 533.333… cf; app displays 533.3 cf. |
| Weight | 5,910 + 6,843 = 12,753 lb, matching total display. The group weights are not multiplied by pallet counts again. |
| Density | 12,753 / 533.333… ≈ 23.911875 pcf; app displays 23.91 pcf. |
| Length | App displays 20' L and visualizer estimate 20 ft with ten footprints. General floor-layout/stacking/override logic is not established by this example. |

This extends §14.6 with one saved two-group shipment. Other commodities, unit conversions, multiple differing sizes, stacking and precision still need test cases. BOL 1046693 instead shows a single descriptive freight line, weight and 53' L; not every shipment has a visible cf/pcf summary.

**Map dependency answer:** The inspected shipment maps visibly attribute **Mapbox** and **OpenStreetMap**. That supports documenting the rendered-map dependency. It does not establish that a Google Maps key is needed, or identify geocoding, truck routing, mileage, GPS ingestion or tracking APIs. Phase 7 will map those capabilities to confirmed provider accounts and required access. No secrets should appear in this guide.

**15.11 Shipment/document button dictionary and direct links**

Links below use BOL 1046693. On another shipment, use the corresponding button; provider-specific bill/rate-con routes contain a relationship identifier, not just a carrier's master-record ID.

| Button / link | Opens / purpose | Inspected controls and stopping point |
| --- | --- | --- |
| Customer name/card | [Customer record](https://app.quotefactory.com/broker/customer/66c366f48a53dbc0fdaed429) | Reusable customer, contacts and billing context (§12). Clicking the broad card is distinct from its Confirmation button. |
| Carrier name/card | Shipment's assigned-carrier dialog → View carrier → [carrier record](https://app.quotefactory.com/broker/carrier/6a70a2e26de54b07f01bc668) | Relationship/identity, packet/authority and Remove carrier entry. Do not remove or Send request. |
| Confirmation | [Customer confirmation](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4/documents/customer-rate-confirmation) | Opens a document preview. Header Customer confirmation; rendered page is titled Rate Confirmation, with BOL, equipment/weight, customer and trip details. Regenerate document visible. Opening it does not confirm/approve the shipment. |
| Rate con | [Carrier rate confirmation](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4/provider-ratecon/6a70a30b5c5f7028c30b7292) | Provider agreement/document view; Carrier label, Confirmed/by DISPATCH/time, Share, financial area, PDF/download entry and Regenerate document. Observed confirmation indicator is distinct from packet status and shipment delivery. |
| Rate con → Share | Sharing Carrier Rate Confirmation dialog | Existing dispatch share/time and + add share. Dialog closed without adding a share or sending. Full recipients/access/signature workflow remains Phase 6. |
| Bill | [Carrier bill](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4/bill/6a70a30b5c5f7028c30b7292) | Provider-side amount owed: Upload bill/POD, Expected bill, amount/balance, In dispute and + Record payment. Expected bill is not evidence of an uploaded provider invoice or payment. |
| Invoice | [Customer invoice](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4/invoice) | Customer-side amount charged: invoice PDF/download entries, Regenerate/Remove document, Upload POD, amount/balance, dispute, recipient, Send invoice and + Record customer payment. No action executed. |
| Documents | [Shipment document index](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4/documents) | POD for carrier, Carrier bill, additional document for carrier and Misc shipment document. Some add controls have the accessible label Add unknown to shipment; exact types remain unverified. |
| PDF/download entry | Existing document preview or download link where exposed. | A signed temporary URL was present; not copied into documentation. No download performed. A customer confirmation preview was visually inspected, but full document/page contents are Phase 6 work. |
| Edit shipment | [Full shipment editor](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4/edit) | Existing shipment modification flow, separate from direct creation. Field/editability/save/resend rules are Phase 5. |
| Action menu | Shipment-level actions | Duplicate shipment; Change customer; Cancel shipment. Earlier assigned example also exposed Simulate location updates; it was absent in the sampled uncovered menu. No action selected; role/status conditions unknown. |
| + invoice reference | Customer-facing reference-entry control. | Form/save/document propagation not tested. Distinct from stop references. |
| + note / Timeline | Notes entry and event history | Reference Timeline expands Created/Booked/Updated/Covered, rate-confirmation sent/confirmed, tracking segment/event entries and dispute/undispute entries. Events existed before this inspection; no cause/actor inferred where not shown. |

**How to read Timeline:** Lifecycle progress, carrier coverage, document sharing/acceptance, tracking and accounting can each produce different event names. The reference displays a Booked event before Covered, with Rate confirmation sent/confirmed later. That is one record's history, not a guarantee that every shipment must follow the same timing. Free-text notes have displayed author/time but their audience is not established. Use fictional examples such as “Receiving entrance is on the east side” only in approved test data, not as a note on a real load.

**15.12 Remaining rules and test cases**

| Area | What is established now | Required follow-up / proposed owner |
| --- | --- | --- |
| Lists / queues | Loaded tabs, known-BOL filter, row comparison, menu choices and populated/empty queue examples. | Operations/product: inclusion/counter rules, timezones, pagination, CSV fields, sort effects and alternate roles. |
| Leads / coverage | Candidate workspace, sample history/warning, add-carrier and packet/send branches. | Carrier operations/integration: sourcing/count/deduplication, availability, approval policy, posting destinations, assignment/removal/replacement and failure recovery. |
| Direct creation | Blank form, defaults and Book shipment / Save for later entries. | Operations: required inputs, numbering, draft/initial state, quote linkage, documents and duplicate handling in test environment. |
| Financial / reps | Matching summary, itemized editable controls, commission-paid entry. | Accounting/admin: autosave, permissions, calculation precision, settlement and audit effects. |
| Stops / tracking | Hours/appointments/ETA/events/driver controls and mixed tracking/status labels. | Operations/integration: event sources, timestamp interpretation, actual updates, off-route rules and freshness. |
| Documents / privacy | Separate customer/carrier/bill/invoice/index destinations. | Operations/accounting: templates, fields, checkmarks, recipients, access, signatures, revisions, uploads, file policy and sends in Phase 6. |
| Exceptions / menu | Menu varies by example; no actions run. | Operations/admin: role/status conditions, confirmation dialogs, cancellations, duplication and downstream effects. |

**15.13 Explore Phase 4 yourself and what comes next**

1. Open Shipments → All → filters → search `1046693` → See shipments. Identify BOL/status, customer price, carrier and cost. Open the sort and CSV menus, then dismiss before Export. Reopen filters to clear your search when finished.
2. Open Cover → BOL 1047758 → Cover freight. Read target cost, candidates and lane history. Open one candidate to inspect its history/warnings; return using Carriers/close. Do not edit costs, toggle posting/tracking/packet controls, remove a lead or submit coverage.
3. Open [BOL 1046693](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4). Compare customer and carrier cards, expand financial lines and Timeline. Read without editing any input, commission or note.
4. Open Confirmation, return to the BOL, open Rate con, then Bill and Invoice. Identify which party/obligation each page concerns. Close sharing forms without sending; avoid regenerate/remove/payment controls.
5. Open [BOL 1047829](https://app.quotefactory.com/broker/shipment/6ad62c8868813f1637085014) and work through §15.10. Compare pallet totals with carton/contained-unit descriptions and the two freight groups.
6. Open [Create new shipment](https://app.quotefactory.com/broker/shipment/new), compare the sections against an existing shipment and leave without Book shipment or Save for later.

**Delivered:** List/queue navigation, filter/sort/export dictionaries, row meanings, direct-creation entry, detail-screen hierarchy, candidate/assigned-carrier distinctions, coverage/packet branches, financial/stop/freight/map explanations, document/button links, event history, test gaps and exercises.

**Pending:** Actual creation/assignment/updates, fully tested status/role variants, lead/provider sourcing, date rules, file/export contents, external sends/posting, financial outcomes and document acceptance. These are explicit verification gaps, not completed workflow tests or approved clone scope.

**Continue reading:** [§16](#shipment-editing) covers shipment editing, locks, scheduling/tracking forms and untested save/resend outcomes; [§17](#documents-accounting) covers document/accounting lifecycles.

<a id="shipment-editing"></a>
**16\. Edit shipment, scheduling, tracking and exceptions — Phase 5**

**Purpose:** Know what a field changes, which controls are locked, and which Save/Update actions may alter operational records or send documents. Forms below were inspected October 25, 2026; no operational value was edited or submitted. This chapter distinguishes visible controls from tested persistence, permissions and external effects. Evidence E-76–82.

**16.1 Open the correct editor**

Shipment → **Edit shipment** opens `/broker/shipment/{shipmentId}/edit`. Compare [uncovered Dry Van BOL 1047829](https://app.quotefactory.com/broker/shipment/6ad62c8868813f1637085014/edit), [covered/in-transit Dry Van BOL 1046693](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4/edit), and [scheduled Auto Transport BOL 1047665](https://app.quotefactory.com/broker/shipment/6abe9d488ee4a147c6dd8077/edit). The uncovered Auto Transport shipment's **Reschedule** button also opened its full editor; it did not immediately change dates.

The full editor, reusable location-template dialog, appointment, ETA, driver and tracking-update dialogs have different submission controls. A Save in one form is not the same operation as Update shipment. Do not assume that leaving the editor discards changes to every nested form or that a checkbox never saves immediately; those boundaries remain untested.

**October 31 live follow-up:** The read-only Edit shipment screen confirmed the field groups described below on one booked, uncovered Auto Transport example. The page showed Custom BOL; equipment and two service checkboxes; provider addition; reorderable stops and distance; stop contact/share/instructions/hours/date/references/private-note controls; handling-unit dimensions/weight/stackable/hazmat; length visualizer and total value; lane history; cost/price lines and calculators; Hide contacts from carrier; Update shipment; and Timeline. Tanker endorsement and Team service were unchecked in this example; Hide contacts from carrier was checked. These sample states do not establish universal defaults. Supporting reads included `/shipments/:id`, `/quote-configs`, `/users/settings/account`, `/customers/:id`, `/customers/:id/credit-usage`, `/contacts`, `/location-templates`, `/location-templates/:id`, `/shipments/products`, `/notes/shipment/:id` and `/lane-history/summary`; each had an observed 200 GET after a 204 preflight. A static country-flag SVG also loaded from the Quote Factory S3 asset host. No field changed and Update shipment was not clicked; validation, lock rules and saved-data effects remain unknown. See run QF-2026-10-31-005 in the [network evidence](network/quote-factory-network.json).

**16.2 Header, equipment and provider field dictionary**

| Field / action | Meaning / visible input | Observed constraint | Downstream effect to verify |
| --- | --- | --- | --- |
| Custom BOL | Editable displayed shipment reference; existing number prefilled. | No renumber/delete control used. | Uniqueness, original-reference retention, filenames, carrier messages, accounting IDs and audit entry. |
| Created/by | Creation timestamp and creator metadata. | Read-only displayed context. | Timezone and identity retention. |
| Customer/contact | Existing customer and contact displayed in sampled editors. | No ordinary customer selector established here; separate Change customer menu exists. | Reassignment permissions, credit/pricing, documents, invoices and history. |
| Equipment | Selector on uncovered example; plain equipment label on sampled covered/scheduled examples. | Availability varies across samples. | Carrier eligibility, rating, documents and ability to amend covered freight. |
| Partial | Partial allowed checkbox in Dry Van examples. | Disabled with Locked after coverage on assigned Dry Van; available on uncovered Dry Van. Not shown in sampled Auto Transport editor. | Rating, available capacity and carrier notice; not a universal role/status rule. |
| Tanker endorsement / Team service | Independent requested-service/qualification checkboxes. | Present and not marked disabled in sampled covered and uncovered editors. | Carrier/driver validation, pricing, dispatch and printed terms. Neither means a qualified driver/team is assigned. |
| + add vendor / carrier | Shipment-provider assignment entry. | Separate from creating a provider master record. | Coverage/onboarding, service costs, documents and provider bills; see §15.6–7. |
| Distance (mi) | Editable lane distance. | Prefilled in each inspected record. | Route recalculation, manual override, per-mile charges and consistency with map. |

**16.3 Stops and reusable templates**

| Stop field / control | Meaning / input source | Rule established by inspection | Verification still required |
| --- | --- | --- | --- |
| Reorder locations / + add location | Change visit sequence or add another stop. | Controls present; no reorder/add performed. | Required first/last stop, pickup/delivery typing, item-to-stop links, mileage/date recalculation and provider amendments. |
| Company name / location type | Site identity and access conditions. | Search/select controls; business with dock/forklift in samples. | Template matching, requiredness and accessorial effects. |
| Address / + Address 2 / city-state-zip | Particular stop's address and locality. | Prefilled searchable inputs; country flag displayed. | Suggestion provider, country/postal validation and geocoding. |
| Contact name/phone/email | Site person/department and communication details. | Name/phone text and email token entry; phone-country selector disabled in samples. | Allowed formats, multiple recipients and visibility. |
| Share BOL | Per-stop communication preference. | Separate checkbox beside contact email. | Exact generation/send trigger, recipient verification and interaction with Hide contacts. |
| Pickup/Delivery instructions | Operational requirements for that visit. | Optional text; reference pickup contains strap requirements. | Which PDFs/emails/portals receive instructions, text limits and change notices. |
| Open time / Close time | Facility hours, separate from appointment and actual arrival. | Warning observed when close time is less than four hours after opening; Currently closed also displayed. | Timezone, holiday/overnight handling and whether warnings block submission. |
| Pickup date / Arrival date | Planned stop date. | Date input/calendar; label differs by stop. | Past-date rules, ordering, cutoffs and notification effects. |
| Appointment | Existing time or add appointment control. | Separate form detailed in §16.7. | Required ID, confirmed status and rescheduling consequences. |
| Reference # / +add ref | Typed stop reference, such as PO, Pickup, Ref or Order. | Multiple reference type/value pairs in SANCO example. | Allowed types, lengths, uniqueness and document/provider mapping. |
| + private note | Stop-specific private-context entry. | Expansion was inspected without entering text. | Audience, inclusion on outbound documents and save boundary. Template private note separately says team only. |
| Edit location template for [site] | Explicit reusable-template editor. | Opens Edit template with company/type/services/address/contact/email/instructions/hours/private note and Save. | Saving a template versus saving the shipment, propagation and revision history. |

**A real difference, not a propagation rule:** SANCO's shipment stop closed at **4 PM**, while its reusable template showed **3 PM**. Both were visible in one inspection. This demonstrates distinct displayed values; it does not establish when/how they diverged or what saving either would update. Do not overwrite one with the other as a learning exercise.

**16.4 Freight, handling units and calculated fields**

| Field | Meaning / visible behavior | Required test / owner |
| --- | --- | --- |
| Description | Human-readable commodity description/history search. | Pricing: commodity defaults, structured versus free text and output placement. Text mentioning class is not proof of a selected class/NMFC. |
| Contains + unit | Contained quantity/unit distinct from handling-unit count. | Operations: exact unit options and relationship to cartons/pieces/pallets. |
| Packaging / Quantity | Physical handling-unit type and count. | Pricing: preset dimensions, supported packaging, positive/integer limits and deletion behavior. |
| L/W/H + in/cm | Per-unit dimensions, with unit controls. | Pricing: conversions, outer packaging, zero/blank/negative inputs and rounding. Quote-unit menu was observed in §14; all editor conversions remain untested. |
| Total weight + lb/kg | Group total, not necessarily per pallet. | Operations: packaging/tare basis and conversion. SANCO 6+4 groups retain 5,910+6,843 lb totals. |
| Stackable / Hazmat | Handling/eligibility flags. | Carrier operations: additional required hazardous details, compatibility, capacity and carrier terms. |
| + add more | Additional handling unit/group. | Operations: mixed sizes, removal and totals. No group was added to a real shipment. |
| Estimated total length / visualizer | Entered length and computed floor-space estimate. | Pricing: rotation, stacking, width, overrides and oversize constraints. |
| Total Width / Total Height | Additional overall dimensions were visible in the scheduled Auto Transport editor during reconnect; units follow overall-dimension context. | Operations: requiredness, vehicle versus packaged-freight meaning and conversion. No changes made. |
| Total value | Shipment goods-value input. | Accounting/operations: currency, valuation basis and insurance/claim relevance; no automatic insurance coverage inferred. |

**Calculation evidence:** SANCO group 1 displays 320 cf /18.47 pcf and group 2 displays 213.3 cf /32.08 pcf; combined display remains 533.3 cf /23.91 pcf. Combined density uses total weight divided by total volume, not the mean of group densities. On BOL 1046693 the entered length is **53 ft** while the visualizer estimate is **0 ft**, with dimensions absent. Preserve the distinction between an entered value and an insufficient-data estimate; never silently replace 53 with 0.

**16.5 Charges, calculators and update checklist**

Cost & price contains Description, line note, Cost or Target cost, Price, cost/price calculators, + add item and Margin/Cost+/Profit. The **price calculator** exposed Margin %, Cost+ % and Profit inputs; on SANCO it showed about 36.842%, 58.333% and $1,400. The underlying line remained $2,400 cost/$3,800 price. See §14.8 for formulas and §15.8 for differing display precision. A per-mile cost calculator and lane history exist; their mileage/provider/default rules remain unverified.

Before a permitted test update, record the original BOL/status/provider, stop sequence/dates/timezones, dimensions/weights/units, charges and recipients. Change the intended field, compare derived totals, inspect **Hide contacts from carrier** and **Send updated documents**, submit once, then verify saved values, Timeline, actual recipients/document revisions and financial/provider effects. This is a test procedure, not evidence those effects occurred.

Assigned Dry Van and scheduled Auto Transport editors show **Send updated documents → Rate Con checked**. The uncovered SANCO sample did not show that section. Do not assume Update shipment is a private data-only save. No checkbox was changed and Update shipment was never clicked. Global/personal preferences, complete recipient list and exact resend trigger require operations testing.

**16.6 Editability matrix — visible UI, one broker session**

Legend: **Input** = editable-looking control, not proven save permission; **Display** = plain value; **Locked** = explicit disabled control; **Unknown** = no evidence. Exact logged-in role remains unverified. Equipment/status/coverage differ between examples, so a correlation is not a universal rule.

| Field/action | Booked + uncovered Dry Van 1047829 | In transit + covered Dry Van 1046693 | Scheduled + covered Auto Transport 1047665 | Other broker roles / customer / delivered / canceled |
| --- | --- | --- | --- | --- |
| Custom BOL | Input | Input | Input | Unknown |
| Customer/contact | Display | Display | Display | Unknown |
| Equipment | Selector | Display | Display | Unknown |
| Partial | Input | Locked after coverage | Not shown | Unknown |
| Tanker / Team | Input | Input | Input | Unknown |
| Stops / freight / distance / charges | Inputs | Inputs | Inputs | Unknown |
| Hide contacts | Checked | Checked | Checked | Unknown |
| Send updated Rate Con | Not shown | Checked | Checked | Unknown |
| Update shipment | Present, unexecuted | Present, unexecuted | Present, unexecuted | Unknown |

Role checks must be enforced server-side in the clone; the table is observation evidence, not an approved access policy. No role or hidden status matrix is filled from guesswork.

**16.7 Appointment, ETA and driver dialogs**

| Open from shipment detail | Fields/actions observed | Meaning / pending effect |
| --- | --- | --- |
| Appt 5:30am unknown on reference delivery | Appointment time, Appointment # or ID, checked Send updated Rate con, Cancel appt, Save. | Time/ID and document-send preference. Neither Save nor Cancel appt clicked. The meaning of unknown and actual appointment confirmation remain unverified. |
| ETA on reference destination | Destination, ETA time/date, explicit America/Los Angeles timezone, appointment and open-hours context, optional Notes, Save. | Forecast at destination in an explicit zone. No source/current-time rule inferred from the initial value. Saves/alerts/status effects untested. |
| Update driver information for Pathak Express | Driver & tracking: driver name/phone, Tractor #, Trailer #, Save. | Driver identity is distinct from dispatch contact; tractor/trailer are separate identifiers. No tracking-start/consent control was established in this dialog state. |
| Reschedule on uncovered Auto Transport | Navigates to full shipment editor. | Entry to editing, not immediate date change; actual reschedule/update remains untested. |

Facility hours, appointment, ETA and actual In/Out timestamps are four separate concepts. An ETA note does not necessarily become a public shipment note. No In/Out/Picked up/Delivered action was executed; their exact confirmation dialogs and instantaneous-versus-form behavior remain test gaps.

**16.8 The user's Notes and PRO form**

**Exact path:** [BOL 1046693](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4) → **+ add tracking update**. Opens **Tracking update** with **Time**, date/calendar, **Location**, **Notes**, optional **PRO #**, and **Save** (accessible name Confirm Save). This identifies the annotated Notes/PRO use case more precisely than the general + note box.

**What normally belongs in Notes:** A factual movement update with a useful source/context, such as “Carrier dispatch reports pickup complete; awaiting POD” or “Driver reports a two-hour delay at receiving.” These are learning examples, not text entered into the operational record. Include the time/location in their proper fields. Distinguish reported information from verified completion. Do not place unrelated billing notes, credentials or private personal details here.

**PRO #** is the carrier's shipment/tracking reference (§9). Enter a verified carrier reference, not the broker BOL just because it is available. This inspected form permits optional PRO entry, but requiredness for a particular carrier/event and automatic import/correction behavior remain untested. No event or PRO was saved.

| Note location | Purpose / evidence | Audience and persistence |
| --- | --- | --- |
| Tracking update Notes | Narrative associated with dated/location movement update. | Unverified; do not assume private or customer-visible. |
| ETA Notes | Context attached to forecast update. | Unverified; own Save control. |
| Stop instructions | Requirements for pickup/delivery. | Likely operational content; actual recipient/doc placement must be checked. |
| Template Private note | Reusable-site internal context; explicit team-only label. | Label observed; role enforcement and inheritance untested. |
| Shipment + note | General authored note near Timeline. | Save/edit/delete/notifications not established. |
| Charge note / rate-con-email note | Commercial/service-line or provider-message context. | Distinct form; outbound visibility needs verification. |

**16.9 Transition and correction map**

This is an evidence map, not a tested state machine. Proposed operational actors must be confirmed by the team lead. No correction path, webhook ordering or duplicate handling has been verified.

| From / trigger | Actor / prerequisites known | Observed endpoint/evidence | Required resulting-state/side-effect test |
| --- | --- | --- | --- |
| Request/quote → Book | Broker/customer authority and required fields unverified. | Existing quote-to-shipment link (§14.10); direct Book entry (§15.4). | Exactly when Booked occurs, numbering, duplicates and dispatch. |
| Booked/uncovered → coverage submit | Carrier operations; carrier/cost/packet requirements shown. | Coverage forms and send/request branches (§15.7). | Assignment/coverage state, Scheduled trigger, packet gating, notifications and failure rollback. |
| Scheduled → Picked up | Operational actor/required data unknown. | Pickup action visible; reference history has pickup event/In transit. | Dialog, event time/PRO, resulting state, contacts, provider/accounting effects and correction. |
| In transit → tracking update Save | Time/date/location/Notes/optional PRO form observed. | Form only; manual save unexecuted. | New event, PRO update, status mapping, deduplication and out-of-order events. |
| In transit → Delivered | Actor/requirements/POD policy unknown. | Delivered action visible. | Confirmation form, delivery time/POD, status, queue removal, invoice eligibility and reversal. |
| Any permitted stage → appointment/ETA/driver Save | Separate forms; permissions unknown. | Form fields in §16.7. | Whether status changes, messages/documents are sent and history is recorded. |
| Shipment → Cancel shipment / Change customer / Duplicate | Menu entries only. | No execution; menus vary (§15.11). | Required reason, confirmation, copy policy, carrier cancellation, bill/invoice effects and recovery. |
| Integrated provider event → state/update | Integration actor/source unverified. | Imported-looking event history, no transport contract. | Authentication, event IDs, retries, stale/out-of-order updates, manual override and reconciliation. |

**16.10 Validation catalog and safe exploration**

For each test, capture input, state/role, expected rule approved by the owner, observed result, saved state/history, external effects and cleanup/recovery. Tests remain **not run**: missing/duplicate BOL; blank customer/stops; invalid postal/phone/email; close before open/overnight hours; delivery before pickup; dates across DST/timezones; negative/zero quantity/dimensions/weight/value/cost; mixed units; hazardous details; unauthorized locked-field update; stale simultaneous edit; duplicate Update/Save; removed carrier; failed resend; failed tracking request; canceled/delivered correction.

Read-only exercise: compare the three editor URLs in §16.1 → identify locks and checked resend controls → close without Update. On reference detail, open Tracking update, Driver & tracking, Appointment and ETA one at a time; read fields, then Close modal. Do not use Cancel appt, Record payment, In/Out, Picked up or Delivered to exit a form.

**Delivery status:** Field dictionary, observed editability matrix, exact Notes/PRO and other inspected dialogs, side-effect checklist, transition evidence map and validation catalog are written. Submitted transitions, every status/role, error/correction paths, save/autosave and outbound effects remain unverified. User authorized independent judgment, but did not identify disposable test records/environment or alternate-role accounts; no such access is invented. **Continue to Phase 6: documents, bills, invoices and accounting.**

<a id="documents-accounting"></a>
**17\. Documents, bills, invoices and accounting — Phase 6**

**Goal:** Follow each document and financial obligation separately: generation → sharing/sending → acknowledgment; bill entry → approval → payment record; invoice creation → sending → customer payment. Evidence E-83–92 was collected October 26, 2026. No upload, generation, approval, payment, dispute, send, disconnect or configuration change was submitted.

**17.1 Document and money hierarchy**

```text
Shipment
├── Movement documents
│   ├── BOL: shipment/freight and transport information
│   ├── Labels: identify the physical units/destination
│   └── POD: delivery evidence supplied/received later
├── Commercial confirmations
│   ├── Customer confirmation: customer-facing arrangement
│   └── Carrier rate confirmation: provider-facing arrangement and agreed amount
├── Provider payable
│   └── Expected cost → bill/file + bill details → approval → payment record
└── Customer receivable
    └── Price → invoice/file → send → payment record → remaining balance
        ↕ accounting integration (configured mappings; actual sync unverified)
```

Generation, delivery of a document, acceptance/signature, physical delivery, payment approval and recording payment are different events. An uploaded POD does not itself prove a recorded invoice payment. A paid customer invoice can coexist with an unapproved carrier bill in the accounting list; the two obligations have separate states.

**17.2 Catalog — where to open each document**

Open [LTL BOL 1047885 → Documents](https://app.quotefactory.com/broker/shipment/6ada321dbf56ad5e17c4f8a4/documents), allow generated thumbnails to finish loading, and compare the uploads below them. Early loading snapshots showed upload slots before generated files appeared; absence during loading is not proof a document is unavailable.

| Document | Purpose / inspected content | Source of fields / generation status | Actions and limits |
| --- | --- | --- | --- |
| [BOL](https://app.quotefactory.com/broker/shipment/6ada321dbf56ad5e17c4f8a4/bol) | Straight bill of lading, non-negotiable; BOL/provider/service, pickup/delivery sites and windows, contact/instructions/services, billing party, account/quote reference, freight table and acknowledgment areas. | Existing generated PDF; values correspond to shipment/party/freight context. Creation timing and exact mapping must be tested. | Preview/download entry and Regenerate document. No regeneration/download performed. |
| [Labels](https://app.quotefactory.com/broker/shipment/6ada321dbf56ad5e17c4f8a4/labels) | Provider/service, FROM/TO, order/BOL, weight, destination routing text and pieces. | Existing generated pages; sample had five PDF-page entries and Half-letter selected. Count/layout rules not established. | Half-letter and 4x6 choices, Download labels and Regenerate document. No size changed or regeneration performed. |
| Customer Confirmation | Customer-facing commercial record; preview is titled Rate Confirmation. BOL/equipment/weight/customer and trip information observed (§15.11). | Existing customer-rate-confirmation route; exact total/terms and automatic triggers vary and need full template review. | View and regeneration entry; opening it is not acceptance. |
| Carrier Rate Confirmation | Load & Rate Confirmation, provider/dispatch identity, equipment/weight/mileage, driver/tractor/trailer, trip details/instructions, Terms and Fees, Payment, agreed amount and signature/date areas. | Existing two-page PDF on assigned TL example. Agreed all-in amount $4,200 matches carrier-side amount, while broker UI separately shows customer price/profit. | Confirmed/by indicator, Share, download and Regenerate document. Existing signature marks do not identify the signing technology or establish enforceability. |
| POD | Proof of delivery attachment; approved-bill example had an uploaded JPG POD alongside its bill PDF. | Provider-associated upload slot; uploader/file metadata shown for existing attachments. | Upload POD / Upload another POD, preview/download and Remove document where present. No upload/removal; accepted type/size/server validation unknown. |
| Carrier/vendor bill | Provider invoice attachment and payable details. | Provider bill number/date/amount, terms and payment recipient; linked to shipment-provider relationship. | Upload/edit, approval and payment-record controls (§17.4). |
| Customer invoice | Customer-side receivable with invoice number, amount/balance, recipient and supporting POD. | Existing invoice PDF/number; account-specific bill-to/terms and revision triggers need verification. | Regenerate/remove/POD/send/payment-record controls; never executed. |
| Additional provider / Misc document | Generic Upload document dialog for provider or shipment. | Accessible label Add unknown to shipment opens a generic upload, with no verified type selector in initial form. | Drag/upload control only inspected; no claim of a complete allowed document-type list. |

**BOL fields inspected visually:** Pickup and delivery hours/address/contact, delivery accessorials/instructions; Bill third party prepaid to; account and quote references; Units, Pkg type, HM, Description (said to contain), Dims, NMFC, Class and Weight; load/trailer/seals; shipper/driver signatures, units received and consignee received-by/signature/date. Blank signature spaces are form fields, not proof of electronic-signature integration or completed receipt. The sample has class 60 and blank NMFC cell; this does not establish that NMFC is optional for every carrier/commodity.

**Identifier clarification:** This generated BOL explicitly labels **04821J as Acct** in the bill-third-party section. That is an account-reference context, not an NMFC commodity number. The same string previously appeared in pricing/Blanket context; its exact tariff/account mapping across those screens still needs the pricing owner, but the BOL label is now verified evidence (E-88).

**Recipient privacy:** A broker page can show cost, price and profit around a PDF without placing all those fields in the PDF. Do not infer customer/carrier access from the broker screen. Test the actual delivered file, public/share page and alternate-role account. Existing rate-con terms were inspected for section structure, not adopted as the clone's approved legal/commercial policy.

**17.3 Accounting queues and row states**

**Open:** Sidebar Bills & Invoices → [accounting workspace](https://app.quotefactory.com/broker/accounting/shipments/bills-invoices). General layout has BOL, Carrier bills, Customer invoices, shipment filters and Record customer payment. Each side has its own linked status/amount. Counters are live and not a financial reconciliation report.

| Tab / queue | Intended work described by its label | Inspection / rules still open |
| --- | --- | --- |
| Open / All | Open obligations versus broader record view. | Open loaded mixed bill/invoice states including Paid and Canceled on individual sides; exact row inclusion and pagination unverified. |
| Bills to Upload | Obtain/enter provider invoice. | Entry/counter and Upload bill rows observed; required attachment/details tested only as forms. |
| Bills to Approve | Review received bill. | Opened populated queue and existing uploaded bill/POD with Approve to pay. |
| Bills to Pay / Overdue Bills | Follow payable/due work. | Bills to Pay populated with due-date labels; overdue entry/counter observed. Exact aging boundary, holds and approval prerequisites unverified. |
| Upload missing POD | Obtain supporting delivery evidence. | Entry/counter and provider upload form observed. Whether POD blocks approval/invoice sending requires policy/testing. |
| Invoices to Send | Customer invoice dispatch work. | Populated queue opened; some rows still showed Due labels. A due date alone does not prove email was sent. |
| Invoices to Factor | Factoring work. | Selected queue showed No bills or invoices yet; settings say Not factoring. No populated submission workflow verified. |
| Outstanding Invoices / Overdue Invoices | Follow unpaid/late customer amounts. | Entries/counters and due/paid row variants observed; aging, partial allocations and credits untested. |
| Disputed Invoices | Follow disputes. | Selected queue empty in this pass. Actual dispute toggles/workflow not executed. |

To investigate a specific payable/receivable, open its side's link, verify BOL/provider/customer, then compare document, amount, due date, dispute, balance and history. Do not sum both bill and invoice columns as revenue. One shipment may have multiple provider relationships; verify bill cardinality for additional vendors before implementing totals.

**17.4 Provider bill entry, approval and payment records**

**Example awaiting approval:** [BOL 1040882 — provider bill](https://app.quotefactory.com/broker/shipment/671c10fa348d652bfe584dc0/bill/6729131f17f4f198cfb962bb). It has an uploaded bill PDF and POD JPG with uploader/file metadata, bill number, amount $500, due date, balance $500, In dispute, **Approve to pay** and **+ Record payment**. These states were read; no approval or payment was made.

**Bill editor:** The bill-details toggle opens **Edit bill**, not just a read-only expansion. Fields are Bill/invoice number, Mail payment to, Carrier accounting contact, Bill amount, expected-amount hint, Bill date, Days to pay, Due date and Save bill. Existing bill shows 30 days from December 2 to January 1. A blank reference bill-entry form separately shows Upload/Drag bill, empty number/amount, default bill date, 30 days and calculated due date. The date example demonstrates a displayed result, not all holiday/timezone/payment-term rules.

| Step | User input / source | Check before submission | Outcome still to verify |
| --- | --- | --- | --- |
| Upload / enter bill | Provider's actual invoice, verified invoice number/date/amount and payment recipient. | Match shipment/provider, avoid duplicate invoice, compare approved charges and document authenticity. | Upload limits, duplicate detection, extraction, audit/storage and initial state. |
| Save bill | Entered details and attachment. | Correct recipient/address, amount, terms and due date. | Required fields, recalculation, status, finance integration and revision history. |
| Approve to pay | Reviewer authorization. | Match agreed cost, POD/required supporting files, adjustments and dispute policy. | Approver role, holds, approval record and queue changes. Button existence does not prove that all checks are enforced. |
| Record payment | Payment date, Amount, Method, Memo. | Evidence the underlying payment exists; correct partial/full amount and recipient. | Actual funds movement versus record-only, overpayment, allocation, balance/audit and sync. |

The provider payment form defaulted to the balance and displayed ACH. Method menu: **ACH, Apple Pay, Credit card, Cash, Cash App, Check, Comchek, Google Pay, PayPal, T-Chek, Venmo, Wire, Zelle**. These are observed labels; no processor integration, payment capability or fee is inferred. Save payment was not clicked.

**17.5 Customer invoice and receipt flow**

Open [reference customer invoice](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4/invoice). It shows invoice number/PDF, amount/balance $4,900, recipient, In dispute, Send invoice, POD and regeneration/removal controls. **+ Record customer payment** opens Payment date, Amount, Method, Memo and Save payment. This invoice-level form did not expose a multi-invoice allocation table in its initial state. Do not invent allocation or credit behavior from customer history columns.

**Learning flow:** Confirm bill-to/contact and terms (§12) → confirm shipment price/references/supporting files → review actual invoice PDF → send once to verified recipients → check delivery/send history → record verified customer receipt → reconcile balance/accounting. Draft generation, sending and payment recording are separate checkpoints. No automatic creation/send event, mandatory POD gate, reminder/collection policy, partial allocation or correction was tested.

If changing charges or customer details after invoicing, establish whether the app regenerates a new revision, modifies the existing invoice, sends an amendment, creates a credit or preserves external references. Never delete/recreate a document or payment as an assumed correction method. An In dispute checkbox does not establish approval, refund, collection or accounting behavior until tested.

**17.6 Accounting integration, terms, factoring and QuickPay**

**Current UI, October 26:** Settings → [Accounting](https://app.quotefactory.com/broker/settings/accounting) displays **Syncing Bills & Invoices**. Its QuickBooks dialog shows a connected company identifier, Disconnect, expense-account mapping for bills and service mapping for invoices, with checked/disabled sync checkboxes. Earlier E-25 on October 23 displayed Not connected to QuickBooks; preserve both dates as a change in observed state. Current configuration does not prove a bill/invoice/payment successfully synchronized or that the clone has access. Company/account identifiers are omitted.

Visible company defaults: customer Pay within 30 days; vendor Pay within 30 days of Vendor bill. Customer/provider overrides must be followed independently (§12); do not treat prepaid as proof of cash received before pickup. QuickPay says Not providing QuickPay; its disabled form shows Allow Quickpay, pay within 3 days and 2.5% discount. Factoring says Not factoring; its disabled form contains Enable factoring, factoring company and default-new-customer factoring. Disabled/example values are not approved clone policies or offers to providers.

**Proposed clone mapping — requires accounting/integration review:**

| App record / event | External mapping decision | Failure / reconciliation evidence required |
| --- | --- | --- |
| Customer / provider | Customer/Vendor identity, legal/bill-to details and stable external ID. | Duplicate names, deleted/inactive entities, tax/contact updates and cross-company isolation. |
| Provider bill | Expense account, bill number/date, due date, line amounts and provider/shipment relation. | External ID, validation error, duplicate prevention, correction and retry. |
| Customer invoice | Service/item, invoice number/customer, amount/terms and supporting references. | Generation versus send versus sync trigger, revisions, void/credit and tax/currency policy. |
| Payment record | Payment method/date/amount, allocation and external payment/balance semantics. | Direction/ownership of sync, partial/overpayment, duplicate webhook/import and reconciliation. |
| OAuth connection | Client-owned company/app/scopes, test company, reconnect/disconnect. | Token storage/refresh/revocation, permissions, account mismatch, audit and recovery. |

This table is a decision checklist, not a verified Quote Factory schema or a ready implementation contract. Provider access and official API references continue in Phase 7.

**17.7 Documents, storage, revisions and access checklist**

Existing download links use temporary signed document URLs; keep durable app routes in the guide and regenerate authorized download links through the app. Do not store temporary tokens or raw invoice/POD/contact files in this repository. The visible storage host does not establish region/retention/backups/encryption/access-isolation requirements for the clone.

For each template and attachment, confirm field source, numbering, generator/trigger, allowed file types/size/count, revision history, uploader/approver, audience, expiring-link policy, signature/acceptance method, resend/notification behavior, correction/removal permissions and retention. Test special cases: missing POD, bill amount differing from expected, duplicate bill number, wrong provider, corrupt/oversize file, two uploads, removed file referenced by invoice, failed PDF generation, stale shared revision, email bounce, partial payment, dispute/hold, due-date override and failed/retried sync. None was executed on operational records.

**17.8 Explore and phase status**

Use Bills & Invoices → Bills to Approve → existing bill → inspect documents and details → close editor without Save. Open payment-record form and close without Save payment. Compare carrier bill to its customer invoice. On LTL BOL 1047885, open Documents → BOL and Labels; inspect both label sizes without changing selection. Open Accounting settings → QuickBooks/QuickPay/Factoring and close without changing mappings, preferences or connection.

**Delivered:** Document catalog and inspected fields; generated BOL/labels and carrier confirmation structure; bill editor/approval/payment forms; customer invoice/receipt form; queues; current accounting connection/terms; mapping/reconciliation decisions and validation cases. **Pending:** actual uploads/sends/signatures, approval/payment/revision effects, complete queue rules, finance sync, role/access and owner-approved policies. **Continue reading:** [§18](#third-party-requirements) covers third-party dependencies and the corrected access guide.

<a id="third-party-requirements"></a>
**18\. Third-party dependencies and API requirements — Phase 7**

**Purpose:** Understand which feature needs which external capability, which values/providers are visible in Quote Factory, and what access the clone would still need. The detailed carrier/provider instructions are maintained in the existing [10-4 TMS API Access Guide](../thrid_party/10-4-tms-api-access-guide.md), revised October 26, 2026. Evidence E-93–98. No account was created, agreement accepted, paid product purchased, credential retrieved or operational API called.

**18.1 Four questions before requesting a key**

1. **What feature?** Rating, tender/pickup, tracking, BOL/document retrieval, map rendering, route/mileage, address search, onboarding, accounting, messages or actual payment processing are separate capabilities.
2. **Whose account and agreement?** The brokerage/customer's direct carrier agreement may differ from an Xtended Network/aggregator account. A master-record carrier is not an API credential, and a portal account is not automatically API access.
3. **What access?** Product/version, account eligibility, test versus production, API key/OAuth/integration credentials, permissions, data rights, rate/usage limits and support owner.
4. **What proof?** Correct capability-specific output plus external acknowledgment, duplicates/retries/correction and reconciliation. A green card or successful login is not a passing integration test.

**18.2 Feature-to-capability map — top to bottom**

| Workflow / trigger | External capability / current evidence | Required decision and information |
| --- | --- | --- |
| Enter customer/location | Address lookup/validation/geocoding. Billing editor names Google address search; other inputs' supplier unverified. | Supported countries, selected service/account, billing/restricted access, normalization, coordinates and saved-data rules. |
| Select freight class/NMFC | Current classification rules or licensed lookup. Manual input and estimated class observed. | Licensed ClassIT+ API versus authorized manual lookup, responsible selector, current rules and data-use rights. Do not copy a proprietary commodity table. |
| Get quotes | Carrier or network rating API with negotiated account/service entitlements. | Selected launch carriers/network, payer, class/freight/services, quote/expiry/transit/charges and partial failures. |
| Book/tender/dispatch | Provider shipment/pickup submission and acknowledgment. Existing LTL shows Auto dispatched; coverage has separate TL send/packet branches. | Distinguish local booking, provider acceptance and pickup scheduling; references/PRO, duplicate prevention, amendments and cancellation. |
| Cover load | Candidate/board/market-data/onboarding services, if automated. Pathfinder and Loadboards shown. | Lead source, contract and current usage, posting visibility/update/remove, response/offer mapping and manual fallback to approve. |
| Render map | Map renderer. Mapbox/OpenStreetMap attribution observed. | Client-owned selected renderer/account/token, domains/scopes, attribution and usage budget. |
| Compute distance/ETA | Separate routing/mileage/geocoding capability. Actual supplier unverified. | Vehicle restrictions, coordinates/stops, timezones, route source, regional coverage and editable overrides. A map token alone is not the complete tracking stack. |
| Track load/driver | Carrier status feed and/or truckload tracking supplier. Trucker Tools label/preference present. | Consent/contact data, start/stop, freshness, source timestamps, polling/webhooks, ordering/replay and manual correction. |
| Check carrier / request packet | Onboarding/identity/authority/insurance and packet supplier. None selected under Compliance; current packet branch exists. | Required checks and human approver, selected integration, permissions, packet images/tax data and failure/recovery. Supplier links alone are not eligibility policy. |
| Create/share BOL, labels, rate con, POD, invoice | Internal PDF/storage or selected external services; temporary S3-hosted URLs observed. | Templates, source fields, number/version, signed-link access, upload validation, retention and acceptance/signature requirements. Existing signatures do not identify signing technology. |
| Send quotes/documents/alerts | Mail/SMS/notification transport; vendor unverified. | Approved sender/domain/recipients, templates, bounce/delivery and retry/idempotency. Never use operational contacts to test arbitrary messages. |
| Sync bills/invoices/payment records | Accounting integration. Oct26 QuickBooks UI connected/mapped. | Clone-owned authorized app/company access, entity/external-ID mapping, direction, revisions, duplicates and reconciliation. |
| Pay/factor/QuickPay | Processor/factor only if actual monetary execution is in scope. Current forms/settings do not establish one. | Record-only versus funds movement, authorized financial actor, terms/fees, sandbox and settlement/reversal. Do not infer Apple Pay/ACH integration from method labels. |
| Support / training | Help Scout Beacon label and external TalentLMS link. | Retain/replace/exclude, account/license/content ownership and contact/access policy. |

**Answer to the map/key question:** Evidence supports Mapbox as the inspected renderer; Google address search appears in a different billing-address form. Rendering, suggestions/geocoding, route/mileage and driver/carrier tracking must each be specified. The [provider guide §3](../thrid_party/10-4-tms-api-access-guide.md) links current token, Places and routing references. Do not request a Google Maps key as a universal solution or assume Mapbox supplies live positions.

**18.3 Carrier inventory, access corrections and current-source limits**

Current carrier integration page has 17 cards and a displayed count12, with a Test quote entry. Historical October9 statuses are dated in the provider guide, not relabeled current. The complete inventory remains A. Duie Pyle, AAA Cooper, ArcBest/ABF, Averitt, Go2, Magnum, Old Dominion, Pitt Ohio, Roadrunner, Saia, Southeastern, TForce, XPO, FedEx Freight, Double D, Sunset Pacific and Warp.

| Important correction / distinction | Current research result | Remaining decision |
| --- | --- | --- |
| ArcBest versus Averitt | ArcBest has its own API-ID process; original guide incorrectly reused Averitt's dashboard. | Obtain appropriate ArcBest account/service entitlements; do not request an Averitt key for ABF. |
| Double D | Carrier-owned pages expose customer services/contact; employment forms are unrelated. | Carrier must provide current integration contract/auth/capabilities; no ready API inferred. |
| AAA Cooper | Current public Web Services FAQ describes logged-in token generation/account association. | Actual client login, token and service tests not performed. |
| Sunset Pacific | Carrier publishes quote/tender/tracking/document API documentation. | Confirm current platform and approved account/test process; old manual-only app status is not provider capability. |
| FedEx Freight | Current Freight technology page links a dedicated Freight developer center; older general FedEx project lacked LTL. | Confirm current product/account migration and Freight provisioning; dedicated center timed out during research. |
| Warp | Public engineering-reference and self-service surfaces use different auth/endpoints. | Select one current product/version and account contract; do not mix API keys or booking/payment assumptions. |
| Old Dominion | Official source schedules SOAP retirement March1,2027; REST catalog available. | Confirm current REST onboarding/QA and each operation, not just auth. |
| Carrier411 | Official pages restrict legacy custom-system/new-customer web-services access and mention upcoming REST onboarding. | Obtain written eligibility/current product confirmation before planning an API dependency. |

All rows link to provider-owned sources in the access guide. Search/support/marketing capability evidence is not an executed schema/authentication test. Costs and launch priorities remain owner decisions; no paid supplier is silently selected.

**18.4 Integration worksheet, failure and privacy requirements**

For each selected capability, fill provider/product/version, app trigger, permitted payload, returned object/external IDs, environment/auth/scopes, client owner, agreement/data rights, quota/cost, transport and webhook/polling behavior. Store only secret references, never secret values. Keep customer/provider identity, quote ID, pickup confirmation, PRO, BOL, invoice/bill and external accounting IDs distinct.

**Acceptance/failure checks:** unsupported or unroutable lane, invalid class/service combination, no rates and partial provider failure, stale quotes, denied account/rate type/credit, timeout after provider accepted a tender, repeated booking, failed cancellation, webhook authentication/replay/duplicates/out-of-order events, location freshness, missing/wrong document, expired key/OAuth consent, disconnected accounting, duplicate bills/invoices, failed sync revision and send bounce. Capture state before/after, provider acknowledgment, audit/history, money/notifications and an approved recovery path.

Proposed implementation controls to review: least-privilege account access, server-side secret storage, tenant/account isolation, restricted public map tokens, redacted logs, authenticated webhooks, safe retry/idempotency and human review of ambiguous external outcomes. These are clone requirements to confirm, not claims about Quote Factory's internal code.

**18.5 Explore and readiness**

Read Settings → Carriers → Carrier integrations, then compare provider names with the detailed access guide. Do not open secret-value editors or submit Test quote against operational accounts. Read Tracking/Compliance/monitoring/link preferences without changing them. Inspect Accounting connection/mapping without Disconnect or account changes. Open official public API guidance for the selected supplier; do not register/pay/sign or send business data as a documentation exercise.

**Delivered:** Corrected existing API guide, all 17 carrier entries, feature/dependency categories, official-source links, secure account/access worksheet, operation-specific failure/acceptance tests and current-versus-historical readiness distinctions. **Pending:** client supplier/launch decisions, contracts, named account owners, sandbox/production access and runtime validation. A manual/internal alternative must be explicitly approved rather than silently replacing an automatic workflow. **Continue reading:** [§19](#settings-reporting) covers settings, access, reporting and shared controls.

**18.7 Live browser/CDP network observations (October 31, 2026)**

The initial browser capture and sanitized request catalog are in [the network evidence JSON](network/quote-factory-network.json). This capture used the logged-in broker Member browser session and CDP Network events around a dashboard reload and a click to [Quotes](https://app.quotefactory.com/broker/quote-history). It did not call or replay an API directly.

| Step | Observed network behavior | Visible result | Limits |
| --- | --- | --- | --- |
| Dashboard reload | Static app assets, /version, current-user GET /me, a CORS preflight, same-origin POST /sentry, Google Fonts resources and a Help Scout Beacon script appeared in the returned CDP event slice. The buffer was marked truncated. | Dashboard displayed a map with Mapbox branding/attribution, KPI links and module navigation. | This page's request inventory is incomplete. The map proves visible Mapbox UI, not which map API/tile endpoints or account are used. /sentry is a same-origin route initiated by a Sentry SDK; its forwarding destination is unknown. |
| Quotes navigation | First-party API GET /accounts/users and GET /quote-requests, each preceded by OPTIONS; both reads returned 200 and both preflights returned 204. Request/response bodies were not retrieved. | Quote history first showed its list shell, then rendered quote rows. | One page load only; no query, search, scroll/pagination, quote detail or result mutation. No response schema or server-side filtering contract inferred. |

**Browser-visible external services:** Google Fonts (fonts.googleapis.com, fonts.gstatic.com), Help Scout Beacon (beacon-v2.helpscout.net), Mapbox (api.mapbox.com, events.mapbox.com), the application’s S3 static asset hostname, Filestack CDN and UI Avatars were network-observed in bounded runs. Sentry JavaScript telemetry posted to the app’s own /sentry route; external forwarding is unknown. TalentLMS is a Training link target and was not opened. Browser-extension-origin requests are excluded as environment noise. These observations describe browser traffic only and do not enumerate server-to-server providers.

The next bounded run opened the blank quote form and one existing quote result. The form load read /provider-integrations (200; OPTIONS 204). The result page read /quote-requests/:id and /provider-integrations, plus /accounts/users, /contacts, /shares, /quote-configs, customer and credit-use routes, provider/account settings and account credit-use/settings routes. Successful GET responses observed were 200, with CORS preflight responses of 204. A set of repeated customer request events did not have matching response events in the drained slice; this remains an observation gap, not an inferred failure or retry rule. Full normalized route counts and outcomes are in the linked JSON.

The result view displayed a pre-existing set of carrier offers and performed reads against the Quote Factory API. No direct carrier-domain rating call occurred in this captured browser step; a provider call made by the app backend cannot be seen from that browser-only evidence. Fourteen static carrier-logo images came from the Quote Factory S3 asset bucket. One image each also loaded from Filestack CDN and UI Avatars; their exact product roles are unconfirmed. Do not treat a displayed offer, provider configuration read or logo as proof of a live direct carrier integration.

The clean Dashboard capture separately confirmed Mapbox style, terrain/street source metadata, sprite, glyph/font and map-session GETs (200), plus two telemetry POSTs to events.mapbox.com (204). Dashboard API reads for shipments, shipment/quote status summaries, system messages and events returned 200 after 204 preflights. Request-to-response event elapsed times and normalized paths are listed in run QF-2026-10-31-003. The timings are a single browser observation, not a provider service target. These requests establish a Mapbox basemap dependency; no Directions, distance matrix or geocoding call was observed in this dashboard load.

**Shipment list/detail/docs follow-up:** Opening the shipment list and its filter panel showed status/equipment/date/address/carrier/customer/team filters and distinct carrier/customer lookup routes. The list route returned rows for the Active and All views; exact rows and counts were excluded. Opening a shipment detail produced successful 200 reads for `/shipments/:id`, `/contacts`, `/historical-dispatches`, `/customers/:id`, `/customers/:id/credit-usage`, `/quote-configs`, `/notes/shipment/:id`, `/events`, `/shares`, `/terms` and `/users/settings/account` after observed 204 preflights (see run QF-2026-10-31-004). Opening Documents produced successful reads of `/shipments/:id` and `/shipments/:id/document`, also after 204 preflights. The browser loaded document previews via `cdn.filestackcontent.com` from a Quote Factory S3 document host. The preview paths were opaque and are omitted; no signed URLs or document contents are retained. This adds evidence for Filestack as the document-preview delivery layer, while its upload/signature/retention responsibilities remain unknown.

The Carriers/Vendors/All list routes were then inspected read-only (run QF-2026-10-31-006). Their respective API reads were `/known-vendors`, `/custom-vendors` and `/vendors`; returned GETs were 200 after 204 preflights. The initial shell briefly presented a no-results message before data arrived, so it is documented as loading behavior, not the final empty state. Request-event multiplicity exceeded the paired successful responses; no retry/cache explanation is inferred. No result count or provider record data is stored.

The local JSON intentionally contains no credentials, headers, payload values, customer/carrier names, shipment IDs, contact/address data, query values, signed links or binary responses. It keeps safe method/path/status and collection limitations. No screenshot files have been saved yet; the live viewport included production business data. **Next capture:** inspect read-only shipment editing fields and the remaining carrier/vendor, accounting, report and setting pages, then map failure/loading/empty states and permissions with safe test access. Keep draining CDP events for each recorded UI step. Save only redacted screenshots linked to their route/section.

<a id="settings-reporting"></a>
**19\. Settings, access, reporting and shared controls — Phase 8**

**Purpose:** Understand the configuration above individual customers and shipments, identify who can see or change it, and trace operational records into reports. Evidence E-99–108 was collected October 26, 2026. The current session identifies its user as **Member**; visible controls do not prove permission to submit changes. Owner/customer/carrier portal variants remain unavailable.

**19.1 Configuration hierarchy and navigation**

Open [Settings](https://app.quotefactory.com/broker/settings). Company-level defaults sit above customer/provider-specific preferences and individual shipment values. The exact precedence and when defaults are copied versus inherited must be tested; do not assume a global change rewrites old shipments.

| Open this URL / click | What is visible | Interpretation and remaining rule |
| --- | --- | --- |
| [Profile](https://app.quotefactory.com/profile) | Photo control; Member role; First name, Last name, Email, Phone; disabled USA country selector; initially disabled Save; Change password; Log out. | Personal identity, distinct from brokerage identity. Password/photo/profile saves were not tested. Credential changes should be completed by the account holder. |
| [Company](https://app.quotefactory.com/broker/account) | Company information/reference, name, billing/legal identity, address, billing contact, phone and logo. No edit/save controls exposed in sampled view. | Do not infer Owner edit controls or automatic document regeneration. Actual contact/account identifiers omitted here. |
| [Users](https://app.quotefactory.com/broker/users) → own user | Owners and Members groups; selected own user dialog says Member; Owner checkbox disabled and unchecked; contact/company information and Logout. | Role label is verified. Invitation, deactivation, ownership changes and server-side authorization are untested; no access was changed. |
| [Teams](https://app.quotefactory.com/broker/teams) | “No teams quite yet!” | Empty state, not proof teams are unsupported. No creation flow exposed in this Member session. Team/rep commission and visibility rules require administrator review. |
| Settings → Notifications | “Choose in-app notification alerts to receive:” and “No sources configured.” | This dialog concerns in-app sources. It does not prove shipment email/SMS notifications are globally disabled. |
| [External references](https://app.quotefactory.com/broker/settings/external-references) → + Add external reference | Empty list; definition form described below. | Defines cross-system identifiers; does not itself establish a working integration. |

**External-reference field dictionary:** Name combobox identifies the reference type; Code is a separate input. Customers, Vendors/Carriers, Contacts, Addressbook Entries and Shipments are entity checkboxes, initially checked in the new form, each with a URI Template input. Ensure unique values is initially checked; Save is exposed. No definition was saved. Template placeholders, escaping, whether uniqueness is global/per tenant/per entity, case sensitivity, duplicate errors and whether existing records are backfilled need an integration/admin test. Never paste API secrets into reference values or URI templates.

**19.2 Carrier settings and document defaults**

Open [Carrier settings](https://app.quotefactory.com/broker/settings/carriers). Carrier integrations and Tracking/Compliance/monitoring/ClassIT+ are mapped in [§18](#third-party-requirements) and the [API guide](../thrid_party/10-4-tms-api-access-guide.md); configuration visibility is separate from connectivity and readiness.

| Page / control | Observed setting or explanation | What to confirm before cloning |
| --- | --- | --- |
| [Carrier T&Cs](https://app.quotefactory.com/broker/settings/carriers/termsandconditions) | Public agreement link; checked disabled Request carrier packets and Require carriers to agree to terms; configured T&Cs and Request change. UI says a packet request is automatically sent when covering with an unapproved carrier. | Client-owned legal text, version, recipient authority, acceptance evidence and the exact definition of unapproved. Request change was not clicked; public agreement URL omitted to avoid redistributing account access. |
| [Rate confirmations](https://app.quotefactory.com/broker/settings/carriers/ratecons) | Terms & Fees; unchecked disabled Show shipment value on rate con; Rate con email settings. | Do not copy this account's commercial terms as clone policy. Confirm amounts, allowed edits, approvals, revision history and which documents include shipment value. |
| Rate con email settings | Email address and Phone inputs, USA selector, Save. Blank values default to contact information of the person who covered the load. | Overrides versus per-load sender, reply routing, permissions, delivery/bounce behavior and audit. Dialog closed without Save. |
| Rate-confirmation change timing | Explicit UI text: changes apply to future shipments only; previously covered shipments must drop carrier before new terms apply. | This is the observed instruction, not a tested amendment process. Never drop a live carrier as an exercise. Confirm safe revision/reacceptance and accounting effects in test records. |

**19.3 Customer defaults, limits and visibility**

Open [Customer settings](https://app.quotefactory.com/broker/settings/customers), then the named card. Customer-specific preferences are described in [§12](#master-records).

| Card / form | Fields and observed state | Meaning / limit of evidence |
| --- | --- | --- |
| Margin defaults and limits → Global | LTL and Truckload each have Default gross margin %, Minimum gross margin %, Minimum gross profit $, Maximum gross profit $. Defaults displayed 25%; minimum/maximum inputs blank. LTL Volume boost has a selector. | Starting price rule versus lower/upper boundaries. Blank is an observed blank, not proof of zero/no limit. Enforced behavior, override permissions and volume-boost units remain open. Use §14 pricing arithmetic; margin and markup have different denominators. |
| Margins and limits → LTL carriers | Per-carrier/rate-source default margin, minimum margin/profit and maximum profit; Volume multiplier heading. Carrier/account identifiers can accompany rows. | More granular pricing configuration. Precedence between global, customer and carrier rules, volume multiplication and recomputation of saved offers need a test. Do not treat account identifiers as NMFC values. |
| Reveal carrier names → Hide carrier names | Hide LTL Carrier Names unchecked/disabled; help says hiding affects shared LTL quote name/logo but still shows on BOL and shipment details. Hide TL carrier names checked/disabled; help says hide name/USDOT/MC on BOL. | The index summary “Carrier names are visible” is insufficient to describe both modes. Document the mode-specific options. Recipient PDF/portal behavior remains untested. |
| Customer login | Described as allowing customers to log in, run quotes and track shipments; Login link copy control; Auto-quote / dispatch text. | Link presence does not prove identity, tenant isolation, auto-dispatch triggers or customer permissions. No login link copied/shared and no alternate portal entered. Administrator must provide test access and policy. |
| Credit limits | Enforce credit limits Disabled. Help: block new bookings when open invoice balances plus active shipments exceed the customer's credit limit; limits configured per customer. Notify on credit increase Disabled; help says email all customer reps when increased. | UI-described intended rule, not a tested ledger calculation. Define active shipment valuation, equality boundary, currency, disputed/factored balances, concurrency and override rights with accounting. |
| Customer visibility | Disabled checkbox. Help: enabled restricts viewing/running quotes to customer reps; disabled gives users all customer records. | UI-described rule; actual API/export/search access and team inheritance require alternate-role tests. This must not be assumed to define customer-portal access. |

No setting was changed and no Done/Save operation was used to submit edited data. Some configuration forms may save as values change; inspect safely without typing into operational settings until the save model is established.

**19.4 Observed role × action matrix**

Read each cell as evidence, not a proposed permission grant. Owner and external-user columns require accounts supplied by the administrator; named reviewer still awaits SC-04.

| Action / information | Current Member session | Owner / other staff | Customer / carrier / driver |
| --- | --- | --- | --- |
| Navigate customer/provider/quote/shipment records | Observed for sampled records | Unverified | Unverified |
| Open quote, create/edit shipment and tracking forms | Observed controls; submit effects untested | Unverified | Unverified |
| View broker cost, price and profit | Observed on sampled broker detail/results | Unverified | Unverified; never infer from broker UI |
| View customer/carrier PDFs | Observed previews and links (§17); recipient access untested | Unverified | Separate document audience/access tests required |
| Hidden contacts/private notes | Controls/help observed (§§12–16); all recipient views untested | Unverified | Unverified |
| View accounting and payment forms | Observed; approval/payment/send/sync untested | Unverified | Unverified |
| Open reports / Download control | Observed filters/columns/control; output untested | Unverified | Unverified |
| Change role / create team / edit company | Owner checkbox disabled; empty Teams; no company edit exposed | Administrator walkthrough required | Unverified |
| Change settings / enforce limits | Forms and disabled options observed; no changes submitted | Administrator walkthrough required | Unverified |

For each approved clone role, agree **view/create/edit/delete/export/send/approve/pay/administer**, record scope (own/team/all), financial and contact visibility, and denial behavior through both UI and API. These are requirements to specify, not an inferred Quote Factory backend policy.

**19.5 Reports: analytics versus saved data exports**

Open [Reporting](https://app.quotefactory.com/broker/reports). Names below are observed account configuration, not a guaranteed standard catalog. Each data export opens Filters (carrier report uses singular Filter), Columns and Download with a matching-record count. Name this report was disabled. Column label/reorder/remove controls were visible; no definition was modified. A name such as “LTL Report” does not prove an LTL filter is active.

| Report / open URL | Observed definition on October 26 | Columns / interpretation |
| --- | --- | --- |
| [Lanes](https://app.quotefactory.com/broker/reports/lanes) | Analytics map/table; Pickup this week; Origin, Destination, Shipments, Profit, Profit per; View shipment filters. | 25 shipments, $2,195 profit, $87.80 per shipment in sampled total. 2 shipments/$800/$400 in one row supports profit per = profit ÷ count for that sample; exact accounting source/grouping and zero-cost behavior unverified. |
| [Carriers](https://app.quotefactory.com/broker/report/carrier/66b25694252d3745de9e4a20) | Search, Added date range/presets, Requires 1099 checkbox; Download count 3,815. | 10: Name, USDOT Number, MC Number, Phone, HQ City, HQ State, Compliance Status, Primary Contact, Primary Contact Email, Primary Contact Phone. Tax classification is a filter, not advice about eligibility. |
| [Customers](https://app.quotefactory.com/broker/report/customer/66b25694252d3745de9e4a1e) | Search and Rep selector; customer-list preview; Download count 136. | 10: Name, Website, Phone, Description, Primary Contact, Primary Contact Email, Primary Contact Phone, Shipments, Last Booked Date labeled Last Shipment Date, Last Note Date. Count/status inclusion and date timezone require review. |
| [LTL Report](https://app.quotefactory.com/broker/report/shipment/68dbd5da8121319eec786c1b) | No status/equipment checkboxes selected in sampled view; Download 7,873 shipments. | Common 14-column shipment selection below. Its title alone does not restrict records to LTL. |
| [LTL Report - QF](https://app.quotefactory.com/broker/report/shipment/68dee1505114202e13262523) | LTL selected; Requested, Booked, Scheduled, In transit, Delivered selected; Canceled unselected; Download 949. | 48 selected fields, emphasizing freight/class/accessorial data; full selection below. |
| [Monthly Margin](https://app.quotefactory.com/broker/report/shipment/66df69b0dbd3ecbbc65414bf) | Deliver this month, October 1–31, 2026; Download 344; no status restriction selected. | 48 selected shipment fields below. It is a filtered export definition, not proof that every row is delivered/paid or that the UI shows a monthly accounting aggregate. |
| [Shipments](https://app.quotefactory.com/broker/report/shipment/66b25694252d3745de9e4a1c) | No status/equipment checkboxes selected; Download 7,873. | Common 14-column selection. |
| [Shipments copy](https://app.quotefactory.com/broker/report/shipment/68dbd5d18b0d44a62537f414) | Same observed filters/count as Shipments. | Same observed 14 selected fields; no hidden-definition equality claimed. |
| [Shipments copy 2](https://app.quotefactory.com/broker/report/shipment/68dee141d871c302ce750811) | Same observed filters/count as Shipments. | Same observed 14 selected fields. |

**Common 14 selected shipment columns, in order:** Equipment; Carrier (field Carrier Name); USDOT; MC Number; Cost; Price; Profit; Margin; Pickup Date; Delivery Date; Origin Postal Code; Destination Postal Code; Total Weight; Mode.

**Monthly Margin 48 selected columns, in order:** BOL; Status; Customer; Primary Rep; Mode; Equipment; Partial; Carrier (Carrier Name); USDOT; MC Number; Carrier Source; Carrier Quote Number; Service Level; Transit Days; PRO Number; Cost; Price; Profit; Margin; Booked Date; Booked By; Covered Date; Covered By; Pickup Date; Delivery Date; Origin Company; Origin Street; Origin Street 2; Origin City; Origin State; Origin Postal Code; Origin Country; Origin Reference Number; Destination Company; Destination Street; Destination Street 2; Destination City; Destination State; Destination Postal Code; Destination Country; Stopoffs Count; Destination Reference Number; Distance In Miles; Total Units; Total Weight; Hazmat; URL; Shipment ID.

**LTL Report - QF 48 selected columns, in order:** BOL; Mode; Status; Distance In Miles; Carrier Name; USDOT; Equipment; Cost; Total Units; Total Weight; Total Length; Origin Appointment Required; Origin Liftgate; Origin Inside; Destination Appointment Required; Destination Liftgate; Destination Inside; Notify Before Delivery; Sort & Segregate; Protect from Freezing; Freight Class 1; NMFC 1; Length 1; Width 1; Height 1; Weight 1; Description 2; Freight Class 2; NMFC 2; Length 2; Width 2; Height 2; Weight 2; Description 3; Freight Class 3; NMFC 3; Length 3; Width 3; Height 3; Weight 3; Origin City; Origin State; Origin Postal Code; Origin Location Type; Destination City; Destination State; Destination Postal Code; Destination Location Type. The absence of Description 1 in this saved selection is an observation, not an instruction to omit it from the clone. Indexed fields do not prove a maximum of three handling units.

**Shipment filter dictionary:** search; Requested/Booked/Scheduled/In transit/Delivered/Canceled; equipment (LTL and truckload equipment types from §14); Booked/Pickup/Delivery date ranges and Today/Yesterday/This week/Last week/This month/Last month/This year/Last year presets. Pickup/delivery also expose Tomorrow/Next week/Next month. Origin address, Destination, Carrier, Customer, Rep, Booked by and Covered by selectors. Lanes exposed Booked through Delivered states and See shipments. Selected relative range “this week” resolved to October 25–31 in this session; timezone, boundary inclusion, week-start policy and persistence remain to confirm.

**Metric/data dictionary:** BOL identifies broker shipment reference; Shipment ID is a separate internal identifier; Mode and Equipment differ; carrier source/quote/account/PRO references differ. Cost, Price, Profit and Margin are explained in §§8/14/15, but exported inclusion of added vendor charges, factoring, credits/taxes and booked-versus-current values needs reconciliation. Date catalog distinguishes original, scheduled and actual pickup/delivery plus booked/covered events. Do not substitute one for another based on a short label. Columns catalog separately exposes invoice/bill totals, due dates, balances, approvals, paid flags, factoring and pushed-to-accounting flags; these are separate states (§17). Per-mile/per-lb metrics need zero/blank distance/weight tests. Carrier Compliance Status is not proof of an approved dispatch decision.

**Download verification pending:** No report was downloaded or edited during this pass. File format, encoding, date/number formatting, blank values, rounding, row grain (shipment/item/stop), streaming/pagination, complete row count, permissions, sensitive fields and repeatability remain an owned reporting test. Reconcile exports to known test records and accounting before approving metrics. Never assume the eight preview rows are the entire export.

**19.6 Shared controls, empty states and external help**

| Control / behavior | What was actually checked | Follow-up |
| --- | --- | --- |
| Find … → Go to... | Recently visited mixes customers, shipments, quotes and providers; known BOL navigation E-28. Fictional search QFDOC-NOMATCH-20261026 settles to “No matches found for …”. | Match fields, minimum length, keyboard behavior, pagination and permission filtering across roles remain unverified. Close modal returns to current page. |
| Lists and filters | Shipment filters/sort appear in URL (E-62); examples use mode/status/pickup sort. Report previews expose a count separate from visible results. | Refresh/back/new-tab/session persistence and all pagination/loading states need controlled tests. Do not document a universal page size. |
| Loading / empty / failure | Forms/reports can initially appear before fields/results settle. Empty Teams/external references/notification sources and no-match search observed. Quote provider failures documented §14. | Loading is distinct from no data. No network outage or operational failure was deliberately induced; timeout/retry/duplicate-submit UX and accessible errors remain test cases. |
| Units/time | Freight uses cf, pcf, lb and feet/inches in sampled summaries; appointment/ETA dialogs expose timezone context (§16). | Confirm account/browser/local-stop timezone and daylight-saving handling, currency and conversion/rounding per field; never infer a global UTC rule. |
| Support | Contact support opens Help Scout Beacon with Search and Ask Us. Ask Us shows Subject, How can we help?, attachment and Send a message; response-time text is informational. | No message/attachment sent. Client chooses support provider, recipients, retention and whether it is in clone scope. |
| [Training](https://quotefactory.talentlms.com/) | Opens external TalentLMS; existing session reached Learner dashboard with courses TL vs. LTL, LTL 101 The Process Parts 1/2 and LTL Pricing Factors Part 1, plus catalog/progress/discussions/calendar. | Training progress/authentication differs from broker Member role. No course launched, enrollment or message submitted; contents/licensing and SSO contract unverified. |

**19.7 Questions for the team lead/client and a safe learning exercise**

Administrator/access reviewer: define roles, team/customer scope, invitations/removal, authentication and export rights. Pricing reviewer: sign off precedence, volume boost, margin limits and override behavior. Accounting/reporting reviewer: define profit/cost timing, booked/current/paid metrics, relative dates and reconciliation. Operations/legal reviewer: approve carrier terms, packet trigger, amendments and communication ownership. Integration reviewer: own external-reference identifiers and provider environments. These roles are proposed owners, not appointed reviewers.

Ask the client for migration source/volume and record/document history, audit events and retention, backup/restore targets and evidence, expected concurrent users/quotes/shipments/export sizes, response-time targets, tenant isolation, allowed regions and support responsibilities. Nothing in the UI proves Quote Factory's database, backup design or performance guarantees. Record answers under SC-01–12; resolve or explicitly defer them before treating this as an implementation contract.

**Try it yourself, read-only:** Open Settings → Users → your own user and note the role. Open Customer settings → Reveal carrier names and compare LTL/TL help. Open Reporting → Monthly Margin → inspect Filters, then Columns. Return to Reporting → LTL Report and check whether LTL is actually selected. Open Lanes and compare Profit per with Profit ÷ Shipments in one nonzero row. Use Find … with a fictional unmatched string, then close. Do not edit configuration, send messages, download business data to shared storage, or submit operational changes as part of this exercise.

**Delivered:** Accessible settings hierarchy, field dictionaries, observed Member matrix, all nine reporting destinations, selected export schemas, shared empty states and support/training handoffs. **Pending:** administrator/portal variants, setting/save/notification effects, export files and metric reconciliation. **Continue reading:** [§20](#walkthroughs-acceptance) connects walkthroughs, acceptance scenarios, remaining gaps and the sign-off handoff.

<a id="walkthroughs-acceptance"></a>
**20\. Connected walkthroughs, acceptance scenarios and final review — Phase 9**

**Purpose:** Follow a shipment from business request to operational work and accounting, using the earlier chapters as the field/button reference. This chapter is also a test/review workbook for the clone. **It is not a record of seven passed end-to-end tests.** Existing-record navigation was replayed read-only as the Member user on October 26 (E-109); mutation, external-role and provider tests still require SC-03/04/05/07. All client scope choices remain pending. No signed-off implementation specification is claimed.

**20.1 Choose learning mode or validation mode**

In **learning mode**, open existing authorized records and read forms/previews. Stop before Save, Update, Get quotes, Book, Cover, Send, Approve, Pay, upload, cancellation or configuration changes. Some settings may save immediately on change, so do not type into settings as an experiment. Existing examples show records at different stages; they do not form a single tested transaction chain.

In **validation mode**, the administrator must first identify the environment, disposable records, allowed operations and suppressed external effects. Use reviewer-approved fictional customer/provider/freight data and sandbox recipients. Capture the starting state, exact action/input, saved result, permissions, audit/timeline, generated documents, recipients and provider/accounting acknowledgments. Check retry/duplicate handling. An enabled button or form opening is insufficient evidence that a save, tender, notification or payment succeeded. Actual financial transfers and contract acceptance require the responsible human's action/approval; documentation does not require performing them against live business records.

| Before running a submitted scenario | Evidence required | Proposed owner / current state |
| --- | --- | --- |
| Scope and business rules | Included release/use-case IDs, permitted deviations and agreed expected outcomes | Product owner/operations/pricing/accounting; SC-01/02/06/08/09 open |
| Test environment | Exact URL, disposable record IDs, reset procedure, permissions and suppressed email/SMS/tenders/sync | Administrator; SC-05 open. The user explicitly confirmed these requested inputs unavailable October 26 (D-01). |
| Role accounts | Named broker/admin/customer/provider roles with separate sessions and expected view/edit/export rights | Administrator; SC-03/05 open; only Member broker view inspected |
| External test access | Selected provider/product/version, sandbox contract, test credentials via secure channel, failure fixtures | Integration/account owners; SC-07 open |
| Review and evidence | Named reviewer/date, redacted evidence location, observed versus expected result, defect/decision link | Team lead; SC-04 open; reviewer roles below are proposals |

**Test result vocabulary:** Not run; Read-only navigation observed; Passed (submitted action and all expected effects verified); Failed (actual differs); Blocked (required environment/account/rule absent); Excluded (only with dated client decision). Never turn an unexecuted case into Passed because its steps are written.

**20.2 W-01 — New customer to LTL delivery and accounting**

**Actors:** Broker staff, customer/authorized requester, pricing/operations, selected LTL carrier, pickup/delivery parties and accounting. Intake by phone/email/website is not established by the app; operations must confirm SC-06. **Entry:** [Customers](https://app.quotefactory.com/broker/customers), then [Quote](https://app.quotefactory.com/broker/quote). **Use cases:** CUS-01–11; QTE-01–12; SHP-01/02/05–12; DOC-01–04; ACC-01–05; related API/setting cases below.

| Step / exact navigation | Inputs and responsible actor | Expected checkpoint to validate | Learning stop / reference |
| --- | --- | --- | --- |
| 1. Customers → Add a new customer | Broker: approved test customer name | Create one customer, handle duplicate suggestions; verify identity and required fields | Open dialog only; §12.2 |
| 2. Customer → Contacts, billing, Manage reps, Addresses, Booking & quoting | Broker/accounting: contacts, payer/terms, credit, reps, template and agreed pricing | Saved master data, correct inheritance and record visibility; no unintended update to old shipments | Read existing customer only; §§12–13 |
| 3. Quote → customer/contact → equipment LTL → pickup date | Broker: customer, dates and authorized request | Correct defaults/contact; invalid or unavailable date explained | Field dictionary §14.2 |
| 4. Origin/destination/services → handling units | Broker/shipper: outer packaged dimensions, quantity, total weight, units, commodity, class/NMFC, services | Verified measurements and class owner/source; correct service eligibility; no guessing a class from account codes | §§9,14.3–5; classification is not merely a density lookup |
| 5. Get quotes → compare offers/details | Broker: complete request | Each provider success/failure distinct; comparable service, cost, transit/guarantee, expiry and source | Existing results only; §14.6; not a fresh rate/tender |
| 6. Cost/margin/profit/price → Sharing | Pricing/broker: agreed price/guardrails and recipients | Correct money arithmetic, permitted override, customer audience and shared fields; actual sent/received/access states separate | §14.7–8; no Share/send in learning mode |
| 7. Required customer approval/tender → Book | Authorized actor per SC-06 | Agreed approval evidence; one external tender and one linked shipment; carrier response/dispatch identity recorded | Exact approval event and Book eligibility unresolved; do not infer from Confirmation PDF |
| 8. View Shipment → stops/tracking | Operations: pickup/appointment/PRO events | Linked customer/carrier/stops/freight/money retained; correct queue transitions, tracking origin/timezone/freshness | §§15–16; do not click status controls in learning mode |
| 9. Delivery → Documents → POD | Operations/carrier: actual delivery and POD | Correct delivery evidence/status separate from tracking-completed; authorized upload and document audience | §§16–17; no upload or Delivered action |
| 10. Bill / Invoice → accounting queues/payments | Accounting: carrier bill, customer invoice, terms and approved ledger entries | Distinct payable/receivable, approvals, balances/dates, customer/provider payment records and permitted sync | §17; entering a payment record is distinct from moving funds |

**Read-only replay:** [Booked LTL result](https://app.quotefactory.com/broker/quote-results/6ada31e36fac98ba0aa91bcb) → **View Shipment button** → [BOL 1047885](https://app.quotefactory.com/broker/shipment/6ada321dbf56ad5e17c4f8a4) → Documents. On October 26 the shipment retained target cost $867.35, price $1,045 and profit $177.65. The existing status history and carrier tracking messages were visible. This verifies navigation and saved displayed values; no quote creation, booking, delivery or settlement was performed. Current labels/results can change. If the specific example is unavailable, use Quote history → an authorized booked result → View Shipment.

**Acceptance result:** Read-only checkpoints observed in E-51–61, E-65, E-78, E-83–89, E-109. Full W-01 validation **Blocked** by test records, approval/booking policy, provider environment and reviewers; no business sign-off.

**20.3 W-02 — Truckload request, direct shipment and carrier coverage**

**Actors:** Requester/customer, broker, carrier/dispatcher/driver and accounting. **Entry:** [Create new shipment](https://app.quotefactory.com/broker/shipment/new), [Cover](https://app.quotefactory.com/broker/shipments/covering/all). **Use cases:** SYS-03–07; CAR-01–03; SHP-01–13; EDT-01–06; DOC-01/02/04; ACC-01–05.

| Step / navigation | Inputs / actor | Expected checkpoint to validate | Reference / learning boundary |
| --- | --- | --- | --- |
| 1. Request or Create new shipment | Broker: approved customer, equipment, dates/stops, freight, price/target cost | Valid direct entry, unique BOL/internal ID, correct initial status; no assumption all TL requests start with automated offers | §§14,15.4; open form only |
| 2. Cover → shipment/leads | Carrier operations: approved source/candidates and offer history | Leads remain prospects until assigned; counts/source/freshness and eligibility explained | §15.6–7; no posting/contact/assignment |
| 3. Add carrier / select provider and agreed cost | Operations: correct MC/USDOT, contact, equipment and compliance/packet decision | Correct provider identity; explicit approval/exception rule; one assignment; unapproved packet trigger handled | §§12.6,15.7,19.2; no new packet send |
| 4. Carrier Rate con; customer Confirmation | Broker/carrier/customer: agreed terms and recipient | Different audiences/amounts; actual send, receipt and carrier acceptance evidence separated | §17; view existing documents only |
| 5. Appointment, driver & tracking, pickup | Operations/carrier: times/zone, driver/truck/trailer, PRO if relevant | Schedule/pickup states and queues change as agreed; tracking data fresh, consent/access correct | §16; open forms, close without Save |
| 6. Delivery/POD → Bill and Invoice | Operations/accounting: actual delivery/documents and charges | Shipment progress, documents and accounting reconcile independently | §§16–17; no confirmation/payment actions |

**Example lesson:** [Booked/uncovered shipment](https://app.quotefactory.com/broker/shipment/6accf55afcc298c7a4311d79) or an accessible Cover row shows why Booked does not itself prove a carrier is assigned. For assigned carrier detail use [BOL 1046693](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4). Treat record links as examples, not disposable fixtures.

**Acceptance result:** Existing forms/assigned versus candidate relationships observed E-62–76, E-89. Direct creation, covering, rate-con acceptance, packet sending and transitions **Not run / blocked for submitted validation**; operations must confirm the exact dispatch and queue rules.

**20.4 W-03 — Additional service vendor and separate charges**

**Actors:** Broker, service vendor (for example warehouse/crane/lumper), carrier/customer and accounting. A vendor supplies a service; a carrier transports freight. A provider may need more than one business type (§12.7). **Use cases:** VEN-01–03; SHP-06/07; EDT-05; ACC-01–05; SET-10/API-03.

| Step / navigation | Inputs / actor | Expected checkpoint to validate |
| --- | --- | --- |
| 1. Carriers → Vendors / Create new vendor → Vendor | Operations: approved test vendor identity/type/billing/remit-to/contact | Correct provider type, required fields, duplicates and saved accounting preferences; not forced into MC/USDOT carrier workflow |
| 2. Shipment → Add another vendor | Operations: required service type, selected vendor and service scope | Vendor/service record linked separately from transporting carrier; assignment workflow and cost owner confirmed |
| 3. Financial/itemized view / Cost & price | Pricing/accounting: approved service cost and customer charge | Separate charge lineage; total cost/price/profit reconciled; clarify included-in-freight versus additional charge and tax/markup |
| 4. Vendor bill / customer invoice | Accounting: actual service bill, terms and agreed customer treatment | Correct provider payable and customer receivable; no double charge or incorrect carrier-bill merge; permitted sync mapping |

Read-only entry points/forms are in §§12.7/15/17. Complete vendor assignment and downstream multi-provider charge behavior were not established. **Acceptance result: Blocked** pending test service record and accounting/operations rule; do not use a fictional successful charge flow as an observed product claim.

**20.5 W-04 — Multiple freight groups and stops**

**Actors:** Broker/shipper, dispatch and pickup/delivery contacts. **Use cases:** CUS-09; QTE-03–07; SHP-08/11; EDT-03/04; DOC-04; API-02.

| Step / navigation | Test inputs to agree | Expected checkpoint to validate |
| --- | --- | --- |
| 1. Quote or direct shipment → location/template | Two pickup/delivery stops plus an approved intermediate stop; local hours, contacts and instructions | Stop order/type and service requirements retained; template copy versus live-link behavior explicit |
| 2. Add item / more handling units | Group A: two units 48×40×48 inches, total 1,000 lb; Group B: one unit 48×48×48 inches, total 600 lb | Group A volume106.6667cf; B64cf; total170.6667cf; combined density1600/170.6667=9.375pcf before display rounding. Confirm total-weight semantics before using this oracle. These are fictional calculations, not submitted app results. |
| 3. Units, stackable, layout, length | Equivalent approved metric inputs; stackability, rotation and usable vehicle width/height | Physically appropriate layout; total volume/density aggregated correctly; no assumption linear length equals summed item length or decreases just because stackable is checked |
| 4. Appointments/dates, reorder stop | Valid/invalid date sequence, each stop's zone, daylight-saving boundary fixture | Coherent route and appointments; wrong dates/units explained; multi-stop mileage and contacts preserved |
| 5. Save → documents/rating/tracking | Same approved request once validated | Correct item/stop counts and units on BOL, rate con, quote and tracking; rerating/extra-stop charges documented; no hidden truncation by export's indexed fields |

**Acceptance result:** One unsaved two-pallet visualizer example E-54 and saved two-group summary E-74 support limited arithmetic; full mixed-unit/multi-stop save and downstream behavior **Not run / blocked**. Do not derive the correct freight class from this example without commodity/NMFC review.

**20.6 W-05 — Edit after coverage and follow downstream consequences**

**Actors:** Operations, pricing, carrier/customer and accounting. **Use cases:** EDT-01–07; SHP-07–13; DOC-01–04; ACC-02–05; SET-07/09/10/11.

| Step / navigation | Inputs / actor | Expected checkpoint to validate |
| --- | --- | --- |
| 1. Compare uncovered, covered, scheduled and delivered fixtures → Edit shipment | Same documented role; before-state values and artifact versions | Explicit field/state/role editability matrix; observed Partial lock after coverage is only one rule, not complete authorization |
| 2. Attempt approved change | Stops/dates/contact/item dimensions, cost/price and allowed equipment requirement | Required validation, consistent units/dates, permissions and controlled save; establish autosave versus Update shipment |
| 3. Hide contacts / Send updated documents → Rate Con | Reviewer-approved audience, change reason and resend choice | Correct contact visibility, document revision/version, intended recipients, delivery and reacceptance requirements |
| 4. Update shipment | One permitted test update, then duplicate/retry fixture | One saved revision; rerating or provider amendment only as agreed; queue/tracking/appointment effects and actor/time audited |
| 5. Compare downstream records | Before/after BOL, customer confirmation, rate con, invoice/bill, reports and provider acknowledgment | No stale contradictory documents/amounts; preserve prior versions and accounting reconciliation according to approved policy |

**Acceptance result:** Editor/dialog states E-76–82/E-92 and rate-con configuration timing E-101 observed. Actual updates/resends/rerating/accounting consequences **Blocked** by designated test environment and rule approval. Do not drop a live carrier to apply new global terms.

**20.7 W-06 — Exceptions, retries and recovery**

**Actors:** Operations, integration support, accounting and administrator. **Use cases:** QTE-08–12; SHP-04/09/10/13; EDT-07; DOC-03/04; ACC-01–05; API-01–03; SYS-02.

| Exception case | Trigger only in approved fixture | Acceptance evidence required / recovery question |
| --- | --- | --- |
| X-01 No rates / one carrier fails | Unsupported lane/service; deterministic provider failure | Separate provider failure from zero offers/loading; keep successful offers; error explanation and retry without double request |
| X-02 Expired quote / old pickup date | Known expired quote and changed-date fixture | Correct expiry/date rule, refresh/rerate path, retained request; no claim a disabled Book cause is known without evidence |
| X-03 Timeout after tender accepted | Provider sandbox accepts but response delayed/lost | Query acknowledgment before retry; one external booking/one shipment; manual review if outcome ambiguous |
| X-04 Reassignment / cancellation | Approved covered and uncovered fixtures | Eligibility, confirmation, provider cancellation acknowledgment, cost/fees/terms, status/queue/document history and invoice effects |
| X-05 Tracking failure or stale/off-route point | Sandbox stale feed, missing position and wrong-order events | Timestamp/source/freshness visible; no false delivered state; manual update provenance and later event reconciliation |
| X-06 Missing/invalid/duplicate documents | Approved harmless test file with unsupported size/type or duplicate | Allowed types/limits, clear failure, no partial attachment/duplicate send, visibility and retention correct |
| X-07 Dispute / overdue / payment correction | Approved ledger fixture and reviewer's rule | Dispute does not silently equal unpaid/canceled; due-date/aging basis, approval and correction trail; no actual money movement |
| X-08 External sync / webhook failure | Expired sandbox access, duplicate/out-of-order callback, mapping rejection | Auth/replay protection, safe retry/idempotency, correct external IDs/revision, visible failure and reconciliation |
| X-09 No search matches / access denied | Fictional unmatched string; separate restricted-role fixture | No-results distinct from denied/loading; no cross-customer record/financial leak in search/export/direct URL |

**Acceptance result:** Historical partial-rate failures E-57 and no-match search E-107 observed; all failure injection, cancellation/reassignment, dispute/retry and external outcomes **Not run / blocked**. Status/menu controls must not be clicked speculatively on operational records.

**20.8 W-07 — Role, settings, report and portal variations**

**Actors:** Administrator, Member/other staff, customer and any client-selected carrier/driver role. **Use cases:** SYS-01/02/08–11; CUS-05/07/11; all SET/RPT/API cases.

| Step / navigation | Fixture / actor | Expected checkpoint to validate |
| --- | --- | --- |
| 1. Record role → assigned customer/team | Separate accounts and included-role permission matrix | View/create/edit/export/send/approve/pay/admin actions enforce own/team/all scope through UI and API |
| 2. Customer visibility / private notes / Hide contacts / carrier-name hiding | Two customers, different reps/teams and broker/customer/provider sessions | Customer boundary, cost/profit/contact and document audiences match policy; direct URL and export cannot bypass restrictions |
| 3. Settings precedence/limits | Global, customer, carrier overrides; minimum/equality/maximum values; credit limit boundaries | Effective defaults, required overrides, old-versus-new shipment effects and concurrent booking enforcement; no negative/zero arithmetic ambiguity |
| 4. Reporting → each named report → Filters/Columns/Download | Known test set across dates/statuses, zero cost/weight, multiple stops/vendors and accounting states | Date basis/timezone, row grain, counts/totals/precision and complete files reconcile; no hidden permission leak; report name alone does not define filter |
| 5. Training, Support, Profile, users/teams, references/notifications | Approved administrator walkthrough, sandbox recipients and external test account | Correct handoff/SSO, user lifecycle, immutable audit evidence, reference uniqueness/templates and delivery effects; no real credential changes as automated test |

**Acceptance result:** Current Member label/controls and report definitions E-99–108 observed. Owner/customer/carrier/driver variants, export files and submitted settings **Blocked** until access and expected permissions are supplied. A course Learner session is not evidence of broker administrative access.

**20.9 Use-case-to-scenario traceability and unresolved work**

This table covers all **89 inventory IDs** without silently excluding any feature. It identifies where to read and where to test; it is **not** a reviewed acceptance result. Each ID's remaining specifics stay in the [Coverage Register](Documentation%20Coverage%20and%20Open%20Questions.md), which is the authoritative item-level gap list. Each scenario must be expanded with approved inputs/expected results before execution.

| Inventory IDs | Main field/workflow reference | Acceptance scenario(s) | Reviewer role / current gate |
| --- | --- | --- | --- |
| SYS-01–02 | §§6,11,19.6 | W-07, X-09 | Operations/admin; counter/search/role rules open |
| SYS-03–07 | §§6,15.2,16 | W-01/02/06 | Operations; request/dispatch/queue transitions untested |
| SYS-08–10 | §19.1/6 | W-07 | Admin/training/support; changes/external contract untested |
| SYS-11 | §19.4 | W-07 | Admin; alternate portal access blocked |
| CUS-01–04 | §12.1–3 | W-01/07 | Sales/operations; create/edit/contact/duplicates pending |
| CUS-05–07 | §12.4–5,19.3–4 | W-01/07 | Pricing/accounting/admin; rep/default/limit effects pending |
| CUS-08–11 | §§12.5,13,17 | W-01/04/07 | Operations/accounting; linked history/template/document effects pending |
| CAR-01–03 | §12.1/6,15.7 | W-02/06/07 | Carrier operations; identity/import/compliance/onboarding pending |
| VEN-01–03 | §12.7,15,17 | W-03 | Operations/accounting; complete additional-vendor flow pending |
| QTE-01–03 | §14.1–3 | W-01/02/04 | Pricing/operations; subtype/date/location and input requiredness pending |
| QTE-04–07 | §14.4–5,16.4 | W-01/04 | Pricing; quantity/class/unit/layout rules pending |
| QTE-08–09 | §14.6 | W-01, X-01/02 | Pricing/integration; live rating/source/eligibility pending |
| QTE-10–12 | §14.7–9 | W-01/02, X-02/03 | Pricing/operations; save/share/approval/booking pending |
| SHP-01–04 | §15.2–4/6–7 | W-01/02/06 | Operations; list/paging/direct creation/coverage pending |
| SHP-05–07 | §15.5/8 | W-01/02/03/05 | Operations/accounting; status/provider/financial changes pending |
| SHP-08–10 | §15.9,16.6–9 | W-01/02/04/06 | Dispatch; appointment/event/source/transition tests pending |
| SHP-11–13 | §15.10–11,16 | W-04/05/06 | Operations/integration; map/notes/menu/exception tests pending |
| EDT-01–02 | §16.1–3 | W-05/07 | Operations/admin; role/status locks and equipment effects pending |
| EDT-03–04 | §16.4 | W-04/05 | Operations; stop/item save/propagation pending |
| EDT-05–06 | §16.5/10,17 | W-03/05 | Pricing/accounting; charges/contact/resend effects pending |
| EDT-07 | §16.10,20.1 | W-01–07, X-01–09 | Administrator; designated mutation-test environment blocked |
| DOC-01–04 | §17.1–2/7 | W-01/02/04/05, X-06 | Operations/accounting; generation/upload/send/access/signature/revisions pending |
| ACC-01–05 | §17.3–6 | W-01/02/03/05, X-07/08 | Accounting; queue/approval/payment/dispute/factoring/sync validation pending |
| SET-01–03 | §19.1/4 | W-07 | Administrator; actual settings/role lifecycle pending |
| SET-04–08 | §§18,19.2 | W-02/05/07 | Operations/legal/integration; provider/terms/packet/document effects pending |
| SET-09–12 | §§17.6,19.1/3 | W-01/05/07, X-08 | Pricing/accounting/admin; defaults/visibility/notifications/references pending |
| RPT-01–05 | §19.5 | W-07 | Reporting/accounting; exports/date/metric/permission reconciliation pending |
| API-01–03 | §18 and API guide | W-01–07, X-01/03/05/08 | Integration/account owners; supplier selection/entitlement/runtime proof pending |

**20.10 Completion audit and sign-off handoff**

| Requirement from the plan | Current authoritative evidence | Verdict / next owner |
| --- | --- | --- |
| One main guide with hierarchy, terminology, fields, actions, URLs and learning exercises | This guide §§1–20, supported by evidence/coverage/scope/API files | Written chapters delivered; no separate phase reader documents required |
| All accessible known modules entered, unavailable areas owned | 89-row register; 87 P and 2 B after Phase 8; §20.9 maps all IDs | Discovery/documentation coverage present; P is partial pending detailed rules/tests, not full completion |
| Provider/dependency inventory and access needs | §18 and revised API guide:17 carriers and feature categories, dated official sources | Written requirements/research delivered; account/client selection and runtime proof pending |
| Seven connected walkthroughs and acceptance scenarios | W-01–07 plus X-01–09 and traceability table | Written scenarios delivered; designated-test-environment replay not performed |
| Replay documented navigation with the observed role | E-109 existing booked quote → View Shipment button → BOL1047885 → Documents as Member | Narrow read-only replay observed; does not validate new customer/quote/booking/accounting chain |
| Links, headings, tables, evidence references and formulas | E-110 local structural/arithmetic checks; E-54/74/104 sample UI arithmetic | Local checks only; no submitted validation, screenshots set or full metric reconciliation |
| Reviewed workflow/rules per in-scope feature and signed-off scope matrix | SC-01–12, OQ register, reviewer roles and explicit gaps | **Pending:** client scope selection/named reviewers, not inferred from broad permission to continue |
| Alternate roles, document/notification/provider/accounting effects | §19.4, EDT-07, SYS-11, API readiness gaps | **Blocked for validation:** administrator/test/provider evidence required |
| Revised exports after source review | Markdown is current source; existing DOCX files not regenerated | **Pending after source review**; do not distribute old exports as the current guide |
| Sequential per-phase commit/push and next branch | Git branches/commit history; final Phase 9 commit details reported after push | Phase branches preserve cumulative work; delivery is not a merge or business approval |

**Decision worksheet:** For each scope-matrix row, the client records Included release 1 / Later / Excluded; exact use-case IDs and deviations; named approver/date; rationale and permitted fallback. For each accepted workflow, the reviewer records the test run/environment/role/fixture, expected-versus-actual result, redacted evidence, defects and approval. The existing [Scope and Decisions](Phase%200%20Scope%20and%20Decisions.md) file remains the decision authority. No reviewer signature has been supplied. On October 26 the user confirmed the requested test URL, disposable customer/shipment IDs, side-effect suppression details and reviewer names are unavailable (D-01). Validation/sign-off remain blocked; this is not a waiver of those gates.

**Concrete next handoff:** Team lead supplies SC-04 reviewer names and SC-05 environment/disposable IDs/effect suppression; administrator supplies SC-03 role sessions; product/operations/pricing/accounting decide SC-01/02/06/08/09/11; integration owners resolve SC-07/12; team lead/product owner agree migration/operating targets SC-10. Then run W-01–07 and applicable exception cases, revise the guide from actual results, obtain signed scope/rule approvals and regenerate reviewed exports. Until then, use this as an evidence-backed learning and discovery guide, with validation gaps clearly retained.

<a id="open-questions"></a>
**21\. What remains unverified**

| Topic | Unanswered question | Detailed phase / register |
| --- | --- | --- |
| Actors/access | Customer rep dialog states new shipments only; actual assignments/commissions, role permissions and alternate portals remain untested. | 2, 8; SC-03/04/05 |
| Intake/approval | Who brings in requests, who approves/tenders, who books and how LTL/TL paths differ. | 3–5; SC-06, OQ-10 |
| Quote rules | Volume eligibility, Xtended Network source, booking entry-point discrepancy and manual-quote save/expiry rules. | 3, 7; QTE-08–12 |
| Freight classification | Actual NMFC/class selection owner, lookup service and commodity-specific values. Generated BOL labels 04821J as Acct (§17); do not treat it as NMFC. | 3, 7; OQ-01 |
| Measurements | App quantity/weight basis, unit conversion, calculation/rounding and floor-layout rules. | 3, 5; OQ-02 |
| Coverage/tracking | What a lead counts, acceptance/dispatch process, exact queue rules and event source. | 4–5, 7; OQ-05/09/12 |
| Edit behavior | Status/role locks, tank/team effects, autosave/save, rerating and updated-document recipients. | 5; OQ-07/08/14 |
| Documents/notes | Customer/carrier acceptance, checkmarks, exact Notes/PRO form, visibility and retention. | 5–6, 8; OQ-03/04/11/15 |
| Accounting | Payer/terms, added costs, approvals, payment processing versus recording and sync. | 6–7; SC-08/09/12, OQ-06 |
| Clone scope | Required modules, portals, providers, migration, timeline and acceptance cases. | SC-01–12; client decisions pending |

These are tracked questions, not reasons to invent a behavior or silently exclude it. The original questions about customer approval, cancellation from old dates, commodity codes and quote network/volume rules remain open.

<a id="phase-progress"></a>
**22\. Phase progress and what to do next**

| Phase | What is in this main guide now | Remaining work |
| --- | --- | --- |
| 0 — Scope/inventory | Summary and links to scope, evidence and coverage controls. | Client scope/test-access/named-reviewer answers pending. |
| 1 — Overview/navigation/terminology | Overview sections 1–11: hierarchy, actors, relationships, lifecycle, navigation, glossary, basic arithmetic and exercises. | Operational review and unavailable-role evidence remain open; no field-level module completeness claimed. |
| 2 — Customers/carriers/vendors | Sections 12–13: record/forms/options dictionaries, histories, relationships and exercises. | Submission, validation, role and propagation tests remain open; no business sign-off implied. |
| 3 — Quote creation/classification/pricing | Section 14: form/options, calculations, offers, pricing, manual/sharing forms, partial failures and existing shipment handoff. | Submission/save/booking/role tests and documented open rules remain pending. |
| 4 — Shipment lists/coverage/details | Section 15: queues, filters/rows, direct creation, coverage forms, detail regions, documents/buttons and exercises. | Assignment/create/status/role/file/provider and timestamp rules remain pending. |
| 5 — Edit/scheduling/tracking/exceptions | Section 16: observed documentation delivered. | Submitted transitions, role matrix, validation, autosave and resend effects pending. |
| 6 — Documents, bills, invoices and accounting | Section 17: observed documentation delivered. | Upload/send/signature/approval/payment/sync and role validation pending. |
| 7 — Third-party dependency and API requirements | Section 18: observed documentation delivered. | Client provider/account/licensing decisions, access and runtime tests pending. |
| 8 — Settings/access/reporting | Section 19: observed settings, Member matrix, report schemas and shared controls. | Alternate roles, settings effects, exports and metric reconciliation pending. |
| 9 — Walkthroughs and acceptance | Section 20: W-01–07, X-01–09, all 89 use-case mapping and completion audit. | Submitted test-environment replay, named review, scope approval and reviewed exports pending. |

**Your next action:** Read section 20, provide the test/reviewer/scope handoff there, then validate the linked workflows and resolve owned gaps.

**Next delivery:** Evidence from designated-environment workflow tests, role/provider checks and business review; then revised chapters and reviewed exports. All planned phase chapters are written; validation/sign-off gates remain open.

<a id="sources"></a>
**23\. Sources and supporting records**

**Live-app basis:** E-04–27 cover earlier broker inspection; E-28–30 record Phase 1 dashboard/search/coverage observations; E-35–49 record Phase 2 forms and navigation. E-50 records the added identifier reference; E-51–61 record Phase 3 form/results/dialog/navigation observations and the unsaved measurement check. E-62–75 record Phase 4 list/queue, coverage, detail, document and saved freight-summary observations. E-76–82 record Phase 5 editor/forms; E-83–92 record Phase 6 documents/accounting and editor follow-up; E-93–98 record Phase 7 research; E-99–108 record Phase 8 settings/reporting/shared controls; E-109–110 record Phase 9 replay and local audit. See the [Evidence Register](Documentation%20Evidence%20Register.md) for the dates, exact actions and limits. No backend source or private API behavior was inferred from a UI label.

**Industry/provider references checked October 23, 2026:** FMCSA for broker/carrier, USDOT/MC and CDL endorsement terminology; NMFTA for NMFC/class/density/ClassIT+; Old Dominion for BOL/payment-party terms and PRO tracking; FedEx for basic shipping vocabulary. Direct links appear with the relevant definitions. These sources define terms, not this account's app workflows.

**Project control files:**

- [Documentation Plan](Quote%20Factory%20Documentation%20Plan.md) — phases and completion criteria.
- [Phase 0 Scope and Decisions](Phase%200%20Scope%20and%20Decisions.md) — scope matrix, questions SC-01–12 and pending owners.
- [Coverage and Open Questions](Documentation%20Coverage%20and%20Open%20Questions.md) — screen IDs, guide gaps, operational questions and progress.
- [Evidence Register](Documentation%20Evidence%20Register.md) — observation/source history.
- [10-4 TMS API Access Guide](../thrid_party/10-4-tms-api-access-guide.md) — revised Phase 7 provider/dependency requirements, access sources and readiness gaps.
