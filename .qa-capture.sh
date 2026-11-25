#!/bin/bash
# Decode base64 PNG from stdin to output path
OUT="$1"
python3 - "$OUT" <<'PY'
import base64, sys
out = sys.argv[1]
data = sys.stdin.read().strip()
if data.startswith('data:'):
    data = data.split(',', 1)[1]
with open(out, 'wb') as f:
    f.write(base64.b64decode(data))
print(out)
PY
