#!/bin/bash
# Usage: .qa-save-shot.sh <base64_file> <output_png>
python3 - "$1" "$2" <<'PY'
import base64, sys
src, dst = sys.argv[1], sys.argv[2]
with open(src) as f:
    data = f.read().strip()
if data.startswith('data:'):
    data = data.split(',', 1)[1]
with open(dst, 'wb') as out:
    out.write(base64.b64decode(data))
print(dst)
PY
