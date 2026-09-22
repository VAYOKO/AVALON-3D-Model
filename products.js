const PRODUCTS = [
    { 
       const PRODUCTS = [
    { 
        id: 1, 
        name: "PID Ball and Beam kit", 
        price: 1499, // แนะนำให้ใส่เป็นตัวเลข เพื่อให้นำไปคำนวณราคารวมค่าส่งได้ถูกต้องครับ
        
        // ใส่เป็นอาร์เรย์ รองรับหลายรูปภาพ (ถ้ามีรูปในโฟลเดอร์เดียวกับ index.html ใส่ชื่อไฟล์ได้เลย)
        images: [
            "ballbeam1.png",
            "ball_beam_2.jpg",
            "ball_beam_3.jpg"
        ],
        
        shortDesc: "ชุดคิทสำหรับเรียนรู้ระบบควบคุม PID พร้อมเอกสารเเละคู่มือการเรียน",
        fullDesc: `ประกอบด้วย ESP32 Servo motor สายจั้ม ชิ้นส่วน 3D print
• ออกเเบบมาเพื่อให้เข้าใจระบบควบคุมสำหรับผู้ที่จะนำไปต่อยอดต่างๆ
• เช่น การควบคุมหุ่นยนต์สองล้อ การควบคุมระบบที่ต้องการความเเม่นยำ
• มีเอกสาร PDF สำหรับใช้เรียนเเละตัวอย่างโปรเเกรมพร้อมอธิบายอย่างละเอียด
• เหมาะสำหรับผู้ที่มีความรู้ Arduino ระดับปานกลาง หรือผู้ที่สนใจการออกเเบบระบบควบคุมพื้นฐาน`
    },
    // ... สินค้าชิ้นอื่นๆ
];
        id: 2, 
        name: "AED Box Fidget Clicker", 
        price: 180, 
        img: "https://via.placeholder.com/300x200?text=AED+Clicker",
        shortDesc: "กล่อง AED จิ๋วพร้อมปุ่มกดจำลอง พกพาง่าย น่ารัก",
        fullDesc: `กล่อง AED จิ๋วสุดน่ารัก (AED Box Fidget Clicker)\n• ดีไซน์จำลองกล่องกระตุกหัวใจอัตโนมัติ (AED) ในรูปแบบพกพา\n• กลไกปุ่มกดภายในตอบสนองดี สัมผัสสนุกมือ\n• งานพิมพ์สีสันสดใส ไม่หลุดลอกง่าย\n• เหมาะสำหรับมอบเป็นของขวัญให้นักเรียนแพทย์ สายบุคลากรทางการแพทย์`
    },
    { 
        id: 3, 
        name: "บริการออกแบบ CAD / 3D Model", 
        price: 500, 
        img: "https://via.placeholder.com/300x200?text=CAD+Design",
        shortDesc: "รับออกแบบชิ้นงานวิศวกรรม กลไก สเกลโมเดล ตามสั่ง",
        fullDesc: `บริการออกแบบชิ้นงาน 3D CAD Parametric\n• รับขึ้นโมเดลชิ้นงานวิศวกรรม กลไกหุ่นยนต์ ชิ้นส่วนทดแทน\n• ออกแบบชิ้นงานสำหรับ 3D Printing โดยเฉพาะ\n• ส่งมอบไฟล์งานครบถ้วน (.STEP, .STL, .F3D)\n• ราคาเริ่มต้น ฿500 (ประเมินตามความซับซ้อนของชิ้นงาน)`
    }
];

function renderProducts() {
    const container = document.getElementById('product-list');
    if (!container) return;

    container.innerHTML = PRODUCTS.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}" class="product-img" style="cursor:pointer;" onclick="openProductDetail(${p.id})">
            <div class="product-info">
                <h3 class="product-title" style="cursor:pointer;" onclick="openProductDetail(${p.id})">${p.name}</h3>
                <div class="product-desc">${p.shortDesc}</div>
                <div class="product-price">฿${p.price.toLocaleString()}</div>
                <div style="display:flex; gap:8px;">
                    <button class="buy-btn" style="background:#555;" onclick="openProductDetail(${p.id})">🔍 รายละเอียด</button>
                    <button class="buy-btn" onclick="openProductCheckout(${p.id})">🛒 สั่งซื้อ</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openProductDetail(prodId) {
    const prod = PRODUCTS.find(p => p.id === prodId);
    if (!prod) return;

    document.getElementById('detail-img').src = prod.img;
    document.getElementById('detail-title').innerText = prod.name;
    document.getElementById('detail-price').innerText = `฿ ${prod.price.toLocaleString()}`;
    document.getElementById('detail-desc').innerText = prod.fullDesc;

    const buyBtn = document.getElementById('detail-buy-btn');
    buyBtn.onclick = function() {
        closeProductDetail();
        openProductCheckout(prod.id);
    };

    document.getElementById('product-detail-modal').style.display = 'flex';
}

function closeProductDetail() {
    document.getElementById('product-detail-modal').style.display = 'none';
}
