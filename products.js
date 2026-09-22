const PRODUCTS = [
    { 
        id: 1, 
        name: "PID Ball and Beam kit", 
        price: 1499, 
        images: [
            "pidv2.png",
             "pidv3.gif"
        ],
        shortDesc: "ชุดคิทสำหรับเรียนรู้ระบบควบคุม PID พร้อมเอกสารเเละคู่มือการเรียน",
        fullDesc: `ประกอบด้วย ESP32 Servo motor สายจั้ม ชิ้นส่วน 3D print
• ออกเเบบมาเพื่อให้เข้าใจระบบควบคุมสำหรับผู้ที่จะนำไปต่อยอดต่างๆ
• เช่น การควบคุมหุ่นยนต์สองล้อ การควบคุมระบบที่ต้องการความเเม่นยำ
• มีเอกสาร PDF สำหรับใช้เรียนเเละตัวอย่างโปรเเกรมพร้อมอธิบายอย่างละเอียด
• เหมาะสำหรับผู้ที่มีความรู้ Arduino ระดับปานกลาง หรือผู้ที่สนใจการออกเเบบระบบควบคุมพื้นฐาน`

       
    },
    { 
        id: 2, 
        name: "คอรส์ Fusion 360 For 3D print!", 
        price: 2199, 
        images: [
            "FusionFor3D1.png"
        ],
        shortDesc: "คอร์สเรียน AutoDesk Fusion 360 สำหรับผู้เริ่มต้นเเละผู้ใช้ 3DPrinter",
        fullDesc: `รูปแบบการเรียน: Online Class ผ่าน [ระบุช่องทาง เช่น Zoom / Google Meet]
สิ่งที่จะได้รับ
• เรียนสด 3 ครั้ง (ครั้งละ 1.5 ชม.) รวม 4.5 ชม. เต็ม
• แบบฝึกหัดพร้อมเฉลยทุกบทเรียน
• แบบฝึกหัดพร้อมเฉลยทุกบทเรียน
• เทคนิคการขึ้นรูปงาน สำหรับงาน 3D Print โดยเฉพาะ
• ⚠️ หมายเหตุ: ผู้เรียนต้องติดตั้งโปรแกรม Fusion 360
(Personal/Startup/Education License) มาให้พร้อมก่อนเริ่มเรียน
• มีเเบบฝึกหัดเเละเฉลยสำหรับฝึกฝน (8 เเบบฝึกหัด)
โดยมีเนื้อหาในการเรียนดังนี้
1. เครื่องมือเเละ tab ⚙️
1.1 การเปิดไฟล์ เเละระบบการบันทึกบนคลาวด์
1.2 Milestone เเละการ SaveFile
1.3 อธิบายการใช้งาน Design Drawing sim
1.4 การใช้เม้าส์ ปรับมุมมอง 3D Orbit Zoom Pan
1.5 การย้อน Time-Line
2. การเขียน 2D Sketch (4 แบบฝึกหัด) 🚃
2.1.การใช้เครื่องมือ Sketch ในการวาดรูป พื้นฐาน
2.2.การใช้คำสั่งพิเศษเชื่อ Sketch Tangent Center Point / Corner
2.3.การใช้คำสั่ง 3D Sketch
3. การขึ้นรูป 3d (4 แบบฝึกหัด) 🗼
3.1 การ Extrude boss/cut
3.2 การใช้เเผง panel คำสั่ง
3.3 การใช้คำสั่ง hole
3.4 การใช้คำสั่ง fillet chamfer
3.5 การใช้คำสั่ง revolute loft sweep
3.6 การใช้คำสั่ง Plane Mirror Pattern
3.7 การเปลี่ยนสี เเละ เปลี่ยนวัสดุ
4. การ mate / joint (Assembly) 🎥
4.1 อธิบายชนิดของการ Mate / Joint
4.2 จำลองการ Mate รูปเเบบต่าง
4.3 คำสั่ง **align**
4.4 การใช้ Add-ins เพื่อใส่ Nut Bolt
4.5 การโหลดไฟล์ 3D มาใส่ในโปรเเกรม Fusion360
4.6 การใช้ Motion study การจำลอง Animate
4.7 การ Export File สำหรับการทำ 3DPrint`
    },
    { 
        id: 3, 
        name: "AED Box Fidget Clicker", 
        price: 180, 
        images: [
            "https://via.placeholder.com/300x200?text=AED+Clicker"
        ],
        shortDesc: "กล่อง AED จิ๋วพร้อมปุ่มกดจำลอง พกพาง่าย น่ารัก",
        fullDesc: `กล่อง AED จิ๋วสุดน่ารัก (AED Box Fidget Clicker)
• ดีไซน์จำลองกล่องกระตุกหัวใจอัตโนมัติ (AED) ในรูปแบบพกพา
• กลไกปุ่มกดภายในตอบสนองดี สัมผัสสนุกมือ
• เหมาะสำหรับมอบเป็นของขวัญ`
    }
];

