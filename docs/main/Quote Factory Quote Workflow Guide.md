**Quote Factory Quote Workflow Guide**

**Main system guide — business overview, navigation, workflows and terminology**

Originally prepared October 9, 2026 | Expanded October 23, 2026 | Phase 1 delivered.

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
12. [Questions still awaiting verification](#open-questions)
13. [Phase progress and what to do next](#phase-progress)
14. [Sources and supporting records](#sources)

<a id="reading-guide"></a>
**1\. How to use this guide**

**Purpose:** Understand the business first, then follow the app, then learn the detailed rules behind each field and action. The documentation also provides a basis for agreeing what the clone must implement.

**Current coverage:** Phase 0 established the discovery inventory and open decisions. Phase 1 adds the business hierarchy, actors, record relationships, navigation, lifecycle, glossary and read-only exercises. Later phases will expand the customer/carrier/vendor forms, quote fields, shipment details/editing, accounting, integrations, settings and acceptance scenarios in this same document.

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

**Carrier versus vendor — observed in the app:** The Create new vendor chooser offers **Carrier — Freight carrier with MC or DOT number** and **Vendor — Providers such as crane, insurance, warehouse, etc.** The Vendors list also displayed towing, transloader and lumper categories. Detailed forms and eligibility rules belong to Phase 2.

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
| Review dispatch work | Dashboard **Dispatch** → [Dispatch queue](https://app.quotefactory.com/broker/shipments/dispatching/all) | Advertised dispatch destination. | In Phase 1, clicking the zero-count shortcut left the dashboard unchanged. Queue contents/actions remain unverified. |
| Find loads requiring coverage | Sidebar **Cover** → [Shipments to cover](https://app.quotefactory.com/broker/shipments/covering/all) | Shipment rows with dates, parties, amounts and leads; open a shipment for Cover. | The inspected route applied TL/booked filters. A lead is not proof of an assigned carrier. |
| Follow pickups | Sidebar **Confirm pickups** → [Pickup queue](https://app.quotefactory.com/broker/shipments/scheduled/all) | Entry point for pickup follow-up. | Detailed confirmation form and transition rules belong to Phase 5. |
| Follow deliveries | Sidebar **Confirm deliveries** → [Delivery queue](https://app.quotefactory.com/broker/shipments/delivering/all) | Shipment rows requiring delivery follow-up. | Do not click Delivered as a navigation exercise. |
| Manage customers | Sidebar **Customers** → [Customers](https://app.quotefactory.com/broker/customers) | List with contacts, activity, credit and reps; open customer detail. | Plus opens customer creation; do not submit it during a read-only exercise. |
| Review all operational records | Sidebar **Shipments** → [Shipments](https://app.quotefactory.com/broker/shipments) | Active/All, filters and shipment links. | Work queues and a filtered list can overlap; they are not separate shipments. |
| Create without quote results | Plus beside Shipments → [Create new shipment](https://app.quotefactory.com/broker/shipment/new) | Direct-creation entry point. | Destination form/save rules need Phase 4 inspection. |
| Manage transportation/service providers | Sidebar **Carriers** → [Carriers / Vendors](https://app.quotefactory.com/broker/vendors/carriers) | Carriers, Vendors and All tabs; creation chooser. | Carrier versus Vendor is a business distinction, not an API connection status. |
| Review accounting work | Sidebar **Bills & Invoices** → [Accounting](https://app.quotefactory.com/broker/accounting/shipments/bills-invoices) | Bill, POD, invoice, dispute and overdue work queues. | Approve, send and payment controls affect real records. |
| Review analytics/exports | Sidebar **Reporting** → [Reports](https://app.quotefactory.com/broker/reports) | Lanes and saved export/report entries. | Names such as Monthly Margin or Shipments copy may be account-specific. |
| Review configuration | Sidebar **Settings** → [Settings](https://app.quotefactory.com/broker/settings) | Company, users/teams, carriers, customers, accounting, notifications and references. | Read existing values; detailed configuration and roles belong to Phase 8. |
| Learn / get help | Sidebar **Training** → [TalentLMS](https://quotefactory.talentlms.com/); **Support** button | External training link and support entry point. | Only entry points are documented here; course access/support workflow not inspected in this phase. |
| Review your account | Profile at bottom → [Profile](https://app.quotefactory.com/profile) | Profile destination. | Form contents and account switching are not yet inspected. |

**Inside a customer:** Overview → Shipments → Quotes → Addresses → Invoices → Payments. Overview also exposes contacts, billing/credit, Booking & quoting, reps and activity. These are the Phase 2 investigation areas, not six interchangeable views of the same data.

**Inside a shipment:** Start with header/status → identify customer and carrier/coverage → inspect stops/freight → inspect charges → use Documents, Confirmation, Rate con, Bill or Invoice for the relevant obligation. **Edit shipment** is a separate editable view; it is not required to read the movement details.

**Settings hierarchy:** Customers controls margins/customer visibility/login; Carriers controls integrations/terms/rate-confirmation settings; Accounting controls accounting connection and payment-related defaults. These settings may interact with per-customer/per-shipment choices; inheritance rules remain to verify.

<a id="quote-overview"></a>
**7\. Quote workflow and carrier offers — the overview**

1. **Choose the customer/contact and equipment.** LTL is one visible mode/equipment choice. Truckload work uses equipment selections such as Dry Van, Refrigerated, Flatbed or Auto Transport. Exact options/conditional fields will be cataloged in Phase 3.
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
| Dry van / refrigerated / flatbed / auto transport | Enclosed trailer / temperature-controlled equipment / open deck / vehicle transport equipment. | Choose based on the actual commodity and service need. Exact equipment catalog follows in Phase 3. |
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
| Accessorial | Additional service beyond the basic movement, such as liftgate service. | Pickup/delivery services and charges; catalog/pricing rules follow in Phase 3. |
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
| Density / volume | Calculation from dimensional/weight inputs. | Basic formulas explain the units; exact app aggregation/rounding awaits Phase 3/5 tests. |
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
| Cover / coverage | Arrange a suitable carrier for the freight movement. | Booked BOL 1047758 still shows Needs a carrier and a Cover link. Exact assignment/acceptance rules follow in Phase 4. |
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

**Unresolved earlier label:** “Blanket (04821J)” appeared as an item description/code in earlier quote details. The screen did not define it. Do not treat the string as a verified NMFC assignment; confirm commodity and classification source during Phase 3.

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

<a id="open-questions"></a>
**12\. What remains unverified**

| Topic | Unanswered question | Detailed phase / register |
| --- | --- | --- |
| Actors/access | Exact role permissions, rep assignment/ownership and customer/other portal behavior. | 2, 8; SC-03/04/05 |
| Intake/approval | Who brings in requests, who approves/tenders, who books and how LTL/TL paths differ. | 3–5; SC-06, OQ-10 |
| Quote rules | Volume eligibility, Xtended Network source, disabled booking reasons and manual-quote details. | 3, 7; QTE-08–12 |
| Freight classification | Actual NMFC/class selection owner, lookup service and commodity-specific values such as 04821J. | 3, 7; OQ-01 |
| Measurements | App quantity/weight basis, unit conversion, calculation/rounding and floor-layout rules. | 3, 5; OQ-02 |
| Coverage/tracking | What a lead counts, acceptance/dispatch process, exact queue rules and event source. | 4–5, 7; OQ-05/09/12 |
| Edit behavior | Status/role locks, tank/team effects, autosave/save, rerating and updated-document recipients. | 5; OQ-07/08/14 |
| Documents/notes | Customer/carrier acceptance, checkmarks, exact Notes/PRO form, visibility and retention. | 5–6, 8; OQ-03/04/11/15 |
| Accounting | Payer/terms, added costs, approvals, payment processing versus recording and sync. | 6–7; SC-08/09/12, OQ-06 |
| Clone scope | Required modules, portals, providers, migration, timeline and acceptance cases. | SC-01–12; client decisions pending |

These are tracked questions, not reasons to invent a behavior or silently exclude it. The original questions about customer approval, cancellation from old dates, commodity codes and quote network/volume rules remain open.

<a id="phase-progress"></a>
**13\. Phase progress and what to do next**

| Phase | What is in this main guide now | Remaining work |
| --- | --- | --- |
| 0 — Scope/inventory | Summary and links to scope, evidence and coverage controls. | Client scope/test-access/named-reviewer answers pending. |
| 1 — Overview/navigation/terminology | Sections 1–14: hierarchy, actors, relationships, lifecycle, navigation, glossary, basic arithmetic and exercises. | Operational review and unavailable-role evidence remain open; no field-level module completeness claimed. |
| 2 — Customers/carriers/vendors | Context and entry points only. | Detailed forms, tabs, fields, validation, contacts, billing/quoting settings and reusable locations. **Next phase.** |
| 3–9 — Detailed workflows through final validation | Earlier overview content retained and organized here. | Full quote/shipment/edit/document/accounting/integration/settings chapters and reviewed end-to-end tests. |

**Your next action:** Work through exercises A–G, especially identifying the parties and comparing Booked with carrier coverage. Take SC-01–05 from the [scope/decision register](Phase%200%20Scope%20and%20Decisions.md) to your team lead if still unanswered.

**Next delivery:** Phase 2 will expand customer, carrier, vendor and location records **inside this same file**. Supporting registers will keep the evidence and open questions. A single final consolidated guide remains the delivery target.

<a id="sources"></a>
**14\. Sources and supporting records**

**Live-app basis:** E-04–27 cover earlier broker inspection; E-28–30 record the Phase 1 dashboard/search/coverage observations. See the [Evidence Register](Documentation%20Evidence%20Register.md) for the dates, exact actions and limits. No backend source or private API behavior was inferred from a UI label.

**Industry/provider references checked October 23, 2026:** FMCSA for broker/carrier and CDL endorsement terminology; NMFTA for NMFC/class/density/ClassIT+; Old Dominion for BOL/payment-party terms and PRO tracking; FedEx for basic shipping vocabulary. Direct links appear with the relevant definitions. These sources define terms, not this account's app workflows.

**Project control files:**

- [Documentation Plan](Quote%20Factory%20Documentation%20Plan.md) — phases and completion criteria.
- [Phase 0 Scope and Decisions](Phase%200%20Scope%20and%20Decisions.md) — scope matrix, questions SC-01–12 and pending owners.
- [Coverage and Open Questions](Documentation%20Coverage%20and%20Open%20Questions.md) — screen IDs, guide gaps, operational questions and progress.
- [Evidence Register](Documentation%20Evidence%20Register.md) — observation/source history.
- [10-4 TMS API Access Guide](../thrid_party/10-4-tms-api-access-guide.md) — dated provider starting inventory; validation/corrections remain Phase 7 work.
