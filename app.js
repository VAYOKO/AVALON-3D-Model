const CONFIG = {
    shopEmail: "varis22521@gmail.com",
    setupFee: 50,
    shippingFee: 60,
    materials: {
        pla_pro: { name: "PLA Pro", price: 3.7, density: 1.25, colors: ["#111111"], colorNames: {"#111111":"สีดำ"} },
        pla_silk: { name: "PLA Silk", price: 4.8, density: 1.25, colors: ["#FFFF00"], colorNames: {"#FFFF00":"สีทอง"} },
        petg_hf: { name: "PETG HF", price: 5.6, density: 1.25, colors: ["#ff9800","#4314FF"], colorNames: {"#ff9800":"สีส้ม","#4314FF":"สีน้ำเงิน"} },
        petg: { 
            name: "PETG มาตรฐาน", price: 5.1, density: 1.25, 
            colors: ["#3498db","#00cc00","#ff0000","#FFFF00","#A8A8A8","#FFFFFF","#FF99FF","#003300"], 
            colorNames: {"#3498db":"สีน้ำเงิน", "#00cc00":"สีเขียว", "#ff0000":"สีแดง", "#FFFF00":"สีเหลือง", "#A8A8A8":"สีเทา","#FFFFFF":"สีขาว","#FF99FF":"สีชมพู","#003300":"สีเขียวเข้ม"} 
        }
    }
};

let currentOrder = null;

function switchTab(tab) {
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    if(tab === 'store') {
        document.getElementById('tab-store').style.display = 'block';
        document.getElementById('tab-slicer').style.display = 'none';
        event.target.classList.add('active');
    } else {
        document.getElementById('tab-store').style.display = 'none';
        document.getElementById('tab-slicer').style.display = 'flex';
        event.target.classList.add('active');
        if(!scene) initThreeJS();
        setTimeout(onWindowResize, 100);
    }
}

function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    if(scene) scene.background = new THREE.Color(isDark ? 0xffffff : 0x121212);
}

function openProductCheckout(prodId) {
    const prod = PRODUCTS.find(p => p.id === prodId);
    currentOrder = { type: 'product', name: prod.name, price: prod.price };
    
    document.getElementById('modal-title').innerText = "สั่งซื้อสินค้า";
    document.getElementById('modal-item-name').innerText = prod.name;
    document.getElementById('checkout-price').value = `฿ ${Number(prod.price).toLocaleString()}`;
    document.getElementById('modal-note').innerText = "*ระบบจะเปิด Gmail เพื่อให้คุณแนบรูปสลิปการโอนเงินส่งตรงถึงร้านค้า";
    document.getElementById('checkout-modal').style.display = 'flex';
}

function openSlicerCheckout() {
    if(uploadedFiles.length === 0) return alert("กรุณาเพิ่มไฟล์ STL ก่อนสั่งซื้อครับ");
    const price = document.getElementById('val-price').innerText;
    
    const matObj = CONFIG.materials[document.getElementById('material').value];
    const colorName = matObj.colorNames[selectedColor] || selectedColor;

    currentOrder = { 
        type: 'slicer', 
        name: `พิมพ์ 3D ถาดรวม (${uploadedFiles.length} ชิ้น)`, 
        price: price,
        materialName: matObj.name,
        colorName: colorName,
        infill: document.getElementById('infill').value * 100
    };

    document.getElementById('modal-title').innerText = "สั่งพิมพ์ 3D ถาดนี้";
    document.getElementById('modal-item-name').innerText = `${currentOrder.name}\n[วัสดุ: ${matObj.name} | สี: ${colorName}]`;
    document.getElementById('checkout-price').value = `฿ ${price}`;
    document.getElementById('modal-note').innerText = "📌 สำคัญ: กรุณาแนบไฟล์ STL และรูปสลิปโอนเงินมาในอีเมลด้วยครับ";
    document.getElementById('checkout-modal').style.display = 'flex';
}

function closeModal() { document.getElementById('checkout-modal').style.display = 'none'; }

