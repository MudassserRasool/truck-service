**Quote Factory Quote Workflow Guide**

**Plain language guide to quote creation, carrier offers, pricing, and key terms**

Prepared October 9, 2026 \| Based on the broker app screens inspected and Quote Factory's public Features page.

**Full-system documentation — updated October 23, 2026**

This file is the original introductory guide. The full-system documentation is being built in phases:

- [Documentation Plan](Quote%20Factory%20Documentation%20Plan.md) — overall hierarchy, writing format and phases 0–9.
- [Phase 0: Scope and Decisions](Phase%200%20Scope%20and%20Decisions.md) — delivered baseline, proposed scope matrix, client questions and next steps.
- [Coverage and Open Questions](Documentation%20Coverage%20and%20Open%20Questions.md) — known screens/use cases, existing-guide gaps and phase tracking.
- [Evidence Register](Documentation%20Evidence%20Register.md) — dated observations and their limits.

The original overview below is partly documented material, not an approved clone specification. Its payment-term definitions, customer/carrier document distinctions and other gaps are tracked in the coverage register. DOCX/PDF exports have not been updated with this index.

**In one sentence:** The broker enters a customer's shipment details, compares carrier offers, sets the customer price, and books a carrier when ready. The customer is the shipper; the carrier physically moves the freight.

**1\. The people and companies**

**Term**  
**Simple meaning**  
**Role in the process**  
**Shipper / customer**  
The business that needs goods moved.  
Provides shipment information and pays or arranges payment for shipping. The app has customer records and a customer portal.  
**Broker**  
The middle person or company arranging freight.  
Gets rates, compares carrier services, sets a customer price, shares a quote, books a carrier, and tracks the shipment.  
**Carrier**  
The trucking or freight company.  
Offers transportation service and physically picks up, moves, and delivers the freight.  
**Rep**  
Representative assigned to the customer or shipment.  
The shipment detail screen shows a “Manage reps” control. The app does not explain all rep assignment rules.  
**Important:** The broker arranges the shipment. “Shipper” names the customer whose goods are moving; it does not mean that customer necessarily selects or books the carrier.

**2\. Quote workflow in the broker app**

	**1	Start a quote.** Choose a customer and contact, freight mode or equipment type, pickup date, origin, destination, and any pickup or delivery services.

	**2	Describe the freight.** Enter item or commodity, packaging, quantity, dimensions, total weight, freight class and NMFC when applicable. Mark stackable or hazardous freight when applicable.

	**3	Get carrier offers.** The results page lists rates from carriers, with service type, transit estimate, cost, and customer price. Some results are labeled “Xtended Network quote.”

	**4	Compare and price.** Review carrier, delivery service, transit time, and cost. Adjust the margin or customer price as needed.

	**5	Share or book.** The page can show “Customer can see these quotes” and has a Sharing control. A “Book” action appears on carrier offers. Do not assume customer approval or a carrier booking has happened until the app shows the resulting status.

	**6	Manage the shipment.** Shipment records show stages such as Quoted, Booked, Scheduled, In transit, and Delivered, plus tracking updates and documents.

The public site describes customer-facing options as a branded portal where shippers can request truckload quotes, book their own LTL shipments, and track tendered shipments. It also says truckload quotes can be sent for shipper review and tendering. The exact approval path can therefore depend on the customer's workflow.

**3\. LTL and truckload**

**Term**  
**Meaning**  
**How it appears in the quote form**  
**LTL (less-than-truckload)**  
A smaller freight shipment shares space on a truck with other shipments. Price depends on shipment details and service.  
“LTL” is an option in the equipment dropdown. The form asks for item dimensions, weight, freight class, and related details.  
**TL (truckload)**  
A shipment uses a truck or a large part of its capacity. The broker selects the equipment needed for the load.  
The form does not show one choice simply called “TL.” Choose an equipment type such as Dry Van, Refrigerated, or Flatbed.  
**Equipment type**  
The kind of truck or trailer needed.  
Examples in the dropdown include Dry Van, Dry Van 53, Flatbed, Refrigerated, Intermodal, Box Truck, and Auto Transport.  
**Quick rule:** LTL is one mode choice. For truckload, the equipment type describes the truck or trailer.

**4\. Understanding the carrier offer cards**

	**•	One card \= one carrier service offer** for the shipment, such as a particular carrier and delivery option.

	**•	Standard:** regular service; the transit time is an estimate.

	**•	Guaranteed:** the carrier offers a delivery commitment. The page says that, unless otherwise specified, guarantees are for delivery by 5 p.m.

	**•	Transit time:** estimated days to move the freight. The app warns that transit times and delivery dates are estimates.

	**•	Book:** the broker's action to arrange the selected carrier service. Clicking it can create a real booking.

	**•	Stacked quotes / arrow:** opens additional offers associated with a carrier grouping. The app may show a separate “Xtended Network quote.” It is a distinct price/service result; the app screen does not explain the network's pricing or routing rules.

	**•	All, Standard, Guaranteed, Volume:** result filters. The number beside each label is the number of matching offers. “Volume” is a category shown by the app; its exact eligibility rules were not confirmed.

	**•	Carrier, Delivery, Price:** controls for organizing or filtering the results by those criteria.

	**•	Add manual quote:** add a quote that is not automatically returned in the results. The exact data requirements depend on the form.

The lowest price is not automatically the best choice. Compare service, delivery timing, guarantee, and customer needs as well as price.

**5\. Cost, margin, profit, and price**

