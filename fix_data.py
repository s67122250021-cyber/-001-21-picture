import json
import os
import re

json_path = 'src/data/master-data.fixed.json'
if not os.path.exists(json_path):
    json_path = 'src/data/master-data.bilingual.json'

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

items = data['data'] if isinstance(data, dict) and 'data' in data else (data.get('attractions', []) if isinstance(data, dict) else data)

def clean_thai_text(text):
    if not text:
        return text
    # ถ้ามีช่องว่างแทรกระหว่างอักษรไทย ให้ดึงมารวมกัน
    if re.search(r'[\u0e00-\u0e7f]\s+[\u0e00-\u0e7f]', text):
        text = re.sub(r'(?<=\b[\u0e00-\u0e7f])\s+(?=[\u0e00-\u0e7f]\b)', '', text)
        text = re.sub(r'([\u0e00-\u0e7f])\s+([\u0e00-\u0e7f])', r'\1\2', text)
    return text.strip()

for item in items:
    item['name_th'] = clean_thai_text(item.get('name_th', ''))
    attr_id = item['attraction_id']
    item['image_thumbnail'] = f"/images/attractions/attraction_{attr_id}.jpg"

save_path = 'src/data/master-data.fixed.json'
with open(save_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("✓ แก้ไขชื่อสถานที่ใน JSON เรียบร้อยแล้ว (ไม่มีช่องว่างแทรกแล้ว!)")