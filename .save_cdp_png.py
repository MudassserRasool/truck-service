import json, base64, sys
src, out = sys.argv[1], sys.argv[2]
with open(src) as f:
    data = json.load(f)
b64 = data.get('data') or data.get('result', {}).get('data')
if not b64:
    raise SystemExit(f'no data in {src}')
with open(out, 'wb') as f:
    f.write(base64.b64decode(b64))
print(out)
