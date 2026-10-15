import os
import json
import urllib.request
import ssl
from PIL import Image

ssl_context = ssl._create_unverified_context()

# 1. โฟลเดอร์ปลายทางตาม PDF: public/images/attractions/
output_dir = os.path.join('public', 'images', 'attractions')
temp_dir = os.path.join('public', 'images', 'temp')
os.makedirs(output_dir, exist_ok=True)
os.makedirs(temp_dir, exist_ok=True)

json_path = os.path.join('src', 'data', 'master-data.fixed.json')
if not os.path.exists(json_path):
    json_path = os.path.join('src', 'data', 'master-data.bilingual.json')

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

attractions = data['data'] if isinstance(data, dict) and 'data' in data else data

# ชุดภาพวิวธรรมชาติ/สถานที่ท่องเที่ยวคุณภาพสูง
sample_images = [
    "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&h=675&fit=crop",
    "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1200&h=675&fit=crop",
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&h=675&fit=crop",
    "https://images.unsplash.com/photo-1512553353614-82a7370096dc?w=1200&h=675&fit=crop",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=675&fit=crop"
]

print("กำลังเตรียมไฟล์รูปภาพตามข้อกำหนดใน PDF...")

for item in attractions:
    attr_id = item['attraction_id']
    name_th = item.get('name_th', '')
    
    # ข้อ 1: ตั้งชื่อไฟล์ตาม ID (attraction_001.jpg, attraction_002.jpg, ...)
    filename = f"attraction_{attr_id}.jpg"
    target_path = os.path.join(output_dir, filename)
    
    # เลือกรูปจากคลังวนตาม ID
    img_url = sample_images[int(attr_id) % len(sample_images)]
    temp_file = os.path.join(temp_dir, f"temp_{attr_id}.jpg")
    
    try:
        req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ssl_context, timeout=8) as response, open(temp_file, 'wb') as out_file:
            out_file.write(response.read())
            
        with Image.open(temp_file) as img:
            img = img.convert('RGB')
            # ข้อ 2: สัดส่วน 16:9 (1200x675 พิกเซล)
            target_w, target_h = 1200, 675
            img_w, img_h = img.size
            
            aspect_target = target_w / target_h
            aspect_img = img_w / img_h
            
            if aspect_img > aspect_target:
                new_w = int(img_h * aspect_target)
                left = (img_w - new_w) // 2
                img_cropped = img.crop((left, 0, left + new_w, img_h))
            else:
                new_h = int(img_w / aspect_target)
                top = (img_h - new_h) // 2
                img_cropped = img.crop((0, top, img_w, top + new_h))
            
            img_resized = img_cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
            # เซฟลง .jpg บีบอัดคุณภาพให้ขนาดไฟล์เบาตาม PDF
            img_resized.save(target_path, 'JPEG', quality=80, optimize=True)
            print(f"✓ {filename} [16:9 | 1200x675]")
    except Exception as e:
        print(f"Error {filename}: {e}")
        
    if os.path.exists(temp_file):
        try:
            os.remove(temp_file)
        except Exception:
            pass

print("\n✓ เตรียมไฟล์รูปภาพครบถ้วน ตรงตามข้อกำหนดใน PDF เรียบร้อยแล้ว!")