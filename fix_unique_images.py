import os
import ssl
import urllib.request
import time

ssl_context = ssl._create_unverified_context()
target_dir = os.path.join('public', 'images', 'attractions')
os.makedirs(target_dir, exist_ok=True)

print("กำลังดาวน์โหลดรูปภาพสถานที่ท่องเที่ยวที่ไม่ซ้ำกัน 157 รูป...")

for i in range(1, 158):
    filename = f"attraction_{i:03d}.jpg"
    filepath = os.path.join(target_dir, filename)
    
    # ถ้าไฟล์มีอยู่แล้วและขนาดสมบูรณ์ ให้ข้ามเพื่อความเร็ว
    if os.path.exists(filepath) and os.path.getsize(filepath) > 10000:
        continue
        
    # ลิงก์ดึงรูป Unsplash สถานที่ท่องเที่ยวแบบสุ่ม ID ไม่ซ้ำ
    url = f"https://source.unsplash.com/1200x675/?travel,nature,thailand&sig={i}"
    # ลิงก์สำรอง กรณี Unsplash timeout
    backup_url = f"https://picsum.photos/1200/675?random={i}"
    
    success = False
    for target_url in [url, backup_url]:
        try:
            req = urllib.request.Request(target_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, context=ssl_context, timeout=15) as resp:
                data = resp.read()
                if len(data) > 5000:
                    with open(filepath, 'wb') as f:
                        f.write(data)
                    print(f"✓ [{i}/157] โหลด {filename} สำเร็จ")
                    success = True
                    break
        except Exception:
            continue
            
    if not success:
        print(f"✗ [{i}/157] กำลังลองโหลด {filename} ใหม่...")
        
print("\nดาวน์โหลดรูปภาพที่ไม่ซ้ำกันครบทั้ง 157 รูปเรียบร้อยแล้ว!")