function sendOrderEmail() {
    const phone = document.getElementById('cust-phone').value;
    const line = document.getElementById('cust-line').value;
    const address = document.getElementById('cust-address').value;

    if(!phone || !address) return alert("กรุณากรอกเบอร์โทรศัพท์และที่อยู่จัดส่งให้ครบถ้วนครับ");

    let mailBody = `รายละเอียดคำสั่งซื้อ (AVALON 3D)\n` +
                   `----------------------------------\n` +
                   `รายการ: ${currentOrder.name}\n`;
    
    if(currentOrder.type === 'slicer') {
        mailBody += `วัสดุที่เลือก: ${currentOrder.materialName}\n`;
        mailBody += `สีที่เลือก: ${currentOrder.colorName}\n`;
        mailBody += `ความหนาแน่น (Infill): ${currentOrder.infill}%\n`;
        mailBody += `\nรายชื่อไฟล์ STL ที่ต้องพิมพ์:\n`;
        uploadedFiles.forEach((f, i) => mailBody += `  ${i+1}. ${f.name} (ขนาด: ${f.size} mm | ปริมาตร: ${f.volume.toFixed(1)} cm³)\n`);
        mailBody += `\n⚠️ คำแนะนำ: กรุณาแนบไฟล์ STL ทั้งหมดตามรายชื่อข้างต้น และ รูปสลิปโอนเงิน มาพร้อมกับอีเมลฉบับนี้\n`;
    }

    mailBody += `\nยอดชำระสุทธิ: ฿${currentOrder.price}\n` +
                `----------------------------------\n` +
                `ข้อมูลการจัดส่ง\n` +
                `เบอร์โทรศัพท์: ${phone}\n` +
                `Line ID: ${line || '-'}\n` +
                `ที่อยู่จัดส่ง: ${address}\n\n` +
                `*** อย่าลืมแนบสลิปโอนเงินและไฟล์งาน STL มาในอีเมลฉบับนี้ครับ ***`;

    const subject = `แจ้งชำระเงิน_${currentOrder.name}`;
    const mailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONFIG.shopEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
    
    if(currentOrder.type === 'slicer') {
        alert("ระบบกำลังเปิด Gmail...\n\nกรุณาอย่าลืมแนบไฟล์ STL และรูปสลิปการโอนเงินลงในอีเมลก่อนกดส่งครับ!");
    }
    
    window.open(mailUrl);
    closeModal();
}

// ================= Hero 3D Interactive Viewer =================
let heroScene, heroCamera, heroRenderer, heroControls, heroMesh;

function initHero3D() {
    const container = document.getElementById('hero-3d-viewer');
    if (!container) return;

    heroScene = new THREE.Scene();

    heroCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    heroCamera.position.set(0, 35, 75);

    heroRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    heroRenderer.setSize(container.clientWidth, container.clientHeight);
    heroRenderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(heroRenderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    heroScene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(50, 100, 50);
    heroScene.add(dirLight);

    heroControls = new THREE.OrbitControls(heroCamera, heroRenderer.domElement);
    heroControls.enableDamping = true;
    heroControls.enableZoom = false;

    // โหลดไฟล์ body1.stl (ตรวจสอบชื่อไฟล์บน GitHub ให้ตรงเป๊ะ)
    const stlLoader = new THREE.STLLoader();
    stlLoader.load('Body1.stl', function (geometry) {
        geometry.center();
        geometry.computeBoundingBox();

        const material = new THREE.MeshPhongMaterial({ 
            color: 0xd44638, 
            shininess: 90, 
            flatShading: true 
        });

        heroMesh = new THREE.Mesh(geometry, material);

        const box = geometry.boundingBox;
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 32 / maxDim;
        heroMesh.scale.set(scale, scale, scale);

        heroScene.add(heroMesh);
    }, undefined, function (error) {
        console.error("ไม่สามารถโหลดไฟล์ STL ในหน้าแรกได้:", error);
    });

    animateHero3D();
}

function animateHero3D() {
    requestAnimationFrame(animateHero3D);
    if (heroMesh) heroMesh.rotation.y += 0.0081;
    if (heroControls) heroControls.update();
    if (heroRenderer) heroRenderer.render(heroScene, heroCamera);
}

// ================= 3D Slicer Engine =================
let scene, camera, renderer, controls, selectedColor = "#111111";
let uploadedFiles = [];

function initThreeJS() {
    const container = document.getElementById('render-area');
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 10000);
    camera.position.set(300, 300, 300);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(200, 500, 300);
    scene.add(light);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    scene.add(new THREE.GridHelper(500, 50, 0x888888, 0xdddddd));

    updateMaterialUI();
    animate();
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const container = document.getElementById('render-area');
    if(!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function setView(view) {
    controls.reset();
    if(view === 'top') camera.position.set(0, 350, 0);
    else if(view === 'front') camera.position.set(0, 0, 350);
    else if(view === 'side') camera.position.set(350, 0, 0);
    else camera.position.set(300, 300, 300);
    controls.update();
}

document.getElementById('file-input').addEventListener('change', function(e) {
    Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const geometry = new THREE.STLLoader().parse(event.target.result);
            geometry.center();
            geometry.computeBoundingBox();

            const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: selectedColor, flatShading: true }));
            const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.1, transparent: true }));
            
            const group = new THREE.Group();
            group.add(mesh); group.add(wire);

            const box = geometry.boundingBox;
            const size = new THREE.Vector3(); box.getSize(size);
            group.position.y = size.y / 2;

            const vol = calculateVolume(geometry) / 1000;
            const fileId = Date.now() + Math.random().toString(36).substr(2, 5);

            uploadedFiles.push({ id: fileId, name: file.name, volume: vol, size: `${Math.round(size.x)}x${Math.round(size.y)}x${Math.round(size.z)}`, group });

            scene.add(group);
            arrangeModels(); renderTrayList(); updatePrice();
        };
        reader.readAsArrayBuffer(file);
    });
    this.value = "";
});

