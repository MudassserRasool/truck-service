**10-4 TMS: API Access Guide** 

**Prepared for:** Josh Kiefer, 10-4 Global Logistics 

**Prepared by:** Stackup Solutions 

**Date:** October 9, 2026 

To connect 10-4 TMS to your carriers and tools, we need API access from each provider. This guide lists every integration currently set up in Quote Factory, shows its status, and explains how to get the API access for each one. 

**For most carriers you will need:** 

your 10-4 account number with that carrier 

a login on that carrier's website 

**1\. LTL Carriers** 

**Status in Quote Factory today**

| Carrier  | Status in Quote Factory |
| ----- | ----- |
| A. Duie Pyle  | ✅Enabled |
| AAA Cooper Transportation  | ✅Enabled |
| ArcBest (ABF Freight)  | ✅Enabled |
| Averitt  | ✅Enabled |
| Go2 Logistics  | ✅Enabled |
| Magnum  | ✅Enabled |
| Old Dominion Freight Line  | ✅Enabled |
| Roadrunner Freight  | ✅Enabled |
| Saia  | ✅Enabled |
| Southeastern Freight Lines  | ✅Enabled |

| Carrier  | Status in Quote Factory |
| ----- | ----- |
| TForce Freight  | ✅Enabled |
| XPO  | ✅Enabled |
| Pitt Ohio  | ��Activating (not live yet) |
| Warp  | ��Activating (not live yet) |
| FedEx Freight  | ⛔Disabled |
| Double D Express  | ⛔Disabled |
| Sunset Pacific Transportation  | ⛔Disabled (manual quotes only) |

**How to get API access for each carrier** 

**Group A: you can generate these yourself online.** Log in, request the keys, then send them to us.

