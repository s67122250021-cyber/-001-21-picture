import json
import urllib.request
import urllib.parse
import ssl
import os
import time

ssl_context = ssl._create_unverified_context()
target_dir = os.path.join('public', 'images', 'attractions')
os.makedirs(target_dir, exist_ok=True)

# โหลดข้อมูล master-data
json_path = os.path.join('src', 'data', 'master-data.json')
with open(json_path, 'r', encoding='utf-8') as f:
    master = json.load(f)

data_list = master.get('data', [])

print(f"กำลังดาวน์โหลดรูปภาพตรงสถานที่ท่องเที่ยว ทั้งหมด {len(data_list)} รายการ...")

for item in data_list:
    attr_id = item.get('attraction_id')
    name_th = item.get('name_th', '')
    name_en = item.get('name_en', '')
    category_th = item.get('category_th', '')
    filename = f"attraction_{attr_id}.jpg"
    filepath = os.path.join(target_dir, filename)

    # ตัดคำค้นให้กระชับเพื่อค้นหาง่ายขึ้น
    search_keyword = name_en if name_en else name_th
    encoded_keyword = urllib.parse.quote(f"{search_keyword} Thailand {category_th}")

    # ดึงภาพท่องเที่ยวตรงคีย์เวิร์ดจาก Unsplash Source
    url = f"https://source.unsplash.com/1200x675/?{encoded_keyword}"
    backup_url = f"https://source.unsplash.com/1200x675/?thailand,travel,landscape&sig={attr_id}"

    success = False
    for target_url in [url, backup_url]:
        try:
            req = urllib.request.Request(target_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            with urllib.request.urlopen(req, context=ssl_context, timeout=12) as resp:
                data = resp.read()
                if len(data) > 10000:
                    with open(filepath, 'wb') as f:
                        f.write(data)
                    print(f"✓ [{attr_id}] {name_th} -> อัปเดตรูปท่องเที่ยวสำเร็จ")
                    success = True
                    break
        except Exception:
            continue

    if not success:
        print(f"✗ [{attr_id}] {name_th} -> โหลดไม่สำเร็จ")

    time.sleep(0.3)

print("\nดาวน์โหลดรูปภาพสถานที่ท่องเที่ยวสวยงามตรงปกเรียบร้อยแล้ว!")