function renderProducts() {
    const container = document.getElementById('product-list');
    if (!container) return;

    container.innerHTML = PRODUCTS.map(p => {
        const mainImg = (p.images && p.images.length > 0) ? p.images[0] : (p.img || 'https://via.placeholder.com/300x200');
        
        return `
            <div class="product-card">
                <img src="${mainImg}" alt="${p.name}" class="product-img" style="cursor:pointer;" onclick="openProductDetail(${p.id})">
                <div class="product-info">
                    <h3 class="product-title" style="cursor:pointer;" onclick="openProductDetail(${p.id})">${p.name}</h3>
                    <div class="product-desc">${p.shortDesc}</div>
                    <div class="product-price">฿${Number(p.price).toLocaleString()}</div>
                    <div style="display:flex; gap:8px;">
                        <button class="buy-btn" style="background:#555;" onclick="openProductDetail(${p.id})">🔍 รายละเอียด</button>
                        <button class="buy-btn" onclick="openProductCheckout(${p.id})">🛒 สั่งซื้อ</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function openProductDetail(prodId) {
    const prod = PRODUCTS.find(p => p.id === prodId);
    if (!prod) return;

    const imgList = prod.images && prod.images.length > 0 ? prod.images : [prod.img || 'https://via.placeholder.com/300x200'];

    document.getElementById('detail-img').src = imgList[0];
    document.getElementById('detail-title').innerText = prod.name;
    document.getElementById('detail-price').innerText = `฿ ${Number(prod.price).toLocaleString()}`;
    document.getElementById('detail-desc').innerText = prod.fullDesc;

    const galleryContainer = document.getElementById('detail-gallery');
    if (galleryContainer) {
        if (imgList.length > 1) {
            galleryContainer.innerHTML = imgList.map((imgUrl, idx) => `
                <img src="${imgUrl}" 
                     style="width:60px; height:60px; object-fit:cover; border-radius:6px; cursor:pointer; border:2px solid ${idx===0?'var(--primary)':'#ccc'};" 
                     onclick="changeDetailImage('${imgUrl}', this)">
            `).join('');
            galleryContainer.style.display = 'flex';
        } else {
            galleryContainer.style.display = 'none';
        }
    }

    const buyBtn = document.getElementById('detail-buy-btn');
    buyBtn.onclick = function() {
        closeProductDetail();
        openProductCheckout(prod.id);
    };

    document.getElementById('product-detail-modal').style.display = 'flex';
}

function changeDetailImage(imgUrl, element) {
    document.getElementById('detail-img').src = imgUrl;
    const thumbs = document.querySelectorAll('#detail-gallery img');
    thumbs.forEach(t => t.style.borderColor = '#ccc');
    element.style.borderColor = 'var(--primary)';
}

function closeProductDetail() {
    document.getElementById('product-detail-modal').style.display = 'none';
}