| Carrier  | How to get it | What we need from you |
| ----- | ----- | ----- |
| **ArcBest (ABF) (Try this)** | Log in at averitt.com → API Dashboard (tools.averitt.com) → request an API key for each service (rate quote, pickup, tracking, BOL, documents). Support: support@averitt.com, 1-877-281-7131 | API ID **We have also submitted our profile, as we get confirmation from then we will further verify the flow of accessing that api** |
| **Averitt**  | Log in at averitt.com → API Dashboard (tools.averitt.com) → request an API key for each service (rate quote, pickup, tracking, BOL, documents). Support: support@averitt.com, 1-877-281-7131 | API key |
| **Saia**  | Create an account or sign in at the \[Saia API Developer Portal\](https\://saiaprodapi.developer.azure-api.net/). Open \*\*Products\*\*, choose the needed product (\*\*Rate Quote\*\*, \*\*Bill of Lading\*\*, or \*\*Customer Tracking REST API\*\*), enter a subscription name, and select \*\*Subscribe\*\*. Open \*\*Profile\*\* to access that subscription's primary and secondary keys. The portal may list other products too. The subscription step asks for a name; provide the Saia account number separately for integration setup. | Primary subscription key for each needed product \+ Saia account number |
| **TForce  Freight**  | Sign up at developer.tforcefreight.com → open your Profile → "Configure My Client". The secret is shown only once, so copy it right away. Support: groundfreightapisupport@tforcefreight.com | Client ID \+ Client Secret |
| **FedEx Freight**  | Sign in to the \[FedEx Developer Portal\](https\://developer.fedex.com/wirc/browser/en-us/home), join or create an organization, then create a project. In the project, open \*\*API keys\*\*: FedEx creates a test key and secret for the sandbox (\`https\://apis-sandbox.fedex.com\`); the secret is masked after creation, so reveal/copy it and store it securely. The API Keys page lists selected APIs and their production status; choose \*\*Request Production Keys\*\* to start FedEx's production access process, which may require validation depending on the API. In the account we checked, the project contained Ship API, Account Verification API, and Service Availability API, but \*\*Freight LTL was not available\*\* in the catalog or in \*\*Add Product\*\* (23 products were listed). The Freight LTL catalog page says documentation can only be viewed after adding it to a project. Therefore we could not create or verify Freight LTL credentials through this project's flow. Ask the FedEx Freight representative or Developer Portal support how Freight LTL API access is provisioned for this account before relying on the general project-key instructions. | For available project APIs: test API key \+ secret, then production key \+ secret after approval/validation. Freight LTL API credentials remain unverified. |

| Carrier  | How to get it | What we need from you |
| ----- | ----- | ----- |
| **AAA Cooper** | Register at \[AAA Cooper\](https\://aaacooper.com/pwb/Account/Register.aspx). The form requires a valid email as the user ID, password and security hint, company/contact and full address, phone, whether you are primarily a shipper/receiver/third party, and account numbers for your locations. Accept the Terms of Use and Privacy Policy to submit. AAA Cooper says a representative will contact you to finalize access. After the account is approved, sign in and request access through \*\*Web Services (API)\*\*; the registration page links to \[the Web Services request page\](https\://aaacooper.com/WS/WebServiceRequest.aspx). We have not verified the signed-in API request form or confirmed that it generates a self-service token, so confirm API credential provisioning with AAA Cooper. Support: CustomerCare@aaacooper.com, (334) 793-2284. | AAA Cooper login \+ account number (BusID); API token only after AAA Cooper confirms/provisions it**We cannot properly verify this because we do not have a USA number required for registration, so please try that** |
| **A. Duie Pyle** | Log in to MyPyle at aduiepyle.com → IT Support → fill out the Rate Quote Web Service request form. Phone: 800-523-5020 | MyPyle  username \+  password \+  account number**We cannot properly verify this because we do not have a USA number required for registration, so please try that** |
| **Southeastern**  | Uses your MySEFL website login. No separate key is needed. | MySEFL  username \+  password \+  account number**We have also submitted our profile, as we get confirmation from then we will further verify the flow of accessing that api**  |
| **Roadrunner** | Log in at freight.rrts.com → find your Application ID and API Key in the tools section | Application ID \+ API Key \+  account number**We have also submitted our profile, as we get confirmation from then we will further verify the flow of accessing that api** |

**Group B: email the carrier to request access.**

| Carrier  | Who to contact  | What to ask for |
| ----- | ----- | ----- |
| **XPO**   | LTLWebAPISupport@xpo.com | API access for rating, pickup, BOL and tracking. Include your XPO Web User ID and say you are a broker. |
| **Old  Dominion** | API@odfl.com or your ODFL rep. Signup page: odfl.com/WebServiceSignup | API access for rate estimate (REST), pickup, BOL and tracking**Email API@odfl.com with the APIs you need and ask for integration onboarding and QA access. ODFL lists its API services and API contact on the [Shipping API Integrations page](https://www.olddominionfreightlineinc.com/us/en/resources/shipping-api-integrations.html).** |
| **Pitt Ohio** | Your Pitt Ohio rep, or myPittOhio →  Technology → B2B Integration | Contact APIsupport@pittohio.com to get started. The API connection also requires a Pitt Ohio website user profile |
| **Magnum**  | Customer\_Service@Magnumlog.com | API username \+ password \+ account number |
| **Go2  Logistics** | Your Go2 sales rep | API token \+ account number \+ API documentation**Go2 doesn’t appear to offer a self-service API key generator in the customer portal. Its [EDI & API Capabilities page](https://go2.us/company/technology/) says to submit the [Integration Form](https://forms.gle/8DpoqZWqhXEFVamm9); Go2’s integrations team will follow up and manage setup** |
| **Double D  Express** | Your Double D rep | Choose **Apply** under **DOT Driver Application Form** or **Non-DOT Employee Application Form**. On the next screen, download the PDF using the down arrow. Open it in Adobe Acrobat Reader and fill in the fields. Submit using the form’s button and choose the email option. Or save the completed PDF and email it as an attachment to **kstefaniak@doubledexpress.com**.  |

| Carrier  |  | What to ask for |
| ----- | ----- | ----- |
| **Sunset  Pacific** | Your Sunset Pacific rep | **We have also submitted our profile, as we get confirmation from then we will further verify the flow of accessing that api**  |
| **Warp**  | Self sign-up at wearewarp.com/freight-api | Enter your registration details and you will get api keysShare both sandbox and production keys |

**2\. Other Integrations**

| Service  | What it does | Status in  Quote Factory | How to get API access |
| ----- | ----- | ----- | ----- |
| **QuickBooks Online** | Syncs bills and invoices and  marks them  paid | ✅Enabled  (syncing) | No action needed now. We create the app on Intuit's developer portal. When it's ready, you click **"Connect to QuickBooks"** once to approve it. |
| **Trucker Tools** | Live load  tracking. The driver gets a  tracking link. | ✅Enabled | Email integrations@truckertools.com and ask for TMS integration credentials (API key \+ secret \+ account IDs). |
| **MyCarrierPackets** | Carrier  onboarding  and  compliance | ⛔Not  connected to Quote Factory (used  separately) | Email mcp-help@descartes.com and ask for API / integration access for your account. |
| **DAT / Truckstop  auto-post** | Automatic load board posting | ⛔Not used | Not needed, since you post loads  manually. |
| **Carrier411,  CarrierOK, Highway, ClassIT+** | Carrier  monitoring and freight class  lookup | ⛔Disabled  | Not needed for now. |

