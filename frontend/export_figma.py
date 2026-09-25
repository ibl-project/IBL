import json
import os
import urllib.request
import urllib.parse
import re

with open('figma_export.json', 'r') as f:
    data = json.load(f)

texts = data['texts']
others = data['others']

TOKEN = os.environ.get('FIGMA_TOKEN')
FILE_KEY = 'JNwYBvhgHCiVx3Qi3SuhRr'

if not TOKEN:
    raise RuntimeError('Set FIGMA_TOKEN before running this script.')

def export_nodes(ids, format_ext):
    if not ids: return {}
    ids_str = ','.join(ids)
    url = f'https://api.figma.com/v1/images/{FILE_KEY}?ids={urllib.parse.quote(ids_str)}&format={format_ext}'
    req = urllib.request.Request(url, headers={'X-Figma-Token': TOKEN})
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read())
        return res_data.get('images', {})

text_ids = [t[0] for t in texts]
other_ids = [o[0] for o in others]

print('Exporting texts to JPG...')
text_urls = export_nodes(text_ids, 'jpg')
print('Exporting others to SVG...')
other_urls = export_nodes(other_ids, 'svg')

os.makedirs('public/images/figma', exist_ok=True)
os.makedirs('public/svg/figma', exist_ok=True)

def sanitize(name):
    return re.sub(r'[^a-zA-Z0-9_\-]', '_', name)[:30]

for t_id, t_name in texts:
    url = text_urls.get(t_id)
    if url:
        safe_name = sanitize(t_name)
        file_path = f"public/images/figma/{safe_name}_{t_id.replace(':', '_')}.jpg"
        urllib.request.urlretrieve(url, file_path)
        print(f'Downloaded {file_path}')

for o_id, o_name in others:
    url = other_urls.get(o_id)
    if url:
        safe_name = sanitize(o_name)
        file_path = f"public/svg/figma/{safe_name}_{o_id.replace(':', '_')}.svg"
        urllib.request.urlretrieve(url, file_path)
        print(f'Downloaded {file_path}')
