# Thai Attractions Guide

โปรเจกต์ React + Vite ตามโครงสร้างจากไฟล์โครงการ DADD

## มีอะไรในเวอร์ชันนี้
- Home
- Attractions + กรองจังหวัด
- Attraction Detail
- Favorites (localStorage)
- Search
- ใช้ข้อมูลสถานที่ 156 รายการจาก `src/data/master-data.json`
- ยังไม่ใส่รูปจริง ใช้พื้นที่ Placeholder
- เตรียมโครงสร้าง Firebase ไว้ แต่ยังไม่ต้องตั้ง Firebase เพื่อทดลองเว็บ

## วิธีรันใน VS Code

1. ติดตั้ง Node.js
2. เปิด VS Code
3. `File > Open Folder...` แล้วเลือกโฟลเดอร์ `thai-attractions-guide`
4. เปิด `Terminal > New Terminal`
5. รัน:

```bash
npm install
npm run dev
```

6. เปิด `http://localhost:3000`

## Build

```bash
npm run build
npm run preview
```

## โครงสร้าง

```text
src/
├── components/
│   ├── layout/
│   ├── common/
│   ├── pages/
│   └── styles/
├── data/master-data.json
├── firebase/firebaseConfig.js
├── hooks/useFavorites.js
├── routes/routes.jsx
└── services/attractionService.js
```

## เพิ่มรูปภายหลัง

ใส่ไฟล์ตามมาตรฐาน DADD:

```text
public/images/thumbnails/attraction_001_thumb.webp
public/images/details/attraction_001_detail.webp
```

แล้วค่อยเปลี่ยน Placeholder ใน `AttractionCard.jsx` และ `AttractionDetailPage.jsx`
ให้ใช้ `image_thumbnail` / `image_detail`.

## Firebase

มี `.env.example` และ `src/firebase/firebaseConfig.js` เตรียมไว้แล้ว
แต่เวอร์ชันนี้อ่านข้อมูลจาก JSON ก่อน เพื่อให้สามารถรันเว็บได้ทันทีโดยไม่ต้องตั้ง Firebase
