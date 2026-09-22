const PRODUCTS = [
    { 
        id: 1, 
        name: "PID Ball and Beam kit", 
        price: 1499, 
        images: [
            "pidv2.png"
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
        name: "Mini Emergency Push Button Clicker", 
        price: 150, 
        images: [
            "https://via.placeholder.com/300x200?text=Emergency+Button"
        ],
        shortDesc: "สวิตช์ปุ่มกดฉุกเฉินขนาดจิ๋ว Fidget เสียงคลิกแน่นเพลิดเพลิน",
        fullDesc: `สวิตช์ปุ่มกดฉุกเฉินจิ๋ว (Mini Emergency Push Button Clicker)
• สวิตช์กลไก Tactile Switch คุณภาพสูง ให้สัมผัสการกดที่แน่นและเสียงคลิกสะใจ
• ขนาดเล็กพกพาง่าย มีช่องสำหรับร้อยพวงกุญแจ
• ผลิตด้วยงานพิมพ์ 3D ชนิด PLA Pro ความละเอียดสูง`
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
