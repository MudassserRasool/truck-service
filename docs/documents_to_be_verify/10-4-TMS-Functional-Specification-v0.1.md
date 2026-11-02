1 0 - 4 G L O B A L L O G I S T I C S 

# 10−4 TMS 

Functional Specification 


Draft functional reference for the proposed 10-4 TMS. Requirement IDs identify review items; observed Quote Factory behavior, proposed clone behavior and unresolved questions must be distinguished. This file is not an approved or fully verified build specification.

PREPARED FOR 

10-4 Global Logistics 

PREPARED BY 

Stackup Solutions 

VERSION 

0.1 — source validation reviewed (November 2, 2026); approval pending

DATE October 29, 2026 

## Contents

- [0. About this document and validation authority](#0-about-this-document-and-how-to-review-it)
- [1. Overview and proposed scope](#1-overview)
- [2. Users and roles](#2-users-and-roles)
- [3. End-to-end workflows](#3-end-to-end-workflows)
- [4.1 Navigation, dashboard and search](#41-navigation-dashboard-and-search)
- [4.2 Shipments](#42-shipments)
- [4.3 Carrier cover and rate confirmation](#43-carrier-cover-and-rate-confirmation)
- [4.4 Tracking, pickup and delivery](#44-tracking-pickup-and-delivery)
- [4.5 Billing and payments](#45-billing-and-payments)
- [4.6 LTL quoting](#46-ltl-quoting)
- [4.7 Customers](#47-customers)
- [4.8 Carriers and vendors](#48-carriers-and-vendors)
- [4.9 Reports, lanes and commissions](#49-reports-lanes-and-commissions)
- [4.10 Settings, users, account, profile and sign-in](#410-settings-users-account-profile-and-signin)
- [4.11 Customer portal and secure links](#411-customer-portal-and-secure-links)
- [4.12 Notifications and live updates](#412-notifications-and-live-updates)
- [5. Emails](#5-e-mails)
- [6. Documents](#6-documents)
- [7. Integrations — source reconstruction](#7-integrations--reconstructed-from-the-main-source)
- [8. Data migration — decisions and validation](#8-data-migration-from-quote-factory--proposed-scope-and-validation)
- [Appendix B. Statuses and option lists](#appendix-b-statuses-and-option-lists--evidence-qualified-reference)
- [Appendix C. Report catalogs and saved selections](#appendix-c-report-column-catalogs-and-observed-saved-selections)
- [Validation record and remaining acceptance work](#validation-record-and-remaining-acceptance-work)

## 0. About this document and how to review it

|Document|10-4TMS—Functional Specification|
|---|---|
|Prepared for|10-4Global Logistics|
|Prepared by|Stackup Solutions|
|Version|0.1 (first draft for review)|
|Status|Source-validation review complete; retained proposals, release scope, operational tests and client sign-off pending|


### Validation basis and authority — November 2, 2026

The source of truth is [`docs/main`](../main/), especially the current Markdown [Quote Factory Quote Workflow Guide](../main/Quote%20Factory%20Quote%20Workflow%20Guide.md). Its newer dated Deep refresh observations supplement the earlier chapters. The [Scope and Decisions](../main/Phase%200%20Scope%20and%20Decisions.md), [Evidence Register](../main/Documentation%20Evidence%20Register.md) and [Coverage and Open Questions](../main/Documentation%20Coverage%20and%20Open%20Questions.md) control scope and evidence limitations. Existing DOCX exports are not a newer authority: the guide explicitly says they have not been regenerated. The third-party access guide is supporting provider research, subordinate to the main folder for app behavior and scope.

**Evidence meanings in this specification:**

- **Observed:** the cited source establishes a screen, label, control, dated state or particular calculation. It does not prove a successful submission or backend rule.
- **UI-described:** help text describes intended behavior, but the behavior has not been exercised.
- **Proposed / unverified:** a draft requirement retained for review, without sufficient source evidence or client approval. Exact messages, limits, timings, permissions and automatic effects in such passages are proposals, not verified Quote Factory facts.
- **Conflict corrected:** this specification has been brought into line with the main source. A dated example is not a universal default or go-live choice.

**Approval boundary:** Main guide §§1, 19.4, 20.10 and Scope SC-01–12 say release selections, named reviewers, alternate-role access, provider readiness and mutation testing remain unresolved. All “included,” “first version,” “later,” “not included,” “Owner only” and “proposed Off at launch, approval pending” choices below are **proposed scope**, unless supported by a specific recorded client decision. Their presence here does not approve them. User authorization to validate this file is not approval of those product decisions.

**Network evidence boundary:** [Consolidated network evidence](../main/network/quote-factory-network.json) retains sanitized browser-facing request patterns and structural field types, omits scalar values/headers and binary bodies, and marks all recorded runs partial. HTTP 200, a field name, an existing Timeline event or a visible enabled button does not establish complete business validation, recipient delivery, funds movement or a server-to-provider contract. Automatic `quotesFilter`, `recentlyVisited` and integration-event requests can occur during viewing; viewing is not universally free of writes (Deep1 E-120–123 and Deep2 E-124–127).

**Input completeness defect:** The supplied file stopped midway through DOC-015 at the end of its former printed page 277. Its contents promised sections 7–8 and Appendices B–C that were absent, and DOC-015 itself was cut off. References to their original INT/MIG IDs and complete option/report catalogs are not evidence that those missing requirements existed or were verified. Missing content must be reconstructed only from the main sources and marked accordingly; the unavailable companion “10-4 TMS — Summary” cannot be treated as an approval or source.

**Audit status:** The source-validation pass covers all848 original requirement IDs across sections0–6. Section evidence tables identify observed subsets and retained proposals; none implies a passed unexecuted action. Missing sections7–8 and Appendices B–C have been reconstructed and labeled from available evidence, including the targeted app catalogs. Printed page numbers were removed because they no longer describe this Markdown file. Business approval and operational acceptance remain open.

### Purpose 

This document describes proposed screens, fields, actions, business rules, communications, documents and integrations for review. Completeness and intended behavior must be checked against the main sources and approved scope. Unverified details must not be used as established Quote Factory behavior or signed-off implementation requirements.

If something you use today is not described here, or is described differently from how you want it, please tell us. That is exactly what this review is for. 

### How the document is organised 

|Part|What it covers|
|---|---|
|1.Overview|Why the system is being built,what is included,what is not,and the words we use|
|2.Users and roles|Who uses the system and what each person can see and do|
|3.Workflows|The main jobs from start to finish(quote → book → cover → deliver → bill → get paid)|
|4.Modules(4.1 – 4.12)|Every screen and feature in detail|
|5.E-mails|Every e-mail the system sends:when,to whom,and what it contains|
|6.Documents|Every PDF the system creates:BOL,labels,rate confirmations,invoices,statements|
|7.Integrations|Every outside service(Trucker Tools,LTL carriers,QuickBooks, …)and what10-4needs to provide|
|8.Data migration|How10-4's data moves from Quote Factory into the new system|
|Appendix B|Every status and option list,with exact labels|
|Appendix C|Every column available in the report builders|


Each module includes a short overview, evidence review and draft detail. A companion Summary is referenced by the original draft but was not supplied; this review does not rely on it. Requirement IDs are preserved for traceability.

### Requirement IDs 

Every requirement has a short ID, for example SHP-014 · Duplicate a shipment. The letters show the area: 

|Prefix|Area|Prefix|Area|
|---|---|---|---|
|ROL|Users and roles|LTL|LTL quoting|
|WF|Workflows|CUS|Customers|
|NAV/DSH/SRC|Navigation,dashboard,search|CAR/VND|Carriers,vendors|
|SHP|Shipments|RPT/LAN/COM|Reports,lanes,commissions|
|COV/RCF|Carrier cover,rate confirmation|SET/USR/ACT|Settings,users,account|
|TRK|Tracking,pickup and delivery|POR/LNK|Customer portal,secure links|
|BIL/INV/PAY|Carrier bills,customer invoices,payments|NTF|Notifications|
|EML|E-mails|DOC|Documents|
|INT|Integrations|MIG|Data migration|


Please quote the ID when you comment. It lets us find and change the exact item quickly. 

### How to review 

1. Read the parts that matter most to your team first (usually 3 Workflows and 4 Modules). 

2. Add a comment next to anything that is wrong, missing or should work differently. Start the comment with the ID, for example: "SHP-014: duplicating shouldalso copy the reference numbers." 

3. Use one of these labels to make your intent clear: 

   - Change: it should work differently. 

Add: something is missing. 

- Remove: we do not need this. 

Question: something is unclear. 

4. Send the document back to us. We will answer every comment, update the document and send a new version with a list of what changed. 

5. We repeat this until you are happy. Then you sign off the final version. 

### Questions and items we need from you 

Open decisions are recorded in the main-folder Scope and Decisions (SC-01–12) and Coverage and Open Questions (OQ register), linked above. The companion Summary was not supplied in this folder and cannot resolve these questions.

### Review rounds and sign-off 

|Version|Date|What changed|Reviewed by|
|---|---|---|---|
|0.1|November 2, 2026|Source validation, contradiction corrections, evidence/proposal boundaries, missing sections/options and verified report catalogs|Client review pending|


##### Sign-off (final version) 

||Name|Signature|Date|
|---|---|---|---|
|10-4Global Logistics||||
|Stackup Solutions||||


## 1. Overview 

In short: 10-4 TMS is 10-4 Global's own Transportation Management System. It replaces Quote Factory for day-to-day brokerage work: quoting, booking, covering loads with carriers, tracking, documents, carrier bills, customer invoices, reports and the customer portal. The intended degree of visual and workflow matching, allowed deviations and training needs remain client decisions (SC-01/02).

### 1.1 Why 10−4 is building its own TMS 

The main source explains Quote Factory's brokerage workflow and the proposed clone discovery work. It does not establish the stated $200 → $500 → approximately $1,000 pricing history, loss of chat support, inability to integrate client tools, or approved business rationale. Those commercial claims require client evidence before inclusion. Main §19.6 actually records Contact support opening Help Scout Beacon with Search and Ask Us on October 26; no message was sent. Search and report improvement requests also require client confirmation as scope decisions.

### 1.2 Goals 

**Proposed goals; approval pending (main §§1, 18, 20.10; SC-01/02/07/10).** Direct carrier integrations, provider selection, full historical migration and future partner products are not established launch commitments.

1. Run all of 10-4's brokerage work in one system that 10-4 owns. 

2. Keep the way of working the team knows: same screens, labels and order of steps. 

3. Connect directly to Trucker Tools (tracking), each of 10-4's LTL carriers (rates and pickups) and QuickBooks Online (accounting). 

4. Bring over existing Quote Factory data, so history, open loads, open bills and open invoices continue without a gap. 

5. Build a base 10-4 can extend later (assistants, new tools, a lighter version for partner brokerages). 

### 1.3 What is included 

|Area|Section|
|---|---|
|Users,roles and permissions|2|
|End-to-end workflows|3|
|Navigation,dashboard and keyword search|4.1|
|Shipments:list,work queues,create,edit,duplicate,detail,cancel|4.2|
|Truckload cover:carrier leads,rate confirmation,carrier e-sign,carrier replacement/TONU|4.3|
|Tracking,pickup and delivery,POD|4.4|
|Carrier bills,customer invoices,payments,statements,aging|4.5|


|Area|Section|
|---|---|
|LTL quoting,booking and automatic pickup requests|4.6|
|Customers,contacts,address book,reps,margins,credit|4.7|
|Carriers and vendors|4.8|
|Reports,report builder,lanes,commissions report|4.9|
|Settings,users and teams,company account,profile,sign-in|4.10|
|Customer portal and secure links|4.11|
|Notifications and live updates|4.12|
|E-mails|5|
|Documents(BOL,labels,rate confirmations,invoices,statements)|6|
|Integrations|7|
|Moving data from Quote Factory|8|


### 1.4 Not included in the first version 

**Proposed exclusions, not approved scope.** Main Scope §3 leaves every module awaiting client decision. A disconnected account or an untested workflow does not establish that 10-4 does not use a service outside Quote Factory.

|Item|Why|
|---|---|
|Quote Factory's Xtended Network LTL rates|They belong to Quote Factory's own carrier network. 10-4uses its own<br>carrier accounts and pricing.|
|project44|Quote Factory's connection to the carriers.The new system connects to<br>each of10-4's LTL carriers directly.|
|Pathfinder|A Quote Factory tool(messaging carriers on similar lanes and trucks<br>posted on DAT).Not needed now;can be built later.|
|Posting loads to DAT,Truckstop or Central<br>Dispatch from the TMS|10-4posts by hand today.Can be added later.|
|MyCarrierPackets connection|10-4uses it on its own;it was not connected inside Quote Factory either.<br>Carrier onboarding uses the built-in carrier packet.Planned for later.|
|Automatic entry of carrier invoices from the<br>accounting mailbox|Later phase.|
|Assistant that checks and disputes extra carrier<br>charges|Later phase.The"Variance"shown on a carrier bill(BIL-018)is the base<br>for it.|
|Automated rate negotiation and outreach to<br>new LTL carriers|Later phase.|
|Direct data access for10-4's own tools(secure<br>API and an AI assistant connector)|Later phase.|
|A lighter version for partner brokerages|Later phase;the system is designed so it can be added.|


|Item|Why|
|---|---|
|Boat Haul division|Later;the system is designed so it can be added.|
|Support chat(Quote Factory's Help Scout)|Not needed.|
|Training courses(Quote Factory's TalentLMS)|Low priority;later.|
|Commission runs(approve and pay commission|The first version gives the Commissions report(download);the run|
|statements)|workflow can be added later.|


Smaller items planned for later are listed by area in section 1.7. 

### 1.5 Users 

- 10-4 staff: Owners (full control, including accounting approvals and settings) and Members (day-to-day work). 

- Customers: contacts of 10-4's customers with portal access to quote, book and track their own LTL shipments. 

- Carriers: dispatchers and drivers who receive secure links to review and sign rate confirmations. No account needed. 

Details in section 2. 

### 1.6 Glossary 

|Term|Meaning|
|---|---|
|Shipment/load|One job of moving freight for a customer,identified by its BOL number.|
|TL(Truckload)|A full truck for one customer,picked up and delivered directly.|
|LTL(Less Than<br>Truckload)|Smaller freight(usually1–4pallets,sometimes up to6)that shares a truck;handled by LTL<br>common carriers.|
|Auto Transport|Moving vehicles on car-hauler trailers;handled like truckload,each vehicle(and its VIN)listed as<br>an item.|
|Customer/shipper|The company that hires10-4to move its freight and pays10-4.|
|Carrier|The trucking company that moves the freight and is paid by10-4.|
|Vendor|Any other service provider on a load(towing,crane,warehouse,etc.).|
|Cover|Assigning a carrier to a truckload shipment at an agreed cost.|
|Carrier lead|A carrier suggested for a load,usually because it moved similar lanes before.|
|Rate confirmation<br>(rate con)|The agreement sent to the carrier:pickup,delivery,agreed rate,terms and fees.The carrier signs<br>it online and adds driver details.|
|BOL(Bill of Lading)|The shipping document signed at pickup and delivery.|


|Term|Meaning|
|---|---|
|POD(Proof of<br>Delivery)|The BOL signed at delivery.|
|PRO number|The LTL carrier's tracking/invoice number for a shipment.|
|Accessorial|An extra service or charge(liftgate,residential delivery,detention,reweigh, …).|
|TONU|"Truck ordered,not used":a fee paid to a carrier whose truck was booked but not used.|
|Detention/layover|Charges for a truck waiting longer than allowed/staying overnight.|
|Freight class/NMFC|The LTL classification of goods that drives the price.|
|Cost/price/margin|Cost=what10-4pays the carrier;price=what the customer pays10-4;margin=the difference as<br>a percentage of price.|
|Carrier bill|The carrier's invoice to10-4for the freight.|
|Customer invoice|10-4's invoice to the customer.|
|Factoring company|A company a carrier sells its invoices to; 10-4then pays it.|
|Remittance|The note a customer sends with a payment,saying which invoices it pays.|
|Rep|A10-4sales person assigned to a customer;may earn a commission.|
|Secure link|A shared link intended for a particular document or action. Recipient access, expiry, renewal and revocation remain unverified; the proposed 42-day rule is not established by the main source (main §§17.7, 18.2; OQ-40).|
|QuickBooks Online|Accounting integration shown connected/mapped on October26, after an October23 disconnected observation. Sync triggers, directions, payment matching and reconciliation remain unverified (main §§17.6, 18.2; SC-12).|
|Trucker Tools|The tracking service that follows the driver's phone or ELD.|


### 1.7 Planned for later, by area 

These are proposed deferrals awaiting SC-02 scope approval. They are not verified statements about the current app or approved launch exclusions. Some items appear under more than one area. Current-app evidence and conflicts are noted in the relevant modules.

#### 2. Users and Roles 

Per-module roles beyond Owner and Member (for example a billing-only role). 

Extra rights for team managers. 

- Limiting customers to their assigned reps (ROL-019). 

- Agent or agency teams with their own branded login. 

- A company switcher for users who belong to more than one company. 

#### 3. End-to-End Workflows 

Booking a house (manual) LTL quote. 

Driver chat messages in TMS. 

- Refused or partial delivery, damage and claims handling. 

- Vehicle condition reports and photos for Auto Transport. 

- Posting loads to load boards (10-4 posts by hand). 

- Connecting MyCarrierPackets (Descartes; its carrier portal is "MyCarrierPortal"); onboarding uses 10-4's own packet wizard. 

- Merging the invoice and the POD into one PDF. 

#### 4.1 Navigation, Dashboard and Search 

- Training, support chat and Ops Desk links in the navigation. 

- A "Commissions" link in the navigation (only the one-shot Commissions report in Reports is included). 

- A sidebar queue link and counter for carriers waiting for approval (the page "Approve & review carriers" itself is included, section 4.8). 

- A red lock in Find results for customers limited to certain reps (with ROL-019). 

- Dashboard banners for system messages, announcements and alerts. 

- Street-level map tiles (the first version draws routes on a plain map of the United States). 

- Light, dark and system color themes. 

#### 4.2 Shipments 

- A second freight carrier on one shipment with a separate set of stops for each (multi-leg). Carrier replacement works through "Drop carrier" (section 4.3). 

- LTL edit form re-pricing: after a booked LTL shipment is changed, banners such as "Some things have changed that could affect the cost.", "Quote is no longer available" (with the button "Get new quotes"), "Cost increased by $X, margin went down to N%. You may want to adjust the price.", "Cost decreased by $X, margin went up to N%." and "Great! The cost stayed the same. Looks like it's good to go." 

- Per-item commodity pick list and extra shipment-form fields from external references (account-level reference definitions). 

- Requiring a customer contact to book, with the "Can't book when email matches brokerage user." check. Locking cost and price for non-Owners once the load is complete. 

- Driver messages (chat) on the detail page. 

- Mexico settlement (neighborhood) fields on a stop. 

- Booking several identical shipments at once. 

#### 4.3 Carrier Cover and Rate Confirmation 

- QuickPay option on the carrier confirmation page (the "Request QuickPay" switch and net amount). 

- Several carriers on one load (each with its own Cover card and lead list); the first version has one carrier per load. A dropped carrier's TONU is shown as its own card (COV-029). 

- Share window details: the Opened / Unopened marks inside the carrier rate confirmation Share window, and editing a contact from that window. 

- Route map image on the carrier page. 

- Tracking invitation box on the carrier page ("Track with Trucker Tools" and the text asking the driver to send tracking updates), shown when the tracking connection is not set up. 

- View-only link row in the share window (shows the rate confirmation without sending an e-mail). Recording a phone confirmation when a carrier never signs. 

#### 4.4 Tracking, Pickup and Delivery 

- Driver chat and driver-message toast for Trucker Tools (driver comments), with the "Driver Messages" row in notification settings. 

- Live truck position (breadcrumbs) on the map. 

- Longer list of Trucker Tools tracking statuses (for example "Driver needs app", "Phone turned off", "Tracking interrupted") once Trucker Tools provides its full list. 

- Automatic "Picked up" and "Delivered" from Trucker Tools. 

- Automatic proof of delivery pulled from LTL carriers. 

#### 4.5 Billing and payments 

- Automatic booking hold: stop new bookings for a customer when an invoice is 31 days overdue, with an account option and an Owner re-enable. (Credit figures are always shown; blocking a booking above the available credit is the Owner setting "Enforce credit limits", proposed Off at launch, approval pending; see PAY-022, SET-020.)

- Weekly past-due payment requests by e-mail to customers (schedule by day, hour and time zone). 

- Pay carriers faster ("QuickPay" discounts) and factoring of 10-4's own invoices (sending invoices to a factoring company, "imminent" payments, notices of assignment). The source shows Not factoring/Not providing QuickPay and an existing empty Invoices to Factor tab. Outside-app use and release scope require confirmation. The carrier remit-to factoring choice (BIL-013) is included.

- Late fees on customer invoices. 

- Credit memos, write-offs and refunds, and a "credit and re-bill" step for replacing a sent invoice (INV025). 

- A separate second bill from the same carrier on the same load (BIL-036), if 10-4 asks for it. 

- A single merged invoice PDF (invoice, bill of lading and POD in one file); today the POD files are attached separately (INV-013). 

- Extra approval step when a carrier's or a bill's remit-to address or factoring company changes (CAR039). 

- Automatic entry of carrier invoices from the accounting mailbox, and an assistant that checks and disputes extra carrier charges (base: the variance banner, BIL-018). 

#### 4.6 LTL quoting 

- Booking a manual LTL quote (the "house quote" of LTL-052). "Book" stays disabled until the pickup and cover path for a quote with no carrier is agreed with 10-4. 

- Automatic repricing when pickup details change after quoting: the banners on the shipment edit form after "Update cost" (see 4.2). In the first version the lane is locked on the book page and a changed lane needs new quotes. 

- Estimated weight from volume, customer default freight class and NMFC, and "force customer to freight class and NMFC" (optional customer settings). 

- Address-validation chips on the quote form (location type and liftgate warnings). 

- Per-customer visibility limits on quote requests. 

#### 4.7 Customers 

- Customer list tabs "Active", "Leads", "Dormant" and "All" (booked in the last 90 days, never booked, quiet 90 days or more). 

- A "Late invoices" banner and a "Late" column in the customers list. (The "Late invoices" board itself is included, CUS-055.) 

- "Owned by another rep" page that hides a customer from users who are not assigned to it, and enforcing the "Customer visibility" setting (CUS-053). 

- "Freight class auto-calculated" and "Default NMFC" settings per customer (with the weight estimator, 4.6). Scheduled past-due notification e-mails per customer. 

- A "Contact required to book" rule. 

#### 4.8 Carriers and vendors 

- A sidebar row "Approve carriers" with a count of carriers waiting for approval. The "Approve & review carriers" view itself is included (CAR-007). 

- MyCarrierPackets (Descartes; carrier portal "MyCarrierPortal"), RMIS and Highway connected to the carrier list and the status (badges "Pass", "Fail", "Do Not Use", "Pending" and "Send to carrier" on cards, a Compliance tab on the carrier profile with authority, safety, insurance and watchdog details, and automatic approval). Not connected in the first version, as in Quote Factory. 

- Confirmation (approve, deny, reset) of contacts that a carrier adds itself. 

- A screen to edit the factoring company directory. 

- Pulling a carrier packet automatically from a connected compliance service. 

#### 4.9 Reports, Lanes and Commissions 

- Commission runs (preview what each rep has earned up to a date, approve per shipment, mark as paid, add adjustments, review paid runs). Only the one-off Commissions report is included; runs only if 10-4 asks. 

- Lane areas by metro region instead of city and state, and a map with state borders and zoom controls. External reference columns in reports. They appear only if 10-4 starts using external reference codes. 

#### 4.10 Settings, Users, Account, Profile and Sign-in 

- Posting loads to DAT or Truckstop from the system and connecting those accounts from the Load boards page; today the page only shows status. 

- Booking hold tile in Customers settings (automatic hold at 31 days overdue, see 4.5). 

- Commission trigger tile in Accounting settings (commission counted when "Invoiced" or "Paid"); depends on the commissions run workflow. 

- Driver Messages in Notifications (from Trucker Tools). 

- Self-service connection of tracking and compliance tools; today Stackup connects them. 

- Account-wide control of who may upload and approve bills as Settings switches (ROL-021). 

- Payment instructions on invoices (bank details and accepted payment methods) as an Owner setting; today Stackup sets them. 

- Editing the carrier agreement inside the system. 

- Any proposed deferral of customer-visibility enforcement requires explicit approval. Current UI help describes rep-based restriction when enabled; actual enforcement is unverified (ROL-019).

- QuickPay for carriers (the setting is saved, SET-029). 

- Theme switching (light, dark, system; see 4.1). 

#### 4.11 Customer portal and secure links 

- A public tracking link for customers and consignees that shows live position without signing in (today customers track from the shipment page and the shipment link). 

- Customers editing or cancelling a shipment request, or converting a request to a quote by themselves. Export of quote history for customers. 

- Customers paying invoices online (payments stay outside the portal). 

- Customer-visible credit details and a credit request button. 

- Agent or agency branding and agency-level logins (see section 2). 

- A different wording for 10-4's terms and login e-mail. 

#### 4.12 Notifications and Live Updates 

- Trucker Tools driver messages: a pop-up when a driver writes to the broker and the "Driver Messages" switch in the Notifications window (with driver chat, 4.4). 

- Clock-driven counter updates (a badge changing exactly at midnight without any other change). Staff announcements and "New feature" banners. 

#### 5. E-mails 

Notice of assignment e-mail for factored invoices (10-4 does not factor). 

- E-mail to the broker when a carrier confirms a load. 

- E-mail when a customer credit limit is raised. 

- E-mails from driver messages (Trucker Tools chat). 

- QuickPay request from the carrier page (QuickPay is not used). 

#### 6. Documents 

Barcodes on the BOL and labels. 

Account and quote references already appear on the inspected LTL BOL (main §17.2). Their inclusion must not be described as an absent current-app feature; clone template scope still needs approval.

#### 7. Integrations 

- MyCarrierPackets connection for carrier onboarding (section 7 packet-provider decision).

- Booking a manual (house) LTL quote (section 7 manual-LTL decision).

- Direct accounts for carriers that came only through Xtended Network, if 10-4 opens them (section 7 direct-account decision).

- Training for new hires (built-in course or link to 10-4's own training). 

- A carrier-outreach feature (message carriers from lane history). 

- Load-board posting (DAT, Truckstop, Central Dispatch) from 10-4 TMS. 

#### 8. Data Migration from Quote Factory 

- Pulling later changes automatically on a schedule (imports are started by an Owner). 

- Importing old e-mail logs and old secure-link pages. 

- Importing notes, load history, carrier leads, packet links, invoice send records and earlier carrier assignments, if 10-4 asks for them (section 8 migration-scope decision).

## 2. Users and Roles 

In short: two kinds of staff user, Owner and Member, plus two outside kinds: customers (customer portal) and carriers (secure links). This section says who they are, how they join and sign in, and what each can do. Screens for sign-in, invites, users and teams are in section 4.10. 

### 2.1 The kinds of user

**Section evidence review:** Main §§1, 12.5–6, 19.1/4 and E-99 establish Owners/Members groups, the sampled Member identity, a disabled unchecked Owner checkbox, customer-login settings and carrier packet/rate-con entry points. No separate Owner, customer, carrier or driver session was tested. Except for those observations, ROL-001–025 and all permission matrices are **proposed / unverified**. In particular there is no evidence for exclusive role counts, full Owner privileges, invite expiry, login/reset token lifetimes, session revocation, password policy, manager powers, accounting feature flags or exact rejection messages. These need SC-03/05 access and a reviewed permission contract. The source's visible Member controls must not be converted into universal grants or denials.


##### ROL-001 Two staff roles 

The observed Users page groups Owners and Members. The sampled profile/user dialog identifies Member, with the Owner checkbox disabled and unchecked (main §19.1; E-99). The exhaustive role catalog, role cardinality, chip colors and any other role variants are unverified.

##### ROL-002 Owner 

An Owner can do everything a Member can do, and also: 

- change company settings (all pages under Settings), 

- invite, remove and change the role of users, and manage teams, 

- edit the company profile and logo, 

- approve or reject carriers, set carrier payment terms and tax details, 

- set customer credit limits, customer payment terms and customer booking permission, 

- merge, archive and restore customers, 

- change commissions on a shipment (amounts, "paid" status) and download the Commissions report, 

- edit permitted base-report columns; administer non-base reports and their sharing (proposed rights, not verified; RPT-010–013),

- add and edit LTL carrier accounts, 

- run the data import from Quote Factory (section 8). 

Owners are not held to the Members' margin and profit limits (ROL-020). Owner rights apply to the whole company; there is no per-module Owner. 

##### ROL-003 Member 

A Member works shipments, quotes, customers, carriers, bills and invoices daily and can read most settings but not change them. Owner-only pages and buttons are hidden or read-only (ROL-023). 

##### ROL-004 Customer portal user 

A contact of one customer company, signed in with a one-time e-mailed link (no password, ROL-011). They land on the quote form and see only their own company's quotes, shipments and invoices. Customers never see Find, queues, Customers, Carriers, Settings, Bills & Invoices or Reporting. See section 4.11. 

##### ROL-005 Carrier through a secure link 

A carrier has no account or password. It opens a secure link e-mailed by 10-4 and can only do what that link is for: 

- review and sign a rate confirmation, 

- complete a carrier packet (documents and insurance), 

- read the carrier terms and conditions. 

A link opens one item only. A wrong, expired or taken-back link shows the same "not found" page. See section 4.11. 

##### ROL-006 Invited user 

A person who has been sent an invite but has not joined. Shown in the Users list under "Invited", with no access until they accept (ROL-009). The invite is bound to its e-mail address and expires after 14 days. 

##### ROL-007 One company 

The system serves one company, 10-4 Global. There is no company switcher and no self-service sign-up for new companies. 

### 2.2 Rules that always apply 

##### ROL-008 Permissions are enforced by the system 

The system checks the user's role on every action, not only by hiding buttons. An Owner-only action tried by a Member (for example via a typed web address) is refused and no data changes. Customers reach only customer-portal pages; a staff page typed into the address bar shows "Page not found". 

###### ROL-009 

##### How a person joins by invite 

1. An Owner types an e-mail in the Users page and presses "Invite". The system sends an invite e-mail. 

2. The person opens the link in the e-mail ("{name} invites you to join the team at {company}"). 

3. A new person fills in "First name", "Last name", "Email", "Phone" and "Password" and presses "Save". The e-mail must be the one the invite was sent to; otherwise the message is "This invite was sent to {e-mail}". 

4. The "Join {company}" page shows. The person presses "Agree & join", or "Decline". 

5. After "Agree & join" the person lands on the Dashboard with the role the Owner chose. 

A person who already has a login sees "Continue" instead of the sign-up form. Screens and messages: ACT-014 to ACT-021.

##### ROL-010 Staff sign-in 

Staff sign in with e-mail and password on the "Log in" page, then land on the page they were trying to reach, or the Dashboard. A wrong e-mail or password always gives the same message, "Wrong email or password.", so it never reveals whether an e-mail exists. After too many wrong attempts: "Too many attempts. Try again in a minute." 

##### ROL-011 Customer sign-in 

Customers sign in from the customer login link (Settings > Customers > "Customer login"; see POR-005). They enter their e-mail and receive a one-time sign-in link, valid 15 minutes and usable once, sent only to contacts of a customer with login access. The page gives the same answer for every address, so it never reveals access. There is no code to type. See section 4.11. 

##### ROL-012 Forgotten password 

"Forgot password?" on the "Log in" page starts a reset. A reset link is sent if the e-mail belongs to a user who can log in, and the same "Check Your Email" page always shows. The link works 60 minutes, once only. After a reset every session of that user is signed out. Screens: ACT-023, ACT-024. 

##### ROL-013 Changing your own password 

Any staff user can change their password on their profile with the current and a new password. The new password needs a lowercase letter, an uppercase letter, a number, a special character, and at least 8 characters. Sessions on other devices are then signed out; the current one stays. 

##### ROL-014 Sessions 

A user stays signed in until they log out, change their password, or are removed from the company (access ends on their next click). 

##### ROL-015 Changing a role 

An Owner can switch another user between Owner and Member from the user's card ("Owner" switch). Rules: 

An Owner cannot change their own role. Message: "You cannot change your own role." 

- The company must always have at least one Owner. Message: "An account needs at least one Owner." 

- An Owner can also set the role of a pending invite before the person joins. 

##### ROL-016 Removing a user 

An Owner can remove another user ("Remove user" after "Are you sure you want to remove {name}?"). The person loses access and leaves their teams; their name stays on past shipments, notes and history. An Owner cannot remove themselves ("You cannot remove yourself."). 

##### ROL-017 Teams 

Teams are named groups of staff (for example a regional sales team). Only Owners create, rename and delete teams and add or remove people. Team names must be unique ("A team with that name already exists"). A team cannot be deleted while it has people ("Remove every person from the team first.") or while it is the assigned rep on a customer or shipment ("This team is assigned as a rep and cannot be removed."). Teams are used when: 

- assigning reps to customers and shipments (a team can be picked as a rep), 

- limiting who can see a customer, in a later version (ROL-019), 

- limiting who can see a saved report (section 4.9). 

##### ROL-018 Team manager 

On a team, an Owner can mark a member as "Manager". Managers show with an orange "Manager" strip on their card. In the first version a manager has the same permissions as any other Member. 

##### ROL-019 Customer visibility 

Settings → Customers → Customer visibility exposes a disabled checkbox in the sampled Member session. Help says enabling the setting restricts viewing/running quotes to customer reps; disabled gives users all customer records (main §19.3). This contradicts the claim that the switch merely saves without effect. Actual enforcement, team inheritance, lists/search/API/export coverage, edit permission and the launch value remain unverified. Do not implement a no-op switch or defer enforcement without explicit client approval (SC-02/03; OQ-11).

##### ROL-020 Margin and profit limits for Members 

"Margin defaults and limits" (Settings > Customers) sets a minimum margin, minimum profit and maximum profit for LTL and Truckload quotes, account-wide, per customer and per LTL carrier account. A Member cannot book a quote or shipment outside the limits; the refusal names the limit. Owners are only warned and can proceed. Drafts are not checked. See SHP-077, SHP-078. 

##### ROL-021 Accounting rights option 

Two company options (set up with Stackup, not on a Settings page) can restrict accounting to Owners; both are off by default, so Members can do all of these: 

- "Only Owners can upload and edit carrier bills". 

- "Only Owners can approve and pay bills and record customer payments". 

##### ROL-022 Adding customers option 

A company option (set up with Stackup, off by default) can restrict "Add customer" to Owners. When on, Members do not see the "+" for adding customers and are told to contact the account owner. 

###### ROL-023 

##### What a Member sees on Owner-only screens 

Settings pages open, but switches and fields are read-only (grey), and Owner-only buttons are hidden. 

- Users: no "Invite" box, no role switches, no remove buttons. Teams: no "+" and no create button. 

- Company: a read-only summary instead of the edit form. 

- Carrier integrations: no "+ Add carrier". 

- Import and Commissions report pages show "Page not found". 

- On a shipment, the commission amounts and "paid" switch are hidden. 

##### ROL-024 Who sees what in the shipment timeline 

Commission and rep-change entries in a shipment timeline are visible to Owners only. Members never receive them. 

### 2.3 Permission matrix 

##### ROL-025 Permission matrix 

This is a proposed permission contract for client review, not a verified matrix of current Quote Factory permissions. The observed evidence matrix is main §19.4. Server enforcement described in ROL-008 is a proposed acceptance requirement, not a passed test.

Legend: Yes = allowed. Read = can see, cannot change. Own = only the customer's own records. No = not available. Link = only through the matching secure link. 

#### Navigation, dashboard, search, account 

|Capability|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|Dashboard|Yes|Yes|No(goes to Quote form)|No|
|Find(global search)|Yes|Yes|No|No|
|Sidebar queue counters|Yes|Yes|No|No|
|Own profile(name,photo,phone,e-mail)|Yes|Yes|Yes|No|
|Change own password|Yes|Yes|No(no password)|No|
|Settings pages|Edit|Read|No|No|
|Company profile and logo|Edit|Read|No|No|
|Invite,remove users,change roles|Yes|No|No|No|
|Create and edit teams,add or remove team members|Yes|No|No|No|
|See the list of users and teams|Yes|Yes|No|No|
|Data import|Yes|No|No|No|


#### Shipments and quotes 

|Capability|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|See shipment list and detail|Yes|Yes|Own|Link(rate<br>confirmation only)|
|Create,edit,duplicate,<br>book a shipment|Yes|Yes(within margin limits)|Request a<br>Truckload<br>shipment only|No|
|Cancel and un-cancel a<br>shipment|Yes|Yes|No|No|
|Change customer on a<br>shipment|Yes|Yes(unless"Enforce credit limits"<br>is on and the customer has a<br>credit limit,SHP-071)|No|No|
|See cost,margin,profit|Yes|Yes|No(price only)|No|


|Capability|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|Book above or below<br>margin limits|Yes<br>(warned)|No|No|No|
|Assign reps to a shipment|Yes|Yes|No|No|
|Set or change commission<br>on a shipment,mark"paid"|Yes|No|No|No|
|Cover a load with a carrier,<br>send rate confirmation|Yes|Yes|No|No|
|Override a rejected carrier<br>at cover|Yes|No|No|No|
|Sign a rate confirmation|No|No|No|Link|
|Quote form,results,quote<br>history(LTL)|Yes|Yes|Own|No|
|Share a quote by e-mail or<br>link|Yes|Yes|No|No|
|Book from a quote|Yes|Yes|Own,if the<br>customer allows<br>booking|No|
|Documents(BOL,labels,|Yes|Yes|Own(BOL,labels,|Link(rate|
|POD,confirmations)|||POD)|confirmation)|


#### Customers and carriers 

|Capability|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|View customers,contacts,address book|Yes|Yes|No|No|
|Add and edit a customer,contacts,address book|Yes|Yes|No|No|
|Customer payment terms,booking on/off,<br>accounting instructions|Yes|No|No|No|
|Customer credit limit and credit note|Yes|No|No|No|
|Merge,archive,restore a customer|Yes|No|No|No|
|Customer-specific margin and limits|Yes|Yes(read only for limits that apply<br>to them)|No|No|
|View carriers and vendors|Yes|Yes|No|No|
|Add a carrier or vendor|Yes|Yes|No|No|
|Approve or reject a carrier("Don't use this carrier")|Yes|No|No|No|
|Carrier payment terms,tax and legal entity,<br>"Requires1099"|Yes|No|No|No|


|Capability|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|Request a carrier packet|Yes|Yes|No|No|
|Complete a carrier packet|No|No|No|Link|
|LTL carrier accounts(add,edit,switch on or off)|Yes|Read|No|No|


#### Billing 

|Capability|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|See Bills&Invoices|Yes|Yes|Invoices page,own|No|
|Upload and edit a carrier bill|Yes|Yes(unless restricted,ROL-021)|No|No|
|Approve a carrier bill,record payments|Yes|Yes(unless restricted,ROL-021)|No|No|
|Create,send,dispute a customer invoice|Yes|Yes|No|No|
|Record a customer payment|Yes|Yes(unless restricted,ROL-021)|No|No|
|View and download own invoices|Yes|Yes|Own|No|


#### Reports, lanes, commissions 

|Capability|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|Run reports,export to CSV|Yes|Yes|No|No|
|Create your own report("Save as new")|Yes|Yes|No|No|
|Edit or delete a base report|Yes|No|No|No|
|Share a report with users and teams|Yes|No|No|No|
|Lanes map and table|Yes|Yes|"Data" (no profit columns)|No|
|Commissions report(one-shot CSV)|Yes|No|No|No|
|Late invoices board(see section4.5)|Yes|Yes|No|No|
|"Data"page:download all shipments as a CSV file<br>(Settings/Data)|Yes|Yes|No(customers have their own"Data"<br>lanes page)|No|


#### Settings (detail in section 4.10) 

|Capability|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|Carriers settings:terms,rate confirmation e-mail,Terms&Fees,<br>packet request,monitoring links|Edit|Read|No|No|
|Customers settings:margins,carrier-name hiding,customer login,<br>credit limits,visibility|Edit|Read|No|No|


|Capability|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|Accounting settings:QuickBooks,Cc invoices,payment terms,|Edit|Read|No|No|
|factoring,QuickPay|||||
|External references(definitions)|Edit|Read|No|No|
|External reference values on a customer or carrier|Yes|Yes|No|No|
|Notifications(in-app alerts,per user)|Yes|Yes|No|No|
|"Load boards"tile(shows whether DAT and Truckstop are connected;|See only|Not|No|No|
|posting loads from the system is not in the first version)|(Owners)|shown|||


### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

See the matrix above. Owner: all settings, users, teams, approvals, credit, commissions and report administration. Member: daily work; read-only on settings. Customer: own company only, through the portal. Carrier: one secure link at a time, no account. 

## 3. End-to-End Workflows 

In short: The nine main business stories of 10-4 TMS, from quote to payment: who does what, what the system does by itself, and what happens when something goes wrong. Screens, fields and rules are in the modules (section 4 and sections 5 to 8); each step names where its detail lives. 

### How to read this section

**Workflow validation status:** Main §§5, 14–20 document observed entry points and seven learning/acceptance walkthroughs, not successful new-record end-to-end execution. WF-001–044 and the nine step tables below remain **proposed / unverified wherever they describe submissions, automatic transitions, sends, signatures, bookkeeping, payment allocation, backend permissions or exact errors**. Existing booked/delivered records show historical states only. Each claimed side effect requires designated-environment replay and the corresponding external acknowledgment. Main §20.10 and D-01 explicitly retain these gates. No production action is authorized merely by this draft's steps.

Specific corrections: 25% is a sampled default, not a fixed quote margin; main §14/Deep1 leaves pricing precedence/enforcement open. Main §15/Deep2 separates booked from covered loads and records staged packet-versus-rate-con buttons without testing the outcomes. Main §17/Deep3 leaves invoice creation/send/POD gating, approval, allocation and sync rules unverified. Separate portal/signature sessions are unavailable. Migration inclusions/exclusions require SC-10 rather than the missing original MIG requirements.


- Workflows: 1 LTL quote, book and auto-dispatch; 2 Truckload; 3 Pickup, in transit, delivery and POD; 4 Carrier bill; 5 Customer invoice; 6 Carrier replacement and TONU; 7 Customer portal; 8 Account setup and onboarding; 9 E-mails and notifications. 

- Each workflow has a step table and requirements `WF-001` and up (automatic behavior and exceptions). "Rep" means a 10-4 staff user (Owner or Member). "Owner" is named only for Owner-only actions. 

- Detail lives in sections 4.2 to 4.12, 5 E-mails, 6 Documents, 7 Integrations; Appendix B lists every status and option list. 

- Shipment statuses: Requested, Booked, Scheduled, In transit, Delivered, and Canceled (from Booked, Scheduled or In transit; a Requested shipment cannot be canceled). 10-4 described its pipeline as "Upcoming, Booked, Scheduled, In Transit, Delivered"; the first status in the system is Requested. When "Scheduled" happens: SHP-075. 

```
Quote -> Book -> Cover / auto-dispatch -> Pick up -> In transit -> Deliver -> POD
         Booked   Scheduled               In transit              Delivered
Delivered -> Carrier bill -> Approve -> QuickBooks -> Paid
          -> Customer invoice -> Send -> QuickBooks -> Paid
```

### Workflow 1: LTL quote, book and auto-dispatch 

Rep or customer (portal) enters the shipment; all LTL carrier accounts rate it at once; 10-4's margin is added; one price is booked; the system requests the pickup and e-mails BOL and labels. Who: Rep, Customer, LTL carriers (through 10-4's accounts). Detail: 4.6, 4.2, 4.7 (margins), 4.11, 5, 6, 7. 

|#|Who|What happens|Detail|
|---|---|---|---|
|1|Rep or|Quote form;request created with the applicable margin(customer margin or account default|4.6|
||Customer|25percent),distance and transit days.||
|2|System|All active LTL carrier accounts rate at once;a carrier that cannot rate shows an error row(for<br>example"Carrier does not service this lane")without stopping the others;identical quotes:<br>only the cheaper shows.|4.6|
|3|Rep|Tunes margin,profit,price;hides a row;adds a house quote.Members cannot go below the<br>minimum margin or profit(SHP-077,SHP-078).Cost is staff-only.|4.6|


|#|Who|What happens|Detail|
|---|---|---|---|
|4|Rep|"Share quotes", "Email these quotes"or"Copy link" (view-only).Secure link e-mailed(subject<br>"Quotes for<origin city,ST> -> <destination city,ST>";LNK-001).Customer never sees cost<br>or margin.|4.6, 5|
|5|Customer|Opens the link,compares,Book.Banners warn if the price changed or the quote is gone.|4.11|
|6|Rep or<br>Customer|Contacts,hours,references, "Share BOL"per stop,notes;customer ticks the Customer Terms<br>checkbox.Checks:pickup date not past,quote not expired,customer allowed to book.|4.2|
|7|Rep or<br>Customer|Book shipment(customer: "Book for $X").Shipment Booked;quote request completed;BOL,<br>labels and invoice draft created;BOL and labels e-mailed to each stop with"Share BOL"on.|5, 6|
|8|System|"Auto dispatch"on:pickup request sent("Auto dispatching...");on acceptance the carrier's<br>pickup number is stored and the shipment becomes Scheduled(SHP-075).|4.6|
|9|System|Carrier feed events show on the shipment(reps can add them,Workflow3).Track opens the<br>carrier's page with the PRO,pickup or BOL number.|4.4|


##### WF-001 LTL booking creates everything in one step 

Booking a quote creates the shipment, completes the quote request, generates BOL and labels and starts auto-dispatch, with no separate steps. 

###### WF-002 

##### Auto-dispatch outcome 

The shipment stays Booked until the carrier accepts the pickup request, then becomes Scheduled. 

- "Auto dispatch" off: the request stays in draft and the rep sees the manual bar. 

- Carrier rejects or the call fails: the page shows "Pickup request failed" and the manual bar. 

- Manual bar: "Pickup #", "PRO #", Auto dispatch (retry), Done. A rep who booked by website or phone types the pickup number and presses Done; the card reads "Dispatched" and the shipment becomes Scheduled. 

- Pickup requests go to any carrier account an Owner has connected and activated. LTL has no carrierapproval step. 

##### WF-003 Who can book, and when booking is blocked 

Booking is blocked with a visible reason when: booking is switched off for the customer ("Booking disabled"); the quote expired or expires before pickup; the pickup date passed ("Pickup date has passed"); the price changed ("Some things have changed that could affect the price" with Update price, or "Quote is no longer available" with Get new quotes); or a Member's margin or profit is outside limits. With a credit limit, the book page shows "Credit available $X" or "No credit". Blocking for insufficient credit ("Insufficient credit to book this quote") applies only when "Enforce credit limits" is on (PAY-022, SET-020); it is proposed Off at launch, approval pending.

###### WF-004 

##### Re-quote and stale pages 

Changing a request's criteria replaces the old prices. An old share link shows "These are old quotes" with See latest quotes. If two people edit the same request, the second sees "Previous changes detected" with Reload quote request. 

##### WF-005 Save for later 

Save for later on the book page keeps a draft shipment (Requested). Book on the results page later opens the draft. A Requested shipment cannot be canceled; the rep books it or deletes the draft. 

##### WF-006 Cancel after the carrier has the pickup 

Canceling a shipment with an accepted pickup request asks for a second confirmation and shows the carrier's cancel contact ("Contact the carrier to cancel the pickup!"). The system does not cancel the pickup at the carrier. 

###### WF-007 

##### House (manual) LTL quotes 

House quotes are never shown to customers and cannot be booked in the first version; booking them is planned for later. 

### Workflow 2: Truckload (including Auto Transport): book, cover, rate confirmation, carrier e-sign 

The rep books the shipment (a truckload can also start as a quote request with manual quotes, 4.6), covers it with a carrier, and the system e-mails a rate confirmation that the carrier signs; tracking then starts. Who: Rep, Owner (approvals, overrides), Carrier dispatcher (no login). Detail: 4.2, 4.3, 4.8, 4.4, 5, 6, 7. 

|#|Who|What happens|Detail|
|---|---|---|---|
|1|Rep|New shipment form(mode Truckload;equipment for example Dry Van,Reefer,Flatbed,Auto<br>Transport,Open Auto Transport,Enclosed Auto Transport;items are vehicles for Auto Transport;<br>"Share BOL"per stop).Book shipment or Save for later.Shows the lane history bar("History $X");<br>creates Booked shipment,BOL,invoice draft and carrier leads;sends BOL e-mail if the BOL switch<br>is on.|4.2|
|2|Rep|Cover queue(earliest pickup first),Cover on a load.Carriers that quoted come first,then lowest<br>cost,then lane history.|4.3|
|3|Rep|Reviews cards(approval dot Approved,Candidate,Don't use;safety rating;cost pill);adds a<br>carrier with"+add lead by MC or DOT".|4.3,<br>4.8|
|4|Rep|Records the call:dispatcher name,phone,e-mail(required),equipment and partial,rate con note,<br>cost lines, "Track"switch.Lead becomes quoted.|4.3|
|5|Rep|Cover,Cover&request packet or Cover&send rate con.Shipment becomes Scheduled now,not<br>at signing(SHP-075);an approved carrier gets the rate confirmation at once.|WF-<br>008|
|6|Carrier|Secure link(subject"Confirm Load",link"View rate confirmation";LNK-001):reads Terms and<br>Fees,enters driver name,phone,tractor,trailer,typed signature(first and last name),ticks the<br>carrier agreement if required,Confirm shipment.Records who,when,terms version;reopening<br>shows"Load accepted";with an agreement the carrier gets a signed copy.|4.3, 5|
|7|System|"Track"on:tracking record at cover(pill"Awaiting rate con");after signing the driver phone goes<br>to the tracking service,which texts the driver a link.Pill: "Awaiting tracking start",then"Tracking<br>active"or"Tracking via ELD".|4.4|


|#<br>Who|What happens|Detail|
|---|---|---|
|8<br>Rep|Optional edits after signing.|WF-<br>009|


##### WF-008 Carrier approval at cover 

Approval rules: CAR-007, CAR-015. 

- Approved: "Cover & send rate con"; the rate con goes out immediately. 

- Candidate (never used): "Cover & request packet". The load is covered (Scheduled) and a packet request is e-mailed. The rate con is held (lock icon) until an Owner approves the carrier on the carrier page, which releases every held rate con for that carrier. 

- Don't use (not authorized, no authority, unsatisfactory safety, or marked "Don't use this carrier"): cover is blocked ("Carrier not authorized"). Only an Owner can tick "Override coverage status"; the button then reads "Cover & send rate con" and the rate con goes out at once without a packet. 

- If sending fails after cover: "Failure occurred while sharing rate con. Covered successfully but rate con needs to be shared." The rep uses Share on the rate confirmation page. 

###### WF-009 

##### Changes after the carrier signed 

- Changing price, stops, equipment or pickup number returns the assignment to "not sent"; the rep sends it again. 

- The sampled assigned shipment and appointment editors show Send updated Rate con checked (main §16.5/7; Deep2 E-140/142). The original universal Off default was incorrect; other contexts/default causes and actual sends remain unverified.

- The carrier sees "Something's changed" with the differences and Confirm changes; if the page was open during the change: "This load was updated. Please review the new details." 

- An old link shows "Oops, this is an old version"; the previous signed version stays available ("Download previous version"). 

- A link for a dropped or canceled load shows "Shipment no longer available" (with "Download canceled confirmation" when applicable). 

##### WF-010 Carrier never signs 

Hourglass icon (sent, not signed); the load stays Scheduled. The rep can resend (Share), add a recipient or phone the carrier. Green check: signed; warning icon: not sent. 

##### WF-011 Carrier packet 

The packet request e-mails a secure-link wizard (company information, documents, insurance details). Full story: Workflow 8 part C. 

##### WF-012 Auto Transport 

Same steps. Items are vehicles with VIN, length and weight. Vehicle condition reports and photos are not part of the first version. 

### Workflow 3: Pickup, in transit, delivery and POD 

The rep (or tracking service) records pickup; the load is In transit; the rep records delivery and uploads the POD, which makes the bill and invoice actionable. Who: Rep, Carrier driver (through tracking), Customer (sees progress). Detail: 4.4, 4.2 (queues), 6, 7. 

|#|Who|What happens|Detail|
|---|---|---|---|
|1|Rep|Confirm pickups queue(Scheduled,pickup date passed;stop card warns"This should have<br>been picked up by now").Checks the tracking pill and log,adds the PICKUP number.|4.2,<br>4.4|
|2|Rep|Picked up on the first stop;dialog"Shipment picked up" (time,date,notes,PRO number).<br>Shipment In transit;tracking moves to Picked up;Remove carrier disabled.Planned dates are<br>not rewritten;the actual time is stored on the stop.|4.4|
|3|System and<br>rep|Location,arrival,ETA from the tracking service;rep can add ETA,In,Out, "+add tracking<br>update",edit appointments.Entries record their creator(user or service).|4.4|
|4|Rep|Confirm deliveries queue(In transit,delivery date passed).Delivered on the last stop<br>("Shipment delivered";Complete if a stop is both).Shipment Delivered;bill and invoice<br>become ready.|4.2,<br>4.4|
|5|Rep|"Upload POD"from the banner,last stop,Documents page,or bill or invoice page.If required,<br>the invoice can now be sent.|4.4, 6|
|6|Customer|Sees ETA,arrived,picked up,delivered per stop;downloads the POD(Workflow7).|4.11|


##### WF-013 What is automatic and what is manual 

Truckload: the tracking service supplies location, arrival and ETA; reps confirm Picked up and Delivered. LTL: carrier events (for example "assigned to a driver for pickup") appear on the shipment; a rep confirms pickup and delivery when the feed is late or missing. 

##### WF-014 Rules for tracking entries 

In order: a stop can be picked up, delivered or marked arrived only when the previous stop is completed. A future time is refused: "Time is in the future ()". 

A rep can edit or delete an entry; entries created by the tracking service are read-only. 

Removing an earlier completion while a later stop is completed is refused. 

##### WF-015 Tracking problems 

The tracking pill explains the state (for example "Awaiting rate con", "Driver needs app", "Phone turned off", "Tracking disabled"; full list in Appendix B). When tracking fails, the rep uses manual entries and can switch tracking off and on from the pill. 

##### WF-016 Missing or late pickup 

The load stays in Confirm pickups; the rep can change the pickup date (WF-009) or drop the carrier (Workflow 6). 

##### WF-017 POD rules 

Customers can require a POD for truckload, LTL or both. 

- Required and missing: the invoice cannot be sent ("POD required before you can send invoice") and the bill card reads "Upload POD". 

- A POD can be a PDF or a picture (jpeg, png, bmp, avif, gif, tiff, webp, heic). 

- Refused or partial deliveries, damage and claims have no dedicated flow in the first version; reps use notes and extra charges. 

### Workflow 4: Carrier bill, approve, QuickBooks, paid 

Carrier invoices arrive at 10-4's accounting mailbox; staff upload and enter the bill, compare it with the expected cost, approve it, and the system pushes it to QuickBooks. QuickBooks reports payment (or staff record it). Who: Rep or accounting user; Owner when approvals are Owner-only. Detail: 4.5, 4.8 (terms), 6, 7 (QuickBooks, section 7 accounting review (sync behavior unverified), BIL-031).

|#|Who|What happens|Detail|
|---|---|---|---|
|1|Carrier/<br>accounting|Carrier e-mails invoice,BOL,POD to the accounting mailbox(outside the system).Bills and<br>invoices,tab Upload:each delivered load without a bill shows an orange"Upload bill"<br>card.Staff drop the PDF(stored as a"Bill"document).|4.5, 6|
|2|Accounting|Enters Bill/invoice number,Mail payment to,Carrier accounting contact,Bill amount,Bill<br>date,Days to pay,Due date;Save bill.Dates fill from the carrier's terms(default30days<br>from bill date).Every save is in the change history.|4.5|
|3|Accounting|Reads the variance banner("Bill of $X is $Y less/more than expected");may add charges<br>(Layover,Detention,Lumpers)or switch In dispute on.|4.5|
|4|Authorized<br>user|Approve to pay(Approve to short pay below expected,Approve to overpay above).Undo<br>until paid.Bill moves to the Pay tab;the bill goes to QuickBooks.|4.5|
|5|System|Pushes the bill to QuickBooks with the amount billed;re-approval updates the same<br>QuickBooks bill;Undo does not remove it.Icon:Success,Unsent,Error or Disconnected.|7,BIL-<br>031|
|6|Owner/<br>accounting|Pays in QuickBooks(system then shows"PAID in full on"and the green"Paid"card,WF-<br>024),or +Record payment(date,amount up to the balance,method chosen by the user,<br>memo;removable,bill returns to unpaid).|4.5|


##### WF-018 Bill amounts and variance 

The bill keeps the amount billed and the amount expected; the difference drives the variance banner and the approve button text. The amount pushed to QuickBooks is the amount billed. 

##### WF-019 Approval is not blocked by a missing POD 

A missing POD changes the card to "Upload POD" so staff see it first; it does not stop approval. 

##### WF-020 Owner restrictions 

Two company options can limit accounting to Owners: only Owners see approve and record-payment buttons, and only Owners upload or edit bills. Members then see a read-only bill page. 

##### WF-021 QuickBooks errors 

A red icon opens a dialog with the error and Retry sync (typical causes: expired connection, missing expense account, vendor mismatch). If disconnected, an orange icon says "QuickBooks disconnected"; an Owner reconnects in Settings. 

##### WF-022 Bill statuses on the card 

"Upload POD", "Upload bill", "Need to approve", "Due in N days", "Due N days ago", "Paid", "Canceled", "Scheduled", "In transit". Meanings: Appendix B.5. 

##### WF-023 More than one bill per shipment 

One bill per carrier or vendor on the load (for example a dropped carrier's TONU bill, or a lumper or towing vendor); each follows this workflow on its own. An extra bill after approval or payment: BIL-036. 

##### WF-024 Paid status from QuickBooks 

When QuickBooks records a payment for a bill or invoice the system pushed, the system marks it paid ("PAID in full on ") as soon as QuickBooks reports it (section 7). Staff can still use + Record payment or + Record customer payment. 

### Workflow 5: Customer invoice, send, QuickBooks, payment, aging 

Staff send the invoice after pickup (and POD if required); the system e-mails it and creates it in QuickBooks; payment is recorded in QuickBooks or by staff; aging and statements chase late payers. Who: Rep or accounting user; Customer (receives e-mail; portal customers can view). Detail: 4.5, 4.7, 5, 6, 7 (INV-021). 

|#|Who|What happens|Detail|
|---|---|---|---|
|1|System|Draft invoice at booking(reference number=BOL number;lines mirror shipment price lines).<br>Open from the shipment or Send tab;+Create invoice if missing.Rep may add charges and<br>press Regenerate.|4.5|
|2|Rep|Send invoice(or bulk"Send invoices"on Send);reviews To,Invoice date,Due,Days to pay,<br>Message.Blocked before pickup("Invoice can't be sent until the shipment has been picked<br>up")or without a required POD("POD required before you can send invoice").No billing e-mail:<br>the dialog asks and saves it.|4.5|
|3|System|One e-mail per billing and Cc address,PDF attached,secure link(LNK-001); "Combine PDFs<br>(bill and POD)"attaches POD files separately(CUS-015,DOC-012).Due date=invoice date<br>plus payment terms(shipment,customer,account default30).Pushes to QuickBooks on send<br>and resend,matching or creating the customer by name;never a second invoice(INV-021).|5, 7|
|4|Customer|Pays outside the system(ACH,check,wire);QuickBooks-reported payments mark it paid(WF-<br>024).|4.5|


|#<br>Who|What happens|Detail|
|---|---|---|
|5<br>Accounting|+Record customer payment:customer,Amount,Payment date,Reference no.,Method(user-<br>chosen),tick open invoices,Apply $X to selected.Applied in order;remainder stays as credit;<br>zero-balance invoices show"PAID in full"and credit is freed.A payment can be removed or<br>removed and deleted(invoice returns to outstanding).|4.5|
|6<br>Accounting|Chases late invoices:aging buckets on the customer Invoices tab,Late invoices board,Send<br>statement(records"Last sent by").In dispute moves an invoice to Disputed and out of<br>undisputed overdue totals.|4.5,<br>4.7|


##### WF-025 Invoice send rules 

Sending only after pickup; also needs the POD if the customer requires it. 

- Editing a sent invoice rebuilds it in place; staff press "Resend" and the same QuickBooks invoice is updated. There is no "credit and re-bill" step. A sent invoice with no payments can be canceled and created again (INV-025). 

Canceling an invoice that has payments is refused ("Remove the payments first."). 

- A portal customer sees only sent invoices. 

##### WF-026 Payments and credit 

A payment has a method (13 options, Appendix B.7) and can be spread over several invoices. 

- Overpayment stays as credit on the payment; a short payment leaves a balance. 

- Write-offs, credit memos and refunds are not in the first version. 

##### WF-027 Aging 

Buckets "1-15 late", "16-30 late", "31-60 late", "61+ late" (days past due), shown as the aging bar on the customer Invoices tab and as the Late invoices board. 

##### WF-028 Customer statement 

Send statement builds a PDF of the customer's open sent invoices and e-mails it to the billing contacts. Paid invoices and unsent drafts are not listed. 

##### WF-029 Booking hold 

An Owner can switch a customer's booking off ("Booking disabled"); portal and quote pages show it and Book is disabled. Credit figures are always shown; blocking for lack of credit follows "Enforce credit limits" (PAY022, SET-020; proposed Off at launch, approval pending). The automatic hold at 31 days past due and weekly past-due statements are planned for later.

##### WF-030 Invoice tabs 

POD, Send, Outstanding, Disputed, Overdue. Meanings: Appendix B.6. 

### Workflow 6: Carrier replacement and TONU 

A rep drops a failed carrier; the load returns to Booked and is covered again. A "truck ordered not used" fee (TONU) is entered when dropping, and the dropped carrier gets its own bill. Who: Rep (Owner for overrides). Detail: 4.3, 4.5, 4.4. 

|#|Who|What happens|Detail|
|---|---|---|---|
|1|Rep|Remove carrier(red)opens"Drop carrier": "Are you sure you want to drop from this<br>shipment?"Enters Do you owe them TONU? and Charge customer?(either may be empty),<br>Drop carrier.Shipment back to Booked;old link shows"Shipment no longer available";<br>tracking for the dropped driver stops.|4.3,<br>4.4|
|2|System|TONU above zero:a separate TONU record("Truck ordered not used"charge)and pending bill<br>for the dropped carrier;customer amount joins the customer price lines.|4.5|
|3|Rep|Covers with a new carrier(Workflow2steps2-7);dropped leads show a red"Previously<br>dropped"mark.|4.3|
|4|Accounting|Processes both carrier bills(Workflow4twice),then one customer invoice with the customer<br>TONU line if any(Workflow5).|4.5|


###### WF-031 

##### A drop always releases the carrier 

A drop always removes the carrier and returns the load to Booked. With both fields empty or zero there is no TONU record and no bill. 

##### WF-032 TONU and cost lines 

The TONU appears as its own block under Cost and Price with the dropped carrier's name; read-only after the drop. 

- Cost owed and price charged are independent. 

- The standard TONU in the rate confirmation terms is the amount in Terms and Fees (the account can set it). 

A load can be replaced more than once; each drop with an amount adds another TONU bill. 

##### WF-033 When replacement is not possible 

Remove carrier is disabled once the load is In transit or Delivered; use Cancel, or contact an Owner. 

- If the shipment is canceled instead, the rep can enter a TONU in the cancel dialog. Canceling after a TONU drop sets the TONU back to zero unless re-entered. 

###### WF-034 

##### Signed rate confirmation of the dropped carrier 

The signed version stays in the shipment history ("Download previous version"). 

### Workflow 7: Customer portal (customer quotes, books, tracks) 

A customer with a branded login link signs in with a one-time e-mail link, requests LTL quotes, books, follows shipments, downloads documents and sees what they owe. Who: Customer contact, Rep (turns access on, 

##### shares quotes, handles requests). Detail: 4.11, 4.6, 4.7, 4.5, 5. Sign-in link: POR-005. 

|#|Who|What happens|Detail|
|---|---|---|---|
|1|Rep<br>(setup)|Turns on Customer login in Settings>Customers and for the customer,adds a contact with e-<br>mail,sets margins,auto-quoting,auto-dispatch,copies the login link("Copy link")and sends it.<br>No system e-mail on enabling.|4.7,<br>4.10|
|2|Customer|Branded login page(10-4's logo and name);enters an e-mail;one-time sign-in link(once, 15<br>minutes),same answer for every address(POR-005).A used or expired link offers"Log in<br>again".|4.11|
|3|Customer|Requests LTL quotes(Workflow1).Auto-quoting off: "Preparing quotes",request waits in the<br>staff Quote queue.Books("Book for $X")as Workflow1steps6-9;auto-dispatch follows the<br>customer's setting.|4.6|
|4|Customer|Truckload:+ in the Shipments title bar,Shipment:a request(no cost,no carrier),Requested,in<br>the staff Finish booking queue;a rep books and covers it(Workflow2).No truckload quotes.|4.11|
|5|Customer|Tracks shipments(status,per-stop ETA,arrived,picked up,delivered,LTL PRO number,Track<br>link;live);downloads BOL,labels,POD,sent invoices;sees a statement.|4.11,<br>4.12|


##### WF-035 What the customer never sees 

Cost, margin, profit, carrier rate confirmations, carrier bills, internal notes, the activity timeline, other customers' data and the driver. Carrier names can be hidden by an account setting. 

##### WF-036 Customer limits 

No POD upload, no payment button, no Settings or Carriers pages. 

- A customer can cancel a quote request from the results page, but not a shipment (the page shows how to contact the rep). 

- A customer cannot change a shipment request; changes go through the rep (POR-053). 

- Quotes are visible only after a rep shares them (or if requested with auto-quoting on). "Stop sharing" empties the list. 

##### WF-037 Blocked booking 

When booking is off for the customer: "Booking disabled" with "Contact rep for more info". Other block reasons: WF-003. 

##### WF-038 Secure links without login 

Quote e-mail links let a customer open quotes and book without signing in; similar links show the shipment (BOL, labels, POD) and the invoice. Links stay valid 42 days, renewed by each new send, and can be revoked ("Stop sharing") (LNK-001 to LNK-003). 

### Workflow 8: Account setup and onboarding 

How a new account becomes ready for work, and how customers, carriers and vendors are added day to day. Who: Owner (setup), Rep (customers, carriers). Detail: 4.10, 4.7, 4.8, 4.6 (carrier accounts), 7, 8. 

#### A. First-time setup (Owner; detail 4.10) 

|#|Action|Result|
|---|---|---|
|1|Company profile and logo(Account page).|Logo and name on the login page,<br>quote e-mails,documents.|
|2|Invite users:e-mail,Invite;Owner can toggle Owner,Resend or cancel.|Invitee presses"Agree&join",sets<br>a password and joins as Member<br>(or Owner).|
|3|Settings>Customers:default margins,customer login, "Reveal carrier names",<br>credit limits("Enforce credit limits",proposed Off at launch, approval pending),booking hold.|Defaults for every customer.|
|4|Settings>Carriers:Terms and Fees text,carrier agreement text or link,rate<br>confirmation reply-to e-mail and phone, "Send packet requests", "Use terms<br>and conditions",tracking connection.|Used by rate confirmations and<br>carrier pages.|
|5|Settings>Accounting:connect QuickBooks,expense account and invoice<br>service item,payment terms(default30days),invoice Cc addresses<br>(restrictions on bills and payments are set up with Stackup,ROL-021).|Bills and invoices push to<br>QuickBooks.|
|6|LTL carrier accounts: 10-4's account number and credentials,activate.|"activating"then"activated";rating<br>starts.|
|7|Teams if used;report access.||


#### B. Add a customer (Rep; Owner-only settings marked) 

Steps (detail 4.7): +, add a customer, type the name (3 or more characters runs a "Did you mean?" duplicate search), Add customer (name only, no e-mail sent); billing address and e-mails, tax and legal details, "require POD" switches, "Combine PDFs (bill and POD)" (CUS-015), "Days to pay" (Owner sets, Members see only; each field saves on leaving it); contacts; Booking and quoting (booking on or off is Owner only, customer login, auto-quoting, auto-dispatching; controls the portal, Workflow 7); margins and minimum profit per carrier (Workflow 1); sales reps (one primary); credit limit and note (Owner), documents, address book of shipper and consignee locations (prefills shipments). 

#### C. Add a carrier (Rep, with Owner approval; detail 4.8, 4.3) 

|#|Action|Result|
|---|---|---|
|1|+,Carrier,search by MC,DOT or name;Add to your list><br>Add carrier.|FMCSA results;status Candidate("Haven't worked<br>with this carrier before").|
|2|Add contacts(Owner sets payment terms,tax,legal entity,<br>1099status).Request carrier packet(or"Cover&request<br>packet").|Carrier gets a secure-link e-mail.|
|3|Carrier confirms company information(or"This is not me"),<br>uploads authority,insurance certificate,W-9,enters<br>insurance details.|Packet completed;rep sees documents and<br>insurance expiry.|


|#<br>Action|Result|
|---|---|
|4<br>Owner sets Approved(or"Don't use this carrier").|Held rate confirmations released(WF-008);carrier|
||leaves"Approve&review carriers" (CAR-007,CAR-<br>015).|


#### D. Add another vendor (Rep) 

+, Vendor, type (for example Towing, Lumper, Warehouse), name. It can then be added to a shipment with its own purchase order and bill. 

##### WF-039 Single account 

One company's account: no public sign-up, no switching between accounts. Users join only by Owner invitation. 

###### WF-040 

##### Roles in setup 

Owners do setup and approvals (settings, users, carrier approval, LTL carrier accounts, credit decisions, carrier agreement text); Members work day to day. The system enforces this on every action, not only by hiding buttons. 

##### WF-041 Importing existing data 

Migration is a proposed workstream, not a verified import facility or approved inclusion/exclusion list. Main §19.7/20.10, Scope SC-10 and the Documentation Plan require a source inventory, volumes, documents/history, balances, retention, access and cutover decisions. No working Owner import screen, extraction API, repeat-import behavior or completed import is established. Notes, history, assignments, email/share evidence and payments must not be silently excluded or promised; see section 8 for the decision and validation checklist.

### Workflow 9: E-mails and notifications across the lifecycle 

A small number of e-mails, each with a secure link; staff also see live counters and banners. Wording and rules: section 5 (EML IDs). 

|Moment|E-mail|To|
|---|---|---|
|Quote ready|Quotes link("Quotes for-> ")|Customer contact|
|Shipment booked|BOL and labels download links|Each stop contact with"Share<br>BOL"on|
|Load covered(approved<br>carrier)|Rate confirmation("Confirm Load", "View rate<br>confirmation",PDF attached)|Carrier dispatcher|
|Candidate carrier covered|Carrier packet request|Carrier contact|
|Carrier signs|Signed confirmation copy(only when a carrier agreement<br>applies)|Carrier dispatcher|
|Terms changed after<br>signing|Updated rate confirmation|Carrier dispatcher|


|Moment|E-mail|To|
|---|---|---|
|Invoice sent|Invoice with PDF and POD|Billing contacts and Cc|
|Invoice shared again|Invoice link|Chosen contacts|
|Late payer|Customer statement with PDF|Billing contacts|
|New user|Invitation link|Invitee|
|Customer sign-in|One-time sign-in link(15minutes)|Customer contact|
|Staff forgot password|Password reset link|Staff user|
|E-mail address check|E-mail verification link|The user|


Not sent by the system: a booking confirmation to the customer (only the BOL e-mail goes out), the driver's tracking text (the tracking service sends it), notices of assignment, QuickPay requests, credit-request e-mails (a mail link opens the user's own mail program), weekly past-due statements (planned), and incoming carrier invoices (they reach the accounting mailbox). 

In-app notices (not e-mail): short pop-up messages, live counters on the sidebar queues (Finish booking, Quote, Dispatch, Cover, Confirm pickups, Confirm deliveries), warnings on shipment pages, live updates to shipment pages (4.12). 

##### WF-042 Recipients 

BOL and labels: each stop with "Share BOL" on and a contact e-mail; pickup at a third-party warehouse uses the facility contact. 

- Rate confirmation: the dispatcher chosen at cover. 

Invoice: billing e-mails plus the account Cc list; if none, the dialog asks and saves it. 

Quotes: customer contacts plus any typed addresses. 

##### WF-043 Delivery log 

Staff see each share's state (pending, sent, unopened, opened) and failures ("Failed to send"). 

##### WF-044 Sender and reply-to 

E-mails come from 10-4's own sender domain. The rate confirmation reply-to is set in Settings > Carriers; otherwise replies go to the rep who covered the load. 

### Who can do what (workflow view)

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

|Action|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|Quote,book,cover,track,upload|Yes|Yes|Quote and book LTL only;|No|
|documents|||track own shipments||


|Action|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|Share quotes,send rate confirmation,<br>send invoice|Yes|Yes|No|No|
|Approve a carrier,override a blocked<br>carrier|Yes|No|No|No|
|Margins outside limits|Yes|No|No|No|
|Approve bill,record payments|Yes|Yes,unless<br>restricted to<br>Owners|No|No|
|Settings,users,QuickBooks,LTL<br>carrier accounts,credit decisions|Yes|No(view only)|No|No|
|Confirm rate confirmation(no login)|n/a|n/a|n/a|Yes,through the<br>secure link|
|Fill carrier packet(no login)|n/a|n/a|n/a|Yes,through the<br>secure link|


## 4.1 Navigation, Dashboard and Search

**Evidence review — partial:** Main §§6, 11, 19.6 and Deep1/2 support broker navigation, responsive Main Menu, known-BOL search, mixed Recently visited, a settled no-match result and sampled queues. NAV-001–016, DSH-001–013 and SRC-001–009 are **proposed / unverified beyond those observations**. No source establishes the dashboard dot algorithm, 50-entry activity cap, 250-load map cap, one-hour session refresh, all error screens, keyboard shortcuts, 3-character/500ms search contract, 6-word matching, 10/20 result caps, complete match-field list or cross-role equality of results. These exact numbers and rules require validation. Source §19.6 expressly leaves search fields, minimum length, keyboard behavior, pagination and permission filtering open. Map rendering is separate from routing/tracking (§18). Navigation exclusions await SC-02.


In short: the frame around every screen: the left navigation with task counters, the Dashboard staff see first, and "Find anything…", the search that jumps to any customer, contact or shipment. Customers see a smaller navigation and never see the Dashboard or Find (section 4.11). 

### 4.1.1 Application frame and left navigation 

##### NAV-001 Frame 

Every staff screen sits next to a fixed left navigation bar on a light blue-grey background; the content scrolls on the right. There is no top bar on desktop: each page has its own title row (title left; search, export and sort icons right where present). Printing hides the navigation and prints on white. 

###### NAV-002 

##### Desktop and phone layout 

Desktop or laptop: always visible, a little narrower on small laptops (long labels may be shortened with "…"). 

- Phone or small tablet: hidden. A white top bar shows a menu button (accessible name "Main Menu") on the left and the company logo in the center. The button opens a full-width menu with the same items in the same order. A close "X" replaces the logo while it is open; Escape also closes it, and so does choosing any item. 

##### NAV-003 Items in the navigation, top to bottom 

|#|Item|Shows|Goes to|
|---|---|---|---|
|1|Company logo|The company logo,or the company name<br>if no logo has been uploaded(Settings><br>Company)|Dashboard|
|2|"Quote" (blue button,circled<br>plus on the left)|Always|New quote form|
|3|"Find anything…" (white<br>rounded button with<br>magnifier)|Always|Opens the Find window(SRC-001).The<br>label reads"Find…"when the navigation<br>is narrow.|
|4|Queue links|Only rows with a count above0 (NAV-<br>005)|The matching queue list|
|5|"Customers"|Always|Customers list|
|6|"Quotes"|Always|Quote history|
|7|"Shipments"|Always|Shipments list|


|#|Item|Shows|Goes to|
|---|---|---|---|
|8|"Carriers"|Always|Carriers&vendors list|
|9|"Bills&Invoices"|When accounting is turned on for the<br>company(it is on for10-4)|Bills&Invoices|
|10|"Reporting"|Always|Reports|
|11|"Settings" (gear icon,small<br>text)|Always|Settings|
|12|User block(round photo or<br>initials,full name,arrow)|Always|Your profile(NAV-013)|


Items 5 to 8 each have a circled "+" at their right edge (NAV-008 to NAV-012). Dividers separate the top block, the queues, the modules and the footer. 

##### NAV-004 Current page highlight 

The current page's row has a grey background. Inside a queue list (for example "Cover") only the queue row is highlighted, not "Shipments". 

### Task queues and counters 

##### NAV-005 Queue links with counters 

The queue block lists work needing someone today. Each row has a label and a small orange badge with a number; a row is hidden at 0 and the whole block when every row is 0 (including when only "Confirm deliveries" has work, it shows). Rows in this order: 

|Row label|Counts|Opens|
|---|---|---|
|"Finish booking"|Truckload shipment requests that a customer started<br>in the portal and staff still must finish|The list of shipment<br>requests to finish|
|"Quote"|Quote requests from customers that staff still must<br>price|Quote requests still to<br>finish|
|"Dispatch"|Booked LTL shipments waiting for a pickup request|The list of LTL shipments<br>to dispatch|
|"Cover"|Booked Truckload shipments that still need a carrier|The list of Truckload<br>shipments to cover|
|"Confirm pickups" ("Confirm pickup"<br>when the number is1)|Scheduled shipments whose pickup date is before<br>today|The list of pickups to<br>confirm|
|"Confirm deliveries" ("Confirm<br>delivery"when the number is1)|In-transit shipments whose delivery date has passed|The list of deliveries to<br>confirm|


- Screen readers read each row as, for example, "Cover 53 outstanding tasks" ("1 outstanding task" for one). 

- Non-staff users never see the queue block. 

- There is no queue row for carriers waiting for approval; "Approve & review carriers" opens from the Carriers list (section 4.8). 

##### NAV-006 Counters stay current 

Numbers refresh without a page reload: when a shipment or quote changes anywhere in the company, when you click a queue row, when you change page, and when the connection comes back after a break. 

##### NAV-007 Queue block never hides work 

The block shows whenever any queue has a number above 0. 

### The "+" add menu 

##### NAV-008 "+" next to Customers 

Opens the "Add customer" window over the current page: a "Customer name" box and a blue full-width "Add customer" button, which then opens the new customer's page. Duplicate warning ("Did you mean?") and details: section 4.7. 

##### NAV-009 "+" next to Quotes 

Opens a new quote form (section 4.6). 

##### NAV-010 "+" next to Shipments 

Opens a new shipment form (section 4.2). 

##### NAV-011 "+" next to Carriers 

Opens the window "What do you want to add?" with two dashed tiles: 

- "Carrier": "Freight carrier with MC or DOT number" — opens a search box "Carrier MC or DOT #" and then the carrier's page. 

- "Vendor": "Providers such as crane, insurance, warehouse, etc." — opens the add-vendor form. (Section 4.8.) 

##### NAV-012 "Quote" button 

The blue "Quote" button starts an LTL quote from any page. 

### Profile menu and footer 

##### NAV-013 Settings and profile 

At the bottom of the navigation: 

- "Settings" opens the Settings home page (section 4.10). 

- The user block shows your photo (or initials on a blue circle) and full name; clicking opens your profile (ACT-006). There is no drop-down: "Log out" is a button on the profile page. The close "X" on Settings or the profile returns to the previous page. 

##### NAV-014 Navigation for other users 

Customers see "Quote", "Quotes" (with "+"), "Shipments", "Invoices", "Data" only: no Find, queue block, Customers, Carriers, Bills & Invoices, Reporting or Settings. Carriers on secure links see no navigation. See section 4.11. 

##### NAV-015 Error and gate screens 

Full-screen blue messages replace the page when needed: 

- "Error logging in": "This probably means we weren't able to reach the server." Buttons "Try again" and "Log out". 

- "Account required": "This page requires an active account." Button "Log out". 

- "Account disabled": "Please contact support to have it re-enabled." Button "Log out". 

- "Authentication error": "This user cannot log in. Please contact Support." Shown to a blocked or removed user who tries to sign in. 

- "Unable to load account": "We couldn't find this login page. Check the link you were given." Shown when a customer opens a login link that cannot be matched to 10-4's account. 

###### NAV-016 

##### Start-up screen and session refresh 

After sign-in a full-screen loader shows until the person's details, the company and the screen lists have loaded. If the tab was in the background for more than one hour, these details refresh on return, so changes made meanwhile (for example a new role) apply without signing in again. 

### 4.1.2 Dashboard 

##### DSH-001 Dashboard purpose and access 

The staff home page (after sign-in, and via the company logo): quotes and shipments per stage as clickable dots, three to-do counters, your own recent activity, and a map of today's pickups and loads in transit (layout DSH-013). Customers are sent to the Quote form instead. 

##### DSH-013 Dashboard layout 

No title row. A map fills the page; tiles float over it. Top: "Quotes" group (left, one third) and "Shipments" group (right). Bottom right: counters "Quote", "Dispatch", "Cover". Bottom left: map filter buttons. 

##### DSH-002 "Quotes" group 

Rounded card "Quotes" with two tiles; the card opens Quote history. Each tile is a row of dots, one per open quote request. 

|Tile|Counts quote requests with status|Click on the tile opens|
|---|---|---|
|"Requested"|Draft requests(customer asked,no quote sent yet)|Quote history filtered to"Requested"|
|"Quoted"|Requests that have a quote waiting|Quote history filtered to"Quoted"|


The Quote history page shows the filter as a removable chip, "Status: Requested" or "Status: Quoted". Click on one dot opens that quote request. 

##### DSH-003 "Shipments" group 

Rounded card "Shipments" with four tiles; the card opens the Shipments list. One dot per shipment (canceled shipments and drafts are not counted). 

|Tile|Counts shipments with status|Click on the tile opens|
|---|---|---|
|"Requested"|Requested|Shipments list filtered to Requested|
|"Booked"|Booked|Shipments list filtered to Booked|
|"Scheduled"|Scheduled|Shipments list filtered to Scheduled|
|"In transit"|In transit|Shipments list filtered to In transit|


One dot opens that shipment. Other statuses (delivered, canceled) are not shown (statuses: SHP-075). 

##### DSH-004 Dots 

A dot is grey normally and orange when the item needs action: a shipment in a queue (Cover, Dispatch, Finish booking, Confirm pickups, Confirm deliveries), or a customer quote request staff still must answer. Hover shows a blue ring. 

##### DSH-005 Counter cards "Quote", "Dispatch", "Cover" 

Three white cards (label left, number right): 

|Card|Number|Opens|
|---|---|---|
|"Quote"|Quote requests staff still must finish|Quote requests still to finish|
|"Dispatch"|Booked LTL shipments waiting for a pickup request|The list of LTL shipments to dispatch|
|"Cover"|Booked Truckload shipments that need a carrier|The list of Truckload shipments to cover|


A card at 0 is greyed out and cannot be clicked. Numbers equal the navigation badges (NAV-005). 

##### DSH-006 Live updates 

Dots, counters and map update by themselves when anyone books, covers, picks up, delivers or cancels a shipment or a quote request changes. 

##### DSH-007 Loading and empty states 

Tiles show three bouncing dots while loading; empty tiles are blank. Counter cards are greyed at 0. The activity panel is hidden when empty. Map filter buttons are hidden at 0. 

##### DSH-008 Activity panel 

A collapsible card above the counters, titled "Activity" with an arrow, collapsed at first. It lists the signed-in user's own recent bookings and cancellations, newest first, up to 50, scrolling: 

- "BOL {number} booked" 

- "BOL {number} canceled" 

- "Shipment booked" / "Shipment canceled" if the BOL number is not known 

Each row shows how long ago it happened and opens that shipment. The panel shows only if there is at least one entry. 

###### DSH-009 

##### Map 

A map of the United States draws a thin line from origin to destination for each shipment with known pickup and delivery places: 

- In transit shipments are drawn as solid lines. The origin is a small grey ring and the destination a blue pin. Scheduled with pickup today are solid lines with a grey origin circle and a blue destination pin. 

- Scheduled with a pickup date before today (late) are dashed lines with a red origin circle and a grey outlined pin at the destination. 

- Scheduled shipments with a future pickup date are not drawn. 

- The map draws up to 250 scheduled and in-transit loads. The pill (DSH-010) and navigation numbers count all loads, so they can exceed what the map draws. 

##### DSH-010 Map filter buttons 

Bottom left: a round map icon button and up to three pills (hidden at 0): 

|Pill|Counts|
|---|---|
|"{n}Picking up"|Scheduled shipments whose pickup date is today|
|"{n}Late picking up"|Scheduled shipments whose pickup date is before today(same number as"Confirm pickups")|
|"{n}Delivering"|Shipments in transit|


Clicking a pill shows only that group on the map: it turns white with dark text and the others dim. Clicking it again shows everything. Nothing reloads. 

##### DSH-011 "Re-center map" 

The map icon button (title and accessible name "Re-center map") shows the whole country again. 

##### DSH-012 Dashboard on a phone 

The map fills the page behind the tiles; "Quotes" and "Shipments" stack at the top, "Quote", "Dispatch" and "Cover" at the bottom. Map filter pills are not shown. 

### 4.1.3 Find ("Find anything…") and global search 

##### SRC-001 Opening Find 

Staff open Find with "Find anything…" in the navigation (also in the phone menu) or Ctrl+K (Windows) / Cmd+K (Mac) on any page; not available to customers. It is a centered window over a dimmed page with a search box (placeholder "Go to...", cursor already in it) and a round "X" (accessible name "Close modal") at the top right outside the window. 

##### SRC-002 Closing Find 

Find closes on Escape, the "X", a click outside, or choosing a result. The box is emptied on each close. 

##### SRC-003 What the search does 

Nothing is searched until 3 characters are typed; leading and trailing spaces are ignored. 

- It runs about half a second after typing stops; only the latest search counts. 

- A clear "x" shows when the box has text; a spinner shows while loading. 

##### SRC-004 Result groups 

Up to three groups, each with a grey heading, shown only if they have results. Typed words are highlighted. 

|Group|What matches|Order|Maximum|Row shows|Clicking<br>opens|
|---|---|---|---|---|---|
|"Customers"|Customer name|A to Z|10|Customer name|The<br>customer<br>page|
|"Contacts"|Every word typed<br>matches the contact's<br>first name,last name,e-<br>mail or phone|A to Z|10|"{contact name} @ {customer<br>name}";second line:e-mail,then"<br>/ "and phone|The<br>contact's<br>customer<br>page|
|"Shipments"|See SRC-005|Newest<br>pickup<br>date first|20|The standard shipment row:BOL,<br>pickup date,customer,route<br>(origin to destination),delivery<br>date,carrier and status|The shipment<br>page|


##### SRC-005 Keyword search on shipments 

With several words, every word must be found in any of the fields below (words may match different fields; at most 6 words used). Matching ignores case and matches part of a word. 

- Shipment numbers: BOL number, custom BOL number, original BOL number, PRO number, pickup number. 

- Stops: city, state, ZIP, company name, contact name, every reference number. 

- Customer name and the customer's shipment contact name. 

- Carrier: carrier name, driver name, driver phone, trailer number, carrier pickup number. 

- Shipment notes (notes that have not been deleted). 

###### SRC-006 

##### Keyboard 

- "Down" and "Up" arrow keys move through the results and wrap around at the ends. 

- "Enter" in the search box opens the first result (the top hit). 

- "Enter" or "Space" on a highlighted result opens it. 

##### SRC-007 Messages and states 

|State|What the user sees|
|---|---|
|Box empty,no history|Only the search box|
|Fewer than3characters|Blank below the box|
|Searching|Spinner|
|Nothing found|"No matches found for{text}"|
|Search failed|"Search failed.Try again."|


##### SRC-008 Recently visited 

**Observed subset:** Main §19.6 records mixed recently visited records; Deep1 E-123 records automatic `PUT /users/settings/account` with a `recentlyVisited` object. The five-per-kind cap, complete ordering and storage/retention rules below are proposed, not established by structural network evidence.


When the box is empty and the user has visited records before, the window shows a heading "Recently visited" and a list of the last records the user opened, newest first, mixed together (no group headings). The system remembers up to 5 of each kind. Each row is one button with an icon and: 

|Kind|Icon|Row text|Opens|
|---|---|---|---|
|Customer|Building|Customer name|Customer page|
|Shipment|Pallet box|"{origin city,ST}to{destination city,ST}"and grey"BOL{number}"|Shipment page|
|Quote|Stacked|"{origin}to{destination}"and grey customer name(no grey text if no|Quote results|
|request|layers|customer)|page|
|Vendor|Vendor icon|Vendor name|Vendor page|
|Carrier|Carrier icon|Carrier name|Carrier page|


A record is added each time its page is opened. Users and teams are not listed. 

##### SRC-009 Other pickers 

Some forms reuse the box with another placeholder: "Find shipment..." (pick a shipment to link) and "Find customer..." (pick a customer). 

### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

- Owner and Member: full navigation, Dashboard and Find, with identical counters and results. Find shows every customer to every staff user (ROL-019). 

- Customer: shorter navigation; no Dashboard, queues or Find; sent to the Quote form from the home page. Carrier: no navigation (secure links only). 

## 4.2 Shipments

**Evidence review — partial:** Main §§15–16, Deep2 E-124–144 and network runs `DEEP-02-R001`–`R011` establish sampled list/filter/form/detail variants. Every requiredness, limit, default, save/cancel/send outcome, permission or transition not specifically established is **proposed / unverified**; enabled controls and HTML constraints do not prove backend acceptance.

| Requirements reviewed | Source-supported portion | Unverified / correction |
| --- | --- | --- |
| SHP-001–008 | Active/All, row fields, sampled BOL/amount comparison, Partial allowed marker, three sort labels; §15.2–3/Deep2 | Active inclusion, invoice-paid removal, grouping/defaults, full color/alert catalog, lead min/max, sort/tie rules. Alert names are not verified provider enums. |
| SHP-009–014 | Filter/preset menus; Select truckload checks 11 non-LTL families; Apply count and unmatched states; Deep2 E-133–135 | Full matching, geography, week/timezone boundaries, session/scroll storage, 1,000-row cap, paging, CSV contents/file names/timing. Reset retained search. |
| SHP-015–022 | Booked in Cover, Scheduled in pickup, In transit in delivery; empty Dispatch; §15.2/Deep2 E-136–142 | Portal/Finish booking, exact date cutoffs/counters, export, submission effects. Rendered count need not equal total. |
| SHP-023–026 | Custom BOL/customer fields, edit metadata/customer display, Change customer entry; §§15.4/16.2 | Numbering/uniqueness, contact defaults, hold/credit enforcement, creation restrictions and exact errors. |
| SHP-027–029 | 70 equipment choices, Other text, LTL gate, flag/temperature/dimension branches, nine vendor types; Deep2 E-128/132/143–144 | Equipment maxima/validation, universal locks, vendor assignment/removal/cardinality/charge generation. |
| SHP-030–037 | Initial stops, third Delivery, reorder controls, catalogs/template entry/appointment; §§13/16.3/7/Deep2 E-128–130 | Route source, 180/31-day limits, clock/holiday enforcement, inheritance/template writes, full reference catalog, sequencing/save effects. |
| SHP-038–042, SHP-079 | Packaging/contains/units, sampled math, partial-length warning, Dry Van hazmat fields/menu; Deep2 E-129–130/143 | Trade-show class/NMFC assignment, NMFC regex, customs trigger, VIN/one-vehicle policy, required dimensions/value and server validation. |
| SHP-043–046, SHP-077–078 | Calculators and specific arithmetic; negative-profit warning with Book enabled; §§14.8/15.8/16.5/Deep2 E-131 | Precedence, minimum-profit clamp, Owner bypass/Member denial, universal rounding/zero rules, 147-charge catalog and lane-history algorithm/supplier. |
| SHP-047–053 | Blank Hide contacts unchecked versus populated checked; assigned Rate Con checked; delivered editor/duplicate entry; §16.5–6/Deep2 | Recipient enforcement, draft/duplicate copy policy, atomicity/idempotency, stale-save/error contract and sends. |
| SHP-054–064, SHP-068 | Detail sections, historical statuses, party/document paths, itemized controls, maps and dated measurements; §15.5–11 | Full visibility/state/amount rules, invoice creation, invoice-reference schema, vendor removal and save/send effects. |
| SHP-065–067 | Authored notes, Timeline, old/new filter event; §15.11/Deep2 E-125–127 | Autosave/format/edit/delete/undo, 75-event cap, audiences and complete actor/event schema. |
| SHP-069–076 | Varying menus, canceled Uncancel/no Edit, Reps headers, status labels; §§15.11/16.9/Deep2 E-136/140 | Cancel/TONU/uncancel financial/tracking effects, commissions, state machine and external-user views. |

No complete submitted shipment workflow or role/status matrix is proved.


In short: This part of 10-4 TMS is where every load lives. Reps list and filter shipments, work the daily queues (cover, confirm pickups, confirm deliveries, dispatch, finish booking), book a new truckload or auto transport shipment, edit or duplicate it, and run it from one detail page. The detail page shows who hauls the load, what it costs and earns, every stop, the items, notes, and a full history of changes. Owners and Members use all of it. Customers and carriers see a reduced view of the same shipment.

## Part A. Shipments list and work queues 

### Shipments list 

The list is reached from "Shipments" in the left menu. The page title is "Shipments". A "+" button next to the title (screen-reader text "Create new shipment") opens the new shipment form. A small spinner shows next to the title while data loads. 

##### SHP-001 Two list views: Active and All 

Tabs "Active" and "All". Changing tabs keeps the current filters but resets the sort to that tab's default. 

|Tab|What it shows|Layout|Default<br>sort|
|---|---|---|---|
|Active|Shipments that still need attention:Requested,<br>Booked,Scheduled,In transit,and Delivered<br>shipments whose customer invoice is not fully<br>paid yet.Canceled shipments never appear here.|Grouped by status,each group with a sticky<br>header with the status name,in this order:<br>Requested,Booked,Scheduled,In transit,<br>Delivered.The chosen sort is kept within each<br>group.|Pickup<br>date,old<br>to new|
|All|Every shipment,including Canceled.|One flat list,no group headers.|Pickup<br>date,new<br>to old|


##### SHP-002 Header controls 

|Control|What it does|
|---|---|
|Title and"+"|See above.|
|Search and filter<br>box|A wide box with a magnifier icon showing the current search text and filter chips.Clicking anywhere in<br>it opens the search and filter window(SHP-009).Accessible name"View shipment filters".Empty,with<br>no placeholder text,when no filter is set.|
|Tabs"Active"and<br>"All"|Switch the view(SHP-001).|
|Export button<br>(download icon)|Opens a small panel(SHP-013).Shown only when the list has at least one row,for Owners,Members<br>and customers(own shipments only).|
|Sort button(sort<br>icon)|Opens a small panel with three sort options(SHP-008).The arrow icon shows the current direction.|


##### SHP-003 Shipment row 

Each row is a white card; clicking it opens the shipment detail page. Accessible name "View shipment" followed by the BOL number. On narrow screens the row folds into a two-line card. 

|Column|What it shows|
|---|---|
|Status dot and<br>BOL|A small colored dot for the status(SHP-004)and the BOL number.Under the BOL:the tracking alert<br>icon,if any(SHP-006).On hover the status word appears under the BOL.|
|Pickup|Line1:date as"Oct9Fri" (month,day,weekday);outside the current year the year replaces the<br>weekday.Line2:the actual pickup time once picked up,otherwise"Appt@ 9:00am"when the first stop<br>has an appointment.Dimmed to30percent after pickup(full on hover).|
|Customer and<br>price|Customer name;under it the customer price,for example"$550.00".Hidden on small screens.|
|Origin,route,<br>destination|Origin city and state on the left,destination city and state on the right(ZIP on wide screens).The<br>shipper company shows on a second line when different from the customer name;the consignee<br>likewise.In the middle a short line with a dot at each end;dots and line turn green when the origin is<br>picked up and when the destination is delivered.A grey circle with a number shows the count of stops<br>between origin and destination when there are more than two stops.The distance,for example"1,730<br>mi",sits under the line on wide screens.|
|Delivery|Same date format as Pickup.Line2:the delivered time,or"Appt@time"when the last stop has an<br>appointment.Dimmed until the load is picked up.|
|Equipment and<br>weight|Equipment name("LTL"for LTL loads)and weight,for example"42,000lb".A solid dark"P"badge<br>before the equipment means the load is partial.A dashed"P"badge means a partial is allowed.|
|Carrier or leads<br>(Owners and<br>Members only)|See SHP-005.|


##### SHP-004 Status dot colors 

|Status|Dot|
|---|---|
|Requested|Grey,dashed outline|
|Booked|Orange|
|Scheduled|Light blue|
|In transit|Blue|
|Delivered|Green|
|Canceled|Light pink|


A Canceled row is shown at 50 percent brightness (full on hover). A Requested row has a dashed bottom border. 

Customers see "Scheduled" for a load that is Booked in the broker's view. 

##### SHP-005 Carrier and cost block on each row 

The right side of the row (Owners and Members only) shows one of: 

- Carrier assigned: the carrier name; a blue hourglass before the name while the rate confirmation is waiting to be signed; under it the carrier cost, for example "$475.00". A red "carrier hidden" icon follows the cost when the load has an unused carrier charge (a dropped carrier that was paid TONU). 

- Carrier leads, no carrier yet: "N leads" (for example "19 leads"). A second line shows the lowest and highest quoted cost as "$300.00 — $400.00" (compared as numbers), or one amount when all are equal; only when at least one lead has a cost. 

- Nothing yet: the text "No carrier". 

##### SHP-006 Tracking alert icon 

The icon under the BOL number comes from the load's live tracking. An invisible placeholder keeps the row height when there is no alert. 

|Alert text|Icon and color|
|---|---|
|On Time or Ahead of Schedule,At Pickup,At Stop,Left Stop|Clock,green|
|Behind Schedule|Circular arrow,<br>orange|
|Possible Detention|Hourglass,orange|
|Out of Route,Out of Expected Route|Route icon,red|
|Driver Turned Off Location Services(Android or iPhone),GPS Off,Location Off,Location Hidden,<br>Phone Off,No Phone,Driver Phone Low Battery,Tracking Stopped|Warning triangle,<br>orange|
|Potential Fraud:Compromised Device,Carrier Overbooked,Device Spoofing,IP Masking Tools,Non-<br>North American Activity,VOIP Phone Number|Circle with x,red|
|Cannot Determine,Temperature Too Low,Temperature Too High,Temperature Reefer Unit Turned Off,<br>Temperature Alert,Cannot Make It|Warning triangle,<br>red|
|Past Appointment Time|Clock,red|


Stop-level tracking is in section 4.4. 

##### SHP-007 Attention highlight (Active tab only) 

For Owners and Members, an Active row gets an orange stripe on its left edge when the load needs action: it is marked as needing action (for example a scheduled load whose pickup date has passed), a carrier is waiting for approval, or it has no carrier. The All tab and the queues do not show the stripe. 

##### SHP-008 Sort 

Three options; the selected one is highlighted blue. 

|Option|Label|Second text|
|---|---|---|
|1|Created date|new to old|
|2|Pickup date|new to old|


|Option|Label|Second text|
|---|---|---|
|3|Pickup date|old to new|


The choice is remembered for each view (SHP-011). The "Confirm deliveries" queue has no Sort button; it is always sorted by delivery date, oldest first. 

##### SHP-009 Search and filter window 

Clicking the search and filter box opens a centered window with a round close button above its top right corner. Clicking outside, or pressing Enter in the search field, closes it. 

At the top is the search field with the placeholder "search for...", focused on open. The text is applied half a second after typing stops and finds a load by any word, for example a city, customer, BOL or reference. Below it are the chips of the filters already set (SHP-010). Then these sections, in order: 

|#|Section|Control and options|
|---|---|---|
|1|Status|Six on/off switches,each with a status word and a colored dot:Requested,Booked,Scheduled,In<br>transit,Delivered,Canceled. "Scheduled"is shown to Owners and Members only.Several can be on.|
|2|Equipment|Twelve on/off switches,one per equipment group,in this order:LTL,Dry Van,Flatbed,Refrigerated,<br>Intermodal,Drayage,Dump,Dry Bulk,Power Only,Driveaway,Auto Transport,Tanker.A blue link at the<br>top right says"Select truckload"and switches on every group except LTL;when exactly those are on it<br>says"Unselect truckload"and clears them. "LTL"together with other groups shows loads matching any<br>of them.|
|3|Booked<br>date|A date range box with two date inputs separated by an em dash and a calendar button.Below it a grid<br>of preset buttons:Today,Yesterday,This week,Last week,This month,Last month,This year,Last<br>year.A custom range can be typed or picked.|
|4|Pickup date|Same range box.Presets:Today,Tomorrow,Yesterday,This week,Next week,Last week,This month,<br>Next month,Last month,This year,Last year.|
|5|Delivery<br>date|Same as Pickup date,same eleven presets.|
|6|Origin<br>address|Type a city or state;suggestions appear after a short pause.Choose one.|
|7|Destination|Same as Origin address.|
|8|Carrier|Pick list with the placeholder"select a carrier".Lists only carriers that appear on shipments,with logos,<br>sorted by name.Hidden from customers when the account hides carrier names from customers.|
|9|Customer|Pick list with the placeholder"select a customer"and the groups"Recently shipped"and"Recently<br>selected".Lists only customers that have shipments.Hidden for carriers,and for customer users who<br>have only one customer.|
|10|Rep|Pick list with the placeholder"select a team or user".Groups: "Recently selected" (last five)and"All".<br>Teams and users can be picked.Owners and Members only.|
|11|Booked by|Same pick list.Owners and Members can pick any user or team;other users only themselves.|
|12|Covered by|Same as Booked by.|


- Weeks start on Sunday. A preset covers the whole day from midnight to the end of the day. 

- The footer shows an outlined blue button "See N shipments" with the number of matches (for example "See 118 shipments"; "See 1 shipment" for one; "See shipments" while the count is unknown). Clicking it closes the window. 

##### SHP-010 Filter chips 

Each filter set shows as a blue chip in the search box with an "x" to clear just that filter. Search text is printed in front of the chips and is not a chip. 

|Filter|Chip text|
|---|---|
|Booked,Pickup,Delivery date<br>preset|"Booked this week", "Pickup this week", "Deliver this week" (preset in lower case)|
|Booked,Pickup,Delivery custom<br>range|"Booked10/1-10/9", "Pickup10/1-10/9", "Deliver10/1-10/9".A single day shows<br>"Booked10/1".|
|Origin,Destination|The area,for example"Dallas,TX"|
|Booked by|"Booked by"and the name|
|Covered by|"Covered by"and the name|
|Customer,Carrier,Rep|The selected name|
|Status,Equipment|The first value,then"+N"for the rest,for example"Booked+2"or"Dry Van+1"|


##### SHP-011 Filters and sort are remembered 

Filters and sort of each view are remembered while the user stays signed in on that browser tab; returning to a view restores it, including the scroll position. They are also written into the page address, so a bookmark or shared link reopens the same view. Date presets stay as words in the address ("This week"), so a bookmarked "This week" always means the current week. A link to the Active view can ask for a clean view, which clears remembered filters. 

##### SHP-012 Scrolling and paging 

Active: one load of up to 1,000 rows, grouped, no paging. 

- All and all queues: more rows load as you scroll; unloaded rows show a grey placeholder. 

- The total count is shown by "See N shipments" and the queue counters. 

##### SHP-013 Export to CSV 

The Export button opens a small panel with the text "Export these shipments to a .CSV file." and a blue button "Export". The file contains every shipment matching the current filters and sort, not only the rows loaded on screen. Available on every view that has rows, including the queues. 

- The button shows a loading state while the file is prepared. "Download will start soon" shows for 1.5 seconds; if the file cannot be made, "Download failed". 

- File name: the account name, the word "Shipments", then date and time, for example `10-4 Global Shipments 2026-10-09-141530.csv` . 

- Columns (the default set; an Owner can change it, section 4.9): Equipment, Carrier Name, USDOT, MC Number, Cost, Price, Profit, Margin, Pickup Date, Delivery Date, Origin Postal Code, Destination Postal Code, Total Weight, Mode. 

- Customers export only their own shipments, with a fixed set of columns and no cost, profit or margin. The carrier name appears only when the account does not hide carriers from customers. 

##### SHP-014 Empty, loading and error states 

|Situation|What the user sees|
|---|---|
|Loading|Spinner next to the title,grey placeholder rows.|
|All tab,filters set,no match|"No shipments found" (or<br>`No shipments for "text" found` when searching)and<br>a button"Reset filters".|
|Active tab,nothing to show|"No active shipments" (or<br>`No active shipments for "text" found` )and a gray<br>button"Switch to all shipments".|
|All tab,no filters,account has no<br>shipments|"Let's add your first shipment."with the buttons"Create a shipment"and"Get LTL<br>quotes".|
|Active tab with rows that are all<br>filtered out|A dashed"+shipment"link that opens the new shipment form.|
|Queue with nothing in it|A"document missing"icon and the text"No active shipments."|
|The list cannot be loaded|A visible error message with a way to try again,instead of an empty list.|


##### SHP-015 What customers see on the list 

Customer users (portal) see only their own shipments, in the simple list, with no carrier and cost column and no queues. They see the Customer filter only when they belong to more than one customer, never the Rep filter or the Scheduled-status toggle, and can use Booked by and Covered by only for themselves. They can export their own shipments (SHP-013). The portal is in section 4.11. 

### Work queues 

##### SHP-016 How the queues work 

Each queue is a short, fixed list answering "what do I need to do now?", with its own page and count badge in the left menu. Shared rules: 

Same rows as the Shipments list (SHP-003); the Quote queue lists quote requests instead (section 4.6). 

- No search box, filter window or Active/All tabs; the filters are fixed by the queue. 

- A "+" button next to the title creates a shipment. Export (when it has rows) and Sort (except Confirm deliveries). 

- Rows are flat (no group headers) and have no attention stripe. 

Badge totals and currently rendered rows must be distinguished; complete equality/pagination and alternate-role access are unverified. Deep2 records matching totals larger than currently rendered links.

|Queue|Page title|What lands in it|Default sort|
|---|---|---|---|
|Finish<br>booking|Shipments to<br>book|Truckload shipments in status Requested that a customer asked<br>for through the portal and that have a pickup date today or later.<br>The rep finishes and books them.|Pickup date,old<br>to new|
|Quote|Shipments to<br>quote|Quote requests from customers that staff still must price(section<br>4.6).|See section4.6|
|Dispatch|Shipments to<br>dispatch|LTL shipments in status Booked,where the carrier pickup request<br>has not been completed.|Pickup date,old<br>to new|
|Cover|Shipments to<br>cover|Truckload shipments in status Booked that have no carrier yet.|Pickup date,old<br>to new|
|Confirm|Shipments to|Scheduled shipments(carrier assigned)whose pickup date is|Pickup date,old|
|pickups|confirm pickups|before today.|to new|
|Confirm<br>deliveries|Shipments to<br>deliver|In transit shipments whose delivery date has passed and that are<br>not yet marked delivered.|Delivery date,<br>old to new,fixed|


##### SHP-017 Cover queue ("Shipments to cover") 

The rep opens a row and clicks the orange "Cover" card to assign a carrier (section 4.3). Rows show "N leads" or "No carrier" in the right block. A covered load becomes Scheduled and leaves the queue; dropping a carrier (section 4.3) puts it back. 

##### SHP-018 Confirm pickups queue ("Shipments to confirm pickups") 

The rep opens each load and confirms "Picked up" (section 4.4). The cut-off is the start of the user's own day. A row shows the carrier name and cost; a blue hourglass before the carrier name means the rate confirmation is not signed yet; a pickup alert icon can appear under the BOL. The menu label reads "Confirm pickup" when the count is 1. 

##### SHP-019 Confirm deliveries queue ("Shipments to deliver") 

All rows are already picked up, so the Pickup column is dimmed and shows the pickup time, and the origin dot is green. The Delivery column shows the date and "Appt @ time" when an appointment exists. The rep opens each load and confirms "Delivered" (section 4.4). The menu label reads "Confirm delivery" when the count is 1. No Sort button. 

###### SHP-020 

##### Dispatch queue ("Shipments to dispatch") 

Rows are like the Cover queue but show "LTL" as equipment. The rep opens the load to complete the pickup request (section 4.6). The menu row is hidden when the queue is empty. 

##### SHP-021 Finish booking queue ("Shipments to book") 

Truckload shipment requests sent by customers from the portal (section 4.11) that a rep has not booked yet, in status Requested with a dashed grey dot. Opening a Requested shipment always opens its edit page, where 

the rep checks the details, adds cost and price, and clicks "Book shipment". Requests with a pickup date in the past are not listed. Shipments saved for later by a rep (SHP-049) are not in this queue; they appear in the Active list under Requested. 

##### SHP-022 Sidebar counters 

Under "Find anything…" in the left menu is a block of queue rows, each with an orange count badge and the screen-reader text "outstanding tasks". Order: Finish booking, Quote, Dispatch, Cover, Confirm pickup(s), Confirm delivery/deliveries (see NTF-001 and NTF-002 for refresh rules). A sidebar counter for carriers waiting for approval is planned for later (the page "Approve & review carriers" is opened from the Carriers list, section 4.8). 

- A row is hidden when its count is 0. The whole block shows when any row has a count above 0, including when only Confirm deliveries has work. 

- The block shows only for Owners and Members. 

- The row for the current page is highlighted; the "Shipments" row is not highlighted on a queue page. 

- Counts refresh after any shipment action and when the page is opened. 

## Part B. Create, edit and duplicate a shipment 

One form serves all three jobs. It is reached from the "+" next to "Shipments", from the "+ shipment" buttons on the dashboard and on customer pages (the customer is then pre-selected), from the pencil on the detail page, from "Reschedule", and from "Duplicate shipment" in the "…" menu. 

|Mode|Page title|Main button|"Save for later"|
|---|---|---|---|
|New|Book shipment|Book shipment|Yes|
|Duplicate|Book shipment|Book shipment|Yes|
|Edit a Requested shipment|Edit shipment|Book shipment|Yes|
|Edit a Booked,Scheduled,In transit or Delivered shipment|Edit shipment|Update shipment|No|


The form always creates truckload-style shipments (mode "TL", including Auto Transport and every other non-LTL equipment type). LTL shipments are created from an LTL quote (section 4.6) and can then be edited with this form, which shows the LTL-only fields noted below. 

Sections in order: header, Customer, Equipment (with "+ add vendor / carrier"), Locations, Items to be shipped, Cost & price, Hide contacts from carrier, Send updated documents (edit only), submit area. On edit and on wide screens, a right-hand column shows Notes and the Timeline (SHP-065, SHP-066). 

### Form header 

##### SHP-023 Form header 

|Element|Rules|
|---|---|
|Title|"Book shipment" (new,duplicate)or"Edit shipment" (edit).|
|Back arrow|Edit only.Shown when the user came from the shipment's detail page or a quote page;returns there.|
|Status chip|Edit only.The current status.|
|"Created…by…"<br>row|Edit only. "Created8days ago"and"by"the user's name(hover shows the user name).Reads<br>"Quoted"instead of"Created"for a shipment booked from a quote.Hidden for a Requested shipment<br>when the viewer is not an Owner or Member.|
|"…"menu|On edit only.One item, "Cancel",which opens the cancel window(SHP-072);offered only when the<br>shipment can be canceled(Booked,Scheduled or In transit).New and duplicate forms have no menu.|
|Right column<br>(edit,wide<br>screens)|Notes and the Timeline(SHP-065,SHP-066).|


##### SHP-024 Custom BOL number 

A small field "Custom BOL" with the placeholder "#" sits in the header. 

- The system assigns its own BOL number as soon as the shipment is saved, including shipments saved for later. 

- A rep can type the shipper's own BOL number instead; it is shown as the BOL number everywhere and need not be unique. 

- On edit the field shows the current BOL number and has a trash button; clearing it goes back to the system number. Tooltip when a value is present: "Clear this BOL number to go back to the system-generated one." 

- If a custom number equals the system number, nothing is changed or logged. 

### Customer 

##### SHP-025 Customer and contact 

|Field|Input|Required|Default|Rules and messages|
|---|---|---|---|---|
|Customer|Pick list,placeholder"select<br>customer",user icon.Two<br>groups: "Recent"<br>(customers the user viewed<br>lately,newest first)and"All".<br>Typing filters the list.|Yes|Empty;or the<br>customer from the<br>link(for example<br>"+shipment"on a<br>customer page);or<br>the source<br>shipment's<br>customer on<br>duplicate|When the typed text matches nothing,the<br>first option reads"+add{text}" (blue)and<br>opens the new customer window(section<br>4.7).If the account restricts adding<br>customers to Owners and the user is a<br>Member,it reads"contact account owner<br>to add customer" (orange)and does<br>nothing.Choosing a customer clears the<br>contact,copies the customer's billing<br>address to the shipment,and loads that<br>customer's credit state,contacts and<br>margin limits.Empty: "Please fill out this<br>field."|
|Contact|Pick list,label"Contact",<br>placeholder"select<br>contact".Each row shows<br>the contact's full name and<br>email on the right(or"no<br>email"in italics).The first<br>option is"+add new<br>contact" (or"+add{text}"<br>when typing),which opens<br>the contact window(section<br>4.7).|No|The customer's<br>first contact<br>(lowest position)<br>when it has an<br>email|Optional.Requiring a contact to book is<br>planned for later.|
|Credit<br>badge|Small badge next to the<br>customer|—|—|Always shown when the customer has a<br>credit state.Details in section4.7.|


On edit, customer and contact are plain text once the shipment is past Requested. To move a booked shipment to another customer, use "Change customer" (SHP-071). 

A customer user (portal) cannot change the customer; the form uses their own. 

##### SHP-026 Booking disabled for a customer 

When a customer's "Booking" switch is off (section 4.7), a card "Booking disabled" appears with the text "Customer has a booking hold" and a link to the customer page. "Booking is disabled." is added to the tooltip 

of the "Book shipment" button, and the button is disabled. "Save for later" still works. Credit-limit blocking ("Enforce credit limits", proposed Off at launch, approval pending) is defined in PAY-022 and SET-020 (card texts: CUS-028, CUS-029); when it applies, a card shows the credit usage with "Request credit", "No credit", "Limit not set", "Edit Credit Limit" or "Add credit note" depending on the user and state.

### Equipment 

##### SHP-027 Equipment 

**Direct-entry LTL gate:** Selecting LTL on the new-shipment form shows “LTL direct booking coming soon” and “Get LTL quotes,” with booking gated; the link opens the quote form (Deep2 E-132/134). Presence among the 70 options does not prove manual LTL booking. Changing this requires OQ-31/SC-02 approval.


The section heading is "Equipment". 

|Field|Input|Required|Default|Rules|
|---|---|---|---|---|
|Equipment|Pick list,placeholder"select<br>equipment",carrier icon. 70<br>types,grouped(table<br>below).Typing filters.|Yes|"Dry<br>Van"|Choosing"Other"replaces the list with a free text<br>field with the placeholder"Other name..." (aria<br>"Equipment type name").The list is locked(plain<br>bold text)once a carrier is assigned or when the<br>user cannot choose it.|
|Temperature<br>low and high|Two numbers joined by" -<br>",placeholder0,suffix"°F".<br>Low cannot be above high.|No|Empty|Refrigerated equipment only.|
|Partial|Switch with the text"Partial<br>allowed"|No|Off|Refrigerated,Dry Van and Flatbed groups.<br>Disabled with a lock and the text"Locked after<br>coverage"once a carrier is assigned.|


Equipment catalog: 70 visible choices verified in main §14.3, Deep1 E-116 and Deep2 E-132. Reading groups are not verified backend enums. The unsupported numeric maximum-dimension table has been removed. Common hints and HTML bounds are not validated capacity/business limits.

|Reading group|Observed equipment labels|
|---|---|
|LTL|LTL|
|Dry Van|Dry Van; Dry Van 53; Dry Van 48; Straight Truck; Cargo Van; Dry Van or Refrigerated; Curtainside; Vented Van|
|Flatbed|Flatbed; Flatbed 53; Flatbed 48; Step Deck; Flatbed or Step Deck; Double Drop; Removable Gooseneck; Conestoga; Stakebed; Step Deck Conestoga; Flatbed Hot Shot; Landoll Flatbed; Multi-Axle Heavy Haul|
|Refrigerated|Refrigerated; Refrigerated 53; Refrigerated 48; Refrigerated Straight Truck; Refrigerated Cargo Van|
|Intermodal|Intermodal; Intermodal 20; Intermodal 20 High Cube; Intermodal 40; Intermodal 40 High Cube; Intermodal 40 Refrigerated; Intermodal 53|
|Drayage|Drayage; Drayage 20; Drayage 20 High Cube; Drayage 20 Refrigerated; Drayage 40; Drayage 40 High Cube; Drayage 40 Refrigerated|
|Dump|Dump; Bottom Dump; End Dump; Side Dump|
|Dry Bulk|Dry Bulk; Hopper Bottom|
|Power Only|Power Only; Power Only Load Out; Power Only Tow Away|
|Driveaway / other vehicle labels|Driveaway; 2-way Deck; 3-way Deck; 4-way Deck; Boom; Box Truck; Heavy Duty; Non-CDL; Single; Tractor-trailer; Utility; Vocational|
|Auto Transport|Auto Transport; Open Auto Transport; Enclosed Auto Transport|
|Tanker|Tanker; Tanker Aluminum; Tanker Intermodal; Tanker Steel|
|Other|Other|

##### SHP-028 Additional services 

Switches under the equipment list, not shown for the Driveaway group. They stay editable after a carrier is assigned. The chosen services print as short notes in the detail page footer (SHP-063). 

|Switch|Shown for|Default|
|---|---|---|
|Tanker endorsement|Any truckload equipment|Off|
|Team service|Any equipment group|Off|
|Tarps|Flatbed group only|Off|


##### SHP-029 "+ add vendor / carrier" 

A dashed button "+ add vendor / carrier" (accessible name "Add another vendor") under the equipment card, for Owners and Members, opens a window with the label "Vendor type" and big selectable rows with an icon. Any number can be ticked; none at first. The blue button "Add vendor" is disabled until one is ticked. 

|Vendor type|First cost line description it adds|
|---|---|
|Chassis|Chassis|
|Crane|Crane|
|Customs broker|Customs clearance|
|Insurance|Insurance|
|Lumper|Lumpers|
|Steamship line|(blank)|
|Towing|Towing|
|Transloader|Transloading|


|Vendor type|First cost line description it adds|
|---|---|
|Warehouse|Storage|


- Each ticked type adds a vendor card under the equipment card (type icon, type name, trash button) and one starter line in Cost & price with cost $0.00 and price $0.00 (blank for a Steamship line). The company itself is picked later on the detail page (SHP-059). 

- A second freight carrier on the same load ("Carrier" as a vendor type, one set of stops per carrier) is not offered in the first version; carrier replacement uses "Drop carrier" (section 4.3). 

- Remove a vendor: the trash button is greyed with the tooltip "Must remove selected vendor first" when a company is already selected. If the vendor has locations or cost/price amounts, a confirmation asks "Are you sure you want to remove this vendor?" with "These charges will be deleted:" and a small table (Description, Cost, Price); otherwise it is removed at once. Removing a vendor removes its lines. 

- Up to 10 vendors per shipment. 

### Locations 

##### SHP-030 Locations section 

The heading is "Locations". On its right: "Distance:" with a number field and the suffix "mi". The system fills in the road distance once both ends of the route are known and refills it when a stop's place changes. A typed number wins. If the route cannot be calculated, the shipment still saves and the distance stays empty. 

A "Reorder locations" button (two arrows, also in each stop header) opens the "Reorder Locations" window: a drag-and-drop list with the heading "Locations". Each row shows a drag handle, the company name (or "new location") and "City, ST ZIP". Hovering a row shows "Duplicate" (adds a copy right after) and "Remove". 

A vertical line connects the cards. A new form starts with two stops (Pickup and Delivery) and cannot go below two. 

###### SHP-031 

##### Stop card 

Each stop is a card with a numbered circle and the title "Pickup" (first stop), "Delivery" (last) or "Stop" (between). The header has the reorder button and a trash button (accessible name "Remove location N") shown only with more than two stops. 

|#|Field|Input|Required|Default|Rules and messages|
|---|---|---|---|---|---|
|1|Company<br>name|Text with address book<br>suggestions(SHP-032).<br>Trash icon inside the field<br>clears the company and<br>address but keeps date,<br>references,Share BOL and<br>appointment.|Yes|Empty|Empty: "Please fill out this<br>field."|
|2|Location type|Pick list, 26types(SHP-<br>032)|Yes|Business with<br>dock/forklift||


|#<br>3|Field<br>Show name<br>and Booth#|Input<br>Two text fields|Required<br>Yes(both)|Default<br>Empty|Rules and messages<br>Only when the location type is<br>Convention/trade show.|
|---|---|---|---|---|---|
|4|Address|Text with street suggestions|Yes|Empty|Choosing a suggestion fills<br>street,city,state,ZIP,country<br>and time zone.|
|5|"+Address<br>2"|Link revealing a second<br>street line,label"Address2"<br>with"(optional)"and a trash<br>button|No|Hidden|Opens automatically when a<br>second line has text.|
|6|City,<br>province,<br>postal code|Place search.Label"City,<br>province,postal code"while<br>empty, "City,state,zip"<br>once a U.S.place is chosen.<br>Country flag at the right.|Yes|Empty|Choosing a place fills city,<br>state,ZIP,country,county and<br>time zone.|
|7|Contact name|Text|Yes|Empty||
|8|Contact<br>phone|Phone field with a country<br>flag and the mask(000)<br>000-0000|Yes|Empty|Must be a full number.|
|9|Contact email|Chip field,placeholder"add<br>email",with suggestions<br>from the customer's<br>contacts.Each chip has a<br>trash icon.Label shows"<br>(optional)"when Share BOL<br>is off.|Yes when<br>Share BOL<br>is on|Empty||
|10|Share BOL|Switch|No|On for the first stop,<br>off for the others;<br>copied from the<br>address book entry<br>when one is chosen|When on,the BOL is emailed<br>to the listed emails on booking<br>and with"Send updated<br>documents" (SHP-048).|
|11|Instructions|Multi-line text,label"Pickup<br>instructions", "Delivery<br>instructions"or"Stop<br>instructions",with"<br>(optional)"and placeholder<br>"optional"|No|Empty||
|12|Open time|Time field.Accepts"8",<br>"8a", "0800".|Yes|8:00AM||
|13|Close time|Time field|Yes|5:00PM|Empty: "Close time is<br>required".|


|#|Field|Input|Required|Default|Rules and messages|
|---|---|---|---|---|---|
|14|Pickup date<br>(first stop)|Date field with a calendar<br>button(accessible name<br>"Open arrival date calendar<br>for location N").<br>"mm/dd/yyyy"when empty,<br>"Fri,Oct2"when filled.<br>Label"Pickup date".|Yes|Empty(new,<br>duplicate),saved<br>date(edit)|See SHP-035.|
|15|Arrival date<br>(other stops)|Same field,label"Arrival<br>date"|No|The previous stop's<br>date plus the transit<br>days of the route<br>leg,when known<br>and not set by hand|Not before the previous stop's<br>date: "Date of this location is<br>before a previous location."|
|16|Appointment|Button,see SHP-034|No|"add appointment"|Truckload stops only.|
|17|Reference#|Rows of kind and value,see<br>SHP-033|No|Stop1: "PO"and<br>"Pickup".Other<br>stops: "Order".||
|18|"+private<br>note"|Link opening a three-line<br>text box(placeholder<br>"optional").Enter without<br>Shift or Escape closes it;a<br>green check saves it.|No|Empty|Owners and Members only.<br>Once filled,a note icon with<br>the tooltip"Private note"<br>shows the text in a grey bar<br>with a pencil to edit.Carriers<br>and customers never see it.|


##### SHP-032 Address book, location types 

- Typing in "Company name" suggests places from the selected customer's address book (up to 5, narrowed to the chosen city when set). Each suggestion shows the company in bold (matches highlighted), small tags (for example "pickup, delivery"), the address, the instructions, the contact name and "9:00am - 5:00pm". 

- Choosing a suggestion fills the whole card: company, location type, services, Share BOL, address, hours, contact, phone, emails, instructions, show name and booth, private note. 

- A stop linked to an address book entry shows a small address book icon in the field: grey when the card matches the entry, orange when it differs. Hovering the orange icon shows "What's changed?" and a comma list of the differences. Clicking it opens the address book entry window (section 4.7). 

- Booking-time template creation and last-used updates are unverified (main §§13.5/16.3; OQ-18); do not assume either creation or non-creation.

Location types (26): Airport; Business with dock/forklift; Business without dock/forklift; Camp; Church building; Construction site; Container freight station; Convention/trade show; Country club; Fair/amusement park; Farm; Government site; Grocery warehouse; Hospital; Hotel; Limited access; Military installation; Mine site; Native American reservation; Nursing home; Pier; Prison; Residential; School; Self-storage; Utility site. 

##### SHP-033 Reference numbers on a stop 

Each reference row has a kind pick list and a value field (placeholder "optional" on the first row, "12345" on later rows). A link "+add ref" adds a row with kind "Ref"; the trash button on rows after the first removes a row. 

Rows with an empty value are dropped on save. The first stop always keeps a "Pickup" row unless the rep deletes it. 

Reference kinds (41): Appointment; AWB; Booking; Client; Confirmation; Container; Customer BOL; Delivery; Doc Cutoff; Document; ERD; ETD; Flight; Inbound; Item (Buyer); Item (Seller); Invoice; Job; Load; LRD; Ocean BOL; Order; Outbound; Part; Pickup; PO; Port; Reservation; Ref; Relay Code; Sales Order; Scale Ticket; Seal; Serial; Show; SKU; Steamship Line; Tax ID; Vendor; Vessel; VIN. 

##### SHP-034 Appointment 

The "Appointment" button shows "add appointment" when empty and "#12345 @ 9:00 AM" when set, and opens a small window. 

|Field|Input|Required|Notes|
|---|---|---|---|
|Appointment time|Time field|Yes|The date is the stop's date.|
|Appointment#or ID|Text,placeholder"12345"|No||
|"Cancel appt"|Red outlined button|—|Only when an appointment exists;removes it.|
|"Save"|Blue button|—|Saves the appointment.|


On the form the appointment is saved with the shipment; on the detail page it is saved right away (section 4.4). 

##### SHP-035 Hours and date rules 

**Numeric limits unverified:** The proposed 180-day TL, 31-day LTL, two-hour and one-hour rules below lack source proof. §16.3 observes a four-hour warning; Deep1 E-117 records one calendar with past dates/weekends/November 26 disabled. Universal holiday/cutoff policy, post-booking exemptions and timezones remain open.


- Pickup date: a truckload pickup can be up to 180 days ahead; later shows "Pickup date must be less than 180 days in the future". A truckload pickup may be in the past (a load that already moved), with the notice in SHP-036. LTL pickups: up to 31 days ahead, no past dates ("Pickup date must not be in the past"), weekends and holidays blocked ("This date is unavailable"). 

- Arrival date: not before the previous stop's date. 

- LTL stops: the close time must be at least 2 hours after the open time ("Close time must be at least 2 hours after open time."). For an LTL pickup not booked yet, "Origin is already closed." or "Close time of origin must be more than 1 hour from now." can show. 

- After a shipment is booked, editing no longer enforces the pickup date limits (past or too far ahead), but the order of stop dates is still enforced. 

##### SHP-036 Notices inside a stop card 

Yellow notes with a bold "Note:" or "Reminder:" label. They never block saving. 

|Text|When|
|---|---|
|Reminder:Appointment noted in instructions.Do you|LTL delivery whose instructions mention"appointment"or|
|need to toggle Appointment Required?|"appt"while the appointment service is off|
|Closes next day(time)|Close time is earlier than open time|


|Text|When|
|---|---|
|Currently closed.|Truckload;the close time has passed for the stop's date and<br>time zone|
|Closing within the hour,be sure carrier can make it.|Truckload;closes in less than60minutes|
|Closing in less than4hours from now,be sure carrier<br>can make it.|Closes in1to4hours|
|Close time is less than4hours from open time,so be<br>sure the carrier can make it.|The open window is under4hours|
|This date falls on a holiday or weekend.|Truckload date is a weekend or holiday|
|This date is in the past.Are you sure you want to<br>backdate this?|Truckload date is before today|
|This date is a holiday for some carriers|LTL date is a holiday|


##### SHP-037 Add and remove stops 

A dashed button "+ add location" (accessible name "Add another location") adds a stop after the last one, dated one day after the latest stop date, with the reference row "Order". Truckload only. When the load already has a pickup and a delivery, the new stop offers "Duplicate previous location" (a copy of the previous stop) and "New blank" (an empty stop). The new stop becomes the "Delivery" and the previous last stop becomes a "Stop". The trash button removes a stop when there are more than two. Shipments with more than two stops, a trade show stop or a hazmat item are supported. 

### Items to be shipped 

**Classification boundary:** Main §14.5a is a density-reference aid conditional on commodity provisions. No source validates automatic trade-show class 125/NMFC 154630 assignment. That passage below is proposed/unverified and must not classify actual freight. App hazmat labels likewise are observed UI, not an authoritative compliance policy.

##### SHP-038 Items section 

The heading is "Items to be shipped". A new form starts with one empty item card. A dashed button "+ add more" (the first reads "+ add"; accessible name "Add another handling unit") adds a card. The trash button in a card header removes an item when there is more than one. 

When any stop has the location type "Convention/trade show", a blue banner says "Trade show shipments are usually freight class 125." with a link "Why?" explaining: "Freight moving to or from a trade show is almost always Freight class 125 and NMFC 154630." Items added after that start with class 125 and NMFC 154630. 

With more than two stops, each item also shows "Picking up at" and "Delivering to" pick lists, listing the stops by company name (or "New location"); the delivery list offers only stops after the chosen pickup. With exactly two stops, items go from the first stop to the last automatically. A shipment cannot be booked with no items. 

The card header shows a bold summary ("4 totes", "2 pallets"), a red hazmat icon when Hazmat is on, and the item's total weight ("10,044 lb") on the right. 

##### SHP-039 Item card fields

|Field|Input|Required|Default|Rules and messages|
|---|---|---|---|---|
|Description|Text with suggestions from the<br>customer's previously shipped<br>products(up to5).Label<br>"Description";with Hazmat on,<br>"Proper shipping name and<br>hazmat quantity".|Yes|Empty|Choosing a suggestion copies its<br>packaging,class,dimensions,stackable<br>and hazmat settings and contents.|
|Contains|Number(minimum1)and a unit<br>pick list(placeholder"unit")|Both required<br>when Hazmat is<br>on,or on LTL<br>when either is<br>set|Empty|Units:Bag,Bale,Box,Bundle,Carpet,<br>Carton,Case,Coil,Crate,Cylinder,Drum,<br>Gallon,Keg,Pail,Piece,Pipe,Rack,Reel,<br>Roll,Sack,Tote,Tube(plural when the<br>number is not1).|
|Packaging|Pick list,label"Packaging"|LTL only|Empty|Options:Pallet(48×40),Pallet(48×48),<br>Pallet(60×48),Pallet,Bag,Bale,Box,<br>Bundle,Carpet,Carton,Case,Coil,Crate,<br>Cylinder,Drum,Gallon,Keg,Pail,Piece,<br>Pipe,Rack,Reel,Roll,Sack,Skid,Tote,<br>Tube.A sized pallet fills length and width;<br>the size is not kept(stored as"Pallet").|
|Quantity|Whole number(minimum1),<br>label"Quantity"|LTL only|Empty||
|Dimensions|Three numbers with<br>placeholders"L", "W", "H"and<br>a unit pick list("in"or"cm").<br>Label"Dimensions".|LTL;for<br>truckload,if any<br>of the three is<br>filled,all three<br>are required|Empty,<br>unit"in"|An item larger than the equipment's<br>maximum(SHP-027)shows an error on<br>the field.Once length,width,height and<br>quantity are set,a chip at the right shows<br>volume and density,for example"200cf<br>50.22pcf".|
|Total<br>weight|Whole number(minimum0),<br>label"Total weight",unit pick<br>list("lb"or"kg")|Yes|Empty,<br>unit"lb"|For the whole item line,not per piece.|
|Freight<br>class|Pick list,label"Freight class"|LTL only|Empty|Classes: 50, 55, 60, 65, 70, 77.5, 85, 92.5,<br>100, 110, 125, 150, 175, 200, 250, 300, 400,<br>500.While empty,a chip"Est: 85"<br>suggests a class from the item's weight<br>and size;clicking fills it.Tooltip:the<br>estimate is based on the dimensions and<br>weight entered.|
|NMFC|Text,label"NMFC"|No|Empty|LTL only. 4to6digits,optionally followed<br>by a dash and1or2digits;otherwise<br>"NMFC must be4-6digits optionally<br>followed by a dash and additional1-2<br>digits".|
|Stackable|Check box"Stackable"|No|Off||
|Hazmat|Check box"Hazmat"|No|Off|Opens the hazmat row(SHP-040).|


##### SHP-040 Hazmat item

**Branch-specific:** Dry Van direct entry exposes these fields and HTML-required UN/class/emergency contacts (Deep2 E-143). Checking Hazmat on blank LTL quotes revealed no extra fields (Deep1 E-117). Do not apply this row universally. Four-digit validation, Contains enforcement and actual server/compliance acceptance are untested.


Ticking Hazmat adds a row with a red top border under the item: 

|Field|Input|Required|Rules|
|---|---|---|---|
|UN#|Text, 4<br>digits|Yes|"UN#must be a4digit number"|
|Hazmat<br>class|Pick list<br>(filterable)|Yes|Classes: 1.1 -Explosive; 1.2 -Explosive; 1.3 -Explosive; 1.4B-Explosive; 1.4C-<br>Explosive; 1.4D-Explosive; 1.4E-Explosive; 1.4F-Explosive; 1.4G-Explosive; 1.4S-<br>Explosive; 1.5 -Blasting Agent; 1.6 -Insensitive Detonating Substance; 2.1 -<br>Flammable Gas; 2.2 -Non-Flammable Gas; 2.3 -Poisonous Gas; 3 -Flammable<br>Liquid; 3.1 -Flammable Liquid; 3.2 -Flammable Liquid; 3.3 -Flammable Liquid; 4.1 -<br>Flammable Solid; 4.2 -Spontaneously Combustable Material; 4.3 -Dangerous When<br>Wet; 5.1 -Oxidizer; 5.2 -Organic Peroxide; 6.1 -Toxic Substances; 6.2 -Poisonous<br>Material; 7 -Radioactive Material; 8 -Corrosive Material; 9 -Miscellaneous<br>Hazardous Material; 9.1 -Miscellaneous Dangerous Goods; 9.2 -Environmentally<br>Hazardous Substance|
|Packing|Pick list:I,|No||
|group|II,III|||


The form also shows a section "Hazmat contact" with "Emergency phone" (required, U.S. phone), "Emergency contact company" (required) and "Contract #". Contains quantity and unit become required for the item. 

##### SHP-079 Customs broker (cross-border loads) 

When the route crosses a border (for example a stop in Canada or Mexico), the form shows a section "Customs broker". Mexico settlement (neighborhood) fields are planned for later. 

|Field|Input|Required|Rules|
|---|---|---|---|
|Company name|Text|Yes|Empty: "Please fill out this field."|
|Contact name|Text|No||
|Phone|Phone field,U.S.format|Yes|Must be a full number.|


This is separate from the "Customs broker" vendor type (SHP-029), which only adds charges to the load. 

##### SHP-041 Auto Transport and vehicle items 

Auto Transport loads (equipment Auto Transport, Open Auto Transport, Enclosed Auto Transport) carry one item line per vehicle. 

- The description holds the vehicle year, make and model and the VIN, for example "2025 Make Model VIN: 17 characters". 

- Packaging, quantity and per-item dimensions are not needed. Weight per vehicle is required. 

- For Auto Transport (and Flatbed, Power Only, Other) the total-size row shows "Total dimensions" with Length, Width and Height; width and height are required. Inches are usual for vehicles, for example 232" L × 82" W × 79" H. 

A "VIN" reference can also be entered on a stop (SHP-033). 

##### SHP-042 Total length, totals and total value 

##### Under the item cards: 

|Element|Behaviour|
|---|---|
|Total length|Number with a length icon(tooltip"Total length",or"Total dimensions"for Flatbed,Power Only,Auto<br>Transport and Other),unit"ft"or"in",placeholder"L".Maximum is the equipment's length.Required when<br>"Partial allowed"is on;the orange message"Total length needed for partial quote"shows beside it.|
|"Common:<br>N'L"hint|Under Total length,a common trailer length for the equipment,for example "Common: 50.5' L" in the blank Dry Van quote branch (Deep1 E-115); hints vary by selection.|
|"Est:"chip|"Est: 8",the estimated linear feet from the item sizes.Tooltip: "Linear feet estimate is based on the<br>dimensions you entered.If the shipment takes up more space in the trailer,the carrier may charge more.<br>Click to use estimate."Clicking copies it into Total length.|
|Linear feet<br>visualizer|An icon button"Linear Feet Visualizer"opens a side panel drawing each item along the trailer,with<br>"Estimated total length"and the foot count.|
|Totals|Package name and count("Totes4"), "Volume200cf", "Density50.22pcf", "Weight10,044lb".Only non-<br>zero values show.For LTL volume quotes: "Enter total length for volume quotes".|
|Total value|Currency field"Total value",placeholder"$".Required only if the account turns on"value required for<br>truckload" (off for10-4).Hints on blur:for round values of $25,000,$50,000,$100,000,$150,000,<br>$200,000or $250,000, "Is the total value EXACTLY $25,000.00?" (with the typed amount);for a value<br>under $101, "Total value seems low.Are you sure it's correct?".|


### Cost & price 

##### SHP-043 Cost & price block 

For Owners and Members only; customers and carriers never see it. The heading is "Cost & price". One group of lines per vendor on the shipment (the freight carrier first, then the others). 

Column headers: "Description", then "Target cost" and "Price". The cost column is "Target cost" while the shipment is New, Duplicate, Requested or Booked, and "Cost" once Scheduled or later (or LTL). With several vendors, the first header shows the vendor's name once a company is picked, or "Towing (TBD)", "Lumper (TBD)" and so on before. 

|Field|Input|Required|Rules|
|---|---|---|---|
|Description|Pick list that also accepts free text,<br>placeholder"Description...".Row1of the<br>freight group is fixed read-only text<br>"Freight"with no trash.A pencil icon opens<br>a small note box;the note shows as<br>"Description-note".|Yes|See the charge list below.|


|Field|Input|Required|Rules|
|---|---|---|---|
|Target cost<br>/Cost|Currency,placeholder"$0.00".A calculator<br>icon opens the cost calculator(SHP-044).|Yes on the first<br>row;on other<br>rows required<br>when the price is<br>empty|When the cost is exactly $0.00,a trash<br>icon with the tooltip"Hide from rate<br>con"appears:clicking it clears the cost<br>so the line stays on the customer<br>invoice but is left off the carrier rate<br>confirmation.|
|Price|Currency,placeholder"$0.00".A calculator<br>icon opens the price calculator(SHP-044).|Yes on the first<br>row;on other<br>rows required<br>when the cost is<br>empty|When the price is exactly $0.00,a trash<br>icon with the tooltip"Hide from invoice"<br>appears:clicking it clears the price so<br>the line is left off the customer invoice.|
|"+add<br>item"|Blue link under each group|—|Adds a line with cost $0.00and price<br>$0.00.Accessible name"Add another<br>line item" (or"…for vendor N(Type)").|
|Trash on a<br>line|Tooltip"Remove line item"|—|Not on the first row of a group.|


A group with more than one line shows a subtotal of cost and price; with several vendors a grand total row shows too. The shipment's money total is the sum of the lines. 

A cost or price for a vendor whose bill has a balance shows a small payment icon with "Payment $x / Balance $y". 

Charge descriptions (147): Access fee, Accessorial, Additional fee, Adjustment, Advance, After-hours delivery, After-hours pickup, All risk insurance, Animal control, Appointment, Attempted delivery, Attempted pickup, Below minimum, Blind shipment, BOL correction, Bonded fee, California compliance, Canceled, Cargo insurance, Chains, Charge, Chassis, Chassis split, Construction site delivery, Construction site pickup, Container return, Container rejected, Convenience fee, Coordination, Country club delivery, Country club pickup, Country club, Courtesy credit, Crane, Credit card fee, Credit, Cross dock, Cubic capacity minimum, Currency conversion, Customs clearance, Damage, Deadhead, Decking, Deficit weight, Delivery fee, Demurrage, Detention delivery, Detention pickup, Detention, Discount, Driver, Driver 2, Driver 3, Driver 4, Driver assist, Driver unload, Drop trailer, Dry run, Duties & taxes, Escort, Excessive length, Extra delivery, Extra pickup, Extreme length, Freight, Fuel advance, Fuel, Full value coverage, Gate fee, Government site delivery, Government site pickup, Handling, Hazmat, High cost delivery, High value, Holiday delivery, Holiday pickup, Inside delivery, Inside pickup, Inspection, Insurance, Invoice correction, Labor, Late delivery, Late fee, Layover, Liftgate delivery, Liftgate pickup, Liftgate, Limited access delivery, Limited access pickup, Limited access, Linear foot rule surcharge, Linehaul, Lumpers, Mileage adjustment, Multi-stop, No scale tickets, Notify before delivery, Overheight, Overlength, Oversize, Overweight, Overwidth, Pallet exchange, Permits, Port congestion, Pre-pull, Prison delivery, Prison pickup, Protect from freeze, Quick pay, Re-palletizing, Reclass & reweigh, Reclass, Reconsignment, Redelivery, Rerouting, Residential delivery, Residential pickup, Residential, Restocking, Return, Reweigh, Reworking, Scale tickets, School delivery, School pickup, Sort & segregate, Stopoff, Storage, Tarps, Tanker wash, Team drivers, Temperature control, Terminal fee, Tolls, Towing, Tracking non-compliance, Trade show, Trailer wash, Translating, Transloading, Truck ordered not used, Weekend delivery, Yard pull, Yard storage. 

##### SHP-044 Calculators 

- Cost calculator (calculator icon in the cost cell), shown when the route distance is known: "Cost per mile", "N miles" and one number field. A per-mile rate sets cost = rate × distance, rounded to cents; typing a cost shows the rate. 

- Price calculator (calculator icon in the price cell), shown when a cost exists: 

   - "Est." (blue button, when the price is empty): suggests the price from the cost using the margin rule in SHP-077; clicking fills the price. 

   - "Margin" in percent: shows the current margin; typing one sets the price using the margin rule. 

   - "Cost +" in percent (markup): price = cost + cost × value. 

   - "Profit" in dollars: price = cost + profit. 

   - All results are rounded to cents. The default margin shown is the customer's default (or the account default, 25 percent for 10-4). 

##### SHP-045 Margin strip and margin rule 

Under the lines, a strip shows three figures for the whole shipment: 

|Figure|Formula|Display|
|---|---|---|
|Margin|(price−cost) ÷price|Percent with up to2decimals,for example"46.67%". "-%"until a cost and a price exist.|
|Cost+|(price−cost) ÷cost|Whole percent,for example"88%".|
|Profit|price−cost|Dollars,for example"$700.00". "$-"when empty.|


##### SHP-077 Margin rule 

**Unverified extension:** §§8/14.8 verify ordinary gross-margin arithmetic in examples. They do not establish the minimum-profit clamp, global/customer/carrier precedence, role/draft exemptions or zero/zero rule below. Pricing review is pending (OQ-17/29).


When the system suggests a price from a cost and a margin: price = the larger of (cost ÷ (1 − margin)) and (cost + the minimum profit). The minimum profit comes from the customer's settings (or the account's). A margin of 0/0 shows "$0.00". 

###### SHP-078 

##### Margin and profit limits 

**Observed warning, not proven blocking:** Deep2 E-131 shows cost 200, price 125, profit −75 and Target cost is above price, with Book enabled. No submission was made. Neither universally disabled buttons nor successful negative-profit booking is established.


Each customer (or the account) can have a minimum and maximum margin and a minimum and maximum profit per load (section 4.7). 

- Owners are never blocked. A figure outside the limits turns orange, with a warning icon and a message. 

- Members are blocked: a figure outside the limits turns red, and "Book shipment" and "Update shipment" are refused, both on the form and again when the shipment is saved. "Save for later" skips all checks. Messages (popover on the warning icon): 

|Condition|Message|
|---|---|
|Cost below zero|Cost is too low.|
|Cost above price|Target cost is above price.|
|Margin above100<br>percent|Margin is too high.|


|Condition|Message|
|---|---|
|Margin warning|Above target margin:N% /Below target margin:N% (without the number when no limit is set)|
|(Owner)||
|Margin error(Member)|Margin must be below:N% /Margin must be above:N% (Margin is too high/Margin is too low<br>when no limit is set)|
|Profit warning(Owner)|Above target profit:$X/Below target profit:$X|
|Profit error(Member)|Profit must be below:$X/Profit must be above:$X(Profit is too high/Profit is too low)|


##### SHP-046 Lane history price hint (truckload) 

A small line with a route icon sits next to the "Cost & price" heading. 

|State|Text|
|---|---|
|First stop,last stop or equipment missing|"For lane data add locations&equipment type" (grey)|
|Loading|Route icon and a spinner|
|Cannot be loaded|"Can't fetch lane data" (red)|
|No history|"This is a new Dry Van lane for you" (the equipment group is named)|
|History found|Blue"History"and a dollar figure,for example"History $716".|


The figure is the average cost per mile that 10-4's own covered truckload shipments paid on that lane, times the distance (or the average cost when the distance is unknown), rounded to whole dollars. History covers loads that started within 100 miles of the origin, ended near the destination, and ran in the last 6 months on the same lane and direction. Clicking it opens a "lane history" window (sections 4.3 and 4.9) with Origin, Destination, Equipment, Radius "100 mi", History "6 months", and the line "Average cost for N mi" with "$X / $Y per mi", or "This is a new lane for you". The button's accessible name is "View lane history details". No outside load board rate is shown in the first version. 

### Other form blocks, saving and errors 

##### SHP-047 Hide contacts from carrier 

A card with an eye icon: "Hide contacts from carrier", with a switch "Hide contacts". Default off for a new shipment; copied on duplicate and edit. When on, carrier-facing documents and pages do not show the stop contacts. Truckload only. On the detail page, stops hidden this way show "Hidden from carrier". 

###### SHP-048 

##### Send updated documents (edit only) 

**Conflict corrected:** Main §16.5–6 and Deep2 E-140 show Rate Con checked in assigned Dry Van/Scheduled Auto Transport editors; uncovered and sampled delivered LTL editors do not expose the section. The former universal Off default was incorrect. Variant causes, actual recipients and sends remain open (OQ-30/36).


On edit, a card "Send updated documents" (a pulsing refresh icon) appears when there is something to send, with up to two switches.

|Switch|Shown when|Default|What happens on save|
|---|---|---|---|
|Rate Con|A carrier with a contact is|Checked in sampled assigned TL editors; absent in uncovered example|Proposed send effect: updated rate confirmation to the|
||assigned and not waiting for<br>approval(truckload)||carrier contact(hover shows"Carrier<br>contact(s)"with name and email).|
|BOL(with the number of<br>recipients,for example"2|At least one stop has Share BOL<br>on with a contact name and|On|The updated BOL is emailed to those contacts<br>(hover shows"Location contacts").|
|BOL")|emails|||


Recipient previews and actual sends must be verified for each state/role. The source has not tested all recipients, defaults or automatic send effects. Documents: section 6; emails: section 5.

###### SHP-049 

##### Book shipment and Save for later 

- Book shipment (big blue button, full width). Runs all checks. On success the system saves the shipment, books it in one step, assigns the BOL number, emails the BOL to every stop with Share BOL on and listed emails, and opens the detail page. Pop-up message "Shipment booked". If any part fails, nothing is halfbooked. 

- Save for later (small grey outlined button, right). Saves a draft in status Requested without checking required fields. Pop-up message "Shipment created"; the edit page opens. The draft stays in the Active list under Requested and can be booked later from its edit page. Disabled with the tooltip "Origin or destination is missing." if there are fewer than two stops. 

- A booked shipment cannot go back to a draft. 

- Pressing Enter in a field does not submit the form (except in a multi-line box). Clicking "Book shipment" with errors scrolls to and focuses the first field with an error. Each required field shows a message under its label after the first click ("Please fill out this field." unless another message is listed above). 

- A shipment needs two or more stops, an origin before the destination, and at least one item. The tooltip on a disabled "Book shipment" button says "Origin or destination is missing." (and "Booking is disabled." when the customer is on a hold). 

- The system also checks that a partial load has a total length, and that an LTL item with contents has both a number and a unit. 

- Footnote under the buttons: "Pickup, transit and delivery dates are estimated." (LTL: "Pickup dates not guaranteed. Transit times and delivery dates are estimated.") 

- A double-click or repeated request creates only one shipment. 

##### SHP-050 Validation messages on the form 

|Where|Message|
|---|---|
|Any required field|Please fill out this field.|
|Close time empty|Close time is required|
|Arrival before previous stop|Date of this location is before a previous location.|
|Pickup too far ahead|Pickup date must be less than180days in the future|


|Where|Message|
|---|---|
|Date unavailable(LTL)|This date is unavailable|
|Date in the past(LTL)|Pickup date must not be in the past|
|LTL close time|Close time must be at least2hours after open time.|
|UN number|UN#must be a4digit number|
|NMFC|NMFC must be4-6digits optionally followed by a dash and additional1-2digits|
|Partial load|Total length needed for partial quote|
|Stops|Origin or destination is missing. /Each carrier must have an origin and destination.|
|Items|At least one item is needed to book|
|Margin or profit limit(Member)|See SHP-078|


##### SHP-051 Errors on save and the stale-edit warning 

A red banner shows at the top of the form when saving fails. 

- "Error booking shipment" when booking fails (with the reason from the system); "Error updating shipment" when an edit fails. 

- If someone else changed the shipment after this form was opened, the save is refused: the banner "Error updating shipment" shows "Previous changes detected" with a button "Reload shipment", which reloads the latest version (unsaved edits are replaced). This also applies to every change made from the detail page (cost and price, customer, vendors, cancel). A failed save does not change the page you see. Successful saves show a pop-up message: "Shipment created" (draft saved), "Shipment booked", or "Shipment updated". 

- If the shipment cannot be found, the page shows "Error loading shipment", "The shipment you're looking for is missing." and a button "Quote again". 

### Edit and duplicate 

##### SHP-052 What can be edited, by status 

|Item|Requested|Booked,Scheduled,In transit,Delivered|
|---|---|---|
|Customer and contact|Editable|Read-only text.Use"Change customer" (SHP-071).|
|Equipment|Editable|Locked once a carrier is assigned;the"Partial allowed"switch also locks<br>("Locked after coverage").Tanker endorsement and Team service stay editable.|
|Stops,items,references,<br>cost and price|Editable|Editable.A canceled shipment cannot be edited(the pencil is hidden).|
|Custom BOL|Editable|Editable|


|Item|Requested|Booked,Scheduled,In transit,Delivered|
|---|---|---|
|Hide contacts,Send|Editable|Editable|
|updated documents|||
|Save for later|Yes|No|
|Date limits|Enforced|Not enforced;date order still is|


- Editing the cost and price of a shipment with a signed carrier rate confirmation sends it back to the carrier for re-confirmation (section 4.3). 

Editing a delivered shipment is allowed (for example to fix a reference or an amount). 

- "Reschedule" on the detail page opens this edit page. 

##### SHP-053 Duplicate a shipment 

**Entry only:** §§14.7/15.11/16.9 record duplicate controls, not execution. The copied/cleared fields, source linkage, POD warning and numbering below require a designated test.


"Duplicate shipment" (SHP-070) opens the form pre-filled from an existing truckload shipment and saves a brand-new shipment. 

- Copied: customer and contact, equipment and services, stops (company, address, contact, hours, instructions, Share BOL, notes), items, cost and price lines (without the "Canceled" lines created by a cancel), and the Hide contacts setting. 

- Not copied: stop dates, reference values (the kinds stay, values empty), appointments, the custom BOL number (a new system number is assigned), the carrier and rate confirmation, tracking, documents, notes and timeline. If a carrier was dropped on the source, the dropped carrier's vendor and its lines are left out. The distance field starts empty and fills in once the route is calculated. 

- The new shipment remembers its source. While the source has an unpaid balance and no proof of delivery, the new shipment's detail page shows the orange banner "Do not touch, waiting on POD". 

- The usual form rules apply: the rep enters dates and can book or save for later. 

## Part C. Shipment detail page 

The detail page is the single record of one load. It is reached from any list or queue row, the dashboard, customer and carrier pages, search results, bill lists, and after booking. The browser tab reads "BOL 1000123 | 10-4 TMS". The page address uses the shipment's own id, not the BOL number. A Requested shipment never opens the detail page; it opens its edit page (SHP-021). 

On wide screens the page has two columns (left about two thirds, right one third); on narrow screens the right column moves below and the map to the top. Left column, top to bottom: banners, header, stepper, summary cards, Cost & Price strip, Locations, Items. Right column: map, notes, Timeline. 

###### SHP-068 

##### Loading, not found and error states 

"Loading shipment details" with a centered spinner while loading. "The page you're looking for is missing." with a button "Back home" when the shipment does not exist or the user may not see it (a shipment of another customer or account shows as not found). If the page cannot be drawn, a "Something went wrong" page with a Home button. 

##### SHP-054 Header 

|Element|Rules|
|---|---|
|Title|"BOL1000123".Screen-reader text"Shipment details for BOL1000123".|
|"Documents"chip|Owners and Members.Opens the documents page(section6).Customers and carriers see"BOL"<br>and"Labels"buttons instead;the"BOL"button has a green check when the BOL was sent after its<br>last change,and an orange warning icon when it changed since it was last sent.|
|Pencil("Edit<br>shipment")|Owners and Members.Opens the edit form.Hidden on Canceled shipments.|
|"…"menu|Always shown(accessible name"Open shipment action menu").See SHP-069.|
|Reps|At the top right.Avatars of the reps on the load;click opens"Reps on BOL" (SHP-074).Accessible<br>name"Manage reps";the word"Reps"is for screen readers only.|
|Banner"Do not<br>touch,waiting on<br>POD"|A pulsing orange card on a shipment created by duplicating another one,while the source still has<br>an unpaid customer balance and no proof of delivery(SHP-053).|
|Banner"POD is<br>required"|An orange-outlined card with a pill"Upload POD",for Owners and Members when the load is<br>delivered,the customer requires POD,the invoice is not paid,and no POD is uploaded(sections<br>4.4, 4.5).|


##### SHP-055 Status stepper 

Under the header is a row of segments, one per stage. Past stages have a dark bar and a grey time stamp under the label; the present stage is highlighted; future stages are plain. Hovering a past stage shows the exact date and time, an extra line and the user who did it. 

|Segment|Shown when|Label now **→**<br>label once done|Time stamp from|Hover extras|
|---|---|---|---|---|
|Quote|The shipment was booked<br>from an LTL quote|Quote → Quoted|When the quote<br>was made|"Quote"and its number or"No<br>quote number"; "Pallet rate"or<br>"Volume quote"|
|Book|Always|Book → Booked|Booking time|"BOL"and number;who booked|
|Cover|Owners and Members;<br>truckload with a manually<br>covered carrier|Cover →<br>Scheduled|When the carrier<br>was assigned|"Pickup"number;who covered|
|Dispatch|Owners and Members;LTL<br>with a carrier quote|Dispatch →<br>Scheduled|When the pickup<br>request completed|"Pickup"number; "Manually<br>dispatched"or"Auto dispatched"|
|Pick up|Always|Pick up → In<br>transit|Pickup time|"PRO"number|
|Deliver|Always|Deliver →<br>Delivered|Delivery time|—|


- Booked and needs a carrier: Booked (done), Cover (present), Pick up, Deliver. Scheduled: Booked, Scheduled, Pick up (present), Deliver. In transit: Booked, Scheduled, In transit, Deliver (present). Delivered: all done, the last "Delivered" with a green bar. An LTL load from a quote shows five segments starting with Quoted. 

- Present stage: Book if not booked. After booking, Cover for a truckload without a carrier. With a carrier: Pick up until the first stop is picked up, then Deliver until the last stop is delivered, then complete. For LTL, Dispatch while the pickup request is pending, failed or aborted. 

- Time stamps read "6 hours ago" or "1 day ago" when under two days old, otherwise "Oct 9" (or "Oct 9, 2025" in another year). 

- Canceled: a row above the bar shows a red icon, the red word "Canceled" and grey text such as "15 days ago by ". Present and future labels are crossed out; only the Booked segment stays done. Customers and carriers never see the Cover or Dispatch segment. 

- Needs-attention marker: on a Scheduled load whose pickup date is before today, the first stop gets an orange dashed border and an orange warning before its date with the tooltip "This should have been picked up by now." and "Check to see if it's in transit or needs to be rescheduled.". The "Picked up" button turns orange (section 4.4). 

##### SHP-056 Customer card 

A white card on the right of the carrier card. Clicking its header opens the customer page (accessible name "View {customer name} details"). 

|Element|Rules|
|---|---|
|Customer name,|Shown.|
|contact full name||
|Credit badge|Always shown when the customer has a credit state(section4.7).|


|Element|Rules|
|---|---|
|"+invoice<br>reference"|Owners and Members.Opens the"Invoice-only reference"window(SHP-057).Once references exist,<br>the link is replaced by a list of"kind value"rows with a pencil on hover;carriers and customers see the<br>list read-only.|
|"Confirmation"|Outlined pill that opens the customer's rate confirmation document(section6).Only when that<br>document exists.|
|"Invoice" / "+<br>Create invoice"|Outlined pill,when the account has accounting turned on.Hidden for a truckload shipment still Booked<br>or Requested. "+Create invoice" (blue)creates the customer invoice and opens it;otherwise"Invoice"<br>opens the invoice page(section4.5).Icon:orange chat icon when the invoice is in dispute,green<br>check when the balance is zero,orange triangle when the invoice is still a draft and the shipment is<br>delivered;gray otherwise.Its accessible name shows the invoice state("View draft invoice", "Record<br>payment", "Invoice paid in full").|


Booking a shipment creates a draft customer invoice with the BOL number as its reference number, and copies the customer's reps onto the shipment (SHP-074). 

##### SHP-057 Invoice-only reference 

A window with a receipt icon, the title "Invoice-only reference" and the text "These reference numbers will only show up on the customer invoice." 

|Field|Input|Notes|
|---|---|---|
|Kind|Pick list:Accessorial,Authorization,<br>Reference,Shipment|Default"Reference"on a new row|
|Value|Text,up to100characters|Rows with an empty value are dropped|
|Trash|Removes the row(accessible name<br>"Remove reference")||
|"+<br>reference"|Adds a row|Up to20rows|
|"Save"|Full-width blue button|On failure: "Unable to update reference number".Not<br>allowed on a voided invoice.|


These print on the customer invoice only (section 4.5); they are not sent to the carrier. 

##### SHP-058 Carrier side of the page 

Next to the customer card is the carrier area: 

|Shipment state|What shows|
|---|---|
|Booked,truckload,|A dashed grey"Cover"card:equipment icon and name,temperature range for reefers, "Partial"tag|
|no carrier|when allowed, "Target $800.00",and an orange"Cover"button.The whole card opens the cover<br>screen(section4.3).|


|Shipment state|What shows|
|---|---|
|Scheduled,In<br>transit,Delivered<br>(truckload)|The carrier card:a status dot(red"Don't use",grey"Candidate";none when approved),carrier<br>name,equipment(prefix"Partial"when partial),contact name with call and email icons and copy<br>buttons,then the"Rate con"and"Bill"pills.Clicking opens the carrier detail window with a"Remove<br>carrier"button(section4.3).|
|LTL with a carrier|Carrier logo,service("Standard", "Volume",guaranteed),carrier name, "View quote details", "Auto<br>dispatched"or the manual dispatch bar,and the"Bill"pill(section4.6).|
|Canceled before a<br>carrier was<br>selected|A grey card"Canceled before a carrier was selected"|
|Canceled after a<br>carrier was<br>assigned|The usual carrier card,plus(LTL)the orange card"Contact the carrier to cancel the pickup!" (section<br>4.6)|
|Dropped carrier<br>with TONU|The active carrier card,plus a half-width card for the replaced carrier with the line"TONU Carrier"<br>and a"Bill"or"Pay bill"pill|


Rate confirmation, signing, bill, drop carrier, TONU, driver and tracking pill are in sections 4.3, 4.4 and 4.5. 

##### SHP-059 Non-freight vendors on the detail page 

Under the carrier row, each non-freight vendor (Towing, Lumper, Insurance, Warehouse, Chassis, Crane, Customs broker, Steamship line, Transloader) has a half-width card. A small "+ add vendor" control (accessible name "Add another vendor") sits under the cards. 

- "+ add vendor" opens the "Vendor type" window with the nine rows of SHP-029 and a button "Add vendor". Several types can be added at once; each adds an empty vendor card. A canceled shipment cannot get new vendors. 

- Empty vendor card: a dashed card with the type icon, type name and "+ add company" in blue (accessible name "Find {Type} vendor"), which opens the find window. 

- Find window: a read-only "Vendor type" chip; "Vendor name" field (required; "Name is required to add a new vendor"); under it "Or select an existing vendor..." with up to 5 matching vendors of that type (name matches highlighted; empty name lists vendors of the type); a trash button (accessible name "Remove vendor") with the confirmation "Are you sure you want to remove this vendor?", only while the vendor has no cost or price (otherwise the text "To remove this vendor, delete associated line items first." shows); and a blue "Add vendor" button. A new name creates the vendor (once, even if two reps type the same name at the same moment); if it cannot, "Failed to create vendor" shows. 

- Filled vendor card: type icon, vendor name, type name (prefix "TONU " for a dropped carrier) and a compact "Bill" / "Pay bill" pill. Clicking opens a small window with the vendor name (link to the vendor page) and a red "Remove vendor" button with the same confirmation. It is disabled with "To remove vendor, first remove related charges" while the vendor still has cost or price lines, and refused when it has a bill ("Remove the bill first"). 

- The charges of a non-freight vendor come from its lines in Cost & Price and become the vendor's bill amount (section 4.5). 

##### SHP-060 Cost & Price strip (Owners and Members) 

Under the cards is a white strip that is one big button (accessible name "Expand itemized view") with three figures: Target cost (left, bold), Profit (center), Price (right). The label is "Target cost" while Booked, and "Cost" once Scheduled or later or LTL. Negative profit shows with a leading minus. Hovering Profit shows a box with Margin and Cost + percentages. Customers and carriers do not see this strip; customers see a readonly card "Price" (SHP-076). 

Notices under the strip (LTL loads that changed after they were quoted): the orange warning "Pickup date has passed, so the cost could be affected by changes." and "Some things have changed that could affect the cost." (hover lists changed fields) plus a blue pill "Update cost" that opens the edit form. In the first version the edit form does not re-price the LTL quote by itself; the rep adjusts cost and price by hand (section 1.7). 

##### SHP-061 Cost & Price editor 

Clicking the strip expands it in place into the card "Cost & Price" (a chevron collapses it; accessible name "Collapse itemized view"). It is the same table as on the form (SHP-043 to SHP-045): one group per vendor, calculators, "+ add item", "Hide from rate con", "Hide from invoice", the Margin / Cost+ / Profit chips with the warnings and the Owner-versus-Member limits (SHP-078). Extra rules here: 

- The first row of a group is fixed ("Freight" for the carrier). 

- A blue button "Save cost & price" appears when the lines differ from the saved ones. Saving changes only the cost and price lines. 

- A checkbox "Send updated Rate con" (default unverified in this separate inline editor; assigned full editors were checked, tooltip may list contacts) shows when every freight vendor has a rate confirmation, the lines changed and some rate confirmation was already signed. If ticked, the changed rate confirmation is sent to the carrier in the same save.

- After saving, a pop-up message "Saved Cost & Price" with an "undo" action restores the previous lines. On failure: "Failed to save cost & price". 

- Locking cost and price after the shipment is complete is not in the first version (section 1.7). 

- Saving after a carrier signed returns the rate confirmation for re-confirmation (section 4.3). 

##### SHP-062 Locations on the detail page 

The "Locations" heading is followed by the distance ("1,730 mi"), the transit days ("4 days"), the services chip (for example "Liftgate, Inside"), and a "Reschedule" button that opens the edit page (hidden once the load is picked up). The stop-by-stop part (driver and tracking strip, stop cards with contacts, hours, appointments, references, ETA, In, Out, "Picked up", "Delivered", "Upload POD" / "View POD", tracking updates) is in section 4.4. Stops hidden from the carrier show "Hidden from carrier" for Owners and Members. 

###### SHP-063 

##### Items on the detail page 

The heading reads "N items to be shipped" ("1 item to be shipped"), or "Items to be shipped" when the lines have no quantities (vehicles). One card per item shows the title ("4 totes", the description when there is no packaging), a "Stackable" tag, the description in bold, size "48L × 49W × 39H", contents "— 2 drums", and on the right the weight "3,620 lb" and, for LTL, "class 70" and the NMFC. A hazmat item adds a red row with "UN #", "Hazmat class" and "Packing group". An item can be linked from a stop card (the card then gets a blue border). 

The right-aligned totals row shows, in order and only when set: "Refrigerated" (temperature range such as 34° - 38°F), "Value", the package count ("Pallets 22"), "Volume" ("106.2 cf"), "Density" ("34.1 pcf"), "Length" ("44' L", or inches for vehicles such as 232" L x 82" W x 79" H) with the "Linear Feet Visualizer" button, and "Weight" ("40,000 lb"). A hazmat shipment adds "Hazmat contact", "Contract #" and "Emergency phone". 

Footnotes under the totals: 

|Text|When|
|---|---|
|"{Service}: {short explanation}"|Each service with an explanation(for example"Protect from<br>freezing:check with carrier for availability/restrictions")|
|Pickup,transit and delivery dates are estimated.|Truckload|
|Pickup dates not guaranteed.Transit times and delivery<br>dates are estimated.|LTL|
|Carriers limit their liability for damage and loss,usually<br>in the range of $1 –$25/lb.|LTL|
|Unless otherwise specified,guarantees are for delivery<br>by5pm.|LTL with a guaranteed quote|
|The quote was based on the details provided.The final<br>price may be different if the shipment details change.|LTL,customer view|
|Sort&segregate quoted price is a minimum.Final<br>charge based on shipment and work performed.|Any stop has the sort&segregate service|


##### SHP-064 Map 

A map card at the top of the right column draws the route line between the origin (a hollow circle) and the destination (a pin). With live tracking, a green dot marks the latest position. A button expands the map to full width (hidden on narrow screens) and collapses it again. A chip in the top-left corner shows the newest tracking alert for tracked loads (Owners and Members): On-time, At pickup, At stop, Left stop, Behind, Off route, Possible Detention, Low battery, Tracking stopped, Temp too low, Temp too high, Reefer unit off, Temperature alert, Possible fraud, Location off, Phone off, Unable to make it, Past appointment. 

##### SHP-065 Notes 

**Entry only:** §§15.11/16.8 leave save timing, audience, edit/delete and notifications open. Blur-to-save, formatting, author/Owner rights, undo and stale-form exemptions below remain proposals.


Under the map is a dashed box with the placeholder "+ note". 

- Typing a note and leaving the box (or pressing Enter) saves it as a new note and clears the box. Pop-up message "Note saved" with an "undo" action. Empty text is not saved. 

- Notes list newest first. Each shows "17 days ago" (hover shows the full date), "(edited)" when changed, and the author's name. Simple formatting is supported (links, bold, lists, tables). 

- Hovering a note shows a dark toolbar with "Edit note" (pencil) and "Delete note" (trash). Only the author and Owners can edit or delete. Edit opens the box pre-filled; leaving the box saves. Delete shows "Note deleted" with "undo". 

- Notes are internal: customers and carriers do not see them. With no notes, only the dashed box shows. Notes do not make the shipment form "stale" (SHP-051). 

##### SHP-066 Timeline 

A row "Timeline" with a chevron, closed by default, under the notes (Owners and Members only). Opening it loads the 75 newest events, newest first, on a vertical line. Each row has a small grey line "October 7, 2026 @ 07:46 PM by " and a bold label. The actor is a user's name, an email address for a carrier who signed through a link, or "System" for automatic events. Clicking a row opens the event detail (SHP-067). 

|Event|Label|
|---|---|
|Shipment created|Created|
|Booked|Booked|
|Carrier assigned|Covered|
|Carrier dropped|Uncovered|
|BOL emailed|BOL sent|
|Fields changed|Updated,or"{field}updated"when one field changed(for example"price updated", "origin date<br>updated", "destination date updated", "stop2date updated").When the customer changed:<br>"Customer updated".|
|Shipment canceled|Canceled|
|Shipment<br>uncanceled|Uncanceled|
|Document added|"{Type}document uploaded"or"{Type}document generated" (for example"POD document<br>uploaded", "Bill document uploaded"),one row per document|
|Rate confirmation<br>created/sent|"Rate confirmation created" / "Rate confirmation sent" (LTL: "Pickup request sent";vendor:<br>"Purchase order sent", "Purchase order completed")|
|Carrier signs|Rate confirmation confirmed(LTL:Pickup request completed)|
|Rate confirmation<br>changed|Rate confirmation updated|
|Carrier bill|Bill updated,Bill pushed,Bill payment added|
|Customer invoice|Invoice updated,Invoice sent,Invoice pushed to accounting|
|Tracking|Shipment tracking updated,PRO added/updated/removed,Tracking reset,Tracking segment<br>started/stopped/pulled/pushed|
|Tracking events|"Picked up event added", "Delivered event added", "Info event added", "Arrived event added",<br>"Estimated arrival event added"|
|Reps|Rep added,Rep updated,Rep removed(Owners only)|
|LTL quote|Quote request created|


##### SHP-067 Event detail 

Clicking a timeline row opens a wide, read-only window. 

- Title: the label with the entity word as a link ("Shipment booked"). Meta line: date and time on the left, "by {actor}" on the right. 

- Body: a table of changes with columns for the field, old value and new value ("old → new"). Internal fields (ids, creation or update times) are hidden. Locations are named "origin", "destination" or "stop N". With no changes, a short list of key facts (BOL number, carrier name) shows. 

- Footer: for "Rate confirmation confirmed" a button "Rate confirmation" downloads the signed rate confirmation. 

- The timeline cannot be edited, and the signer's IP address is not shown to users. Reps and commission events are hidden from Members. 

## Part D. Actions menu and lifecycle 

##### SHP-069 The "…" menu 

A white dropdown at the right of the header. Rows have an icon and a label, in this order; a row shows only when its rule is true. Escape or a click outside closes it; arrow keys move through the rows. 

|Row|Shown when|Result|
|---|---|---|
|View quotes|The shipment was booked from an LTL quote|Opens the quote results(section<br>4.6)|
|Duplicate<br>quote|Same|Opens a new quote pre-filled<br>(section4.6)|
|Duplicate<br>shipment|Truckload shipments(not LTL)|Opens the new shipment form<br>pre-filled(SHP-070)|
|Change<br>customer|Always for Owners;for Members unless"Enforce credit limits"is on<br>and the customer has a credit limit(SHP-071)|Opens"Change customer" (SHP-<br>071)|
|Cancel<br>shipment|Shipment is not canceled and not delivered|Opens"Cancel shipment" (SHP-<br>072)|
|Uncancel<br>shipment|Shipment is canceled|Opens"Uncancel shipment"<br>(SHP-073)|


##### SHP-070 Duplicate shipment 

Opens the form described in SHP-053. Available for truckload and Auto Transport shipments in any status, except that a Requested shipment is edited, not duplicated. 

##### SHP-071 Change customer 

Moves a Booked, Scheduled, In transit, Delivered or Canceled shipment to another customer. The window has a blue customer icon, the title "Change customer", and the text "Transfer this shipment from {current customer} to the target customer." 

|Field|Input|Required|Rules and messages|
|---|---|---|---|
|Target<br>customer|Pick list of active<br>customers(no"+add"<br>option)|Yes|Empty: "Choose a customer".Same as now: "Please select a<br>different customer than the one currently on the shipment".<br>Archived or unknown: "Customer not found".|
|Target<br>customer<br>contact|Pick list of that<br>customer's contacts|No|The first contact is picked by default and resets when the<br>customer changes.A contact that does not belong to the<br>customer: "Contact not found".|
|Credit card|Credit usage of the<br>target customer|—|Always shown with the customer's credit state.|


A warning block says: "The shipment's assigned reps and pricing will not be updated based on the target customer's settings." The blue button "Change" confirms. On failure the banner "Error changing customer" shows. The page refreshes on success and the timeline shows "Customer updated". 

Rules: 

- Reps, cost and price stay as they are. The billing address on the shipment is replaced with the new customer's. 

- The draft customer invoice moves to the new customer. If the invoice was already sent, the change is refused with "The invoice was already sent". 

- A Member cannot change the customer when "Enforce credit limits" is on and the customer has a credit limit (proposed Off at launch, approval pending; PAY-022).

- Two people changing the same shipment at once are handled one after the other; the second sees the stale message (SHP-051). 

##### SHP-072 Cancel shipment 

Opens a window with a red "shipment canceled" icon, the title "Cancel shipment" and the question "Are you sure you want to cancel?". Available for Booked, Scheduled and In transit shipments; a Delivered (or Requested) shipment cannot be canceled. 

- When a carrier is assigned (and the rate confirmation was created), a bordered card "Will zero out cost & price" shows "-$1,200.00 to cost" and "-$1,500.00 to price" (the current totals). 

- For a truckload with a carrier, two optional currency fields appear: "Do you owe them TONU?" (with "Rate con was sent 2 days ago" when it was sent) and "Charge customer?". The amounts typed become one extra line "Truck ordered not used". A typed 0 is kept as a real zero. 

- Buttons: "No, go back" (outlined gray) and "Cancel shipment" (red). 

What happens: 

- The status becomes Canceled; the time and user are recorded; the previous status is remembered. 

- The cost and price of every vendor are zeroed with one negative "Canceled" line per vendor group, so the Cost & Price strip shows $0.00. Existing lines are not deleted. A typed TONU line stays as a normal charge. Every carrier and vendor on the load is closed. The carrier's rate confirmation link shows "Shipment no longer available". Tracking is stopped. No email is sent to the carrier; the rep must call the carrier (section 4.3). For LTL the orange card "Contact the carrier to cancel the pickup!" explains what to do, with the carrier's online link, phone and email, and the buttons "Carrier contacted" and "Undo cancel" (section 4.6). 

- Reps, invoice references and notes stay on the shipment. The draft customer invoice follows the new (zero or TONU) total (section 4.5). Carrier bills already approved or paid are not touched (section 4.5). 

- The shipment leaves the Active list and every queue; in the All list it shows at half brightness. 

- a red pop-up message says "Shipment canceled". The timeline records "Canceled". 

- A canceled shipment cannot be edited, but notes, documents, the customer invoice and bills can still be worked. 

##### SHP-073 Uncancel shipment 

A window with a red warning icon, "Are you sure you want to uncancel this shipment?", and buttons "No, go back" and "Uncancel shipment" (red). 

- The status returns to what it was before the cancel (Booked, Scheduled or In transit) and the carriers and vendors reopen. 

- The negative "Canceled" lines are removed. A TONU line the rep typed stays (it can be deleted in Cost & Price). 

- Tracking stays off; the rep turns it back on if needed (section 4.4). 

- Pop-up message "Shipment uncanceled". The timeline records "Uncanceled". 

###### SHP-074 

##### Reps on a shipment 

**Evidence limit:** §15.5/Deep2 E-125 expose Paid/User/Commission/Payout headers and a mark-paid checkbox in a sampled broker session. No payout changed or full role comparison occurred. Owner-only amounts, Member blank cells, read-only Paid, ranges/formulas and primary-rep copying below are unverified. Customer Manage reps separately says new shipments only (§12.5).


The Reps button opens a window "Reps on BOL 1000123" (about 600 pixels wide). 

- At the top, a search field with the placeholder "+ add user". Typing lists account users and teams; names already on the shipment are greyed with a green check. Clicking adds the user or team as a rep, once only ("Already a rep" otherwise). 

- Under it (when not searching) a table with the headers "Paid", "User", "Commission", "Payout" and a trash button per row. 

   - Owners: set the commission as a percent (0 to 100, one decimal) or a flat dollar fee, see the payout (computed on the shipment's profit), remove a rep, and see at the bottom, right aligned, "Total commissions", "Gross profit" and "Remaining" (gross profit minus commissions). 

   - Members: see the names only; Commission and Payout cells are empty. They never see totals, and rep and commission events are hidden from their timeline. 

   - The "Paid" switch is read-only here. Marking commissions paid is done in the commissions report (section 4.9). A rep whose commission was paid cannot have it changed or removed until it is unapplied. 

- The avatar stack on the page: no reps = a dashed circle with an add-user icon; 1 to 3 reps = overlapping circles with initials; more than 3 = two circles and "+N". The primary rep has a small star. 

- When a shipment is booked, the system copies the customer's current reps to it, with each rep's commission setting, and marks the customer's primary rep as the booking rep. 

##### SHP-075 Status lifecycle 

**Labels versus transitions:** §§10/16.9 explicitly do not establish a tested state machine. The six labels are observed; all transition triggers, held-confirmation timing, drop/uncancel effect, Active-until-paid policy and portal status translation below remain proposed/unverified.


|Status|Meaning|Enters from|What moves it|
|---|---|---|---|
|Requested|Saved for later by a rep,or a customer's request from<br>the portal;not booked|New|"Save for later",or a customer's<br>request|
|Booked|The load is sold to the customer;no carrier yet(or LTL<br>not dispatched)|Requested|"Book shipment"by a rep(or a<br>customer booking an LTL quote)|
|Scheduled|A truckload is covered,even when the rate<br>confirmation is held for carrier approval(LTL:the<br>carrier accepted the pickup request,or staff<br>completed it by hand with"Done")|Booked|Cover the load with a carrier<br>(section4.3);LTL auto-dispatch<br>or manual dispatch(section4.6)|


|Status|Meaning|Enters from|What moves it|
|---|---|---|---|
|In transit|The first stop is picked up|Scheduled|Pickup confirmed by the rep<br>(section4.4)|
|Delivered|The last stop is delivered|In transit|Delivery confirmed by the rep<br>(section4.4)|
|Canceled|The load will not move|Booked,<br>Scheduled or In<br>transit|"Cancel shipment" (SHP-072)|


- A carrier signing the rate confirmation does not change the status: the load becomes Scheduled when covered, even if the rate confirmation is held for carrier approval. A missing signature leaves the load Scheduled with a blue hourglass. 

- Dropping a carrier before pickup returns the load to Booked (section 4.3). 

- Uncancel returns it to the status it had before (SHP-073). 

- A Delivered shipment stays in the Active list until its customer invoice is paid in full. 

- A Delivered shipment cannot be canceled. A Requested shipment cannot be canceled. 

- Customers see "Scheduled" where Owners and Members see "Booked". 

##### SHP-076 What customers and carriers see 

|Area|Customer(portal)|Carrier(link)|
|---|---|---|
|List and detail|Their own shipments only|The load named in their link only|
|Header|"BOL"and"Labels"buttons,no pencil,no Reps|Same as customer|
|Stepper|No Cover or Dispatch segment|Same|
|Cards|A customer-facing carrier summary(hidden if the account hides<br>carrier names)and the customer card|Same page layout as the<br>customer|
|Money|A read-only card"Price"with one row per line("description-<br>note")and"Total"|Not shown;the rate confirmation<br>shows what the carrier is paid|
|Notes,Timeline,<br>internal notes|Not shown|Not shown|
|Footer|Footnotes,a link"Customer Terms&Conditions",and a<br>"Questions?"block with the account user's name,company and<br>"Call"and"Email"buttons|Footnotes|
|Contacts|—|Hidden when the shipment has<br>"Hide contacts from carrier"on|


The customer portal and secure links are in section 4.11 (LNK-001 to LNK-003 for link rules). 

### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

|Action|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|See Shipments list and<br>queues|Yes|Yes|Own loads,simple list|No|
|Book,edit,duplicate,save<br>for later|Yes|Yes(within margin and profit limits)|Request a truckload<br>shipment(section4.11)|No|
|Book or update outside<br>margin/profit limits|Yes,with a<br>warning|No|—|—|
|See cost,profit,margin,<br>carrier on rows|Yes|Yes|No|No|
|Cost&Price editor|Yes|Yes(within limits)|Read-only"Price"|No|
|Cancel,uncancel,change<br>customer|Yes|Yes(Change customer:not when<br>"Enforce credit limits"is on)|No|No|
|Notes and Timeline|Yes|Yes|No|No|
|See and edit rep<br>commissions|Yes|No|No|No|
|Add or remove reps|Yes|Yes|No|No|
|Add non-freight vendors|Yes|Yes|No|No|
|Export|Yes|Yes|Own loads|No|


## 4.3 Carrier Cover and Rate Confirmation

**Evidence review — partial:** Main §§12.6, 15.6–7, 16.5/9, 17.2, 19.2 and Deep2 E-138–140 / Deep3 E-148 establish a cover workspace, candidate/history indicators, staged carrier selection, checked Track/Request packet, packet-versus-send labels, and existing Confirmed/PDF/Share views. They do not prove any Cover, Save lead, Drop, Share, signature or amendment submission.

| Requirements reviewed | Supported observation | Proposed / unverified detail |
| --- | --- | --- |
| COV-001–004 | Uncovered booked example opens coverage; equipment/target/history and controls visible | All role/status access, drawer dismissal guarantees, history weighting/source and universal radius/direction rules |
| COV-005–008, COV-018 | Candidate list, Covered/Quoted examples, Add a carrier search; 17/19 dated leads | Automatic lead generation, 25-lead cap, matching/sort priority, FMCSA backend supplier, deduplication/save/delete and no-paging contract |
| COV-009–015, COV-019–020 | Contact/note/equipment/charge/tracking/packet fields; Save for later and Cover & request packet; selecting one carrier changes to Cover & send rate con | Actual requiredness/length limits, line mapping, defaults by policy, tracked-load creation, draft persistence and saved-state side effects |
| COV-016–017, COV-021–024 | Candidate warning/disabled send; packet help says rate con follows receipt/approval; settings describe automatic packet for unapproved carrier | Exact approval/rejection policy, Owner override, transaction boundary, Scheduled timing, auto-created contacts/bills/documents, hold release, recipients/retries/errors |
| COV-025–031 | Remove carrier entry observed; no drop executed | TONU amount/records, zeroing, bill/card creation/voiding, replacement, tracking stop, signed-link revocation and accounting behavior |
| RCF-001–006, RCF-010 | Existing broker confirmation header/Confirmed, Share/list/+add share, itemized/PDF/Regenerate; existing two-page TL PDF | Full state/icon priority, sends/removal/contact creation, access/lifetimes, regeneration/cache/background effects and line editing |
| RCF-007–009, RCF-014–021, RCF-024–025 | Signature/confirmation marks and historical events only; checked resend controls in sampled shipment editors | Save/undo, signature snapshots, invalidation field list, concurrent/stale signing, state machine, signed-copy email and all external views |
| RCF-011–013, RCF-022–023 | Carrier agreement link/configuration, terms structure and email override help (§19.2) | Secure carrier page/validation/signing/access enforcement, fixed 42-day expiry, legal terms carryover, duplicate suppression and precise term snapshots |

**UI-described terms timing:** Main §19.2 says changes apply to future shipments; previously covered loads must drop the carrier before new terms apply. This is help text, not a tested amendment procedure or authorization to drop a carrier. Legal/commercial text and accessorial amounts require client approval.


In short: A rep opens a booked truckload, picks a carrier from leads built from 10-4's own lane history (or adds any carrier by MC or DOT number), enters the cost and the dispatcher's contact, and presses the Cover button. The load moves to "Scheduled" and, for an approved carrier, the carrier is e-mailed a rate confirmation (for a new carrier it is held until an Owner approves the carrier). The carrier opens a secure page, enters driver and truck details, types a signature and confirms, with no login. This part also covers changes after signing, removing a carrier and recording a TONU (truck ordered not used) charge. Reps and Owners use the broker screens; carriers use only the secure rate confirmation page. 

### Cover drawer (choosing the carrier) 

The Cover drawer opens on top of the shipment page from the orange "Cover" card of a booked truckload. The same card appears when a dropped carrier leaves the load without a carrier (COV-028). The "Shipments to cover" queue (section 4.2) lists the loads; clicking a row opens the shipment page, then the rep clicks the "Cover" card. 

##### COV-001 Who can cover and when 

Account users (Owners and Members) can cover a load. Customers and carriers never see the Cover card. The drawer opens only if the load is a truckload, not canceled, in status "Booked" and has no carrier assigned. Less-than-truckload loads are booked with a carrier quote (section 4.6). 

###### COV-002 

##### Opening, closing and layout 

The drawer is a dialog on a grey background, labelled "Cover load". 

- Close it with the close button (labelled "Close modal") outside the top right corner, with Escape, or by clicking outside. After a successful cover it closes and the shipment page shows the carrier card. Top to bottom: title row, lane history bar, then the lead list or the cover form. 

##### COV-003 Title row 

|Element|What it shows|
|---|---|
|"Cover load"|Title,large semibold text.|
|Equipment|The equipment requested for the carrier,or the shipment's equipment(for example"Dry Van").|
|"Partial<br>allowed"|Small dashed tag,shown only when the load allows a partial truckload.|
|"Target cost"|Grey label with the sum of the load's carrier cost lines,for example"Target cost $800.00".The amount<br>turns red with a warning icon when the margin is negative.|


##### COV-004 Lane history bar 

A blue-outlined bar under the title row summarizes what 10-4 has paid on this lane before. Only 10-4's own covered truckloads are used; no outside rate data is shown in the first version. 

- It shows a lane icon with the word "Lane", the small blue label "History" and an amount, for example "History $1,298". 

- Lane = the load's first pickup and last delivery, within 100 miles of each end, matching equipment, last 6 months, same direction. 

- The History amount is the load's distance multiplied by the average cost per mile of those past loads (total cost divided by total miles); if the load has no distance, the average cost of those loads. No History item is shown when no past load has a cost per mile. 

- Clicking the bar opens the lane history details (section 4.9, Lanes). Its accessible name is "View lane history details". 

|State|Text|
|---|---|
|Missing locations or equipment|"For lane data add locations&equipment type"|
|Loading|A spinner|
|No past loads on this lane|"This is a new lane for you"|
|The history could not be loaded|"Can't fetch lane data" (red)|
|Past loads found|The"History"amount|


### Carrier leads 

##### COV-005 How carrier leads are built 

When a truckload is booked, the system builds a list of carrier leads. 

- A lead is created for every carrier that hauled a covered truckload (scheduled, in transit or delivered) on this lane within 100 miles of both ends, in the last 6 months, in the same or the reverse direction. 

- Each lead records how many times the carrier ran the lane forward and in reverse, when it last did, the average cost per mile, and the dispatcher contact from that carrier's most recent matching load. At most 25 leads per load: most lane runs first, then carrier name. 

- A failure while building leads never prevents the booking; the rep can add carriers by hand (COV-008) and save a cost on a lead (COV-019). 

##### COV-006 Lead list order 

The first rule that differs decides. There are no filters and no paging. 

1. Carriers that are approved or candidates before carriers marked "Don't use". 

2. Leads with a saved cost ("quoted") before leads without one. 

3. Lower cost first. 

4. Leads added by hand first. 

5. Stronger lane history first: covered forward, quoted forward, covered in reverse, quoted in reverse, none. More runs first. 

6. Carrier name A to Z. 

##### COV-007 Lead card 

Each lead is a white card; clicking it opens the cover form for that lead. 

|Element|Text/look|Rule|
|---|---|---|
|Status dot|Green,grey or red dot with a<br>tooltip|Green=approved.Grey= "Candidate" (never worked with,not yet<br>approved).Red= "Don't use".The tooltip gives the reason(COV-016).|
|Carrier name|Large text||
|Equipment line|Equipment name|Only when it differs from the load's equipment.|
|"Partial"|Small grey pill before the<br>equipment|When the lead is for a partial truckload.|
|"Previously<br>dropped"|Red text with a small icon;<br>card faded until hovered|When this carrier was already dropped from this load(COV-025).|
|Lane icon|A truck icon|Covered forward,quoted forward,covered in reverse or quoted in<br>reverse.Reverse icons are at half strength.|
|Cost pill|Blue pill with the cost,for<br>example"$800.00"|With no cost,a dashed grey pill"Add cost".|


There is no safety-rating badge; a "conditional" rating appears only as a warning in the compliance box (COV016). 

Empty state. A load with no leads shows a dashed full-width blue button "Add a carrier" with a plus icon. With leads, a white row at the bottom shows a blue link "+ Add a carrier". 

###### COV-008 

##### Add a carrier by MC or DOT number 

Clicking "Add a carrier" (or "+ Add a carrier") replaces the list with the cover form and an empty carrier box. 

- The box has the placeholder "search by MC or DOT". Empty, it lists the account's approved carriers. After typing (with a short wait after typing stops) it searches the carrier directory (built from public FMCSA data, section 7) by name, MC or DOT number. 

- Each result shows the carrier name, "USDOT ", "MC-" and the address. A carrier with no DOT number is shown disabled with "MC/DOT number needed before coverage". 

- Picking a carrier that is already a lead on this load opens that lead with its saved data. 

- A new carrier stays unsaved until "Save for later" or "Cover". 

- Messages: "Carrier with USDOT # required for cover" (no DOT number), "Carrier not found" (unknown DOT number), "Carrier is already a lead on this shipment". 

- A back link "Carriers" (arrow left) returns to the lead list when the form was opened from the list. 

##### COV-018 Remove a lead 

A saved lead's form shows a trash button (accessible name "Remove lead"). It deletes the lead and returns to the list; the lead can be added again by MC or DOT number. The load and its history are unchanged. 

### Cover form 

Two columns: carrier and contact on the left, cost on the right. 

##### COV-009 Carrier and dispatcher fields 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Carrier|Search box,placeholder<br>"search by MC or DOT"|Yes,with<br>a DOT<br>number|Lead's<br>carrier|See COV-008.Disabled when the carrier<br>is blocked.|
|Contact name|Text,label"Contact name".If<br>the carrier is already on the<br>account,it suggests the<br>carrier's saved contacts;<br>otherwise plain text.<br>Placeholder"Contact name".|Yes,to<br>cover|From the<br>lead|"Required for cover".Picking a saved<br>contact fills phone and e-mail.Typing a<br>new name clears the saved contact link.|
|Contact phone|Phone,US by default,label<br>"Contact phone"|No|From the<br>lead||
|Contact email|E-mail,label"Contact email",<br>placeholder<br>"<br>email@carrier.com"|Yes,to<br>cover|From the<br>lead|"Required for cover". "Please enter a valid<br>email".|
|Note for rate<br>con and email|Multi-line,placeholder<br>"optional"|No|Empty|Up to2,000characters.Printed as"Note:"<br>on the rate confirmation and carrier page,<br>and shown in the e-mail(RCF-023).|
|Equipment|Grey button"Equipment: "with<br>a"Partial"tag or"(Not partial)"|Yes|Load's<br>equipment|Opens the equipment window(COV-011).|
|"Carrier will<br>move as a<br>partial"|Yellow row with a"Partial"<br>check box|No|Off|Only when the load can be a partial<br>truckload.|
|"Accessorials:<br>"|Grey info row|||When the shipment has services.|
|Compliance<br>and lane box|Read-only text|||Shown when the carrier is not approved,<br>when lane history exists,or when the<br>safety rating is"conditional".Shows the<br>approval reason and the lane lines<br>"Covered{n}x in this lane({time ago})",<br>"Covered{n}x in the reverse lane",<br>"Quoted{n}x in this lane"and"Quoted<br>{n}x in the reverse lane".A"Covered"line<br>is a button that opens the lane history for<br>this carrier(forward or reverse).|


A typed contact that does not yet exist for the carrier is created as a carrier contact when the load is covered. 

##### COV-010 Dispatcher contact is required 

The Cover button stays greyed out until a carrier with a DOT number, a contact name and a valid contact e- mail are filled in (COV-020). 

##### COV-011 Equipment window 

Title "Equipment this carrier will use". It holds an equipment list limited to the load's mode (no "Other"), a line "Requested: ", and, when a partial is possible, the check box "Partial" ("Partial truckload"). The choice changes the equipment printed on the rate confirmation. Equipment cannot be changed on the load after a carrier is covered. 

##### COV-012 Cost editor 

A table with columns "Description" and "Amount". 

- The first row is always "Freight"; it cannot be deleted or renamed. Its amount box is labelled "Charge 1 cost", with the load's planned cost as placeholder, for example "$800.00". 

- Extra rows have a description list (placeholder "Description...", from the charge list: Freight, TONU, Layover, Detention, Additional fee, Lumper) and an amount, and a trash button. 

- "+ add charge" adds a row; with more than one row a total row is shown. 

- A small calculator next to the amount opens "Cost per mile" with the load's mileage, for example "290 Miles"; hidden when the load has no distance. "Avg $X/mi" shows the lane's average cost per mile when known. 

- Covering needs every row to have a description and an amount; "Save for later" does not check this. 

- When covered: the first rows overwrite the cost of the matching carrier cost lines (descriptions and prices kept); extra rows become new cost lines with a price of $0; existing lines beyond the entered rows lose their cost and are hidden from the rate confirmation; if the lead has no charges, existing cost lines stay. The rate confirmation total and the carrier bill follow these lines. 

- Members are held to the same margin and profit limits as when booking (SHP-078); a broken limit shows as an error on the amount ("Charge N cost"). Owners are not limited. 

##### COV-013 Margin meter 

A coloured bar under the cost editor shows the margin the entered cost leaves. It is a guide only and never blocks a cover. 

- Profit = price minus cost. Margin percent = profit divided by price (margin on price, not markup). 

- The bubble shows margin and profit, for example "50.0% $800.00". The bar ends show the target cost (left) and the price (right). 

- The bar runs from green (low cost, high margin) through yellow to red (cost near or above the price). 

- With no cost entered the bubble is hidden and the bar is grey. The meter is hidden when the target cost is $0. 

##### COV-014 Tracking switch 

A bordered row "Track with Trucker Tools" with a switch, on by default, shown only when a tracking service is connected (section 7). On: tracking starts automatically after the carrier signs (section 4.4). Off: the carrier is not tracked automatically. 

##### COV-015 Packet box 

Shown only for a candidate (not yet approved) carrier: a cream card with a document icon and a switch. 

|State|Title|Text|
|---|---|---|
|No packet requested yet|"Needs a packet"|"Request a carrier packet.Once packet is received and approved,we'll<br>send the rate con."|
|Packet requested,not|"Waiting for||
|returned|packet"||
|Packet returned,not|"Need to||
|approved|approve"||


The switch "Request packet" defaults to the account setting "Request carrier packets" (Settings > Carriers > Terms & Conditions, section 4.10). It is off and disabled when a packet is already requested or returned. 

#### Approval rules 

##### COV-016 Carrier approval states 

Every carrier has one status on the account; it decides whether the rate confirmation can be sent (approval itself: CAR-007, CAR-015). 

|Status|Meaning|
|---|---|
|Approved|The rate confirmation can be sent at once.|
|Candidate|New or unapproved.A packet can be requested.The rate<br>confirmation is held.|
|Rejected("Don't use")|The carrier is blocked.|
|Reasons shown in the status dot tooltip and the||
|compliance box:||


- "Not in-service". 

- "Not authorized". 

- "No carrier, broker, or freight forwarder authority". 

- "Safety rating unsatisfactory". 

- "Insurance expired" (the manual status stays, but the reason is shown). 

- "Don't use this carrier" (the account marked it so). 

- "Manually approved" and "Manually added as candidate" (status set by hand). 

- "Haven't worked with this carrier before" (new on the account: candidate). 

- "Add carrier to your account first" and "Unknown carrier" (not yet on the account: candidate). 

A conditional safety rating shows a warning in the compliance box. Approval is re-checked at the moment of covering and of sending, so an old screen cannot send to a carrier that became blocked. 

##### COV-017 Owner override 

- A blocked ("Rejected") carrier shows a red card. For an Owner: the title "Carrier not authorized" and a switch "Override coverage status", explaining that the carrier is blocked to protect the brokerage and that an override sends the rate confirmation at once, skipping the packet request. With the override on, the Cover button reads "Cover & send rate con". 

- A Member sees a red notice "Don't use this carrier" with the reason; a Member's attempt to override is refused: "Only an Owner can override coverage status." 

- Without the override, a rejected carrier cannot be covered: "Carrier not authorized". 

- Only an Owner can override, and only for a blocked carrier. A new (candidate) carrier has no override: an Owner approves it and the held rate confirmation is released (COV-023). 

##### COV-019 Save for later 

The grey outlined button "Save for later" saves the lead (carrier, contact, note, equipment, costs, switches) without covering and without validation. A lead with a saved cost is "quoted" and moves up the list (COV-006). It does not change the load and is not added to the timeline. 

##### COV-020 Cover button 

A blue button at the bottom of the form. 

|Situation|Label|
|---|---|
|Approved carrier|"Cover&send rate con"|
|Candidate carrier, "Request packet"on|"Cover&request packet"|
|Candidate carrier, "Request packet"off|"Cover"|
|Rejected carrier with Owner override on|"Cover&send rate con"|


- Greyed out until the carrier has a DOT number, a contact name and e-mail, the form is valid, and every charge row has a description and amount. Disabled while a rejected carrier has no override. 

- Error banners: "Error saving carrier lead" and "Error covering" followed by the reason. 

- Covering-step messages: "Carrier already selected" (another carrier was covered meanwhile), "Shipment is not waiting for a carrier", "Shipment is canceled", "Not allowed" (not a truckload). 

### What happens when you cover 

##### COV-021 Cover is one step 

The draft proposes one Cover action. Its transaction boundary, partial-failure behavior and provider acknowledgments are unverified. In particular, coverage success and email failure must be treated separately rather than promising that every internal and external effect succeeds or rolls back together (see proposed COV-022).

1. The carrier is added to the account if new. 

2. The dispatcher contact is saved to the carrier if new. 

3. The cost lines and rate confirmation charges are set (COV-012). 

4. A rate confirmation is created in the draft state, with the current Rate con terms and carrier agreement saved onto it, so later setting changes never alter an existing rate confirmation. 

5. A carrier bill is created in the "Pending" state with the expected amount (section 4.5). 

6. The load moves from "Booked" to "Scheduled" (SHP-075), even if the rate confirmation is held for approval; it does not wait for the signature. A load without a signature stays "Scheduled" with an hourglass. 

7. The timeline shows "Covered" and the rate confirmation event (section 4.2). 

8. The rate confirmation (COV-022) or the packet request (COV-023) is sent. 

After covering, the shipment page shows the carrier card. The rate confirmation pill shows an hourglass with "Shared with , waiting on confirmation". The driver strip and the tracking pill show "Awaiting rate con". 

##### COV-022 Rate confirmation e-mail 

For an approved carrier, or an Owner override, the rate confirmation goes out in the same step, to the dispatcher's e-mail. Contents are in EML-020. The PDF "Carrier-Rate-Con-.pdf" (section 6) is attached. 

- If sending fails, the cover still stands and the rep can send it from the rate confirmation page (RCF-004). The message is "Failure occurred while sharing rate con. Covered successfully but rate con needs to be shared." 

- Reply-to is the account's rate confirmation reply-to address (Settings > Carriers > Rate cons), otherwise the rep who covered. 

The secure link follows LNK-001 to LNK-003. The share is recorded as a sharing row (RCF-005). 

###### COV-023 

##### Candidate carrier, packet request and held rate confirmation 

- With "Request packet" on, the carrier is covered and receives the carrier packet request e-mail (EML-050, section 4.8). With it off, nothing is e-mailed. In both cases no rate confirmation is sent. 

- The rate confirmation stays in the draft state and is held. Its page says "Rate con will be sent when you approve this carrier"; the Share button is disabled; the TL carrier card on the shipment page shows an orange "Rate con will be sent when you approve this carrier" with an orange "Review carrier" button that opens the carrier profile. 

- When an Owner approves the carrier, the system sends every held rate confirmation of that carrier to the saved dispatcher contact. If a held rate confirmation has no contact with an e-mail, the hold is lifted and the rep sends it by hand. 

- If the carrier is blocked again before sending, sending is refused with "Carrier not authorized" or "Rate con will be sent when you approve this carrier". 

##### COV-024 Cover messages summary 

|Message|When|
|---|---|
|"Required for cover"|Contact name or e-mail missing|
|"Carrier with USDOT#required for cover"|Carrier without a DOT number|
|"Carrier is already a lead on this shipment"|Duplicate carrier on a load|
|"Only an Owner can override coverage status."|Member turns the override on|
|"Carrier not authorized"|Rejected carrier without override|
|"Carrier already selected"|The load already has a carrier|
|"Shipment is not waiting for a carrier"|Load is not"Booked"|
|"Contact needs an email"|Sending a rate confirmation to a contact without an e-mail|
|"Rate con already sent"|Sending a rate confirmation twice|


### Removing or replacing a carrier, and TONU 

##### COV-025 "Previously dropped" in the lead list 

A carrier dropped from this load before shows red "Previously dropped" on its lead card, faded until hovered. It can still be chosen and the list order is unchanged. 

###### COV-026 

##### Carrier drawer and "Remove carrier" 

On a covered load, clicking the carrier card opens the carrier detail drawer (the carrier's profile in a dialog, section 4.8). At the bottom, a red outlined button "Remove carrier" with a trash icon opens the "Drop carrier" window. 

- Enabled while the load is "Scheduled". Disabled once the carrier's part is in transit or delivered (tooltip "Carrier already in transit or delivered.") and on a canceled load. 

- Any account user may remove a carrier, not only Owners. 

###### COV-027 

##### "Drop carrier" window 

A window with a red warning icon, the title "Drop carrier" and "Are you sure you want to drop from this shipment?" 

|Field|Input|Required|Rules|
|---|---|---|---|
|"Do you owe them|Money,placeholder|No|Cost owed to the dropped carrier.A hint says"Rate con was|
|TONU?"|"$0.00"||sent"when a rate confirmation was sent.|
|"Charge customer?"|Money,placeholder<br>"$0.00"|No|Price charged to the customer for the TONU.|


- The two fields show only when the load is not in transit, delivered or a draft. 

- Buttons: "No, go back" (grey outlined) and "Drop carrier" (red, spinner while working). 

- Success: the window and drawer close, the shipment page opens and "Carrier dropped" appears. Failure: a red banner "Error dropping carrier" and the window stays open. 

- Other refusals: "No carrier is assigned to this load" (no carrier or load not "Scheduled"), "Remove the payments first." (the carrier bill has payments), "Shipment is canceled", "Not allowed" (not a truckload). 

##### COV-028 Drop with no TONU amount 

If both fields are empty or $0, the carrier is simply released. 

- The rate confirmation and carrier bill are canceled ("Aborted"); signed copies are marked canceled. 

- The load goes back to "Booked", keeping its cost lines, stops and leads. The Cover card appears again. No TONU card or new bill is created. 

##### COV-029 Drop with a TONU amount 

If the cost or the price (or both) is above $0, the drop also records the TONU. 

- The carrier is released as in COV-028. 

- A separate "TONU Carrier" card stays on the shipment page for the dropped carrier: half width, red hidden-carrier icon, its own carrier bill with a "Pay bill" button. 

- A cost line "Truck ordered not used" is added for the dropped carrier with the entered cost and price; the carrier bill holds only that cost. The customer price is added to the customer invoice as a "Truck ordered not used" line. Load totals are updated. 

- Cost and price are independent: a TONU can be charged to the customer without paying the carrier, and the reverse. 

- After the drop, the TONU amounts are read-only on the Cost & Price block. 

- A $150 standard TONU and its applicability are not established as approved clone policy by the main guide; the terms/accessorial schedule and actual amount require operations/legal approval (main §19.2).

##### COV-030 Effects of a drop 

- Tracking of the dropped carrier stops (section 4.4). The dropped carrier gets no e-mail. 

- The old rate confirmation link says "Shipment no longer available." and offers "Download canceled confirmation" when a signed copy exists (RCF-020). Signing is refused with the same message. 

- The dropped carrier is not counted as "the carrier" of the load in lists, exports, lane history and the customer statement. Search still finds it. 

- A drop is added to the timeline (section 4.2). 

- If the bill has uploaded, approved or pushed status but no payments, the bill is canceled. A bill already pushed to the accounting system must be voided in QuickBooks by hand. 

##### COV-031 Covering a replacement 

The rep covers the new carrier as above; the rate confirmation, bill and tracking are created fresh. A load can be dropped and re-covered several times. Each TONU drop adds a "TONU Carrier" card and its bill; the TONU 

bill and the delivering carrier's bill go through carrier billing separately (section 4.5). The customer gets one invoice including any TONU price. 

### Rate confirmation page (broker) 

##### RCF-001 Opening the page 

The page "Rate Confirmation" shows one carrier's rate confirmation for a load. It opens from the "Rate con" pill on the truckload carrier card (disabled while the rate confirmation is held), from the "Rate Confirmation" tile on the Documents page (section 6) and from the "Rate confirmation" button on a timeline event. It is a dark full-screen page for account users only. Close with the X (accessible name "Close document"); the link "Documents" goes to the Documents page. 

##### RCF-002 Header 

Left: the title "Rate Confirmation", the carrier name and a small grey "Carrier" label. Right: "BOL " (link to the shipment), the customer name (link) and "<pickup city, ST> -> <delivery city, ST>". 

##### RCF-003 Status text 

A status card shows one text (first match wins). 

|Condition|Text|Look|
|---|---|---|
|Carrier confirmed|"Confirmed by"|Green,check mark|
|Changed after signing,not yet re-<br>sent|"Send updated Rate Confirmation"|Orange warning|
|Held for an unapproved carrier|"Rate con will be sent when you approve this carrier"|Orange|
|Sent and waiting|"Shared with[and N more],last,waiting on<br>confirmation"|Blue,spinning<br>hourglass|
|Never sent|"Rate Con not shared"|Grey,closed eye|


##### RCF-004 Share button 

A green "Share" button, disabled while the rate confirmation is held. It opens the share window (RCF-005). 

##### RCF-005 Share window ("Sharing Carrier Rate Confirmation") 

|View|Content|
|---|---|
|Overview|Title"Sharing Carrier Rate Confirmation".Empty text"Not yet shared".One row per contact with an icon<br>(orange refresh=a send is still needed,green check=confirmed,blue hourglass=waiting),the contact<br>name or e-mail,the time of the last send,and a trash button.After an e-mail failure or when a re-send is|
||needed,an orange outlined"Resend"button.Link"+add share".|


|View|Content|
|---|---|
|Choose a<br>contact,first<br>send|Title"Select contact to share with" (one choice).Search box"search or type in new email".The carrier's<br>contacts as"Name(email)"with the small text"Carrier contact".A typed valid e-mail offers"+add"<br>(creates a carrier contact).Note: "After RateCon is initially sent,you will be able to share with additional<br>contacts."Blue"Share"button,disabled with no choice.|
|Choose<br>contacts,later|Title"Select contacts to share with" (several choices).Same list.|
|sends||
|Stop sharing|Title"Stop sharing this document with?"Text: "Access to this document will be removed but they may<br>have already received previous versions of this document."Buttons"No,cancel"and red"Yes,remove".|


- The first send is the real send of the rate confirmation; later shares e-mail extra contacts. Re-sending to the same contact is "Resend". Sending again to the same contact reuses that contact's link and renews its 42 days (LNK-001). 

- A rate confirmation changed after signing and not re-sent shows the contact with "Resend", which sends the updated rate confirmation. 

Messages: "Error sharing", "Failed to remove share", "Contact needs an email". 

##### RCF-010 Document viewer and Regenerate 

The page shows the rate confirmation PDF as page images; clicking a page zooms it. The footer shows the file name "Carrier-Rate-Con-.pdf", a download button and a refresh button (accessible name "Regenerate document") that rebuilds the PDF from current data. The PDF is also rebuilt in the background after edits; whether viewing generates/refreshes a document is unverified; navigation can automatically write metadata/integration events (main Deep1–3; contents: section6). A missing file shows "Not available" with the regenerate button. If the preview cannot be shown: "Preview not available" with "Try again", or "Click to download" when the file can be downloaded.

###### RCF-006 

##### Cost & Price block 

Account users see a collapsed strip: "Target cost $X", "Profit $Y", "Price $Z". The expand button is "Expand itemized view" (collapse: "Collapse itemized view"). Hovering Profit shows "Margin n%" and "Cost+ n%". 

- Expanded, it lists this carrier's line items: Description, Cost, Price. Each line has a trash button and two switches, "Hide from rate con" and "Hide from invoice". "+ add item" adds a line. A line with no cost at all is also left off the rate confirmation. 

- Other carriers' lines are not shown but kept unchanged when saving. 

- The blue button "Save cost & price" appears only after a change. 

##### RCF-007 Saving and undo 

Saving updates the load's line items. Messages: "Saved Cost & Price" with an "undo" action that restores the previous lines, and "Failed to save cost & price". The PDF changes after the rate confirmation is re-sent or regenerated. Saving also checks the signed rate confirmation (RCF-018). 

##### RCF-008 "Send updated Rate con" switch 

A switch "Send updated Rate con" appears when the rate confirmation is confirmed, there are unsaved changes, the load is a truckload, the contact has an e-mail and the carrier is not held. Hovering shows "Rate con" and "To carrier contact(s)" with names and e-mails. 

- A universal Off default or no-email guarantee is not established. Main §16.5–6 and Deep2 E-140 show Rate Con checked in sampled assigned shipment editors; appointment dialogs also showed it checked. This separate rate-con editor variant and actual sends require validation. Proposed behavior when selected: save and send the updated document.

The same switch appears in the shipment's Cost & Price editor and the shipment edit form. 

##### RCF-009 "Download previous version" 

Shown when the rate confirmation is waiting for the carrier to accept changes. It downloads the last version the carrier signed. 

### Carrier confirmation page (carrier, secure link) 

##### RCF-011 Secure link and security 

The carrier opens the link from the e-mail; no account or login is needed (link life and renewal: LNK-001 to LNK-003). 

The page title is "Shipment BOL #"; it is hidden from search engines. 

- The link works only for that carrier contact and rate confirmation. Expired, removed or altered links show "Shipment not found" with "Shipment does not exist or is not publicly shared." 

- It gives access to this one rate confirmation only. The carrier sees only: carrier name, MC number, the stops, items, services, charges and rate confirmation text; never the customer, customer price, margin, internal notes or other loads. 

Loading state: a spinner with "Loading shipment". 

##### RCF-012 Carrier page layout 

White page, no menu. Top to bottom: 

1. Branding bar: broker logo left, broker name right. 

2. Banners: per state (RCF-016, RCF-019, RCF-020). 

3. Carrier and load card: equipment icon, carrier name (large), "MC-" (or "MX-" for Mexican carriers) and city and state; right: equipment text (a refrigerated load also shows the temperature range). A grey card shows the pickup date (for example "Fri, Oct 2"), "<origin city, ST> -> <destination city, ST>" with a small count when there are more than 2 stops, "BOL ", distance with units and total weight " lb". 

4. Terms & Fees: optional "Note:", the heading "Terms & Fees", the bullet "Exclusive use only" (or "Partial use"), then 10-4's rate confirmation terms in two columns (RCF-023). 

5. Confirm form (RCF-013), only while the rate confirmation needs confirming. 

6. "Locations": a "Services:" chip row and the stops in order: stop type, number, company, address, date and time window, appointment, PO numbers. Stop hours and private notes are not shown. 

7. Items card: " items to be shipped" with total weight, then one row per handling unit: quantity and package type, description, dimensions "LxWxH", weight, a "Stackable" tag, commodity, hazmat details (UN number, 

hazmat class, packing group), LTL class and NMFC. Then a hazmat contact block ("Hazmat contact", "Contract #", "Emergency #"), the total dimensions line and the accessorial list. 

8. "Questions?" block: the rep who covered the load (photo, name), broker name and address, a phone button and an "Email" button. Phone and reply-to e-mail come from Settings > Carriers > Rate cons, otherwise the rep's own. 

##### RCF-013 Confirm form 

Two columns on a wide screen (stacked on a phone, form first). 

|Field|Input|Required|Rules&messages|
|---|---|---|---|
|"Driver's name"|Text,placeholder"Joe<br>Driver"|Yes|"Required"|
|"Driver's phone"|Phone,US by default|Yes|"Required", "Enter a valid phone number".Saved in the<br>standard phone format.|
|"Tractor#"|Text,placeholder<br>"optional"|No||
|"Trailer#"|Text,placeholder<br>"optional"|No||
|Acknowledgment<br>text|Fixed paragraph||"I acknowledge as correct,and accept the referenced<br>shipment on behalf of.I agree that the charges indicated<br>above include all costs and fees in connection with the<br>shipment as described.Invoicing by and payment by<br>constitutes acceptance of this agreement.By signing,this<br>creates a contract carriage shipment."|
|"Signature(first&<br>last name)"|Text in a script font|Yes|After trimming and collapsing spaces,at least two words<br>of two or more letters each;letters,periods,apostrophes,<br>hyphens and spaces only. "Please enter a valid first and<br>last name."blocks the submit.Kept as typed.|
|"I agree"check<br>box|"I have read and agree to<br>the Carrier Terms&<br>Conditions" (link opens<br>the carrier agreement in<br>a new tab)|Yes,when<br>shown|Shown only when the account setting"Require carriers to<br>agree to terms"is on and the rate confirmation has a<br>carrier agreement. "Required"if unchecked.|
|"Confirm<br>shipment"|Blue button||Loading state while saving.|


Right column: the charge summary. Charges are listed as "description ... $amount" when there is more than the single "Freight" charge. The total is large and bold, with a line above it when there are several charges. 

No QuickPay option and no legal line under the form in the first version. 

A failed save shows a red box "Error accepting load" with the reason; field errors show under their fields. 

##### RCF-014 What confirming does 

Confirming is checked and recorded by the system. 

- The rate confirmation moves from waiting to confirmed; the time and the typed signature are saved. The signed version keeps the exact PDF content signed (section 6); later edits never appear under an old signature. 

- The timeline shows "Rate confirmation confirmed" (section 4.2); the event has a blue outlined "Rate confirmation" button that opens the signed PDF ("Preview not available" if not ready). 

- The shipment status stays "Scheduled". 

- When a carrier agreement applies and the carrier agreed, the carrier is e-mailed the signed copy (RCF021). 

- Tracking starts after the signature when the tracking switch is on (section 4.4). 

- The broker sees the green check on the "Rate con" pill and the driver strip with driver name, phone, truck and trailer. 

- The load stays confirmed even if the carrier closes the page. 

- Refusals: "Shipment no longer available." (load canceled or carrier dropped), "Rate confirmation already confirmed" (second signing), "Rate confirmation is not ready" (changed and not re-sent). 

##### RCF-015 The carrier signs only what they saw 

The page remembers the charges, stops, equipment and pickup number it showed. If the load changed after the page opened, confirming is refused with "This load was updated. Please review the new details." The page reloads with the new details, keeping what the carrier typed. 

##### RCF-016 Confirmed view 

After confirming (or opening a confirmed link): 

- A green panel "Load accepted" with a green outlined button "Download confirmation" (spinner until the signed PDF is ready; "Preview not available" if the file is missing). Right after signing, when a carrier agreement applies, it adds "Thanks, we'll send you a followup email with the signed agreement." 

- The Terms & Fees block, a dashed line, then "Driver:", "Phone:", "Tractor #:", "Trailer #:" and "Signed by:" (signature in script font). Charges on the right. 

- Footer: "Accepted by ()" and, when agreed, "Agreed to the Carrier Terms & Conditions" (link, new tab). Locations, Items and Questions? stay visible. 

##### RCF-017 Broker side of a confirmed rate confirmation 

The status text becomes "Confirmed by ". The carrier card shows a green check on the "Rate con" pill and the driver strip. The rep can still edit driver details in the "Driver & tracking" window (section 4.4); this never asks the carrier to confirm again. 

##### RCF-018 Edits after signing and re-confirmation 

A signed rate confirmation is invalidated only when something the carrier accepted changes: 

- Any charge, or the total. 

- Any stop's date, time window, appointment or address, and adding or removing a stop. 

- The equipment. 

- The partial or exclusive use flag. 

- The pickup number. 

Not counted: driver details, tractor and trailer, the note, internal notes, canceling or restoring the load, and Terms & Fees and the carrier agreement (they stay as at cover). 

- On such a change the rate confirmation moves from confirmed back to draft and the status text becomes "Send updated Rate Confirmation". 

- The system keeps a list of changes, such as "Rate $800.00 → $900.00", "Added $x", "Removed $x", " $x → $y", "Location 1 day", "Location 1 time", "Location 1 address", "Location added", "Location removed", "Equipment → ", "Partial use" or "Exclusive use only", "Pickup # changed". 

- The rep re-sends from the Share window ("Resend"), the "Send updated Rate con" switch, or the shipment edit form's "Send updated documents" card. The carrier gets the e-mail again and the rate confirmation waits for acceptance of the changes. 

- Until re-sent, a carrier opening the old link sees "Oops, this is an old version" (RCF-020). 

- The signed copy of the earlier version stays downloadable as "Download previous version". 

##### RCF-019 "Something's changed" (re-confirm) 

Shown to the carrier when the rate confirmation was re-sent after a change. 

- An orange-outlined box titled "Something's changed" with the numbered list of changes, and an orange button "Confirm changes". 

- The previous signature, driver and truck details are reused (the carrier does not retype them); the agreement is re-confirmed when it applies. 

- The signature in the confirmed block is hidden until the changes are confirmed. 

- The broker's status text is "Shared with , waiting on confirmation". 

##### RCF-020 Other carrier page states 

|State|When|What the carrier sees|
|---|---|---|
|Loading|Page is loading|Spinner and"Loading shipment"|
|Not found|Link bad,expired or<br>removed|"Shipment not found" / "Shipment does not exist or is not publicly shared." (no<br>action)|
|Needs<br>confirmation|Rate confirmation<br>sent,not signed|Terms&Fees and the confirm form|
|Confirmed|Already signed|"Load accepted"view(RCF-016)|
|Something's<br>changed|Re-sent after a<br>change|RCF-019|
|Old version|Changed and not re-<br>sent,or replaced|A document-missing icon, "Oops,this is an old version", "You previously<br>accepted BOL#,but there have been changes.Please see your email for links to<br>the latest version."and"Download previous confirmation"|


|State|When|What the carrier sees|
|---|---|---|
|No longer<br>available|Carrier dropped or<br>load canceled|An orange panel"Shipment no longer available."and"Download canceled<br>confirmation"when a signed copy exists|
|Held|Carrier not approved<br>yet|No rate confirmation is received until approval(COV-023)|


##### RCF-021 Follow-up e-mail with the signed copy 

Sent only when a carrier agreement applies and the carrier agreed to it; contents in EML-022 (subject "Signed rate confirmation ", text "Thanks for confirming load . The signed rate confirmation is attached.", a "View rate confirmation" link, the signed PDF "Carrier-Rate-Con-.pdf" with the signature in a script font). Reply-to is the account's rate confirmation reply-to, otherwise the rep who covered. A signed copy is built and kept even when no agreement applies; only the e-mail is skipped. 

##### RCF-022 Carrier agreement page 

A public page (no login) showing 10-4's carrier terms and conditions. The link is shown on the confirm form and in the PDF. The page tab title is "Carrier Terms and Conditions". 

- Text terms are shown as a document; terms kept as a link open the linked PDF. A spinner shows while loading. If the terms cannot be found: "Unable to find carrier terms." with no action. 

- The terms belong to Settings > Carriers > Terms & Conditions (section 4.10): "Require carriers to agree to terms" decides whether the check box shows; "Request carrier packets" sets the default of the packet request. With no carrier agreement, the check box and link are left out. 

- The agreement saved on a rate confirmation at cover is the one the carrier sees, even if the setting changes later. 

- Old Quote Factory carrier-terms links do not work in 10-4 TMS; they show "Unable to find carrier terms." New rate confirmations carry the new link. 

##### RCF-023 Terms & Fees text 

- Terms & Fees is the account's "Rate con terms" setting (Settings > Carriers > Rate cons, section 4.10). 104's current text is carried over unchanged: paperwork requirements, accessorial schedule (layover, TONU, detention, extra stop-off), performance-based deductions, delivery and operational compliance. Changing it is an Owner setting change. 

- The version in force at cover is saved onto the rate confirmation; later changes apply only to new rate confirmations. 

- The rate confirmation always starts with "Exclusive use only" (or "Partial use" for a partial load) once, even if the saved terms start with that bullet. 

- The optional "Note:" line comes from the "Note for rate con and email" cover field. 

- On the PDF the terms print on page 2 in two columns (DOC-010); on the carrier page they show in two columns on a wide screen. 

##### RCF-024 Carrier never signs 

The load stays "Scheduled" with an hourglass. The rep resends from the Share window, or phones the carrier. There is no control to record a phone confirmation in the first version. 

##### RCF-025 Rate confirmation lifecycle (rate confirmation states) 

|State|Meaning|
|---|---|
|Draft|Created at cover,not sent(or changed after signing,not re-sent,or held)|
|Waiting|Sent,waiting on the carrier("accept terms",or"accept changes"after a change)|
|Confirmed|Carrier signed|
|Old version|Replaced by a newer version|
|Canceled|The carrier was dropped,or the load canceled|


### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

|Action|Owner|Member|Carrier|
|---|---|---|---|
|See the Cover card,cover with an approved<br>or candidate carrier|Yes|Yes|No|
|Add,save and remove carrier leads|Yes|Yes|No|
|Override a"Don't use"or unauthorized<br>carrier|Yes|No("Only an Owner can override<br>coverage status.")|No|
|Approve a carrier(release a held rate<br>confirmation)|Yes|No|No|
|Edit cost lines at cover|Yes,no limits|Yes,within margin and profit limits|No|
|Share,resend,regenerate rate confirmation|Yes|Yes|No|
|Edit Cost&Price on the rate confirmation<br>page|Yes|Yes,within limits|No|
|Remove a carrier,record TONU|Yes|Yes|No|
|Open the rate confirmation secure page and<br>confirm|No|No|Yes(with the<br>link)|
|Open the public carrier agreement page|Anyone with<br>the link|Anyone with the link|Anyone with<br>the link|


Customers never see the Cover card or any rate confirmation page. 

## 4.4 Tracking, Pickup and Delivery

**Evidence review — partial:** Main §§15.9, 16.7–10, 18.2 and Deep2 E-124/140–142 establish stop/driver controls, tracking-update/ETA/appointment dialogs, explicit timezone labels, existing events and queue examples. No In/Out/Picked up/Delivered/Save/Cancel appt/tracking switch was submitted. No live Trucker Tools contract, callback or payload was captured.

| Requirements reviewed | Source-supported portion | Proposed / unverified detail |
| --- | --- | --- |
| TRK-001–005 | Stop identity, hours, appointments, references, Hidden from carrier and tracking labels; Reschedule opens editor | Exact display priority/style/copy timing, audiences and stop-order enforcement |
| TRK-010–018 | Appointment time/ID; checked Send updated Rate con in sampled assigned dialogs; ETA date/time/zone/Notes; free Tracking update fields | Any-status/canceled access, requiredness/50-char limits, all completion dialogs, one-minute tolerance/earliest date, transitions, dual-event partial save and timezone fallback |
| TRK-019–026 | Historical events, free-update form; optional PRO in one TL form, absent in sampled LTL form | Source precedence, edit/delete/undo, automatic read-only policy, 1,000-char cap, reversal/state recalculation, stale/order restrictions and full error text |
| TRK-030–043 | Queue/status examples, driver name/phone/Tractor/Trailer dialog; Tracking completed and Off route coexist on In transit example | Exact lateness/alert algorithms, phone restrictions, save/start/update behavior and pickup-number persistence |
| TRK-050–062 | Trucker Tools label/preference; checked cover switch; map attribution | Connected-account readiness, signature/start/stop triggers, three retries, payload allowlist, ELD/app states, deduplication, provider callbacks and live-position release scope |
| TRK-070–074 | Populated Scheduled pickup and In transit delivery queues | Full date/timezone/sort/counter membership, automatic refresh, bulk absence and exported contents |
| TRK-080–086 | POD upload entry and input hints; TL/LTL customer checkboxes; main §17/Deep3 E-145–146 | Server file/size/count rules, universal defaults, exact banner/approval/send gates, email merging/attachment semantics |
| TRK-090–096 | Inline PRO and separate external ArcBest Track link; existing LTL events, sampled tracking form | Enter/blur save, universal URL/reference mapping, carrier-feed transitions, portal views and text-delivery sender |

**Source caution:** A tracking label is not the shipment state. “Tracking completed” was observed while the shipment was In transit (main §15.9). Stop zones in ETA forms were America/Los Angeles and America/Detroit; a separate tracking default showed the prior client date. The source explicitly leaves timezone/default policy open (OQ-25).


In short: This part of the system covers everything that happens to a load after a carrier is assigned: the stops on the shipment page, recording check-ins, confirming "Picked up" and "Delivered", live tracking of the truck through Trucker Tools, and the proof of delivery (POD). It also includes the two work queues, "Confirm pickups" and "Confirm deliveries". Brokers (Owner and Member) use it every day. Customers see the result on their shipment page. 

### Locations section on the shipment page 

The "Locations" section sits on the shipment page (section 4.2). It shows one card per stop, joined by a vertical line. For truckload (TL) loads with a carrier, a driver strip sits above the stops. 

##### TRK-001 Section header 

|Item|When it shows|What it does|
|---|---|---|
|"Locations"heading|Always|-|
|Distance,for example"1,730mi"|Distance is known|Display only|
|Transit days,for example"4days"<br>("1day"for one)|Transit days are known|Display only|
|Reschedule button|Broker users only,while the load has<br>not been picked up|Opens the"Edit shipment"page(section<br>4.2);no separate pop-up.|
|Services chip,for example<br>"Liftgate,Inside"|The shipment has services|Display only|
|PRO and Track(LTL loads only)|See TRK-090and TRK-091||


##### TRK-002 Stop card: left side 

|Element|Rules|
|---|---|
|Stop number in a<br>circle|"1", "2",and so on.Filled green with a white number once the stop is completed;otherwise a grey<br>outline.|
|Company name|Bold.Next to it,in small grey text,the location type(for example"Business with dock/forklift",<br>"Residential").|
|Trade show line|On a stop with the location type"Convention/trade show": " -Booth".|
|Address|Street,then"city,state ZIP".|
|Contact|Contact name in bold with phone number.Hidden from carrier users when the shipment says"Hidden<br>from carrier".|


|Element|Rules|
|---|---|
|Phone button|Click to copy the phone number.Tooltip"Click to copy phone".A short confirmation appears for1.5<br>seconds.|
|E-mail buttons|One per contact e-mail.Click to copy.Tooltip"Click to copy email".|
|Resend BOL icon|Broker users only.Shows when the BOL was already sent to this stop's first e-mail address(and is not<br>still sending).Tooltip"Resend BOL".Sends the BOL again(EML-011).Messages"BOL shared" / "Failed<br>to send BOL".|
|"Hidden from<br>carrier"line|Broker users,when the shipment hides contacts from carriers.Small grey text with a closed-eye icon.|
|Service pills|Services for this stop(for example liftgate).|
|"PICK UP"and<br>"DELIVER"rows|Only on loads with more than two stops. "PICK UP"lists the items picked up at this stop, "DELIVER"<br>the items dropped there.Clicking an item scrolls to its card in the items list(SHP-063).|
|NOTE box|Yellow box labeled"NOTE"with the stop's instructions.Turns transparent once the stop is completed.|
|PRIVATE NOTE|Label"PRIVATE NOTE"and the private note.Broker users only.|


##### TRK-003 Stop card: right side (dates and times) 

|Element|Rules|
|---|---|
|Date|Format"Fri,Dec25".The year appears in small grey text when not the current year.Shown,in priority<br>order:the actual pickup or delivery date,the planned stop date,then the estimated delivery date.Bold<br>black once the stop is done.|
|"~"prefix|On the destination of an LTL load that is not yet delivered,for example"~Thu,Oct15" (an estimate).|
|Late warning<br>icon|An orange triangle before the date when the load is"Scheduled"and the stop date is before today.<br>Tooltip:bold"This should have been picked up by now."then"Check to see if it's in transit or needs to<br>be rescheduled."|
|Completed time|Time such as"2:48pm"in the stop's own time zone,followed by the zone in grey(for example"EDT").|
|Lateness text<br>(TL only)|Small grey text under the completed time when the actual time is outside the appointment or open<br>window,for example"2h9m late".|
|Appointment|See TRK-010.|
|Open window|Grey text"Open8:00am– 5:00pm EST".Only while the stop is not completed,has open and close<br>times,and has no appointment.|
|References|Right-aligned rows such as"PO12345", "Pickup...", "Order...".Kind in grey,value in black.Hidden from<br>carrier users until they accept the rate confirmation.|
|"PICKUP"<br>number|On the pickup stop,when a pickup number exists: "PICKUP"in small grey capitals.Broker users see it<br>once the load is picked up;other users always.|


##### TRK-004 Stop card appearance 

- Card border: dashed grey while the stop is not completed; solid grey once the truck has arrived; dashed orange when the load is "Scheduled" and the stop date is before today. 

- The vertical line between stops is grey and turns green after a completed stop. 

- Hovering a completed card shows a green ring. 

- On a phone, stop cards stack in one column. 

##### TRK-005 Stop order and the order rule 

Stops are shown in route order. A stop can be picked up, delivered or marked arrived only after the stop before it is completed (TRK-025). 

### Appointments 

##### TRK-010 Add an appointment 

Broker users can set an appointment on any stop, in any shipment status, including canceled loads. With no appointment and the stop not completed, a ghost button "+ Add appointment" appears. With an appointment, the card shows two lines: "Appt" with the time in bold, and the appointment number (or grey italic "unknown"). A completed stop shows one line: "Appt @". Customers and carriers see plain text. Clicking the button or the appointment opens the "Appointment" window. 

|Field|Input/options|Required|Default|Rules and messages|
|---|---|---|---|---|
|Appointment<br>time|Time picker,label<br>"Appointment time"|Yes|The saved<br>appointment<br>time|Hours and minutes.|
|Appointment#<br>or ID|Text,label<br>"Appointment#or ID",<br>example text"12345"|No|The saved<br>number|Up to50characters.|
|Send updated<br>Rate con|Check box|-|Checked in sampled assigned appointment dialogs|Proposed condition: signed rate confirmation exists<br>with a carrier contact and the carrier is<br>approved.Hovering lists the carrier contacts<br>who would be e-mailed.|
|Cancel appt|Red outlined button|-|-|Only when an appointment exists.Removes it.<br>"Appointment removed";on failure"Failed to<br>remove appointment".|
|Save|Blue button, "Saving..."<br>while working|-|-|"Appointment saved";on failure"Failed to<br>save appointment".|


##### TRK-011 Appointments and the rate confirmation 

The appointment is a term of the signed rate confirmation. 

- If the carrier has already signed, saving a new or changed appointment returns the rate confirmation to "draft" so the carrier must confirm again (section 4.3). 

The carrier is e-mailed the updated rate confirmation only when "Send updated Rate con" is on. 

An appointment change also updates the load at Trucker Tools (TRK-059). 

### Recording events on a stop 

Under the stop card is an action row, shown to broker users only. 

##### TRK-012 ETA, In and Out buttons (truckload loads) 

LTL loads show no ETA, In or Out. 

|Button|Shows when|What it does|
|---|---|---|
|ETA(blue text)shows"ETA"or<br>"ETA4:30pm";on another day<br>also the date,for example"ETA<br>Fri,Dec25 4:30pm".|TL loads,stop not reached and<br>not completed.|Opens the tracking window in ETA mode,titled"ETA<br>to".|
|In shows"In"or"In4:30pm".A<br>pulsing blue dot shows while the<br>truck is on site.|TL loads,the stop is the first<br>one or the stop before is<br>completed,and the carrier<br>does not still need approval.|Opens"Arrived at".Submit button"Mark arrived".|
|Out shows"Out" (grey,faded<br>until the truck is in)or"Out<br>4:30pm"after completion.|TL loads|Opens the window for the stop's completion(Picked<br>up,Delivered,or"Location complete").When a stop<br>is both pickup and delivery the Out time is read-only<br>with the tooltip"To modify,edit the PICK event<br>below."|
|Dwell text(grey)|The truck has arrived|Time on site.Counts up every minute while on site;<br>shows the total after completion.|


##### TRK-013 The tracking window 

All events use one window; the title depends on the mode. 

|Mode|Title|Submit button|
|---|---|---|
|ETA|"ETA to"|"Save"|
|Arrived|"Arrived at"|"Mark arrived"|
|Picked up|"Shipment picked up"|"Picked up"|
|Delivered|"Shipment delivered"|"Delivered"|
|Stop is both pickup and delivery|"Location complete"|"Complete"|
|Free update|"Tracking update"|"Save"|


|Field|Input/options|Required|Default|Rules and messages|
|---|---|---|---|---|
|Time(labeled<br>"ETA"in ETA<br>mode),with the<br>time-zone name in<br>grey|Time picker|Yes|Now,or the<br>stop's open<br>time,or the<br>saved event<br>time|For Picked up,Delivered and Arrived<br>the time cannot be in the future: "Time<br>is in the future()".One-minute<br>tolerance.|
|on(date)|Date picker,<br>calendar opens<br>from the date text|Yes|Today|For Picked up,Delivered and Arrived<br>the latest date is today.The earliest<br>date is the earlier of the booking date<br>and the first pickup date;earlier shows<br>"Date is too early".|
|Location|Place search<br>(type a city or<br>place)|Required for<br>"Tracking<br>update"when<br>there is no note|Empty|In other modes a small button under<br>the title shows the stop's"City,ST"<br>with a pencil;click to change the event<br>location.|
|Appt/ETA/Open<br>lines|Read-only grey<br>text|-|-|"Appt2:00pm", "ETA4:30pm Fri,Dec<br>25", "Open8:00am– 5:00pm"when<br>available.|
|Notes|Text area,<br>example text<br>"optional"when a<br>location exists|Required for<br>"Tracking<br>update"when<br>there is no<br>location|Empty|Up to1,000characters.Both empty:<br>"Enter a location or a note".|
|PRO#|Text,example text<br>"optional"|No|Empty|Only when the shipment has no PRO<br>number and the mode is not ETA.Up to<br>50characters.|
|Picked up early?|Yellow warning<br>box|-|-|For a pickup earlier than planned:<br>"Picked up early?"and"This pickup<br>was scheduled for."Does not block<br>saving.|
|Delete|Red outlined<br>button|-|-|Only when editing an event you<br>created.|


##### TRK-014 Picked up 

The blue Picked up button shows on a pickup stop when it is the next expected event, the stop is the first or the stop before is completed, and the carrier does not need approval. It is orange when the pickup is late (TRK-030). It does not show on a load that is only "Booked" (no carrier yet) or "Canceled". Saving does the following. 

- The stop turns green and gets the actual pickup time. 

- The shipment status changes from "Scheduled" to "In transit". 

- The carrier can no longer be removed (section 4.3). 

- The load leaves the "Confirm pickups" queue and the badge count drops. 

- Planned dates on the stop and load do not change; the actual time is stored and shown instead. 

##### TRK-015 Delivered 

The blue Delivered button shows on a delivery stop under the same conditions as TRK-014, and not on loads that are not "In transit". Saving does the following. 

- The stop turns green with the actual delivery time. 

- The status changes from "In transit" to "Delivered". 

- Tracking at Trucker Tools stops (TRK-060). 

- The load leaves the "Confirm deliveries" queue. 

- Billing becomes available (section 4.5). 

- If the customer requires a POD and none is on file, the "POD is required" banner appears (TRK-081). 

##### TRK-016 Stop that is both a pickup and a delivery 

The button reads Complete and records both the delivery and the pickup. If the second fails, the first stays saved and the window shows the error; pressing the button again saves only the missing one. 

##### TRK-017 Time zones 

Sample ETA forms explicitly show America/Los Angeles and America/Detroit; displayed tracking/list/document times differ across contexts. The timezone source, fallback, daylight-saving rules and planned-versus-actual interpretation are unverified (main §§15.2, 16.7; Deep2 E-124/142; OQ-25). No Central fallback is established.

##### TRK-018 What the planned dates do 

Recording events never changes the planned stop dates, pickup date or appointments. Actual times are stored separately and shown first on the stop card. (The planned dates are terms of the signed rate confirmation, so changing them would send it back to draft.) 

### Tracking updates, log, edit, delete and undo 

##### TRK-019 Tracking log between stops 

Under every stop except the first, a log shows events oldest first, joined by a green line. 

|Part|Content|
|---|---|
|Date and time|Bold date"Fri,Oct9"and the time"2:48pm"in the event's time zone.|
|Who|Small line with the name of the user who entered it,with a people icon.Events from the tracking service<br>show no name.|
|Place|"City,ST"in bold.|
|Note|Under the place,for example"Pickup(Arrived at origin)".|
|Marker on the|"PICK"for pickups, "DROP"for deliveries, "IN"for arrivals, "ETA"for ETAs.Other updates show a small|
|line|green dot.|


Deleted events are not shown. 

- The system's automatic ETA is hidden when a person has entered an ETA for the same stop. 

- Once the load is delivered, the log shows only the pickup and delivery events plus a dashed button "N more updates ›"; click to see all, then it reads "N fewer updates". While in transit, all events show. 

- A broker-only dashed link "+ add tracking update" under the log opens the window in "Tracking update" mode for the delivery stop once the pickup exists, otherwise for the pickup stop. 

##### TRK-020 Edit an event 

Clicking an event row (or pressing Enter on it) opens the same window filled in; broker users see a pencil on hover. Only events entered by a person can be changed. Events from Trucker Tools open read-only (fields disabled, no Save, no Delete). A person corrects an automatic event by adding their own event for the same stop; the person's entry wins. Trying to change an automatic event any other way shows "Automatic updates cannot be edited". 

##### TRK-021 Delete and undo 

Delete removes an event. "Deleted tracking event" appears with an Undo link that restores it. Deleting or editing recalculates the stop, the status and the queues: 

If the removed event was the only pickup, the load goes back from "In transit" to "Scheduled". 

- If it was the only delivery, the load goes back from "Delivered" to "In transit". 

##### TRK-022 Messages 

|Situation|Message|
|---|---|
|New event saved|"Saved tracking event"|
|Event changed|"Updated tracking event"|
|Event deleted|"Deleted tracking event" (with Undo)|
|Browser blocks the request(for example an ad<br>blocker)|"Failed to save the event.If you have an ad blocker,disable it and try<br>again."|


##### TRK-023 Which event sets a stop's time 

For each stop and event type, an event entered by a person wins over an automatic one; among several, the newest wins. 

##### TRK-024 Shipment status follows the events 

|Condition|Shipment<br>status|
|---|---|
|No pickup recorded|Scheduled|
|First stop picked up|In transit|
|Last stop completed(delivered)|Delivered|


###### Condition 

Status moves only for loads that are "Scheduled", "In transit" or "Delivered"; events never move a "Booked", "Requested" or "Canceled" load. On a "Booked" load only ETA, In and free tracking updates are allowed. (All statuses: SHP-075.) 

Shipment status 


##### TRK-025 Order rules and other blocking messages 

|Rule|Message|
|---|---|
|Pickup,delivery or arrival on a stop needs the previous stop completed|"Complete the previous stop first"|
|A change that would leave a stop unfinished while a later stop has a pickup or<br>delivery|"Remove the later stop's updates<br>first"|
|Pickup or delivery on a load with no carrier yet|"Cover the load first"|
|Any event on a canceled load|"Shipment is canceled"|
|Any event on a load that is not booked yet|"Shipment is not booked"|
|Event not found|"Tracking event not found"|


##### TRK-026 Tracking after the load is edited or canceled 

Editing a shipment that removes a stop or moves items recalculates the stops and status in the same step. 

- Canceling a load stops tracking. Un-canceling does not restart it; a broker turns the tracking switch back on (TRK-056). 

### Late and at-risk warnings 

##### TRK-030 Late pickup 

A "Scheduled" load whose stop date is before today shows the orange dashed card border, the orange triangle with the tooltip in TRK-003, and an orange Picked up button. It also appears in "Confirm pickups" (TRK-070). 

###### TRK-031 

##### Late at a stop 

A completed stop shows small grey lateness text (for example "2h 9m late") when the actual time is outside the appointment or open window (TL only). 

##### TRK-032 Tracking alerts 

Trucker Tools can report an alert on a load. The latest is shown in the tracking dialog (TRK-057) and as a small icon on the load's row in lists: 

red route icon: out of route 

orange circular arrow: behind schedule 

green clock: on time or ahead of schedule 

Other alert texts in the dialog: "At Pickup", "Cannot Determine", "Location Off", "Location Hidden", "Phone Off", "GPS Off", "No Phone", "Past Appointment Time" and "Possible Detention". 

##### TRK-033 Late delivery 

A load "In transit" with a delivery date earlier than now appears in "Confirm deliveries" (TRK-071). 

### Driver details 

##### TRK-040 Driver strip (truckload loads, broker users) 

A grey strip with a steering-wheel icon sits above the stops of each carrier on the load. 

|State|What it shows|
|---|---|
|No carrier assigned|Grey text"Needs a carrier"|
|Carrier assigned,no driver data|The carrier name only|
|yet||
|Carrier and driver|Row1:driver name(bold)and driver phone.Row2 (small,grey):carrier name, "Truck",<br>"Trailer".|
|Right side|The tracking status pill(TRK-055)|


The whole strip is a button (screen-reader label "Update driver information for "), highlights on hover, and opens the "Driver & tracking" window. Customers and carriers do not see it. 

##### TRK-041 "Driver & tracking" window 

|Field|Input/options|Required|Default|Rules and messages|
|---|---|---|---|---|
|Driver<br>name|Text|Yes|Current<br>value||
|Driver<br>phone|Phone input,<br>USA by<br>default|Yes|Current<br>value|A complete US mobile number(10digits).Also the number Trucker<br>Tools texts.|
|Tractor#|Text|No|Current<br>value||
|Trailer#|Text|No|Current<br>value||
|Save|Blue button|-|-|Driver name and phone are required;tractor and trailer are optional<br>(as on the carrier's form,RCF-013).Failure: "Error updating driver<br>details".The window closes on success.|


The carrier enters the same details when signing the rate confirmation (section 4.3). Brokers can correct them here any time while the load is "Scheduled" or "In transit" and not canceled. 

##### TRK-042 Changing driver details updates the tracking 

If a tracking load already exists at Trucker Tools, changing the driver, truck or trailer updates that same tracking load. It never creates a second one and does not stop and restart tracking. 

##### TRK-043 PICKUP number 

On the first stop, brokers can enter the carrier's pickup number inline. The card shows "PICKUP" with a grey "+ add number"; click, type, and press Enter or click away to save. Editable until the load is picked up. It is a rate confirmation term: if the carrier has already signed, changing it sends the rate confirmation back to draft (RCF-018). 

### Automatic tracking through Trucker Tools 

10-4 uses its own Trucker Tools account. Trucker Tools follows the driver's phone (through the Trucker Tools app) or the truck's electronic logging device (ELD). 

##### TRK-050 Tracking switch when covering a load 

The cover form (section 4.3) has a switch "Track with Trucker Tools", on by default. It shows when Trucker Tools is connected for 10-4. When off, the load is not tracked. 

##### TRK-051 When tracking starts 

- When the load is covered, the system prepares tracking. The pill reads "Awaiting rate con". 

- Tracking starts only after the carrier signs the rate confirmation: the system then sends the load to Trucker Tools with the driver phone from the signed rate confirmation. 

- Trucker Tools texts the driver a link to the app, or reads the truck's ELD. 

- If the carrier signs again after accepting changes, the same tracking load is updated; a second is never created. 

- If a start request fails, the system retries up to three times. If it still fails, the failure is recorded on the load's timeline and the pill stays at "Awaiting tracking start". A broker can then start tracking with the switch in the tracking dialog. 

##### TRK-052 When tracking stops 

Tracking stops when: 

- the load is marked "Delivered" (the pill reads "Tracking completed"); 

- the load is canceled; 

- the carrier is removed from the load (dropped or replaced); 

- a broker turns the tracking switch off (the pill reads "Tracking cancelled"). 

A stop request wins over a start that has not completed. Un-canceling a load does not restart tracking. 

##### TRK-053 Driver phone rules 

The phone must be a complete 10-digit US number. A start or update with an invalid phone is refused before anything is sent, and the reason is shown on the load. Stopping tracking is never blocked by a phone rule. 

###### TRK-054 

##### What is sent to Trucker Tools 

Only what tracking needs: the load number, driver name and phone, truck and trailer numbers, the carrier's company name and MC number, the broker's company name, and for each stop the address, city, state, ZIP and a planned time (the appointment, then the open time, then 8:00 am local). Customer names, contact people, phone numbers, notes, instructions, references and all money amounts are never sent. 

##### TRK-055 Tracking status pill 

The pill sits at the right of the driver strip: text on the left, the Trucker Tools mark (red "T") on the right. It is a button that opens the tracking dialog, shown when tracking is set up for the load. 

|Pill text|Meaning|
|---|---|
|"Awaiting rate con"|The carrier has not signed yet.Tracking has not started.|
|"Awaiting tracking start"|Signed.The load is sent and waiting for Trucker Tools to begin.|
|"Tracking active"|The driver's phone is reporting location.|
|"Tracking via ELD"|Location comes from the truck's ELD.|
|"Now tracking via app"|Tracking switched from ELD to the driver's app.|
|"ELD error"|The ELD could not be read.Use manual updates,or ask the driver to use the app.|
|"Tracking disabled" (grey)|The driver turned location off,or tracking is not running.|
|"Tracking cancelled"|Stopped by a broker,a cancel or a carrier change.|
|"Tracking completed"|Observed even on an In transit shipment (§15.9); does not prove delivery. Exact provider meaning unverified.|


Before the carrier has signed, the pill always reads "Awaiting rate con", whatever Trucker Tools reports. 

##### TRK-056 Tracking dialog 

Clicking the pill opens a dialog titled "Trucker Tools tracking". 

- A switch turns tracking on or off. Available only after the rate confirmation is signed, while Trucker Tools is connected, and not while another change is in progress. On starts tracking; off stops it. Frozen on canceled and delivered loads. 

- A large status line shows an icon and the pill text, and on its right a link button "Trucker Tools" that opens the load on the Trucker Tools website in a new tab. 

- Under it an information box (blue information, orange warning, red error) shows a short title and help text for the state. Examples: "Tracking stopped" with "Restart tracking by toggling it back on"; "Ask driver to start tracking"; "Driver disabled location services" with "Please have driver enable location services and 

set to "Always" for Trucker Tools App"; "ELD active" with "Load is being tracked via ELD/telematics. (not via mobile app)". An error from Trucker Tools shows in a red box with its message. 

##### TRK-057 Alerts in the dialog 

The latest alert (TRK-032) shows in the dialog with the time of the last update. 

##### TRK-058 What comes back from Trucker Tools 

- Location updates from the driver appear in the tracking log as updates with city and state, between the stops. 

- Arrival at the destination appears as an "In" event. 

- Pickup and delivery are not set automatically in the first version; a broker confirms them with Picked up and Delivered (TRK-070, TRK-071). 

All automatic events are read-only (TRK-020) and a person's entry overrides them. 

##### TRK-059 Changes to a running load 

Changing a stop's address, date or times, or saving an appointment, updates the load at Trucker Tools. The latest data always replaces the previous data. 

##### TRK-060 Delivered stops tracking 

When the last stop is delivered, tracking stops and the pill reads "Tracking completed". 

##### TRK-061 Safety 

Only one system tracks a load at a time. 

- Tracking is never started twice for the same load. 

###### TRK-062 

##### Map 

The shipment page shows the planned route as a line between the stops (section 4.2). Showing the truck's live position on the map is planned for later. 

### Queues: Confirm pickups and Confirm deliveries 

These lists of loads needing a broker's action are reached from the sidebar (section 4.1); the shipments list is in section 4.2. 

###### TRK-070 

##### Confirm pickups 

- Sidebar row "Confirm pickups" with an orange count badge (label "Confirm pickup" when the count is 1). Page title: "Shipments to confirm pickups". 

- Contents: all "Scheduled" loads whose pickup date is before today (the start of the user's local day). Sorted by pickup date, oldest first; the sort can be changed. 

- Rows are as in the shipments list, with a light-blue status dot, the pickup column at full strength, the delivery column dimmed, and the carrier name and cost at the right. A blue hourglass before the carrier 

name means the rate confirmation is not signed yet. A red tracking-alert icon under the BOL number means a tracking problem. 

Buttons: "+" (create shipment), Export, Sort. 

- Empty state: "No active shipments." 

- To confirm: open the load, check the pill and the log, call the carrier if needed, then press Picked up on stop 1. The load leaves the list. 

- Other options for a missed pickup: edit the pickup date (the rate confirmation returns to draft and the carrier confirms again), or remove the carrier (section 4.3). 

##### TRK-071 Confirm deliveries 

Sidebar row "Confirm deliveries" with an orange count badge (label "Confirm delivery" when the count is 1). 

- Page title: "Shipments to deliver". 

- Contents: "In transit" loads whose delivery date is earlier than now. 

- Sorted by delivery date, oldest first. The sort cannot be changed; no sort button. 

- Rows: pickup column dimmed with the actual pickup time and a green origin dot; delivery column at full strength with "Appt @ ..." when an appointment exists; carrier and cost at the right; tracking-alert icons (TRK-032). 

- Buttons: "+" and Export. 

- Empty state: "No active shipments." 

To confirm: open the load, press Delivered on the last stop, then upload the POD (TRK-080). 

##### TRK-072 Badges stay current 

Badge counts update when any shipment changes, on reconnect and on navigation, not at midnight until the next refresh (NTF-002). 

##### TRK-073 Bulk and quick actions 

There is no bulk "Picked up" or "Delivered"; each load is confirmed from its own page. 

##### TRK-074 Export 

The Export button on both queues downloads the loads in the current list as a spreadsheet file (SHP-013). 

### Proof of delivery (POD) 

###### TRK-080 

##### Upload POD 

A POD is the signed bill of lading. On the last stop of a delivered load, brokers see: 

- Upload POD (blue outlined) when no POD exists, or an orange Upload POD when the customer requires a POD for this type of load. 

- Upload another POD when one already exists in upload mode. 

- View POD with a small document icon (tooltip "POD uploaded ") when a POD exists. 

The sampled POD input accepts PDF, JPEG, BMP, AVIF, GIF, PNG, TIFF, WebP, HEIC and HEIF, with multiple=false and HTML required=false (Deep3 E-147). These are browser input hints, not server acceptance/size rules. The former 25 MB limit has no source proof and is removed. The same upload is available from the Documents page, the carrier bill page and the customer invoice page (section 6 Documents). Several PODs can be added. A user with permission can remove a POD from the Documents page.

###### TRK-081 

##### "POD is required" banner 

A white banner with an orange outline and a pulsing orange warning triangle shows at the top of the shipment page, with the bold text "POD is required " and an orange Upload POD button. It shows only when all are true: the user is a broker, the load is delivered, the customer requires a POD for this type of load, the invoice is not completed, and no POD exists for the last carrier's load. It disappears when a POD is uploaded. 

##### TRK-082 POD requirement per customer 

On each customer (section 4.7, Accounting) two switches decide whether a POD is required: "TL POD required" for truckload and "LTL POD required" for LTL. The inspected customer had LTL unchecked and TL checked (main §12.4; Deep4 E-167). These are per-customer observations, not universal defaults; both-off for newly created customers is unverified.

##### TRK-083 What a required POD blocks 

- On the customer invoice page, a yellow box "POD required before you can send invoice" with an Upload POD button shows, and Send invoice is disabled until a POD is uploaded (section 4.5). 

- Before pickup, the invoice page shows a grey box "Invoice can't be sent until the shipment has been picked up." and Send is disabled. 

##### TRK-084 POD on the invoice e-mail 

**Unverified output:** Main §§12.4/17.5 say the Combine PDFs checkbox exists but actual files, ordering and recipients were not tested. The separate-attachment behavior below is a proposal, not verified output; neither merging nor separate delivery is established.


When the customer setting "Combine PDFs (bill and POD)" is on, the POD file(s) are attached to the invoice e- mail next to the invoice PDF, not merged (CUS-015, DOC-012, EML-030). 

##### TRK-085 POD in billing lists 

- The Bills and Invoices page has a tab "POD" ("Upload missing POD") listing delivered loads whose customer requires a POD, where no POD is on file and the invoice has not been sent. 

- A delivered load with no POD shows an orange question icon with the tooltip "Missing POD" in the billing list (broker users only); with a POD it shows a check "Delivery confirmed". 

- On the carrier bill, the bill card shows Upload POD until a POD is on file for that carrier's load. 

###### TRK-086 

##### Missing POD and carrier bill approval 

A missing POD does not block approving the carrier bill for payment; the bill card only shows Upload POD (TRK-085; WF-019). 

### LTL loads 

##### TRK-090 PRO number (LTL) 

On an LTL load the Locations header shows "PRO" with a grey "+ add number". Broker users click it, type the number and press Enter or click away to save; a spinner shows while saving and a red message on failure. 

Customers see the PRO number but cannot edit it; it is hidden when empty. It can also be entered in the tracking window. 

##### TRK-091 Track button (LTL) 

A blue outlined Track button with an external-link icon opens the LTL carrier's own tracking page in a new tab, using the PRO number, the carrier pickup number or the BOL number, whichever the carrier needs. Available for the LTL carriers 10-4 uses (section 4.6). It shows once the pickup request was sent to the carrier and, for customers, once the load is picked up. It turns grey after delivery. 

##### TRK-092 LTL events 

The LTL carrier's pickup request number shows as "PICKUP " on stop 1. 

- Events reported by the carrier (for example "assigned to a driver for pickup on ...", picked up, delivered) appear in the log as automatic events. A broker confirms Picked up and Delivered by hand when the carrier's information is late or missing. 

- The destination date shows "~" until delivery (TRK-003). 

- No ETA, In or Out rows. 

### What customers see 

##### TRK-095 Customer and contact view 

Customers see tracking through the shipment page in their portal and through the secure link in the BOL e- mail (section 4.11); there is no separate tracking page. The page shows: 

- a green banner "Shipment scheduled", or "Shipment delivered" after delivery; 

- every stop card with its dates, times, ETA, arrival, pickup and delivery times; 

- the planned route map; 

- View POD once delivered and a POD exists; otherwise BOL and Labels. 

Customers never see the driver strip, tracking pill, Trucker Tools link, private notes, prices, costs or the carrier's contact details. If the account hides carrier names from customers, the carrier name is hidden too. 

##### TRK-096 Tracking link for the driver 

The text message to the driver comes from Trucker Tools, not the system (section 5). 

### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

|Action|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|See stop cards and times|Yes|Yes|Yes(without<br>private data)|Only on the rate<br>confirmation page|
|Add or change appointments,ETA,In,Out,Picked<br>up,Delivered,updates|Yes|Yes|No|No|


|Action|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|Edit driver details and PICKUP number|Yes|Yes|No|Enters driver details when<br>signing|
|Switch tracking on or off|Yes|Yes|No|No|
|Upload,view POD|Yes|Yes|View only|No|
|Edit or delete an event|Yes|Yes|No|No|
|Work the queues|Yes|Yes|No|No|


## 4.5 Billing and payments

**Evidence review — partial:** Main §17, Deep3 E-145–160 and main §§12.4–6/19.4 establish accounting screens, fields and existing sample states, not successful submissions or reconciliation. Payment methods are record-entry labels, not payment integrations or proof of funds movement. All permission matrices remain proposals.

| Requirements reviewed | Supported evidence | Proposed / unverified detail |
| --- | --- | --- |
| BIL-001–009 | Twelve accounting tabs, separate payable/receivable sides, filters, record-payment entry, mixed Due/Need to approve/Paid/Canceled and empty queues (§17.3/Deep3) | Exact tab eligibility/order/count/sort/refresh/paging, default/fallback routes, bulk send and role restrictions. Invoices to Factor exists. |
| BIL-010–017, BIL-033–034 | Bill/POD files and edit toggle; number, payment address/contact, amount, date/terms/due date; sample Dec2→Jan1 is 30 days (§17.4/Deep3 E-156) | Requiredness, 0–120 bounds, all address/factoring/contact dialogs, date coupling/precedence and save/history effects |
| BIL-018–023, BIL-028–030, BIL-035–037 | Expected bill, balance, In dispute and Approve to pay controls; separate vendor Push bills preference (§§12.7/17.4) | Variance/button algorithm, billed-versus-expected balance basis, approval/POD gates, undo, rights, one-bill cardinality, TONU, late/repeated bill numbers and sync side effects |
| BIL-024–027, PAY-007–013 | Provider payment form (ACH preselected); invoice payment form (method blank); existing paid bill/Open payment/Delete payment with check/imported and zero balance (E-150/157/160) | Date/amount/memo limits, allocation, overpay/reversal, effects on app/external balances, idempotency and history. Deletion control does not prove safe reversal. |
| BIL-031–032, INV-021, PAY-024–025 | Oct26 QuickBooks connected/mapped versus Oct23 disconnected; historical pushed events (§17.6) | Every sync trigger/direction/name match/payload/retry/deduplication/payment mapping and reconciliation; connected is not passed integration testing |
| INV-001–011 | Invoice page, file/viewer/regenerate/remove/send/dispute/payment controls, balance 4900; existing queue states (§17.5/Deep3) | Automatic booking-time creation, numbering/line copying, cancel/recreate, PDF refresh/watermark, view-side effects, bulk 50 cap and transactional sends |
| INV-012–020, INV-023–025 | Send entry, customer billing/terms/POD/Combine PDFs preferences, statement entry (§§12.4/17.5) | Full send/share dialogs, recipients/attachments, POD/pickup gates, date/message bounds, post-send edits, customer changes, token expiry and accounting effects |
| INV-022, PAY-001–006 | Distinct global Customer/Amount/Payment date/Reference/Method form, Select all invoices/Due date and No unpaid invoices found; Apply disabled (E-153–154) | Draft/sent inclusion, all-invoice coverage/order, allocation order, advances/credits, partial/excess payment, duplicate protection, requiredness and result states |
| PAY-014–023, PAY-026–027 | Customer aging summaries, invoice/payment tabs, statement/CSV/send/payment controls; credit-limit dialog and dispute switches (§§12.4–5/17) | Aging/balance/dispute formulas, CSV schemas, statement filters/cache/output, actual sends, financial rights, policy and enforcement |
| PAY-028–031 | The main source does not establish this separate Late invoices board's workflow | Entire board/ranking/filter/sort/export/permissions are proposed additions pending evidence and scope approval |

**Allocation discrepancy retained:** Deep3 E-153–154 reports no unpaid invoices after selecting a displayed customer name matching an invoice with balance 4900. Identity, payer and draft/sent/ledger inclusion were not resolved (OQ-38). Do not infer payment or implement “all draft and sent invoices” from this observation.

**Payment requiredness:** Invoice-level visible amount/method inputs carry required attributes; the global form initially does not, except Customer. Both are HTML observations, not a backend validation contract (OQ-39).


In short: This part of the system is where 10-4's back office pays carriers and gets paid by customers. It has one work area, "Bills & Invoices", with a tab for each job (upload a carrier bill, approve it, pay it, send a customer invoice, chase a missing POD, follow up on late or disputed invoices). A separate "Late invoices" board ranks all customers by their late balance. From there staff open a carrier bill page (money owed to a carrier) or a customer invoice page (money owed by a customer), record payments, and keep QuickBooks in step. Office staff (Owners and Members) use it; customers and carriers never see these screens. 

##### Requirement ID prefixes: 

BIL – the Bills & Invoices work area (bill side) and the carrier bill page. 

- INV – the invoice side of the work area and the customer invoice page. 

- PAY – payments, payment lists, the customer Invoices page, statements, aging, the Late invoices board, credit figures and disputes. 

### Bills & Invoices (work area) 

Reached from: the "Bills & Invoices" item in the left menu (office staff only). 

What it shows: one table, one row per load: the BOL number, the load's carrier bill card(s), then the load's customer invoice card. A thin line joins each bill card to the invoice card. The tabs are work lists: they show only the loads that need a given job done. 

###### BIL-001 

##### Open the work area 

The system will open the work area on the "Open" tab when the user clicks "Bills & Invoices" in the left menu. The page title is "Bills & Invoices". A small loading icon shows next to the title while the list refreshes. 

Any unknown address or tab name opens the "Open" tab; it never shows an error page. 

- The "All" tab is reached from its tab; the left-menu link does not need to point to it. 

- The tab bar, sort icon, filter box and the two header buttons always appear in the same places. 

##### BIL-002 Tabs of the work area 

Three groups: the first has "All" and "Open"; the second is for bills (carrier side); the third for invoices (customer side). A tab lists only matching loads; search words and filter chips stay when the user changes tab, but the sort goes back to the tab's default. 

|Group|Tab(short<br>label)|Full name(screen<br>readers,page title)|Which loads are listed|
|---|---|---|---|
|Both|"All"|"Bills&Invoices"|Every load that is Scheduled,In transit,Delivered or Canceled.<br>Nothing is highlighted:both columns are bright.|
|Both|"Open"|"Open bills&<br>invoices"|Loads that still have an unpaid carrier bill,or a customer invoice that<br>is a draft or open.Both columns bright.|
|Bills|"Upload"|"Bills to Upload"|Delivered loads where a carrier(or other vendor)bill has no bill<br>number yet.|
|Bills|"Approve"|"Bills to Approve"|Unpaid bills that have a bill number and are not yet approved.|
|Bills|"Pay"|"Bills to Pay"|Unpaid bills that are approved(due or not).|
|Bills|"Overdue"|"Overdue Bills"|Unpaid bills that have a bill number and a due date before today,<br>approved or not.The count is shown in orange.The tab is hidden<br>when its count is0.|
|Invoices|"POD"|"Upload missing<br>POD"|Delivered loads whose customer requires a POD,where no POD is<br>on file and the invoice has not been sent.|
|Invoices|"Send"|"Invoices to Send"|Loads that have been picked up(In transit or Delivered)with an<br>invoice not yet sent,and where the POD rule is met(the customer<br>does not require a POD,or a POD is on file).|
|Invoices|"Factor"|"Invoices to Factor"|Observed empty factoring queue; eligibility and workflow unverified.|
|Invoices|"Outstanding"|"Outstanding<br>Invoices"|Invoices that were sent and are not fully paid (proposed eligibility).|
|Invoices|"Disputed"|"Disputed Invoices"|Loads whose invoice is marked"In dispute".|
|Invoices|"Overdue"|"Overdue Invoices"|Sent,unpaid invoices whose due date is before today.The count is<br>shown in orange.The tab is hidden when its count is0.|


The observed workspace has an “Invoices to Factor” tab, which settled to “No bills or invoices yet” (main §17.3; Deep3 E-152). Accounting settings separately say Not factoring. This does not establish that 10-4 never factors outside the app or approve omission from the clone.

On a bill tab the invoice column is dimmed; on an invoice tab the bill column is dimmed. Hovering or focusing a dimmed card makes it bright. 

A bill of a carrier dropped from the load is not listed or counted (BIL-029). 

Canceled loads appear only in "All" and where a bill or invoice is still unpaid. 

##### BIL-003 Tab counts 

The system will always show a number on each tab that has a count: "Upload", "Approve", "Pay", "Overdue" (bills), "POD", "Send", "Outstanding", "Overdue" (invoices). "All", "Open" and "Disputed" show no number; neither does a count of 0. Counts update without a page reload when anything changes the lists (bill saved, invoice sent, payment recorded, dispute marked) and follow the active search and filters. 

##### BIL-004 Rows of the work area 

|Part|Content|
|---|---|
|BOL cell|The BOL number as a link to the shipment page.Under it a small arrow and a date("Mon d";the year is added<br>in small type when it is not the current year).The arrow is green when the load is delivered,gray otherwise.<br>The date is the delivery date if delivered,otherwise the planned delivery date.Tooltip: "Delivered on"or"Will<br>deliver on"plus the date.|
|Bill|One card per carrier or vendor bill on the load.A load with a replaced carrier shows two stacked bill cards.A|
|column|load with no carrier yet shows a gray empty block.Each card links to the carrier bill page(BIL-010).|
|Invoice<br>column|One card for the load's customer invoice,linking to the customer invoice page(INV-006).|


##### BIL-005 Bill card 

The card shows a message (sometimes a second line) on the left, and the carrier name with the bill amount on the right. For a non-carrier vendor (towing, lumper and similar) the vendor's name and a small vendor-type icon are shown instead. The amount is the expected cost of that carrier or vendor on the load (the sum of its cost lines). The first matching rule decides message and color. 

|#|When|Look|Message|
|---|---|---|---|
|1|The load is canceled|Dashed<br>gray|"Canceled"|
|2|The bill is paid|Green|"Paid"|
|3|The customer requires a POD for this type of load(TL or LTL),<br>this is the current carrier,and no POD is on file for this carrier|Orange|"Upload POD"|
|4|The load is delivered and the bill has no bill number|Orange|"Upload bill"|
|5|Delivered,has a bill number,not approved|Orange|"Need to approve",and a second line<br>"Due…"if a due date is set|
|6|Delivered,approved,due date today or later|Gray|The due text|
|7|Delivered,approved,due date before today|Red|The due text|
|8|The load is Scheduled|Dashed<br>gray|"Scheduled"|
|9|The load is In transit|Dashed<br>gray|"In transit"|
|10|Anything else|Dashed<br>gray|The load status in capitals-and-<br>lowercase|


- Due text: "Due yesterday", "Due today", "Due tomorrow", "Due in N days", "Due N days ago" (counted by calendar date). 

- A POD on file but not tied to a carrier counts for the current carrier. For a replaced carrier, the POD must belong to that carrier. 

Hovering a card shows a blue ring. 

##### BIL-006 Filter, search and sort 

The system will show the same filter box as the shipment list (section 4.2): search words, a "View shipment filters" button and filter chips. Here the Status choices are only "Scheduled", "In transit", "Delivered" and "Canceled". No filter is set when the page first opens. A sort icon opens a menu: 

|Choice|Notes|
|---|---|
|"Pickup date/old to new"|Default.The oldest pickups are on top,so the oldest unpaid work comes first.|
|"Pickup date/new to old"||
|"Created date/new to old"||


##### BIL-007 Loading more rows and empty state 

The system will load the list in pages as the user scrolls, with the total available for the counts. Scroll position is remembered per tab and reset when the filters change. With no rows the page shows a gray block with "No bills or invoices yet". On narrow screens the BOL column is hidden and the payment button reads "+ Payments". 

##### BIL-008 Header buttons 

The header row shows "BOL", "Carrier bills", "Customer invoices". At its right end: 

- "+ Record customer payment" (gray outline; "+ Payments" on narrow screens). Opens the payment form in PAY-001. Hidden for non-Owners when the account restricts accounting actions to Owners (BIL-035). 

- "Send invoices" (blue), only on the "Send" tab. Opens the bulk send window (INV-004). Disabled when the "Send" count is 0. 

###### BIL-009 

##### Live refresh 

While the work area is open, the system will refresh the list and counts automatically when a document is added or removed, a tracking event is added, a bill is saved or approved, a payment is added or removed, an invoice is sent or changed, or a dispute is marked or cleared. The "Open", "All" and "POD" tabs refresh for any of these. See section 4.12. 

### Carrier bill page 

Purpose: for one carrier (or other vendor) on one load: upload the bill, record its number, amount, dates, remit-to address and accounting contact, compare it with the expected cost, approve it for payment, record payments, mark a dispute, upload the POD, and see the QuickBooks sync state. 

Reached from: a bill card in the table; the "Carrier bill" tab on the invoice page; the carrier bill tile on the shipment's documents page; the bill link on the shipment page. The close button (X) returns to the page the user came from, otherwise to the shipment. 

Look: a full-screen dark document view with the close button and a search button at the top. A left column holds the documents; a right column (fixed while scrolling) holds the numbers and actions. 

##### BIL-010 Bill page layout and header 

The left column shows, top to bottom: 

1. A tab bar: one tab per bill on the load, named " bill" (for example "Carrier bill"), with the carrier's name (a link to the carrier) under it. On the right, a tab "Invoice" with the customer's name under it, linking to the invoice page. 

2. A shipment header: "BOL ", equipment (for example "Dry Van"), "PRO " if there is one, origin and destination with city, state, pickup and delivery dates, and a two-dot progress line that turns green when picked up and delivered. 

3. A strip "Target cost | Profit | Price" with an "Expand itemized view" button that opens the load's Cost & Price lines for this carrier. Office staff can change cost lines there and press "Save cost & price"; the expected bill amount follows the cost lines (section 4.2). 

4. The bill document(s) (BIL-011). 

5. The POD document(s) (BIL-027). While loading it shows a spinner and "Loading bill". If the bill cannot be found it shows a "not found" page. 

##### BIL-011 Bill documents and "Upload bill" 

The system will show each uploaded bill PDF in a viewer with the file name, a download button and a remove button (with a confirmation). With no bill PDF the page shows a dark box with a button "Upload bill" (blue outline), which turns orange when a bill number has been saved but the PDF is missing. The button opens the edit page (BIL-012). 

###### BIL-012 

##### Edit bill page 

The system will open the "Edit bill" page for users who may edit bills (BIL-035); others see the "not found" page. Left: the title "Edit bill", the carrier (or vendor) name, "BOL ", origin and destination with dates, and the bill document area. With no bill PDF the whole left area is a drop zone with a button "Upload bill" and the text "Drag bill here". Existing PDFs are shown with a remove control and an "Upload bill" button below. After a failed save the "Upload bill" button turns orange when the PDF is missing. Right: a back arrow ("close bill edit") and the form: 

|#|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|---|
|1|"Bill/invoice<br>number"|Text,up to100characters|Yes|Saved bill number|"Bill/invoice number is<br>required".If the load has a<br>PRO number,a gray strip<br>"PRO"under the field fills<br>the field when clicked.|
|2|"Mail<br>payment to"|A button showing the<br>address,or the placeholder<br>"Add payment address";<br>opens the address window<br>(BIL-013)|Yes|The bill's saved<br>address,else the<br>carrier's saved payment<br>address|"Payment address is<br>required"|


|#|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|---|
|3|"Carrier<br>accounting<br>contact"|A button showing name,e-<br>mail and phone,or the<br>placeholder"Add payment<br>contact";opens the contact<br>window(BIL-014)|Yes|The bill's saved contact,<br>else the carrier's saved<br>payment contact,else<br>the carrier contact from<br>the load|"Payment contact is<br>required"|
|4|"Bill amount"|Money,right aligned,<br>placeholder"$0.00"|Yes|Saved bill amount|"Bill amount is required".If<br>an expected amount exists,a<br>strip"Expecting $X"under<br>the field copies it into the<br>field when clicked.|
|5|"Bill date"|Date|Yes|Today|"Bill date is required"|
|6|"Days to pay"|Number0–120|—|Computed from the due<br>date|Not saved on its own;it only<br>moves the due date.Outside<br>the range: "Days to pay must<br>be between0and120".|
|7|"Due date"|Date;cannot be before the<br>bill date|Yes|Bill date or base date<br>plus the carrier's<br>payment terms|"Due date is required"; "Due<br>date can not be before the<br>bill date"|
|8|(banner)|Orange"Due in day(s)" (N<br>counted from today;can be<br>negative)|—|Computed|Information only|
|9|Button|"Save bill" (blue,full width,<br>disabled while saving)|—|—|A failed save shows a red<br>box"Error updating bill"|


Saving returns the user to the bill page. The bill can be saved again as often as needed; every change is kept in the load's history with who and when. 

Saving is refused for a bill that is canceled or dropped ("This bill can not be changed."). 

##### BIL-013 "Mail payment to" window 

|Field|Input/options|Required|Rules|
|---|---|---|---|
|"Factoring<br>with"|Select,placeholder"Select a factor".Lists the<br>factoring companies,sorted by name,each<br>with its logo.|No|Choosing a factor fills the address<br>with that company's remit-to address;<br>city,state and ZIP are then no longer<br>required.|
|"Google<br>address<br>search"|Address search box|No|Fills the fields below|
|"Company"|Text|Yes||
|"Country"|USA,CAN,MEX or another country|Yes||
|"Street"|Text|Yes||


|Field|Input/options|Required|Rules|
|---|---|---|---|
|"Line2"|Text|No||
|City,state,ZIP|For USA,CAN and MEX:one place field that<br>fills city,state and ZIP.For other countries:<br>separate"City",state/province and"Postal<br>Code".|Yes unless a<br>factor is<br>chosen||
|Button|"Save address"|||


Carriers often ask to be paid through a factoring company; the bill is then paid to the factor's address (factoring company list: section 4.8). 

##### BIL-014 "Carrier accounting contact" window 

Three required fields: "Name:" (placeholder "Name"), "Email:" (placeholder "Email"), "Phone:" (US phone format). Button "Save contact". If incomplete: "Payment contact is required". 

###### BIL-015 

##### Bill dates and payment terms 

The system will set the bill date to today and work out the due date from the carrier's payment terms: 

- Terms come from the carrier's own payment terms ("N days from Vendor bill / Pickup / Delivery"), otherwise from the account's "Vendor payment terms" (default 30 days from the vendor bill). See sections 4.10 and 4.8. 

- "from bill" counts from the bill date; "from delivery" and "from pickup" from the load's delivery or pickup date. 

- The due date is never earlier than the bill date. 

- Changing "Bill date" moves the due date when terms count from the bill date; otherwise it recalculates "Days to pay". Changing "Days to pay" moves the due date. Changing the due date recalculates "Days to pay". 

- When terms do not count from the bill date, a note under the fields reads "Set to <delivery|pickup> + " while the due date equals the rule, or a link "Reset to day(s) from <bill date|delivery|pickup>" when it does not. Clicking the link restores both dates. 

###### BIL-016 

##### Bill header on the bill page 

The right column starts with a pencil button (opens BIL-012, only for users who may edit). Then: 

- Before a bill number exists: "Expected bill" and the expected amount. 

- After a bill number exists: "Bill " with a copy button, and an arrow that opens "Payment address:" and "Payment contact:" blocks (only when both are saved). The big amount is the expected cost. Below it "Due " if a due date is set. 

- When paid: a green banner "PAID in full on " (the date of the last payment). 

###### BIL-017 

##### Documents for users who cannot upload bills 

When a user may not edit bills, the "Upload bill" box is replaced by "Email bills to <10-4's accounting mailbox>" with a copy button (tooltip "Copy email") and a "Send email" button that opens the user's mail program. With no accounting mailbox set the text says "your accounting department". 

##### BIL-018 Variance banner 

When the bill amount from the carrier's bill differs from the expected cost, the system will show an orange banner above the buttons: 

- Title: "Variance of $X". 

- Text: "Bill of $ is $X less than expected" (carrier billed less) or "… more than expected" (carrier billed more). 

- It disappears when the amounts match. Before approving, the user can change cost lines ("Expand itemized view"), for example to add detention or lumper charges. 

##### BIL-019 Accounting instructions 

The system will show the customer's accounting instructions (a short rich-text note kept on the customer) under a small label "Accounting instructions". Owners can edit it (pencil with tooltip "Edit note", a box with placeholder "Accounting instructions...", button "Save"); an empty note shows Owners the link "+ Accounting instructions". Other users see it read-only. The same note shows on the invoice page. 

##### BIL-020 Approve to pay 

The system will show a green full-width approve button in the right column when the bill has a bill number, is not paid and has a balance above $0, the user is allowed to approve (BIL-035), and the bill is not already approved with a payment recorded. 

|Situation|Button label|
|---|---|
|Expected cost equals the bill amount|"Approve to pay"|
|The carrier billed less than expected|"Approve to short pay"|
|The carrier billed more than expected|"Approve to overpay"|
|Already approved|A green check and"Approved",and a small gray outlined button"Undo"|


- Approving needs a bill number; otherwise: "This bill can not be approved." 

- Approving moves the bill from the "Approve" tab to the "Pay" tab and starts the QuickBooks sync (BIL031). 

###### BIL-021 

##### Amount used for payment 

The source distinguishes expected cost, entered bill amount and displayed balance but does not establish which amount drives settlement, approval or the external ledger (main §17.4/6). The former claim that app payments follow expected cost while QuickBooks always receives billed amount is unverified and must not govern implementation. Accounting must approve the amount basis, variance handling, short/overpay behavior and reconciliation, then validate against a disposable bill and external ledger. Do not change cost lines merely to force a financial state without that policy.

##### BIL-022 Undo approval 

The system will let a user press "Undo" on an approved bill while no payment is recorded. The bill returns to the "Approve" tab. If a payment exists: "Remove the payments first." Undo does not change anything in QuickBooks (BIL-031). 

##### BIL-023 Approval history 

Every approval and undo is saved in the load's history with the user and the time. 

##### BIL-024 Record carrier payment 

The right column shows a white outlined button "+ Record payment" when the bill has a balance above $0 and the user may record payments (BIL-035). It opens a window: 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|"Payment date" (hint on<br>the right: "Due by<Day,<br>Mon d>"when a due date<br>exists)|Date|Yes|Today|Not before the bill date;not<br>more than90days in the future|
|"Amount"|Money|Yes|The bill's<br>balance|Cannot be more than the<br>balance: "Amount can not be<br>more than the balance of $X".<br>Cursor starts here.|
|"Method"|ACH,Apple Pay,Credit card,<br>Cash,Cash App,Check,<br>Comchek,Google Pay,PayPal,T-<br>Chek,Venmo,Wire,Zelle|Backend requiredness unverified|ACH in sampled provider form|Invoice method was blank; do not apply one universal default (Deep3 E-150/157).|
|"Memo"|Text,up to500characters|No|Empty||
|Button|"Save payment" (green,full<br>width)|||Failure shows the red box<br>"Error updating bill"|


A payment always applies to the bill being viewed, even when the same carrier has two bills on the load. A payment that brings the balance to $0 marks the bill paid (BIL-025). 

A repeated click or a retry never records the payment twice. 

###### BIL-025 

##### Payments, balance and "Paid" 

The right column lists each payment as "Payment " (with its memo) and the amount, with a trash button. Under the list, "Balance $X" shows while the bill is not paid. The bill is Paid only when at least one payment is recorded and the balance is $0 or less. A canceled load with a $0 bill is never shown as Paid. Clicking a payment row opens the payment window (PAY-010). The "+ Record payment" button and the balance row disappear when the bill is paid. 

##### BIL-026 Remove a carrier payment 

The trash button asks "Are you sure you want to remove this payment?". On confirm the payment is removed, the balance returns, and the bill goes back from Paid to its earlier state. If the payment covers several loads, the message is "Remove this payment from each shipment first." (the user removes it from the payment window). 

##### BIL-027 POD on the bill page 

The system will show the carrier's POD documents under the bill (with "Uploaded by ", file name and size, download, and a remove button with a confirmation). A sticky bottom button reads "Upload POD" (orange) when there is none, or "Upload another POD" (gray) when there is one. It is shown for freight carriers still on the load. Upload steps: section 4.4; document list: section 6. 

##### BIL-028 "In dispute" on a bill 

The system will show an "In dispute" switch in the right column. On marks this carrier bill as in dispute and shows an orange pulsing "Disputed" label; off clears it. It is separate from the mark on the customer invoice (PAY-026). A failure shows the red box "Error updating bill". 

##### BIL-029 Several bills on one load: replaced carrier and TONU 

The system will keep one bill per carrier or vendor on the load. 

- A carrier dropped from a load without a TONU has its bill canceled and no longer shown or counted. 

- A carrier dropped with a TONU amount keeps a second bill for the TONU ("Truck ordered not used"), so the load shows two bill cards, one per carrier, each paid separately; the bill page tab bar shows one tab for each. The TONU amount is also added to the customer's price on the invoice (section 4.3). 

- A dropped carrier's bill that already has a payment cannot be dropped until the payment is removed ("Remove the payments first."). 

The new carrier's bill is a normal bill, with its own number, amount, dates and approval. 

##### BIL-030 Bills for other vendors 

Every vendor added to a load (towing, lumper, other) automatically gets its own "expected" bill. These use the same page, tabs and rules as carrier bills; their cards show the vendor name and a vendor-type icon. A vendor can be set up so its bills are not sent to QuickBooks (the vendor's "Push bills" switch; section 4.8). 

##### BIL-031 QuickBooks sync of a bill 

The system will send a bill to QuickBooks as follows. 

- When a bill is approved, the system creates the bill in QuickBooks within a short time, with the carrier's bill number, bill date, due date, the carrier's billed amount, the remit-to company and address, the BOL in the memo, and the expense account chosen in Settings (section 4.10). 

- Every later save of an approved bill updates the same QuickBooks bill; it never creates a second one. Approving again after "Undo" also updates the same bill. 

- Payments recorded in the system, charge changes and "Undo" send nothing new. 

- QuickBooks matches the carrier (vendor) by name. The account setting "Remit-to company name to vendor display name" controls whether the remit-to company name is used as the vendor name. A vendor whose "Push bills" switch is off is not sent. 

- When QuickBooks reports a payment for a bill the system sent, the system marks the bill paid ("PAID in full on "; PAY-024, section 7). 

The sync never blocks the user: if QuickBooks fails, the bill stays approved and the problem is shown on the bill (BIL-032). 

##### BIL-032 QuickBooks sync icon and "Retry sync" (bill) 

A small QuickBooks icon appears on the bill page when the account has a QuickBooks connection (hidden otherwise). Its color shows the state; clicking it opens a window titled "QuickBooks sync" (hovering the title shows the sync state in plain words). 

|State|Icon<br>color|Window text|
|---|---|---|
|Not sent yet|Blue/<br>dark|"Not synced yet" / "Will sync once bill is sent"|
|Error|Red|"Trouble syncing" / "We tried syncing",the error message from QuickBooks,and a<br>collapsible"Technical details"block|
|Disconnected|Orange|"QuickBooks disconnected" / "Go to account settings and try to fix your connection with<br>QuickBooks." (link to Settings>Accounting)|
|Success|Green|"Successfully synced" / "We synced this with QuickBooks"|


- Only in the Error state the window shows a "Retry sync" link, available to users who may approve bills. A retry makes a new attempt and the icon changes when it finishes. With nothing to retry: "Nothing to retry.". A double click never makes two attempts. 

If the sync fails, the system retries automatically a few times before showing Error. 

- The icon refreshes by itself when the state changes. 

##### BIL-033 Payment terms rules (bills) 

The due date of a bill follows this order: the date typed by the user; otherwise the carrier's own payment terms; otherwise the account's "Vendor payment terms" (default 30 days from the vendor bill). Terms count from the bill date, pickup date or delivery date as set. Owners set the account terms (section 4.10) and each carrier's or vendor's own terms (section 4.8). Changing terms never changes bills already saved. 

##### BIL-034 Accounting settings this module depends on 

Settings screens: section 4.10. 

|Setting|Used for|
|---|---|
|"Sync to QuickBooks Online" (connection,expense account for bills,switch|Whether bills and invoices are sent to|
|"Sync carrier bills",service for invoices,switch"Sync customer invoices")|QuickBooks(BIL-031,INV-021)|


|Setting|Used for|
|---|---|
|"Vendor payment terms"|Default bill due date(BIL-033)|
|"Customer terms"|Default invoice due date(INV-020)|
|"Cc invoices" (list of e-mail addresses)|Copies of every invoice e-mail(INV-013)|
|Payment settings(ACH details,check payee),set up with Stackup|Payment instructions printed on invoices<br>(section6)|
|Company option(set up with Stackup,ROL-021):only Owners upload and<br>edit bills|Who can edit bills(BIL-035)|
|Company option(set up with Stackup,ROL-021):only Owners approve,pay<br>and record payments|Who can approve,pay and record<br>payments(BIL-035)|
|Customer settings: "Days to pay", "POD req'd" (TL/LTL), "Combine PDFs<br>(bill and POD)"|Invoice due date,POD blocking,POD<br>attachments(INV-020,INV-015,INV-013)|
|Carrier/vendor:payment terms, "Push bills"|Bill due date,QuickBooks sync|


##### BIL-035 Who can edit, approve and pay 

|Action|Owner|Member|
|---|---|---|
|See the work area,bill pages,invoice pages|Yes|Yes|
|Upload/edit/save a bill,upload or remove a bill PDF|Yes|Yes,unless the account restricts bill upload to<br>Owners|
|Approve to pay,Undo,record or remove a payment,Retry sync|Yes|Yes,unless the account restricts accounting<br>actions to Owners|
|Record customer payment(all payment forms)|Yes|Same as the row above|
|Mark"In dispute",upload a POD,send or resend invoices,<br>create or cancel an invoice|Yes|Yes|
|Edit accounting instructions|Yes|No(read-only)|


When an action is not allowed the button is hidden or the system answers "Forbidden". The system enforces this on every action, not only by hiding buttons. Customers and carriers cannot open these pages. 

##### BIL-036 Extra or late carrier bill after approval or payment 

A carrier (for example an LTL carrier adding an extra charge after delivery) can send a second bill after the first was approved or paid. The system keeps one bill per carrier or vendor on a load (BIL-029), so staff handle it on that bill: 

- Staff change the cost lines (and, if the carrier re-billed, the bill number and amount) and save. The variance banner (BIL-018) shows the difference. 

- If already approved and nothing is paid, staff press "Undo" and approve again. The same QuickBooks bill is updated (BIL-031). 

- If already paid, a higher expected cost brings back an open balance, and staff record the extra payment with "+ Record payment". The bill is "Paid" again when the balance is $0. 

- Every change is saved in the load's history with the user and the time. 

##### BIL-037 Repeated carrier bill number 

**Unverified duplicate policy:** Main §17.7 explicitly lists duplicate bill numbers as an unexecuted test. The acceptance-without-warning claim below is only a proposed rule and requires accounting approval; neither permissive nor rejecting behavior was observed.


The system will accept the "Bill/invoice number" as typed (BIL-012). It does not stop or warn when the same number is used again for the same carrier on another load. 

### Bills & Invoices: invoice side 

##### INV-001 Invoice tabs and bulk actions 

The invoice-side tabs ("POD", "Send", "Outstanding", "Disputed", "Overdue") and which loads each lists are in BIL-002. On these tabs the bill column is dimmed and the invoice column bright. "Send invoices" (INV-004) appears only on the "Send" tab. "+ Record customer payment" (PAY-001) appears on every tab. 

###### INV-002 

##### Invoice tab counts 

Counts follow BIL-003. "POD", "Send", "Outstanding" and "Overdue" show a number; "Disputed" never does. The "Overdue" invoice tab is hidden at 0 and its number is orange. The "POD" tab lists delivered loads without a POD whose customer requires one (INV-015). 

##### INV-003 Invoice card 

The card sits on the right of the row. Left: a message, the invoice number, and, when in dispute, an orange line "Disputed". Right: the customer name and an amount: the unpaid balance while above $0, otherwise the invoice total. A small partial-payment icon shows when some, but not all, has been paid. The first matching rule decides message and color. 

|#|When|Look|Message|
|---|---|---|---|
|1|The load is canceled|Dashed<br>gray|"Canceled"|
|2|The invoice has been paid in full|Green|"Paid"|
|3|The customer requires a POD for this type of load and none<br>is on file|Orange|"Upload POD"|
|4|The load is delivered and the invoice is still a draft|Orange|"Send invoice"|
|5|Sent,not paid,due today or later|Gray|The due text("Due in N days", "Due<br>today", …)|
|6|Sent,not paid,due before today|Red|The due text("Due N days ago")|
|7|Anything else(for example a draft on a load still in transit)|Dashed<br>gray|"View draft invoice"|


Clicking the card opens the customer invoice page (INV-006). 

### Bulk "Send invoices" 

##### INV-004 "Send invoices" window 

The system will open a large dark window titled "Send invoices" from the "Send" tab. It shows "Loading invoices..." while loading up to 50 invoices from the "Send" tab (on failure: "Unable to send invoices."), then one card per invoice: 

|Card<br>element|Content|
|---|---|
|Heading|"BOL" (link to the shipment)|
|Check box|Checked by default.Screen-reader labels: "Select shipment invoice" / "Deselect shipment invoice".<br>Unchecked cards are faded.|
|Due lines|"Due<Day,Mon d,yyyy>"and"days to pay".N follows INV-020;the due date is today plus N days.|
|Customer|Customer name(link to the customer)and the customer's billing e-mail|
|Preview|A thumbnail of the invoice PDF,its page count and its file name("Invoice--from-.pdf")|


The footer button "Send selected invoices" is disabled when no card is checked. 

- While sending runs, the window cannot be closed by clicking outside it. A "Close" button is always available before sending starts. 

##### INV-005 Sending in bulk 

When the user presses "Send selected invoices", the system will send the checked invoices one after the other. For each it saves the invoice date (today) and due date, then sends exactly as in INV-013. A failed invoice is tried once more; if it fails again it is reported as failed and the others continue. 

- While running the window shows "Sending invoices..." and "Sent N of M". 

- When finished it shows "Invoicing finished" and one result row per invoice: customer name, "BOL ", 

- "Invoice ", a green check or red cross and, for a failure, the error in red. Each row links to the invoice. Screen-reader text: "Invoice for has been sent" or "… failed to send". 

- The "Done" button closes the window. 

- Sending the same invoice twice (for example after a network retry) never sends two e-mails. 

- If the user closes the browser during sending, every invoice is either fully sent or untouched. 

### Customer invoice page 

Purpose: view, regenerate or cancel the invoice PDF, send or resend it by e-mail, share it with other contacts, mark a dispute, record or remove customer payments, see the QuickBooks sync state, and upload the POD. 

Reached from: an invoice card in the table; the "Invoice" tab on the bill page; the "Invoice" button on the shipment page; the "Customer Invoice" tile on the documents page; invoice cards on the customer's Invoices list; result rows after a bulk send. The close button (X) returns to the page the user came from, otherwise to the shipment. 

##### INV-006 Invoice page layout 

A full-screen dark document view with two columns, like the bill page. 

- Left column: a tab bar (one " bill" tab with the carrier link for each bill, then "Invoice" with the customer name as a link); the shipment header (BOL, equipment, route, dates); the strip "Target cost | Profit | Price" with "Expand itemized view" (staff only, hidden while the load is only requested) where invoice lines are edited (section 4.2); the invoice PDF viewer (INV-009); the heading "Proof of Delivery" with each POD document when the load has any; and a sticky button "Upload POD" (orange, none on file) or "Upload another POD" (gray). 

- Right column (fixed while scrolling): "Invoice " with a copy button and the QuickBooks icon; the amount; the due line; the "PAID in full" banner when paid; the dispute switch; the "Invoice sent" card; the Send / Resend button; the Share block; accounting instructions; the payments list; "Balance"; and "+ Record customer payment". 

- While loading: "Loading invoice". 

- Customers (portal) and carriers see a read-only version (INV-024). 

##### INV-007 Invoice exists from booking; "+ Create invoice" 

The system will create a draft customer invoice automatically when a load is booked. Opening the page never creates or changes anything. If a load has no invoice (for example after cancellation), the page shows "No invoice yet", "BOL does not have an invoice." and "An invoice can be created once the shipment is booked." and a button "+ Create invoice", which creates a new draft. If creation fails: "Error creating invoice". If the load already has an invoice: "The shipment already has an invoice." A load that is only requested (not booked) cannot have an invoice. 

###### INV-008 

##### Invoice number, lines and amount 

- The source shows invoice numbers and separate extra-reference controls; initial numbering, editable overrides and synchronization with BOL/custom BOL are unverified. Confirm the invoice-number contract before implementation.

- The lines are the load's priced lines from Cost & Price (all carriers, including cancellation or TONU lines the user entered), in the same order. A line without a price is not on the invoice. 

- The total amount equals the load's customer price. When lines change (Cost & Price block), the invoice lines and total change with them, draft or sent. 

- The balance is the total minus all payments applied. 

##### INV-009 Invoice PDF viewer 

The system will show the generated invoice in a viewer with the file name "Invoice--from-.pdf", the page images, and three buttons: download, "Regenerate document" (circular arrows) and "Remove document" (trash; INV-010); the last two are staff only. While the PDF is prepared the viewer shows "Generating invoice"; when none exists yet, "Generate invoice". 

- A draft PDF has a gray "DRAFT" watermark and the line "Due by: Date will be finalized when invoice is sent". 

- A sent PDF has no watermark, shows "Invoice date" and "Due by ", and, per stop, the date and "Picked up" / "Delivered". Full layout: section 6. 

- "Regenerate document" rebuilds the PDF from the current lines and dates. The PDF is rebuilt only when the user presses it, when the invoice is sent, or when a change makes it out of date; never just because someone looks at the page. 

##### INV-010 Cancel invoice 

"Remove document" (trash) asks "Are you sure you want to cancel this invoice?". Confirming cancels the invoice and returns the user to the previous page. An invoice with payments cannot be canceled: "Remove the payments first." A canceled invoice cannot be sent or paid; the page shows the "No invoice yet" state with "+ Create invoice". 

###### INV-011 

##### Invoice header, due line and "PAID in full" 

The right column shows "Invoice " (gray label and the number with a copy button), the total, and "Due <Day, Mon d>" once a due date exists (a draft has none until sent). When at least one payment is applied and the balance is $0, a green banner reads "PAID in full on " (the date of the last payment). The "Balance" row is shown unless the invoice is canceled. 

### Sending an invoice 

##### INV-012 "Send invoice" window 

The big button is "Send invoice" (green, large) when the invoice is a draft and the load has been picked up, otherwise white outlined. After sending, the same place shows "Resend" (gray outlined). Both open the same window (600 px wide). 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|"Invoice#"|Read-only|—|The invoice<br>number||
|"To"|Read-only list of the customer's billing e-<br>mails.If the customer has none,an<br>editable e-mail field(placeholder<br>"customer email address")with the helper<br>"Saved as the customer's billing email."|Yes|Customer's<br>billing e-mails|"Add a billing email first"if none<br>is entered.Addresses entered<br>here are saved on the customer,<br>and the window says so before<br>sending.|
|"Invoice<br>date"|Date|Yes|Today,or the<br>saved invoice<br>date|Changing it moves"Due"by<br>"Days to pay".Empty: "Invoice<br>date is required"|
|"Due"|Date,not before the invoice date|Yes|Invoice date<br>plus"Days to<br>pay"|Changing it recalculates"Days<br>to pay". "Due date can not be<br>before the invoice date"|
|"Days to<br>pay"|Number0–120|Yes|See INV-020|"Days to pay must be between<br>0and120"|
|"Message"|Multi-line text,up to2000characters|No|Empty|Included in the e-mail|


|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Buttons|"Save&close"(gray outline; "Saving..."):|||A failure shows a red box|
||saves dates and terms without sending.|||"Error"with the message|
||"Send invoice"(green; "Sending..."):<br>saves and sends.||||


A yellow or gray notice shows, and "Send invoice" is disabled, while sending is blocked (INV-014, INV015). 

No factoring switch (10-4 does not factor its own invoices). 

##### INV-013 What sending does 

**Unverified send contract:** Generation timing, To/Cc/envelope behavior, one-email-per-recipient, Combine PDFs output (merged versus separate), POD/BOL inclusion, history and QuickBooks timing all require a controlled send test. Main §12.4/17.5 explicitly leaves output/recipients open. The numbered list below is a proposal, not a verified transaction.


When the user sends an invoice, the system will, as one action: 

1. Save the invoice date, due date, "Days to pay" and message. 

2. Change the invoice from Draft to open (sent). The first sending date is kept; a resend does not change it. 

3. Create a secure link for the invoice (section 4.11) and e-mail it to each of the customer's billing e-mail addresses and every address in the account's "Cc invoices" list, with the invoice PDF attached. When the customer setting "Combine PDFs (bill and POD)" is on, the customer's POD file(s) are attached as separate files next to the invoice PDF (CUS-015); nothing is merged and the bill of lading is not attached. E-mail text: section 5. 

4. Regenerate the invoice PDF in its sent form (no DRAFT watermark, real dates). 

5. Send the invoice to QuickBooks (INV-021). 

6. Add "Invoice sent" to the load's history. 

7. Move the load from the "Send" tab to "Outstanding". Pressing "Send invoice" twice for the same action, or a network retry, never sends two e-mails; a deliberate "Resend" does. 

##### INV-014 When sending is blocked 

The window shows a notice and disables "Send invoice" when: 

|Situation|Message|
|---|---|
|The load is canceled|"This invoice can not be sent."|
|The load has not been picked up yet(not In transit or Delivered)|"Invoice can't be sent until the shipment has been<br>picked up." (gray box)|
|The load is In transit or Delivered,the customer requires a POD for|"POD required before you can send invoice" (yellow|
|this type of load,and no POD is on file|box)with an"Upload POD"button|
|The invoice is canceled|"This invoice can not be sent."|


##### INV-015 POD requirement 

Each customer can require a POD before invoicing, separately for TL and LTL (customer settings, section 4.7, "POD req'd"). When it applies and no POD is on file, the invoice card says "Upload POD", the load appears on the "POD" tab and not on "Send", and the "Send invoice" window is blocked (INV-014). Uploading a POD from 

the invoice page, bill page, documents page or the window's "Upload POD" button removes the block (upload steps: section 4.4). A POD can be removed with the confirmation "Are you sure you want to remove this POD?". 

##### INV-016 "Invoice sent" card and "Resend" 

After sending, the right column shows a card with a green border, a mail-check icon and "Invoice sent", the billing e-mail address (or the italic text "no billing email on file") and "Sent ". "Send invoice" is replaced by "Resend" (INV-012). The "Send" tab no longer lists the load. 

##### INV-017 Share block 

Once the invoice has been sent and has a due date, a block shows "Share invoice" (never shared) or "Shared with and N more" with the time, and a blue outlined button "Share" that opens the share window (INV-018). A draft shows no Share block. 

##### INV-018 Share window 

Staff can send the invoice's secure link to additional customer contacts. Views: 

- List: the people it was shared with and an add button "+ Add". Empty: "Not shared with anyone yet." 

- Add: search and choose contacts of the customer, type an optional message, "Back" and "Not now". 

- New contact: "+ New contact" (button "Create contact"). 

- Detail of one person: the history of sends, opens and clicks, and a remove button. 

- Remove: removes a person from the share; the link no longer works for them. Sharing is allowed only after the invoice has been sent; otherwise: "Send the invoice first". E-mail text: section 5; secure link page: section 4.11. 

##### INV-019 Editing an invoice after it was sent 

**Unresolved customer-change contract:** The original draft conflicted: SHP-071 blocked any sent invoice, while this item blocked only invoices with payments. Main §16.9/17.5 establishes neither. Sent/unpaid versus partly/fully paid customer transfer, external accounting and document correction must be decided and tested; neither draft rule is a verified override of the other.


Staff can change the lines (Cost & Price block), the extra references, the invoice date, the due date and "Days to pay" after sending. The system will update the same invoice: lines and total change, the PDF is rebuilt, and the customer's secure link shows the latest PDF. It does not create a second invoice. To tell the customer, staff press "Resend". Payments are kept. Changing the load's customer is refused while the invoice has payments ("Remove the payments first."). 

There is no separate "void and re-issue" step in the first version (INV-025). 

##### INV-020 Invoice terms rules 

"Days to pay" (days from invoice date to due date) is taken from the first of these that is set: 

1. The value typed on the invoice or in the send window. 

2. The customer's own "Days to pay" (customer billing settings; Owners edit it). 

3. The account's "Customer terms" (section 4.10). 

4. 30 days. The due date is the invoice date plus "Days to pay". The bulk send window uses today as the invoice date. Range 0 to 120 days. Changing terms never changes invoices already sent. 

##### INV-021 QuickBooks sync of an invoice 

- When an invoice is sent (or resent), the system will send it to QuickBooks once: the customer (matched by name), invoice number, invoice date, due date, one line per invoice line, the total, the service item chosen in Settings (section 4.10), and the BOL in the memo. A resend updates the same QuickBooks invoice. 

- Line changes and payments recorded in the system send nothing new. 

- When QuickBooks reports a payment for an invoice the system sent, the system records it too and marks the invoice paid (PAY-024, section 7). 

- The QuickBooks icon and window follow BIL-032, with "Will sync once invoice is sent" in the "Not synced yet" window. "Retry sync" for invoices makes a new attempt; "Nothing to retry." if the last attempt did not fail. 

A failed sync never blocks sending; the invoice has already been e-mailed. 

##### INV-022 Payments on the invoice page 

The right column lists each payment as "Payment received " (with its memo) and the amount, with a trash button for staff ("Are you sure you want to remove this payment?"). Clicking a row opens the payment window (PAY-010). "+ Record customer payment" is shown when the balance is above $0 and the user may record payments; green and bold when the invoice is not a draft, white outlined when it is. It opens the single-invoice payment window (PAY-007). A draft invoice can be paid. 

##### INV-023 Accounting instructions on the invoice page 

Shown as on the bill page (BIL-019). 

##### INV-024 What customers see 

Customers in the portal and people who open the secure link see the invoice PDF, the POD and the payments read-only. They cannot dispute, send, record payments, regenerate or see QuickBooks. Draft invoices are hidden from customers. See section 4.11. 

##### INV-025 Void or re-issue a sent invoice 

Two paths: 

- Correct it in place (INV-019): change lines or dates, press "Regenerate document", then "Resend". The invoice keeps its number and the secure link shows the latest PDF. 

- Cancel and create a new one (INV-010, INV-007): only when the invoice has no payments. "+ Create invoice" makes a new draft, which is sent again. A separate "credit and re-bill" step is planned for later. 

### Payments 

One payment is described once here and used from several places. Customer payments are received and applied to invoices; carrier payments are made and applied to bills. A payment can be removed, and the invoice or bill returns to its earlier state. 

##### PAY-001 "+ Record customer payment" window (several invoices) 

The system will open a large window titled "Record payment" from: the header of the Bills & Invoices table, the "Record payment" button on a customer's Invoices tab and Payments tab, and the Invoices page. Opened from a customer's page, the customer is already chosen and fixed. Only users who may record payments (BIL-035) can open it. 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|"Customer"|Select,placeholder"select customer".<br>Groups: "Recent" (recently visited<br>customers,newest first)then"All".|Yes|Pre-filled when<br>opened from a<br>customer|Choosing a customer<br>loads that customer's<br>open invoices|
|"Amount"|Money,placeholder"$0.00"|Yes|Empty|Must be above $0|
|"Payment<br>date"|Date|Yes|Today|Not more than90days in<br>the future|
|"Reference<br>no."|Text,placeholder"invoice number",up to<br>100characters|No|Empty|For the customer's check<br>or transfer number|
|"Payment<br>method"|ACH,Apple Pay,Credit card,Cash,Cash<br>App,Check,Comchek,Google Pay,<br>PayPal,T-Chek,Venmo,Wire,Zelle|Yes|None|A method must be<br>chosen;the system never<br>assumes one|


Before a customer is chosen the lower panel shows "Select customer to see list of open invoices." 

##### PAY-002 Open invoices panel 

After a customer is chosen the lower white panel shows "Open invoices": 

- A search box "Find by BOL number" (screen-reader label "Find invoice by BOL number"). 

- A header row: a "select all" check box ("Select all invoices" / "Unselect all invoices"), "Invoice #", "Due date", "BOL", "From To" (hidden on narrow screens), "Price". 

- One row per open invoice (draft or sent, not paid): a check box (label "Select invoice "), the invoice 

- number in bold, the due date (M/D/YYYY), the BOL, " -> " and the balance on the right in bold. A ticked row has a blue border. 

- Sorted by due date, oldest first; no due date last; ties by delivery date. 

- All of the customer's open invoices are available (not only the first page). 

- Empty: "No unpaid invoices found for ". 

##### PAY-003 Applying a payment across invoices 

The system will apply the amount to the ticked invoices in the order they were ticked. Each receives the smaller of what is left of the payment and its balance; an invoice that would receive $0 gets nothing. Money left over stays as credit on the payment and can be applied to other invoices later (PAY-005). 

- An invoice paid in full becomes "Paid"; a partly paid one stays open with a smaller balance. 

- The window shows a "Credit" line (for example "Credit +$50.00") when part of the amount is not allocated. 

Each payment is recorded once: a double press or a network retry never records it twice. 

###### PAY-004 

##### Footer and result of the payment window 

- The submit button reads "Apply $ to selected" when invoices are ticked, "Apply $" when none is ticked, and "Apply payment" when no amount is entered. It is enabled only when the amount is above $0, a method is chosen and at least one invoice is ticked. To its right: "Selected $" (the sum of the ticked balances). 

- After success the window turns white and shows a green band with a check, "Payment applied", "$X was applied to N invoice(s)", a table with "Status", "Invoice", "Due at", "BOL", "Paid", "Balance" (one row per invoice, status "Paid", "Open" or "Late"), the line "Credit +$X" if money is left over, and a "Done" button that closes the window. 

- If the payment fails: "Failed to apply payment." An invoice that cannot take a payment (for example canceled) is reported as "Invoice can not be paid". 

##### PAY-005 Apply a credit to more invoices 

A payment with credit left can be applied again. The window opens in "credit" mode: the amount shows as a green box "+$" with a "Credit" badge; date, reference and method are shown but fixed. The user ticks open invoices and presses the apply button. With no credit left: "This payment has no credit left." Credit mode is reached from the payment window's "Apply to more invoices" button (PAY-010). 

##### PAY-006 Rules for customer payments 

Money from one customer can be applied only to that customer's invoices. 

- The window checks the customer is the invoice's owner; if the invoice moved to another customer while the window was open, the system asks the user to reload. 

- A payment may include a draft invoice (paid before it is sent). 

- Short pay: the balance stays open. Overpay: the extra stays as credit. Credit memos, write-offs and refunds are not part of the first version. 

##### PAY-007 Record payment on one invoice (invoice page) 

A smaller window (400 px) titled "Record payment" for the invoice being viewed. 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|"Payment date" (hint on the right:<br>"Due by<Day,Mon d>")|Date|Yes|Today|Not more than90days in the<br>future|
|"Amount"|Money|Yes|The invoice<br>balance|Cannot be more than the<br>balance|
|"Method"|The13methods in<br>PAY-001|Yes|None|A method must be chosen|
|"Memo"|Text,up to500<br>characters|No|Empty||


|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Button|"Save payment"|||A failure shows a red box|
|||||"Error saving payment"|


Recorded exactly like a payment from the large window with this one invoice ticked. 

##### PAY-008 Carrier payments 

Recorded on the carrier bill page (BIL-024), one bill at a time, with the amount capped at the bill's balance. They appear in the carrier's Payments tab (PAY-013). 

###### PAY-009 

##### Removing a payment from one invoice or bill 

The trash button on a payment row (invoice page or bill page) asks "Are you sure you want to remove this payment?". If the payment applies only to this invoice (or bill), the whole payment is deleted. If it covers several invoices, only this invoice's share is removed and that amount goes back to the payment as credit. Either way the invoice (or bill) returns from Paid to open and the balance is restored. If a bill payment covers several loads: "Remove this payment from each shipment first." Every removal is saved in the load's history. 

##### PAY-010 Payment window 

Clicking a payment row anywhere (invoice page, bill page, customer Payments tab, carrier Payments tab) opens a window with: a gray header with a "paid" icon, the title "Payment", and "$ was applied to invoice(s)" (or "bill(s)" for carrier payments); a table with "Status", "Invoice / Due" (or "Bill / Due"), "BOL", "Method", "Paid", "Balance", one row per load; and a line "Credit +$" when credit is left. Footer buttons, for users who may record payments: 

- "Delete payment" (red outline). Asks "Are you sure you want to remove this payment for shipment(s)?". Removes the payment and its allocations; all invoices (or bills) return to open. Failure: "Unable to remove payment." / "Error removing payment". 

- "Apply to more invoices" (green outline), only when credit is left on a customer payment. Opens credit mode (PAY-005). 

- "Done" (gray outline). 

##### PAY-011 Payments in the shipment history 

Every payment added or removed appears in the load's history ("Customer payment added", "Customer payment removed" for invoices; the carrier payment entries for bills). See section 4.2. 

###### PAY-012 

##### Customer "Payments" tab 

On a customer's page (section 4.7) the "Payments" tab lists every payment received from that customer, newest first. 

|Column|Content|
|---|---|
|"Date"|"Mon d"|


|Column|Content|
|---|---|
|"Amount"|Money|
|"Method"|A badge(for example"ACH")|
|"Reference"|Reference number or memo|
|"#of shipments"|How many loads it was applied to|
|"Credit"|"+$X Credit"when money is left over|


A button "Record payment" (outlined, plus icon) opens PAY-001 for this customer; it works even when no invoices are open (so an advance payment can be kept as credit). Clicking a row opens the payment window (PAY-010). 

##### PAY-013 Carrier and vendor "Payments" tab 

A carrier's (or vendor's) page lists payments made to it with the same columns and payment window ("bill(s)" in the text). Page: section 4.8. 

### Customer Invoices page and statements 

##### PAY-014 Invoices page 

The page "Invoices" shows one customer's open invoices (draft and sent, not paid) with their aging. Reached from the customer's "Invoices" tab and by its own address. Above the list, a strip of buttons shows one customer per button (alphabetical), limited to customers with open invoices; the active one has a blue underline. With only one customer the strip is hidden. Choosing a customer reloads the list. 

##### PAY-015 Aging bar 

A bar above the list is split into five parts, each as wide as its share of the open balance: 

|Segment|Meaning|
|---|---|
|"Current"|Open balance not yet due(blue)|
|"1-15late"|Due1–15days ago(orange)|
|"16-30late"|Due16–30days ago(red)|
|"31-60late"|Due31–60days ago(dark red)|
|"61+late"|Due61or more days ago(darkest red)|


Each segment shows its amount (bold) and label. A $0 segment is faded. Hovering for half a second shows "N invoice(s)". Days late count from the due date to today by calendar date. The bar is shown even when all amounts are $0. 

##### PAY-016 Invoice cards on the Invoices page 

One card per invoice, in this order: 61+ late, 31–60 late, 16–30 late, 1–15 late, open (not yet due), draft; inside a group by due date, oldest first. Paid invoices are not listed. 

|Card part|Content|
|---|---|
|Left|"BOL" (bold link); "Delivery confirmed"check(tooltip)when a POD is on file,or an orange question icon<br>"Missing POD" (staff only);origin"City,ST" –green line–destination"City,ST"|
|Middle(wide<br>screens)|Customer name(hidden on the customer's own tab);carrier name(s),the first plus"+N"|
|Right|An icon(partial-payment icon when some was paid); "Invoice"and the invoice date("Mon d,yyyy");the<br>balance in bold; "Due<Mon d,yyyy>"with a word: "Open" (gray), "Late" (orange,red,dark red or darkest<br>by how late),or"Draft" (gray).Hovering the due date shows a relative text("in3days", "2months ago").|
|Edge|A red bar on the right edge when the invoice is in dispute|


Clicking a card opens the invoice page (INV-006). 

Loading: "Loading invoices...". Error: "An error occurred while loading invoices". Empty: "No invoices". 

##### PAY-017 Footer totals 

A bar under the list shows three totals: "Not Invoiced" (tooltip "N shipment(s)": draft invoices), "Open" (tooltip "N invoice(s)": sent and unpaid) and "Late" (red label, tooltip "N invoice(s)": sent, unpaid, past due). A $0 total is faded. On the right: the buttons "Download statement" and "Download CSV". 

##### PAY-018 "Download CSV" 

Disabled when the list is empty. Downloads "-open-invoices.csv", one row per listed invoice, with these columns: 

Column Customer Customer Invoice Number PO Number (the first PO reference on the origin or destination) BOL Origin City, Origin State, Origin Postal Code Destination City, Destination State, Destination Postal Code Carrier Name Customer Invoice Total Customer Invoice Balance Due Customer Invoice Due Date (yyyy-mm-dd) 

###### Column 

Customer Invoice Date (yyyy-mm-dd) Aging (Open, Late 15, Late 30, Late 60, Late 61+, or Draft) Customer Invoice In Dispute ("YES" or empty) 

##### PAY-019 "Download statement" 

Creates a PDF statement of the customer's sent, unpaid invoices and balances, downloaded as "Statement-.pdf". It always reflects today's balances: an old statement is reused only when nothing changed since it was created. A spinner shows while it is prepared. Layout: section 6. 

###### PAY-020 

##### Send statement (customer page) 

On the customer's "Invoices" tab a "Statement" card shows "Send billing contact an email with attached statement PDF." and a blue button "Send statement", shown only when the customer has open invoices. With no billing e-mail the card shows a dashed box "Add a billing email address to send a statement email." instead. The button opens a small window with a mail icon, "Email statement", "Send an email with statement to ", and buttons "Not now" and "Send email". Sending e-mails the statement PDF, saves who sent it and when, and shows "Statement email sent". On failure: "Something failed while sending the statement email." The card shows "Last sent by ". E-mail: section 5. 

###### PAY-021 

##### Customer "Invoices" tab 

On the customer's page (section 4.7) the "Invoices" tab shows the same aging bar, invoice cards (customer column hidden), footer totals with "Download CSV", and the "Statement" card (PAY-020). A "Record payment" button (outlined, plus icon) at the top left opens PAY-001 for this customer; shown only when the customer has open invoices and the user may record payments. 

### Credit, aging and disputes 

##### PAY-022 Customer credit figures 

**UI-described rule differs from the original arithmetic:** Main §19.3 says Enforce credit limits blocks bookings when open invoice balances plus active shipments exceed the limit. It does not establish that draft invoice balances are equivalent to active shipment valuation. Equality, disputes, unbilled work, partial payments, credits, concurrency and override rights remain open. Disabled was a dated setting observation, not an approved go-live value (SC-08; OQ-23).


The system will calculate these figures per customer from its invoices. They appear in the footer of the Invoices page and in the credit window on the customer page (section 4.7). 

|Figure|How it is calculated|
|---|---|
|"Not invoiced"|The balance of invoices not yet sent(drafts)|
|"Open"|The balance of sent,unpaid invoices|
|"Current"|"Open"minus the amounts that are late|
|"1-15late", "16-30late", "31-60late",|Balance of sent,unpaid invoices that are1–15, 16–30, 31–60, 61or more days|
|"61+late"|past their due date|
|"Late"|The sum of the four late buckets|


|Figure|How it is calculated|
|---|---|
|"Unpaid"|"Not invoiced"plus"Open"|
|"Available credit"|The customer's credit limit(0if none)minus"Unpaid".It can be negative.|
|Credit from payments|Payments with money left unapplied(PAY-003)|


The credit limit and credit note are edited on the customer page (section 4.7). The figures are always shown. They stop a booking only when an Owner turns on the setting "Enforce credit limits" (section 4.10, SET-020). That setting is proposed Off at launch, approval pending, so at first the figures are for information.

##### PAY-023 Money display rules 

Amounts are shown in US dollars with cents on cards and totals. Dates on cards and statements use "Mon d, yyyy". Sums are exact to the cent; a row total always equals the sum of its parts. 

##### PAY-024 Paid status from QuickBooks 

**No reconciled payment test:** Main §17.6/Deep3 E-160 records configuration and one check/imported payment, without establishing its source. Automatic paid mapping, method ACH, timing and duplicate suppression below remain proposed; a method must not be invented from a provider label.


When QuickBooks reports a payment for an invoice or a bill the system sent, the system will mark the matching invoice or bill paid ("PAID in full on "), as if the payment had been recorded by hand. 

- The payment is recorded once: a repeated report changes nothing. 

- It is shown as "QuickBooks payment" with the method ACH. 

- This works once the QuickBooks connection is set up (section 7). Staff can still record payments by hand (BIL-024, PAY-001). 

##### PAY-025 Duplicate and retry protection 

Recording a customer payment, a carrier payment or a booking never creates a duplicate when a request is repeated because of a slow or lost network response. 

###### PAY-026 

##### Disputes 

Invoices and carrier bills can each be marked "In dispute" with a switch ("In dispute", then an orange pulsing "Disputed" label while on). 

- The invoice switch is on the customer invoice page. A disputed invoice shows "Disputed" on its card, appears in the "Disputed" tab, and has a red bar on the customer's Invoices list. A failure shows a red box "Error updating invoice". 

- The bill switch is on the carrier bill page (BIL-028). It does not change the invoice and does not use the "Disputed" tab. 

- Any office user may mark or clear a dispute; it is saved in the load's history ("Invoice disputed", "Invoice undisputed"). 

- A paid or open invoice can be disputed; a canceled one cannot. 

##### PAY-027 Who can do what in payments 

See BIL-035. Customer payments, carrier payments, deletions and Retry sync need the "pay" right (Owner, or Members when the account does not restrict accounting actions). Sending invoices, creating and canceling invoices, disputes and POD uploads are open to every office user, as are downloading and e-mailing statements. 

### Late invoices board 

Reached from: the "Late invoices" link on the Customers page (CUS-055), which shows the number of customers with late invoices. Breadcrumb: "Customers / Late invoices". Every Owner and Member can open it; customers and carriers cannot. 

###### PAY-028 

##### Late invoices board: page and header 

The page shows every customer with a late balance (a sent, unpaid invoice past its due date), ranked by how much is late. Title "Late invoices". Under it, " customers" on the left and the total late balance on the right (it follows the rep filter, PAY-030). 

- While customers load and no row is shown yet, a loading icon shows. With no late customer: "No customers with late invoice balances". 

- If the data cannot be loaded the page shows an error message instead of the list. 

##### PAY-029 Customer rows 

One card per customer, in the chosen order (PAY-030). Clicking a card opens that customer's Invoices tab (section 4.7). 

|Part|Content|
|---|---|
|Rep|Avatar of the customer's primary rep,or of the team when the primary assignee is a team|
|Customer|Customer name in bold|
|Four aging<br>buckets|Late balance in"1-15late", "16-30late", "31-60late"and"61+late" (days as PAY-015).A $0bucket is left<br>empty.A bucket with an amount is tinted orange or red and,on hover,shows its label.The bucket the list is<br>sorted by is in solid color.|
|Total|The customer's total late balance in whole dollars,with a small invoice icon colored by the worst bucket<br>that has an amount(61+late darkest,then31-60, 16-30, 1-15)|


##### PAY-030 Sort and rep filter 

- Sort (icon, tooltip "Sort"): "Total late balance" (default, largest first), "61+ days late", "31-60 days late", "16-30 days late", "1-15 days late" (each largest first), "Customer name" (A to Z) and, when the account has more than one rep, "Primary rep". 

- Rep filter: a selector "All reps" with the avatar of the chosen rep or team. It lists each rep or team that is the primary rep of a customer with a late balance, alphabetical, and is shown only when there is more than one. Choosing a rep shows only that rep's customers, and the total changes with it. 

The chosen sort and rep stay while the user is signed in on this browser. There is no search and no paging. 

##### PAY-031 Download the board 

The download icon (tooltip "Download") saves "customers-aging.csv" with one row per customer shown, in the current order and filter. Columns: "Customer", "Rep", "Days Late 1-15", "Days Late 16-30", "Days Late 3160", "Days Late 61+" and "Late Total". Disabled when no customer is listed. 

### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

|Area|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|Bills&Invoices work area|Yes|Yes|No|No|
|Upload and edit bills|Yes|Yes(unless restricted)|No|No|
|Approve to pay,record payments|Yes|Yes(unless restricted)|No|No|
|Send,resend,share,cancel invoices|Yes|Yes|No|No|
|Mark disputes|Yes|Yes|No|No|
|Edit accounting instructions|Yes|Read-only|No|No|
|Download statement,send statement,CSV|Yes|Yes|No|No|
|Late invoices board and its download|Yes|Yes|No|No|
|See own invoices(read-only,sent invoices only)|—|—|Yes|No|
|See accounting settings(section4.10)|Edit|Read-only|No|No|


## 4.6 LTL quoting

**Evidence review — partial:** Main §14/15.5a, Deep1 E-115–123 and settings §§12.5/19.3 establish fields, catalogs, unsaved calculations, existing results/errors, sharing controls and existing shipment navigation. No fresh Get quotes, Save price/manual quote, Share, Copy link, booking, dispatch or account-authorization action was tested.

| Requirements reviewed | Source-supported portion | Proposed / unverified detail |
| --- | --- | --- |
| LTL-001–009 | Blank form, equipment branch, date/location/service controls, duplicate/customer shortcut entry | Submission/no-customer contract, no-account gate, duplicate field copying, 31-day/holiday policy, trade-show autofill and address inheritance |
| LTL-010–012, LTL-019–020 | 27 packaging choices, 18 classes, in/cm/lb/kg controls, second item, length estimate, 70 equipment branches; dated math | Universal conversion, dimension/stop limits, density-estimation algorithm, 96-inch packing/stacking policy, volume threshold and TL manual/portal rules |
| LTL-021–030, LTL-039–042 | Existing offer/service/tier views, inline stacked offers, sort controls, booked/past-date banners, six historical carrier errors | Live fan-out/finality/one-minute duration, exact grouping/tie rules, duplicate suppression, Book enforcement and complete state/banner/error catalog |
| LTL-031–038 | Cost/price/profit/margin arithmetic, settings fields and differing input locks | Clamp/precedence, 25% universal default, save-on-blur, 4-decimal universal precision, price maximum, Owner exemption and guardrails |
| LTL-050–058 | Unsaved LTL manual fields, cost100/price125→profit25/margin20%/Cost+25%, discard/reopen reset; carrier-specific cost details | Full TL manual schema/required carrier, field/count/expiry limits, saved visibility, manual booking exclusion, replacement/deletion/repricing and persistence |
| LTL-060–071 | Sharing audience/Not sent, Stop sharing/Add contact/Email quotes/view-only Copy link; duplicate/+Ref entries | Recipients, sent output, expiry/revocation, copy-to-share effect, access, saves, request state machine and cancel/restore effects |
| LTL-072–084 | Existing booked-request→shipment navigation, Auto dispatched label, independent TL coverage entries | Whole new-booking form contract, lane/service locks, creation/dispatch payload/state/retries/cancel and draft/finish-booking effects |
| LTL-090–096 | Quote history rows, Customer/Rep/search/unmatched state and booked link | 16-row paging, complete search/sort/storage/glyph/queue rules, portal access and dashboard counts |
| LTL-100–117 | 17 carrier cards/display count12/Test quote entry; Global/LTL carrier margin fields and mode-specific Hide carrier names help (§§18/19) | Activation legend/timing, account/credential/edit/add flows, write-only guarantees, blanket exceptions, test isolation, autosave/undo and role rights |

**Separate credit systems:** Insufficient XN credit is a historical network-offer message, distinct from customer credit settings. Its semantics/override remain open (OQ-23). Neither is a settled clone launch policy.


In short: Staff enter a lane and freight on the "Get quotes" form and the system asks each of 10-4's own LTL carrier accounts for a rate. The results page shows every rate, lets staff set the customer price, share the quotes with the customer and book one. Booking creates the shipment and sends the pickup request to the carrier automatically. Owners connect and manage the carrier accounts on the "Carrier integrations" screen. Customers can run the same quotes themselves in the customer portal (see section 4.11). 

**Rate sources and carrier inventory — corrected:** Current-app results include both carrier and Xtended Network offers; the backend network supplier and routing are unverified (main §14.7/Deep1). The proposed clone may use approved direct accounts, but no direct-only launch design, project44 exclusion or carrier entitlement has been approved (SC-02/07). Main §18.3 and E-93 record **17 cards** with a separate displayed count **12**: A. Duie Pyle, AAA Cooper, ArcBest/ABF, Averitt, Go2, Magnum, Old Dominion, Pitt Ohio, Roadrunner, Saia, Southeastern, TForce, XPO, FedEx Freight, Double D, Sunset Pacific and Warp. Peninsula is not in that observed inventory. Cards/counts are not proof that every operation is live or that every offer uses a direct account. Do not classify FedEx Freight or any other carrier as network-only without account-specific evidence. The access guide retains October9 Enabled/Activating/Disabled claims as historical, not current readiness. See main §18 and section 7 below for capability-specific validation.

### 4.6.1 The "Get quotes" form 

One lane, one pickup date, freight items and options; the system creates a quote request, asks every active carrier account for a rate and opens the results page. 

How to reach it. 

The blue "Quote" button at the top of the left menu (always visible). 

- The "+" next to "Quotes" in the left menu. 

- The "+ quote" shortcut on a customer (the customer and contact are filled in). 

- "Duplicate quote" on a results page, "Duplicate quote request" in the "..." menu of a results page, and 

- "Duplicate quote" in the "..." menu of a shipment (the lane, items, equipment and services are copied; stop reference numbers are cleared). 

- "Quote again" on any "Error loading quote request" panel. 

- A quote started from a shipment (LTL-005). 

Layout, top to bottom. Page title "Get quotes". A yellow banner if no carrier account is active (LTL-002). One white card with: customer row, equipment row, pickup date row, the two stops, the items, the total length row, and the blue "Get quotes" button. Footer notes under the card (LTL-019). 

##### LTL-001 Create a quote request 

The system will let staff create an LTL quote request from this form. "Get quotes" saves the request, starts the carrier rating and opens the results page; the button reads "Getting quotes..." while saving. 

- A request can be made with or without a customer. Without one, the account default margin is used and a customer must be chosen before booking (LTL-073). 

- If a required field is empty, the field message shows (for example "Choose a freight class"). 

- If saving fails, a red banner above the card reads "Error creating quote request" followed by the reason. 

##### LTL-002 No active carrier accounts 

With no active, activated carrier account, a yellow banner reads "Looks like you don't have any active carriers yet, so this quote request won't have any results." with the underlined link "Carrier settings" (opens the "Carrier integrations" screen). The "Get quotes" button is disabled while the banner shows. 

##### LTL-003 Loading and error states 

While an existing request loads the page shows a placeholder card with "Loading quote form". If the request cannot be found the page shows the panel "Error loading quote request" / "The quote request you're looking for is missing." with the button "Quote again". 

###### LTL-004 

##### Duplicate a request 

A duplicate fills the form from the earlier request. The old pickup date is kept; if it is past, "Pickup date must not be in the past" shows until a new date is chosen. The old margin is not copied; the new request takes the customer's current margin. "Get quotes" always creates a new request. 

##### LTL-005 Start from a customer or a shipment 

The form can open with the customer and contact chosen (the customer's "+ quote" shortcut), or with the lane, stops and LTL items copied from an existing shipment (empty if the shipment is not visible to the user). 

#### 4.6.1.1 Customer row 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Customer|Search box,placeholder"select customer".<br>Lists"Recent"customers first,then"All".<br>Typing filters by name.The first entry is"+add<br>",which opens the new-customer window.|No for<br>staff|Empty(or set by<br>the shortcut/<br>duplicate)|Choosing a customer<br>clears the contact and<br>loads that customer's<br>contacts.|
|Customer<br>contact|Search box,placeholder"select contact".<br>Appears only after a customer is chosen.|No|Empty|The contact receives the<br>quote e-mail when the<br>quotes are shared(LTL-<br>061).|


The row is hidden on the carrier-account "Test quote" form (LTL-114). Staff can also use the shell buttons "Open add new customer form" and "Create new vendor". 

#### 4.6.1.2 Equipment row 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Equipment|Search box,placeholder"select equipment".<br>Grouped list. "LTL"is the first group.The other<br>groups are truckload equipment(see LTL-020).|Yes|LTL|Choosing any non-LTL entry<br>switches the form to<br>truckload mode(LTL-020).|
|Protect from<br>freezing|Switch,grey text on the right.Tooltip: "Availability is<br>subject to carrier restrictions.Please check with the<br>carrier to verify that they're currently providing this<br>service."|No|Off|Adds the"protect from<br>freezing"service to the<br>whole request.|
|+add vendor|Text button.Opens the"Add vendor"window(LTL-<br>006).|No||Staff only.Not shown to<br>customers.|


##### LTL-006 Add vendor 

The "+ add vendor" button opens a window "Vendor type" with a multi-select list: Chassis, Crane, Customs broker, Insurance, Lumper, Steamship line, Towing, Transloader, Warehouse (Freight is not offered here). The blue button "Add vendor" is disabled until at least one type is ticked. The vendors are saved on the request and carried to the shipment when it is booked. They are not used for rating. Each added vendor shows as a row ("Vendor 2:" and so on) with a trash button. 

#### 4.6.1.3 Pickup date 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Pickup|Date box,placeholder|Yes|Empty|"Pickup date is required". "Pickup date must not be in|
|date|"mm/dd/yyyy",with a<br>calendar button("Open|||the past". "Pickup date must be less than31days in the<br>future". "This date is unavailable"on a weekend or a US|
||calendar").Shows as"Fri,Oct|||holiday.A yellow note"This date is a holiday for some|
||9"when filled.|||carriers"on Good Friday,the day after Thanksgiving<br>and Christmas Eve.|


##### LTL-007 Pickup date rules 

The date rules above apply on the form and again when the request is saved. "Today" is the system date. The holiday note does not stop the request; it also shows as a banner on the results page (LTL-028). 

#### 4.6.1.4 Stops 

An LTL request has exactly two stops: origin and destination. Each stop is a small card with an icon (circle for pickup, pin for delivery) and a collapse arrow. 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Location|Search box,placeholder"origin city/state/zip"<br>or"destination city/state/zip".Message when<br>empty: "start typing a city or zip code".Results<br>are cities and zip codes plus the customer's<br>saved addresses(address book).|Yes|Empty|Choosing a saved<br>address also fills the<br>company,street,hours,<br>contact,location type<br>and the stop services<br>saved with that address.<br>Message when nothing<br>is chosen: "Choose a<br>city,state and zip from<br>the list".|
|Location type|List with26options:Airport,Business with<br>dock/forklift,Business without dock/forklift,<br>Camp,Church building,Construction site,<br>Container freight station,Convention/trade<br>show,Country club,Fair/amusement park,<br>Farm,Government site,Grocery warehouse,<br>Hospital,Hotel,Limited access,Military<br>installation,Mine site,Native American<br>reservation,Nursing home,Pier,Prison,<br>Residential,School,Self-storage,Utility site.|Yes|Business with<br>dock/forklift|The type decides which<br>services are offered(for<br>example a liftgate is not<br>offered at a dock).|
|Pickup<br>services<br>(origin)|Multi-select dropdown"Pickup services":<br>Liftgate,Inside,Single shipment,Sort&<br>segregate.|No|None||
|Delivery<br>services<br>(destination)|Multi-select dropdown"Delivery services":<br>Appointment required,Liftgate,Inside,Notify<br>before delivery,Sort&segregate.|No|None||
|Collapse/<br>expand|Arrow button"Collapse location" / "Expand<br>location".||Collapsed on<br>an empty form,<br>expanded on a<br>copied request|The location type and<br>services stay visible<br>while collapsed.|
|Clear|Trash icon in the location box.|||Clears the stop.|


##### LTL-008 Trade show hint 

**Unverified classification:** Neither the displayed hint/autofill nor universal class125/NMFC154630 is established by the main source. This item is a proposal requiring commodity-specific validation; main §14.5a must not be interpreted as a blanket classification rule.


When a stop's location type is "Convention/trade show" a grey strip reads "Trade show shipments are usually freight class 125." with a "Why?" tooltip. Freight class 125 and NMFC 154630 are filled for the items. 

##### LTL-009 Saved addresses 

The location box also searches the customer's address book (section 4.7). The address-book button next to the origin opens the address editor to save a stop for next time. 

#### 4.6.1.5 Items (handling units) 

One grey card per item, numbered, with a pallet icon. At the right of the item list: "+ add item". A trash button removes an item (only when there is more than one). 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Past-<br>products<br>search|Search box,placeholder<br>"search for past things<br>they've shipped...".Shown<br>only if the customer has<br>shipped before.|No|Empty|Choosing a product fills packaging,dimensions,<br>weight,freight class and NMFC and moves the<br>cursor to Quantity.|
|Packaging|List:Pallet(48×40),Pallet<br>(48×48),Pallet(60×48),<br>Pallet,Bag,Bale,Box,<br>Bundle,Carpet,Carton,<br>Case,Coil,Crate,Cylinder,<br>Drum,Gallon,Keg,Pail,<br>Piece,Pipe,Rack,Reel,Roll,<br>Sack,Skid,Tote,Tube.|Yes|Empty|Choosing a pallet size fills length and width(48x<br>40and so on).Editing length and width to a<br>standard size switches the packaging to that size;<br>any other size switches it to"Pallet".|
|Quantity|Whole number,minimum1.|Yes|Empty||
|Dimensions|Three numbers"L", "W", "H"<br>and a unit button(in/cm).|Yes|in|"Max length is327inches". "Max width is100<br>inches". "Max height is103inches" (the limits are<br>converted for cm).A live note beside the label<br>shows volume and density,for example"213.3cf<br>16.55pcf".|
|Total weight|Whole number and a unit<br>button(lb/kg).The weight is<br>for the whole line,not per<br>piece.|Yes|Empty<br>/lb||
|Freight<br>class|List: 50, 55, 60, 65, 70, 77.5,<br>85, 92.5, 100, 110, 125, 150,<br>175, 200, 250, 300, 400, 500.<br>An info icon explains the<br>class.|Yes|Empty|A chip"Est: "appears while the class is empty.<br>Clicking it fills the class.Tooltip: "Freight class<br>estimate is based on dimensions and weight you<br>have entered.It may be different from the actual<br>class,which could result in higher carrier charges.<br>Click to use estimate."The estimator algorithm is not established. The industry13-band density reference has commodity-specific applicability (main §14.5a).If the<br>class is empty when"Get quotes"is pressed the<br>message"Choose a freight class"shows.|
|NMFC|Text,placeholder"optional".|No|Empty||
|Stackable|Checkbox.|No|Off||
|Hazmat|Checkbox.|No|Off|Only sets the hazmat flag on the request.A red<br>hazmat marker then shows on the lane card and in<br>quote history.|


##### LTL-010 Totals strip 

When volume or weight is entered, a line at the right of the items shows the live totals: the package count with its name (for example "Pallets 4"), "Volume", "Density" and "Weight". Mixed-unit conversion is unverified. Deep1 E-117 retained numeric values when switching in→cm and lb→kg, with physical/display discrepancies. Do not promise physical conversion or adopt the discrepancy as approved behavior (OQ-02).

##### LTL-011 Add and remove items 

"+ add item" adds a new empty item. The trash button on an item removes it, unless it is the only item. 

#### 4.6.1.6 Total length 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Length|Number,placeholder"Length",with a unit list<br>(ft/in).|No for<br>LTL|Empty|Used for volume(linear-foot)<br>quotes.The limit follows the<br>equipment.|
|Linear Feet<br>Visualizer|Icon button"Linear Feet Visualizer".Opens a<br>trailer picture with numbered feet and the<br>footprint of each item,headed"Estimated total<br>length8ft".|||The"Est: "button copies the<br>estimate into Length.|
|Helper text|Orange volume icon: "Enter total length for<br>volume quotes"|||Shows when the freight is large<br>enough to qualify for a volume<br>quote(about four pallets or<br>more).|


##### LTL-012 Linear-foot estimate 

The source verifies particular layouts: two 48×40×48-inch pallets occupy an estimated 4 ft; ten such pallets on a saved example show 20 ft (main §§14.6/15.10). The entered length is separate and is not filled automatically in the scratch partial example. Trailer width, rotation, stacking, gaps, oversize handling, mixed sizes and rounding are unverified. The former universal 96-inch/whole-foot/no-stacking algorithm is removed pending OQ-02.

#### 4.6.1.7 Get quotes button and footer 

##### LTL-019 Footer notes 

Under the card the form shows grey notes with icons: "Pickup dates not guaranteed. Transit times and delivery dates are estimated." and, when a stop has "Sort & segregate": "Sort & segregate quoted price is a minimum. Final charge based on shipment and work performed." 

##### LTL-020 Truckload mode of the same form 

Choosing any equipment other than LTL switches the form to truckload (TL) mode. Staff can pick from the full equipment list: Dry Van (Dry Van, Dry Van 53, Dry Van 48, Straight Truck, Cargo Van, Dry Van or Refrigerated, Curtainside, Vented Van); Flatbed (Flatbed, Flatbed 53, Flatbed 48, Step Deck, Flatbed or Step Deck, Double Drop, Removable Gooseneck, Conestoga, Stakebed, Step Deck Conestoga, Flatbed Hot Shot, Landoll Flatbed, Multi-Axle Heavy Haul); Refrigerated (Refrigerated, Refrigerated 53, Refrigerated 48, Refrigerated Straight Truck, Refrigerated Cargo Van); Intermodal; Drayage; Dump; Dry Bulk; Power Only; Driveaway; Auto Transport; Tanker; Other. 

- Carriers are not rated automatically for truckload. The request is saved empty and staff add manual quotes (LTL-050 to LTL-054). 

- Items need only a description (required) and a total weight with a unit. 

- Stops: origin, destination and "+ add location" for extra stops (3 to 10 stops in total, extra stops can be deleted). There is no stop services dropdown. 

- Services: "Tarps" (flatbed group only), "Tanker endorsement", "Team service". The "Partial" switch shows for Dry Van, Flatbed and Refrigerated. Temperature low / high (°F) shows for refrigerated equipment. "Other name..." shows for the "Other" group. 

- Total length is required when "Partial" is on or the equipment is not Driveaway or Tanker. Width and height show for Flatbed, Power Only, Auto Transport and Other. A note "Total length needed for partial quote" shows when a partial quote lacks the length. 

- The pickup date may be up to 180 days ahead. A weekend date shows a yellow note "This date falls on a weekend". 

- Footer note: "Pickup, transit and delivery dates are estimated." 

- Customers cannot request truckload quotes; they send a shipment request instead (see section 4.11). 

### 4.6.2 Quote results 

How to reach it. After "Get quotes"; a row in quote history (4.6.5); the dashboard quote counts; a quoterequest search result; e-mail links; "View quotes" in a shipment's "..." menu; "See latest quotes" on an old request. 

##### LTL-021 Page layout 

Top to bottom: 

1. Visibility bar (staff): an eye icon and "Customer can see these quotes." (after the quotes are shared) or a crossed eye and "Customer can't see these quotes yet." (before), with the green button "Sharing" (LTL060). 

2. Title row: "Quotes for " (a link to the customer) and the contact name under it. At the right: the "+ Ref" button (LTL-070) and the "..." menu (LTL-071). 

3. State banners (LTL-028). 

4. Lane card: pickup date ("Fri, Oct 9", struck through if the date has passed), origin -> destination ("City, ST ZIP"), a "Multi-stop" chip when there are more than two stops, a red hazmat marker, the total weight (for example "1,050 lb") and the mode in bold ("LTL" or "TL"). Clicking the card, or its pencil, opens the criteria editor (LTL-067). 

5. Controls row: the eye button that hides or shows all quotes; the grouping buttons "Carrier", "Delivery", "Price"; and the tier tabs "All N", "Standard N", "Guaranteed N", "Volume N". 

6. Column headings (staff, wide screens): a small box with the margin for all quotes and the headings "Cost", "Margin", "Profit". 

7. Quote rows. 

8. "+ Add manual quote" (dashed button). 

9. Footer: the red-triangle button "N carriers didn't return results"; grey notes; and the outlined button "Duplicate quote". 

##### LTL-022 Quotes arrive live 

Rates appear as each carrier answers, without reloading. Until a carrier answers its row shows "—" and a spinner. No fresh rating run was submitted; the source does not establish a one-minute completion or finality guarantee. Historical offers and partial failures do not prove live response timing.

##### LTL-023 Quote row 

|Part|What it shows|
|---|---|
|Eye icon|Visible to the customer(eye)or hidden(crossed eye,row dimmed).Staff only.Not available once a<br>shipment is booked from the request,or when the quote has expired.|
|Carrier logo|The carrier's logo(or its initials).For customers who must not see carriers:the delivery weekday and date,<br>or"?" (see LTL-027).|
|Title|The service type(for example"Standard", "Guaranteed by AM(Noon)")followed by" — "and the transit<br>time: "N days", "Same day"or"Unknown delivery date".A guaranteed icon for guaranteed services.<br>"Volume quote"with a volume icon for linear-foot rates.A yellow icon when the shipment is interlined.|
|Subtitle|The carrier name,then"- " (for example"Freight Economy"). "Pallet"for pallet rates, "Dimensional"for<br>dimensional rates.A"Customer-specific rate"marker(user icon)when the rate comes from a carrier<br>account that is not the blanket account(LTL-108).|
|Price|The customer price,large,grey.Staff can edit it(LTL-033).Orange when a limit warning applies,red when<br>invalid.|
|"Book"<br>button|Blue button.On narrow screens it shows the price instead.See LTL-025.|
|Stack arrow|"Open stacked quotes"arrow on the first row of a group that holds more quotes(LTL-024).|
|Cost,Margin,<br>Profit(staff)|Three boxes at the right:cost(always read-only,grey),margin in% (up to4decimals)and profit in dollars.|


##### LTL-024 Groups and stacks 

Quotes are grouped by the button chosen in the controls row: "Carrier" (default), "Delivery" (grouped by estimated delivery date, with the date as a heading; "Delivery date unknown" for rates without one) or "Price" (one flat list, no stacks). Inside a group the quotes are ordered by delivery date and then by price, with removed (hidden or expired) quotes last. Groups are ordered by the price of their first row. The first row of a group shows full size and the others are stacked behind it until the arrow is clicked. If the 10-4 option "hide carrier names from customers" is on, the default grouping is "Delivery". 

##### LTL-025 Book button states 

**Entry-point discrepancy:** Main §14.10/Deep1 records disabled past-date row Book, but an offer-detail Book without a disabled marker. No Book was pressed. The source does not prove uniform enforcement, permission to bypass row locks or the complete list below (OQ-22).


A real "Book" button shows only on a complete quote that is not hidden or expired; otherwise an inert button of the same shape shows. The button is disabled when: 

the pickup date has passed; or the customer has a booking hold (banner LTL-028); or 

- the quote has expired, or expires before the pickup date; or 

- the customer does not have enough credit, only when "Enforce credit limits" is on (proposed Off at launch, approval pending; PAY022, SET-020): tooltip "Insufficient credit to book this quote"; or

- the user is not an Owner and the quote margin is below the lowest allowed margin (tooltip "Margin is low on this quote.") or its profit is above the highest allowed profit (tooltip "Profit is high on this quote."); or the quote is a manual LTL quote (LTL-053); or 

- the request was canceled. The reason shows in an orange tooltip left of the button. The same checks run again at booking (LTL-075). Staff can still book a hidden quote by opening it directly (LTL-055). 

##### LTL-026 Tier tabs 

"All N", "Standard N", "Guaranteed N", "Volume N". The counts include every complete quote (hidden ones too). 

- Volume = linear-foot (volume) rates. 

- Guaranteed = rates flagged guaranteed, or whose service type contains the word "guaranteed". 

- Standard = everything else. The chosen tab is saved on the request, so the customer opens the quotes on the same tab staff left. 

##### LTL-027 Hiding carrier names from customers 

When the account option "Reveal carrier names" hides carriers, customers see the delivery date block instead of the carrier logo and name (POR-060). Staff always see carrier names. The carrier is still named on the BOL and shipment pages. A footer note "Carrier names hidden from customer" shows to staff. (10-4's current setting shows carrier names.) 

##### LTL-028 State banners and messages 

|Situation|What the page shows|
|---|---|
|Page loading|Spinner and"Loading quote results".|
|Request not found|"Error loading quote request" / "The quote request you're looking for is missing." /button"Quote<br>again".|
|Quotes not shared<br>yet|The visibility bar reads"Customer can't see these quotes yet."|
|Customer request<br>waiting for staff|A row"Quotes requested" / "is waiting for you to reply with quotes" (or"This customer is<br>waiting...")with an hourglass,and the grey button"Cancel request".|
|No rate found|Grey box: "Your criteria didn't return any quotes."with the blue button"Edit criteria".|
|All quotes hidden|Orange crossed eye: "All quotes are hidden!Try unhiding at least one."|
|Criteria being<br>changed|Grey note"Previous quotes are no longer accurate due to changes,new quotes will be retrieved<br>once changes are saved."|
|Pickup date passed|The date on the lane card is struck through,the card gets an orange outline and the text"Pickup<br>date has passed."with the orange button"Choose a new date".All"Book"buttons are disabled.|
|Holiday|"This date is a holiday for some carriers"with a calendar icon.|
|Customer booking<br>hold|Banner"Booking disabled"and"Customer has a booking hold".All"Book"buttons disabled.|
|Cost-only test quote|Banner"Cost-only quotes" / "Don't share these with your customers" (carrier-account test only,<br>LTL-114).|
|Old quotes|Orange banner"These are old quotes" / "Changes were made during or after booking."and the<br>orange button"See latest quotes".The rows are read-only.|


|Situation|What the page shows|
|---|---|
|Booked|Green banner"Shipment booked from these quotes", "booked on"and the green button"View<br>Shipment".The booked row has a green outline;rows are read-only(no margin header,no eye,no<br>margin or price boxes).|
|Booking left<br>unfinished|Orange banner"Booking left unfinished", "started on"and the orange button"Finish booking"<br>(opens the draft shipment).|
|Canceled|A row"Canceled"with a red x, "made this request"for a customer request and"canceled",and<br>the outlined button"Restore".|


##### LTL-029 Service notes in the footer 

The footer shows grey notes: an explanation for each selected service (for example protect from freezing); "Pickup dates not guaranteed. Transit times and delivery dates are estimated." (truckload: "Pickup, transit and delivery dates are estimated."); for LTL "Carriers limit their liability for damage and loss, usually in the range of $1 – $25/lb." and "Unless otherwise specified, guarantees are for delivery by 5pm."; and "Sort & segregate quoted price is a minimum..." when a stop has that service. 

##### LTL-030 Duplicate button 

The outlined button "Duplicate quote" in the footer opens the "Get quotes" form filled from this request (LTL004). 

#### 4.6.2.1 Margins, prices and limits 

##### LTL-031 How the price is calculated 

The system will price each carrier rate from the carrier's cost and the margin (SHP-077): 

- Price = cost ÷ (1 − margin ÷ 100). A 25% margin on a $100 cost gives $133.33. 

- The price is never lower than cost plus the applicable minimum profit. If the margin gives less profit, the price is cost plus the minimum profit and the shown margin is recalculated from it. 

- Cost, price, profit and margin are calculated to the cent; the margin is shown with up to 4 decimals. The carrier's cost can never be edited on this page. 

##### LTL-032 Which margin applies 

The margin of a new request is taken at creation and kept on the request: the account default margin (Settings > Customers; standard 25%), replaced by the customer's own margin if it has one. The limits (lowest margin, lowest profit, highest profit) have four levels, general to specific; a more specific value replaces a more general one, and an empty value never replaces one above it (margin and profit limits: SHP-078): 

1. Account default. 

2. The customer. 

3. A carrier account (set under "LTL carriers" in the account margin window). 

4. The customer together with one carrier account (set in the customer's own settings window, "LTL carriers" tab). Carrier account rows only add limits; they do not change the margin. The customer setting "LTL 

Volume boost" (CUS-024) and Volume multiplier appear in settings; their units, formula, pricing effect and inheritance are unverified (main §§12.5/19.3; OQ-17). No no-effect implementation is approved. Owners set these in the account margin window (section 4.10) and the customer settings window (section 4.7).

##### LTL-033 Margin for all quotes 

Staff set one margin for the whole request in the small box above the column headings ("Sets the margin for all quotes."): type a number and press Enter or click away. The box shows the current margin, or stays empty when margins differ ("Mixed"). On focus a list offers "Customer X%" (only if the customer has its own margin) and "Global Y%" (the account default, 25 if none); a preset applies at once. The value must be below 100; 100 or more shows the error style and is refused with "Enter a margin below 100". A spinner shows while repricing. Every automatic quote is repriced, keeping the minimum profit; manual quotes are not. 

##### LTL-034 Margin, profit or price of one quote 

Staff can edit one quote, in its own Margin, Profit or Price box (blur or Enter saves): 

- Margin: the price is recalculated from the cost (no minimum profit is added on an explicit margin edit). 

- Profit: the price becomes cost plus the typed profit. 

- Price: the typed price is used as it is. The price must be at least $0.01. A message "Enter a price" shows for an invalid price. 

The cost box is always disabled. 

##### LTL-035 Margin source label 

Over the complete quotes the header shows where the margin comes from: "Customer" (all use the customer's margin), "Global" (all use the account margin), "Custom" (all use the margin typed for this request) or "Mixed". Prices are compared to the cent. 

##### LTL-036 Limits for non-owners 

Owners are not limited (SHP-078). For other staff, a quote with margin below the lowest allowed margin, or profit above the highest allowed profit, shows its box in orange (warning) or red (error) and its "Book" button is disabled with the tooltips in LTL-025. The rule is checked again at booking. 

##### LTL-037 Customer-originated margins 

A request made in the portal uses the customer's own margin, kept on the request; staff can still change it. 

##### LTL-038 Price limits 

A price must be between $0.01 and $1,000,000. A margin edit that would push any price past the limit is refused and nothing changes. 

#### 4.6.2.2 Hiding and duplicates 

##### LTL-039 Hide and show quotes 

The eye on a row hides or shows that quote for the customer (on a closed stack, the whole stack); the eye in the controls row hides or shows every quote. A hidden quote is dimmed and staff can still book it. "Show" is disabled for an expired quote. 

##### LTL-040 Duplicate quotes are hidden by the system 

When two visible quotes have the same service type, transit days, quote type and carrier, the system hides the more expensive one (the newer one if prices are equal). If carrier names are hidden from customers, the carrier is ignored in the comparison. Staff can show a hidden quote again. 

##### LTL-041 Volume duplicates 

A volume quote from a carrier that already has a class rate at the same cost is not listed. 

#### 4.6.2.3 Carriers that did not answer 

##### LTL-042 "N carriers didn't return results" 

The red-triangle button at the bottom, "N carriers didn't return results" (staff only, N above zero), opens a window with one row per carrier, sorted by name: logo, bold name and the red reason. N counts carriers. Typical reasons: "Carrier does not service this lane", "Destination and/or Origin are out of service area.", missing or expired credentials, "Rates and transit times are not available for the account number entered...", and "Carrier did not respond" when a carrier fails or times out. A carrier error never stops the other carriers. 

#### 4.6.2.4 Quote detail 

##### LTL-055 Quote detail window 

**Observed variants:** Main §15.5a records a shipment-linked XPO dialog with disabled Margin/Profit/Price and View quote results, no Save/Book. Deep1 E-118 records editable-looking fields in an existing booked-request ArcBest offer while row fields were disabled. No save authority or universal reason for locks was established; the blanket staff/not-booked and read-only rules below are proposed.


Clicking a rate row (staff, not booked) opens a two-pane window. Left pane: the carrier card (name, MC number, city and state), estimated delivery date, quote reference and "Blanket ()" or the account label or "Customer-specific rate", billing terms (for example "Third Party Prepaid"), carrier phone link and saved carrier notes, and the "Visible to customer" toggle (hides or shows the quote at once). Right pane: Cost (readonly), Margin %, Profit $ and Price (editable), the buttons "Book" and "Save", and the customer's credit status and the quote limits. "Save" saves the edited margin (if edited last) or price without booking; "Book" starts booking (4.6.3). From the carrier card on a booked shipment the window opens read-only (no "Save" or "Book") with a link "View quote results".

##### LTL-056 Charge breakdown

Breakdown is provider/state-specific (main §15.5a; E-111–112). Live XPO: Item Charge 1206.28 + Fuel Surcharge 360.08 − Discount 571.78 = cost 994.58; price 1198.29 gives profit 203.71. The user-supplied AAA Cooper screenshot shows 114.84 + 62.82 = 177.66, without a displayed discount; it was not independently opened. Deep1 E-118 found no disclosure after clicking Cost in a sampled ArcBest dialog. Do not require identical charge rows/disclosure for every carrier.

#### 4.6.2.5 Manual quotes 

##### LTL-050 Add a manual quote 

The dashed button "+ Add manual quote" opens the manual quote window for a request that already has quotes. A truckload request with no quotes shows the manual quote form directly on the page. 

##### LTL-051 Manual quote form (truckload) 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Carrier|Search box over the account's<br>carriers.|Yes||"Choose a carrier"|
|Via|Text,up to80characters.|No|||
|Quote number|Text,up to40characters.|No|||
|Quote type|List:Class,Dimensional,Guaranteed,<br>Pallet,Spot,Standard,Volume.|Yes|||
|Service type|Text,up to80characters.|No|||
|Equipment|Same controls as the quote form<br>(including"Other name...", "Partial",<br>temperature,services).|Yes|The request's<br>equipment||
|Transit days/Delivery<br>date|"days"number(0to60)and a date,<br>linked both ways from the pickup date.|No||"Does not match<br>the transit days"if<br>both are given and<br>differ.|
|Exp:|Expiry date.|Yes|The pickup date||
|Note:|Text,up to500characters.|No|||
|Cost and price lines|One line"Freight"per vendor on the<br>request. "+add line"and a trash<br>button per line. 1to20lines.Each line:<br>description(1to80characters),cost<br>and price(0to1,000,000,two<br>decimals).|Yes|Price from the<br>truckload margin<br>(customer or<br>account, 25if<br>none)|The price is cost÷<br>(1 −margin),or the<br>minimum profit rule<br>on the total.|
|Buttons: "Save"and,<br>when editing,a trash<br>button"Delete quote".<br>Only manual quotes can<br>be deleted.|||||


##### LTL-052 Manual quote for an LTL request 

On an LTL request the manual quote form is the shorter "house quote" form. It has no Carrier, Via, Quote number, Quote type, Service type or Note. Fields: Transit days (default 3) with Delivery date, Equipment (optional), Tanker endorsement, the lane bar (see LTL-054), the lines (Description, Target cost, Price; both required), the boxes Margin %, Cost+ % and Profit $ (they set the Freight line's price; the total target minus 

the other lines), "Exp:" and the button "Save quote". A house quote is not shown to the customer and the customer e-mail does not list it. The header margin does not reprice a house quote. 

##### LTL-053 Booking a manual LTL quote 

**Unverified scope/gate:** Main §14.9/Deep1 tests only unsaved manual entry and reset, not a saved manual offer or booking. The direct-LTL coming-soon gate in Deep2 is a different entry point and does not establish this manual-quote rule. Defer/enable decisions require SC-02/OQ-31.


A manual LTL quote cannot be booked in the first version: its "Book" button stays disabled with a tooltip saying so (booking a house quote is under "Planned for later", section 1.7). Manual truckload quotes can be booked (LTL-084). 

##### LTL-054 Lane history bar 

The manual quote form shows a bar "View lane history details" that opens a window with Origin, Destination, Equipment, Radius "100 mi" and History "6 months", and the line "Average cost for N mi" with "$X / $Y per mi", or "This is a new lane for you" when there is no history or data. 

##### LTL-057 Editing manual quotes 

A manual quote is edited in its own form. A manual quote with several lines cannot be repriced by the margin or price boxes on the row ("Edit this quote in its form"). The header margin applies to a multi-line truckload quote per line and then tops up the freight line to the minimum profit. 

##### LTL-058 Changing the criteria drops quotes 

Editing the criteria replaces all quotes on the request (manual quotes included), because they refer to the old lane and items. The card "Manual quotes may need updating." / "After updating this criteria, double-check the manual quotes are still accurate." shows on the edit panel while manual quotes exist. 

#### 4.6.2.6 Sharing the quotes with the customer 

##### LTL-060 Sharing window 

The green button "Sharing" opens the window headed "Shared with" (before sharing: a green button "Share quotes"). Before sharing, the caption reads "These quotes will become visible to all contacts at ." when customer login is on, and "We'll also send an email." when the request has a contact. 

##### LTL-061 Share quotes 

"Share quotes" makes the quotes visible to the customer (the request changes from draft to shared), shows them to every contact of the customer in the portal (when customer login is on), and e-mails the request's contact. If customer login is off, only the e-mailed link works. 

##### LTL-062 After sharing 

The window header reads "Visible to this 1 contact", "Visible to these N contacts", "No contacts" or "Shared with ". It lists each customer contact with a check mark when shared: name, e-mail, and when the e-mail was last sent or opened, or the grey word "Not sent". E-mail-only recipients are listed too. A failed send shows the banner "Error sharing". The link "+ Add contact" (only when customer login is on) opens an inline form with First name, Last name, Email and the blue button "Create contact". The green outlined button "Email quotes" opens the composer (LTL-063). 

##### LTL-063 Email these quotes 

The composer shows From (the user), Ref (the first reference, if any), Subject "Quotes for <origin city, ST> -> <destination city, ST>", To (several addresses, "+ add email", required, filled with the contact's address), Message (default "Here are the quotes that you asked for. Let me know if you have any questions.") and the buttons "Preview" (the e-mail exactly as sent, in a frame) and the green "Send email". The e-mail holds the message, the reference and a "View quotes" button to the secure quote page (LNK-004, LNK-005); it lists no prices. One e-mail is sent per address. E-mail text: section 5. 

##### LTL-064 Stop sharing 

The red outlined button "Stop sharing" asks "Stop sharing these quotes?" / "The customer will no longer see these quotes." with the buttons "Not now" and "Stop sharing". It is available while the request is shared and not booked. The quotes disappear from the customer's pages at once, the e-mailed links stop working and the view-only link stops working. 

##### LTL-065 Copy link (view-only link) 

At the bottom of the window: "Need a view-only link?" with the small grey "(can't book quotes)" and the blue link "Copy link". It copies a link to the quote page (LNK-006): anyone with it sees the quotes without signing in but cannot book. Copying also makes an unshared request visible (view-only sharing is switched on by the copy). The address contains a private part that cannot be guessed. 

##### LTL-066 Sharing a booked request 

A request that has been booked can still be shared and its link copied; the customer then sees the quotes and a link to the shipment. 

#### 4.6.2.7 Edit, cancel, reference 

##### LTL-067 Edit criteria 

Clicking the lane card (or "Edit criteria" or "Choose a new date") opens the "Get quotes" form inside the page, with a close button ("Close editing panel") and the button "Update quotes" ("Updating quotes..."). Saving replaces the automatic quotes and rates again. Editing is not possible once a shipment exists from the request. The customer and mode cannot be changed. 

##### LTL-068 A draft with no quotes opens the editor 

A staff-made draft with no quotes and no running search opens the criteria editor. 

##### LTL-069 Quote request status 

A request is one of: draft (not shared), shared (waiting for the customer) and completed (a shipment was booked). A canceled request shows "Canceled". The history glyph (LTL-091) follows the shipment, not the status, so a booked request always shows the booked mark. 

##### LTL-070 "+ Ref" 

The "+ Ref" button turns into a text box "Ref" where the first stop's reference number (default kind "PO") can be typed; Enter or clicking away saves it. Emptying the box removes the reference. The reference shows in quote history and is carried to the shipment. Customers can set it too. 

##### LTL-071 "..." menu 

Items: "Duplicate quote request", "Cancel quote request" (only if there is no shipment and the request is not canceled) and "Uncancel quote request" (only on a canceled request). "Cancel quote request" opens the window "Are you sure you want to cancel this request?" with the buttons "No, go back" and "Yes, cancel"; on success the page goes to quote history. A canceled request refuses every change except "Uncancel" and stops a search that is still running. Uncancel does not restart the search; use "Edit criteria" for fresh rates. Test requests (LTL-114) cannot be shared, booked or given manual quotes. 

### 4.6.3 Booking a quote 

The page is the shipment booking form (section 4.2) filled from the request and the chosen quote, so staff only complete the missing details. Reached from the "Book" button of a row, the "Book" button in the quote window, or a quote link. 

##### LTL-072 Book page 

The page is headed "Book shipment" with a back arrow (to the results), a "Custom BOL #" box and a "..." menu with "Save for later" and "Cancel". A grey line reads "Quoted " with "by " at the right. While loading it shows "Loading book form". If the request or quote is missing it shows "Error loading quote request" or the banner "Quote is no longer available" with the button "Get new quotes" (back to the results). 

##### LTL-073 What is filled in 

- Customer card: the request's customer and contact. Staff can change them; the shipment takes the customer chosen here and the request keeps its own. If the request had no customer, one must be chosen. 

- Carrier section: "Carrier", the link "Change carrier" (back to the results), a card with the carrier logo, the service and transit ("Standard — 7 days") and the carrier name; below it the LTL card with the "Protect from freezing" switch. The link "+ add vendor / carrier" is kept for the other vendors. 

- Locations: the two stops from the request. The city, state and zip of both stops are locked: to change the lane, staff go back and get new quotes (message "Get new quotes to change the lane"). Items, services, dates, contacts and hours can be edited. 

   - Pickup switches: "Single shipment", "Sort & segregate", "Liftgate pickup", "Inside pickup". Delivery switches: "Notify before delivery", "Sort & segregate", "Liftgate delivery", "Inside delivery", and "Appointment required" at the bottom. 

   - The location type rule applies: "Business without dock/forklift" adds the liftgate service, and adding a liftgate to "Business with dock/forklift" changes the type to "Business without dock/forklift". 

   - "Share BOL" is on for the pickup stop and off for the delivery stop. "Est. arrival date" shows the quote's estimated delivery date. The request's reference numbers are kept. 

- Items: from the request, with the LTL fields, "Total value" and the linear-feet field. 

- Cost & price: a table "Description / Cost / Price" with the line "Freight". The cost is the carrier's cost (grey, read-only). The price is the quoted price and can be edited. "+ add item" adds more lines. A summary shows "Margin", "Cost+" and "Profit". 

- Dispatching: a card with the switch "Auto dispatch" (see LTL-080). 

- The footer notes and the buttons "Book shipment" and the outlined "Save for later". Everything else on the page works as the shipment form in section 4.2. 

##### LTL-074 Book shipment 

"Book shipment" creates the shipment and books it in one step. A green message "Shipment created" and then "Shipment booked" show, the BOL e-mail is sent to the stop contacts with "Share BOL" on, and the user lands on the new shipment page. The request becomes "completed" and the results page shows the green booked banner. 

##### LTL-075 Checks before booking 

Checked again at booking, with the submitted pickup date and price: 

|Check|Message|
|---|---|
|Request canceled|"This quote request is<br>canceled."|
|Request already booked|"This quote request is<br>booked."|
|Quote not complete,or not in the request|"This quote is no longer<br>available."|
|Pickup date in the past|"Pickup date must not<br>be in the past"|
|Customer has a booking hold|"Booking is disabled for<br>this customer."|
|Quote expired,or expires before the pickup date|"This quote expires<br>before the pickup date."|
|Not enough credit(only when"Enforce credit limits"is on)|"Insufficient credit to<br>book this quote"|
|Margin below the allowed margin(not Owner)|"Margin is low on this<br>quote."|
|Profit above the allowed profit(not Owner)|"Profit is high on this<br>quote."|
|Lane changed|"Get new quotes to<br>change the lane"|
|Another person booked it at the same moment|"This quote request is<br>booked."|


Check Message If a check fails the form shows the red banner "Error booking shipment" with the message. The banner "Previous changes detected" with the button "Reload quote request" shows when the request changed in the background. 

##### LTL-076 The booked shipment 

The shipment keeps its own copy of the quote: the Freight line's cost is the carrier's quoted cost whatever was submitted; the price is the price on the form; carrier, service, transit days, expected delivery date, expiry and charge lines are copied. Later cost or price edits on the shipment never change the quote request. The carrier shows on the shipment page (section 4.2). 

###### LTL-077 

##### Save for later 

"Save for later" (in the "..." menu and as the outlined button at the bottom) saves the form as a draft shipment linked to the request, with the message "Shipment created", and opens that shipment's edit form. The request stays shared or draft, and the results page shows "Booking left unfinished" with the button "Finish booking". 

##### LTL-078 Finish booking 

"Book" on the results page of a request that already has a draft shipment does not open this page again. It attaches the chosen quote to the draft (cost and price copied from the quote) and opens the shipment's edit form. Booking the draft there ("Book shipment") completes the booking as in LTL-074. 

##### LTL-079 Banners and states on the book page 

|Situation|What the page shows|
|---|---|
|Request already has a booked shipment|The page opens that shipment instead.|
|Request has a draft shipment|The page opens the shipment's edit form.|
|Request was re-quoted after booking|The page opens the latest request.|
|Customer has a booking hold|Card"Booking disabled"and the book button is disabled.|


#### 4.6.3.1 Pickup request to the carrier (auto-dispatch) 

##### LTL-080 Auto dispatch 

**Observed label, untested trigger:** Main §14.10/15.5a/Deep2 records Auto dispatched on existing shipments. It does not establish an On default, carrier request payload, email omission, timing, acknowledgment, exactly-once processing or Scheduled trigger. Customer-specific auto-dispatch was unchecked in one sample (§12.5). Validate local booking separately from provider acceptance.


The "Dispatching" card has the switch "Auto dispatch", on by default for 10-4. When on, booking sends a pickup request to the carrier's system automatically, with the same carrier account the quote came from. It holds the BOL number, pickup date, shipper and consignee (company, address, contact name, phone, hours), the items and the services; e-mail addresses are not sent. The status moves from "booked" to "scheduled" when the carrier confirms (SHP-075).

- The shipment's carrier card shows the blue strip "Auto dispatching..." with a spinner while the request is open, and the check row "Auto dispatched" when the carrier has confirmed, with the pickup number. If Auto dispatch is off, no request is sent and the carrier card shows the manual dispatch bar (LTL-081).

A pickup request is sent only once; if the answer is unclear, staff use the manual bar. 

##### LTL-081 Manual dispatch bar 

When there is no automatic pickup request, or the carrier refused it, an orange bar on the carrier card shows the carrier's contact links ("Online", phone, e-mail, when known), the boxes "Pickup #" and "PRO #" (saved when the user clicks away), the buttons "Auto dispatch" (sends the request again) and "Done" (marks the pickup as arranged by hand), and, after a refusal, the red text "Pickup request failed". After "Done" the card reads "Dispatched" and the shipment moves from "booked" to "scheduled". "Auto dispatch" is available only while the request is a draft or failed. Pickup # is saved on the pickup request; PRO # is saved on the shipment and is shown to the customer. 

##### LTL-082 Cancel a booked LTL shipment 

Canceling a shipment whose pickup request is still open (not yet confirmed) cancels the pickup request in the system. If the carrier has already confirmed the pickup, the shipment shows the orange banner "Contact the carrier to cancel the pickup!" with the text "We canceled the shipment in our system, but you need to contact the carrier and have them cancel the shipment" (with "with pickup #" when known) and the carrier's contact rows (Online, phone, e-mail), or "Unfortunately, We don't have any contact information for this carrier, but you can still mark the shipment as cancelled." The button "Carrier contacted" completes the cancel and "Undo cancel" reverses it ("Shipment un-canceled"); undo returns a canceled pickup request to draft so "Auto dispatch" is offered again. The system does not cancel the pickup at the carrier by itself. 

##### LTL-083 LTL shipment menu 

For a shipment created from a quote, the shipment's "..." menu starts with "View quotes" (opens the results page) and "Duplicate quote" (opens the "Get quotes" form filled from the request). 

### 4.6.4 Truckload quotes and booking (short) 

##### LTL-084 Truckload quote requests 

For a truckload request the results page lists only manual quotes (LTL-051). The margin box writes the truckload margin. Booking a truckload quote opens the same book page filled with the quote's stops, items, equipment and all of its cost and price lines. The cost on each line comes from the quote and cannot be changed; prices can be edited. There is no automatic pickup request for truckload: the shipment is covered as usual (see section 4.3). Customers do not book truckload quotes. 

### 4.6.5 Quote history and "Shipments to quote" 

Browse and search every quote request, newest first. Reached from "Quotes" in the left menu (the "+" starts a new quote); the "Quote" queue row (staff, only when it has a count) opens "Shipments to quote". 

##### LTL-090 Quotes list 

The page "Quotes" lists quote requests newest first, 16 rows first and more as you scroll. Each row is a card that links to the results page of that request (row label "Visit quote results for "). 

|Cell|Content|
|---|---|
|Status|See LTL-091.|
|glyph||
|Pickup<br>date|"Oct9"in bold with the weekday(or the year when not in the current period).Struck through and grey if the<br>date has passed and the request is not booked,or if it is canceled.|
|Lane|Origin"City,ST" ->destination"City,ST".|
|Customer|Customer name(empty for requests without a customer).|
|Weight|For example"2,050lb",with a red hazmat icon first when hazmat.|
|Sub-line|For a customer request:when it was created.The BOL number in orange when a shipment exists but is not<br>booked;in plain text when booked.Otherwise the first reference,for example"PO12345".|
|Mode|"LTL"or the equipment name.|


Row borders: orange 1 px for requests that need action (a customer request waiting for quotes or with an unfinished booking); dashed grey on a grey background for expired and canceled requests; solid grey otherwise. 

##### LTL-091 Status glyph 

The glyph is the first of these that applies: 

1. Expired (the pickup day is past and the request is not booked): grey expired mark, date struck through. 

2. A customer request that was shared and is waiting for the customer: person with a green envelope. 

3. Booked (a booked shipment exists): green check. 

4. Canceled: grey x. 

5. A customer request that is a draft and waiting for staff: person with an orange rotating hourglass (action needed). 

6. Pickup in the future and a draft shipment exists: orange "finish booking" mark. 

7. Otherwise: small grey box (a draft or shared quote made by staff). For customers the glyphs read "waiting for broker to respond" and "quotes available". 

##### LTL-092 Search and filters 

A search box (placeholder "search for...", opens with the magnifier, after a short pause) and a funnel button that opens a filter panel with "Customer" (one customer) and "Rep" (one user or one team). Chosen filters show as blue chips with an x. Search words are combined (all must match) and match the customer name, origin or destination city, state or zip, the first reference value, and the BOL or custom BOL number of the linked shipment. Search and filters are remembered for the session. The scroll position is restored when returning from a results page. 

##### LTL-093 Empty states 

"No quote requests." or `No quote requests for "<search>".` , and the button "Reset filters" when a search or filter is active. 

##### LTL-094 Shipments to quote 

The page "Shipments to quote" lists customer-made requests that staff must still answer: draft, not canceled, made by a customer. It has no filter box, shows the oldest request first, and empty text "No quote requests.". The "Quote" row in the left menu counts these requests and is hidden when the count is zero. 

##### LTL-095 Customer quote history 

On a customer's page the "Quotes" tab lists that customer's requests with the same rows. Empty: "No quotes" with the button "+ quote". 

##### LTL-096 Dashboard 

The dashboard quote counts come from the same list (see section 4.1, Dashboard). 

### 4.6.6 LTL carrier accounts ("Carrier integrations") 

Connect 10-4's own LTL carrier accounts so the system can retrieve negotiated rates, send pickup requests and track loads. Owners manage the accounts; other staff can look. Reached from Settings > Carriers > "Carrier Integrations" (breadcrumb Settings / Carriers / Carrier Integrations; a close X at the top right returns to the previous page). 

#### 4.6.6.1 The list of carriers 

##### LTL-100 Carrier cards 

One square card per carrier: logo, name in grey, and coloured dots at the top left (one per account: green "Activated", yellow "Activating", red "Error", grey any other state). Cards are A to Z; a carrier with no account switched on appears faded at the end. A card links to the carrier page. 

- Above the cards (Owner): the blue button "+ Add carrier". 

- At the right: the outlined link "Test quote" (shown only when at least one carrier is activated). 

- Heading "Future carrier integrations" with smaller cards for carriers that cannot be connected yet. 

- Empty account: grey block "Let's activate your first carrier." with "+ Add carrier" (Owner), or "No carriers setup… yet." (others). 

##### LTL-101 Carrier status 

A carrier card is "Activated" if any account is on and activated; "Activating" if none is activated but one is activating; otherwise "Deactivated". An account's own state is "Activating" (saved, waiting to be switched on at the carrier), "Activated", "Error", or "Deactivated" when its On/Off switch is off. An activating account can take up to 24 hours. 

#### 4.6.6.2 One carrier 

##### LTL-102 Carrier page 

The page shows a back arrow, the logo (a click opens the carrier details: SCAC, USDOT, MC numbers, legal name, addresses, compliance), the carrier name, and one row per account. A row shows the status dot and the account number (or the state word "Activating" / "Activated" / "Error" when there is no number yet), and below it "Blanket" (bold) followed by " - " when the account has a label. Owners can click a row to edit the account; others see a plain row. Accounts are listed active first, then blanket first, then oldest first. If 10-4 cannot be connected to the carrier, the page says: "We are not currently integrated with , but adding your account information will allow you to add manual LTL quotes." 

##### LTL-103 "+ add rates" 

The Owner link "+ add rates" opens the form for a new account of that carrier (LTL-105). 

##### LTL-104 Notes 

Below the accounts: the title "Notes" and the caption "Add notes and reminders on this carrier for your team". Owners can write notes (with visibility control); other staff see the notes read-only. 

#### 4.6.6.3 Add or change an account 

##### LTL-105 Credentials form 

|Field|Input|Required|Rules&messages|
|---|---|---|---|
|Extra connection details|One text box per detail the<br>carrier needs(for example<br>"Access Key"for Go2).|Yes|The box labels follow<br>the carrier.|
|Account number|Text.Label"Account<br>number" (or the carrier's<br>own wording).|Yes|Shown when the carrier<br>needs an account<br>number. "Each<br>integration per carrier<br>must have a unique<br>account number."|
|Portal username|Text.Label"Username" (or<br>the carrier's wording,for<br>example"Email Address").|Yes|Shown for carriers that<br>connect directly.|
|Portal password|Password box,at least4<br>characters.Never filled in.<br>Label"Password".|Yes||
|Button|"Authorize" (carrier<br>connected by the system)<br>or"Save" (carrier not<br>connected).Disabled until<br>the form is changed and<br>valid.|||


|Field|Input|Required|Rules&messages|
|---|---|---|---|
|Consent text under the button: "By clicking this||||
|button,you authorize us to work with to retrieve your||||
|rates on your behalf." (or,when the carrier is not||||
|connected, "We are not currently integrated with,||||
|but adding your account information will allow you to||||
|add manual LTL quotes.").Errors show in red:||||
|"Something went wrong".||||


##### LTL-106 Credentials are write-only 

The system will keep the username, password and extra details private: they are never shown again and never in e-mails. Screens show only the account number. 

##### LTL-107 After saving 

For a connected carrier a yellow card (clock icon) reads "We're activating . It can take 24 hours, but it's usually faster." and "We'll notify you when they're ready." with the button "OK". The account state is "Activating" until the carrier answers, then "Activated" or "Error". A carrier may also show its own extra instruction, for example which access key or other connection detail 10-4 must send to it (the box labels of LTL-105 follow the carrier; see section 7 for what each carrier needs). Other carriers go straight back to the list. 

#### 4.6.6.4 Edit one account 

##### LTL-108 Edit account screen 

Five stacked cards: 

1. Status: the dot and account number, an On/Off switch, and the label row ("Blanket - ", with a pencil, or the blue link "+ add label"). The pencil opens a small window with the field "Label" (placeholder "+ add label") and the button "Save label". Switching the account Off keeps it but stops it giving rates on new quotes; quotes already on a request stay. 

2. Credentials: the pencil opens the credentials form. If the account is activated, a warning comes first: "Warning" / "Changing credentials on an active carrier could take up to 24 hours to take effect. During that time you will not be able to run quotes on this carrier." with the buttons "Change credentials" and "Nevermind". 

3. Billing address: shown with "(default)" in faint text when the account's own billing address is used. The pencil edits it; the trash button resets it to the default. 

4. Blanket: the switch "Use for all customers (Blanket)". Below, when on: "Show rates to all customers except those listed below:" (the word "except" in red italics); when off: "Only the customers listed below will see these rates:". The list shows each customer (link to the customer) with a trash button ("Remove exception"), and the link "+ add a customer" opens a customer picker. An account that is not blanket, or has customers listed, is a customer-specific account. Its rates show on the results page with the "Customer-specific rate" marker. 

##### LTL-109 Which accounts rate a request 

An account gives rates on a new request when it is On, "Activated", its carrier is connected, and: for a blanket account the request's customer is not in its exception list; for a non-blanket account the request's customer is in its list. A request with no customer uses blanket accounts only. The list of accounts is fixed when the request starts rating; switching an account off affects the next request only. 

#### 4.6.6.5 Add carrier window (Owner) 

##### LTL-110 Add carrier 

The button "+ Add carrier" opens a window (stages below). 

|Stage|What it shows|
|---|---|
|Choose|Label"Select a carrier",a search box<br>(placeholder"search"),the list of carriers<br>not on the account(logo and name),the<br>text"No carrier matches"and the link<br>"Can't find your carrier?".|
|Connected carrier|Back arrow,logo, "Enter account info for"<br>and the credentials form(LTL-105).|
|Carrier not connected yet|Choosing it registers10-4's interest and<br>goes straight to the last stage.|
|Request a carrier|Label"Which carrier are you looking for?",<br>a search box,and when more than2<br>characters are typed the blue button<br>`Request "<text>"` and"OR select a<br>match below"with a filtered list.|
|Done|The logo,a message,the buttons"Done"<br>and"Add another carrier".|
|Messages:for a connected carrier the activation text of LTL-107;for a carrier<br>not connected yet"We're not integrated with yet,but they're on our<br>roadmap."and"You just moved them a little higher on the list,and we'll<br>notify you when they're ready.";for a requested carrier"Thanks for<br>requesting.We'll look into supporting this carrier,and notify you if they<br>become available to use."||


#### 4.6.6.6 Test quote 

##### LTL-114 Test quote 

The link "Test quote" opens "Run a test quote": the "Get quotes" form without the customer row, with the margin set to 0 and LTL only. It rates with the active accounts and opens "Test quote results" with the outlined button "Done testing" (back to the carrier list), the banner "Cost-only quotes" / "Don't share these with your customers", and the rows showing cost as price. A test quote cannot be shared, booked, edited into a normal quote or given manual quotes, and does not appear in quote history, counts or the dashboard. States: 

"Loading quote request"; "Error loading quote request" / "The quote request you're looking for is missing." with the link "Start new quote request". 

#### 4.6.6.7 Margins and limits per carrier account 

##### LTL-115 Account margin window 

In Settings > Customers the tile "Margin defaults and limits" ("Set default margins for customers and minimum margin/profit") opens the window "Margins and limits" with the tabs "Global" and "LTL carriers". "Global" holds "Default LTL gross margin", "Minimum LTL gross margin", "Minimum LTL gross profit" and "Maximum LTL gross profit" (and the same for TL). The tab "LTL carriers" lists each carrier account with its logo, name and label or number, and the same four boxes for that account. Each box saves when the user clicks away (snackbar " saved" with "undo"); an empty box or one equal to the inherited value removes the override. Owner only. See section 4.10. 

##### LTL-116 Customer LTL carriers tab 

In a customer's settings window (section 4.7) the tab "LTL carriers" shows the same boxes for that customer and each carrier account. A carrier account whose rates are not shown to that customer (LTL-109) is shown as "Rates hidden from customer". Any staff member can change a customer-and-account value; only an Owner can change a carrier-account value that applies to every customer. 

##### LTL-117 Reveal carrier names 

In Settings > Customers the tile "Reveal carrier names" (switch "Hide Carrier Names": "Don't show the carrier logo and name when sharing LTL quotes. (will still show on BOL and shipment details)") sets LTL-027. The tile reads "Carrier names are visible" when off. 

### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

|Action|Owner|Member|Customer|
|---|---|---|---|
|Run a quote,edit criteria,duplicate,cancel/<br>restore|Yes|Yes|Own requests only(section<br>4.11)|
|See cost,margin,profit|Yes|Yes|No(price only)|
|Change the margin for all quotes or one quote|Yes,<br>unlimited|Yes,within the limits<br>(LTL-036)|No|
|Hide and show quotes,set the tab,add manual<br>quotes|Yes|Yes|No|
|Share,stop sharing,copy link,e-mail quotes|Yes|Yes|No|
|Book a quote and send the pickup request|Yes|Yes(within limits)|Yes,own quotes after sharing<br>(section4.11)|
|Quote history and"Shipments to quote"|Yes|Yes|Own requests|
|View the carrier accounts and notes|Yes|Yes(read only)|No|


|Action|Owner|Member|Customer|
|---|---|---|---|
|Add or change carrier accounts,credentials,|Yes|No|No|
|blanket/exceptions,notes||||
|Run a test quote|Yes|Yes|No|
|Margins and limits for carrier accounts<br>(everyone)|Yes|No(read only)|No|
|Margins and limits for a customer and one|Yes|Yes|No|
|carrier account||||


## 4.7 Customers

**Evidence review — partial:** Main §§12–13, 19.3–4 and Deep4 E-161–169 establish sampled lists, forms, histories and preferences. They expressly leave save timing, validation, defaults/inheritance and permissions open.

| Requirements reviewed | Supported portion | Proposed / unverified detail |
| --- | --- | --- |
| CUS-001–010 | List/count/columns/creation/filter/Rep/login/export entry, similar-name suggestion and unmatched/reset; §12.1–2/Deep4 | No-paging/sort/matching/storage rules, three-character threshold, creation/duplicate results, no-email guarantee and export contents. Ten selected customer-report columns are separately observed (§19.5). |
| CUS-011–016 | Header/tabs, General fields, Accounting fields/Done, separate Google address search/Save address; §12.3–4/Deep4 | Autosave/undo/errors, normalization, role/credit restrictions, upload/logo mapping, tax/DUNS validation and default/output/POD gates |
| CUS-017–018 | Contact list with positions/drag handles; create/edit/view/Cancel; name/title and Phone,email or URL; §12.3 | Primary designation, auto-type algorithm, first-three cap, reordering/restoration/login rights, requiredness/save/delete effects |
| CUS-019–021 | Reps assigned/+add user or team/commissions layout and explicit new-shipments-only banner; §12.5 | Primary/order/commission formula/ranges/notes/role powers, save effects |
| CUS-022–027 | Booking/login/automation switches and per-carrier margin fields; §12.5/19.3 | Pricing precedence/boost formula/no-effect rule, autosave, guards and role powers; sample auto-quoting/dispatch unchecked, not universally On |
| CUS-028–031 | Credit limit reached summary/aging/terms/invoice/payment links; §12.4 | Enforcement, override/mailto workflow, credit-state algorithm, graph, all Owner edit fields and go-live value |
| CUS-032–041, CUS-049/055 | Documents add-file, notes/Timeline/external-reference entry, six history tabs and statement/payment/export controls; §12.5 | Upload/visibility/retention, note saves, exact history schema, tab queries/paging, statement file placement and separate Late board |
| CUS-042–048 | Address cards/search/Create template, location/contact/services/hours/private note; explicit template editor in shipment; §§13/16.3/Deep4 E-169 | Address-card edit destination, create/delete/undo, automatic creation, reference fields, inheritance/propagation and role enforcement |
| CUS-050–054 | Customer-visibility help (§19.3) | Merge/archive/restore flows are not established; source lists them neither as verified operations nor approved release scope. No-op visibility claim corrected below. |

**Customer examples are not defaults:** Main §12.4/Deep4 E-167 show TL POD checked, LTL unchecked and 30-day terms; Combine PDFs was checked in the earlier sample and unchecked in the November2 sample. Preserve dates/record context rather than choosing one as a universal default. Actual output remains untested.


In short: This part of the system keeps every customer of 10-4 in one place: who they are, who owns the account (reps and commission), how they are billed, how much credit they have, what margin they get, who can log in, their saved pickup and delivery addresses, and their full history of quotes, shipments, invoices and payments. Owners and Members use it every day. Owners control the moneyrelated fields (credit, days to pay, margins below the account minimum, commissions, merge, archive). 

### Customers list 

Where: the sidebar item "Customers". The page shows every customer that is not archived. 

##### CUS-001 Customers list page 

The page title is "Customers" followed by a gray count "(N of M)": N customers match the current search and filter, M is the total. Next to the title is a round plus button "Add a new customer". Below the title, on the right, are the "Customer login" button and the export button. 

- Each customer is one row; the whole row opens that customer's page. Rows show a blue ring on hover. The whole list loads at once; there are no pages. 

- With no sort chosen, customers are listed alphabetically by name, ignoring case. Names that start with a number come first. 

- The add buttons (title plus and sidebar plus) are hidden for Members when the company option "Adding customers option" is on (ROL-022). Owners always see them. 

##### CUS-002 Customer row 

|Column|What it shows|
|---|---|
|Customer|Customer name in bold.Under it,in gray,the full name of the primary contact(empty if none).Text that<br>matches your search is highlighted.|
|Booked|Number of shipments booked,then the date of the last booking as"MMM d" (year added when not the current<br>year).Cells stay empty for a customer that has never booked or quoted.A customer with zero bookings shows<br>"0".|
|Quoted|Number of quote requests,then the date of the last quote request,same format.|
|Credit|"No credit"with a gauge icon when no credit limit is set. "Prepay"with a credit-card icon when the credit limit<br>is $0.Otherwise the credit limit in whole dollars with a gauge icon.Hidden on narrow screens.|
|Rep|Avatar(colored circle with initials)of the primary rep,or of the team when the primary assignee is a team.|


- "Booked" counts shipments that were booked and not canceled. Drafts do not count. 

- There is no "Late" column in the first version (see section 1.7). 

##### CUS-003 Sort the list 

Click a column heading to sort; click again to reverse. An arrow shows the active column and direction. 

|Heading|Sorts by|First click|
|---|---|---|
|Customer|Name|A to Z|
|Primary contact|Primary contact full name|A to Z|
|Booked|Number of bookings|Highest first|
|last(next to Booked)|Date of last booking|Newest first|
|Quoted|Number of quote requests|Highest first|
|last(next to Quoted)|Date of last quote request|Newest first|
|Credit|Credit limit(no credit counts as0)|Highest first|
|Rep|Name of the primary rep or team|A to Z|


The chosen sort is remembered while the user stays signed in on this browser. 

##### CUS-004 Search 

The filter box at the top right of the title bar opens a window with a search field (placeholder "search for...") and a "Rep" selector. Typing finds customers whose name or primary contact first or last name contains the text, ignoring case. The window closes on Enter or on the button "See N customers". The search text shows in the filter box; clicking a filter chip clears that filter. 

##### CUS-005 Filter by rep 

In the same window, the field "Rep" (placeholder "select a team or user") lists the account's users and teams, each with an avatar. 

- A user shows customers where that user is a rep, or where a team the user belongs to is a rep. 

- A team shows customers where that team is a rep. 

- Search and rep filter stay in the page address and are remembered, so Back returns to the same filtered list. 

- "Reset filters" clears both. 

##### CUS-006 Export customers 

The download icon next to "Customer login" opens a small box with "Export these customers to a .CSV file." and a button "Export", disabled when no customer matches the filter. 

- The file holds the customers matching the current search and rep filter. 

- Columns: Name, Website, Phone, Description, Primary Contact, Primary Contact Email, Primary Contact Phone, Shipments, Last Shipment Date, Last Note Date. 

- Available to every signed-in 10-4 user (not to customers). 

On failure the page shows "Something went wrong". 

##### CUS-007 Customer login link 

The button "Customer login" (key icon, blue caption "Copy link" on hover; tooltip "Copy customer login link") copies the customer sign-in link (POR-005). It is hidden when customer login is turned off in the account settings (section 4.10). 

##### CUS-008 Add customer window 

Opened from the title plus or the sidebar plus ("Open add new customer form"), over the current page. 

|Field|Input|Required|Rules&messages|
|---|---|---|---|
|Customer|Text,label"Customer|Yes|3or more characters show the"Did you mean?"list(CUS-009).An|
|name|name"||empty name creates nothing.|


- Button "Add customer" (full width, blue) creates the customer with only a name and opens its page, where all other details are filled in. 

Enter with no matching customers in the list also creates the customer. 

On a problem the window shows the reasons (or "Something went wrong!"). 

- Nothing is e-mailed when a customer is created. 

##### CUS-009 Did you mean? check 

After 3 characters (short pause after typing) the window shows the heading "Did you mean?" with existing customers whose names are close. Clicking one opens that customer instead of creating a new one. The list is hidden while empty. 

##### CUS-010 Empty and loading states 

|State|What is shown|
|---|---|
|Loading|A centered spinner.|
|No customers yet|"Let's add your first customer."and a blue button"Add customer".Members see nothing when<br>the"Adding customers option"is on.|
|Search or filter finds<br>nothing|"No matches found"and a button"Reset filters".|


### Customer page 

Where: a row in the list, a customer name anywhere in the system, or a result in "Find anything". 

##### CUS-011 Page layout 

Top to bottom: 

1. Breadcrumb bar: "Customers" (link back to the list), then the customer name. On the right: the "Documents" button, the "Reps" button (avatars of the assigned reps, star on the primary rep) and, for Owners only, a "..." menu with "Merge customer" and "Archive customer". 

2. Archived banner (archived customer only): "This customer has been archived". Owners also see "Restore customer"; Members see the text only. 

3. Header: customer name (large) with a pencil button "Edit customer details", then vendor number, website and phone, a one-line description, and on the right the logo box. Empty items appear as blue prompts: "+ vendor number", "+ website", "+ phone", "+ description". 

4. Tabs: Overview, Shipments, Quotes, Addresses, Invoices, Payments. The Invoices tab shows a red icon when the customer has overdue invoices (CUS-041). A tab can be opened directly from its link. 

5. Tab content. 

   - Header values: the website opens in a new tab, the phone is a click-to-call link, the description is limited to two lines and opens fully on hover. 

Until the data arrives the header is empty. 

##### CUS-012 Overview layout 

Three columns on wide screens, stacked on narrow ones. 

- Left: Credit card, Accounting, Contacts, Booking & quoting, External references (only when the account has reference types). 

- Middle: Active shipments. 

Right: note box, notes, accounting instructions and the Timeline. 

#### General details 

##### CUS-013 Edit customer details window 

**Save boundary unknown:** Main §12.3/Deep4 E-166 exposes Done and Close; no field change or Done was submitted. Blur-to-save, immediate switches, undo, success/errors and role restrictions below are proposed. Done alone does not establish an autosave contract.


Opened by the pencil next to the name or any "+" prompt in the header. Titled "General" (building icon), blue "Done" button at the bottom. There is no Save button: each text field saves when left (only if changed); switches and selects save at once. After each save a green message " saved" appears with an "undo" button. A failing field shows an error under it; any other failure shows a red message "Something went wrong!" that stays until closed. 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Customer<br>name|Text,placeholder<br>"Customer name"|Yes|Current<br>name|Editable by Owners always;by Members unless the<br>account enforces credit limits and the customer has a<br>credit limit above $0.Kept exactly as typed.Message:<br>"Name saved".|
|Vendor|Text,placeholder|No|Empty|The customer's number for10-4in the customer's own|
|number|"12345"|||system.|
|Phone|US phone field with<br>flag|No|Empty|US phone mask.A"Call"button next to it(title"Dial")<br>starts a call.|


|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Website|Text,placeholder<br>"website"|No|Empty|A"Visit"button opens the site in a new tab and adds<br>"https://"if missing.|
|About|Multi-line text,<br>placeholder"add<br>description"|No|Empty|Saved as"Description".|


##### CUS-014 Company logo 

The logo box shows the logo with a pencil button to change it and a trash button to remove it. Without a logo it shows a dashed box "+ logo". Users pick an image file from their computer. The logo appears on the customer page and wherever the system shows the customer's logo. 

##### CUS-015 Accounting card and Edit billing window 

The Accounting card on the Overview (heading "Accounting") shows: the legal name if set; the billing address (company shown when it differs from the customer name) or "no address on file"; billing e-mails, one per line; billing phone; the tax ID with its type, for example "EIN 12-3456789"; "DUNS" and the number; three small facts: " day terms", "LTL" or "TL" "POD req'd", and whether "Combine PDFs (bill and POD)" is on or off. Copy icons next to address, e-mails, phone, tax ID and DUNS copy the text. Clicking the card opens the window "Accounting" (circled dollar icon, blue "Done" button), which saves like the General window (CUS-013). 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Billing<br>address|Button showing the address,or"+<br>billing address".Opens the address<br>window(company,street lines,city,<br>state,zip,country<br>USA/Canada/Mexico).|No|Company=<br>customer name,<br>country USA|City,state and zip are required in the<br>address window.Error shown in a<br>banner.|
|+Legal<br>name|Blue link that reveals the field|No|Hidden when a<br>legal name<br>exists||
|Legal<br>name|Text,placeholder"Acme Corp,LLC"|No|Empty||
|Billing<br>email|Several e-mails as chips;typing<br>suggests this customer's contacts'<br>e-mails;placeholder"+billing<br>email"|No|Empty|Invoices and statements are sent to<br>these e-mails.|
|Billing<br>phone|US phone,placeholder"(000) 000-<br>0000"|No|Empty||
|Tax ID|Type select(EIN,TIN,RFC)and a<br>text field,placeholder"Tax ID"|No|Type follows the<br>billing country:<br>Canada TIN,<br>Mexico RFC,<br>otherwise EIN|Saved only when a type is set.|


|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|DUNS<br>number|Fixed prefix"DUNS"and a text field,<br>placeholder"000000000"|No|Empty|Must be9digits.Message: "Invalid<br>DUNS number.DUNS numbers are9<br>digits."|
|LTL POD<br>required|Switch|No|Off|When on,invoices for the<br>customer's LTL shipments cannot be<br>sent until a proof of delivery is on<br>file(section4.5).|
|TL POD<br>required|Switch|No|Off|Same for Truckload.|
|Combine<br>PDFs(bill<br>and POD)|Switch|No|Off|When on,the customer's POD file(s)<br>are attached to the invoice e-mail<br>next to the invoice PDF,as separate<br>files.When off,only the invoice PDF<br>is attached.Nothing is merged into<br>one PDF,and the bill of lading is not<br>attached(DOC-012).|
|Days to<br>pay|Whole number0to120|No|The account's<br>customer<br>payment terms<br>(30days at first)|Owner can edit;Members see the<br>number only.Saved on leave.|


Billing details (address, e-mails, phone, tax ID, DUNS, legal name) are editable by Owners always, and by Members unless the account enforces credit limits. 

A viewer who cannot edit sees a read-only summary with copy buttons instead of fields. 

##### CUS-016 Accounting instructions 

In the right column an Owner sees "+ Accounting instructions" and can write a plain-text instruction for whoever does billing (for example how to send invoices), with buttons "Save" and the edit pencil ("Edit note"). Members see the saved text under the heading "Accounting instructions" but cannot change it. Stored and shown as plain text; links and formatting are not interpreted. 

#### Contacts 

##### CUS-017 Contacts card 

Heading "Contacts", the first 3 contacts (name in bold capitals, then the title, or the e-mail if no title) and, with more than 3, the total count. A round plus button adds a contact. With no contacts the card is dashed and shows "+ Add contact". Clicking the card opens the contacts window. 

##### CUS-018 Contacts window 

A wide window with two panes. Left: the contact list (name and title or e-mail, selected one darker) and an outlined blue button "+ contact" at the bottom. Right: the selected contact. 

- View: name and title, a star with the tooltip "Primary contact" on the first contact, a trash button (tooltip "Delete contact", confirmation "Are you sure you want to delete this contact?") and a pencil (tooltip "Edit contact"). Below: phone, e-mail and web rows, whose icons start a call ("Start call"), open the site ("View site") or copy ("Click to copy "). Then the "External references" card (when the account has reference types) and a dashed "+ note" box for notes about this contact. 

- Main §12.3 observes numbered draggable contacts but expressly does not establish primary-contact designation or recipient effects. Move controls, ordering persistence and first-contact defaults require validation (OQ-19).

- Deleted contacts are hidden from the list and can be restored. 

- Customer login is a customer setting; contact eligibility and per-contact access are unverified. Main §12.3/Deep4 E-168 establish the following form, without server validation:

| Field | Observed input | Validation / effect |
| --- | --- | --- |
| First name / Last name | Text | Requiredness unverified |
| Title | Text | A business title, not an app role |
| Contact Details | Phone, email or URL; existing entries can expose type/subtype/copy/remove | Automatic detection, extra-row creation, defaults and validation unverified |
| Create contact / Update contact | Separate create/edit actions | Not submitted |

- Buttons: "Cancel" and "Create" (new) or "Update" (edit). 

- Messages: "Error creating contact", "Error updating contact", "Error deleting contact" followed by the reason. 

#### Reps and commission 

##### CUS-019 Reps window 

The "Reps" button opens a window titled "Reps assigned". 

- Banner: "Changes will only be applied to new shipments; existing shipments will not be affected." 

- Search box "+ add user or team": typing lists matching users (by full name) and teams (by name). Already assigned ones are disabled. A user who is on no assigned rep or team also gets "+ Add yourself to this team". 

- Column headings: "User" and "Commissions". 

- Each row: a drag handle, the avatar and full name (click opens a small profile), the star on the primary rep, the commission control (Owner only) and, for Owners, a trash button "Remove commission for ". Team rows work the same way. 

- Drag rows to reorder; position 1 becomes the primary rep. The first rep added is primary. 

- A rep or team cannot be added twice. Only users and teams of this account can be added. 

- Messages: "Updated reps." and "Failed to change assigned reps." 

##### CUS-020 Commission per rep 

Owners set a commission for each rep or team on the customer: a select with "%" or "$" and a number. 

- "%" (percent): 0 to 100, one decimal. Placeholder "0". 

- "$" (flat fee): dollar amount. Placeholder "$". 

- Saved when the field is left or the select changes. 

Members see the values read only. The commission feeds the Commissions report (section 4.9). 

##### CUS-021 Commission notes 

Owners see a notes box under the rep list for notes about commission on this customer. Members cannot see or write them. 

#### Margins 

##### CUS-022 Margin rules 

Every quote gets a price from the carrier cost and a margin. Margins come from two levels, most specific first: 

1. the margin set for this customer, 

2. the account default margin (Settings, section 4.10). 

   - A value not set on this customer shows the inherited value in gray with a dashed border. A value set on this customer has a solid border and a small circular-arrow button (tooltip "Reset default LTL gross margin" and similar) that removes it and returns to the inherited value. Typing a value equal to the inherited one also returns to inheriting. 

   - The price rule is SHP-077 (cost divided by (1 minus the margin), never less than the cost plus the minimum gross profit); margin and profit limits are SHP-078. 

   - Margins apply to quotes created after the change. 

##### CUS-023 Margin grid (Settings window, tab "Customer-specific") 

Opened by the "Booking & quoting" card (or "Open settings" in the Booking disabled banner). The window is titled "Settings" (gear icon), has two tabs, "Customer-specific" and "LTL carriers", and a blue "Done" button. 

|Row|Column"Default"<br>("Start here")|"Min gross margin%" /<br>"Min%" ("Don't go<br>below")|"Min gross profit $" /<br>"Min$" ("Don't go<br>below")|"Max gross profit $" /<br>"Max$" ("Don't go<br>above")|
|---|---|---|---|---|
|LTL|Default LTL gross<br>margin, %|Minimum LTL gross margin|Minimum LTL gross profit|Maximum LTL gross profit|
|Truckload|Default truckload|Minimum truckload gross|Minimum truckload gross|Maximum truckload gross|
||gross margin, %|margin|profit|profit|


- Default margins accept up to 99.99 percent. Inputs show one decimal; the Overview shows the exact stored value. Limits are shown in dollars. 

- Success message " saved" with "undo". Labels: "TL Margin", "LTL Margin", "TL gross margin minimum", "TL gross profit minimum", "TL gross profit maximum", "LTL gross margin minimum", "LTL gross profit minimum", "LTL gross profit maximum". 

- Owners are not limited by the account minimums ("Owners aren't limited by these amounts." shows for Owners). 

- Members cannot enter a value below the account-wide minimum for margin or minimum profit; the system refuses it on every save, not only on screen. 

Quotes outside a customer's limits cannot be booked by Members (section 4.6). 

##### CUS-024 LTL Volume boost 

**Unverified algorithm:** Main §§12.5/19.3 observe Volume multiplier/Volume boost but explicitly leave units, formula, pricing effects and inheritance open (OQ-17). The multiplier choices and no-price-effect rule below are proposals, not observed or approved behavior.


Below the grid is an orange-tinted row "LTL Volume boost" with an orange badge showing the effective LTL margin (the customer's default LTL margin times the boost), a reset arrow and a select (placeholder "select volume boost"). Options: "Not boosted", "x1.25 Small boost", "x1.5 Medium boost", "x2 Max boost". Default "Not boosted". 

- The boost multiplies the customer's default LTL margin; the badge shows the result. 

- The setting is saved and shown, but quote prices follow the margin rules in CUS-022; the boost does not change the price of an LTL quote. 

##### CUS-025 LTL carriers tab 

One block per LTL carrier account of 10-4 (section 4.6): carrier logo and name, the account label or number, and four inputs in the same columns as CUS-023 (tooltips such as "Default gross margin for rates"). Values here set the margin and profit limits for that carrier; they do not change the quote price (LTL-032). When the carrier's rates are hidden from this customer, the block shows "Rates hidden from customer" with a crossedout eye and empty cells. Without LTL carrier accounts the tab shows "No LTL carriers connected." 

#### Booking and quoting settings 

###### CUS-026 

##### Booking & quoting card and switches 

The card "Booking & quoting" shows a green or gray dot (booking on or off) and the rows "LTL margin %", "TL margin %" (customer value, else account default, else 0), "Customer login", "Auto-quoting", "Autodispatching", each with a green or gray dot (Auto-quoting and Auto-dispatching are dimmed when off). Clicking the card opens the Settings window. At the bottom of the Customer-specific tab, a gray block has four switches: 

|Switch|What it does|Default|Who can<br>change|
|---|---|---|---|
|Enable booking|When off,the customer cannot be booked on:the Overview shows the red<br>banner"Booking disabled"and the Book button is disabled in quote<br>results.|On|Owner|
|Customer login|Allows this customer's contacts to sign in to the customer portal.|On|Owner and<br>Members|
|Auto-quoting<br>(LTL)|The customer gets LTL quotes automatically in the portal.Indented under<br>Customer login.|On|Owner and<br>Members|
|Auto-<br>dispatching<br>(LTL)|LTL shipments the customer books are sent to the carrier for pickup<br>automatically(section4.6).Indented.|On|Owner and<br>Members|


When customer login, auto-quoting or auto-dispatching is off for the whole account (section 4.10), a warning icon appears next to that switch with "Customer login is disabled in account settings." (or 

"Customer auto-quoting is disabled in account settings." or "Customer auto-dispatching is disabled in account settings.") and "You can still change this, but it won't have an effect until enabled by an owner of your account." 

##### CUS-027 Booking disabled banner 

When booking is off, the Active shipments column shows a red banner "Booking disabled". Owners see the link "Open settings"; others see "Contact rep for more info". 

#### Credit 

##### CUS-028 Credit card 

The figures (PAY-022) are always shown. They can stop a booking only when an Owner turns on "Enforce credit limits" (SET-020); it is proposed Off at launch, approval pending, so at first the card is information only.

|State|Card|
|---|---|
|No credit limit set|Orange card,gauge icon,title"No credit"and orange button"+Get credit".|
|Credit limit of $0|Card with a credit-card icon and the title"Prepay" (the customer pays before shipping);the<br>same word is used in the customers list(CUS-002)and CUS-030.|
|Credit requested,<br>waiting|Blue pulsing"No credit"with"Waiting".|
|Credit limit set|Card with a used-and-left bar and"<$>left"or"<$>over".|
|Quote price above<br>remaining credit|Orange"Credit too low to book", "<$>left"and the bar.Only when"Enforce credit limits"is on<br>(a booking above the available credit is then refused;section4.6).|


- When a credit note exists it is shown under the card with the tooltip "Note from credit department". Owners see "+ credit note" when there is none. 

- Clicking the card opens the credit window (CUS-029). 

##### CUS-029 Credit and aging window 

- Usage view (everyone): "Limit <$>" and "<$> left", a stacked bar, and the lines "Open" (link "View open invoices for customer"), "Current", "1-15 days late", "16-30 days late", "31-60 days late", "61+ days late", "Not invoiced" and "Remaining", each with a "View invoices" link to the Invoices tab. "Terms days" and "DTP " (average days to pay) are shown with a chart of the last 12 months (blue line = days to pay, red area where it is above the terms, dashed line = terms) and a link "View payments". A "Toggle detailed breakdown" arrow collapses the list. Button "Done". 

- Alert (only when "Enforce credit limits" is on): red "Credit limit reached" with "Pay off current balance or request an increase in credit to continue booking shipments." when the credit is used up, or orange "Credit too low to book". 

- Owners also see the credit limit editor (CUS-030) and credit note editor (CUS-031). 

- Members see the credit note read-only and a button "Request credit" once credit-request addresses are set (SET-025), which opens an e-mail to the credit-request addresses set in the account settings, subject 

"More credit for ", body: "What new credit limit are you requesting? / What's the nature of their business? / What do they ship? / What's driving this request?" 

With enforcement Off (proposed launch choice, unapproved), booking is never blocked by credit.

##### CUS-030 Credit limit (Owner) 

The row "Credit limit" with a pencil ("Edit credit limit"). Editing shows a dollar field (whole dollars, minimum 0, steps of 1,000) and buttons "Cancel" and "Update". A limit of 0 means the customer pays before shipping and shows as "Prepay" everywhere. Message: "Credit limit saved" with "undo". Errors appear in a banner. Credit changes are shown in the timeline. 

##### CUS-031 Credit note (Owner) 

"+ credit note" (tooltip "Add note for rep") opens a text box with placeholder "Add a message about customer's credit..." and buttons "Cancel" and "Save" (Enter saves, Shift+Enter adds a line). A trash button "Clear message" removes it. Saved text has "Edit message" and "Delete message". Message: "Credit message saved" with "undo". Reps see the note read-only. 

#### Documents 

##### CUS-032 Documents window 

The "Documents" button (icon changes when the customer has documents) opens a full-screen dark window titled "Documents" with the customer name at the top right and an X to close. Documents are page thumbnails with names, grouped by document type (group heading hidden when there is only one group). The last tile is a dashed "+ add file" tile for uploading. Users can open and remove a document. Typical documents: W-9, credit application, contracts. The customer's statement PDF also appears here. 

#### Notes and timeline 

##### CUS-033 Notes 

A dashed box "+ note" in the right column. Typing and leaving the box saves a note, with an undo message. Notes are listed newest first with author and time. The author or an Owner can edit or delete a note. 

##### CUS-034 Timeline 

A collapsed row "Timeline" (arrow). Opening it shows the customer's history, newest first, with date, time and user: customer details updated, statement sent, credit limit updated, credit note updated, booking turned on or off, documents added or removed, reps changed, commission changed, contacts created, changed or deleted. Reps and commission events are shown to Owners only. 

##### CUS-035 External references 

When the account has external reference types (Settings, section 4.10), the Overview shows an "External references" card with rows " " (long values cut off), or the prompt "+ Add external reference". Clicking it opens a window with an information note, rows with a type select and a value box, a remove button on each row, and "+ reference". Rows save when the field is left. A type already used on this customer cannot be 

chosen twice. A value shows as a link when the type has a web link template. The card is hidden when the account has no reference types. Members cannot add or change reference types, only values. Also available on contacts (CUS-018) and address templates (CUS-047). 

#### Shipments, quotes, invoices and payments 

##### CUS-036 Active shipments column 

Header "Active shipments" with a spinner while loading. Two blue/outlined buttons: "+ Quote" (quote form with this customer selected) and "+ Shipment" (new shipment with this customer selected). The list shows booked loads that are scheduled or in transit, in groups "Scheduled" and "In transit". Each card shows BOL number, status, pickup and delivery date and time, origin and destination city and state, mode or equipment and carrier; a clock icon marks a late or flagged load. A card opens the shipment. With none: a dashed link "+ shipment". 

##### CUS-037 Shipments tab 

A scrolling list of all the customer's shipments, newest created first. Each row looks like a row of the Shipments list (section 4.2): BOL number with a status stripe, pickup date and time, customer name and price, origin and destination with a distance bar, delivery date, mode and weight, carrier and cost, or "N leads" when no carrier is chosen yet. A row opens the shipment. More rows load on scroll; the scroll position is remembered. Empty: "No shipments" and a link "+ shipment". 

##### CUS-038 Quotes tab 

A scrolling list of the customer's quote requests. Each row shows the date, an icon (green check when booked, struck-through calendar when not), origin and destination, the customer name, the BOL number of the booked shipment, and the weight and mode. A row opens the quote results (section 4.6). Empty: "No quotes" and a link "+ quote". 

##### CUS-039 Invoices tab 

Shows the customer's invoices with an aging bar and the statement; the content is PAY-021 (aging bar and cards PAY-015 and PAY-016, footer totals PAY-017, "Download CSV" PAY-018, "Record payment" button at the top left, shown when the customer has open invoices and the user may record payments). The "Statement" card on the right (only when there are open invoices) has the text "Send billing contact an email with attached statement PDF.", the button "Send statement" (PAY-020), "Last sent by ", the button "Download statement" (PAY-019) and a preview of the statement. A card opens that shipment's invoice. 

##### CUS-040 Payments tab 

The customer's received payments, newest first; columns and the "Record payment" button are in PAY-012 ("Date", "Amount", "Method", "Reference", "# of shipments", "Credit"). Date shows as "MMM d". A payment with an unused balance shows a green "Credit" pill with "+$ amount". Clicking a payment opens the payment details (PAY-010). More payments load on scroll. 

##### CUS-041 Invoice alert 

The Invoices tab shows a red icon when the customer has overdue invoices. 

##### CUS-055 Link to the Late invoices board 

Near the title, the Customers page shows a "Late invoices" link with the number of customers that have a late balance, when at least one has. It opens the "Late invoices" board (PAY-028 to PAY-031); a card on the board opens that customer's Invoices tab. 

#### Address book (Addresses tab) 

##### CUS-042 Addresses tab 

The customer's saved pickup and delivery locations ("address templates"). A search box (placeholder "find address...") and a round plus button sit at the top. Below, a scrolling list of cards sorted by company name A to Z; typing (short pause) filters the list; more cards load on scroll. Empty: "No address book entries". 

- Automatic template creation at booking is unverified. The draft previously contradicted SHP-032, which claimed booking never creates templates. Main §§13.5/16.3 establish neither; verify new-address booking and explicit template creation separately.

- The same templates fill the company field when building a quote or shipment for this customer (sections 4.2 and 4.6). 

- Template propagation to existing/future shipments and issued documents is unverified (main §§13.5/16.3; OQ-18). The observed shipment/template closing hours can differ; that is not proof of an update policy.

##### CUS-043 Address card 

Left: company name in bold with a small tag for "pickup" and/or "delivery" (set automatically), then street and "City, ST ZIP". Right: the location contact name (or a department word such as "SHIPPING"), the hours "8:00am — 5:00pm" and, with special instructions, "Note: ". Clicking one populated address card did not establish an edit/detail destination in the source (main §13.1). An explicit Edit location template control inside shipment editing did open a template editor (§16.3). These are distinct entry points.

##### CUS-044 Create and Edit template window 

A wide window with the form on the left and a light-blue "Private note" column on the right. Title "Create template" or "Edit template" (address-book icon). 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Company name|Text|Yes|Empty||
|Location type|Select.Options:Airport,Business with<br>dock/forklift,Business without dock/forklift,Camp,<br>Church building,Construction site,Container<br>freight station,Convention/trade show,Country<br>club,Fair/amusement park,Farm,Government site,<br>Grocery warehouse,Hospital,Hotel,Limited<br>access,Military installation,Mine site,Native<br>American reservation,Nursing home,Pier,Prison,<br>Residential,School,Self-storage,Utility site|Yes|Business<br>with<br>dock/forklift|Shown left of the<br>"LTL Services"<br>menu.|


|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|LTL Services|Menu with two groups of checkboxes.Pickup:<br>Liftgate,Inside,Single shipment,Sort&segregate.<br>Delivery:Appointment required,Liftgate,Inside,<br>Notify before delivery,Sort&segregate.|No|Nothing<br>selected|Dashed when<br>empty.Shows a<br>summary of the first<br>two choices and the<br>count.These<br>services pre-fill LTL<br>quotes for this<br>address.|
|Address|Street address with suggestions|Yes|Empty|A suggestion fills<br>street,city,state,<br>zip,county,country<br>and time zone.|
|+Address2|Link that reveals"Address2 (optional)"|No|Hidden|A trash button<br>removes it.|
|Neighborhood|Select|No|Hidden|Only when the<br>country is Mexico.|
|City,state,zip|Search box with suggestions|Yes|From the<br>address||
|Location<br>contact|Text|No|Empty||
|Contact phone|US phone,placeholder"(000) 000-0000"|No|Empty||
|Contact email<br>(send BOL<br>email to)|Several e-mails as chips,placeholder"add email";<br>suggests this customer's contacts|No|Empty|These addresses<br>receive the bill of<br>lading e-mail for<br>shipments at this<br>location.|
|Special<br>instructions|Multi-line,placeholder"optional"|No|Empty||
|Open time|Time|Yes|8:00AM||
|Close time|Time|Yes|5:00PM|When earlier than<br>open,the form<br>shows"Note:Closes<br>next day()".|
|Private note|Multi-line,placeholder"private note for your<br>team",label"visible by your team only"|No|Empty|Never shown to the<br>customer or the<br>carrier.|


Buttons: "Create" or "Save" (blue pill, bottom right). On Edit: a trash icon at the bottom left asking "Are you sure you want to delete this template?". 

- After delete, "Location template deleted" appears with an "undo" button that brings it back. If saving fails, the error shows above the footer buttons. 

##### CUS-045 Create template 

The plus button opens "Create template" with the defaults above. "Create" saves and refreshes the list. 

##### CUS-046 Edit template 

Opens with values filled in. The e-mail shows as a chip with a trash icon. "Save" closes the window. 

##### CUS-047 Template external references 

In Edit, the card "External references" with "+ Add external reference" appears when the account has reference types (CUS-035). 

##### CUS-048 Address book access 

The address list on the customer page is available to 10-4 users. How customers pick saved addresses in the portal: section 4.11. 

### Other customer functions 

##### CUS-049 Customer external references 

See CUS-035. 

##### CUS-050 Merge customers (Owner) 

The menu "..." > "Merge customer" opens "Merge customers" with the text "Transfer contacts, quotes, shipments, and notes from source customer to target customer." Fields: "Source customer" (customer picker, placeholder "select customer", required, cannot be the current customer) and "Target customer" (fixed, the customer you are on). 

- Warnings: "The source customer will be deleted. This cannot be undone." and "Some of the target's details like name, billing address, and settings will not be merged." 

- Buttons: "Cancel" and "Merge". 

- The system moves contacts, address templates, shipments, quotes, invoices, payments, documents and notes, and the source's timeline history, to the target. The source's reps are not added (the target keeps its own reps), and shipments booked by those reps keep the rep who booked them. The source's margins are discarded. Then the source customer is deleted. 

- A customer cannot be merged into itself. 

##### CUS-051 Archive customer (Owner) 

The menu "..." > "Archive customer" opens "Archive customer" with the subtitle "Hide from customer lists", and a warning "Continue at your own risk": "Archiving will remove this customer from your Customers list. Likewise, you will not be able to select them for future quotes or shipments." "Customer will not be deleted" "You will still be able to access this customer's detail through your shipment history." Buttons "Cancel" and "Archive". Afterwards the system returns to the Customers list. The menu item is hidden on an archived customer. 

##### CUS-052 Restore customer (Owner) 

An archived customer's page shows the banner "This customer has been archived" and, for Owners, "Restore customer", which puts the customer back in the Customers list. 

### Rules for who sees a customer 

##### CUS-053 Everyone on the team sees every customer 

Proposed access policy requires SC-03 approval; the source does not prove every role can see every customer under every visibility configuration. Main §19.3 describes a disabled checkbox in the sampled Member session: help says enabled restricts viewing/running quotes to customer reps, while disabled gives users all customer records. Actual API/list/search/export enforcement, team inheritance and launch scope are unverified. A no-op implementation is not supported or approved.

##### CUS-054 Owner-only actions are enforced 

The system enforces every Owner-only action in this section every time, not only by hiding buttons. A Member who tries one gets a "not allowed" answer. 

### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

|Action|Owner|Member|Customer|
|---|---|---|---|
|See the list,open a customer,search,export|Yes|Yes|No(customers use the<br>portal)|
|Add a customer|Yes|Yes,unless the"Adding<br>customers option"is on|No|
|Edit general details,contacts,notes,address<br>templates,documents|Yes|Yes|No|
|Edit name and billing details|Yes|Yes,unless the account enforces<br>credit limits|No|
|Days to pay,accounting instructions|Yes|Read only|No|
|Credit limit and credit note|Yes|Read only;can request more<br>credit|No|
|Enable or disable booking|Yes|Read only|No|
|Customer login,auto-quoting,auto-dispatching<br>switches|Yes|Yes|No|
|Margins and limits|Any<br>value|Not below the account minimums|No|
|Reps(add,remove,reorder)|Yes|Yes|No|
|Commission and commission notes|Yes|Read only(notes hidden)|No|
|Merge,archive,restore|Yes|No|No|


## 4.8 Carriers and vendors

**Evidence review — partial:** Main §§12.1/6–8, 18.2–3, Deep2 E-138 and Deep4 E-170–172 support carrier/vendor identity and entry points. Displayed FMCSA Authorized, BI/PD, Unrated, Approved and fleet counts are app labels, not independent live verification.

| Requirements reviewed | Supported portion | Proposed / unverified detail |
| --- | --- | --- |
| CAR-001–008 | Carriers/Vendors/All, search/Added/Requires1099 filters, creation chooser and carrier/vendor captions | Ten-row paging, all matching/sort/storage rules, identical rights, color/status precedence and Approve & review workflow |
| CAR-009–011 | Initial Carrier MC or DOT # input; no identifier submitted (§12.6/Deep4 E-170) | Lookup by name, 16-result limit, actual FMCSA supplier/import/data schema, add/deduplication, nightly/24-hour refresh/cache/outage policy |
| CAR-012–018 | Existing profile identity, Overview/Shipments/Payments, Approved/packet/authority/insurance/fleet indicators; Deep4 E-172 | Full government-data popup, eligibility precedence, intrastate exceptions, minimum insurance/override and approval powers/effects |
| CAR-019–024 | Packet not requested/Send request and Documents add-file; contact entry | Request recipient/wizard/expiry/completion, insurance fields/limits, automatic approval/release, document-only filters and contact behavior parity |
| CAR-025–032, CAR-035 | Terms displayed 30 days from Vendor bill, tax/external-reference/contacts/Timeline, carrier shipments/payments and related bill paths | Remit-to hierarchy, terms editor/0–120 limits, entity/1099 algorithm, Push bills autosave/rights, complete tabs/history/query/cardinality |
| CAR-036–039 | Monitoring-link preferences and factoring/remittance concepts (§18) | Link construction/data return, complete factor directory/schema/seed policy and every automatic vetting/payee approval rule |
| VND-001–002, VND-005–008 | Nine single-choice creation types; Select type gate; name/Add vendor; existing details/type checkbox/Change types and Update; §12.7/Deep4 E-171 | Creation validation/persistence, complete profile absence claims and type changes' effect |
| VND-003–004, VND-009–016 | Shipment's separate type chooser; vendor Billing/address/email, terms/tax/accounting entry; checked Push bills in sample | Five-match duplicate behavior, actual vendor assignment, save-on-blur, contacts parity, missing tabs/documents features and backend rights |

Main §12.7 notes that the sampled vendor Shipments click did not visibly leave Overview and Payments was not inspected. Do not describe the full vendor history workflow as verified. A carrier or warehouse business record is not an API integration.


In short: This part of the system keeps 10-4's list of freight carriers and of other vendors (towing, crane, warehouse and so on). For a carrier it shows the government (FMCSA) identity and safety data, tells you whether the carrier may be used (Approved, Candidate or Don't use), holds the carrier's insurance packet, contacts, payment terms and tax details, and lists the loads and payments for that carrier. Owners decide who is approved. Members can look up, add and edit most things. 

### Carriers and vendors list 

Where: the sidebar item "Carriers". The plus button next to it ("Create new vendor") opens the add window. 

##### CAR-001 List page 

The title is "Carriers / Vendors" followed by a gray count "(N of M)": N records match the search and filters, M is the total for the current tab. Next to the count is a round plus button that opens the add window (CAR-008). On the right is the filter box. 

- Three tabs under the title: "Carriers", "Vendors", "All". "Carriers" is selected when coming from the sidebar. 

Records are white cards, 10 at a time as you scroll. The list keeps the scroll position on return. 

- Order is by name, A to Z, ignoring case. There is no sort control. 

- A card opens the carrier or vendor profile and shows a blue ring on hover. 

- The page works the same for every 10-4 user. 

##### CAR-002 Carrier card 

|Part|What it shows|
|---|---|
|Status|A small circle:green=approved,red=don't use,gray=candidate.Hovering shows the reason,for example|
|dot|"Not in-service"or"Haven't worked with this carrier before".Calculated from the carrier's current government<br>data and your own decision(CAR-014).|
|Name|The carrier's name in bold.|
|Details|"USDOT", "MC-" (first MC number)and", "of the physical address(hidden on narrow screens).|
|Right|When a shipment is waiting for this carrier to be approved:an hourglass and"Requested"when a packet was|
|side|requested,or a green document icon and"Packet completed"when the carrier returned the packet.|


##### CAR-003 Vendor card 

|Part|What it shows|
|---|---|
|Icon|By the first vendor type:carrier,insurance(umbrella),lumper(hand truck),steamship line(ship),towing(tow|
||truck),transloader(forklift),customs broker,chassis,crane,warehouse.A vendor without a type uses the carrier|
||icon.|
|Name|The vendor name in bold.|
|Details|The vendor type(for example"Towing")and,when a billing address exists, ", ".|


##### CAR-004 All tab 

Shows carriers and vendors together, each with its own card layout, sorted by name. 

##### CAR-005 Search and filter window 

Clicking the filter box (tooltip "View carrier filters") opens a window: 

|Field|Input/options|Default|Rules|
|---|---|---|---|
|Search|Text with a magnifier,placeholder"search for..."|Empty|Finds name,MC or USDOT<br>number.Enter closes the<br>window.|
|Added|Eight buttons: "Today", "Yesterday", "This week", "Last week",|None|The week starts on Sunday.|
|date|"This month", "Last month", "This year", "Last year",or a custom<br>start and end date||Dates follow the browser time<br>zone.|
|1099|Checkbox"Requires1099"|Off|Shows only records that|
|Required|||require a1099.|


Active filters appear as chips in the filter box: "Created this month" (or "Created M/d-M/d") and "Requires 1099"; the x removes one. 

The footer button reads "See N carriers / vendor" (singular for 1) or "See N carriers / vendors" and closes the window. 

Filters and search stay in the page address and are remembered while navigating. 

##### CAR-006 Empty states 

|State|What is shown|
|---|---|
|No carriers|"No carriers found" (Carriers tab)or"No vendors found" (Vendors and All tabs),followed by<br>`for "`|
|found|`<search>"` when a search is set,and a blue button"Reset filters".|
|Loading|Gray placeholder cards.|
|Problem|"Something went wrong."and a blue button"Try again".|
|loading||


##### CAR-007 Approve & review carriers 

The Carriers list has a second view, titled "Approve & review carriers" (the view "Approve"), which staff open from the Carriers list. It lists only carriers that have a shipment waiting for approval. A sidebar row "Approve carriers" with a count is not part of the first version (see section 1.7). 

- A search box (placeholder "search for...", short pause before searching; finds name, MC or USDOT) and a filter icon. 

- Cards show the name, "USDOT", "MC-", city and state, the status dot, and the strip "Requested" or "Packet completed", with an orange border. A card opens the carrier profile. 

- When nothing is waiting: a pale-blue panel with "No carriers." and a button "Reset filters". The title has no counter. 

- Approving the carrier (CAR-015) releases the waiting rate confirmations (section 4.3). 

### Adding a carrier 

##### CAR-008 "What do you want to add?" window 

Opened by either plus button. A small window with two dashed tiles; hovering turns the border blue. Escape or a click outside closes it. 

|Tile|Caption|Opens|
|---|---|---|
|Carrier|"Freight carrier with MC or DOT number"|The carrier lookup(CAR-009)|
|Vendor|"Providers such as crane,insurance,warehouse,etc."|The vendor type step(VND-001)|


##### CAR-009 Carrier lookup 

A small window with one field labelled "Carrier MC or DOT #". 

- Typing (short pause) searches the government FMCSA directory by MC number, DOT number or name, showing up to 16 results under "Select carrier to add", each looking like a carrier card (dot, name, USDOT, MC, city and state). 

- No match: "No carriers found for ". 

- Clicking a result closes the window and opens that carrier's profile. The lookup itself creates nothing. If the carrier is not yet on 10-4's list, the profile shows the "Add to your list" card (CAR-010). 

##### CAR-010 Add to your list 

On the profile of a carrier not yet on 10-4's list, the right side shows a dashed orange card titled "Add to your list" with "Before you can add contacts, notes, or carrier packet info, we first need to add to your carrier list." and an orange button "Add carrier". 

- "Add carrier" saves the carrier with the status "Candidate" ("Haven't worked with this carrier before"). If the carrier is already on the list (for example another user just added it), the existing record opens. Nothing is duplicated. 

- If saving fails: "Error adding carrier". 

- The left cards (status, FMCSA) stay visible with the government data. 

Only the Overview is shown until the carrier is added; the Shipments and Payments tabs appear after. 

##### CAR-011 Government (FMCSA) data 

The source establishes app-displayed carrier identifiers/authority/safety/insurance/fleet information, not its supplier or internal storage. Main §12.6 and OQ-20 explicitly leave lookup source/import/refresh unresolved. The former claims of a mirrored government dataset, nightly refresh, 24-hour refresh-on-open, cache fallback and complete tax/contact/insurance/inspection schema are removed as unsupported facts. Define the selected licensed/public-data capability, freshness, fields and outage/approval policy during integration review (main §18.2), without assuming that a visible status is a live authority check.

### Carrier profile 

Where: a carrier card, the carrier link on a shipment, the lookup, or "Find anything". 

###### CAR-012 

##### Page layout 

1. Breadcrumb: carrier icon, link "Carriers" (back to the Carriers tab), carrier name (hidden on narrow screens), and the "Documents" button on the right. 

2. Header: the carrier name (large), then identifiers: SCAC (if any), "USDOT ", "MC-" for each MC number, "FF-", "MX-", and an outlined badge "INTRASTATE" for carriers operating only within one state. Below, a delivery icon and the city and state as a link to a map; a website link if known. LTL carriers show their logo on the right. 

3. Tabs: "Overview", "Shipments", "Payments". 

4. Content. The Overview has a left column of cards and a right area. 

##### CAR-013 Overview, left column 

In order: Status card, Packet card, FMCSA card, monitoring links (CAR-036), Contacts card, "Send payments to", "Payment terms", "Tax & entity", "Support" (LTL carriers), "Accounting integration", "External references". 

##### CAR-014 How the status is decided 

The status card shows "Approved", "Candidate" or "Don't use", with a colored dot and a reason on hover. The first matching rule wins: 

|#|Condition|Status|Reason shown|Can an Owner<br>change it?|
|---|---|---|---|---|
|1|No FMCSA record found|Candidate|"Unknown carrier"|No|
|2|The carrier is out of service|Don't use|"Not in-service"|No|
|3|The carrier is not authorized<br>(does not apply to carriers that<br>operate only within one state)|Don't use|"Not authorized"|No|
|4|The carrier has no carrier,<br>broker or freight forwarder<br>authority(not for intrastate<br>carriers)|Don't use|"No carrier,broker,or<br>freight forwarder<br>authority"|No|
|5|Safety rating is<br>"unsatisfactory"|Don't use|"Safety rating<br>unsatisfactory"|No|
|6|The carrier is not yet on10-4's<br>list|Candidate|"Add carrier to your<br>account first"|No|
|7|The carrier packet has expired<br>(CAR-020)|Keeps the status that was set|"Insurance expired"|To"Don't use"<br>or"Candidate"<br>only|
|8|Otherwise:the status an<br>Owner set|"Don't use"shows"Don't use this<br>carrier"; "Approved"shows"Manually<br>approved"; "Candidate"shows<br>"Haven't worked with this carrier<br>before"||Any of the three|


A new carrier starts as "Candidate". 

- A carrier can be red on the list although an Owner approved it earlier, because the government data now says it is out of service or not authorized. 

- A "Conditional" safety rating does not block a carrier; it is shown in the FMCSA card and warns the user at cover (section 4.3). 

##### CAR-015 Change status (Owner) 

For Owners, when more than one status is allowed, the status card is a button with a down arrow that opens a panel of the allowed statuses (dot and label; the current one has a thick colored bar on its left edge). Choosing one saves it and refreshes the card. Members see plain text. 

- When a carrier changes from Candidate to Approved, all rate confirmations waiting for this carrier's approval are sent (section 4.3). 

Every status change is recorded in the timeline with the user. 

##### CAR-016 Pending approval banner 

At the top of the right area, when shipments are waiting for approval: an orange-bordered line "This rate con will be sent when this carrier is approved" (plural when several). When the packet expired: "Looks like this carrier's insurance expired on ". 

##### CAR-017 FMCSA card 

A card with a clickable header: a green check and "FMCSA Authorized" (in service and authorized) or a red mark and "FMCSA Not authorized". Below: 

|Row|Right-hand text|
|---|---|
|Safety|The rating("Satisfactory"green, "Conditional"yellow, "Unsatisfactory"<br>red)or"Unrated"|
|Insurance|The kinds on file: "BI/PD", "Bond", "Cargo"separated by commas|
|Trucks|Number of power units,or"-"|
|Drivers|Number of drivers,or"-"|
|Clicking the card opens the FMCSA window<br>(CAR-018).||


##### CAR-018 FMCSA window 

A wide window. Header: carrier name, SCAC, USDOT, MC, MX and FF numbers, FMCSA icon. Sub-header: legal name (or " dba "), phones, e-mail, and two address columns "HQ" and "Mailing" (only when different). 

- Authority card: green "AUTHORIZED", or red "NOT AUTHORIZED" or "OUT-OF-SERVICE" with the out-ofservice date, the operation type ("Interstate", "Intrastate", "Intrastate Non-Hazmat"), the cargo types (household goods, passengers, property) and the safety rating line with its date. 

- "Trucks" and "Drivers" counts. 

- "Insurance" card: "BI/PD", "CARGO", "BOND" amounts in dollars ("-" when none) and a button "L&I" that opens the FMCSA Licensing & Insurance page. 

- "Inspections/Crashes" card: counts for "VEHICLE", "DRIVER", "HAZMAT", "CRASHES" and a button "Safer" that opens the SAFER company snapshot. 

- Footer: "Updated " and a button "View on FMCSA". 

##### CAR-019 Packet card 

Shows the carrier packet (insurance and documents the carrier gives 10-4). The whole card opens the packet window (CAR-021). 

|State|When|Card shows|
|---|---|---|
|Not<br>requested|No packet|Missing-document icon, "Packet not requested"and an outlined blue<br>button"Send request".|
|Requested|Request sent,carrier has not<br>answered|Rotating hourglass, "Document request sent", "Sent to" (time on hover)<br>and a link"Resend".|
|Completed|Carrier returned the packet|Green document icon, "Carrier docs"and"Exp. ",then rows"Gen<br>Commercial", "Auto", "Cargo"with the insurance amounts in whole<br>dollars(or"-").|


|State|When|Card shows|
|---|---|---|
|Expired|Completed packet whose|Orange document icon,the same rows,an orange footer"Insurance|
||earliest expiry date has passed|expired!"and a link"Update".|


##### CAR-020 Packet expiry 

A packet counts as expired the day after its "Earliest expiration date". The system works this out; nobody sets it by hand. An expired packet changes the status rule (CAR-014 #7) and shows the banner in CAR-016. 

##### CAR-021 Packet window 

Opened from the packet card. Header: carrier name and the SCAC / USDOT / MC row, with a "Documents" button. Body: the insurance form. 

|Field|Input|Required|Default|Rules|
|---|---|---|---|---|
|General Commercial Liability|Dollars,hint"each occurrence"|Yes|$0|Whole dollars, 0or more|
|Automobile Liability|Dollars,hint"combined single limit"|Yes|$0|Whole dollars, 0or more|
|Motor Truck Cargo|Dollars|Yes|$0|Whole dollars, 0or more|
|Earliest expiration date|Date|Yes|Empty|Not before today|


- Button "Save" (blue, full width). A saved packet is marked completed. A failure shows "Saving insurance information" followed by the reason. 

- Footer: the status text ("Updated " or "Request sent to " and the time) and the link "Request new packet". 

- Users can fill the form from an insurance certificate the carrier e-mailed, or the carrier fills it in on the secure page (CAR-022). 

##### CAR-022 Request carrier packet 

Opened by "Send request", "Resend" or "Request new packet". A small window titled "Request carrier packet" with "Ask to upload their latest carrier packet. This will send them an email". A contact picker lists the carrier's contacts that have an e-mail address; a new contact can be added there. Button "Send request". 

- The system e-mails the chosen contact a secure link (section 5). The packet card changes to "Document request sent". 

- On the secure page the carrier confirms its company details, uploads documents (authority, insurance certificate, W-9, factoring letter if any), fills in the insurance form and sees a thank-you (section 4.11). 

- When the carrier finishes, the packet card shows "Carrier docs", the files appear under "Documents", and the page updates without reloading. 

- The same request can be made from the cover screen when covering a load with a Candidate carrier (section 4.3). 

##### CAR-023 Contacts card 

Same behaviour as the customer contacts card (CUS-017, CUS-018). Heading "Contacts"; the first 3 contacts show the name in bold and the first e-mail; with none: a dashed card "+ Add contact". A round plus adds a contact. The contacts window has the same list, view, edit, order, delete and restore functions. 

- Carrier contacts are kept for 10-4 only; other brokers never see them. 

- Use the title to mark a contact as dispatcher, accounting and so on (for example "DISPATCH", "ACCOUNTING"). The cover screen lists carrier contacts when picking a dispatcher (section 4.3). 

- A contact has no customer-login switch; carriers do not sign in. 

##### CAR-024 Documents window 

The "Documents" button (icon changes when carrier packet documents exist) opens the same full-screen dark window as for customers (CUS-032) with the carrier name, USDOT and MC at the right. Only carrier packet documents are listed, newest first. Users can upload more files, open a file and remove it (with a confirmation). 

##### CAR-025 Send payments to 

Shows "Send payments to" with the address payments go to and the payment contact: the carrier's saved remit-to address, or the billing address in the government record. Hidden when neither exists. Read only here. Where one bill is paid is changed on the carrier bill (BIL-012, BIL-013), including choosing a factoring company (CAR-037). A change of payee or remit-to address is saved without a second check (CAR-039). 

##### CAR-026 Payment terms 

Shows "Payment terms" and " days from <Vendor bill | Pickup | Delivery>". The default comes from the account setting for carrier payment terms (30 days from Vendor bill at first, section 4.10). The block is clickable for Owners only (tooltip "Edit payment terms") and opens the window "When adding a bill for this vendor...". 

|Field|Input/options|Default|Rules|
|---|---|---|---|
|Set Bill date to|Three tiles: "Vendor bill date", "Pickup date", "Delivery date"|Account default||
|Pay within|Whole number of days,then"days"|Account default|0to120|


Footer note: "Default terms are <Vendor bill / Pickup / Delivery> + days". 

- Button "Save". Error: "Failed to save payment terms." 

- The terms set the due date of carrier bills (BIL-015, BIL-033). 

###### CAR-027 

##### Tax & entity 

**Tax policy unverified:** The source establishes a tax/legal-entity entry and Requires1099 filter, not the complete entity-to-1099 default algorithm below. These are draft app choices requiring accounting review; they must not be read as tax advice or legal eligibility rules.


Shows "Tax & entity", the tax ID with its type from the government record (for example "EIN"), the legal entity type and a pill "Needs 1099" when 1099 is required, or a blue link "+ Add legal entity type". Clickable for Owners only (tooltip "Edit tax related info"); opens a window:

|Field|Input/options|Default|Rules|
|---|---|---|---|
|Business<br>ID|Read-only with a lock icon, " "|From the<br>government<br>record|Shown when known|
|Legal<br>entity type|Select: "Unknown", "Corporation", "LLC as<br>corporation", "LLC as partnership", "LLC as sole<br>proprietorship", "Partnership", "Sole proprietorship"|Unknown||
|Requires<br>1099|Switch|Set from the<br>type|Corporation and LLC as<br>corporation=off;the other four<br>=on.Can then be changed.|


Button "Update". Error: "Failed to save vendor info." 

##### CAR-028 Support block (LTL carriers) 

For LTL carriers with a support phone and e-mail on file, a "Support" block with a click-to-call phone and an e-mail link. 

##### CAR-029 Accounting integration 

When the account's accounting system takes carrier bills (QuickBooks Online), the block "Accounting integration" shows "Push bills to " with a green dot (on) or gray dot (off, row dimmed). Clicking it (tooltip "Edit accounting integration settings") opens "Accounting Integration Settings" with one switch "Push bills to ", which saves at once with "Push bills on" or "Push bills off" and "undo". When off, approved bills for this carrier are not sent to the accounting system (BIL-031). Default on. Members can change it. 

##### CAR-030 Active shipments and notes (right area) 

- "Active shipments": cards of the carrier's loads that are scheduled or in transit, grouped "Scheduled" and "In transit" (like CUS-036). With none: "No active shipments". 

- Note box "+ note" (dashed) and the notes list newest first, with author and time. Notes can be edited and deleted by their author or an Owner. 

- "Timeline" (collapsed row): the history of the carrier and its contacts, with who and when: status changes, packet events, term changes and contact events. 

- "External references": rows " " or "+ Add external reference" when the account has reference types (CUS035). 

##### CAR-031 Shipments tab 

A left list of all shipments the carrier covered, newest pickup first. Rows look like rows of the Shipments list (BOL number with a status stripe, pickup, customer, origin and destination, delivery date, carrier cost). A row with a bill still being processed shows a rotating hourglass. Right: note box and notes. Empty: "No shipments". 

##### CAR-032 Payments tab 

Payments 10-4 made to the carrier, newest first. Columns: "Date", "Amount", "Method", "Reference", "# of shipments", "Credit" (PAY-012, PAY-013). Date shows as "MMM d" and adds the year when not the current 

year. Method shows the payment method and, on a second line, the memo if any. "# of shipments" shows "-" for none. A green "Credit" pill with "+$ amount" marks an unused balance. A payment opens its details (PAY010). There is no "Record payment" button here; carrier payments are recorded on the carrier bill (BIL-024). Empty: "No payments found". 

##### CAR-035 Opening a carrier from a shipment 

On a shipment the carrier card opens a window showing the same Overview as this profile (sections 4.2 and 4.3). 

##### CAR-036 Carrier monitoring links 

Three small gray icons under the FMCSA card open the carrier in an outside service, in a new tab. Each can be turned on in Settings, Carriers (section 4.10); all are off at first. 

|Link|Tooltip|Opens|
|---|---|---|
|Carrier411|"View on<br>Carrier411"|The carrier's Carrier411page,looked up by<br>the first MC number|
|CarrierOK|"View on<br>CarrierOK"|The carrier's CarrierOK profile,looked up<br>by the first MC number|
|Highway|"View on<br>Highway"|The carrier's Highway search result,looked<br>up by the USDOT number|
|These are links only;no data comes back.The ClassIT+|||
|link is on shipment lines(section4.2).|||


### Factoring company directory 

##### CAR-037 Factoring companies 

Some carriers are paid through a factoring company. The system keeps a directory of factoring companies with: name, logo, remit-to address, e-mail, phone, notice-of-assignment (NOA) e-mail, website and notes. 

- On a carrier bill, the "Mail payment to" window has a select "Factoring with" listing the active factoring companies by name with their logos (BIL-013). Choosing one fills the bill's remit-to address with the factoring company's address instead of the carrier's. 

- The directory holds no bank account numbers. 

- It is loaded before go-live with the factoring companies on 10-4's carrier bills (10-4 supplies their names and remit-to details). 

- Editing the directory on screen is not in the first version (see section 1.7). 

##### CAR-038 Reading the directory 

Users type in the "Factoring with" select to search by name. The list is the same for the whole account. 

##### CAR-039 Carrier vetting rules 

What the system checks before a carrier can be used, and what it leaves to 10-4's staff: 

|Check|What the system does in the first version|
|---|---|
|Government<br>identity and<br>authority|Works out the status from the FMCSA data(CAR-014):out of service,not authorized,no authority or<br>unsatisfactory safety rating means"Don't use".No one can change that status by hand;an Owner can<br>still cover one load with such a carrier by turning on"Override coverage status" (COV-017).|
|Insurance|Records the three insurance amounts and the earliest expiry date(CAR-021).An expired packet<br>shows"Insurance expired" (CAR-020).The system does not compare the amounts with a minimum;<br>staff read them.|
|Who may approve|Only an Owner can change a carrier to"Approved"or back(CAR-015);a Member cannot.A blocked<br>("Don't use")carrier can be used only when an Owner turns on"Override coverage status" (section<br>4.3).|
|Identity and<br>double brokering|No automatic check for a carrier that re-brokers a load or for a changed identity.Staff compare the<br>packet and the FMCSA data.|
|Payee or remit-to<br>change|A new payment address or factoring company is saved without a second approval.|


### Adding a vendor 

##### VND-001 Vendor type step 

After choosing "Vendor" in the add window, a card labelled "Vendor type" shows nine radio rows with an icon each: "Chassis", "Crane", "Customs broker", "Insurance", "Lumper", "Steamship line", "Towing", "Transloader", "Warehouse". Freight carriers are not listed (they are added by lookup). Exactly one type can be chosen. The button "Select type" (full width) is disabled until one is chosen. 

##### VND-002 Vendor name step 

|Field|Input|Required|Rules&messages|
|---|---|---|---|
|Vendor type|Read-only row with the chosen type|||
|Vendor name|Text,label"Vendor name"|Yes|Typing shows the"Did you mean?"list(VND-003).|


Button "Add vendor" (blue, full width) saves the vendor and opens its profile. On failure: "Failed to create vendor". 

Names are kept as typed. Sorting and search ignore case. 

###### VND-003 

##### Did you mean? for vendors 

While typing, up to 5 existing vendors of the same type with similar names are listed under "Did you mean?", with the typed text highlighted. Clicking one opens that vendor and closes the window. 

##### VND-004 Vendor from a shipment 

On a shipment, a vendor can also be added from the carrier and vendor area: "Add another vendor" (types as checkboxes; name required: "Name is required to add a new vendor"; a list "Or select an existing vendor..."; error "Failed to create vendor"). See section 4.2. 

### Vendor profile 

Where: a vendor card, the vendor on a shipment, or right after adding a vendor. 

##### VND-005 Page layout 

1. Breadcrumb: vendor icon, link "Vendor" (back to the Vendors tab), vendor name. 

2. Header: a large clickable area with the vendor name and a pencil (tooltip "Edit vendor details"). When set, a grid with phone (click-to-call), e-mail and website. Below it a gray button listing the vendor types with icons (empty: a question icon and "+ add vendor type"). 

3. Tabs: "Overview", "Shipments", "Payments". 

4. A vendor page has no Documents button, no packet or FMCSA cards. 

##### VND-006 Overview blocks 

Three columns on wide screens (blocks, Active shipments, notes), two on narrower ones. 

|Block|What it shows|Who can open the<br>editor|
|---|---|---|
|Vendor types|One row per type with icon and name|Everyone|
|Contacts|Same card as for carriers(CAR-023).Empty: "+Add<br>contact".|Everyone|
|Billing|Heading"Billing",the billing address with a copy icon and<br>the billing e-mails;empty: "no address on file"|Everyone(tooltip<br>"Edit billing info")|
|Payment terms|"days from<Vendor bill/Pickup/Delivery>" (rules as<br>CAR-026)|Owner|
|Tax&entity type|Heading"Tax&entity type",the legal entity type and a<br>"Needs1099"pill,or"+Add legal entity type"|Owner|
|Accounting integration|Same block as CAR-029|Everyone|
|Active shipments|Loads with this vendor that are scheduled or in transit.<br>Empty: "No active shipments".||
|Notes|"+note"box and the notes list|Everyone|
|There is no"External references"or<br>"Support"block on vendors.|||


##### VND-007 Edit vendor details window 

Opened by the header pencil. Saves with "Update". Error: "Failed to save vendor info." 

|Field|Input|Required|Rules|
|---|---|---|---|
|Vendor name|Text|Yes||
|Phone|US phone|No||
|General Email|Text|No||
|Website|Text|No||


##### VND-008 Vendor type window 

Title "Vendor type". Checkbox cards for the nine types (CAR-003 icons; blue border and check when selected), the current types preselected. A vendor can have several types. Button "Change types". Error: "Failed to update vendor types". A vendor with no types shows "+ add vendor type". 

##### VND-009 Billing window 

**Save boundary unknown:** Main §12.7 did not establish a Done/Save action or autosave boundary in the vendor billing preview. The immediate persistence/undo rules below are proposed, not verified.


Title "Billing" (payment icon). Saves as you go; no Save button. After each save: "Billing info saved" with "undo". Error: "Failed to save billing info." 

|Field|Input|Required|Rules|
|---|---|---|---|
|Billing|Button showing the address,or the box"+billing address";|No|Saved when the address window|
|address|opens the address window(company,street lines,city,<br>state,zip,country USA/Canada/Mexico)||closes with a change.|
|Billing|Several e-mails as chips,placeholder"+billing email";|No|Each added or removed e-mail|
|email|suggests the vendor's contacts'e-mails||saves at once;a typed address is<br>added when you leave the box.|


The vendor's payment contact (name, e-mail, phone) is read on bills and payments but changed from the contacts card. 

##### VND-010 Payment terms window 

Same as CAR-026 (Owner). 

##### VND-011 Tax & entity type window 

Same as CAR-027 with the select labelled "Business Entity" and without the "Business ID" row (Owner). 

##### VND-012 Accounting Integration Settings 

Same as CAR-029. 

##### VND-013 Vendor Shipments tab 

Header "All shipments" with a spinner while loading, then the loads that used this vendor, newest pickup first (rows as CAR-031). Right: note box and notes. Empty: "No shipments". 

##### VND-014 Vendor Payments tab 

Same as CAR-032 (payments 10-4 made to the vendor); opening a payment shows its details; no "Record payment" here. 

##### VND-015 Vendor contacts 

Same as CUS-018 for the vendor. 

##### VND-016 Vendor documents 

Vendors have no documents screen in the first version. Files for a vendor are attached to the shipment. 

### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

|Action|Owner|Member|Customer/Carrier|
|---|---|---|---|
|See the list and profiles,search,filter|Yes|Yes|No|
|Look up and add a carrier,add a vendor|Yes|Yes|No|
|Change carrier status|Yes(as<br>allowed in<br>CAR-014)|No(read only)|No|
|Edit payment terms,tax and entity, 1099|Yes|No(not shown<br>as clickable)|No|
|Edit vendor details,vendor types,billing,contacts,notes|Yes|Yes|No|
|Request a packet,save packet insurance,manage packet<br>documents|Yes|Yes|No|
|Push bills switch|Yes|Yes|No|
|The carrier fills in its own packet|||Carrier,on the<br>secure link(section<br>4.11)|
|The system enforces every Owner-only action every time,not<br>only by hiding buttons.A Member who changes status,payment<br>terms or entity type gets a"not allowed"answer.||||


## 4.9 Reports, Lanes and Commissions

**Evidence review — partial:** Main §19.5/E-102–104 records nine reporting destinations (Lanes plus eight saved export definitions), selected columns, filters and limited lane arithmetic. Report names are account configuration, not a standard product catalog. No report was edited/downloaded or reconciled.

| Requirements reviewed | Established observation | Proposed / unverified detail |
| --- | --- | --- |
| RPT-001–006 | Reporting hub/saved definitions, Filters/Columns/Download, preview counts; disabled Name this report | Universal starter reports, all layout/icon rules, creator/Owner/team access, locks and not-found behavior |
| RPT-007–013 | Label/reorder/remove controls visible, without changes | Every rename/save/clone/delete/share flow, name uniqueness/100-char bounds, 100-entry sharing cap, autosave/race policy and base-report locks |
| RPT-014–018 | Shipment/Customer/Carrier filter dictionaries and sampled saved choices; carrier uses Filter singular | Exact match/search/date/sort/persistence semantics, 24/10-row caps and full paging/CSV relation |
| RPT-019–023, RPT-029 | Column catalogs/selected lists, names can differ (Carrier vs Carrier Name; Last Shipment Date vs Last Booked Date) | Counts/catalog labels now observed in V-03–05/C.1–3; hard limits, field-search/keyboard rules, editing/uniqueness/clear behavior remain unverified |
| RPT-024–027, RPT-030 | Download control and a matching count | Actual CSV encoding/format/row grain/ordering/full count, formula protection, 10,000 cap, filenames, errors and live-refresh policy |
| RPT-028 | LTL Report/Shipments/copies select 14 fields; LTL Report - QF and Monthly Margin select 48 each | Titles do not define filters; no clone day-one recreation or permission promise |
| LAN-001–012 | Lanes map/table, Pickup this week, observed filters, Origin/Destination/Shipments/Profit/Profit per; sampled ratio | Full grouping/direction/map/focus/sorting/state algorithms, exclusions, zero-cost profit basis, 20,000 cap, external-role access and export |
| COM-001–006 | Shipment/customer Reps/commission controls exist (§§12.5/15.5) | Separate Commissions report/page/schema/CSV/limits/date defaults/Owner-only rules are not established by the source; all remain proposals |

**Observed arithmetic only:** One lane row has 2 shipments, profit800, profit per400; sampled total25/2195/87.80. This supports division for those examples, not the underlying accounting source, vendor-cost inclusion or settlement basis. Indexed handling-unit columns do not prove a maximum of three items.


- In short: The "Reporting" area is where 10-4 staff pull data out of the system. It has three parts. Saved data exports (shipment, customer and carrier reports) let you filter rows, choose and order columns, preview the result and download a CSV file. Lanes shows where 10-4 hauls freight on a map and in a table, with profit per lane. The Commissions report (Owner only) downloads the commissions earned in a date range. Owners and Members use the first two; customers and carriers cannot open any of this. 

### Reporting hub 

Reached from "Reporting" in the left menu. Staff only (Owner and Member). Customers and carriers see "Page not found". 

##### RPT-001 Reporting hub page 

Title "Reporting", with two columns side by side: "Analytics" on the left and "Data exports" on the right. Both always show. 

###### RPT-002 

##### Analytics: the Lanes tile 

Under "Analytics" there is one card, "Lanes", with a map icon on a soft grey grid background (the only analytic in the first version). It opens the Lanes page (LAN-001) and gets a blue outline on hover. 

###### RPT-003 

##### Data exports list 

Under "Data exports" the system lists every saved report the user may see (RPT-004), one card per report, sorted by name A to Z. A small spinner shows next to the title while loading. 

- Each card shows the report name, a lock icon when the report is a base report or the user cannot edit it, and an icon for the report type. The whole card is a link that opens the report. 

- The hub has no create, rename, delete or share controls; those are inside each report (RPT-007 to RPT013). 

|Report type|Icon|
|---|---|
|Shipment report|hand truck with a box|
|Customer report|group of people|
|Carrier report|truck|
|Commissions|download arrow|


The lock is only a hint: a locked report still opens and can be used, filtered and downloaded. 

##### RPT-004 Which reports a user sees 

Every account starts with three base reports: Shipments, Customers and Carriers (RPT-011). 

- A report not shared with specific users or teams (RPT-013) is visible to every Owner and Member. 

- A report shared with specific users or teams is visible only to the Owner, its creator, the listed users, and members of the listed teams. 

- The Commissions card appears for Owners only and opens the Commissions report (COM-001). 

##### RPT-005 Opening a report that does not exist 

A link to a report that does not exist (or one the user may not see) shows "Report not found". While the list is still loading, a spinner shows, never "Report not found". 

### Report builder (shipment, customer and carrier reports) 

The three report types share one layout and the same rules; differences are per type. 

##### RPT-006 Builder layout 

- Header: a back arrow to the Reporting hub, the report name in an input ("Name this report"), and on the right a "Users" button (RPT-013) and a "..." menu with "Duplicate" and "Delete". 

- Change bar under the header; shows only with unsaved changes (RPT-008) or an error. 

- Main card with tab "Filters" (on the carrier report "Filter"), tab "Columns", and a blue button "Download shipments" (or "Download customers" / "Download carriers") on the right. 

- "Filters" tab: filter controls on the left, live preview of matching rows on the right. "Columns" tab: column catalogue on the left, selected columns on the right. 

- The browser tab title is the report name. 

##### RPT-007 Rename a report 

- The name input is editable only if the user may edit the report and it is not a base report (pencil icon beside the name); otherwise it is locked with a lock icon. 

- Names are 1 to 100 characters, trimmed, and unique in the account. 

- A rename is saved with "Save" (RPT-008); nothing is saved while typing. 

##### RPT-008 Save, Save as new and Revert 

The change bar appears as soon as the name, filters or columns differ from what is saved. 

|Button|Style|When it shows|What it does|
|---|---|---|---|
|Save|blue|the user may edit|Saves name,filters and columns.Disabled while an error|
|||this report|shows or the column list is empty or has an error.|
|Save as|blue,outlined|always,when there|Creates a new report from the current screen and opens it.|
|new||are changes|Same disabled rule as Save.|


|Button|Style|When it shows|What it does|
|---|---|---|---|
|Revert|grey,outlined,with a|always,when there|Puts name,filters and columns back to the last saved|
||refresh icon|are changes|version.Nothing is saved.|


- Filter changes on a base report also show the change bar ("Save as new" or "Revert"). On a base report "Save" is available only when the columns changed, and saves the columns only (never the filters). 

A red banner shows the error text and clears as soon as the user changes the name, a filter or a column. 

|Message|When|
|---|---|
|There is another report definition with this same name.Make the<br>name unique,then try again.|The name is used by another report.|
|You are not allowed to edit this report definition You can|A user without edit rights tries to save,delete or share.|
|duplicate it instead.||
|another column has this name|Two selected columns have the same header(shown in<br>red next to the column).|


##### RPT-009 Duplicate 

"Duplicate" in the "..." menu (always available) copies the report (name, filters, columns, sharing list) and opens the copy. 

- The copy is named " copy"; if taken, the next free number: " copy 2", " copy 3". The number replaces the old one (never "copy 2 3"). "Save as new" (RPT-008) names the copy the same way. 

- A user or team in the sharing list that no longer exists is dropped from the copy. 

##### RPT-010 Delete 

"Delete" in the "..." menu is disabled for base reports and for users without edit rights. It opens a confirmation: title "Delete report?", text "" will be deleted for everyone., buttons "Delete" (red) and "Cancel". After deletion the user returns to the Reporting hub. A failed delete shows the error text in the red banner, or "Something went wrong". 

##### RPT-011 Base reports 

Every account has three base reports that cannot be renamed, deleted or shared: 

|Base<br>report|Starting columns|
|---|---|
|Shipments|Equipment,Carrier(the"Carrier Name"column),USDOT,MC Number,Cost,Price,Profit,Margin,Pickup<br>Date,Delivery Date,Origin Postal Code,Destination Postal Code,Total Weight,Mode|
|Customers|Name,Website,Phone,Description,Primary Contact,Primary Contact Email,Primary Contact Phone,<br>Shipments,Last Shipment Date(the"Last Booked Date"column),Last Note Date|
|Carriers|Name,USDOT Number,MC Number,Phone,HQ City,HQ State,Compliance Status,Primary Contact,Primary<br>Contact Email,Primary Contact Phone|


- An Owner can change the columns of a base report and save them; everyone else can change them on screen and use "Save as new". 

- Base reports have no saved filters. 

- The "Export" buttons on the Shipments list and the Customers list download the columns of the matching base report, so they follow an Owner's change. 

##### RPT-012 Who may edit a report 

- The Owner can edit every report except the locks on base reports (name, delete, share). The creator can edit their report. 

- Everyone else can open, filter, preview and download it, and use "Duplicate" or "Save as new" for their own copy. 

Anyone who may see a report may download it. 

##### RPT-013 Share a report: "Users & Teams" 

The "Users" button (hover text "Manage report permissions") shows an avatar stack of the people and teams the report is shared with (up to 3 avatars, then "+N"). It shows only when the user may edit the report, it is not a base report, and there are no unsaved changes. 

The button opens the "Users & Teams" window: 

- An input "+ add user" (only for users who may edit). Typing lists matching teams first, then users, with the match highlighted. An entry already in the list is greyed out with a check mark. 

- With an empty list and empty input the window says "All users can view this report" and "Add a user or team to limit access". 

- The list has the header "User" and one row per user or team, with a trash icon "Remove access for " (only for users who may edit). 

- An entry whose user or team no longer exists shows "Removed user" or "Removed team" and can be removed. 

- Every add or remove is saved at once; no Save button. While saving, the input and trash icons are disabled and the window cannot be closed. If saving fails, the list returns to the last saved list and red error text shows under the input. 

- A blue "Done" button below the window closes it. 

Rules: 

- An empty list means every Owner and Member can see the report; a filled list limits it (RPT-004). Listed users and teams can view and download, not edit. 

- At most 100 entries, no duplicates. A new entry must be an existing user or team of the account ("Unknown user or team" otherwise). 

- A base report is always visible to every user and cannot be shared ("A base report is always visible to every user."). 

- If two people change the same sharing list at the same moment, the last change wins. 

#### Shipment report: Filters tab 

##### RPT-014 Shipment report filters 

The same filters as the Shipments list filter window. The status filter offers all six statuses. 

|Filter|Input/options|Notes|
|---|---|---|
|search for...|free text|Matches like the list search.Applies<br>after a short pause.|
|Status|checkboxes:Requested,Booked,Scheduled,In transit,Delivered,<br>Canceled|Each with its status dot. "Scheduled"<br>shows for staff users.|
|Equipment|12checkboxes:LTL,Dry Van,Flatbed,Refrigerated,Intermodal,<br>Drayage,Dump,Dry Bulk,Power Only,Driveaway,Auto Transport,<br>Tanker;link"Select truckload" / "Unselect truckload"|"Select truckload"ticks every group<br>except LTL.Ticking LTL limits the<br>report to LTL shipments.|
|Booked<br>date|date range with calendar,plus presets Today,Yesterday,This<br>week,Last week,This month,Last month,This year,Last year||
|Pickup date|date range,plus presets Today,Tomorrow,Yesterday,This week,<br>Next week,Last week,This month,Next month,Last month,This<br>year,Last year||
|Delivery<br>date|same as Pickup date||
|Origin<br>address|area picker("Area")||
|Destination|area picker("Area")||
|Carrier|picker"select a carrier"||
|Customer|picker"select a customer",with"Recently shipped"and"Recently<br>selected"||
|Rep|picker"select a team or user"|Staff only.|
|Booked by|picker"select a team or user"||
|Covered by|picker"select a team or user"||


Active filters show as chips with an x to clear them. 

The filter window's footer button "See N shipments" is not shown inside a report; the preview shows the result. 

##### RPT-015 Shipment report preview 

A scrolling list of matching shipments in the Shipments list row layout, newest pickup first unless saved with another sort. It loads 24 rows at a time; the scroll position is remembered during the session. 

Empty state: "No shipments" with a dashed link "+ shipment" that opens the new shipment form. 

The number in "Download shipments" is the total number of matching shipments. 

#### Customer report 

##### RPT-016 Customer report filters and preview 

- The tab is "Filters": a search box ("search for...") and, for staff users, "Rep" (picker "select a team or user"). A user lists the customers assigned to that user or to a team the user belongs to; a team lists the customers assigned to that team. 

- The preview is the Customers list table with sortable headers "Customer", "/ contact", "Booked", "last", "Quoted", "last", "Credit", "Rep". Each row opens the customer. 

- Sorting the preview is a view setting only; it is not saved, and the CSV is always in customer-name order. The report covers all non-archived customers, for every Owner and Member. 

- "Download customers" shows the number of matching customers. No row paging in the preview. 

#### Carrier report 

##### RPT-017 Carrier report filters and preview 

The tab is "Filter" (singular). Filters: 

|Filter|Input/options|
|---|---|
|search|free text.Matches the carrier name,and also a USDOT or MC number such as"MC-123", "DOT123"or<br>"USDOT123".|
|Added date|date range with calendar and presets Today,Yesterday,This week,Last week,This month,Last month,This<br>year,Last year.The date is the day the carrier was added to10-4TMS.|
|1099|on/off switch.When on,only carriers that require a1099are included.|
|Required||


- The preview shows carrier cards like the Carriers list (status dot, name, "USDOT n MC-n City, ST zip"), 10 at a time, loading more on scroll. 

- The report covers carriers in the Carriers list, not other (non-carrier) vendors. 

- "Download carriers" shows the number of matching carriers. 

##### RPT-018 Saved filters stay relative 

A saved report keeps date presets as presets: one saved with "This month" always means the current month when opened. Pickers keep the chosen customer, carrier, rep, booked by and covered by. Empty filters are not saved. A value that cannot be used (for example a date range ending before it starts) is not accepted when saving. 

#### Columns tab 

###### RPT-019 

##### Column catalogue and "find field..." 

- The left side lists all columns the report type offers, under category headings (full lists in Appendix C). Headings are bold and open and close by click or keyboard. 

- Shipment report: all categories open except "Handling Units", which starts closed. Customer and carrier reports: all open. 

- The input "find field..." (with an x to clear) filters the list as the user types, by case-insensitive text match on the column name. While searching, every category is open and a category with no match is hidden. 

- A column already in the report is shaded with a minus sign; a column not yet added shows a plus sign on hover. 

##### RPT-020 Add and remove columns 

- Clicking a catalogue column adds it at the end of the selected list (once only). Clicking a selected column removes it; each selected row also has a trash icon ("Remove column "). 

- Observed catalog sizes are189/68/31 (V-03–05; Appendix C). Minimum/maximum selected-column counts remain unverified; catalog membership does not prove a hard selection limit.

- A live count " columns" shows at the top right of the selected list. 

##### RPT-021 Reorder columns 

The selected list is the column order of the CSV file. Each row has a drag handle; keyboard users focus a row and press Alt+Up Arrow or Alt+Down Arrow. The order is saved with the report. 

##### RPT-022 Rename a column header 

Each selected row shows the header text, plus the catalogue name in grey brackets when they differ, for example "Carrier (Carrier Name)". The pencil button ("Edit label") turns the row into an input. 

- Enter or leaving the input saves the header; so does the green check button ("Save label for "). An empty input resets it to the catalogue name. 

- The header is the first row of the CSV file; 1 to 100 characters. 

- Headers must be unique in a report. A duplicate shows "another column has this name" in red on the later row; "Save", "Save as new" and "Download" stay disabled until fixed. 

##### RPT-023 Clear all columns 

A red outlined button "Clear all columns" (trash icon), shown only to users who may edit the report, removes every selected column. With no columns, "Save" and "Download" are disabled (no message). 

#### Download 

##### RPT-024 Download CSV 

The blue button "Download shipments" (or customers / carriers) downloads one CSV file with the matching rows and selected columns in the selected order, using the current on-screen filters and columns even if unsaved. 

- File name: " Shipments .csv" ("Customers" or "Carriers" for the other types). 

- The button is disabled while the file is prepared (a spinner shows), with no columns or a column error, and when 0 rows match. 

- Preview paging is ignored: all matching rows are exported (limit in RPT-026). 

- Any Owner or Member who can open the report can download it. 

##### RPT-025 CSV file format 

First row: column headers. One row per shipment, customer or carrier. 

- Row order: shipments in the preview sort (newest pickup first unless saved otherwise); customers and carriers by name A to Z. 

- Text values as stored. Cells starting with =, +, - or @ are protected so spreadsheets do not run them as formulas (negative numbers unaffected). 

- Money: dollars with 2 decimals, no currency sign (475.00). Percent: 1 decimal, no % sign (13.6). Dates: yyyy-MM-dd. Yes/No columns: Yes or No. Whole numbers: digits only. Other numbers: up to 2 decimals. Missing values: empty cell. 

- The status column shows the stored status word: requested, booked, scheduled, in-transit, delivered, canceled. 

- A column with no data for a row (for example "Driver" before a carrier is assigned, or "Weight 3" on a shipment with two lines) is empty. 

##### RPT-026 Row limit 

One download holds at most 10,000 rows. When more match, the builder shows a grey hint under the tabs: "Only the first 10,000 shipments are exported." ("customers" / "carriers" for the other types). The file holds the first 10,000 rows in preview order. 

##### RPT-027 Download messages 

|Message|When|
|---|---|
|Download will start soon|The download starts(green,short).|
|Download failed|The file could not be created or saved(red,with a"close"button).|


##### RPT-028 Starter reports for 10-4's existing Quote Factory reports 

Main §19.5 records these dated saved definitions:

- **LTL Report:** 14 selected fields, with no status/equipment checked in the sampled view; its name did not restrict it to LTL.
- **LTL Report - QF:** LTL plus Requested/Booked/Scheduled/In transit/Delivered, Canceled unselected; exactly 48 selected fields documented. A one-customer filter was not established.
- **Monthly Margin:** Deliver this month (October1–31 in the sample), no selected status restriction, exactly 48 documented fields. This is an export definition, not a verified delivered/paid accounting aggregate.
- **Shipments, Shipments copy, Shipments copy 2:** the sampled 14 selected fields and no checked equipment/status; no hidden equality or universal starting schema is inferred.

Appendix C reproduces the source selected lists and the separately verified current catalogs (V-03–05). Recreating/saving them in the clone requires approved scope and report rights.

##### RPT-029 More columns 

Main §19.5 records selected lists; targeted read-only app checks V-03–05 now establish the current189/68/31 catalogs reproduced in Appendix C. Additional configuration/role/version changes and actual exported values require review; catalog counts are not hard selection limits.

##### RPT-030 Other users' changes 

A report list or sharing change made by another user shows after a page reload; it does not update live. 

### Lanes 

Reached from the Lanes tile on the Reporting hub. Back arrow to the Reporting hub and title "Lanes". Staff only (Owner and Member); customers and carriers see "Page not found". 

##### LAN-001 Lanes page layout 

Top to bottom: the title row (back arrow, "Lanes", a spinner while data loads, the filter box on the right), a map card, and the lane table. 

##### LAN-002 Filter box and default filter 

- The filter box shows active filters as chips. On opening, one chip shows: "Pickup this week" (week starts Sunday). An x on a chip removes that filter, for example to see all time. 

- Clicking the box opens the shipment filter window ("View shipment filters") with the Shipments list filters: search, Status, Equipment, Booked date, Pickup date, Delivery date, Origin address, Destination, Carrier, Customer, Rep, Booked by, Covered by (options in RPT-014). 

- Here the Status list offers only Booked, Delivered, In transit and Scheduled (Scheduled is for staff users). 

- The footer button "See N shipments" closes the window; N is the number of matching shipments. 

- Filters stay while the user moves around in the session and are part of the page address. 

##### LAN-003 Which shipments are counted 

Draft shipments are never counted. 

- With no status picked, the page counts Booked, Scheduled, In transit and Delivered; Canceled and Requested are not counted. 

- Everything else follows the filters. 

##### LAN-004 How lanes are formed 

- The origin and destination of a lane are the city and state of a shipment's first and last stop, like "Austin, TX". A stop with no city shows as "Unknown". 

- One map line and one table pair stands for the two cities. Shipments from A to B are outbound for A; shipments from B to A are inbound for A. A shipment starting and ending in the same city counts as outbound. 

- In the table each direction is its own row (A to B with its count and profit; B to A with its count and profit). 

- Profit per equals profit divided by shipment count in the sampled nonzero rows. The underlying cost/price source, added vendor charges and treatment of loads without quotes are unverified; the former zero-profit-without-quote rule had no supporting evidence (main §19.5).

##### LAN-005 Map 

A map of the continental United States sits above the table on a grey card. 

- Dots mark each city. Bigger dots mean more shipments (inbound plus outbound); there is a maximum and a minimum dot size so every dot stays visible. 

- Dot colour shows direction: a city that only ships out is light (white-grey), a city that only receives is solid blue, a mix shows both colours in proportion. 

- Lines join the two cities of each lane. Arrows show direction: toward the destination for outbound shipments, the other way for inbound. 

- Tooltip: pointing at a dot shows the city name in bold, then "N outbound" and "N inbound". 

- The map opens centred on the average position of all lanes; with no lanes, a default view of the middle of the country. 

- Cities outside the map area (for example Canada or Mexico) show at the nearest edge. A lane whose city has no map position appears in the table but not on the map. 

##### LAN-006 Focus on one city 

Clicking a dot, or an origin or destination name in the table, focuses that city: the map and table show only lanes touching it, and Totals is recalculated. Clicking the same city again clears the focus. No chip shows for the focus. 

##### LAN-007 Lane table 

A sticky header strip and one white card row per lane direction. 

|Column(header)|Meaning|Shown to|
|---|---|---|
|Origin|start city and state|all staff|
|Destination|end city and state|all staff|
|Shipments|number of shipments in this direction|all staff|
|Profit|total profit of those shipments|staff users|
|Profit per|profit divided by the number of shipments|staff users|


Money is dollars with cents and thousands separators, negatives with a minus sign ($1,800.00, -$50.00). On narrow screens the number cells stack at the right of each row. 

##### LAN-008 Sorting the lane table 

Each header is a button. The table opens sorted by "Shipments", largest first. Clicking a new header sorts ascending; clicking the same header again flips the direction. The active header is blue with an arrow. Numbers sort by value, text alphabetically. 

##### LAN-009 Totals row 

The last row (grey background, bold) shows "Totals" in the Destination cell, total shipments, total profit, and profit per shipment (total profit / total shipments). It follows the filters and city focus and is not clickable. With no lanes: 0 shipments and $0.00. 

##### LAN-010 Empty state 

With no matching lanes the table shows "No matching lane data" and a blue button "Reset filters", which restores "Pickup this week" and clears the focus. The map shows its default view. 

##### LAN-011 Loading and errors 

- A spinner next to the title shows while lanes load. The previous result stays visible until the new one arrives, and a late answer for an older filter is ignored. 

- If lanes cannot be loaded, the page shows the error message instead of an empty or stale table. 

- The Lanes page covers at most 20,000 shipments. With more, the page shows "Too many shipments for lanes; narrow the filters". 

##### LAN-012 Profit columns are staff only 

"Profit" and "Profit per" are visible to Owners and Members. Customers and carriers cannot open the Lanes page, and profit is never sent to them. 

### Commissions report 

Reached from the "Commissions" card in the Data exports list (Owners only). Page title "Commissions report", with a back arrow to the Reporting hub. Unlike the other reports it has no preview, no columns tab and no saved versions: a single form that produces one CSV file. 

##### COM-001 Who can use it 

Owner only. The "Commissions" card is not shown to Members. A Member who opens the address directly sees "Page not found" and cannot download the file. 

##### COM-002 The form 

A centred white panel with these fields from top to bottom. 

|Field|Input/options|Required|Default|Rules&messages|
|---|---|---|---|---|
|Shipment<br>date of|five choice cards with a calendar icon:<br>Booked,Picked up,Delivered,Invoiced,<br>Paid|Yes<br>(one)|Booked|Chooses which shipment date<br>the From/To range applies to<br>(COM-003).|
|From|date picker(calendar icon,opens a<br>calendar;shows a date like"Tue,Sep<br>1")|Yes|First day of last<br>month||
|To|date picker|Yes|Last day of the<br>month of<br>"From"|If"To"is before"From": "Date<br>range is invalid"and nothing is<br>downloaded.|
|Rep<br>(optional)|picker"select a team or user";groups<br>"Recently selected" (last5)and"Reps"<br>(teams first,then users)|No|empty|Empty means all reps.Clearing<br>the text empties the choice.|
|Download|blue full-width button|||Spinner and disabled while the<br>file is created.|


##### COM-003 Meaning of "Shipment date of" 

Only shipments with the chosen date inside the range (first and last day included) are included. 

|Choice|Date used|
|---|---|
|Booked|the date the shipment was booked|
|Picked up|the date the first stop was picked up|
|Delivered|the date the last stop was delivered|
|Invoiced|the date the customer invoice was sent|
|Paid|the date the customer invoice was paid in full|


Draft and canceled shipments are never included. 

##### COM-004 What the report contains 

- One row for each shipment and each rep with a commission set on that shipment. 

- With a rep chosen, only that rep's rows are included: a team matches rows of that team; a user only that user's rows. 

- A commission is either a percent of the shipment's profit or a flat amount; the payout column holds the resulting dollars. 

- A commission marked as paid on the shipment uses the amount frozen at that time (section 4.2, "Reps"). 

- Rows are ordered by rep name, then shipment date, then BOL. 

- The header row is always present, even with no matching shipment. 

##### COM-005 CSV columns 

|Column|Meaning|
|---|---|
|Rep|name of the user or team|
|Rep Type|User or Team|
|BOL|shipment BOL number|
|Shipment Date|the date chosen in"Shipment date of" (yyyy-MM-dd)|
|Customer|customer name|
|Origin|pickup city and state|
|Destination|delivery city and state|
|Price|customer price|
|Cost|carrier cost|
|Gross Profit|price minus cost|
|Commission Type|%or $|
|Commission|the percent or flat amount set for the rep|


|Column|Meaning|
|---|---|
|Payout|the dollars the rep earns on this shipment|
|Paid|Yes or No|
|Paid Date|date the commission was marked paid(empty if not paid)|


Money uses 2 decimals without a currency sign. 

##### COM-006 File name and messages 

File name: "commissions-report .csv". 

|Message|When|
|---|---|
|Date range is invalid|"To"is before"From".|
|Download will start soon|The download starts.|
|Download failed|The file could not be saved.|
|Failed to generate report|The report could not be created.|
|Too many shipments for one report;narrow the date range|More than10,000shipments match.|


### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

|Action|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|Open the Reporting hub and Lanes|Yes|Yes|No("Page not<br>found")|No|
|See Profit and Profit per on Lanes|Yes|Yes|No|No|
|Open,filter,preview and download a<br>report they can see|Yes|Yes|No|No|
|Duplicate a report or Save as new|Yes|Yes|No|No|
|Rename,save,delete or share a report|Every non-base<br>report|Only reports they created|No|No|
|Change the columns of a base report<br>and save|Yes|No(use Save as new)|No|No|
|See reports limited to other users|Yes(all)|Only if listed,in a listed team,<br>or the creator|No|No|
|Commissions report|Yes|No|No|No|


## 4.10 Settings, Users, Account, Profile and Signin

**Evidence review — partial:** Main §§17.6, 18–19 and E-99–108 establish selected Member settings views, not Owner administration, authentication transactions or enforcement. All precise bounds, messages, save/autosave rules and role grants below are proposals unless supported in the following table.

| Requirements reviewed | Supported evidence | Proposed / unverified detail |
| --- | --- | --- |
| SET-001–005 | Settings hierarchy, carrier/customer/accounting/external-reference/notification entry points (§19.1–3) | Import tile, full catalog/description/layout/version/close behavior, universal read-only settings and save contract |
| SET-006–011 | Checked disabled packet/terms options, Public link/Request change, Terms & Fees; shipment-value unchecked disabled; email/phone override help and Save; future-shipments/drop instruction (§19.2) | Agreement loaded by Stackup/no editor, legal adoption, term version/snapshot, editor formatting/50,000 cap and actual sends |
| SET-012–015 | Trucker Tools named; Compliance None selected; monitoring/ClassIT+ Not showing links; DAT Authorization failed in cover (§18/Deep2 E-138) | Connected health/MacroPoint exclusion, exclusive active tracker, compliance supplier/secondary logic, Stackup setup contract, DAT connected/Truckstop not connected and no-op cards |
| SET-016–022 | Global and per-carrier defaults/min margin/min profit/max profit, Volume boost; mode-specific carrier hiding; login/credit/visibility help (§19.3) | Autosave/precedence/boost/math/limits, global automation values, accepted overrides/permissions, no-op visibility/notification implementation and launch credit value |
| SET-023–030 | Oct26 mapped QuickBooks; customer/vendor30-day examples; Not factoring; Not providing QuickPay, disabled3days/2.5% (§17.6) | All connect/revoke/sync effects, Cc caps/delivery, term precedence, factor/QuickPay enablement, saved-for-later/no-effect claims and finance rights |
| SET-031–035 | Empty definitions; Add form with Name/Code, five checked entity types/URI fields, uniqueness checked and Save (§19.1) | Role denial, code normalization/immutability, bounds/escaping/placeholders, uniqueness scope, deletion/backfill and which entities can enter values |
| SET-036–037 | Notifications says No sources configured (§19.1) | Per-user save behavior and staff Settings/Data export page/schema/access are unverified; no sources does not mean all email/SMS is off |
| USR-001–011 | Owners/Members groups; sampled Member card and disabled unchecked Owner checkbox (§19.1) | Invite/resend14-day expiry, role/removal/last-Owner/self rules, complete card controls, counts and unknown-link behavior |
| USR-012–020 | Teams No teams quite yet! in Member session | Owner creation/team edit/member/manager/commission rights and all constraints/errors |
| ACT-001–008 | Company summary/no edit controls in sampled Member view; Profile name/email/phone/photo/Save/Change password/Log out (§19.1) | Owner form, branding mapping, 5MB formats, requiredness/lengths/phone policy and save effects |
| ACT-009–025 | Change password and Log out entry points only | Full login/invite/signup/reset/email-change screens, passwords/session revocation/rate limits, token durations (14days/24hours/60minutes) and exact errors |

A field being disabled in one Member sample does not prove every Member setting is read-only; the Member external-reference Add form was actually inspected. Alternate-role/API denial tests remain required (SC-03/05).


In short: what an Owner sets up once and a Member reads: Settings pages (carriers, customers, accounting, external references, notifications), users and teams, the company profile, each person's profile, and the sign-in, invite and password-reset pages. Customers and carriers never see Settings. 

### 4.10.1 Settings home and shared page frame 

##### SET-001 Settings home page 

Reached from "Settings" in the left navigation; staff only. A grid of tiles (four across on a wide screen), each with an icon, bold title and short grey description; hover shows a blue ring. 

|#|Tile|Description(exact)|Opens|Extra|
|---|---|---|---|---|
|1|Your profile|"Update your name,photo,email,phone<br>and password"|Your profile|Your photo or<br>initials as the icon|
|2|Company|"Update company name,and logo"|Company|The company logo<br>as the icon|
|3|Users|"Manage people"|Users|Count chip:number<br>of users|
|4|Teams|"Manage groups of people"|Teams|Count chip:number<br>of teams|
|5|Carriers|"Carrier integrations,legal agreements,<br>and rate confirmations."|Carriers settings||
|6|Customers|"Set global margins,customer login,and<br>quote options"|Customers settings||
|7|Accounting|"Send invoices and manage bills"|Accounting settings||
|8|Notifications|"Manage in-app alerts"|Notifications window<br>(SET-036)|Small grey dot on<br>the icon|
|9|External references|"Associate entities in external systems<br>with entities in10-4TMS."|External references||
|10|Import from Quote|"Bring your customers,carriers and|The import page,|Not shown to|
||Factory(Owners only)|shipments over from Quote Factory"|section8|Members|


Tiles 1 to 9 are the same for Owners and Members. 

##### SET-002 Shared page frame 

Every Settings page, the profile and the Company page use the same frame: 

- A top-left breadcrumb: a gear and "Settings", then "/" and the page name, for example "Settings / Carriers / Rate confirmations". Earlier crumbs are links; the Settings home has only "Settings". 

- A round close "X" at the top right (accessible name "Close settings") returning to the previous page, else the Dashboard (the Quote form from the profile page). 

- A centered footer, "App version: {8 characters}", with a small orange dot in front when a newer version is available. 

##### SET-003 Who can change what in Settings 

Owners change every setting. Members see the same pages with switches, number boxes and "Save"/"Done" buttons read-only (switches grey, inputs locked) and Owner-only tiles hidden. A Member change sent by other means is refused (ROL-008). 

##### SET-004 Saving behavior 

Switches and boxes save as soon as they change; tile pages have no page-level "Save" (exceptions with their own "Save" or "Update": the "Rate con email settings" window, the "Terms & Fees" editor, the Company page, the Profile page). A failed save shows a red message, for example "Error updating setting" for a switch. Tile windows close with "Done" or a click outside. 

### 4.10.2 Carriers settings 

##### SET-005 Carriers hub 

Settings > Carriers shows a grid of tiles. For 10-4 the tiles are: 

|Tile|Description(exact)|Status shown|Opens|
|---|---|---|---|
|Carrier<br>integrations|"Manage your carrier<br>activations and notes"|Count chip:number of activated LTL<br>carrier accounts(hidden at0)|The LTL carrier accounts<br>screen(section4.6)|
|Carrier T&Cs|"Manage your terms&<br>conditions"||Carrier terms&conditions<br>(SET-006)|
|Rate confirmations|"Customize carrier rate<br>con"||Rate confirmations(SET-<br>008)|
|Tracking|"Truckload tracking<br>integrations"|Name and logo of the active tracking tool,<br>or"None selected"|Tracking window(SET-<br>012)|
|Compliance|"Carrier onboarding<br>integrations"|Name of the active compliance tool,or<br>"None selected"|Compliance window(SET-<br>013)|
|Carrier411|"Carrier monitoring"|"Show links to Carrier411"or"Not<br>showing links";green dot when on,white<br>dot when off|Link window(SET-014)|


|Tile|Description(exact)|Status shown|Opens|
|---|---|---|---|
|CarrierOK|"Carrier monitoring"|"Show links to CarrierOK"or"Not<br>showing links";green dot when on,white<br>dot when off|Link window|
|Highway|"Carrier monitoring"|"Show links to Highway"or"Not showing<br>links";green dot when on,white dot when<br>off|Link window|
|ClassIT+|"Freight classification"|"Show links to ClassIT+"or"Not showing<br>links";green dot when on,white dot when<br>off|Link window|
|Load boards|"Connect to load boards"||Load boards page(SET-|
|(Owners only)|||015)|


##### SET-006 Carrier terms & conditions page 

Title "Carrier terms & conditions". A blue link "Public link" at the right opens the carrier's agreement in a new tab. Two grey cards with switches: 

|Switch|Title and text(exact)|Default|Effect|
|---|---|---|---|
|Request carrier|"Send packet requests" — "Automatically send|On|When on,covering a load with an|
|packets|a carrier packet request when covering with an<br>unapproved carrier"||unapproved carrier pre-selects"Request<br>packet" (section4.3)|
|Require carriers|"Use terms&conditions"|On|When on,the carrier must tick agreement|
|to agree to|||to the terms when signing the rate|
|terms|||confirmation(section4.3)|


A preview card shows the agreement text (dimmed to 30% when "Use terms & conditions" is off). Members see the cards read-only. 

##### SET-007 Changing the agreement 

The agreement document is supplied by 10-4 and loaded by Stackup. There is no editor on this page. 

##### SET-008 Rate confirmations page 

Title "Carrier rate con". Three blocks: 

1. A card "Rate con email settings" (pencil icon) showing "Reply-to:" and "Contact phone:", each in bold, or the grey italic text "the person who covered the load" when blank. Clicking opens SET-009. 

2. A card "Terms & Fees": a preview of the saved terms. For Owners the whole card is a button with a pencil that opens SET-010. For Members it is a plain card. 

3. A row "Show shipment value on rate con" with a switch, default off. When on, the total value of the shipment prints on the carrier rate confirmation (section 6). If the switch cannot be saved, a red message reads "Error updating setting". 

A closing info note: "Changes applied to future shipments only. Previously-covered shipments must drop carrier before new terms are applied." 

###### SET-009 

##### Rate con email settings window 

A window titled "Rate con email settings". Text: "When blank, will default contact info to the person who covered." Fields and rules: 

|Field|Input|Required|Default|Rules and messages|
|---|---|---|---|---|
|Email address|E-mail|No|Blank|Valid e-mail;saved in lower case. "Enter a valid email address"|
|Phone|US phone|No|Blank|Complete US phone number. "Enter a valid phone number"|


"Save" stores both. Error panel: "Error saving settings". Closing without saving discards changes. 

##### SET-010 Terms & Fees editor 

A window titled "Terms & Fees" with a rich-text editor (placeholder "Carrier rate confirmation terms and fees..."). Toolbar: Bold, Italic, Underline, Bulleted list, Numbered list. Buttons: "Save" (right) and "Revert to default" (bottom left, with confirmation "Are you sure you want to revert to the default terms?"). Rules: 

- Each save creates a new version; older rate confirmations keep the terms they were sent with. 

- Only simple formatting is allowed (paragraphs, line breaks, bold, italic, underline, bullets, numbers). Anything else: "Unsupported formatting". 

- Empty text: "Terms are required". More than 50,000 characters: "Terms are too long". Save failure: "Error saving terms". 

The default text is 10-4's "Carrier Terms and Deductions" (section 6, Carrier rate confirmation). 

##### SET-011 Where terms apply 

New terms apply to loads covered after the change; a covered load keeps its terms until the carrier is dropped and the load covered again. 

##### SET-012 Tracking window 

Title "Tracking integrations". Two rows: MacroPoint and Trucker Tools. MacroPoint always shows "Not connected" and is not offered to 10-4 (section 7). Each row shows "Connected", "Setting up" (orange) or "Not connected", with a green ring and check on the active tool. Only one tool is active at a time: switching one on switches the other off. A connected row opens a panel with a back arrow, the name and an on/off switch. A tool that is not connected shows "Connect to {name}", says setup is done with Stackup Solutions, and has a link "Not a {name} customer?" "Sign up now". Members see the window read-only. For 10-4, Trucker Tools is connected and active. 

##### SET-013 Compliance window 

Title "Compliance integrations". Rows: MyCarrierPortal (the carrier portal of MyCarrierPackets) and RMIS by Truckstop. Each row shows "Connected", "Setting up" or "Not connected" (plus " as secondary" and " / disabled" when relevant). A connected tool has a switch "Enable {name}" and the text "Pulls carrier data from 

{name} and monitors compliance status." A secondary source shows the box "Supporting mode" — "Will only return carrier data not affect compliance status." A tool that is not connected shows "Connect to {name}", the same Stackup setup text and a "Sign up now" link. For 10-4 none is connected; onboarding uses the built-in carrier packet (MyCarrierPackets is used by 10-4 on its own). 

##### SET-014 Carrier monitoring link windows 

Small window with the logo and a switch "Show links to {name}" (Carrier411, CarrierOK, Highway, ClassIT+), saved at once. A yellow box explains: "When enabled," "we will show links on carrier profiles that take you to {name}." For ClassIT+: "we will show links on line items that take you to ClassIT+ for freight classification lookup." Button "Done". All four are off for 10-4. 

### Load boards 

##### SET-015 Load boards 

Owners see the "Load boards" tile ("Connect to load boards") on Carriers settings. It opens "Settings / Carriers / Load boards" with two cards, "Post to DAT" and "Post to Truckstop". 

- Each card shows a status dot and a status line: "Connected" with the button "Change", or "Not connected" with the button "Connect". These settings statuses are unverified. Deep2 E-138 instead records an existing app-reported DAT Authorization failed in the cover workspace; it does not prove current licensed connectivity or identify the cause/age. Truckstop connectivity remains unverified.

- Posting from the system is not in the first version (10-4 posts by hand). Pressing a card or its button shows "{name} is not available yet." and changes nothing. 

- Members do not see the tile. 

### 4.10.3 Customers settings 

##### SET-016 Customers hub 

Settings > Customers shows tiles, each with icon, title, description, a bottom status strip and, on four tiles, a top-right status dot (green on, white with grey border off). A pencil shows on hover; clicking opens a window. 

|Tile|Description(exact)|Status strip|Dot|
|---|---|---|---|
|Margin<br>defaults and<br>limits|"Set default margins for<br>customers and minimum<br>margin/profit"|Left"LTL{n}%",right"TL{n}%";a second line<br>"min{x}%", "min ${y}"or"min{x}% /${y}"<br>when limits exist|None|
|Reveal carrier<br>names|"Customize when the<br>customer can see the carrier<br>name"|"Carrier names are visible"or"Carrier names are<br>hidden"|Green when names<br>are hidden|
|Customer<br>login|"Allow customers to log in,<br>run quotes,and track their<br>shipments"|When on:a"Login link"button(copies the link)<br>and"Auto-quote/dispatch" (only the options that<br>are on);when off: "Disabled"|Green when on;<br>open padlock green,<br>closed red|
|Credit limits|"Limit individual customers to<br>certain thresholds of credits"|"Disabled"or"Limits enforced"|Green when<br>enforced|


|Tile|Description(exact)|Status strip|Dot|
|---|---|---|---|
|Customer|"Limit users and teams|"Disabled"or"Limits enforced" (the choice is|Red lock when|
|visibility|access to customer records"|shown in the UI; actual enforcement unverified, see<br>SET-021)|limited|


The "Credit limits" tile is shown for 10-4; the "Enforce credit limits" switch inside it is proposed Off at launch, approval pending (SET-020).

##### SET-017 "Margins and limits" window 

Title "Margins and limits". Tabs "Global" and "LTL carriers". Blue "Done" closes. Read-only for Members. 

Globaltab. Column headings (hover tips in brackets): "Default" ("Start here"), "Min %" ("Don't go below"), "Min $" ("Don't go below"), "Max $" ("Don't go above"). 

|Row|Fields|Format|Notes|
|---|---|---|---|
|LTL|Default LTL gross margin;Minimum LTL<br>gross margin;Minimum LTL gross profit;<br>Maximum LTL gross profit|Margins in% (up to99.99;<br>arrow keys step by1, 10or<br>0.1);profits in $|Default for10-4is25%|
|Truckload|Default truckload gross margin;Minimum<br>truckload gross margin;Minimum<br>truckload gross profit;Maximum truckload<br>gross profit|Same|Default for10-4is25%|
|LTL Volume<br>boost(orange<br>row)|One pick list"select volume boost"|"x0Not boosted", "x1.25<br>Small boost", "x1.5Medium<br>boost", "x2Max boost"|When a boost and an LTL<br>default are set,the resulting<br>margin is shown in orange|


A grey note reads "These amounts can be overridden with customer-specific settings." and, in bold, "Owners aren't limited by these amounts." 

LTLcarriers tab. One row per activated LTL carrier account: logo or initials, carrier name, account label or number, the same Default, Min %, Min $, Max $ boxes, and an orange "x{boost}%" when the carrier supports volume quotes. A value set here sets that carrier's limits (LTL-032). With none connected: "No LTL carriers connected." 

Saving. Each box saves when the user leaves it. A green message "{label} saved" appears with an "undo" link. Labels: "TL Margin", "LTL Margin", "TL gross margin minimum", "TL gross profit minimum", "TL gross profit maximum", "LTL gross margin minimum", "LTL gross profit minimum", "LTL gross profit maximum", "LTL Volume boost". Clearing a box, or typing the value that is already inherited, removes that override. A failure shows a lasting red message ("An error occurred while saving." or the reason). Default margins can never be empty ("Default margin is required"). Dollar amounts may not exceed 1,000,000 ("Must be 1,000,000 or less"). 

Price. Margin: the customer's margin, else the account default. Limits have four levels (LTL-032). Quote price = cost / (1 − margin), never less than cost plus the minimum profit (SHP-077, SHP-078). 

##### SET-018 "Hide carrier names" window 

Title "Hide carrier names". Text: "By default, customers will be able to see the carrier's name and logo at all times." Two switches: 

1. "Hide LTL carrier names" — "Don't show the carrier logo and name when sharing LTL quotes. (will still show on BOL and shipment details)". 

2. "Hide TL carrier names" — "Don't show the carrier name, USDOT, or MC numbers on the BOL." 

"Done" is a visible close action. In the October26 sample Hide LTL carrier names was unchecked/disabled and Hide TL carrier names checked/disabled (main §19.3). These are mode-specific observations, not both Off or a verified universal default.

##### SET-019 "Customer login" window 

Title "Customer login". Master switch "Customer login" ("Contacts (with an email address) can log in, run quotes, and see their shipments.") and the customer login link with a copy icon (POR-005). Two sub-switches, dimmed until login is on: 

- "LTL auto-quoting" — "Customers can run LTL quotes and get immediate results." 

- "LTL auto-dispatching" — "Customer-booked LTL shipments will be automatically dispatched." 

"Done" closes. Customer/global precedence requires testing (section 4.7); when the company switch is off the customer page warns: "Customer login is disabled in account settings." / "You can still change this, but it won't have an effect until enabled by an owner of your account." All three are on for 10-4.

##### SET-020 "Credit limits" window 

Title "Credit limits". Switch "Enforce credit limits" (Members see "Enabled" or "Disabled") with the text "Block booking of new shipments when the balance of all open invoices and active shipments exceeds the customer's credit limit." and "Credit limits are set within each customer account." Below, dimmed until enforcement is on: switch "Notify on credit increase" — "Email all reps for customer when credit limit is increased." "Done" closes. The switch is saved; the e-mail itself is planned for later (section 1.7). Enforcement is proposed Off at launch, approval pending: credit figures are always shown, but no booking is blocked and no credit refusal message appears. When on, booking above the available credit is blocked (rule: PAY-022; messages: CUS-028, CUS029, LTL-025, LTL-075, POR-035). The automatic 31-day booking hold is planned for later.

##### SET-021 "Limit customer visibility" window 

Lock icon and title "Limit customer visibility". Text: "When enabled, we limit who can access customer records. Only customer reps can view and run quotes for that customer." and "When disabled, users have access to all customer records." Footer row "Limit customer visibility" with a switch. Close by clicking outside. The sampled checkbox was disabled; help describes restriction to customer reps when enabled and all records when disabled. Actual enforcement/storage/team inheritance are unverified. Do not implement a no-op switch without explicit scope approval (main §19.3; ROL-019).

##### SET-022 Customer settings effect on other screens 

Hidden carrier names apply to customer-facing quotes, documents and the portal (4.6, 4.11, 6). Customer login settings decide who may use the portal (4.11). 

Credit limits block "Book" only when "Enforce credit limits" is on (PAY-022). 

### 4.10.4 Accounting settings 

##### SET-023 Accounting hub 

Tiles with a status strip and dot (green on, orange needs attention, white off): 

|Tile|Description(exact)|Status strip|Opens|
|---|---|---|---|
|Sync to<br>QuickBooks<br>Online|"Automatically sync bills<br>and invoices"|"Syncing"with bold"Bills&Invoices" (or just<br>"Bills"or"Invoices"); "Not syncing"when<br>connected but nothing syncs; "Not connected<br>to QuickBooks"|QuickBooks window|
|Cc invoices|"Send copies of all<br>customer invoices to an<br>email address"|Green count badge with the number of<br>addresses(no badge at0)|Cc list window|
|Request more<br>credit|"Allow reps to request a<br>credit limit increase for a<br>customer via email"|Count of addresses|Cc list window(shown<br>whenever the"Credit<br>limits"tile is shown)|
|Customer<br>terms|"When do you want your<br>customers to pay you?"|"Pay within"bold"{n}days" ("1day")|Customer terms window|
|Vendor<br>payment terms|"When do you pay<br>vendors?"|"Pay within"bold"{n}days of Vendor bill" (or<br>"of Delivery", "of Pickup")|Vendor terms window|
|Factoring|"Manage settings for your<br>factoring service"|"Not factoring"or the factoring company's<br>logo and name|Factoring window|
|QuickPay|"Carriers request a quicker<br>payment,you get a<br>discount."|"Not providing QuickPay"or"QuickPay<br>within"bold"{n}days" "({fee}%)"|QuickPay window|


If accounting is off for the company, the page shows the heading "Simplify your accounting tasks.", the text "We've worked hard to build tools that make accounting easy. Tailored to the needs of freight brokers, these features take the pain out of invoicing and billing.", "Contact support to enable accounting.", and three panels "Shipper invoices", "Factoring" and "Carrier bills". Accounting is on for 10-4. 

##### SET-024 QuickBooks window 

Not connected: QuickBooks logo, "First, let's connect to QuickBooks", "When prompted, log into your account" and a blue "Connect" button; afterwards "Connected!". A lost connection shows "Not connected" and "Reconnect". Connected: a header with "Quickbooks Online", "Company ID: {id}" (click to copy) and a "Disconnect" button ("Disconnected!" confirmation). Below, a notice "Verify your account mappings" — "Validate after making account selections. Incorrect mappings may result in transactions being recorded to the wrong QuickBooks Online accounts." and two cards (dimmed for non-Owners): 

Bills: a picker "Expense account:" (placeholder "Select expense account for bills..." or "Currently: {name}", each option shows the full account name and its type), a clear button, and a switch "Sync bills" ("Sync carrier bills"), usable once an account is chosen. 

- Invoices: a picker "Service:" (placeholder "Select service item for invoices..."), a clear button, and a switch "Sync invoices" ("Sync customer invoices"), usable once a service is chosen. 

Clearing a choice also switches off its sync. If the account list cannot load, a red bar says so. What is pushed and when: section 7 accounting review (sync behavior unverified).

##### SET-025 Cc invoices window 

E-mail icon, box "Send a copy of all invoices to:" and an "Add" button. Addresses are trimmed and lowercased; duplicates and empty values ignored; shown as chips with a remove "x" (accessible name "Remove email"). Up to 20; invalid: "Enter a valid email address", more than 20: "At most 20 emails". Each add or remove saves at once. "Done" closes. For "Request more credit" the label is "Send credit limit requests to:" with the extra text: `When an email is provided, a "Request more credit" button appears in the Credit Limit modal, letting reps quickly send an email to request an increase.` 

##### SET-026 Customer terms window 

Title "Customer terms". Field "Customers pay within" with a number box and the word "days" (whole number 0 to 120, default 30). Saves on leaving the box or after a short pause. "Done" closes. Default due date on customer invoices; a customer can have its own terms (4.7). 

##### SET-027 Vendor payment terms window 

Title "When entering a vendor bill..." Label "Set Bill date to" (Bill date in bold) with three radio cards, saved at once when chosen: 

|Card|Text|Icon|
|---|---|---|
|"Vendor bill/date"|The date on the carrier's bill|Document|
|"Pickup/date"|The pickup date|Calendar(blue)|
|"Delivery/date"|The delivery date|Delivery(green)|


Then "Pay within" and a number box "days" (0 to 120, default 30). "Done" closes. Defaults on carrier bills (4.5); a carrier can have its own terms (4.8). 

##### SET-028 Factoring window 

Title "Factoring" with a master switch ("Enable factoring"/"Disable factoring"). When on: a pick list "Factoring company you use" (required, from 10-4's list of factoring companies), and a row "New customers are factored" with a switch. "Done" saves. A company is required when on ("Factoring company is required"). 104 does not factor, so the tile reads "Not factoring". 

##### SET-029 QuickPay window 

Header "QuickPay" and a master switch "Allow Quickpay". Dimmed until on: "Pay within" a number of days and "For a discount of" a percent (0 to 100, up to 2 decimals). QuickPay can only be switched on once both are filled ("Enter the QuickPay days and discount first"). "Done" closes. QuickPay is off for 10-4 (3 days and 

2.5% are stored for later). The setting is saved, but carriers cannot request quicker payment yet (planned for later). 

##### SET-030 Accounting rights 

All accounting switches and fields are Owner-only (ROL-021). 

### 4.10.5 External references 

##### SET-031 External references page 

Defines the kinds of outside-system IDs (for example a CRM customer ID) that can be stored on customers and carriers. Title "External references" with an info icon, and an outlined blue button "+ Add" at the right. The info text reads: "Link 10-4 TMS records (Customers, Vendors / Carriers, Contacts, Addressbook Entries, and Shipments) to records in external systems like a TMS, CRM, or accounting tool. Use them in reports to join data across systems, and add a URI template to deep-link directly to the external record." 

- With no definitions the page shows "Nothing added yet." and a blue link "+ Add external reference". 

- Each definition is a card with the name, its code in grey monospace and a chip per record type. Owners click a card to edit it. Trash button: "Delete {name}?" — `Existing external references using "{name}" will no longer work.` — buttons "Cancel" and "Delete reference". Deleting removes the values already entered. 

Members see no "+ Add" button and no trash buttons. 

##### SET-032 Add or edit window 

A red panel "Failed to save external attribute definition" shows the reasons. 

|Field|Input|Required|Default|Rules|
|---|---|---|---|---|
|Name|Text with a drop-<br>down of<br>suggested<br>systems<br>(HubSpot,<br>QuickBooks,DAT<br>and others),free<br>text allowed|Yes|Empty|Choosing a suggestion fills the name,the code and which<br>record types apply; "Contacts"stays on unless you switch it<br>off. 1to100characters("Name is required").Editable after<br>creation|
|Code|Text<br>(monospace)|Yes|Made<br>from the<br>name<br>(lower<br>case,<br>spaces<br>become<br>dashes)|Letters,numbers,dots,dashes,underscores("Use lowercase<br>letters,numbers,dots,dashes or underscores").Permanent<br>once saved(shown with a lock)|


|Field|Input|Required|Default|Rules|
|---|---|---|---|---|
|Entity<br>types|One switch per<br>type:<br>"Customers",<br>"Vendors/<br>Carriers",<br>"Contacts",<br>"Addressbook<br>Entries",<br>"Shipments"|At least<br>the types<br>you want|All on|Turn off the types that do not exist in the outside system|
|URI<br>Template|URL box under<br>each switched-<br>on type|No|Empty|Must start with https://or http://and contain{value} (for<br>example<br>`https://crm.example.test/customers/{value}` ).<br>"Enter a URL that contains{value}"|
|Ensure<br>unique<br>values|Switch||On|On:one outside ID can be linked to one record only.Off:<br>duplicates allowed("Enforce uniqueness"/"Allow duplicates"<br>is shown when editing).Cannot be changed later<br>("Uniqueness cannot be changed")|


"Save" stores the definition. 

###### SET-033 

##### Info pop-ups 

Code: "A human readable identifier for the specific kind of reference." "The code is permanent and cannot be changed. The name appears throughout the UI and in exports." 

- Entity types: "Disable entity types that don't exist in this external system." "The URI template builds a deep link into the external system. {value} is replaced with the external reference value for each record." 

- Uniqueness: "Each external ID can only be linked to one record in 10-4 TMS. For example, with uniqueness enforced, a single HubSpot customer can map to at most one 10-4 TMS customer." "Cannot be changed once created. When in doubt, leave it on." 

##### SET-034 Using references 

Users enter values on customers and carriers/vendors (4.7, 4.8): 1 to 200 characters ("Enter a value"), and with uniqueness on it cannot already belong to another record ("Already linked to another record"). The same reference cannot be added twice to one record ("Already added"). References appear as a report column category "External References" (section 4.9). 

##### SET-035 External references for shipments 

Definitions for Contacts, Addressbook Entries and Shipments can be created, but values can only be entered on customers and carriers/vendors. 

### 4.10.6 Notifications 

##### SET-036 Notifications window 

A small window with a chat icon, the title "Notifications" and "Choose in-app notification alerts to receive:". With nothing to choose it shows "No sources configured" (the case for 10-4). Each person sets their own alerts, saved at once. Live alerts: section 4.12. 

### 4.10.7 Data page 

##### SET-037 "Data" page (staff) 

Staff page "Settings / Data" with a close "X" and one tile "Shipments": "Download all shipment data to a .CSV file", blue button "Download". 

- "Download" saves a CSV of every shipment (standard columns, no filters), named company name, 

- "Shipments", date and time. A spinner shows meanwhile; messages "Download will start soon" and, on failure, "Download failed". 

Owners and Members can use it; customers cannot (they have their own "Data" lanes page, 4.11). 

- The page has no tile on the Settings home; staff open it from the address Stackup gives 10-4. 

### 4.10.8 Users 

##### USR-001 Users page 

Breadcrumb "Settings / Users", heading "Users". Owners see a box "Invite by email" and a button "Invite" at the right. People are grouped under small grey capital headings "Owners", "Members" and, when invites wait, "Invited". Each row card shows photo or initials (owners have an orange ring), full name, job title if set, and an orange "Owner" pill for owners; clicking opens the person's card (USR-005). No search. 

##### USR-002 Invite a person 

|Field|Input|Required|Rules and messages|
|---|---|---|---|
|Invite by|E-mail,saved|Yes|Valid e-mail: "Enter a valid email address".Already invited: "Already invited".|
|email|in lower case||Already a user: "Already on the account".Any other problem: "Something went<br>wrong"|


"Invite" (Owners only) creates a pending invite with role Member, sends the invite e-mail (section 5, Invite), shows the person in "Invited" and empties the box. One waiting invite per e-mail. 

##### USR-003 Invited rows 

Under "Invited" each row shows the e-mail and the date invited. Clicking opens the invite card (USR-007). 

##### USR-004 Counts 

The Users tile shows the number of users. 

##### USR-005 User card 

Window with photo or initials, an "Owner" or "Member" badge, team chips, name (trash button for Owners, not for yourself), e-mail (mail icon; click to copy), phone (click to copy), and — for yourself only — a "Logout" link. A footer strip shows the company name and the "Owner" switch. 

- Owner switch. Owners can switch another person between Owner and Member. It is disabled for yourself. Failure message: "Failed to update role". See ROL-015. 

- Remove user. The trash opens "Are you sure you want to remove {name}?" with "No, go back" and "Remove user". On success the message is "{name} removed". No "Undo": an Owner must invite the person again. On failure the reason is shown or "Failed to remove user". See ROL-016. 

- Team chips. Owners see "+ add to team" (hidden when the person is in all teams) and a trash icon on each chip (USR-017). 

##### USR-006 Phone and e-mail icons 

The e-mail icon opens the person's mail program; its tool tip is "Send email". The phone icon has the tool tip "Start call". The copy buttons show "Click to copy email" and "Click to copy phone". 

##### USR-007 Invite card 

Shows the invited e-mail, a role badge, "Invited on {date}" and a "Resend" button. A footer strip shows the company name and an Owners-only "Owner" switch that sets the role the person will get. 

- Resend sends the e-mail again and renews the 14-day expiry. The button becomes "Sent" and the message "Invite resent!" shows. A failure shows the reason. 

- Cancel invite. The trash opens "You're about to cancel the invite for {e-mail}." with "No, go back" and "Cancel Invite". On success: "Invite cancelled." Failure: "Failed to cancel invite". 

- Role change failure: "Failed to update role". 

##### USR-008 Invite expiry 

Invites expire after 14 days; expired ones stay listed so an Owner can resend or cancel. 

##### USR-009 Users page for Members 

The sampled Member opened their card and saw a disabled unchecked Owner checkbox. A universal absence of the role control is incorrect; invite/remove/resend rights and other-user variants remain unverified (main §19.1).

##### USR-010 Unknown links 

A link to a user or invite that does not exist returns to the Users list; a valid one opens the card. 

##### USR-011 Last Owner and self rules 

The company must keep at least one Owner; nobody can change or remove themselves (ROL-015, ROL-016). 

### 4.10.9 Teams 

##### USR-012 Teams page 

Breadcrumb "Settings / Teams", heading "Teams". Owners have a "+" icon button to add a team. Once a team exists a search box (placeholder "search", clear "x") filters by name. Teams are cards listed by name with the user count at the right. With no team: Members see "No teams quite yet!"; Owners see an icon, "Hey, let's create your first team." and a button "Create a team". A search with no result shows "No teams found when searching for {text}." 

##### USR-013 Add team 

Window with a field "Team Name" (required) and a button "Add team". A name already used (any capitalization) shows "A team with that name already exists"; an empty name "Team name is required"; maximum 100 characters. Then the new team page opens. Failure: "Failed to add team." 

##### USR-014 Team page 

Breadcrumb "Settings / Teams / {team name}". Owners edit the title in place (placeholder "Team name"); it saves on Enter or leaving the box ("Renamed team to {name}" or "Failed to rename team"). When the team has people there is a search box "search" and two buttons "Display with Grid View" and "Display with List View". The body shows a card or row per person, starting with an "Add person" tile (disabled when everybody is already in). Managers show an orange "Manager" strip (ROL-018). 

##### USR-015 Add person 

"Add person" opens a window "Add existing user" with a pick list of staff who are not in the team. Choosing a person adds them at once. Failure: "Failed to add user to team {name}". 

##### USR-016 Remove person from team 

The trash on a card opens "You're about to remove {person} from {team}." / "You can always add them back later." with "No, go back" and "Remove from team". Failure: "Failed to remove user from team". 

##### USR-017 Teams from a user card or profile 

On a user's card and on your own profile, "+ add to team" opens a window "Add to team" with one box "Search teams..." (teams the person is already in are left out); choosing a team adds the person at once and closes the window. The trash on a team chip opens "You're about to remove {name or yourself} from {team}." with "No, go back" and "Remove from team". Failure messages: "Failed to add user to team", "Failed to remove user from team". Owners only. 

##### USR-018 Manager 

A person's quick card on a team page has a footer row with the team name and an Owners-only "Manager" switch (orange background when on). 

##### USR-019 Delete team 

A trash button appears next to the team name only when the team has no people. It opens "You're about to remove the team {name}." with "No, go back" and "Remove team". Failure: "Failed to remove team". 

##### USR-020 Teams for Members 

Members see teams and people but have no add, rename, remove or manager controls. 

### 4.10.10 Company profile 

##### ACT-001 Company page 

Breadcrumb "Settings / Company". A centered card with header "Company information" (left) and "Account {number}" (right, when the company has one). 

- Members see a read-only summary: the company name as a large heading, "Billing address:" (company in bold, street, "city, ST zip"), "Billing contact:" (name, e-mail, phone), "Phone:" and the logo. 

- Owners see the edit form (ACT-002). 

##### ACT-002 Company form (Owners) 

|Field|Input|Required|Default|Rules|
|---|---|---|---|---|
|Company|Text|Yes|Company name|Up to200characters|
|Phone|US phone|Yes|Company phone|Complete US phone number|
|MC#|Text,<br>placeholder<br>"MC"|Yes|MC number|Digits only;other characters are<br>removed when you leave the box|
|Payment contact|Text|Yes||Up to200characters|
|Payment email|E-mail|Yes||Valid e-mail|
|Payment phone|US phone|Yes||Complete US phone|
|Payment address|Click-to-edit line|Yes||Opens the address window(ACT-<br>004)|
|Billing contact,Billing email,<br>Billing phone,Billing address|Same as above|Yes|Same as the<br>payment block|Same rules|


The blue "Update" button is disabled until something changed and every required field is valid. On success: "Changes saved" with an "undo" link that restores the previous values. On failure: the first field error, or "Something went wrong!". 

##### ACT-003 "Customers send payment to" and "Carriers send bills to" 

Two blocks: "Customers send payment to" (printed on invoices) and "Carriers send bills to" (printed on rate confirmations). A small switch "Same" beside the second heading, on at the start when the blocks are 

identical, copies the payment fields into the dimmed billing fields (and keeps copying changes). 

##### ACT-004 Address window 

Fields: company, street 1, street 2, neighborhood, city, state, ZIP, country (default USA). City, state and ZIP can be found by typing. Both street lines are kept. 

##### ACT-005 Company logo 

Owners only: click the logo box to choose an image (PNG, JPEG, WEBP or GIF, up to 5 MB). With no logo, company initials show. A "remove" link with a trash icon deletes it. The logo shows in the navigation, on documents and on the customer login. 

### 4.10.11 Your profile 

##### ACT-006 Profile page 

Reached from the navigation user block or the "Your profile" tile. Breadcrumb "Settings / Profile" and a close "X". A white card with two columns: 

- Left: a round photo (initials on blue if none), the role chip ("Owner" in orange, "Member" in grey), a team block, and a "Log out" button at the bottom. 

- Right: the form (ACT-007) and "Change password" (ACT-009). 

##### ACT-007 Profile form 

|Field|Input|Required|Default|Rules and messages|
|---|---|---|---|---|
|First|Text|Yes|Your first name|Up to100characters|
|name|||||
|Last<br>name|Text|Yes|Your last name|Up to100characters|
|Email|E-mail|Yes|Your login e-<br>mail|Valid;changing it needs a current password(ACT-010)|
|Phone|US phone with<br>flag|Yes|Your phone|Complete US phone;an extension is allowed("(555) 010-<br>0101 ×8")|


"Save" is disabled until something changed. Success: "Profile updated". Failure: a red line under Phone and the message "Profile update failed". 

##### ACT-008 Photo and teams 

Click the round photo to upload one (PNG, JPEG, WEBP or GIF, up to 5 MB); a "remove" button with a trash icon shows when set ("Failed to remove photo" on failure). The team block lists your teams; "+ add to team" and the team trash follow USR-017 (Owners only). 

##### ACT-009 Change password 

The outlined button "Change password" opens a grey box with: 

|Field|Rules|
|---|---|
|Current|Required. "Current password is incorrect."|
|password||
|New|Required.A show/hide eye button.The rule box(red)appears after a failed attempt: "Please ensure|
|password|password contains a lowercase letter,upper case letter,a number,a special character,and is at least8<br>characters in length."|


Buttons: "Change password" (blue, disabled while empty or saving) and "Cancel". Success: "Password changed"; the box closes and your other devices are signed out. Failure: "Password change failed". Customers do not have this button (they have no password). 

##### ACT-010 Changing your login e-mail 

Changing Email shows a "Current password" field under Phone ("Enter your current password to change your email."). After "Save" the old e-mail keeps working and the page shows "Check {new e-mail} for a link to confirm your new email." A link is mailed to the new address; opening it (while signed in) shows "Confirm your new login email." with a "Confirm" button; nothing changes until it is pressed. Then: "Your login email is now {e-mail}." with a "Continue" link. An address already used by another person gives "Account already exists"; a bad or old link gives "This link is invalid or has expired."; a link opened by a different signed-in person gives "This link belongs to another account." The link works for 24 hours. 

##### ACT-011 Log out and version 

"Log out" ends the session and shows the "Logged out" page. Footer: "App version: {8 characters}" (SET002). 

### 4.10.12 Sign-in, sign-out, invite and password pages 

##### ACT-012 Log in page 

Dark full-screen page, white card: heading "Log in", fields "Email" and "Password", a blue button "Log in", and a link "Forgot password?" (which carries the typed e-mail). After login the user goes to the page they wanted, or the Dashboard. Customers use the customer login link instead (ROL-011). Messages: "Wrong email or password."; "Too many attempts. Try again in a minute."; "We couldn't reach the server. Try again." "Wrong email or password." also shows for an unknown e-mail (ROL-010). Blocked or removed users see "Authentication error" ("This user cannot log in. Please contact Support."); an unmatched customer login link shows "Unable to load account" (both NAV-015). 

##### ACT-013 Logged out page 

Dark page with a user icon, heading "Logged out", "You've been logged out." and an outlined button "Log back in" (to "Log in", then back to the previous page). Logout failure: "Error logging out" with "Try again". Also shown when a session ends. 

##### ACT-014 Invite page, new person 

Company logo, "{inviter name} invites you to join the team at {company}.", a white card with the sign-up form (ACT-016) and "Already have an account? Log in". 

##### ACT-015 Invite page, person who already has a login 

Card with photo or initials, name, e-mail and two buttons: "Continue" (sign in as this person) and "Use another account". Below: "Or, create a new account", which switches to the sign-up form (with "Or Log into your existing account"). 

##### ACT-016 Sign-up form 

|Field|Input|Required|Rules and messages|
|---|---|---|---|
|First|Text|Yes|Up to100characters("First name is required")|
|name||||
|Last|Text|Yes|"Last name is required"|
|name||||
|Email|E-mail,lower<br>case|Yes|Must be the invited address: "This invite was sent to{e-mail}".Already used:<br>"Account already exists"|
|Phone|US phone|Yes|Complete US phone|
|Password|Password|Yes|"Please ensure password contains a lowercase letter,upper case letter,a<br>number,a special character,and is at least8characters in length."|


Button "Save" is disabled until the form is valid. Other errors: "Something went wrong". After "Save" the person is signed in and sent to the join page. 

##### ACT-017 "That email sounds familiar" 

For an e-mail that already has a login, a window shows an emoji, the heading "That email sounds familiar", the e-mail, the text "is already being used by an existing account." and two buttons: "Log in" and "Change email". 

##### ACT-018 Invalid or expired invite 

A dark page with an icon and "Oops, this invite isn't working." and "Try contacting the person who sent you this invite." An expired invite shows "Oops, this invite has expired." A failed acceptance shows "Oops, something went wrong." 

##### ACT-019 Join page 

A white card with the person's photo, an arrow and the company logo, the heading "Join {company}" and the sentence "I accept the invitation to join {company}." Buttons: "Decline" (back to the home page, nothing changes) and "Agree & join". The person must be signed in with the invited e-mail ("This invite was sent to a different email address."). 

##### ACT-020 After joining 

"Agree & join" adds the person with the role chosen in the invite, removes the invite and opens the Dashboard. A person who signs up but leaves before agreeing can log in later and still reach the join page. 

##### ACT-021 Invite e-mail 

See section 5 (Invite): invite link and the Owner's name; replies go to the Owner. 

##### ACT-022 Session lost 

When a session ends (for example a password change elsewhere or removal), the next click leads to "Log in" or "Logged out". Gate screens: NAV-015. 

##### ACT-023 Forgot password page 

Heading "Forgot Your Password?", text "Enter your email address and we will send you instructions to reset your password.", field "Email address", button "Continue", link "Back to login". After "Continue" the heading is "Check Your Email" and the text "Please check the email address {e-mail} for instructions to reset your password." with a "Resend email" button. Messages: "Enter a valid email"; "Too many attempts. Try again in a minute." 

##### ACT-024 Reset password page 

Opened from the e-mail link (valid 60 minutes, once). Heading "Change Your Password", text "Enter a new password below to change your password.", fields "New password" and "Re-enter new password", the password rule text, and a button "Reset password". Mismatch: "Passwords do not match." Success: heading "Password Changed!", "Your password has been changed successfully." and a link "Log in". All the user's sessions end. A bad or old link shows "This reset link is invalid or has expired." / "Ask for a new link and use it within 60 minutes." with a button "Send a new link". 

##### ACT-025 Password reset e-mail 

Subject "Reset your password". Text: "We received a request to reset the password for {e-mail}." with a "Reset your password" link; footer "The link expires in 60 minutes. If you did not ask for this, ignore this email; your password does not change." (Section 5.) 

### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

- Owner: edits all Settings pages, Users, Teams, Company, Import and the Load boards tile; own profile. Member: reads Settings pages, Users, Teams and Company; edits own profile, photo and password; can use the Data page. 

- Customer: own profile only (no Settings, no password); signs in with the customer login link. 

- Carrier: none of these pages. 

- Role rules: ROL-002, ROL-003, ROL-025. 

## 4.11 Customer portal and secure links

**Evidence review — proposed external experience, not verified:** Main §§1, 14.10, 17.7, 18.2 and 19.3–4 explicitly say separate customer/carrier/driver sessions and recipient-access tests were unavailable. Broker-side customer-login settings, sharing controls, an existing recipient list and signed document-download URLs do not prove a portal workflow or authorize use of a private recipient link.

| Requirements reviewed | Available evidence | Unverified requirements retained for review |
| --- | --- | --- |
| POR-001–013 | Customer login/global automation help and copy-link controls (§§12.5/19.3) | Eligibility, contact/multi-customer identity, instant revocation, branding/navigation, magic-link mechanism/15-minute/one-use life, enumeration/error handling and API isolation |
| POR-020–036 | Broker LTL form/results and customer automation settings | Every customer form/result/booking/terms screen, customer authority, timing, state/credit/dispatch/terms-version effects |
| POR-040–054, POR-060–062/070 | Broker shipment/document/invoice/history and carrier-hiding help | Customer list/export/price/contact/driver/map/document access, statement/download/credit/request/profile flows, queues and live isolation |
| LNK-001–003, LNK-027–030 | Broker sharing/recipient states; signed object URLs (§17.7/Deep3) | Per-recipient app-link scheme, 42-day lifetime/renewal, revocation/denial/rate-limits, all security enforcement and password-reset60-minute policy |
| LNK-004–009 | Broker quote Sharing and view-only text “can't book quotes” (§14.10/Deep1) | Copied-link format, who can access/book, copy-to-share writes, token handling, criteria/booking/signed-in transition and latest-version policy |
| LNK-010–016 | Share BOL checkbox, contact-email label, BOL/labels/POD entry points | Actual sends/recipients, no-login shipment/document rendering, generation permissions and fields/audience |
| LNK-020–022 | Broker invoice/send/share entries | Recipient invoice content/access and post-edit revision policy |
| LNK-023–026 | Rate-con/packet/terms entries and existing confirmation marks | Carrier secure page/wizard, uploads/signature/insurance validation, acceptance, expiry and notification effects |

**Cross-section conflicts remain decisions, not facts:** POR-043's document list differs from DOC-008's customer-confirmation access claim; TRK-095 implies a route map on shared tracking while LNK-011 excludes it; INV-019/LNK-007 imply latest invoice content while LNK-022 hides the old copy pending resend. Portal and recipient-link audiences may differ, but the source has not proved that distinction. Resolve each allowlist/revision policy with test recipients before implementation.


In short: Customers of 10-4 can sign in to a portal with their e-mail address, run LTL quotes, book, follow their shipments, download their documents and see their invoices. They see prices only, never 10-4's cost or margin. People who do not sign in (a shipper contact, a carrier, a customer's accountspayable clerk) use secure links from e-mails that open one quote, one shipment, one invoice, one rate confirmation or one carrier packet. Staff control who gets access and what is shared. 

The customer screens below are draft design proposals. No agreed portal design, separate test customer session or client sign-off is recorded in the main source (SC-02/03/05). The missing companion Summary is not approval evidence.

### 4.11.1 The customer portal 

#### Access 

##### POR-001 Who can use the portal 

A person can use the portal only when all of these are true: 

1. The account switch "Customer login" is on (Settings > Customers). 

2. The switch "Customer login" is on for the customer (customer settings, "Booking and quoting" card). 

3. The person is a contact of that customer and the contact has an e-mail address. 

4. The customer is not archived and the contact is not deleted. The checks run on every request, so turning a switch off takes effect at once. A contact of several customers sees all of them and can switch between them on the forms. A staff member keeps both ways of signing in: password for staff, e-mail link for the portal. 

##### POR-002 The account switches for customers 

|Where|Switch|What it controls|
|---|---|---|
|Settings>Customers<br>> "Customer login"tile|"Customer login"|Contacts(with an e-mail address)can log in,run quotes,and<br>see their shipments.Shows the login link with a copy icon.|
|Same window|"LTL auto-quoting"|"Customers can run LTL quotes and get immediate results."<br>Needs the customer switch too(POR-021).|
|Same window|"LTL auto-dispatching"|"Customer-booked LTL shipments will be automatically<br>dispatched."Needs the customer switch too(POR-036).|
|Customer settings,<br>"Booking and quoting"|"Customer login", "Enable<br>booking",auto-quoting,auto-<br>dispatching|The same switches for one customer. "Enable booking"off is a<br>booking hold(POR-035).|


|Where|Switch|What it controls|
|---|---|---|
|Settings>Customers|"Hide Carrier Names"|Whether customers see carrier names(POR-060). 10-4|
|> "Reveal carrier<br>names"||currently shows carrier names.|
|Settings>Customers<br>> "Credit limits"|"Enforce credit limits" (Owner)|Whether booking stops when credit is used up(POR-035;rule<br>in PAY-022and SET-020).Launch value pending approval; the dated source shows Disabled. Credit figures are<br>kept,but no booking is stopped for credit.|


##### POR-003 The login link 

Staff copy the login link from the "Customer login" tile ("Copy link") or the header of the Customers list ("Customer login" / "Copy link") and send it to the customer. It opens 10-4's own branded login page. 

##### POR-004 Contacts without access 

If a person signs in with an e-mail that is not a contact of a customer (or access was switched off in between), the portal shows the screen in POR-009 and no session starts. 

#### Signing in 

##### POR-005 Login page 

Sign-in is a one-time link sent by e-mail. There is no password and no typed code. The branded page shows the account logo, the heading "Log in to ", a box "Email" and the button "Email me a login link". After sending it reads "Check your email" / "We sent a login link to . It expires in 15 minutes." 

###### POR-006 

##### Login e-mail 

The e-mail is sent only if the address belongs to a contact who may use the portal (POR-001). For any other address nothing is sent, but the page shows the same "Check your email" text so nobody can find out which addresses exist. Subject "Log in to "; text "Use the link below to log in to ." with a button "Log in" and the note "This link expires in 15 minutes and works once. If you didn't ask for it, you can ignore this email." It is sent in 10-4's name (section 5). Too many attempts show a "too many requests" message. 

##### POR-007 Opening the link 

The link works once, for 15 minutes. It signs the customer in and opens the quote form (or the page they were trying to reach), and is removed from the address bar. 

##### POR-008 Invalid or used link 

A used, expired or damaged link shows the card "This login link is invalid or has expired." with the link "Log in again" (opens 10-4's login page). 

###### POR-009 

##### "We don't recognize that email address." 

When the e-mail is no longer a portal contact, the screen shows 10-4's logo and name, the heading "We don't recognize that email address.", the line " wasn't found" and two cards: "Need an account? Call us to set up a 

new account." with a "Call" button (10-4's phone) and "Wrong email? Try logging in again with a different email address." with a "Log out" button. 

##### POR-010 Session end 

"Log out" (profile) and a lost session both lead to the page "Logged out" / "You've been logged out." with the button "Log back in", which returns to 10-4's login page. After signing in again the customer returns to the page they were on. 

##### POR-011 Quote link to portal 

On a secure quote link (LNK-005) the button "Customer login" signs the customer in and returns them to the full results page of that request (or to the book page when they came from a book link). 

#### Navigation 

##### POR-012 Landing and menu 

After signing in the customer lands on the "Get quotes" form. The left menu has: the blue button "Quote"; "Quotes" (with a "+" that starts a new quote); "Shipments" (with a "+" menu, POR-053); "Invoices"; "Data"; and the customer's name and picture at the bottom (opens the profile). The logo at the top opens the quote form and shows 10-4's logo and name. There is no search, no queue block, no Customers, Carriers, Bills & Invoices, Reporting, Settings or Support. On a phone the menu opens from the top bar. 

##### POR-013 Pages customers cannot open 

Any page not in the menu list (settings, customers, carriers, reports, accounting, carrier documents and so on) shows the plain page "Something may have broke" / "The page you're looking for is missing." with the button "Back home". The data is refused too, so typing an address does not help. A customer sees only data of their own customer(s); another customer's shipment, quote or invoice looks the same as one that does not exist. 

#### Quotes 

##### POR-020 Quote form for customers 

The customer uses the same "Get quotes" form as staff (section 4.6) with these differences: 

- The customer and contact are filled in and cannot be changed (a person with several customers can choose among them). 

- No vendor tools and no "+ add vendor". 

- No truckload equipment choices: customers request LTL only; truckload work is a shipment request (POR053). 

- No product search and no customer address-book editor; saved addresses of their company are offered in the location box. 

- The footer notes are always shown: "Pickup dates not guaranteed. Transit times and delivery dates are estimated." and, with sort & segregate, "Sort & segregate quoted price is a minimum. Final charge based on shipment and work performed." 

The yellow "no active carriers" banner is for 10-4 and never shows. 

- "Get quotes" with an empty freight class shows "Choose a freight class"; the "Est: " chip helps. Requests can start from an earlier request (duplicate) and from a shipment. 

##### POR-021 Automatic quotes or "Preparing quotes" 

- If the account switch and the customer switch for "LTL auto-quoting" are both on, the request is rated at once, the page shows the rates as the carriers answer (about one minute) and the request counts as answered. 

- Otherwise the request waits for staff. The page shows a rotating refresh icon, "Preparing quotes", "Please wait while we work on gathering quotes for this shipment. We'll email you when they're ready." and a dashed box "Quotes will show up here". The request appears in 10-4's "Quote" queue (POR-070). Staff rate it, share it (section 4.6), and the customer is e-mailed a link. 

- The page refreshes itself while it waits. 

##### POR-022 Results page for customers 

The page shows "Quotes for " with the contact's name, the "+ Ref" editor, the "..." menu, the lane card, the tier tabs "All N", "Standard N", "Guaranteed N", "Volume N" (the tab chosen by staff), the quote cards and the footer notes. Customers never see: the "Sharing" bar, margin, cost, profit, hide/show eyes, "+ Add manual quote", "N carriers didn't return results", and the carrier's account. The footer keeps the button "Duplicate quote"; the "..." menu offers "Duplicate quote request", "Cancel quote request" and "Uncancel quote request" (POR-024). 

- Quotes are visible only after 10-4 shares them or after the automatic search, and only if complete, not hidden by staff, and not manual "house quote" quotes. If staff choose "Stop sharing", the quotes disappear from the customer's page at once. 

- A quote card shows the carrier logo and name (unless carrier names are hidden, POR-060), the service and transit time, a guaranteed icon where it applies and the price as a blue "Book" button showing the price ("Book this shipment for $X"). Expired quotes stay on the list with the button disabled. 

- Footer: service notes, the pickup-date and liability notes (section 4.6) and the guarantee note. 

##### POR-023 Banners for customers 

|Situation|Message|
|---|---|
|Pickup date passed|"Pickup date has passed."with"Choose a new date"|
|Holiday|"This date is a holiday for some carriers"|
|Old quotes|"These are old quotes" / "Changes were made during or after booking."and<br>"See latest quotes"|
|Booking hold|"Booking disabled" / "Contact rep for more info"|
|No credit(only when"Enforce credit<br>limits"is on,and no quote fits)|"No credit" / "Contact your broker to set up a line of credit before booking."|


|Situation|Message|
|---|---|
|Credit used up(only when"Enforce credit|"Insufficient credit" / "These quotes can't be booked because your credit limit|
|limits"is on)|has been reached.Please pay any outstanding invoices to continue booking."|
|Quote too expensive for available credit<br>(only when"Enforce credit limits"is on)|Under the button: "Insufficient credit to book this quote"|
|Nothing found|"Your criteria didn't return any quotes."with"Edit criteria"|
|Booked|"Shipment booked from these quotes"with"View Shipment"|


##### POR-024 What customers can change on their request 

Add or change the reference with "+ Ref". 

- Edit the criteria (lane, items, date) with "Update quotes". Editing starts a new search with the same customer and contact; a request cannot be moved to another customer. 

- "Cancel quote request" ("Are you sure you want to cancel this request?", "No, go back", "Yes, cancel") and "Uncancel quote request". 

- "Duplicate quote request". A request made by 10-4 staff and not yet shared is not visible to the customer at all. 

##### POR-025 Quote history for customers 

"Quotes" lists the customer's own requests and the ones 10-4 has shared with them, in the same rows as staff (section 4.6): date, lane, weight, reference (for example "PO 12345"), mode and the status glyph with the texts "waiting for broker to respond" and "quotes available". No Customer or Rep filter. Empty: "No quote requests." 

#### Booking 

###### POR-030 

##### Book page for customers 

Clicking the price opens the book page, the booking form of section 4.6 with these differences: 

- Title "Book shipment", the box "Custom BOL #", and the line "Quoted ago by ". 

- The customer card is fixed. The contact is the signed-in person. 

- The "Carrier" card shows the quoted service, transit and carrier name (or 10-4's name when carriers are hidden) and the link "Change carrier" (back to the quotes). No cost, margin or vendor section. 

- The lane cannot be changed. The customer completes, for each stop, the company, street, contact name, phone, e-mail(s), open and close times, instructions, reference numbers and the date; for the items, the description, commodity and declared value. The "Share BOL" switches are not shown. 

- A "Price" block shows the service, carrier, transit and "Price $X", and the box "Total value". 

- Notes: "The quote was based on the details provided. The final price may be different if the shipment details change." and the two pickup-date and liability notes. 

- The button reads "Book for $X". 

##### POR-031 Customer Terms & Conditions 

A card with the link "Customer Terms & Conditions" and the box "I have read & agree" appears on the book page. The box is required: if empty, the page shows "Please agree to the terms". The link opens 10-4's document (a web address in a new tab, or a window with the terms text). If 10-4 has not set a document yet, the label is plain text. The date and version of the terms agreed are saved on the shipment. 

##### POR-032 Booking checks 

The checks of LTL-075 (section 4.6) run for customers, except the margin and profit rules: request canceled, already booked, quote no longer available, pickup date in the past, booking hold, quote expired or expiring before pickup, and, only when "Enforce credit limits" is on, credit. A request that staff made and did not share cannot be booked by a customer. 

##### POR-033 What happens at booking 

- The shipment is created and booked at once; a green message "Shipment booked" shows and the customer lands on the shipment page. 

- It is marked as booked by the customer and records the terms accepted and the customer contact. The customer's main rep is set as the booking rep. 

- It appears in 10-4's "Dispatch" queue (LTL) for staff. 

- If both auto-dispatch switches are on, the system sends the pickup request to the carrier (LTL-080); otherwise staff dispatch it. 

- A double click or a repeated send does not create a second shipment. 

##### POR-034 Booked shipment after booking 

The shipment page opens (POR-041). The results page shows the booked quote and "View shipment". 

##### POR-035 Booking hold and credit 

- A customer with "Enable booking" off cannot book; the book buttons are disabled and the bar "Booking disabled" / "Contact rep for more info" shows. 

- Only when the Owner setting "Enforce credit limits" is on (proposed Off at launch, approval pending; PAY-022), a quote whose price is above the customer's available credit cannot be booked. With it off, credit never stops a booking. Customers never see credit amounts, only the messages in POR-023.

##### POR-036 Auto-dispatch for customer bookings 

The pickup request is sent automatically only when "LTL auto-dispatching" is on for the account and for the customer; the staff switch "Auto dispatch" on the staff book form is a separate default. 

Shipments, tracking, documents 

##### POR-040 Shipments list 

"Shipments" lists the customer's own shipments in a flat list with the filters Status, Pickup date, Delivery date, a search box and (only for a customer with several companies) Customer. Rows show BOL number, status, 

dates, lane, customer, carrier (hidden when carriers are hidden) and price; no cost or profit columns. Search finds shipments by BOL, customer, contact, stop and reference text, not by carrier, driver, pickup number or internal notes. Empty: "No active shipments" with "Switch to all shipments". The "Export" button downloads a CSV with BOL #, Status, Pickup date, Delivery date, Origin, Destination, Reference numbers, Price and, when carriers are shown, Carrier name. 

##### POR-041 Shipment page for customers 

The page title is the BOL number. It shows: 

- Header buttons "BOL" and "Labels" (once booked). No edit button and no staff "Documents" page. Status. 

- A carrier card: carrier logo, name, service and transit time, or 10-4's name and service when carriers are hidden. For truckload shipments the card shows 10-4's name. 

- The customer card, the price (read-only), pickup and delivery estimates and transit days. No Reschedule button. 

- The stops with company, address, window, instructions, contact and tracking times (POR-042). 

- The items with totals (value, count, volume, density, length, weight) and a hazmat contact if any. 

- Footer notes, the link "Customer Terms & Conditions", and the block "Questions?" with the name, company and address of the 10-4 rep and the buttons "Call" and "Email". The page refreshes on its own while the shipment changes. 

###### POR-042 

##### Tracking for customers 

There is no separate tracking page. The shipment page shows, for each stop, the estimated arrival, arrived, picked up and delivered times; a map with the route; and for LTL the PRO number (when known) and a "Track" link to the carrier's own tracking page once the pickup has happened. Not shown: driver details and chat, internal notes, the timeline, rate confirmations and cost. 

##### POR-043 Documents for customers 

|Document|How the customer gets it|
|---|---|
|BOL|Header button"BOL".If not ready yet a spinner<br>shows;the customer can press the explicit<br>"generate"button.File<br>`BOL-<BOL`<br>`number>.pdf` .|
|Labels|Header button"Labels";size list"Half-letter" /<br>"4×6";button"Download labels";file<br>`Labels-`<br>`<BOL number>.pdf` .|
|Proof of delivery|"View POD"on delivered loads.|
|Customer invoice|From"Invoices" (only invoices already sent).|
|Customer statement|"Download statement"on"Invoices".|


###### Document 

Carrier rate confirmations, carrier bills and other uploaded documents are never available. Opening a page never creates a document; BOL and labels are created only when the customer clicks the button (or at booking). 

How the customer gets it 


#### Invoices, data, profile 

##### POR-050 Invoices page 

"Invoices" shows, for the customer (buttons for each company if several): an aging bar with five parts "Current", "1-15 late", "16-30 late", "31-60 late" and "61+ late" (each with the invoice count); invoice cards (invoice number, month, balance, "Due ", and the status Open, Late or Paid); and the totals "Not Invoiced $X (N shipments)", "Open $X (N invoices)", "Late $X (N invoices)". A card opens the invoice (read-only, no dispute, send or payment). Invoices 10-4 has not sent are not shown. Empty: "No invoices" with the tiles "Not Invoiced $0", "Open $0", "Late $0". 

- "Download statement": the latest statement, or a fresh one. 

- "Download CSV": file `<customer-name>-open-invoices.csv` with Customer, Customer Invoice Number, PO Number, BOL, Origin City/State/Postal Code, Destination City/State/Postal Code, Carrier Name (empty when carrier names are hidden), Customer Invoice Total, Customer Invoice Balance Due, Customer Invoice Due Date, Customer Invoice Date, Aging, Customer Invoice In Dispute. Disabled when the list is empty. No "Pay" button; customers pay 10-4 outside the portal (ACH or check). 

##### POR-051 Data page 

"Data" shows the lanes map and table for the customer's shipments ("Lanes", "Pickup this week", Origin / Destination / Shipments, "No matching lane data", "Reset filters", "Totals"). The Profit columns and the filter window are not shown to customers. 

##### POR-052 Customer credit view 

A customer sees only the credit messages in POR-023; other credit details stay with staff. 

##### POR-053 Truckload shipment request 

The "+" next to "Shipments" opens a small menu: "Quote" (opens the LTL form) and "Shipment". "Shipment" opens a request form: the customer is fixed, the equipment list is the truckload list (Dry Van by default) with "Partial", "Tanker endorsement" and "Team service", the stops (2 to 10), the items (description, quantity, packaging, weight, size, hazmat, commodity), "Total value", and the note "Pickup, transit and delivery dates are estimated." No vendors, cost, carrier or reps. The button is "Save shipment". The request is saved as a requested shipment and lands in 10-4's "Finish booking" queue where staff price and book it (section 4.2). The customer sees it in "Shipments" with the status "Requested". Changing a request is done by calling the rep (the "Questions?" block). 

##### POR-054 Profile 

The profile page shows the avatar (the customer can upload a picture), the badge "Customer", First name, Last name, Email (read-only), Phone, "Save" and "Log out". No "Change password" (customers have no password) and no team block. 

#### What staff see 

##### POR-070 What lands in 10-4's queues 

|What the customer does|Where staff see it|
|---|---|
|Asks for LTL quotes and the search is not automatic(or<br>the request is not answered yet)|Left menu queue"Quote" (hidden when empty),page<br>"Shipments to quote",and the dashboard.|
|Asks for LTL quotes with automatic quotes on|"Quotes"list(already answered).|
|Books an LTL quote|"Dispatch"queue,the shipment list,and the quote request<br>shows"Shipment booked from these quotes".|
|Sends a truckload shipment request|"Finish booking"queue(status"Requested",customer request).|
|Cancels a request|The request shows"Canceled"with"made this request".|
|The shipment shows who booked it(the customer<br>contact)and that it came from the customer.||


#### What is hidden from customers 

##### POR-060 Carrier names 

When the account option "Reveal carrier names" is set to hide carriers, customers see the delivery date block instead of the carrier logo and name on quotes, in the shipments list and on the shipment card (which shows 10-4's name and the service). The invoice CSV leaves the carrier column empty. The BOL still names the carrier. 

##### POR-061 Never shown to customers 

Cost, margin, profit, markup; the carrier account used; vendors; carrier contacts and rate confirmations; carrier bills; reps and commissions; internal notes; the timeline; driver and tracking-provider details; quotes hidden by staff; quotes staff have not shared; credit limits and amounts; documents other than those in POR043; manual "house" quotes. 

###### POR-062 

##### Live updates 

Customer pages update on their own, for the customer's own items only. The results page shows new quotes as they arrive; the shipment page shows new status, tracking times and documents (BOL and labels buttons change from a spinner to the file when ready); the invoices page shows new invoices. Secure-link pages: LNK-005, LNK-011, LNK-027. 

### 4.11.2 Secure links 

What a secure link is. An address in an e-mail that opens exactly one page without signing in, through a private part that cannot be guessed and is saved with the e-mail so staff see when it was sent and opened. It cannot reach any other page. All secure pages show 10-4's logo and name at the top and, where it fits, a "Questions?" block with the rep's name, company, address and the buttons "Call" and "Email". Pages are marked so search engines do not list them. 

##### LNK-001 Links are per recipient 

The system will create one link per e-mail address. Sending again to the same address reuses the link, renews its 42 days and sends a new e-mail. Each send is recorded with its time, delivery state and open state so staff can see "sent", "opened" and "Failed to send" in the sharing windows. 

###### LNK-002 

##### Expiry 

**No verified duration:** The 42-day application-link and 15-minute sign-in values below are proposals. Main §17.7/Deep3 OQ-40 leaves expiry/access open. S3 signed object URLs and application recipient-share links are distinct mechanisms; neither establishes the other’s lifetime.


A secure link works for 42 days from the day it was last sent (each new send gives a fresh 42 days). After that, or if staff remove the share, or 10-4's account is disabled, the page shows the plain blue panel (LNK003). The portal login link is different: 15 minutes, once (POR-007). The carrier rate confirmation link follows these rules too (LNK-023). 

###### LNK-003 

##### One "not found" answer 

For every secure page, a link that is wrong, expired, removed, for another page, or damaged shows a fullscreen blue panel with a title and a short text and no button: "Quote request not found" / "Quote request does not exist or is not publicly shared." (quotes); "Shipment not found" / "Shipment does not exist or is not publicly shared." (shipment, labels, invoice); "Carrier packet not found" (carrier packet). The panel never says why, so a guessed address reveals nothing. While loading the pages show "Loading quote request", "Loading shipment", "Loading invoice". 

#### Quote link 

##### LNK-004 Where the link comes from 

Staff share quotes from the results page (section 4.6): "Share quotes" or "Email quotes" e-mails a "View quotes" button with this link to each address; "Copy link" gives a view-only link (LNK-006). Stopping the share removes the e-mailed links and the view-only link at once. 

##### LNK-005 Quote page (e-mailed link) 

The page title is "Quote Request #" (or "Quote Request"). It shows: 

- 10-4's logo and name, and the button "Customer login" (only when the account and the customer have portal login on). It signs the customer in and returns to the full results page. 

- "Quotes for "; the contact on the left; "Ref " on the right; and, only when "Enforce credit limits" is on, a credit chip ("Credit available $X" or "No credit"). 

- The yellow banner "These are old quotes." / "Changes were made during or after booking." with "See latest quotes" when the request was changed after booking (one banner only). The link follows the request 

to its latest version. 

The read-only lane card (no pencil). 

- The yellow banner "Pickup date is in the past" / "Contact your broker to update the pickup date." when the date has passed. 

- "Sorry, no quotes available" when there are none. 

- The quote groups (by delivery date if carrier names are hidden, otherwise by carrier). Only complete, visible quotes are listed, sorted by price, with the tier tab staff chose. Cards show the price only. Expired quotes show with the button disabled. 

- Footer notes: "Pickup dates are not guaranteed. Transit times and delivery dates are estimated and typically exclude weekends, holidays and the pickup date.", and for LTL the liability and 5pm-guarantee notes. 

The "Questions?" block; its e-mail button opens a mail with the subject "Re: Quote from to ()". 

- The page refreshes itself while quotes arrive. 

- A canceled request shows the "not found" panel. 

###### LNK-006 

##### View-only link 

The broker UI offers a view-only Copy link labeled “can't book quotes.” Its URL/token structure was not copied or tested; the former “without the private part” assertion is unsupported. Anyone with it sees the quotes but there is no "Book" button, only the price; no credit chip, no link to a shipment and no "See latest quotes". It works only while the request is shared and not canceled. View-only sharing is switched on when the link is copied and off when staff stop sharing.

##### LNK-007 Booking from the e-mailed link 

When the link has its private part and no shipment exists yet, each quote has the blue "Book" button with its price (disabled for expired quotes, a booking hold or, only when "Enforce credit limits" is on, insufficient credit with the message "Insufficient credit to book this quote"). If a shipment already exists, the card opens the shipment page instead (LNK-009). A link made for another request gives nothing extra. 

###### LNK-008 

##### Book from a link (page) 

Clicking "Book" opens "Book Quote Request #": the portal booking form (POR-030) with customer card, stops, items, the quote card with the previous quote, the terms box "I have read & agree", the note "The quote was based on the details provided. The final price may be different if the shipment details change." and the button "Book for $X". The "Customer login" button is shown at the top. The booking uses the request's contact; if none, the contact whose e-mail matches the one the link was sent to; if none, no contact. 

##### LNK-009 After booking from a link 

The short pop-up message "Shipment booked" shows and the customer is taken to the shipment page (LNK011), which opens with the same link. If the request already has a shipment, the book page opens the shipment page directly. A missing request or quote shows "Error loading quote request" / "The quote request you're looking for is missing." with "Quote again". Booking checks, terms rule and hold rules are those of POR-032. 

#### Shipment page (BOL share) 

##### LNK-010 Where the link comes from 

The "BOL" e-mail goes to the stop contacts whose "Share BOL" switch is on (pickup contact on, delivery contact off by default), when a shipment is booked, when staff press the circular "resend BOL" icon beside a stop, or when a stop's e-mail is edited with "Send updated documents" on. Each recipient gets one e-mail with links to the BOL and the labels (sections 5 and 6). The shipper at a third-party warehouse gets the BOL and labels, not the customer. 

##### LNK-011 Page content 

The page title is "Shipment BOL #". It shows: 

1. 10-4's logo and name. 

2. A card "Shipment for " with the reference number on the right. 

3. A green status banner: "Shipment scheduled" (or "Shipment delivered" once delivered). Under "scheduled" it says, where it applies, "The bill of lading will be sent to the origin and destination contacts." (or origin, or destination only). 

4. Buttons: "View POD" once the load is delivered and a POD exists; otherwise "BOL" and "Labels". 

5. The equipment line (equipment or mode, service, transit days, temperature range) and, when carriers are hidden, 10-4's logo instead of the equipment icon. The carrier's name and logo are not shown. 

6. "Locations" with the services row ("Services:") and each stop: type, company, address, date and window, contact, instructions, and tracking times. 

7. "N item(s) to be shipped": item cards, a red "Hazmat contact" / "Contract #" / "Emergency #" panel when hazmat, and the totals (refrigeration range, count, volume, density, length, weight). No value. 

8. Notes: service notes, "The quote was based on the details provided. The final price may be different if the shipment details change.", the date and guarantee notes, and the link "Customer Terms & Conditions". 

9. "Questions?" Never shown: price, cost, invoice, balance, carrier name, map, internal notes, reps, timeline. The page refreshes while the shipment changes. A draft shipment is not shown. 

##### LNK-012 BOL button 

"BOL" downloads the BOL ( `BOL-<BOL number>.pdf` ). If not yet created, a button creates it on demand with a spinner until ready. Viewing the page never creates anything. 

##### LNK-013 Labels page 

"Labels" opens the labels viewer with the header "Labels", a close X back to the shipment page, the list "Size" ("Half-letter" default, "4×6"), thumbnails of the label pages and the button "Download labels" ( `Labels-<BOL number>.pdf` ). If no label of that size exists, an explicit button creates it. Changing the size shows the other size if it exists. 

##### LNK-014 Proof of delivery 

After delivery, "View POD" opens a viewer with the proof-of-delivery documents. The recipient cannot remove or upload documents. 

##### LNK-015 Link from a quote link 

A booked quote link also opens the shipment page (LNK-009). 

##### LNK-016 Shipment page without a private part 

A shipment page cannot be opened from a view-only quote link. It needs its own e-mailed link. 

#### Invoice page 

##### LNK-020 Where the link comes from 

Customer invoices are e-mailed when staff press "Send invoice" (section 4.5), and an invoice can be shared separately with chosen contacts. The e-mail contains a link to the invoice. 

##### LNK-021 Page content 

Title "Invoice #". 10-4's logo; the heading "Invoice " with "for " (plain text), the contact name and "REF "; a "Download" button ( `Invoice-<reference>-from-<10-4 name>.pdf` ); the invoice PDF in a viewer; and, when proof of delivery exists, the heading "Proof of Delivery" and its viewer. A footer with 10-4's name, billing contact, address and the buttons "Call" and "Email". No amounts are shown outside the PDF. 

##### LNK-022 Updated invoice 

If the invoice was changed after it was sent, the page shows an orange card "Invoice has been updated" / "An updated copy will be shared with you via email" and the old copy is no longer downloadable. A failed download shows "Unable to download the invoice. Please try again." 

#### Carrier links 

##### LNK-023 Carrier rate confirmation link 

The rate confirmation e-mail to a carrier contains a link to the rate confirmation page where the carrier reviews the load, signs and accepts. The page, signing steps, carrier terms viewer ("carrier agreement") and what happens after signing are in section 4.3. The link rules are those of LNK-001 to LNK-003: one link per recipient, "Shipment not found" for a wrong, removed or disabled link. A link already used shows the "Load accepted" page, not an error. The carrier never sees price, customer or internal data beyond the rate confirmation itself. 

##### LNK-024 Carrier packet link 

When 10-4 asks a carrier for its latest packet (carrier page, section 4.8; also when covering with "Cover & request packet"), the carrier gets an e-mail with a link to a short guided page "<10-4 name> wants your latest carrier packet". The link is tied to that carrier and to the one packet request. 

##### LNK-025 Packet steps 

|Step|What the carrier sees and does|
|---|---|
|Intro|Three rows"Upload documents" (Authority/permit,insurance,W-9,and factoring), "Fill<br>out insurance" (Tell us your coverage amounts and expiration date), "We'll review your<br>packet" (Shipments will be assigned once we review and approve your packet.).Small<br>print: "By clicking the Continue button below,you are agreeing to the<10-4name>terms<br>and conditions."Button"Continue".|
|Authority|"Is this information correct?"with the carrier's legal name,USDOT number,MC<br>number(s),tax id,phone and address.If shipments are waiting: "shipment(s)waiting" /<br>"We need to review the carrier packet before we can release the rate con(s)."Buttons<br>"Yes,this is me"and"This is not me".|
|Upload|Previously sent files(by name)and new files; "Upload file" / "+add file"and"Done".<br>Error banner"Error uploading documents".Only the carrier's own folder accepts files;<br>allowed types and sizes follow section6.|
|Insurance|Heading"Tell us about what insurance you have".Fields:General Commercial Liability<br>each occurrence,Automobile Liability combined single limit,Motor Truck Cargo,Earliest<br>expiration date.A list"Uploaded documents".Button"Save".|
|Thank you|"Thanks for sending us your carrier packet" / "We'll review your packet and get back to<br>you."with"Back home".|
|Help|"This is not me"shows"Did we get something wrong?" / "Give us a call and we'll get<br>things fixed."and a call button with10-4's phone,and"Back home".|
|A completed packet can be<br>sent again.Any load error<br>shows"Error loading Carrier<br>Packet".Staff review is in<br>section4.8.||


##### LNK-026 Carrier terms link 

A link to the carrier terms ("carrier agreement") opens a page showing 10-4's carrier terms (a PDF or the terms text). See section 4.3. 

###### LNK-027 

##### Rules common to every secure page 

The page shows only an explicit allow-list of fields for its purpose. A field added to a staff screen later does not appear on a secure page by itself. 

- Every action on a secure page is checked against the link, not only on the screen. 

- The quote page and the shipment page update on their own while the request or shipment changes. The invoice page and the carrier packet pages load once; reload to see changes. 

- A secure page cannot change the rate, price, customer or other core data; it can only write: booking a quote (quote link), creating a BOL or labels on request (shipment page), signing (rate confirmation) and the carrier's packet. 

- Secure pages record who did it as "the link recipient" (not a staff member), so the shipment timeline reads clearly. 

Too many requests from one address in a minute show a "too many requests" answer. 

##### LNK-028 Turning links off 

|What staff do|Effect|
|---|---|
|"Stop sharing"on a quote request|All quote links for it and the view-only link stop.|
|Remove a share(BOL,invoice,rate confirmation)|That recipient's link stops.|
|Cancel a quote request|The quote links for it stop(not found).|
|Disable the account|Every secure link stops.|
|Wait42days|The link expires.|


##### LNK-029 Resend 

Staff can send a link again: the circular "resend BOL" icon, the BOL page's "Send" / "Resend", "Email quotes" in the sharing window, the invoice share window, and the resend control on the rate confirmation. 

##### LNK-030 Password reset link 

The link in the password-reset e-mail is a secure link of a different kind: it works for 60 minutes and once, and stops working if the password or the login e-mail changed in the meantime. See section 4.10. 

### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

|Action|Owner|Member|Customer|Carrier/recipient|
|---|---|---|---|---|
|Turn on portal login for the<br>account and customers|Yes|Customer switches:yes;<br>account switches:Owner<br>only|No|No|
|Copy the customer login<br>link|Yes|Yes|No|No|
|Run quotes and book in the<br>portal|Yes(as staff,<br>section4.6)|Yes|Yes,own<br>company only|No|
|Share quotes,copy the<br>view-only link,stop sharing|Yes|Yes|No|No|
|Open a quote link|Yes|Yes|Yes|Yes,anyone with the link|
|Book from a quote link|Yes|Yes|Yes|Anyone with the e-mailed<br>link(not the view-only<br>link)|
|Open a shipment or invoice<br>link|Yes|Yes|Yes|Yes,with the e-mailed<br>link|
|Sign a rate confirmation|No|No|No|Yes,carrier with the link|


|Action|Owner|Member|Customer|Carrier/recipient|
|---|---|---|---|---|
|Send a carrier packet|No|No|No|Yes,carrier with the link|


## 4.12 Notifications and Live Updates

**Evidence review — partial:** Main §§19.1/6 and Deep1–3 record No sources configured, UI loading/settled changes, WebSocket frames and automatic metadata requests. These do not establish the claimed business-event subscriptions, broadcast audience, callback ordering, permissions or refresh timing.

| Requirements reviewed | Supported portion | Proposed / unverified portion |
| --- | --- | --- |
| NTF-001–002 | Dated broker queue labels/counts and navigation | Full eligibility, zero hiding/equality and midnight/reconnect refresh contract |
| NTF-010–018 | Sent/received WebSocket events, document loading, Recently visited metadata | Company-private isolation, session revocation, 1–15sec backoff, every event-to-page refresh, stale-form protection, 2/3sec polling and five-per-kind cap |
| NTF-020, NTF-030–032 | Not sent/recipient/time sharing display; copy feedback observed in bill inspection | Complete delivery/open/failure meaning, toast timings/catalog, undo, and universal confirmation-before-send promise |
| NTF-040–042 | Notification window says Choose in-app notification alerts to receive / No sources configured | Per-user persistence, all-source absence, no email settings and complete inbox/announcement scope |

No sources configured concerns that sampled in-app settings window; it does not prove all email/SMS alerts are off. OQ-28 leaves quotesFilter scope/audit behavior unresolved. Existing events and request HTTP success must not be promoted to a tested live-update protocol.


In short: The system keeps every open screen up to date without reloading. When one user changes a shipment, a quote, a document or a payment, everyone else looking at it sees the change within seconds. In-app alerts are simple: count badges on the sidebar queues, short pop-up messages after an action, status marks on shared items, and one small notification settings window. E-mails are covered in section 5. 

### Sidebar badges and counters 

##### NTF-001 Queue count badges 

Broker users see an orange count badge on each work queue in the left sidebar. A row is hidden when its count is 0. 

|Sidebar row|Counts|Opens|
|---|---|---|
|Finish booking|Customer requests that need a booking<br>finished|Shipments list(section<br>4.2)|
|Quote|Quote requests that need to be finished|Quote history(section<br>4.6)|
|Dispatch|LTL loads waiting for a pickup request|Shipments list(section<br>4.2)|
|Cover|Booked truckload loads without a carrier|Shipments list(section<br>4.2)|
|Confirm pickups("Confirm pickup"when the<br>count is1)|Scheduled loads with a pickup date<br>before today|Section4.4|
|Confirm deliveries("Confirm delivery"when the<br>count is1)|In-transit loads with a delivery date before<br>now|Section4.4|


The block of queues shows when at least one queue has a count above 0. The "Confirm deliveries" row shows whenever its own count is above 0. 

Screen readers hear, for example, "Cover 53 outstanding tasks". 

Clicking a queue re-checks its count. 

Customers (portal users) and carriers never see these badges. 

##### NTF-002 When the counts refresh 

Counts are re-checked when any shipment, quote or carrier changes (by anyone), when the connection is restored, and when the user moves to another page. The clock does not change counts: a load whose pickup date passes at midnight enters "Confirm pickups" at the next refresh. 

### Live updates 

##### NTF-010 Live connection 

After sign-in, each browser tab keeps a live connection, private to the signed-in company account. It closes when the user signs out, changes their password (all other sessions close), is removed from the account, or the sign-in session expires. The browser reconnects automatically, waiting longer after each failed try (1 to 15 seconds). 

##### NTF-011 What refreshes when someone else changes something 

When a change is saved, every other open screen showing that item is refreshed with the latest saved data. Nothing is pushed into a screen without being re-checked, so users never see data they are not allowed to see. 

|Change by another user or by the system|What refreshes on your screen|
|---|---|
|Shipment created,booked,edited,covered,canceled,un-canceled|Shipment page,shipments list,queues,badges,<br>timeline|
|Carrier assigned or removed,rate confirmation sent or signed,<br>driver details changed|Shipment page,carrier card,driver strip,tracking<br>pill|
|Tracking event,pickup,delivery,appointment,tracking status<br>change|Stop cards,tracking log,queues,badges|
|Document uploaded or removed(POD,bill,other)|Documents page,shipment page|
|Quote request shared,stopped,canceled or finished|Quote results,quote history,customer portal quote<br>list|
|Invoice created,sent or changed;carrier bill changed|Invoice and bill pages,Bills and Invoices lists and<br>tab counts|
|Payment recorded,applied,un-applied or deleted|Payments lists,invoice and bill pages,customer<br>credit and usage|
|Customer credit limit or credit report changed|Customer page,credit usage|
|Contact added,changed,removed or verified|Contact lists|
|Carrier packet or compliance documents changed|Carrier page,approval list|
|Share opened or failed|Share windows and share status marks(NTF-020)|
|Terms changed|Terms pages|


##### NTF-012 Shipment timeline 

The timeline on the shipment page gets the new line as soon as it happens (section 4.2). 

##### NTF-013 Open forms are never overwritten 

A live update never replaces what a user is typing. The edit shipment form and the Cost and Price editor keep the data they opened with. If someone else saved a change meanwhile, saving shows "Previous changes detected" with a Reload shipment button, and the user decides. 

##### NTF-014 Quote results stream in 

While LTL carriers answer a quote request, each answer appears on the results page as it arrives. A final message says all carriers have answered, which ends the "Preparing quotes" state and, if nothing came back, shows "Your criteria didn't return any quotes". Duplicate quotes are tidied before display (section 4.6). 

##### NTF-015 Documents ready 

When a generated PDF is ready (BOL, labels, customer confirmation, carrier rate confirmation, invoice, customer statement), the button switches from a spinner to the file. Customers on the portal see their BOL and labels buttons switch the same way. See section 6. 

##### NTF-016 If the connection drops 

While the connection is down, pages that wait for a result (quote results, shipment page while a driver start is pending, invoice PDF) ask for fresh data every few seconds (about every 2 seconds on quote results, every 3 on the shipment page). When the connection returns, the open page, lists and counts refresh once. 

##### NTF-017 Customers and share pages 

- Customers in the portal get live updates only for their own shipments, quotes and invoices, never for costs, margins or other customers. 

- Secure-link pages refresh themselves: the quote page shows new quotes as they arrive, and the shipment page follows shipment changes (LNK-005, LNK-011). 

The invoice page and the carrier packet page opened from a link load once; reload to see changes. 

##### NTF-018 Recently visited 

Customer, carrier, vendor, shipment and quote pages a user opens are remembered per user (last five of each kind) and offered in Find (section 4.1). 

### Share status marks 

##### NTF-020 Opened and failed marks 

Wherever a document is shared by e-mail (BOL, rate confirmation, invoice, quote, carrier packet), each recipient shows a live status. Section 5 explains what causes each state. For the carrier rate confirmation, only "Resend" after a failure is shown (RCF-005). 

|Mark|Meaning|
|---|---|
|"Unopened" (grey)|Sent;the recipient has not opened the link.|


|Mark|Meaning|
|---|---|
|"Opened" (green|Opened.Hovering shows when.|
|check)||
|"Failed to send" (red)|The e-mail could not be delivered.Hovering lists the reason(for example dropped,deferred,<br>bounced,blocked).|
|Pending|Still being sent.|


### Messages 

##### NTF-030 Short confirmation and error messages 

After most actions a short plain-text message appears for a few seconds in the lower part of the screen. Errors on a form are also shown in a red banner. Other screens list their own messages in their sections. 

|Area|Messages|
|---|---|
|Tracking events|"Saved tracking event", "Updated tracking event", "Deleted tracking event" (with Undo), "Failed to<br>save the event.If you have an ad blocker,disable it and try again."|
|Appointments|"Appointment saved", "Failed to save appointment", "Appointment removed", "Failed to remove<br>appointment"|
|Driver details|"Error updating driver details"|
|BOL|"BOL shared", "Failed to send BOL"|
|Invites|"Invite resent!"|
|Quote sharing|"Error sharing" (banner)|
|Invoices|"Unable to download the invoice.Please try again."|
|Copy buttons|A short confirmation for1.5seconds after copying a phone number or e-mail|
|E-mail could not be<br>queued|"E-mail could not be queued."|


##### NTF-031 Undo 

Some messages carry an Undo link (deleting a tracking event, deleting a note, and similar). Undo restores the item. 

##### NTF-032 Confirmations before risky actions 

Actions that send an e-mail to someone outside the company or revoke access ask first, for example "Stop sharing these quotes?" with "The customer will no longer see these quotes." and the buttons Not now and Stop sharing. 

### Notification settings 

##### NTF-040 Notifications window 

Settings (section 4.10) has a tile "Notifications" with the text "Manage in-app alerts". It opens a small window titled "Notifications" with the line "Choose in-app notification alerts to receive:". Each setting is a switch that saves when flipped; there is no Save or Done button. Click outside the window or press Esc to close it. 

###### NTF-041 

##### Sources in the first version 

The window shows a grey box with "No sources configured", because no in-app alert source is switched on for 10-4. There are no per-user e-mail notification settings. Company-wide e-mail recipients (Cc lists for invoices, credit request recipients) are set in Settings (section 4.10). 

##### NTF-042 No notification inbox 

There is no bell icon, notification inbox or unread count in the first version. Alerts that need action show as queue badges (NTF-001), warnings on the shipment page (section 4.4) and the dashboard (section 4.1). 

### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

|Action|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|See queue badges|Yes|Yes|No|No|
|Get live shipment,quote,document|Yes|Yes|Own items only(portal and secure-link|No(carrier link|
|and payment updates|||shipment and quote pages)|pages load once)|
|Open the Notifications window|Yes|Yes|No|No|
|See share status marks|Yes|Yes|No|No|


## 5. E-mails

**Evidence review — proposed send catalogue:** Main §§12.4–6, 14.10, 16.5, 17 and 19.2 establish mail-related controls/help, not delivered email. No message, invite, verification/reset, packet request, invoice or statement was sent during source inspection or this validation.

| Requirements reviewed | Source-supported portion | Proposed / unverified contract |
| --- | --- | --- |
| EML-001–006 | Broker share/recipient states; rate-con reply-to/phone fallback help (§19.2) | One mail per recipient, envelope sender/Cc/reply-to, token scheme/expiry, attachment generation/merge, delivery/open states, three retries/30sec backoff, failure atomicity and duplicate suppression |
| EML-010–011 | Per-stop Share BOL/contact-email and resend/update entry | Actual To list, defaults/inheritance, subject/body, attachments/links, deduplication and cancellation/resend behavior |
| EML-020–026 | Cover/send/packet branches, existing Confirmed and Share, terms/email override help | Sent PDF/body/subject, hold release, signed-copy conditional send, amendment triggers, no dropped-carrier mail, tracking SMS ownership and mailbox handling |
| EML-030–033 | Invoice/statement/quote-send entries and preferences; Not sent differs from visibility | Recipient/body/subject, billing-address save, attachments versus merged PDF, POD gate, statement content/caching, copy-link sharing and actual delivery |
| EML-050 | Packet-request entry/help | Full request email/wizard/recipient1–10 range/renewal |
| EML-060–063 | User/login settings and profile entry points | Invite/verification/reset/customer-login email templates, 14day/24hour/60minute/15minute lifetimes, enumeration and session handling |

Quoted subjects/bodies and incomplete phrases below are draft copy, not captured messages. Supply explicit broker/BOL/party/link/date placeholders and approve the complete templates before implementation; do not ship phrases such as “on behalf of.” or filenames with blank identifiers. No-send assertions in the final list are also unverified. A button's label does not prove whether the app or an external provider sends a message.


In short: Every e-mail the system sends: trigger, recipient, content, attachments, resending and failure handling. The three day-to-day messages are the BOL and labels to the shipper, the rate confirmation to the carrier, and the invoice to the customer. This section is the home for e-mail contents; other sections point here (EML IDs). 

### How e-mail works in the system 

##### EML-001 One e-mail per recipient, with a secure link 

Every e-mail to someone outside the company goes to each recipient separately, with its own secure link that works without signing in (life, renewal and revoking: LNK-001 to LNK-003; section 4.11). Links in sign-in e- mails expire sooner (see the catalogue). 

###### EML-002 

##### Sender, reply-to and Cc 

The sender is the system's company address, with the company name in the display name. 

- Replies go to the person who sent the message (BOL, invoice, packet request, invite). For the rate confirmation, replies go to the reply-to address in Settings, Carriers ("Rate confirmation" settings), else to the user who covered the load. Sign-in and verification e-mails have no reply-to. 

- Invoice e-mails also go to the company's "Cc invoices" addresses (Settings, Accounting). 

##### EML-003 Delivery status 

Each send has a status visible where the item is shared: Pending (being sent), Sent, or Failed. When delivery information is available, the screen also shows "Unopened", "Opened" (with times) or "Failed to send" with the reason (section 4.12, NTF-020). 

##### EML-004 Failure handling 

- If the mail service does not accept a message, the system tries again up to three times with a growing wait (30 seconds, then longer). After the third failure the send is marked "Failed to send" with the reason. 

- The business action is not undone: a booked load stays booked and a sent invoice stays sent; only the e- mail is marked failed. The user sees a message such as "Failed to send BOL" and can send again. 

- If the system cannot even queue a message, the user sees "E-mail could not be queued." and can try again. 

- A message to a person who no longer exists, a canceled invoice, or a customer with nothing to bill fails at once, without further tries. 

- A message is never sent twice by accident: a retry sends only if the earlier try did not go out. 

##### EML-005 Attachments and links 

BOL, rate confirmation, invoice and statement e-mails carry the PDF as an attachment and a link to the secure page. Documents are produced when the e-mail is sent. PODs are attached to the invoice e-mail as separate files per the customer setting "Combine PDFs (bill and POD)" (CUS-015, DOC-012). Nothing is merged into one PDF, and the BOL is not attached to the invoice e-mail. 

##### EML-006 Wording and review 

Subjects and texts below are the wording the system will use; 10-4 can supply different wording for any message. 

### Catalogue at a glance 

|#|E-mail|Sent to|When|Day-to-day|
|---|---|---|---|---|
|1|BOL and labels|Stop contacts|Booking,resend,after edits|Yes|
|2|Rate confirmation|Carrier dispatcher|Carrier assigned|Yes|
|3|Signed rate confirmation follow-up|Carrier dispatcher|After the carrier signs|Yes|
|4|Updated rate confirmation|Carrier dispatcher|After a change,if chosen|Sometimes|
|5|Invoice|Customer billing<br>contacts|Invoice sent|Yes|
|6|Invoice shared with another<br>contact|Chosen contacts|Invoice"Share"|Sometimes|
|7|Customer statement|Customer billing<br>contacts|"Send statement"|Sometimes|
|8|Quote share|Customer contacts|"Send email"in quote<br>sharing|Sometimes|
|9|Carrier packet request|Carrier contacts|Packet requested|Sometimes|
|10|User invite|New user|Owner invites|Sometimes|
|11|E-mail address verification|New login address|User changes login e-mail|Rare|
|12|Password reset|User|"Forgot password?"|Rare|
|13|Customer portal sign-in link|Customer contact|Customer asks to sign in|Often<br>(customers)|


### BOL and labels 

##### EML-010 BOL and labels to the stop contacts 

When a load is booked from the booking form, one e-mail goes to each e-mail address on each stop where "Share BOL" is on (stop 1 is on by default; the address book remembers each contact's choice). Duplicate 

addresses get one e-mail. If no stop has such an address, nothing is sent. Reply-to is the user who booked. 

|Item|Content|
|---|---|
|Subject|"BOL from"|
|Body|An optional message,then"Download BOL"and"Download labels"links.|
|Attachments|The BOL PDF and the labels PDF.|
|Links|Secure shipment page(BOL,POD)and secure labels page(labels in half-letter and4×6).|
|Customer rate confirmation|Not attached(staff send it separately,section6).|


##### EML-011 Sending the BOL again 

The Resend BOL icon on each stop card sends the BOL again to that stop's addresses (section 4.4). Message "BOL shared"; failure "Failed to send BOL". 

The BOL page has Send and Resend (section 6). 

- When a booked load is edited, the "Send updated documents" panel shows a BOL row (switch on by default) listing who will be e-mailed. Sent after the first time, the e-mail carries "The BOL for this shipment has changed. Please disregard previous BOL." 

With no BOL contacts: "No BOL contacts to send to." 

- A canceled load's BOL is not re-sent. 

### Carrier e-mails 

##### EML-020 Rate confirmation to the carrier 

Trigger: the carrier is assigned with "Cover & send rate con" (an approved carrier, or an Owner override; section 4.3), or the rate confirmation is released after the carrier is approved, or a user shares it again. 

|Item|Content|
|---|---|
|Recipient|The carrier dispatcher chosen on the cover form(contact name and e-mail required).More contacts can be<br>added in the rate confirmation Share window.|
|Subject|"Confirm Load"|
|Body|"sent you a rate confirmation for load: <origin city,ST>to<destination city,ST>,pickup."An optional note<br>("Note: ").A button"View rate confirmation".Footer: "Please review the rate confirmation,add the driver<br>details and sign."|
|Attachment|The carrier rate confirmation PDF"Carrier-Rate-Con-.pdf".|
|Link|Secure rate confirmation page where the carrier reads the terms,enters driver details and signs.|
|Reply-to|The rate confirmation reply-to in Settings,else the user who covered the load.|


##### EML-021 Held rate confirmations 

While a carrier needs approval, the rate confirmation is held and not sent. When an Owner approves the carrier, it is sent. For a blocked ("Don't use") carrier, only an Owner can turn on "Override coverage status"; the rate confirmation then goes out at once. A Member cannot override. Until then the message is "Rate con will be sent when you approve this carrier". With "Cover & request packet" the packet request goes first (EML050). Plain "Cover" (new carrier, packet request off) sends no e-mail. 

###### EML-022 

##### Follow-up with the signed rate confirmation 

Trigger: the carrier signs and a carrier agreement applies and was agreed to (section 4.3). Then the carrier page shows "Thanks, we'll send you a followup email with the signed agreement." 

|Item|Content|
|---|---|
|Recipient|The same dispatcher.|
|Subject|"Signed rate confirmation"|
|Body|"Thanks for confirming load.The signed rate confirmation is attached."and a"View rate confirmation"link.|
|Attachment|The signed rate confirmation PDF(the version the carrier signed).|
|Reply-to|As in EML-020.|


##### EML-023 Updated rate confirmation 

Trigger: after a change to price, terms, dates, appointment or pickup number on a signed load, with "Send updated Rate con" on. A universal Off default is contradicted by checked Rate Con controls in sampled assigned shipment and appointment editors (main §16.5/7; Deep2 E-140/142). This separate context, exact recipients and actual sending remain unverified. Same format as EML-020; the link page lists what changed and has a Confirm changes button. The rate confirmation returns to "draft" until the carrier confirms.

###### EML-024 

##### No e-mail to a dropped carrier 

Removing a carrier from a load sends no e-mail. The old link shows "Shipment no longer available." 

##### EML-025 Driver tracking link 

The text message with the Trucker Tools app link goes to the driver from Trucker Tools, not from the system (section 4.4). 

##### EML-026 Carrier paperwork mailbox 

The default rate confirmation terms ask carriers to send BOL, invoice, rate agreement and POD to 10-4's accounting mailbox. The system does not read that mailbox. 

### Customer e-mails 

##### EML-030 Invoice 

Trigger: Send invoice on the invoice page, or the bulk Send invoices window (section 4.5). Send is blocked until the load is picked up, and until a required POD is uploaded. 

|Item|Content|
|---|---|
|Recipients|The customer's billing e-mail addresses.If none exist,the window asks for them;the typed address is saved<br>to the customer only after the user chooses to save it("Saved as the customer's billing email.").|
|Cc|The company's"Cc invoices"addresses.|
|Subject|"Invoice from"|
|Body|"sent you invoice for BOL." "Amount due:$X". "Due by<MM/DD/YYYY>".The message the user typed(up<br>to2,000characters).A"View invoice"link.|
|Attachments|The invoice PDF;the POD as separate file(s)per"Combine PDFs(bill and POD)" (DOC-012).The BOL is not<br>attached;nothing is merged.|
|Link|Secure invoice page with the invoice and POD.|
|Reply-to|The user who sent it.|


One send per address; pressing Send twice or a network retry does not send a second e-mail. Resending is a deliberate action ("Resend"). 

Failure: the invoice is still marked sent; the failed address shows "Failed to send". 

##### EML-031 Invoice shared with another contact 

Trigger: Share on the invoice page. The invoice must be sent first (otherwise "Send the invoice first"). Same content as EML-030. 

##### EML-032 Customer statement 

Trigger: Send statement on the customer's Invoices tab, with the line "Send an email with statement to ". 

|Item|Content|
|---|---|
|Recipients|The customer's billing e-mail addresses.If none: "Add a billing email address".|
|Subject|"Statement from"|
|Body|"Please find attached your statement of open invoices."and the company name.|
|Attachment|Statement PDF listing sent,unpaid invoices with a balance,generated when sent and always current.|
|After sending|The card shows"Last sent by".|


A customer with no open invoices, or an archived customer, gets no statement (the user sees an error). 

##### EML-033 Quote share 

Trigger: Send email in the quote Sharing window (section 4.6). 

|Item|Content|
|---|---|
|Recipients|Customer contacts(contact's e-mail pre-filled)plus added addresses.|
|From/reply-<br>to|The sending user.|
|Subject|"Quotes for<origin city,ST> -> <destination city,ST>"|
|Body|The message;default"Here are the quotes that you asked for.Let me know if you have any questions."<br>Reference number of the first stop.A"View quotes"link.|
|Preview|A Preview shows the e-mail before sending.|
|Link|Secure quotes page,with prices,where the customer can book.|
|Stop|Stop sharing(confirmation"Stop sharing these quotes?")ends access.Sharing again sends a new e-mail.|


A Copy link option shares the quotes page without an e-mail; copying the link turns on view-only sharing of the quotes. 

### Carrier packet 

##### EML-050 Carrier packet request 

Trigger: Request carrier packet, Cover & request packet, or automatically when covering with an unapproved carrier and the account setting "request carrier packets" is on (sections 4.3 and 4.8). 

|Item|Content|
|---|---|
|Recipients|The carrier contacts chosen(1to10,each with an e-mail).Otherwise: "Choose a contact with an email."|
|Subject|"wants your latest carrier packet"|
|Body|The same line and"Upload your carrier packet"with the link.|
|Link|Secure packet page:insurance amounts,expiry date and documents.|
|Reply-to|The user who asked.|
|Resend|Allowed,also after the packet is completed.|


### Users and sign-in 

##### EML-060 User invite 

Trigger: an Owner invites a person in Settings, Users. The invite link exists only in this e-mail. 

|Item|Content|
|---|---|
|Recipient|The typed e-mail address.|
|Subject|"invited you to join"|
|Body|"Accept the invitation"link. "This invitation expires on."|
|Expiry|14days.|
|Resend|Resend renews the14days and sends again;the button then shows"Sent"and the message"Invite resent!".|
|Reply-to|The inviter.|


##### EML-061 E-mail address verification 

Trigger: a user changes their login e-mail on their profile. The new address is not used until verified. 

|Item|Content|
|---|---|
|Recipient|The new address.|
|Subject|"Confirm your new email address"|
|Body|"Someone asked to use as the login email of an existing10-4TMS account.If that was you,sign in with your<br>current email and confirm:"with a link. "The link expires in24hours.If you did not ask for this,ignore this email;<br>nothing changes."|
|Rule|The user must be signed in as the same account to confirm.If the address is taken meanwhile: "Account<br>already exists".|
|Reply-to|None.|


##### EML-062 Password reset 

Trigger: Forgot password? on the sign-in page. 

|Item|Content|
|---|---|
|Recipient|The login address.The page always answers the same way,so nobody can find out which addresses have<br>accounts.|
|Subject|"Reset your password"|
|Body|"We received a request to reset the password for<br>."A"Reset your password"link. "The link expires in60minutes.If you did not ask for this,ignore this email;<br>your password does not change."|
|After<br>reset|All other sessions are signed out.The link stops working if the login e-mail or the password changes<br>meanwhile.|


##### EML-063 Customer portal sign-in link 

Trigger: a customer contact asks to sign in on the company's customer login page (sign-in link rules: POR005). 

|Item|Content|
|---|---|
|Recipient|Only a contact whose customer has portal login on.Others get no e-mail but see the same<br>answer.|
|Subject|"Log in to"|
|Body|"Use the link below to log in to."A Log in link. "This link expires in15minutes and works<br>once.If you didn't ask for it,you can ignore this email."|
|If the contact is unknown|"We don't recognize that email address."|
|at click time||


### E-mails that are not sent by the system 

- Credit request. The "Request credit" button opens the user's own mail program with a prepared message to the company's credit request addresses (Settings, Accounting). 

- Past-due reminders. Weekly past-due statements to customers are not in the first version. 

- Driver text message (EML-025) and carrier paperwork into 10-4's accounting mailbox (EML-026). 

- Support requests and QuickBooks's own payment links. 

### Who can do what

**Proposed permission summary:** read with ROL-025 and main §19.4. Visible controls do not establish backend grants/denials; untested role claims remain unverified.

|Action|Owner|Member|Customer|Carrier|
|---|---|---|---|---|
|Send BOL,rate confirmation,invoice,statement,quote,packet request|Yes|Yes|No|No|
|Invite users,resend invites|Yes|No|No|No|
|Change the reply-to and Cc lists|Yes|No|No|No|
|Request a sign-in link or password reset|Yes|Yes|Yes|No|
|Open e-mail links|n/a|n/a|Yes|Yes|


## 6. Documents

**Evidence review — partial existing files, not tested generation:** Main §17.2/E-83–92 visually inspects specific existing LTL BOL/labels and TL rate/customer confirmations. Deep3 E-145–160 refreshes wrappers/upload/payment entries but explicitly does not reverify every PDF body. No generation/upload/removal/resend/signature/revision was submitted.

| Requirements reviewed | Supported portion | Proposed / unverified detail |
| --- | --- | --- |
| DOC-001–002 | Existing PDF/file categories, thumbnails/download/Regenerate and signed object links | Universal page/paper/fonts/logos/5MB formats, barcode absence, all generation/refresh triggers/latency/version/cache/audit guarantees |
| DOC-003–005 | Existing straight BOL, stop/contact/instruction/billing/Acct/quote fields, freight table with NMFC/Class, signature spaces; wrapper | Full exact legal text/layout, one-page/all-stop rules, generated filenames, privacy/send/gate/default policies |
| DOC-006–007 | Labels include provider/service/FROM/TO/order-BOL/weight/routing/pieces; sampled Half-letter/4x6 choices and five PDF entries | One-label-per-piece, 100 cap, four-letter destination algorithm, identical labels, paper layout/grid/retention; TL preview failure is observed |
| DOC-008–010 | Customer confirmation trip/equipment/weight; existing two-page carrier confirmation with4200 agreed amount, terms/payment/signature areas | Universal legal text/snapshot/signature/version/price/privacy, exact logos/field mapping and automatic send/generation |
| DOC-011–012 | Invoice PDF/regenerate/remove/send/POD and balance controls | Full draft/sent template/numbering/totals/date/watermark, remove=cancellation policy, recipients/attachments/merge and refresh effects |
| DOC-013–014 | Statement/download/send controls and “email with attached statement PDF” help | Actual statement columns/filters/order/aging/date/bank/privacy/cache/filename, email and permissions |
| DOC-015 | Source Documents index/party groups, files/POD/bill/Misc slots and download/regenerate entries | Full original item was truncated; supported continuation supplied below without inventing missing screens/requirements |

**No universal document template inferred:** Customer-facing output, carrier output and broker wrappers must be validated separately. Existing signature marks do not establish the signing supplier, acceptance integrity or an enforceable signed snapshot. Client must approve legal/commercial text and templates (SC-09).


In short: The system builds six printable PDF documents: the Bill of Lading (BOL), shipping labels, the customer rate confirmation, the carrier rate confirmation, the customer invoice and the customer statement. It keeps them current as the load changes and e-mails them (contents of the e-mails: section 5). Each shipment has a Documents page where reps see every document, upload proofs of delivery (POD), carrier bills and other files, and download anything. Reps and Owners use these screens; customers and carriers receive documents by e-mail or secure link. This section is the home for PDF layouts (DOC IDs). 

### Rules for all generated documents 

##### DOC-001 Generated documents 

BOL, labels, customer rate confirmation, carrier rate confirmation, customer invoice and customer statement are built by the system. 

- Each is a PDF on US Letter paper (4×6 labels excepted), built from the load's current data. The PDF is kept so every user sees the same file; a new file replaces the old one when the data changes. 

- Footer of the BOL, customer rate confirmation and carrier rate confirmation: "© 10-4 TMS · All product names, logos, brands, trademarks and registered trademarks are property of their respective owners." The invoice footer is the same sentence without the "© 10-4 TMS ·" start. Labels have no footer. 

- One plain sans-serif font; carrier and broker signatures on the carrier rate confirmation use a handwritingstyle font. 

- Money is shown as "$1,500.00", weights as "10,044 lb", dimensions as `40" L x 45" W x 48" H` . The country "USA" is printed in grey after the postal code. 

- Logos: the BOL and labels show the customer's logo; the customer rate confirmation, carrier rate confirmation and invoice show the broker's (10-4's) logo. A logo is a PNG, JPEG, WebP or GIF up to 5 MB (set on the account and customer screens, sections 4.10 and 4.7). 

- No document shows barcodes in the first version. 

###### DOC-002 

##### When documents are created and refreshed 

|Trigger|What happens|
|---|---|
|Booking a shipment|The BOL,the half-letter labels and the customer rate confirmation are<br>generated in the background within a few seconds.A draft customer<br>invoice record is created(section4.5).|
|Editing the shipment,changing Cost&Price|The BOL,labels and customer rate confirmation are refreshed in the|
|lines,canceling,restoring a canceled load,|background.|
|changing the customer||
|Covering a truckload|The carrier rate confirmation is created when it is sent(section4.3).|


|Trigger|What happens|
|---|---|
|The carrier signs,or the rate confirmation is re-|The carrier rate confirmation is refreshed.A separate copy of the signed|
|sent|version is kept(DOC-009).|
|Sending an invoice,recording a payment,<br>editing invoice charges|The customer invoice PDF is refreshed.|
|Sending a statement|The statement is built at that moment.|
|Pressing"Regenerate document"in a viewer|The document is rebuilt at once from current data.|


- Opening the Documents page or a viewer never creates or changes a document. A missing document shows "Not available" with the "Regenerate document" button. 

- If nothing printed on a document changed, the existing file is kept. 

- Generating a document never changes the load's "last updated" time and never shows a "load was changed" warning to other users. 

- If the background build fails, the page stays usable and a rep can press "Regenerate document". 

- A canceled load keeps its documents. 

### Bill of Lading (BOL) 

##### DOC-003 BOL contents 

Title "STRAIGHT BILL OF LADING – NON NEGOTIABLE". One page, top to bottom: 

|Block|Contents|
|---|---|
|Header|The customer's logo on the left.The title. "BOL" ("BOL"in grey).A dashed box on the right with"PRO<br>label here"for a hand-applied PRO sticker;with a PRO number, "PRO"is printed under it.|
|Equipment<br>line|The equipment(for example"Dry Van"); "LTL"for less-than-truckload.When the setting Settings><br>Customers, "Hide TL carrier names"is off, "Carrier: "follows. 10-4's current setting hides it.|
|"PICKUP"and<br>"DELIVERY"<br>columns|Each with date(for example"Fri,Oct2"),time window("8:00AM— 4:30PM"),company(bold),street,<br>city,state,postal code. "PICKUP"is the first stop, "DELIVERY"the last;on loads with more than two stops<br>only these two are printed.A chip"Residential pickup"or"Residential delivery"appears for a residence.|
|Billing box|Heading"BILL TO",for example"BILL THIRD PARTY PREPAID TO".Then the billing company with the<br>billing e-mail,and the billing address.|
|Items table|Observed LTL columns "Units", "Pkg type", "HM", "Description (said to contain)", "Dims", "NMFC", "Class", "Weight" (main §17.2).One row per handling<br>unit(quantity,package type, "X"in HM when hazardous,description,dimensions,weight of the whole<br>line),then a bold totals row with total units and total weight.|


|Block|Contents|
|---|---|
|Legal<br>paragraph|"Freight moving under this Bill of Lading is subject to classifications and tariffs established by the carrier<br>and are available to shipper upon request.This notice supersedes and negates any claimed oral or written<br>contract,promise,representation,or understanding between parties,except to the extent of any written<br>contract signed by both parties to the contract.Any unauthorized alteration or use of this Bill of Lading or<br>the tendering of this shipment to any carrier other than that designated by company,may VOID company's<br>obligations to make any payments relating to this shipment and VOID all rate quotes.All shippers,<br>consignors,consignees,freight forwarders or freight brokers are jointly and severally liable for the freight<br>charges relating to this shipment.Carrier certifies only CARB-compliant equipment will be dispatched on<br>California highways or railways."|
|Reference<br>strip|Three empty boxes to fill by hand: "LOAD", "TRAILER", "SEALS".|
|Shipper box|Title:the pickup company.The declaration: "I hereby declare that the contents of this consignment are<br>fully and accurately described above by the proper shipping name and are classified,packaged,marked<br>and labeled/placarded and are in all respects in proper condition for transportation according to<br>applicable international and national government regulations." "SHIPPER SIGNATURE"and"DATE"lines.|
|Driver box|Title"Driver".The text: "Carrier acknowledges receipt of packages and required placards.Carrier certifies<br>emergency response information was made available and/or carrier has the DOT emergency response<br>guidebook or equivalent document in the vehicle."A cell"UNITS RECEIVED". "DRIVER SIGNATURE"and<br>"DATE"lines.|
|Consignee<br>box|The delivery company, "RECEIVED BY(PRINT NAME)", "CONSIGNEE SIGNATURE", "DATE".|
|Footer|As in DOC-001.|


The inspected LTL BOL includes NMFC and Class columns; its sample has Class60 and an empty NMFC cell (main §17.2; E-88). Account and quote references also appear. Their presence does not establish every TL template or per-piece-weight rule; the former blanket omission was incorrect.

##### DOC-004 BOL viewer 

The page "BOL" opens from the BOL tile of the Documents page and from links on the shipment page. 

- Header: the title "BOL", "BOL " (link to the shipment), carrier name, equipment with icon, "PRO " when known, customer name (link), and a small timeline from origin city and pickup date to destination city and delivery date. 

- Footer: file name "BOL-.pdf", a download button and "Regenerate document". The BOL cannot be removed here. 

- A BOL not ready shows a loading skeleton; a missing one shows "Not available" with a regenerate button. Close with the X (accessible name "Close document") or the link "Documents". 

##### DOC-005 Sending the BOL 

Who gets the BOL e-mail and what it says: EML-010 and EML-011. It attaches "BOL-.pdf" and "Labels-.pdf" and links to both. 

A share banner above the BOL page (account users only): 

|Situation|Text|Button|
|---|---|---|
|BOL sent and still current|"Sent"with a green check|green outlined"Resend"|
|BOL changed since the last send|"Send updated BOL"with an orange warning|orange outlined"Send"|
|Never sent|"Send BOL"|"Send"|


The banner is hidden when there are no recipients, the load is canceled, the load has been picked up, or no carrier is assigned. 

Recipients are the stop e-mails and the e-mails already shared with, without duplicates. 

- A re-send carries "The BOL for this shipment has changed. Please disregard previous BOL."; a first send does not. 

Messages: "BOL shared", "Failed to send BOL", "Failed to regenerate document". 

### Shipping labels 

##### DOC-006 Label contents 

The inspected labels show piece/weight/routing information, but the source does not establish one label per handling unit, a 1–100 cap or how contained pieces relate to handling units. Five PDF entries were seen on one LTL example. The layout below remains proposed beyond the fields observed in main §17.2:

|Block|Contents|
|---|---|
|Top row|The equipment(left)and the customer's logo(right).|
|"FROM"|A black tag"FROM",then pickup company,street,city line(small text).|
|"TO"|A black tag"TO",then delivery company,street,city line and the stop's phone number(larger text).|
|Right<br>column|"BOL"in bold. "TOTAL lb".A very large destination code:the first four letters of the delivery city in capitals(for<br>example"Royse City"prints"ROYS").A black box with the number of pieces and the caption"PIECES"<br>("PIECE"when there is one).|


All labels of a load show the same total number of pieces (no "1 of 4" counter). No footer and no barcode. 

###### DOC-007 

##### Label sizes and the Labels page 

**Observed failure variant:** Deep3 E-159 opened the TL Labels entry and reached Preview not available / Try again, despite no captured HTTP failure. LTL size choices remain dated evidence; this does not prove successful rendering for every equipment/state or support a universal download/layout guarantee.


Two sizes: "Half-letter" (default) and "4×6". 

- "Half-letter": a US Letter sheet holds two identical labels stacked, one sheet per piece. "4×6": one label per 4 × 6 inch page, same content scaled to fit. 

- The Labels page header has the title "Labels", the carrier and equipment, "BOL ", the customer and the origin/destination timeline. 

- A toolbar has the field "Size" (options "Half-letter" and "4×6") and the blue button "Download labels". 

- A preview grid shows up to 6 sheets (2 columns for half-letter, 3 for 4×6); the download always contains all pages. 

- The footer shows "Labels-.pdf", a download button and "Regenerate document". 

- Changing the size never creates a label by itself. If none exists for that size, the page shows "Not available" and the regenerate button creates it. The chosen size is not remembered. 

### Customer rate confirmation 

##### DOC-008 Customer rate confirmation contents 

Title "Rate Confirmation". One page for the customer. 

|Block|Contents|
|---|---|
|Header|"Rate Confirmation", "BOL",the broker logo on the right.|
|Equipment<br>card|"EQUIPMENT":equipment and total length(for example"Dry Van7'L"). "TOTAL WEIGHT":for example<br>"10,044lb".When the Settings>Carriers switch"Show shipment value on rate con"is on, "Shipment<br>value"is printed under it. 10-4's current setting is off.|
|Broker<br>contact(right)|Broker name, "MC-",the booking rep's name,phone and e-mail.|
|"Shipment<br>for"|The customer's billing company,street and city line,and the customer contact's name,phone and e-mail<br>(left out if the load has no contact).|
|"Trip details"|One numbered card per stop:company,street,city line,date(for example"Fri,Oct2")and time window.A<br>"PICK UP"row lists" - "and the weight of the items picked up there.A"DROP OFF"row does the same for<br>items delivered there.|
|"Pay to"|The broker's payment company,payment e-mail and address.When the account has payment settings,<br>the caption"Electronic payment(ACH)"with rows"Bank", "Routing"and"Account"and the payment<br>instructions text;without payment settings this part is left out.|
|"Agree to<br>pay"|A box"AGREED ALL-IN AMOUNT"with the load's price(the total of the shipment's price lines),then<br>"SIGNATURE"and"DATE"lines left blank for the customer.|
|Footer|As in DOC-001.|


It never shows cost, profit or margin. 

- It is on the Documents page under the tile "Customer Confirmation" and in the viewer titled "Customer confirmation", file name "Customer-Rate-Confirmation-.pdf", with its own "Regenerate document" button. It is created for the customer's reference. Reps download it from the viewer and send it as needed; the customer can also see it through the secure shipment page or the customer portal (section 4.11). The system does not e-mail it automatically. 

### Carrier rate confirmation 

##### DOC-009 Carrier rate confirmation contents 

Titled "Load & Rate Confirmation". Two pages, one PDF per carrier assignment, sent as an e-mail attachment (EML-020, section 4.3). 

##### Page 1 

|Block|Contents|
|---|---|
|Header|"Load&Rate Confirmation", "BOL",the broker logo on the right.|
|Carrier card<br>(left)|"dba" (just the name when there is no legal name),address, "MC", "USDOT",and the dispatcher's first<br>name in capitals,phone and e-mail.|
|Load grid(right<br>of the card)|"EQUIPMENT"with equipment and length("7'L");weight in lb and distance in mi; "DRIVER NAME"and<br>"DRIVER PHONE"; "TRACTOR"and"TRAILER".Driver,tractor and trailer are blank until the carrier signs<br>or a rep enters them.|
|Broker contact<br>(right)|Broker name, "MC-",the rep who covered the load,with phone and e-mail from Settings>Carriers><br>Rate cons(otherwise the rep's own).|
|"Trip details"|The stop cards as on the customer rate confirmation.|


##### Page 2 

|Block|Contents|
|---|---|
|"Terms and<br>Fees"|The first bullet"Exclusive use only" (or"Partial use"),an optional"Note: "from the cover form,then10-<br>4's rate confirmation terms in two columns(DOC-010).|
|"Payment"|A card with"AGREED ALL-IN AMOUNT"and the total of the carrier's charges,and a strip with the broker<br>e-mail.No breakdown of charges.|
|Acceptance<br>and signature<br>card|"The undersigned hereby acknowledges as correct and accepts the referenced shipment on behalf of.It<br>is agreed that the charges indicated above include all costs and fees in connection with the shipment as<br>described.You also agree to the Carrier Terms&Conditions at.Invoicing by the carrier and payment by<br>the broker constitutes acceptance of this agreement.By signing,this creates a contract carriage<br>shipment."With no carrier agreement,the"at"part is left out.On the right:the broker's billing address<br>and logo.|
|Signature row|"SIGNATURE" (the carrier's typed name in handwriting font)and"DATE" (the date the carrier signed,<br>"M/D/YYYY"). "BROKER" (the covering rep's name in handwriting font)and"DATE" (the date the rate<br>confirmation was sent).|
|Footer|As in DOC-001.|


- Until the carrier signs, the carrier signature and date are blank. After a change to a signed rate 

- confirmation, the old signature no longer prints. 

- The amount follows the carrier's cost lines and never shows the customer price. 

- Multi-stop loads list every stop. Less-than-truckload loads have no carrier rate confirmation. 

- A copy of each signed version is built from exactly what the carrier saw at signing time and kept (RCF-014, RCF-018). 

- File: "Carrier-Rate-Con-.pdf". It appears on the Documents page in the carrier's section as the tile "Rate Confirmation" and on the rate confirmation page. 

##### DOC-010 Terms & Fees text 

Terms & Fees is the account's "Rate con terms" setting (Settings > Carriers > Rate cons, section 4.10), carried over unchanged from 10-4's current text; its content, saving at cover and the "Exclusive use only" / "Partial 

use" bullet rule are in RCF-023. It prints on page 2 in two columns in small type and in two columns on the carrier's confirmation page (section 4.3). Changing it is a setting change by an Owner. 

### Customer invoice 

##### DOC-011 Customer invoice contents 

Title "INVOICE". One page, in two looks: a draft and a sent invoice. 

|Block|Contents|
|---|---|
|Header|The broker logo on the left. "INVOICE"on the right. "Invoice# " (starts as the BOL number,can be<br>changed).For a sent invoice: "Invoice date<M/D/YYYY>".|
|Broker|Broker name and address. "BILLING QUESTIONS"with the billing phone and e-mail.|
|"BILL TO"card|The customer's billing company,street,city line and billing e-mail,a rule,then"BOL".|
|"SHIPPER"and<br>"CONSIGNEE"|The first and last stop:company,street,city line.|
|Items table|Columns"Units", "Pkg", "HM", "Description(said to contain)", "Weight".A bold totals row first("Total<br>units",total weight),then one row per handling unit with dimensions after the description.|
|Equipment and<br>stops|The equipment and"Distance mi".A small route with numbered stops;on a sent invoice each stop<br>shows its date and,when known, "Picked up"or"Delivered".|
|Payment card|"Make payment via:".The column"Electronic payment(ACH)"with"Bank", "Routing"and"Account"<br>appears only when the account has payment settings.The column"Check"with the payment<br>company and address appears when a payment address exists. "Send remittance instructions to:"<br>with the payment e-mail.The payment instructions text. "Please include invoice#with your payment".|
|Amounts(right of<br>the payment card)|One row per charge:description and amount(for example"Freight"). "Total amount due"with"USD"<br>and the balance after payments(after a partial payment,the remaining balance). "Due by":on a draft<br>"Date will be finalized when invoice is sent",on a sent invoice the due date"MM/DD/YYYY".<br>"Invoice#".|
|Footer|As in DOC-001.|


- Draft look: a large grey slanted "DRAFT" stamp in a frame across the upper page until the invoice is sent. A sent invoice has no stamp. 

Charge rows follow the invoice charges, which follow the load's price lines (section 4.5). File name: "Invoice--from-.pdf". 

- The Documents page shows the tile "Customer Invoice" under the customer only when the invoice exists and is not canceled, and the load is a truckload that is Scheduled, In transit, Delivered or Canceled, or is less-than-truckload. 

- The invoice page shows PDF, Regenerate document and Remove document. Whether removal cancels a draft or sent invoice and how payments/ledger links constrain it are unverified; do not infer cancellation policy from the control label (main §17.5).

##### DOC-012 Who receives the invoice 

- Sending an invoice (section 4.5) e-mails every billing address of the customer plus the account's invoice copy addresses, each once; contents of the e-mail: EML-030 (subject "Invoice from ", "View invoice" link to the secure invoice page, section 4.11). The invoice PDF is attached. Reply-to is the sender. "Resend" sends it again to all recipients. 

- "Combine PDFs (bill and POD)" (customer setting, section 4.7; CUS-015): when on, each proof of delivery is also attached as its own file next to the invoice PDF. When off, only the invoice PDF is attached. The files are never merged into one PDF, and the BOL is not attached. 

### Customer statement 

##### DOC-013 Statement contents 

A statement lists a customer's unpaid invoices. 

|Block|Contents|
|---|---|
|Header|The broker logo or name,the title"Statement"and the date.|
|"Bill to"|The customer's name and billing address.|
|Aging<br>summary|"Current", "1-15late", "16-30late", "31-60late", "61+late", "Total open".|
|Invoice table|Columns"Invoice#", "BOL", "Invoice date", "Due date", "Origin", "Destination", "Amount", "Balance",<br>"Aging".|


- "Aging" reads "Open", "Late 15", "Late 30", "Late 60" or "Late 61+". Rows with an open dispute are marked " (disputed)". 

- Money as "$1,500.00"; dates as "MM/DD/YYYY". 

- Only invoices that were sent and still have a balance are listed (no drafts, no fully paid), ordered by lateness, then due date. No bank details. 

- File name: "Statement--.pdf". 

- A statement is not shown on the shipment Documents page; it belongs to the customer (sections 4.5, 4.7). A customer without open invoices has no statement: "This customer has no open invoices." 

###### DOC-014 

##### Making and sending a statement 

- The button "Download statement" (footer of a customer's invoice list) builds the statement at once and downloads it. If the unpaid invoices have not changed since the last statement, the same file is reused; a new invoice or payment makes a new statement and replaces the old one. A statement is never reused just because it is recent. 

- The customer's Invoices tab has a "Statement" card with "Send billing contact an email with attached statement PDF." and a blue "Send statement" button. It shows only when the customer has open invoices. Without a billing e-mail the card says "Add a billing email address to send a statement email." 

- "Send statement" opens a small window "Email statement": "Send an email with statement to ", buttons 

- "Not now" and "Send email". The e-mail (EML-032) has the subject "Statement from ". 

- Messages: "Statement email sent", "Something failed while sending the statement email.", "This customer has no open invoices." 

The card shows "Last sent by ". 

Any account user can download and send a statement. 

### Shipment Documents page 

##### DOC-015 Documents page 

The Documents page gathers every file of one shipment. It opens from the "Documents" chip in the shipment header, from the back links of the BOL, Labels and POD pages, and from the "Upload POD" and "View POD" buttons on the shipment page. 

A dark full-screen page over the application. Browser tab title "Documents BOL ". 

- Top left: a back arrow ("back", or "< Documents" on viewers). Top right: the close X (accessible name "Close document"), which returns to the shipment. 

- Title row: "Documents" left, "Shipment " right. 

- Sections top to bottom: the customer section, one section per carrier on the load, "Misc". Nothing is paged or filtered. 

- Existing generated files appear as thumbnails/captions with available preview/download entries. Main §17.2 and Deep3 E-145 show BOL, Labels, Customer Confirmation, Customer Invoice, provider Rate Confirmation, POD, carrier bill and provider/shipment Misc entries. Generated thumbnails can load after upload slots; the first loading view is not proof a file is missing.
- POD opens Upload POD / Drag POD here / Close modal. The sampled input is single-file, accepts the ten MIME types listed in TRK-080, and does not establish server type/size/scanning or whether selection starts an upload (Deep3 E-147).
- Generic additional-provider/Misc upload entries can use the accessible label Add unknown to shipment. A complete type selector/catalog was not established. Do not silently map “unknown” to a verified type.
- Existing downloads reference signed S3 objects; do not retain query credentials. The app-side `/utils/filestack/token/uploader` path establishes a Filestack reference, not a tested upload or required clone storage supplier (E-145/147/158).
- Opening, generation, sending, removal, revision retention, access and external effects require separate tests (OQ-15/40/41). The original cut-off remainder was unavailable and has not been invented.

## 7. Integrations — reconstructed from the main source

The original section was missing. This replacement is an evidence/capability inventory from main §18, §17.6, §19 and Deep1–3; it does not recover the original missing INT definitions or approve a supplier. The [third-party access guide](../thrid_party/10-4-tms-api-access-guide.md) contains dated provider-owned references; no integration is marked Ready there. Current eligibility, version, retirement dates, pricing and credentials need confirmation before implementation.

| Capability | Source-supported evidence | Decision / validation needed |
| --- | --- | --- |
| Direct LTL rating | 17 observed carrier cards, displayed count12, existing direct/network offers and partial historical failures | Select each launch carrier/account/rate source; independently validate lane, class, services, negotiated rating, transit/expiry, partial failure and quote IDs. Card status is not live entitlement. |
| Pickup/tender and cancellation | Auto dispatched and historical pickup-request events on existing shipments | Distinguish local booking, carrier acceptance and pickup scheduling; confirm payload/references/PRO, retries after ambiguous outcomes, amendments/cancellation and external acknowledgments. |
| LTL tracking/documents | Carrier Track links and existing events/files | Capability per carrier, reference mapping, freshness, source timestamps, poll/webhook policy and actual POD/BOL retrieval. Automatic retrieval is not proved. |
| Truckload tracking | Trucker Tools named in settings and checked coverage preference | Account/contract, driver consent, phone/ELD support, actual start/stop triggers, payload minimization, callbacks, event precedence/replay and duplicate prevention. No three-retry/one-system-only guarantee is established. |
| Accounting | Oct23 disconnected; Oct26 Syncing Bills & Invoices and company/account/service mappings | Client-owned Intuit app/company authorization; identity/external IDs, amounts, trigger/direction, tax/terms/revisions, sync failures, payment allocation and reconciliation. Quote Factory's authorization does not provision the clone. |
| Carrier identity/authority/insurance | App labels/MC/USDOT/fleet/packet controls | Select authorized data supplier and freshness/check policy; source does not prove a government mirror, API supplier or refresh schedule. Agree approval/override/insurance requirements. |
| Carrier onboarding | Packet-request branch/help; Compliance None selected | Select built-in/manual/provider approach; identify packet supplier, approver, documents/tax access, recipient, signatures/expiry and safe test process. Separate MyCarrierPackets use is a dated guide claim, not a verified current integration. |
| Monitoring/classification links | Carrier411/CarrierOK/Highway/ClassIT+ preferences say Not showing links | Links versus data integration, client licensing/eligibility and data-use rights. This status does not prove external non-use. NMFC/class suggestion is not licensed commodity lookup. |
| Maps/addresses/routing | Mapbox/OpenStreetMap attribution; billing form labels Google address search | Select rendering, suggestions/geocoding and truck routing/mileage separately, with countries/vehicle constraints/timezones/overrides. A map token does not supply live tracking. |
| Load boards/lane intelligence | Pathfinder/Loadboards/Post/Show cost; app-reported DAT Authorization failed | Determine source/products, account licenses, lead/lane methodology and posting/search/update/remove rules. Neither working DAT connectivity nor manual-only launch scope is proved. |
| Mail/SMS/live notifications | Broker send/share/settings entries and browser WebSocket frames | Sender/provider, approved templates/recipients, delivery/bounces, retries/idempotency, access/isolation and recovery; private server-provider behavior unobserved. |
| PDF/upload/storage/signatures | Existing PDF/signature marks; signed S3 downloads; first-party Filestack uploader-token path | Choose clone resources; validate generation/upload/scanning/type/size/count, access/link expiry, revisions/retention, signature evidence and backup/restore. No token values retained or upload performed. |
| Payment/factoring/QuickPay | Record-entry forms and13 method labels; Not factoring/Not providing QuickPay settings | Decide recording versus funds movement. If processing is selected, obtain separate provider/account contract and settlement/reversal tests. Method labels do not prove processors. |
| Support/training | Help Scout Search/Ask Us and external TalentLMS | Client chooses retention/replacement/exclusion, licensing/content/recipient/access policy. No support message was sent. |

**Carrier-specific corrections retained from main §18.3:** ArcBest must not reuse Averitt onboarding; Double D employment forms are unrelated; AAA Cooper's public token guidance does not prove client access; Sunset Pacific publishes API material despite an older disabled/manual app claim; FedEx Freight has a dedicated developer-center reference; Warp public surfaces use different contracts; Old Dominion retirement/onboarding information is dated research; Carrier411 legacy custom-system/new-customer restrictions require current written eligibility confirmation. None supplies a tested private contract for the clone.

**Readiness evidence for each selected capability:** approved provider/product/version/owner and agreement; test/production access/scopes; permitted payload and returned IDs; safe retry/duplicate/ambiguous-outcome policy; provider acknowledgment; app/provider/accounting reconciliation; required notification/document evidence; reviewer/date and unresolved defects. Secrets belong in secure provisioning, not this file. An unavailable provider requires an explicit fallback decision, not a silent feature removal.

## 8. Data migration from Quote Factory — proposed scope and validation

The original section was missing. Main §19.7/20.10, Scope SC-10 and the Documentation Plan leave migration requirements and operating targets open. No supported extraction API, import screen, credentials transfer, successful import or cutover is established. These are decisions and acceptance work, not claims about Quote Factory internals.

| Decision / stage | Required evidence before accepting the migration |
| --- | --- |
| Inventory and scope | Approve customers/contacts/addresses, carriers/vendors/contacts/payment details, quotes/offers, open and historical shipments/stops/freight, assignments, documents/PODs/bills/invoices/payments/credits, reps/commissions, notes/events, share/send/acceptance history, settings/references and users. Record volume/date range/retention and explicit inclusion or approved deferral per category. Nothing is automatically excluded. |
| Extraction rights and source | Establish authorized supported export/API/manual source and document-download permissions; field completeness and original IDs; private data/security terms. Browser endpoint patterns do not establish a supported migration API. |
| Field and identity mapping | Map BOL/custom BOL/internal IDs/PRO/quote/pickup separately; customer/provider/payment identities and external accounting IDs; statuses, dates/zones, units, currency, tax, contacts, references and document versions. Agree duplicate/missing-data handling. |
| Financial reconciliation | Reconcile invoice/bill totals, sent/draft/approved states, amounts paid/open/unapplied, disputes, factoring, credit and remit-to. Validate against the authorized ledger; avoid double-entry or duplicate QuickBooks transactions. A visible paid label alone is insufficient. |
| Dry run | Use designated disposable environment with external sends/bookings/accounting effects controlled. Compare category counts, sample relationships, documents/versions, totals/balances, date/unit conversions, visibility and history; record defects. |
| Repeat import and exceptions | Agree idempotency, updates versus new records, partial failures/restart, conflicts, audit and error review. Do not assume later changes are automatically scheduled or Owner-triggered only. |
| Cutover and rollback | Approve freeze/delta/ownership, backups and tested restoration, reconciliation thresholds, old-system retention/access and rollback criteria; obtain named operational/accounting approval. |
| Operating targets | Decide security/access, retention/deletion, backups/restore objectives, concurrency/volumes, export sizes and performance/support targets. UI discovery does not prove these properties. |

All decisions require named owners/dates under SC-10 and related SC-03/05/07/08/09/12. Existing secure links, credentials and old provider authorizations must not be assumed transferable. No migration action has been executed during this document validation.

## Appendix B. Statuses and option lists — evidence-qualified reference

The original appendix was missing. This reference consolidates the catalogs actually established in the main source; it is not a tested state machine or universal backend enum. Proposed option lists remaining in the body keep their unverified status.

### B.1 Shipment statuses

Observed UI labels: Requested, Booked, Scheduled, In transit, Delivered, Canceled (main §§10/15/Deep2). Entry/exit conditions, signing/dispatch timing, restoration, invoice-paid Active inclusion and customer-facing translation remain unverified; see SHP-075.

### B.2 Quotes and quote requests

Requested/Quoted links, booked/expired indicators and past-date/booked banners are observed (main §14/Deep1; V-02). Internal Draft/Shared/Completed/Canceled transitions and all automatic expiry rules are unverified. A booked request's banner is not the shipment's current lifecycle stage.

### B.3 Carrier assignment and rate confirmation

Observed: Needs a carrier, Cover & request packet, Cover & send rate con, Confirmed, Share and existing recipient/time entries. Approved/Packet not requested can coexist with an existing confirmed rate con. The proposed Draft/Waiting/Confirmed/Old version/Canceled state machine, signatures and approval release remain untested (§§12.6/15.6–7/17; Deep2/3).

### B.4 Tracking

Observed examples include Tracking completed and Off route on an In transit shipment; manual Tracking update, ETA, appointment and Driver & tracking controls exist (§§15.9/16). No complete Trucker Tools status/alert enum or automatic transition contract is verified. Preserve source/time and distinguish facility hours, appointment, ETA and actual event.

### B.5 Carrier bills

Observed row/control examples include Due, Need to approve, Paid, Canceled, Expected bill, Approve to pay, In dispute, Record payment and Delete payment (§17/Deep3). Exact precedence/eligibility/amount basis/approval/reversal and sync remain open.

### B.6 Customer invoices

Observed: invoice/PDF/amount/balance, Send invoice, In dispute, payment and POD controls; accounting queue names below. Draft/sent/paid meanings, required-POD gate, aging/dispute formula and send/ledger effects need validation.

### B.7 Payment methods

Observed13 labels: ACH, Apple Pay, Credit card, Cash, Cash App, Check, Comchek, Google Pay, PayPal, T-Chek, Venmo, Wire, Zelle (main §17.4/Deep3). Provider payment sampled ACH; invoice/global method initially blank. These are record labels, not13 verified payment integrations.

### B.8 Carriers and vendors

Carrier app indicators include Approved, Candidate/Don't use warnings, Packet not requested, FMCSA Authorized, Unrated and BI/PD. They do not independently verify current authority/insurance or dispatch suitability. Vendor types: Chassis, Crane, Customs broker, Insurance, Lumper, Steamship line, Towing, Transloader, Warehouse. Creation uses one type; existing type editor offers multiple checkboxes (§12/Deep4).

### B.9 LTL carrier accounts

Observed17 cards and displayed12 in October26 source; detailed textual activation legend/24-hour activation and blanket/exceptions workflow remain unverified. Preserve October9 Enabled/Activating/Disabled as historical claims only (§18.3/access guide).

### B.10 Equipment

The exact70 observed labels are reproduced under SHP-027 from `DEEP-02-R003/CATALOG`;13 reading groups do not prove backend grouping. Common hints are not maximum capacities. Direct LTL entry is gated with a quote handoff; Other becomes free text; see Deep1/2 and OQ-31/32.

### B.11 Stops and freight

- Location types26: Airport; Business with dock/forklift; Business without dock/forklift; Camp; Church building; Construction site; Container freight station; Convention/trade show; Country club; Fair/amusement park; Farm; Government site; Grocery warehouse; Hospital; Hotel; Limited access; Military installation; Mine site; Native American reservation; Nursing home; Pier; Prison; Residential; School; Self-storage; Utility site.
- Packaging27: Pallet (48x40); Pallet (48x48); Pallet (60x48); Pallet; Bag; Bale; Box; Bundle; Carpet; Carton; Case; Coil; Crate; Cylinder; Drum; Gallon; Keg; Pail; Piece; Pipe; Rack; Reel; Roll; Sack; Skid; Tote; Tube.
- Contains22: Bags; Bales; Boxes; Bundles; Carpets; Cartons; Cases; Coils; Crates; Cylinders; Drums; Gallons; Kegs; Pails; Pieces; Pipes; Racks; Reels; Rolls; Sacks; Totes; Tubes. This is not outer packaging or a handling-unit count.
- Freight class18:50,55,60,65,70,77.5,85,92.5,100,110,125,150,175,200,250,300,400,500. The dropdown is not the conditional13-band NMFTA reference or proof of the app estimator. Main §14.5a supplies the density-reference applicability/boundaries.
- in/cm and lb/kg controls exist. Deep1 observes unit-switch number retention/display discrepancies; conversion behavior needs review. Packing group I/II/III and the hazmat-class UI catalog are established for the direct Dry Van branch (SHP-040/Deep2 E-143), not as a regulatory classification or universal LTL form contract.

### B.12 Services

LTL quote pickup: Liftgate pickup, Inside pickup, Single shipment, Sort & segregate. Delivery: Appointment required, Liftgate delivery, Inside delivery, Notify before delivery, Sort & segregate (main §14.4/Deep1). Template grouping differs in the newer Deep4 E-169 observation, which places Appointment required among pickup choices; preserve the dated context and resolve grouping before implementation. TL flags vary across equipment branches: Partial/Tanker endorsement/Team service; Tarps on sampled Flatbed; refrigerated range fields. Selecting a service does not prove delivery/qualification or carrier support.

### B.13 Carrier charge types

Freight and add-line/calculator controls are observed. The body's147-entry charge list is a proposed catalog whose full membership/limits/provider mapping were not established by the main source. Do not treat that count or every label as a verified enum.

### B.14 Reference number types

PO, Pickup, Ref and Order examples are observed; additional typed reference controls exist (§16.3). The body's41-type complete catalog, defaulting, lengths and persistence remain unverified. BOL, PRO, quote/account identifiers and invoice/stop references are distinct.

### B.15 Documents

Observed categories/entries: BOL, Labels, Customer Confirmation, Customer Invoice, provider Rate Confirmation, POD, carrier bill and provider/shipment Misc/additional files (§17/Deep3). A generic Add unknown upload label does not establish an exhaustive type list. Server acceptance, size/count/retention and role/recipient access remain open.

### B.16 Roles

Owners and Members groups observed; Member rechecked November2 (V-01). Exhaustive roles, all permissions, customer/carrier/driver sessions and team-manager powers remain unverified. Use the evidence matrix in main §19.4; the ROL-025 matrix is a proposal.

### B.17 Queues and accounting tabs

Observed operational navigation: Cover, Confirm pickups, Confirm deliveries; Quote/Dispatch dashboard shortcuts and a documented empty Dispatch page. Finish booking/Quote workflows require additional validation. Accounting has12 tabs: All, Open, Bills to Upload, Bills to Approve, Bills to Pay, Overdue Bills, Upload missing POD, Invoices to Send, Invoices to Factor, Outstanding Invoices, Overdue Invoices, Disputed Invoices (§17.3/Deep3 E-151–152). Counts/eligibility/pagination/refresh are not established by names.

## Appendix C. Report column catalogs and observed saved selections

The original appendix was absent. Main §19.5 documented selected lists but did not establish every available field. A targeted read-only check on November2 filled that gap (V-03–05): Reporting → Shipments/Customers/Carriers → Columns; expand Handling units in the shipment catalog. Labels were counted from the rendered catalog buttons, excluding unnamed expand controls and the selected-column pane. No columns/labels/filters were added, removed, edited, saved or downloaded.

These are observed UI field catalogs, not verified export schemas, meanings or hard selected-column limits. Extra entity/reference configurations or another role/version may differ. “Origin Open Close” and “Destination Open Close” reproduce literal labels; their semantics are not inferred. Indexed fields1–5 do not establish a shipment maximum of five handling units. A field name mentioning merge, paid, compliance or factoring does not prove that operation works.

### C.1 Shipment report — 189 distinct catalog fields

| UI category | Count | Exact field labels in observed order |
| --- | --- | --- |
|Base|8|Shipment ID; BOL; Status; Mode; Transit Days; Distance In Miles; UOM; URL|
|Customer|3|Customer; Customer Contact; Primary Rep|
|Carrier|25|Carrier Name; Carrier Legal Name; Carrier DBA Name; Carrier Account Number; USDOT; MC Number; SCAC; Equipment; Partial Allowed; Partial; Carrier Source; Carrier Quote Number; Service Level; Volume Quote; PRO Number; Dispatch BOL Number; POD Uploaded; Carrier Contact; Carrier Contact Phone; Carrier Contact Email; Driver; Driver Phone; Tractor Number; Trailer Number; External Tracking URL|
|Remit-to Contact|3|Remit-to Contact; Remit-to Contact Email; Remit-to Contact Phone|
|Remit-to Address|6|Remit-to Company; Remit-to Street; Remit-to Street 2; Remit-to City; Remit-to State; Remit-to Postal Code|
|Accounting|42|Cost; Price; Profit; Margin; Customer Invoice Sent; Customer Invoice Sent By; Customer Invoice Sent Date; Customer Invoice Number; Customer Invoice Total; Customer Invoice Price; Customer Invoice Date; Customer Invoice Due Date; Customer Invoice Balance Due; Customer Paid in Full; Customer Invoice in Dispute; Carrier Bill Added; Carrier Bill Approved; Carrier Bill Approved Date; Carrier Bill Number; Carrier Bill Total; Carrier Bill Cost; Carrier Bill Date; Carrier Bill Due Date; Carrier Quick Pay Requested; Carrier Bill Balance Due; Carrier Bill Paid in Full; Customer Paid in Full or Factored; To Be Factored; Factoring Fee; Price After Factoring; Profit After Factoring; Sent to Factor; Booked Cost; Booked Price; Booked Profit; Booked Margin; Cost Per Mile; Price Per Mile; Customer Invoice Pushed to Accounting; Customer Invoice Pushed to Accounting Date; Carrier Bill Pushed to Accounting; Carrier Bill Pushed to Accounting Date|
|Locations|29|Origin Company; Origin Street; Origin Street 2; Origin City; Origin State; Origin Postal Code; Origin Country; Origin Open Time; Origin Open Close; Origin Contact; Origin Phone; Origin Email; Origin Location Type; Origin Instructions; Destination Company; Destination Street; Destination Street 2; Destination City; Destination State; Destination Postal Code; Destination Country; Destination Open Time; Destination Open Close; Destination Contact; Destination Phone; Destination Email; Destination Location Type; Destination Instructions; Stopoffs Count|
|Location references|2|Origin Reference Number; Destination Reference Number|
|Handling units|40|Description 1; Commodity 1; Freight Class 1; NMFC 1; Length 1; Width 1; Height 1; Weight 1; Description 2; Commodity 2; Freight Class 2; NMFC 2; Length 2; Width 2; Height 2; Weight 2; Description 3; Commodity 3; Freight Class 3; NMFC 3; Length 3; Width 3; Height 3; Weight 3; Description 4; Commodity 4; Freight Class 4; NMFC 4; Length 4; Width 4; Height 4; Weight 4; Description 5; Commodity 5; Freight Class 5; NMFC 5; Length 5; Width 5; Height 5; Weight 5|
|Handling unit totals|8|Line Items Count; Total Units; Total Weight; Total Length; Total Density; Total Value; Cost Per Lb; Price Per Lb|
|Hazmat|4|Hazmat; Hazmat Emergency Response Phone; Hazmat Contact; Hazmat Contact Number|
|Who & When|10|Pickup Date; Original Pickup Date; Actual Pickup Date; Delivery Date; Original Delivery Date; Actual Delivery Date; Booked Date; Booked By; Covered Date; Covered By|
|Accessorials|9|Origin Appointment Required; Origin Liftgate; Origin Inside; Destination Appointment Required; Destination Liftgate; Destination Inside; Notify Before Delivery; Sort & Segregate; Protect from Freezing|

### C.2 Customer report — 68 distinct catalog fields

The group labels below are reading aids; field order and spelling follow the UI.

| Reading group | Count | Exact field labels in observed order |
| --- | --- | --- |
|Identity|9|Customer ID; Vendor Number; Name; Legal Name; Phone; Website; Description; Last Note; Added Date|
|Reps|5|Primary Rep; Primary Rep Email; Primary Rep Phone; Assigned Users; Assigned Teams|
|Primary contact|4|Primary Contact; Primary Contact Title; Primary Contact Email; Primary Contact Phone|
|Preferences and pricing|13|Auto Quoting; Auto Dispatching; Payment Terms; Merge Invoice Attachments; Login Enabled; Truckload Require POD; LTL Require POD; Truckload Gross Margin; Truckload Min Margin; Truckload Min Profit; LTL Gross Margin; LTL Min Margin; LTL Min Profit|
|Credit and aging|15|Credit Limit; Available Credit; Credit Used; Balance Current; Balance Overdue; Balance 1-15 Days Late; Balance 16-30 Days Late; Balance 31-60 Days Late; Balance 61+ Days Late; Balance Total; Balance Not Invoiced; Unpaid Shipment Count; Oldest Open Invoice Date; Oldest Open Invoice Sent Date; Oldest Open Invoice Due Date|
|Activity|6|Shipments; Quotes; Contacts; Last Note Date; Last Booked Date; Last Quote Date|
|Billing|8|Billing Company; Billing Street; Billing Street 2; Billing City; Billing State; Billing Postal Code; Billing Country; Billing Email|
|Tax labels|3|EIN; TIN; RFC|
|Factoring|5|Factoring; Factor Status; Factor Credit Limit; Factor Credit Used; Factor Available Credit|

### C.3 Carrier report — 31 distinct catalog fields

Reading groups are editorial; preserve the observed field labels.

| Reading group | Count | Exact field labels in observed order |
| --- | --- | --- |
|Identity and status|14|Vendor ID; Name; Legal Name; DBA Name; USDOT Number; MC Number; Phone; HQ City; HQ State; Compliance Status; Tax ID; Legal Entity; Requires 1099; Added Date|
|Primary contact|3|Primary Contact; Primary Contact Email; Primary Contact Phone|
|Remit-to contact|3|Remit-to Contact; Remit-to Contact Email; Remit-to Contact Phone|
|Mailing|5|Mailing Company; Mailing Street; Mailing City; Mailing State; Mailing Postal Code|
|Remit-to address|6|Remit-to Company; Remit-to Street; Remit-to Street 2; Remit-to City; Remit-to State; Remit-to Postal Code|

### C.4 Selected saved-report definitions from main §19.5

These preserve the dated source selections, not universal defaults. A displayed header can differ from its catalog field. No export file was validated.

**Common 14 selected shipment columns, in order:** Equipment; Carrier (field Carrier Name); USDOT; MC Number; Cost; Price; Profit; Margin; Pickup Date; Delivery Date; Origin Postal Code; Destination Postal Code; Total Weight; Mode.

**Monthly Margin 48 selected columns, in order:** BOL; Status; Customer; Primary Rep; Mode; Equipment; Partial; Carrier (Carrier Name); USDOT; MC Number; Carrier Source; Carrier Quote Number; Service Level; Transit Days; PRO Number; Cost; Price; Profit; Margin; Booked Date; Booked By; Covered Date; Covered By; Pickup Date; Delivery Date; Origin Company; Origin Street; Origin Street 2; Origin City; Origin State; Origin Postal Code; Origin Country; Origin Reference Number; Destination Company; Destination Street; Destination Street 2; Destination City; Destination State; Destination Postal Code; Destination Country; Stopoffs Count; Destination Reference Number; Distance In Miles; Total Units; Total Weight; Hazmat; URL; Shipment ID.

**LTL Report - QF 48 selected columns, in order:** BOL; Mode; Status; Distance In Miles; Carrier Name; USDOT; Equipment; Cost; Total Units; Total Weight; Total Length; Origin Appointment Required; Origin Liftgate; Origin Inside; Destination Appointment Required; Destination Liftgate; Destination Inside; Notify Before Delivery; Sort & Segregate; Protect from Freezing; Freight Class 1; NMFC 1; Length 1; Width 1; Height 1; Weight 1; Description 2; Freight Class 2; NMFC 2; Length 2; Width 2; Height 2; Weight 2; Description 3; Freight Class 3; NMFC 3; Length 3; Width 3; Height 3; Weight 3; Origin City; Origin State; Origin Postal Code; Origin Location Type; Destination City; Destination State; Destination Postal Code; Destination Location Type. The absence of Description 1 in this saved selection is an observation, not an instruction to omit it from the clone. Indexed fields do not prove a maximum of three handling units.

**Customer selected10:** Name; Website; Phone; Description; Primary Contact; Primary Contact Email; Primary Contact Phone; Shipments; Last Booked Date displayed as Last Shipment Date; Last Note Date.

**Carrier selected10:** Name; USDOT Number; MC Number; Phone; HQ City; HQ State; Compliance Status; Primary Contact; Primary Contact Email; Primary Contact Phone.

Column presence/counts are now observed; download row grain, precision, complete data, business meaning, permissions, CSV safety/encoding, limits and reconciliation remain unverified (RPT-024–026; main §19.5).

## Validation record and remaining acceptance work

### Additional app evidence — November 2, 2026

These narrow observations supplement source gaps with the user's authorized read-only app access. They do not override the main source or establish hidden rules. Session displayed app version `8aeb1b27`. Evidence is recorded here because only this file may change; no new source/network/screenshot files were written.

| ID | Path | Observation | Limit |
| --- | --- | --- | --- |
| V-01 | Existing session → Profile | Member; name/email/phone inputs, disabled Save, Change password and Log out | No edits, password/logout, alternate-role or server-denial tests. Current role rechecked; does not prove all Member rights. |
| V-02 | Existing Dashboard | Mapbox/OpenStreetMap, Re-center map; Requested/Quoted links; Requested/Booked/Scheduled/In transit; Quote0/Dispatch0/Cover44; sidebar Cover44/Pickups15/Deliveries8; map Late picking up15/Delivering23; Training and Support | Counts are a dated snapshot. Map Delivering23 is not sidebar Confirm deliveries8; do not equate every badge. No dot/cap/refresh/permission/provider tests. |
| V-03 | Reporting → Shipments → Columns → expand Handling units |189 distinct available labels,14 selected; exact catalog in C.1 | No selection/order/name/filter/save/download. Catalog count does not prove a189-column maximum or CSV content. |
| V-04 | Reporting → Customers → Columns |68 distinct available labels; exact catalog in C.2 | No definition change/download; source selected10 retained. |
| V-05 | Reporting → Carriers → Columns |31 distinct available labels; exact catalog in C.3 | No definition change/download; source selected10 retained. |

The browser was returned to its original Dashboard. This check used normal view navigation only; the main source documents that view navigation may automatically update recent-history metadata. No record booking/edit/coverage/cancel, upload/generation/send/share, payment/approval, setting/permission change or operational provider test was submitted.

### Decisions still needed to turn this into an approved build contract

| Review area | Required answer / evidence | Main-source tracking |
| --- | --- | --- |
| Product/release | Approve each included/deferred/excluded feature, allowed visual/workflow deviations, priorities and acceptance criteria | SC-01/02/11 |
| Business intake/approval | Who requests, approves price, tenders/books and confirms service in each LTL/TL path? Customer Confirmation is a document, not proven customer approval | SC-06; OQ-03/10; [root questions.md](../../questions.md) also asks this and supplies no answer |
| Access | Role/action/scope/financial-contact-document allowlists; administrator and test customer/carrier/driver sessions; API denial tests | SC-03/05; main §19.4 |
| Pricing/measurements | Precedence/boost/limits/override, rounding/negative values, dimensions/units/layout and commodity/NMFC responsibility | SC-08; OQ-01/02/17/29/32/37 |
| Operations/communications | Status/coverage/packet/cancel/TONU rules, timezone/actual/planned timestamps, notes/template propagation, recipient/default/update/signature contracts | SC-06/09; OQ-07–15/18–20/25–28/30/34/36 |
| Finance | Expected-versus-billed settlement, disputes/POD/approval/send gates, terms, invoice correction, allocation/credits/reversals and ledger mapping | SC-08/12; OQ-38/39/42 |
| Integrations/files | Provider selection/access/version/license, acknowledgments, duplicate/retry/ambiguous failures, document output/access/expiry/upload/retention | SC-07/09/12; OQ-23/35/40/41 |
| Migration/operations | Inclusion/inventory/source rights, financial/history/document reconciliation, cutover/rollback, retention/backups/performance | SC-10; section8 |
| Acceptance/sign-off | Designated test environment/disposable IDs/effect suppression, named reviewers, W-01–07 and X-01–09 expected-versus-actual evidence | SC-04/05; main §20 |

**Verification boundary:** This review validates what the available sources can support and corrects unsupported certainty. It does not claim848 requirements have passed functional testing. Each section's evidence table and inline corrections must be read with its retained proposals; no release scope or hidden behavior has been silently approved. Source validation can be complete while business/role/provider/operational acceptance remains pending. Claims of “100% verified application behavior” would be unsupported by the available evidence.

### Final document checks

- All848 original requirement IDs retained and unique; SHP-039 is now a proper heading. All references to defined requirement families resolve; missing legacy INT/MIG references were replaced with the actual integration/migration review sections, without inventing their old definitions.
- All local source links and contents anchors checked; Markdown table widths and fenced blocks checked. The original cut-off DOC-015 now ends with source-supported content.
- Equipment70, location26, packaging27, Contains22 and freight-class18 catalogs compared with the stored main-folder captures. Report catalogs189/68/31 match the live rendered UI labels in exact order, checked independently after transcription; count does not prove hard limits or export correctness.
- Only this Markdown file changed in the worktree. No commit or push, source-folder edit, operational app submission, report save/download or external message was performed.

These checks validate this document and its evidence traceability; they are not application functional tests or business sign-off.
