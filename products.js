const PRODUCTS = [
    { 
        id: 1, 
        name: "Mini Emergency Push Button Clicker", 
        price: 150, 
        img: "https://via.placeholder.com/300x200?text=Emergency+Button",
        shortDesc: "สวิตช์ปุ่มกดฉุกเฉินขนาดจิ๋ว Fidget เสียงคลิกแน่นเพลิดเพลิน",
        fullDesc: `สวิตช์ปุ่มกดฉุกเฉินจิ๋ว (Mini Emergency Push Button Clicker)\n• สวิตช์กลไก tactile ให้สัมผัสกดที่แน่นและเสียงคลิกสะใจ\n• ขนาดเล็กพกพาง่าย มีรูสำหรับใส่พวงกุญแจ\n• ผลิตด้วยงานพิมพ์ 3D ชนิด PLA Pro ความละเอียดสูง\n• เหมาะสำหรับเป็นของเล่นแก้เครียด (Fidget Toy) หรือพกติดกระเป๋า`
    },
    { 
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
