/**
 * Three.js 3D Visual Engine for Kafi Nur Hikmah Portfolio
 * Includes:
 * 1. 3D Holographic Preloader Animation (Gyroscopic Crystal & Energy Vortex)
 * 2. 3D Interactive Hero Background (Constellation & Floating Polyhedra with Mouse Parallax)
 */

(function () {
  'use strict';

  // Check WebGL Support
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  /* ==========================================================================
     1. 3D HOLOGRAPHIC PRELOADER SCENE
     ========================================================================== */
  class Preloader3D {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container || !window.THREE || !isWebGLAvailable()) {
        this.fallback = true;
        return;
      }

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.animId = null;
      this.coreMesh = null;
      this.wireMesh = null;
      this.innerCore = null;
      this.rings = [];
      this.particles = null;
      this.progress = 0;
      this.targetProgress = 0;
      this.isExiting = false;

      this.init();
    }

    init() {
      const width = this.container.clientWidth || 280;
      const height = this.container.clientHeight || 280;

      // Scene
      this.scene = new THREE.Scene();

      // Camera
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      this.camera.position.z = 6.2;

      // Renderer
      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.container.appendChild(this.renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      this.scene.add(ambientLight);

      const cyanPoint = new THREE.PointLight(0x38bdf8, 3, 20);
      cyanPoint.position.set(4, 4, 4);
      this.scene.add(cyanPoint);

      const purplePoint = new THREE.PointLight(0xa855f7, 2.5, 20);
      purplePoint.position.set(-4, -4, 3);
      this.scene.add(purplePoint);

      // 1. Central Faceted Crystal (Icosahedron)
      const coreGeo = new THREE.IcosahedronGeometry(1.25, 0);
      const coreMat = new THREE.MeshPhongMaterial({
        color: 0x050d24,
        emissive: 0x0c4a6e,
        shininess: 90,
        transparent: true,
        opacity: 0.85,
        flatShading: true,
      });
      this.coreMesh = new THREE.Mesh(coreGeo, coreMat);
      this.scene.add(this.coreMesh);

      // 2. Wireframe Lattice around Crystal
      const wireGeo = new THREE.IcosahedronGeometry(1.27, 0);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.95,
      });
      this.wireMesh = new THREE.Mesh(wireGeo, wireMat);
      this.scene.add(this.wireMesh);

      // 3. Glowing Inner Energy Seed
      const innerGeo = new THREE.OctahedronGeometry(0.55, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x818cf8,
        wireframe: true,
      });
      this.innerCore = new THREE.Mesh(innerGeo, innerMat);
      this.scene.add(this.innerCore);

      // 4. Orbiting Gyroscopic Rings
      const ringConfigs = [
        { radius: 1.85, tube: 0.022, color: 0x38bdf8, rotX: 0.6, rotY: 0.3 },
        { radius: 2.15, tube: 0.018, color: 0x818cf8, rotX: -0.4, rotY: 0.8 },
        { radius: 2.45, tube: 0.015, color: 0x06b6d4, rotX: 1.2, rotY: -0.5 },
      ];

      ringConfigs.forEach((cfg) => {
        const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: cfg.color,
          transparent: true,
          opacity: 0.7,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = cfg.rotX;
        ringMesh.rotation.y = cfg.rotY;
        this.scene.add(ringMesh);
        this.rings.push({
          mesh: ringMesh,
          speedX: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
          speedY: (Math.random() * 0.025 + 0.015) * (Math.random() > 0.5 ? 1 : -1),
        });
      });

      // 5. Orbiting Energy Particles
      const particleCount = 120;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const radius = 2.0 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        scales[i] = Math.random() * 0.05 + 0.02;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.06,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      this.particles = new THREE.Points(particleGeo, particleMat);
      this.scene.add(this.particles);

      // Resize Listener
      window.addEventListener('resize', this.onResize.bind(this));

      // Start Render Loop
      this.animate();
    }

    onResize() {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth || 280;
      const height = this.container.clientHeight || 280;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    updateProgress(percent) {
      this.targetProgress = Math.max(0, Math.min(100, percent));
    }

    animate() {
      if (this.isDestroyed) return;
      this.animId = requestAnimationFrame(this.animate.bind(this));

      // Smooth progress interpolation
      this.progress += (this.targetProgress - this.progress) * 0.15;
      const ratio = this.progress / 100;

      // Speed multipliers respond to progress
      const baseSpeed = 0.012 + ratio * 0.035;

      // Rotate central crystal
      if (this.coreMesh && this.wireMesh) {
        this.coreMesh.rotation.y += baseSpeed;
        this.coreMesh.rotation.x += baseSpeed * 0.6;
        this.wireMesh.rotation.y = this.coreMesh.rotation.y;
        this.wireMesh.rotation.x = this.coreMesh.rotation.x;

        // Subtle pulsing scale based on progress
        const scalePulse = 1 + Math.sin(Date.now() * 0.005) * 0.04 + ratio * 0.15;
        this.coreMesh.scale.set(scalePulse, scalePulse, scalePulse);
        this.wireMesh.scale.set(scalePulse, scalePulse, scalePulse);
      }

      // Rotate inner core in opposite direction
      if (this.innerCore) {
        this.innerCore.rotation.y -= baseSpeed * 1.6;
        this.innerCore.rotation.z += baseSpeed * 1.2;
      }

      // Spin gyroscopic rings
      this.rings.forEach((ring, idx) => {
        const ringSpeedMultiplier = 1 + ratio * 2.2;
        ring.mesh.rotation.x += ring.speedX * ringSpeedMultiplier;
        ring.mesh.rotation.y += ring.speedY * ringSpeedMultiplier;
        ring.mesh.rotation.z += 0.005 * (idx + 1);
      });

      // Swirl particles
      if (this.particles) {
        this.particles.rotation.y += 0.008 + ratio * 0.02;
        this.particles.rotation.x += 0.004;
      }

      this.renderer.render(this.scene, this.camera);
    }

    triggerExit(onComplete) {
      this.isExiting = true;
      const startTime = performance.now();
      const exitDuration = 450; // ms

      const exitStep = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / exitDuration, 1);
        const ease = t * t * t; // Ease in cubic for hyperdrive warp

        if (this.coreMesh && this.wireMesh) {
          const warpScale = 1 + ease * 2.5;
          this.coreMesh.scale.set(warpScale, warpScale, warpScale);
          this.wireMesh.scale.set(warpScale, warpScale, warpScale);
          this.coreMesh.material.opacity = 1 - ease;
          this.wireMesh.material.opacity = 1 - ease;
        }

        if (this.particles) {
          this.particles.scale.set(1 + ease * 3, 1 + ease * 3, 1 + ease * 3);
          this.particles.material.opacity = 1 - ease;
        }

        this.rings.forEach((ring) => {
          ring.mesh.scale.set(1 + ease * 3, 1 + ease * 3, 1 + ease * 3);
          ring.mesh.material.opacity = Math.max(0, 0.7 * (1 - ease));
        });

        if (t < 1) {
          requestAnimationFrame(exitStep);
        } else {
          if (typeof onComplete === 'function') onComplete();
          this.destroy();
        }
      };

      requestAnimationFrame(exitStep);
    }

    destroy() {
      this.isDestroyed = true;
      if (this.animId) cancelAnimationFrame(this.animId);
      window.removeEventListener('resize', this.onResize.bind(this));

      if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      if (this.renderer) {
        this.renderer.dispose();
      }
    }
  }

  /* ==========================================================================
     2. 3D INTERACTIVE HERO BACKGROUND (Constellation & Floating Polyhedra)
     ========================================================================== */
  class Hero3DScene {
    constructor(canvasContainerId) {
      this.container = document.getElementById(canvasContainerId);
      if (!this.container || !window.THREE || !isWebGLAvailable()) {
        return;
      }

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.animId = null;
      this.floatingObjects = [];
      this.particleSystem = null;
      this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.isVisible = true;

      this.init();
    }

    init() {
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;

      // Scene
      this.scene = new THREE.Scene();

      // Camera
      this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      this.camera.position.z = 24;

      // Renderer with high performance settings
      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      this.container.appendChild(this.renderer.domElement);

      // Ambient & Directional Lights
      const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
      this.scene.add(ambientLight);

      const cyanLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
      cyanLight.position.set(10, 15, 10);
      this.scene.add(cyanLight);

      const purpleLight = new THREE.DirectionalLight(0xa855f7, 1.8);
      purpleLight.position.set(-10, -10, 8);
      this.scene.add(purpleLight);

      // 1. Interactive 3D Floating Polyhedra (Tetrahedron, Octahedron, Icosahedron, Torus)
      const geometries = [
        new THREE.IcosahedronGeometry(1.8, 0),
        new THREE.OctahedronGeometry(1.4, 0),
        new THREE.TetrahedronGeometry(1.5, 0),
        new THREE.TorusGeometry(1.6, 0.25, 12, 32),
        new THREE.DodecahedronGeometry(1.3, 0),
      ];

      const materialWireframeCyan = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });

      const materialWireframePurple = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });

      const materialGlass = new THREE.MeshPhongMaterial({
        color: 0x0b1120,
        emissive: 0x0284c7,
        shininess: 100,
        transparent: true,
        opacity: 0.25,
        flatShading: true,
      });

      // Define 7 floating geometric anchors spread across 3D space
      const spawnPoints = [
        { x: -14, y: 7, z: -4, geo: 0, mat: materialWireframeCyan, rotSpeed: [0.005, 0.007, 0.003] },
        { x: 13, y: 8, z: -6, geo: 3, mat: materialWireframePurple, rotSpeed: [-0.006, 0.008, 0.004] },
        { x: -16, y: -7, z: -2, geo: 1, mat: materialGlass, rotSpeed: [0.007, -0.005, 0.006] },
        { x: 15, y: -6, z: -5, geo: 4, mat: materialWireframeCyan, rotSpeed: [-0.004, -0.006, 0.008] },
        { x: 8, y: 2, z: -10, geo: 2, mat: materialWireframePurple, rotSpeed: [0.006, 0.004, -0.005] },
        { x: -6, y: 9, z: -12, geo: 0, mat: materialGlass, rotSpeed: [0.004, 0.007, 0.003] },
        { x: 2, y: -10, z: -8, geo: 1, mat: materialWireframeCyan, rotSpeed: [-0.005, 0.005, -0.004] },
      ];

      spawnPoints.forEach((pt) => {
        const mesh = new THREE.Mesh(geometries[pt.geo], pt.mat);
        mesh.position.set(pt.x, pt.y, pt.z);
        this.scene.add(mesh);
        this.floatingObjects.push({
          mesh: mesh,
          initPos: { x: pt.x, y: pt.y, z: pt.z },
          rotSpeed: pt.rotSpeed,
          floatOffset: Math.random() * Math.PI * 2,
        });
      });

      // 2. 3D Constellation Particle Field
      const particleCount = 200;
      const particleGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 50;
        posArray[i + 1] = (Math.random() - 0.5) * 40;
        posArray[i + 2] = (Math.random() - 0.5) * 30;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.12,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
      });

      this.particleSystem = new THREE.Points(particleGeo, particleMaterial);
      this.scene.add(this.particleSystem);

      // Event Listeners for Parallax & Responsiveness
      window.addEventListener('mousemove', this.onMouseMove.bind(this), { passive: true });
      window.addEventListener('resize', this.onResize.bind(this));

      // Scroll / Visibility optimization
      this.setupVisibilityObserver();

      // Start Loop
      this.animate();
    }

    onMouseMove(e) {
      // Normalize mouse coords (-1 to 1)
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    onResize() {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    setupVisibilityObserver() {
      // Pause 3D animation when scrolled past hero section to preserve GPU/battery
      const heroSection = document.getElementById('home');
      if (!heroSection || !('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.isVisible = entry.isIntersecting;
          });
        },
        { threshold: 0.05 }
      );

      observer.observe(heroSection);

      // Pause when browser tab is inactive
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.isVisible = false;
        } else {
          this.isVisible = true;
        }
      });
    }

    animate() {
      this.animId = requestAnimationFrame(this.animate.bind(this));

      if (!this.isVisible) return; // Skip frame calculation if not in view

      // Smooth camera parallax damping
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.045;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.045;

      this.camera.position.x = this.mouse.x * 2.5;
      this.camera.position.y = this.mouse.y * 2.0;
      this.camera.lookAt(0, 0, 0);

      const time = performance.now() * 0.001;

      // Animate floating objects
      this.floatingObjects.forEach((item) => {
        // Rotation
        item.mesh.rotation.x += item.rotSpeed[0];
        item.mesh.rotation.y += item.rotSpeed[1];
        item.mesh.rotation.z += item.rotSpeed[2];

        // Gentle floating wave
        item.mesh.position.y = item.initPos.y + Math.sin(time + item.floatOffset) * 0.65;
        item.mesh.position.x = item.initPos.x + Math.cos(time * 0.7 + item.floatOffset) * 0.35;
      });

      // Subtle rotation of particle constellation
      if (this.particleSystem) {
        this.particleSystem.rotation.y = time * 0.02;
        this.particleSystem.rotation.x = time * 0.01;
      }

      this.renderer.render(this.scene, this.camera);
    }
  }

  /* ==========================================================================
     GLOBAL EXPORT FOR MAIN.JS
     ========================================================================== */
  window.Portfolio3D = {
    preloaderInstance: null,
    heroSceneInstance: null,

    initPreloader: function (containerId) {
      if (!this.preloaderInstance) {
        this.preloaderInstance = new Preloader3D(containerId);
      }
      return this.preloaderInstance;
    },

    updatePreloaderProgress: function (percent) {
      if (this.preloaderInstance) {
        this.preloaderInstance.updateProgress(percent);
      }
    },

    triggerPreloaderExit: function (onComplete) {
      if (this.preloaderInstance && !this.preloaderInstance.fallback) {
        this.preloaderInstance.triggerExit(onComplete);
      } else {
        if (typeof onComplete === 'function') onComplete();
      }
    },

    initHeroBackground: function (containerId) {
      if (!this.heroSceneInstance) {
        this.heroSceneInstance = new Hero3DScene(containerId);
      }
      return this.heroSceneInstance;
    },
  };
})();
