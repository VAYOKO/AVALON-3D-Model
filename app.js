// ================= Hero 3D Interactive Viewer =================
let heroScene, heroCamera, heroRenderer, heroControls, heroMesh;

function initHero3D() {
    const container = document.getElementById('hero-3d-viewer');
    if (!container) return;

    heroScene = new THREE.Scene();

    heroCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    heroCamera.position.set(0, 40, 80);

    heroRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true เพื่อให้พื้นหลังใส
    heroRenderer.setSize(container.clientWidth, container.clientHeight);
    heroRenderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(heroRenderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    heroScene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(50, 100, 50);
    heroScene.add(dirLight);

    // Orbit Controls
    heroControls = new THREE.OrbitControls(heroCamera, heroRenderer.domElement);
    heroControls.enableDamping = true;
    heroControls.enableZoom = false; // ปิด zoom เพื่อไม่ให้กวนการ scroll หน้าเว็บ

    // ตัวอย่าง: สร้างชิ้นงานจำลอง 3D Geometric (หรือใช้ STLLoader เพื่อโหลดไฟล์ .stl จริงของคุณได้)
    const geometry = new THREE.TorusKnotGeometry(14, 4.5, 120, 16);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0xd44638, 
        shininess: 90, 
        flatShading: true 
    });
    
    heroMesh = new THREE.Mesh(geometry, material);
    heroScene.add(heroMesh);

    /* 
    // หมายเหตุ: หากต้องการใช้ไฟล์ .stl จริงในหน้าแรก ให้ใช้โค้ดชุดนี้แทน:
    new THREE.STLLoader().load('ball_beam.stl', function(geometry) {
        geometry.center();
        const mat = new THREE.MeshPhongMaterial({ color: 0xd44638, flatShading: true });
        heroMesh = new THREE.Mesh(geometry, mat);
        heroScene.add(heroMesh);
    });
    */

    animateHero3D();
}

function animateHero3D() {
    requestAnimationFrame(animateHero3D);
    if (heroMesh) {
        heroMesh.rotation.y += 0.008; // หมุนหมุนวนอัตโนมัติช้าๆ
    }
    if (heroControls) heroControls.update();
    if (heroRenderer) heroRenderer.render(heroScene, heroCamera);
}

// โหลด Hero 3D ทันทีเมื่อเปิดเว็บ
window.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initHero3D();
});
