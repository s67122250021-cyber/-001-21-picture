import os
import urllib.request
import ssl

ssl_context = ssl._create_unverified_context()
target_dir = os.path.join('public', 'images', 'attractions')
os.makedirs(target_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

print("กำลังดาวน์โหลดรูปภาพ HD ที่ไม่ซ้ำกัน 157 รูป...")

for i in range(1, 158):
    filename = f"attraction_{i:03d}.jpg"
    filepath = os.path.join(target_dir, filename)
    
    # บังคับ Unique ID เพื่อไม่ให้ภาพซ้ำกันแน่ๆ
    url = f"https://picsum.photos/seed/thailand_attraction_{i}/1200/675"
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_context, timeout=10) as resp:
            with open(filepath, 'wb') as f:
                f.write(resp.read())
        print(f"✓ [{i}/157] {filename} เรียบร้อย (ไม่ซ้ำ)")
    except Exception as e:
        print(f"✗ [{i}/157] Error {filename}: {e}")

print("\nอัปเดตรูปภาพที่ไม่ซ้ำกันครบถ้วนเรียบร้อยแล้ว!")