**Label**  
**Meaning**  
**Example shown in the app**  
**Cost**  
Carrier's charge to move the shipment (the broker's buy cost).  
\$276.58  
**Margin**  
The share of the customer price retained as gross profit, shown as a percentage.  
25%  
**Profit**  
Customer price minus carrier cost, before other business expenses.  
\$92.19  
**Price**  
What the quote presents to the customer for the shipment.  
\$368.77  
In the example, \$368.77 customer price minus \$276.58 carrier cost equals \$92.19 gross profit. At a 25% margin, the price is about cost divided by 0.75. Changing margin or price changes the broker's customer quote; it does not change the carrier's underlying rate.

**6\. Shipment details and common freight terms**

**Term**  
**Plain meaning**  
**Pickup date**  
The planned date the carrier collects the freight. If the app says the pickup date has passed, choose a new date before continuing; this alone does not prove the shipment was canceled.  
**Pickup / delivery services**  
Extra services requested at collection or delivery. The available options depend on the form and locations.  
**Business with dock/forklift**  
A location type indicating a business site with a loading dock or forklift available.  
**Packaging / pallet**  
How the goods are packed or handled. A pallet is a platform used to group and move freight.  
**Dimensions and quantity**  
The size and number of pieces or handling units. These affect how much truck space the shipment uses.  
**Weight**  
The shipment's total weight.  
**Freight class**  
An LTL rating category used by carriers when pricing freight.  
**NMFC**  
National Motor Freight Classification item code used to classify many LTL commodities. Confirm the correct code and class with the shipper or tariff source.  
**Stackable**  
Indicates whether other freight can safely be placed on top.  
**Hazmat**  
Hazardous materials; special rules and handling may apply.  
**Protect from freezing**  
A service request to protect freight from freezing conditions.  
**Estimated total length / linear feet**  
Approximate truck-floor length used by the shipment, useful for space planning.  
Blanket (04821J)  
The quote details display this as a freight item description with a code. The screen does not define the code; verify the commodity and NMFC classification before relying on it.  
**7\. Billing, documents, and shipment tracking**

**Term**  
**Plain meaning**  
**What to verify**  
**Third Party Prepaid**  
A billing term shown on the quote detail.  
The label alone does not make clear which party is billed or when payment is collected in this account. Confirm the payer in the carrier billing setup or invoice before booking.  
**BOL (Bill of Lading)**  
Shipping document describing the freight and shipment instructions.  
The shipment screen uses BOL as a shipment reference.  
**PRO number**  
Carrier tracking or shipment reference number used to follow freight.  
The shipment record can show a PRO number and carrier tracking link.  
**Rate confirmation**  
Document confirming the agreed shipment terms and carrier rate.  
The app links to a customer rate confirmation in a shipment record.  
**POD (Proof of Delivery)**  
Evidence that the freight was delivered.  
The public site describes capturing POD documents.  
**Invoice**  
Bill for shipment charges.  
The app provides a draft invoice link and an accounting area.  
**Tracking update**  
A milestone or status update, such as pickup received, assigned to a driver, picked up, departed, or estimated delivery.  
Shipment details show a timeline and an “add tracking update” control.  
**8\. Quote and shipment statuses**

**Status**  
**Simple meaning**  
**Requested**  
A quote request has been created or is waiting for pricing work.  
**Quoted**  
Carrier pricing is available and a customer quote can be prepared or shared.  
**Booked**  
A carrier has been selected and the shipment booking is recorded.  
**Scheduled**  
Pickup or delivery is scheduled.  
**In transit**  
The carrier has picked up the freight and it is moving.  
**Delivered**  
The shipment is marked delivered.  
**Expired**  
A quote or rate is no longer current. Check the record before reusing it.  
**Canceled**  
A shipment or quote was canceled. Confirm via its status or activity history; a past pickup date by itself is not cancellation.  
A checkmark or icon should be read with its label or status history. Do not assume every check means the customer approved the quote; in the app, quote, booking, pickup, and delivery are separate stages.

**9\. Payment terms and approvals need care**

	**•	Prepaid** generally means freight charges are paid before or at the time of shipment. In freight billing, the exact payer depends on the billing arrangement.

	**•	Third Party** generally means a party other than the shipper or carrier is billed. The combined label “Third Party Prepaid” should be confirmed against the customer's and carrier's billing configuration.

	•	The broker's **Book** action is separate from a customer's approval of the broker's price. The app offers quote sharing and customer-facing workflows, but the specific approval event for a given quote must be verified in that quote's activity/status.

**10\. Quick checklist before booking**

	1	Confirm shipper, origin, destination, pickup date, and contact details.

	2	Confirm commodity, packaging, quantity, dimensions, weight, freight class, and NMFC.

	3	Choose LTL or the appropriate truck/equipment type.

	4	Compare carrier, price, transit time, service level, guarantee, and accessorial needs.

	5	Check margin, customer price, payment terms, and who is billed.

	6	Confirm the customer approval or tender step required for this shipment.

	7	Book the carrier only when the details and terms are correct; then monitor pickup, transit, delivery, and documents.

**11\. What the app does not make clear**

	•	The precise source and rating rules behind “Xtended Network quote.”

	•	What qualifies a result as “Volume.”

	•	The exact payer and timing represented by “Third Party Prepaid” for every account.

	•	The meaning of a particular commodity code such as 04821J without checking the current freight classification source.

	•	Whether the customer has approved a specific price unless the quote's activity or status explicitly records that approval.

	•	Whether a shipment is canceled when its pickup date has passed. Check status and history; the expired date alone is not proof.

