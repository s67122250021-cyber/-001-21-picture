import os
import shutil
from PIL import Image

# พาธต้นทาง (โฟลเดอร์ รูป) และ พาธปลายทาง (โฟลเดอร์โปรเจกต์)
source_dir = os.path.join(os.path.expanduser('~'), 'Downloads', 'รูป')
target_dir = os.path.join('public', 'images', 'attractions')

os.makedirs(target_dir, exist_ok=True)

if not os.path.exists(source_dir):
    print(f"ไม่พบโฟลเดอร์ต้นทาง: {source_dir}")
    # ถ้าค้นหาแบบ relative path
    source_dir = os.path.join('..', '..', '..', 'รูป')

files = [f for f in os.listdir(source_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
print(f"พบรูปภาพในโฟลเดอร์ 'รูป' จำนวน {len(files)} รูป กำลังย้าย แปลงเป็น .jpg และบีบอัด...\n")

count = 0
for filename in files:
    src_filepath = os.path.join(source_dir, filename)
    
    # กำหนดชื่อปลายทางให้เป็น .jpg ทั้งหมด
    base_name = os.path.splitext(filename)[0]
    dst_filepath = os.path.join(target_dir, f"{base_name}.jpg")
    
    try:
        with Image.open(src_filepath) as img:
            img = img.convert('RGB')
            img.save(dst_filepath, 'JPEG', optimize=True, quality=80)
            
            size_kb = os.path.getsize(dst_filepath) / 1024
            print(f"✓ [{base_name}.jpg] ย้ายและบีบอัดเรียบร้อย ขนาด: {size_kb:.1f} KB")
            count += 1
    except Exception as e:
        print(f"✗ [{filename}] ไม่สำเร็จ: {e}")

print(f"\nประมวลผลรูปภาพสำเร็จทั้งหมด {count} รูป! รูปถูกย้ายไปที่ {target_dir} เรียบร้อยแล้ว")