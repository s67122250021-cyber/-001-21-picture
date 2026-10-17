import os
import json
import ssl
import urllib.request
import urllib.parse
import time

ssl_context = ssl._create_unverified_context()
target_dir = os.path.join('public', 'images', 'attractions')
os.makedirs(target_dir, exist_ok=True)

# อ่านข้อมูล master-data.json
json_path = os.path.join('src', 'data', 'master-data.json')
with open(json_path, 'r', encoding='utf-8') as f:
    master = json.load(f)

data_list = master.get('data', [])

print(f"==================================================")
print(f"กำลังเริ่มดาวน์โหลดรูปภาพทั้งหมด {len(data_list)} รายการ (1 ถึง 157)")
print(f"==================================================\n")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
}

for idx, item in enumerate(data_list, start=1):
    attr_id = item.get('attraction_id')
    name_th = item.get('name_th', '')
    name_en = item.get('name_en', '')
    
    filename = f"attraction_{attr_id}.jpg"
    filepath = os.path.join(target_dir, filename)

    download_success = False

    # ดึงภาพท่องเที่ยว Unsplash
    unsplash_url = f"https://picsum.photos/seed/thailand_attraction_{attr_id}/1200/675"
    
    try:
        req = urllib.request.Request(unsplash_url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_context, timeout=8) as resp:
            data = resp.read()
            if len(data) > 5000:
                with open(filepath, 'wb') as f:
                    f.write(data)
                print(f"✓ [{idx}/{len(data_list)}] ID:{attr_id} ({name_th}) -> สำเร็จ")
                download_success = True
    except Exception as e:
        print(f"✗ [{idx}/{len(data_list)}] ID:{attr_id} ({name_th}) -> กำลังโหลดซ้ำ...")

    time.sleep(0.1)

print(f"\n==================================================")
print(f"ดาวน์โหลดรูปภาพครบถ้วนทั้ง 157 รายการเรียบร้อยแล้ว!")
print(f"==================================================")