function arrangeModels() {
    let currentX = -((uploadedFiles.length - 1) * 60) / 2; 
    uploadedFiles.forEach(file => { file.group.position.x = currentX; currentX += 80; });
}

function renderTrayList() {
    const container = document.getElementById('tray-list');
    if(uploadedFiles.length === 0) return container.innerHTML = `<div style="text-align:center; color:#999; padding:20px; font-size:0.85rem;">ยังไม่มีชิ้นงานในถาดพิมพ์</div>`;
    container.innerHTML = uploadedFiles.map((f, i) => `
        <div class="tray-item">
            <div><b>${i+1}. ${f.name}</b><br><small>${f.size} mm | ${f.volume.toFixed(1)} cm³</small></div>
            <button class="remove-btn" onclick="removeFile('${f.id}')">&times;</button>
        </div>
    `).join('');
}

function removeFile(id) {
    const idx = uploadedFiles.findIndex(f => f.id === id);
    if(idx > -1) {
        scene.remove(uploadedFiles[idx].group);
        uploadedFiles.splice(idx, 1);
        arrangeModels(); renderTrayList(); updatePrice();
    }
}

function calculateVolume(geo) {
    let vol = 0; const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i += 3) {
        const v1 = new THREE.Vector3().fromBufferAttribute(pos, i);
        const v2 = new THREE.Vector3().fromBufferAttribute(pos, i+1);
        const v3 = new THREE.Vector3().fromBufferAttribute(pos, i+2);
        vol += v1.dot(v2.cross(v3)) / 6.0;
    }
    return Math.abs(vol);
}

function updateMaterialUI() {
    const mat = CONFIG.materials[document.getElementById('material').value];
    const palette = document.getElementById('color-palette');
    palette.innerHTML = "";
    if (!mat.colors.includes(selectedColor)) selectedColor = mat.colors[0];
    mat.colors.forEach(hex => {
        const dot = document.createElement('div');
        dot.style = `width:28px; height:28px; border-radius:50%; background:${hex}; cursor:pointer; border:${selectedColor===hex?'3px solid var(--primary)':'1px solid #ccc'}`;
        dot.onclick = () => { selectedColor = hex; uploadedFiles.forEach(f => f.group.children[0].material.color.set(hex)); updateMaterialUI(); };
        palette.appendChild(dot);
    });
    updatePrice();
}

