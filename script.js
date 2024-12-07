let scene, camera, renderer, planets = {};


const planetData = {
    sun: { size: 109, texture: 'yellow', position: 0 },
    mercury: { size: 0.383, texture: '#A0522D', position: 3 },
    venus: { size: 0.949, texture: '#DEB887', position: 5.5 },
    earth: { size: 1, texture: '#4B0082', position: 7.6 },
    mars: { size: 0.532, texture: '#CD5C5C', position: 11.6 },
    jupiter: { size: 11.21, texture: '#DAA520', position: 39.7 },
    saturn: { size: 9.45, texture: '#F4A460', position: 72.8 },
    uranus: { size: 4.01, texture: '#87CEEB', position: 146.4 },
    neptune: { size: 3.88, texture: '#1E90FF', position: 229.7 }
};

function init() {

    scene = new THREE.Scene();


    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

 
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#galaxy'),
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);


    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);


    const pointLight = new THREE.PointLight(0xffffff, 2);
    scene.add(pointLight);

   
    Object.entries(planetData).forEach(([name, data]) => {
        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshPhongMaterial({ 
            color: data.texture,
            shininess: 30
        });
        const planet = new THREE.Mesh(geometry, material);
        planet.position.x = data.position * 2; 
        planets[name] = planet;
        scene.add(planet);
    });

    addStars();

 
    animate();
}

function addStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.1
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

function animate() {
    requestAnimationFrame(animate);

  
    Object.values(planets).forEach(planet => {
        planet.rotation.y += 0.01;
    });

  
    camera.position.x = Math.sin(Date.now() * 0.0001) * 100;
    camera.position.z = Math.cos(Date.now() * 0.0001) * 100;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


init();