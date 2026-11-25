# Findings that did not reproduce

These findings were checked in the browser and did not reproduce as written, so no Trello card was created for them.

| ID | Date checked | What the sheet says | What I observed | Staging | Production |
| --- | --- | --- | --- | --- | --- |
| SHP-53 | 2026-11-25 | Staging stop-time selector opens without showing available times. | Rechecked BOL 1046693. Opening pickup Open time shows 96 choices in 15-minute steps on both sides. Staging does not show "No matches found". The value stayed 11:00 AM; nothing was saved. | Opens with selectable times. | Opens with selectable times. |
| DOC-11 | 2026-11-24 | Staging customer confirmation leaves the Equipment field blank. | On BOL 1047885 the Equipment field shows "ArcBestStandard" on both sides. | Shows "ArcBestStandard". | Shows "ArcBestStandard". |
| DOC-12 | 2026-11-25 | Carrier rate-confirmation share form has no "Add new contact" option on staging. | Rechecked BOL 1047829. Share, then + add share. Both forms list DISPATCH (profitruckinginc@gmail.com), "+ add new contact", and Share. Nothing was shared or added. | Shows "+ add new contact". | Shows "+ add new contact". |


## Could not verify (no ticket yet)

| ID | Date checked | What the sheet says | What I observed | Why no ticket |
| --- | --- | --- | --- | --- |





| QA-03 | 2026-11-25 | Invoice queue sort and shipment filters work on both sides. | Rechecked. Sort menus show the same three options (Created date new to old, Pickup date new to old, Pickup date old to new). Filter panels show the same categories. LTL filter adds equipment=LTL to the URL and changes the queue on both sides. Clearing LTL returns the unfiltered queue. Note: the Approve counts read the reverse of the QA-02 read (staging 97, production 94 now); not a filter issue. | Sort and filters work. | Sort and filters work. |

Notes:
- No file was uploaded, removed, or changed while checking these.
- Production was only viewed; nothing was saved.
- DOC-10 was rechecked on 2026-11-25. Production search still returns no BOL 1048167. The same full-screen upload route appears on BOL 1046693 and BOL 1047885.
