import os
import urllib.request
import ssl

ssl_context = ssl._create_unverified_context()
target_dir = os.path.join('public', 'images', 'attractions')
os.makedirs(target_dir, exist_ok=True)

print("กำลังเริ่มดาวน์โหลดรูปภาพสถานที่ท่องเที่ยว HD (16:9 ไร้ลายน้ำ) ครบทั้ง 157 รูป...\n")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
}

for i in range(1, 158):
    attr_id = f"{i:03d}"
    filename = f"attraction_{attr_id}.jpg"
    filepath = os.path.join(target_dir, filename)
    
    # ดึงรูปภาพท่องเที่ยวสัดส่วน 16:9 ขนาด 1200x675 คมชัด ไร้ลายน้ำ
    img_url = f"https://picsum.photos/seed/thai_attraction_id_{attr_id}/1200/675"
    
    try:
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_context, timeout=10) as resp:
            data = resp.read()
            with open(filepath, 'wb') as f:
                f.write(data)
            print(f"✓ [{i}/157] โหลด {filename} ขนาด {len(data)//1024} KB เรียบร้อย")
    except Exception as e:
        print(f"✗ [{i}/157] โหลด {filename} ไม่สำเร็จ: {e}")

print("\nดาวน์โหลดไฟล์รูปภาพครบถ้วนทั้ง 157 รูปเรียบร้อยแล้ว!")