function updatePrice() {
    const mat = CONFIG.materials[document.getElementById('material').value];
    const infill = parseFloat(document.getElementById('infill').value);
    if(uploadedFiles.length > 0) {
        let totalWeight = 0;
        uploadedFiles.forEach(f => totalWeight += (f.volume * mat.density * (0.2 + (infill * 0.8))) * 1.15);
        
        const totalPrice = (totalWeight * mat.price) + CONFIG.setupFee + CONFIG.shippingFee;
        document.getElementById('val-price').innerText = totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2});
    } else {
        document.getElementById('val-price').innerText = "0.00";
    }
}

function animate() { requestAnimationFrame(animate); if(controls) controls.update(); if(renderer) renderer.render(scene, camera); }

window.addEventListener('DOMContentLoaded', () => {
    if (typeof renderProducts === 'function') renderProducts();
    initHero3D();
});


// ================= 3D Explode View Viewer =================
let explodeScene, explodeCamera, explodeRenderer, explodeControls;
let explodeParts = []; // อาร์เรย์สำหรับเก็บชิ้นส่วนและทิศทางการแยก

function initExplode3D() {
    const container = document.getElementById('explode-3d-viewer');
    if (!container) return;

    explodeScene = new THREE.Scene();

    explodeCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    explodeCamera.position.set(100, 100, 150);

    explodeRenderer = new THREE.WebGLRenderer({ antialias: true });
    explodeRenderer.setSize(container.clientWidth, container.clientHeight);
    explodeRenderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(explodeRenderer.domElement);

    // แสงสว่าง
    explodeScene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(100, 200, 100);
    explodeScene.add(dirLight);

    explodeControls = new THREE.OrbitControls(explodeCamera, explodeRenderer.domElement);
    explodeControls.enableDamping = true;

    // ตัวอย่าง: กำหนดรายชื่อไฟล์ชิ้นส่วน และทิศทางที่จะให้ยืดแยกออกมา (Vector X, Y, Z)
    const partsConfig = [
    // แก้ไขทิศทาง Vector (dir) ให้ถูกต้องตามชิ้นงานจริง
const partsConfig = [
    { 
        file: '3dmodel/Stepper.stl.stl', // ชิ้นมอเตอร์ (สีส้ม)
        color: 0xff5533, 
        dir: new THREE.Vector3(0, 0, 0) // มอเตอร์ให้อยู่กับที่ ไม่ต้องขยับ
    }, 
    { 
        file: '3dmodel/rotor_out.stl', // ชิ้นเกียร์บ็อกซ์ (สีฟ้า)
        color: 0x0066ff, 
        dir: new THREE.Vector3(0, 1, 0) // เลื่อนขึ้นด้านบนตามแกน Y (ถ้าเลื่อนลงให้เปลี่ยนเป็น -1)
    }

    ];

    const loader = new THREE.STLLoader();

    partsConfig.forEach(p => {
     loader.load(p.file, function (geometry) {
    // ไม่ใส่ geometry.center() เพื่อให้ใช้พิกัดอ้างอิงตรงจาก Fusion 360
    
    const material = new THREE.MeshPhongMaterial({ color: p.color, flatShading: true });
    const mesh = new THREE.Mesh(geometry, material);

    const partObj = {
        mesh: mesh,
        basePos: mesh.position.clone(),
        direction: p.dir
    };

    explodeParts.push(partObj);
    explodeScene.add(mesh);
});
    });

    animateExplode3D();
}

// ฟังก์ชันปรับระยะแยกชิ้นส่วนตามค่า Slider (0 - 100)
function updateExplodeView(val) {
    const factor = parseFloat(val) * 0.8; // ปรับตัวคูณความกว้างในการแยก
    explodeParts.forEach(p => {
        p.mesh.position.x = p.basePos.x + (p.direction.x * factor);
        p.mesh.position.y = p.basePos.y + (p.direction.y * factor);
        p.mesh.position.z = p.basePos.z + (p.direction.z * factor);
    });
}

function animateExplode3D() {
    requestAnimationFrame(animateExplode3D);
    if (explodeControls) explodeControls.update();
    if (explodeRenderer) explodeRenderer.render(explodeScene, explodeCamera);
}

// โหลดระบบ Explode View เมื่อเริ่มเปิดหน้าเว็บ
window.addEventListener('DOMContentLoaded', () => {
    initExplode3D();
});
