**Quote Factory Quote Workflow Guide**

**Main system guide — business overview, navigation, workflows and terminology**

Originally prepared October 9, 2026 | Expanded October 26, 2026 | Phases 1–7 observed documentation delivered; save/role tests pending.

**This is the one main document.** Each later phase will add its detailed explanations here. The plan, inventory, evidence and scope files support this guide; you do not need to assemble separate phase chapters to read the final system documentation.

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
19. [Questions still awaiting verification](#open-questions)
20. [Phase progress and what to do next](#phase-progress)
21. [Sources and supporting records](#sources)

<a id="reading-guide"></a>
**1\. How to use this guide**

**Purpose:** Understand the business first, then follow the app, then learn the detailed rules behind each field and action. The documentation also provides a basis for agreeing what the clone must implement.

**Current coverage:** Phase 0 established the discovery inventory and open decisions. Phase 1 adds the business hierarchy, actors, record relationships, navigation, lifecycle, glossary and read-only exercises. Phase 2 expands customer/carrier/vendor records and saved-location forms in sections 12–13. Phase 3 expands quote inputs, offers, pricing, sharing and the shipment handoff in section 14. Phase 4 expands shipment lists, coverage and detail screens in section 15. Later phases will expand editing, accounting, integrations, settings and acceptance scenarios in this same document.

**Evidence labels used here**

| Label | Meaning |
| --- | --- |
| Observed | A screen, route or visible result was inspected in the broker app. It does not establish hidden backend behavior. |
| Industry meaning | A freight term explained using the official references linked nearby. It does not automatically define this account's business policy. |
| Learning example | Fictional companies, amounts or scenarios used to explain a relationship. |
| Unverified | A rule, role, integration or side effect still requires inspection or a business answer. |

The inspected session displays the Stackup Solutions profile in the 10-4 Global broker app. Its exact permission role is unverified. Customer/carrier/driver portal behavior has not been inspected through separate logins. Examples and counts can change; a specific record URL may stop working. Use the general module link and click path as a fallback.

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

**Observed class choices:** 50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500. These are the dropdown choices observed in the LTL form, not a commodity-to-class lookup table. Do not select class from a memorized density threshold without checking the applicable commodity provision and carrier arrangement.

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
| Review both provider groups | Carriers / Vendors → **All** | Combined provider entry point. | Complete combined-list behavior still needs verification. |
| Filter providers | Carriers / Vendors → **View carrier filters** | Search, Added date range/date shortcuts, **Requires 1099**, **See … carriers / vendors**. | Requires 1099 is a recorded filter criterion, not tax advice or proof that reporting is required. Tax policy needs the accounting owner. |

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

The carrier-pricing tab also showed identifiers beside carrier names; `04821J` appeared beside ArcBest. Its exact label/meaning was not established. Do not assume this string is an NMFC commodity code just because it appeared in earlier quote details. Phase 3/7 must determine each identifier's context.

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
| View quote details | Opens an individual offer dialog. | Detailed differences across all carriers/manual offers remain open. |
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
| Carrier area | Pathak Express, Dry Van, dispatch contact, Rate con and Bill on assigned example. | Carrier dialog shows identity/authority/packet information, View carrier and Remove carrier. See §15.6. |
| Uncovered area | Equipment, target amount and Cover freight link; Needs a carrier near stops. | Use coverage workspace, not a master-record Add carrier form. No assignment implied by Booked. |
| Customer area | Customer link/name, selected contact, + invoice reference and Confirmation; Invoice on the reference. | Customer record versus financial/document actions remain distinct. Invoice was absent in sampled uncovered detail, but no general visibility rule is established. |
| + add vendor | Additional provider/service line. | Nine-type chooser observed in §12; creating a vendor business and assigning it to a shipment are different flows. Multi-provider/removal/rebill effects untested. |
| Financial area | Target cost, Price, gross Profit; Expand itemized view. | Expanded view contains editable inputs; viewing shipment detail is not an assurance that all controls are read-only. See §15.8. |
| Locations | Distance and estimated duration; numbered stops and provider/driver/tracking context. | Distinguish facility hours, appointment, ETA and recorded arrival/departure (§15.9). |
| Freight / summary | Description, grouped pallets/units, dimensions, weight and length; some examples also show cf/pcf/visualizer. | Different data produces different summaries. See §15.10. |
| Map | Rendered map with Mapbox/OpenStreetMap attribution in inspected examples. Off route on the reference. | Display provider is not proof of geocoding/routing/live-tracking provider or an active driver feed. No API key was accessed. |
| Notes / Timeline | + note entry, displayed authored notes and expandable event history. | Audience, save/edit/delete and notifications unverified. No note was written. |

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

**Next: Phase 5 — Edit shipment, scheduling, tracking and exceptions.** It will expand this same guide with field-level editing, locks, appointments/In/Out/ETA, Notes/PRO forms, driver/tracking updates, cancellation and save/resend behavior. Document/accounting lifecycles follow in Phase 6.

<a id="shipment-editing"></a>
**16\. Edit shipment, scheduling, tracking and exceptions — Phase 5**

**Purpose:** Know what a field changes, which controls are locked, and which Save/Update actions may alter operational records or send documents. Forms below were inspected October 25, 2026; no operational value was edited or submitted. This chapter distinguishes visible controls from tested persistence, permissions and external effects. Evidence E-76–82.

**16.1 Open the correct editor**

Shipment → **Edit shipment** opens `/broker/shipment/{shipmentId}/edit`. Compare [uncovered Dry Van BOL 1047829](https://app.quotefactory.com/broker/shipment/6ad62c8868813f1637085014/edit), [covered/in-transit Dry Van BOL 1046693](https://app.quotefactory.com/broker/shipment/6a62746a98cb0feaa1acedd4/edit), and [scheduled Auto Transport BOL 1047665](https://app.quotefactory.com/broker/shipment/6abe9d488ee4a147c6dd8077/edit). The uncovered Auto Transport shipment's **Reschedule** button also opened its full editor; it did not immediately change dates.

The full editor, reusable location-template dialog, appointment, ETA, driver and tracking-update dialogs have different submission controls. A Save in one form is not the same operation as Update shipment. Do not assume that leaving the editor discards changes to every nested form or that a checkbox never saves immediately; those boundaries remain untested.

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

**Delivered:** Document catalog and inspected fields; generated BOL/labels and carrier confirmation structure; bill editor/approval/payment forms; customer invoice/receipt form; queues; current accounting connection/terms; mapping/reconciliation decisions and validation cases. **Pending:** actual uploads/sends/signatures, approval/payment/revision effects, complete queue rules, finance sync, role/access and owner-approved policies. **Next: Phase 7 — Third-party dependency and API requirements**, including corrections to the existing access guide.

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

**Delivered:** Corrected existing API guide, all17 carrier entries, feature/dependency categories, official-source links, secure account/access worksheet, operation-specific failure/acceptance tests and current-versus-historical readiness distinctions. **Pending:** client supplier/launch decisions, contracts, named account owners, sandbox/production access and runtime validation. A manual/internal alternative must be explicitly approved rather than silently replacing an automatic workflow. **Next: Phase 8 — Settings, access, reporting and remaining modules.**

<a id="open-questions"></a>
**19\. What remains unverified**

| Topic | Unanswered question | Detailed phase / register |
| --- | --- | --- |
| Actors/access | Customer rep dialog states new shipments only; actual assignments/commissions, role permissions and alternate portals remain untested. | 2, 8; SC-03/04/05 |
| Intake/approval | Who brings in requests, who approves/tenders, who books and how LTL/TL paths differ. | 3–5; SC-06, OQ-10 |
| Quote rules | Volume eligibility, Xtended Network source, booking entry-point discrepancy and manual-quote save/expiry rules. | 3, 7; QTE-08–12 |
| Freight classification | Actual NMFC/class selection owner, lookup service and commodity-specific values such as 04821J. | 3, 7; OQ-01 |
| Measurements | App quantity/weight basis, unit conversion, calculation/rounding and floor-layout rules. | 3, 5; OQ-02 |
| Coverage/tracking | What a lead counts, acceptance/dispatch process, exact queue rules and event source. | 4–5, 7; OQ-05/09/12 |
| Edit behavior | Status/role locks, tank/team effects, autosave/save, rerating and updated-document recipients. | 5; OQ-07/08/14 |
| Documents/notes | Customer/carrier acceptance, checkmarks, exact Notes/PRO form, visibility and retention. | 5–6, 8; OQ-03/04/11/15 |
| Accounting | Payer/terms, added costs, approvals, payment processing versus recording and sync. | 6–7; SC-08/09/12, OQ-06 |
| Clone scope | Required modules, portals, providers, migration, timeline and acceptance cases. | SC-01–12; client decisions pending |

These are tracked questions, not reasons to invent a behavior or silently exclude it. The original questions about customer approval, cancellation from old dates, commodity codes and quote network/volume rules remain open.

<a id="phase-progress"></a>
**20\. Phase progress and what to do next**

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
| 8–9 — Detailed workflows through final validation | Overview content retained and organized here. | Full document/accounting/integration/settings chapters and reviewed end-to-end tests. |

**Your next action:** Read section 18 and its exercises; resolve the owned test/access/business questions in the coverage register.

**Next delivery:** Phase 8 — Settings, access, reporting and remaining modules, inside this same file. Supporting registers retain evidence and unverified rules.

<a id="sources"></a>
**21\. Sources and supporting records**

**Live-app basis:** E-04–27 cover earlier broker inspection; E-28–30 record Phase 1 dashboard/search/coverage observations; E-35–49 record Phase 2 forms and navigation. E-50 records the added identifier reference; E-51–61 record Phase 3 form/results/dialog/navigation observations and the unsaved measurement check. E-62–75 record Phase 4 list/queue, coverage, detail, document and saved freight-summary observations. E-76–82 record Phase 5 editor/forms; E-83–92 record Phase 6 documents/accounting and editor follow-up. See the [Evidence Register](Documentation%20Evidence%20Register.md) for the dates, exact actions and limits. No backend source or private API behavior was inferred from a UI label.

**Industry/provider references checked October 23, 2026:** FMCSA for broker/carrier, USDOT/MC and CDL endorsement terminology; NMFTA for NMFC/class/density/ClassIT+; Old Dominion for BOL/payment-party terms and PRO tracking; FedEx for basic shipping vocabulary. Direct links appear with the relevant definitions. These sources define terms, not this account's app workflows.

**Project control files:**

- [Documentation Plan](Quote%20Factory%20Documentation%20Plan.md) — phases and completion criteria.
- [Phase 0 Scope and Decisions](Phase%200%20Scope%20and%20Decisions.md) — scope matrix, questions SC-01–12 and pending owners.
- [Coverage and Open Questions](Documentation%20Coverage%20and%20Open%20Questions.md) — screen IDs, guide gaps, operational questions and progress.
- [Evidence Register](Documentation%20Evidence%20Register.md) — observation/source history.
- [10-4 TMS API Access Guide](../thrid_party/10-4-tms-api-access-guide.md) — dated provider starting inventory; validation/corrections remain Phase 7 work.
