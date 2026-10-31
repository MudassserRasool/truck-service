# Quote Factory network evidence

[Consolidated JSON](quote-factory-network.json) is the machine-readable evidence artifact. Current state: **capture preflight blocked; zero live request records**. Empty request arrays are not evidence of no network activity.

The third-party catalog bootstraps prior dated UI evidence, with `networkVerified: false`. It distinguishes visible providers/carrier cards from unverified candidates. Refer to the main guide §18.6 and E-114–115.

Future runs must start observation before actions, page all CDP event cursors, report truncation/unsupported child targets and correlate each request to a run/step. Preserve redirects/retries as distinct attempts. Record response-body omission reasons and transport outcomes separately from application success. Never replay requests or persist raw operational captures. Capture sanitization and collector tests remain pending, not passed.
