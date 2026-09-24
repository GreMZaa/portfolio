/**
 * Interactive Demos & Simulators for Portfolio
 * Author: Sergey (GreMZaa)
 */

// --- 1. Ambient Background Particle Matrix ---
export function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  const count = Math.min(Math.floor((width * height) / 18000), 75);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse influence
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        p.x -= (dx / dist) * 1.5;
        p.y -= (dy / dist) * 1.5;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
      ctx.fill();

      // Lines between close particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let d = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - d / 120)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();
}

// --- 2. Interactive Telegram Mini App Simulator ---
export function initTmaSimulator() {
  const categories = {
    lunches: [
      { id: 1, name: 'Лосось на пару с киноа', price: 620, cal: '480 ккал' },
      { id: 2, name: 'Индейка су-вид с брокколи', price: 540, cal: '420 ккал' },
      { id: 3, name: 'Стейк тунца с овощами гриль', price: 710, cal: '510 ккал' }
    ],
    bowls: [
      { id: 4, name: 'Поке с тигровыми креветками', price: 590, cal: '440 ккал' },
      { id: 5, name: 'Авокадо-боул с эдамаме', price: 480, cal: '390 ккал' }
    ],
    drinks: [
      { id: 6, name: 'Матча с кокосовым молоком', price: 290, cal: '110 ккал' },
      { id: 7, name: 'Детокс-смузи Спирулина & Яблоко', price: 320, cal: '140 ккал' }
    ]
  };

  let currentCategory = 'lunches';
  let cart = [];

  const listContainer = document.getElementById('tma-items-container');
  const catButtons = document.querySelectorAll('.tma-cat-pill');
  const cartCountEl = document.getElementById('tma-cart-count');
  const cartTotalEl = document.getElementById('tma-cart-total');
  const orderBtn = document.getElementById('tma-order-btn');

  function renderItems() {
    if (!listContainer) return;
    listContainer.innerHTML = '';
    const items = categories[currentCategory] || [];
    items.forEach(item => {
      const inCart = cart.filter(c => c.id === item.id).length;
      const card = document.createElement('div');
      card.className = 'tma-item-card';
      card.innerHTML = `
        <div class="tma-item-info">
          <h5>${item.name}</h5>
          <span>${item.price} ₽ • <small style="color:var(--text-dim)">${item.cal}</small></span>
        </div>
        <button class="tma-add-btn" data-id="${item.id}">
          ${inCart > 0 ? `+ Еще (${inCart})` : '+ В корзину'}
        </button>
      `;
      listContainer.appendChild(card);
    });

    listContainer.querySelectorAll('.tma-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const item = Object.values(categories).flat().find(x => x.id === id);
        if (item) {
          cart.push(item);
          updateCartUI();
          renderItems();
        }
      });
    });
  }

  function updateCartUI() {
    const total = cart.reduce((acc, curr) => acc + curr.price, 0);
    if (cartCountEl) cartCountEl.textContent = `${cart.length} шт.`;
    if (cartTotalEl) cartTotalEl.textContent = `${total} ₽`;
  }

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat;
      renderItems();
    });
  });

  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        window.showToast('Добавьте блюдо в корзину для симуляции заказа!');
        return;
      }
      const total = cart.reduce((acc, curr) => acc + curr.price, 0);
      window.showToast(`✓ TMA WebApp: Заказ на ${total} ₽ отправлен в Telegram Bot!`);
      cart = [];
      updateCartUI();
      renderItems();
    });
  }

  renderItems();
}

// --- 3. Interactive Warehouse & Logistics CRM Simulator ---
export function initCrmSimulator() {
  const inputEl = document.getElementById('crm-track-input');
  const btnGen = document.getElementById('crm-btn-generate');
  const btnTrack = document.getElementById('crm-btn-track');
  const barcodeText = document.getElementById('crm-barcode-text');
  const barcodeLines = document.getElementById('crm-barcode-lines');
  const statusBadge = document.getElementById('crm-status-badge');
  const steps = document.querySelectorAll('.crm-step');

  const randomTracks = [
    'CDEK-7749102-MSK',
    'CDEK-8812903-SPB',
    'WB-9941031-KZN',
    'TMA-5510928-EKB'
  ];

  function generateBarcode(code) {
    if (!barcodeLines) return;
    barcodeLines.innerHTML = '';
    // Generate simulated barcode pattern from string
    const len = code.length;
    for (let i = 0; i < 38; i++) {
      const line = document.createElement('div');
      const mod = (code.charCodeAt(i % len) + i * 3) % 4;
      line.className = `barcode-line w-${mod === 0 ? 1 : mod}`;
      barcodeLines.appendChild(line);
    }
    if (barcodeText) barcodeText.textContent = code;
  }

  function simulateTracking(code) {
    generateBarcode(code);
    const stepCount = steps.length;
    steps.forEach((step, idx) => {
      step.classList.remove('done', 'active');
      if (idx < 2) step.classList.add('done');
      else if (idx === 2) step.classList.add('active');
    });

    if (statusBadge) {
      statusBadge.textContent = 'В сортировочном центре (ПВЗ #412)';
      statusBadge.style.color = 'var(--neon-cyan)';
    }
  }

  if (btnGen) {
    btnGen.addEventListener('click', () => {
      const rand = randomTracks[Math.floor(Math.random() * randomTracks.length)];
      if (inputEl) inputEl.value = rand;
      simulateTracking(rand);
      window.showToast(`Создана тестовая накладная: ${rand}`);
    });
  }

  if (btnTrack) {
    btnTrack.addEventListener('click', () => {
      const val = inputEl ? inputEl.value.trim() : '';
      if (!val) {
        window.showToast('Введите или сгенерируйте трек-номер!');
        return;
      }
      simulateTracking(val);
      window.showToast(`Синхронизировано со складом: ${val}`);
    });
  }

  // Initial barcode
  generateBarcode('CDEK-7749102-MSK');
}

// --- 4. Interactive 3D WebGL / Canvas Playground ---
export function init3DCanvasDemo() {
  const canvas = document.getElementById('three-canvas-demo');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // 3D Wireframe Polyhedron vertices
  const nodes = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
    [0, -1.6, 0], [0, 1.6, 0], [-1.6, 0, 0], [1.6, 0, 0],
    [0, 0, -1.6], [0, 0, 1.6]
  ];

  const edges = [
    [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7],
    [8,0],[8,1],[8,4],[8,5],
    [9,2],[9,3],[9,6],[9,7],
    [10,0],[10,3],[10,4],[10,7],
    [11,1],[11,2],[11,5],[11,6],
    [12,0],[12,1],[12,2],[12,3],
    [13,4],[13,5],[13,6],[13,7]
  ];

  let rotX = 0.01;
  let rotY = 0.015;
  let angleX = 0;
  let angleY = 0;
  let isDragging = false;
  let lastMouse = { x: 0, y: 0 };

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouse = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => isDragging = false);

  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      angleY += dx * 0.01;
      angleX += dy * 0.01;
      lastMouse = { x: e.clientX, y: e.clientY };
    }
  });

  function rotateX(p, theta) {
    const sin = Math.sin(theta);
    const cos = Math.cos(theta);
    return [p[0], p[1] * cos - p[2] * sin, p[1] * sin + p[2] * cos];
  }

  function rotateY(p, theta) {
    const sin = Math.sin(theta);
    const cos = Math.cos(theta);
    return [p[0] * cos + p[2] * sin, p[1], -p[0] * sin + p[2] * cos];
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    if (!isDragging) {
      angleX += rotX;
      angleY += rotY;
    }

    const scale = Math.min(width, height) * 0.24;
    const center = [width / 2, height / 2];

    const projected = nodes.map(n => {
      let r = rotateX(n, angleX);
      r = rotateY(r, angleY);
      const distance = 3.5;
      const z = 1 / (distance - r[2]);
      return [r[0] * z * scale + center[0], r[1] * z * scale + center[1], r[2]];
    });

    // Draw Edges
    for (let edge of edges) {
      const p1 = projected[edge[0]];
      const p2 = projected[edge[1]];
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      const alpha = Math.max(0.15, Math.min(0.85, (p1[2] + p2[2] + 2) / 4));
      ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    // Draw Nodes
    projected.forEach((p, idx) => {
      ctx.beginPath();
      ctx.arc(p[0], p[1], 3.5, 0, Math.PI * 2);
      ctx.fillStyle = idx >= 8 ? '#ff007f' : '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f0ff';
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// --- 5. Interactive Project Estimator / Calculator ---
export function initProjectCalculator() {
  const typeBtns = document.querySelectorAll('[data-calc-type]');
  const featureBtns = document.querySelectorAll('[data-calc-feature]');
  const totalValEl = document.getElementById('calc-total-display');
  const timeValEl = document.getElementById('calc-time-display');
  const stackValEl = document.getElementById('calc-stack-display');
  const sendTelegramBtn = document.getElementById('calc-telegram-btn');

  let selectedType = 'tma';
  let selectedFeatures = new Set(['payments']);

  const typeConfig = {
    tma: { name: 'Telegram Mini App (TMA)', basePrice: 45000, baseDays: 7, stack: 'React 18 + TS + Telegram SDK + Supabase' },
    bot: { name: 'AI Telegram / VK Bot', basePrice: 35000, baseDays: 5, stack: 'Node.js / Python + Grammy + LLM (Cohere / GPT)' },
    fullstack: { name: 'Full-Stack CRM / E-Commerce', basePrice: 75000, baseDays: 14, stack: 'Next.js / Vite + PostgreSQL + 1C / API Integrations' },
    web3d: { name: '3D WebGL / Промо-сайт', basePrice: 50000, baseDays: 10, stack: 'Three.js + GSAP + Vite + Responsive Canvas' }
  };

  const featureConfig = {
    payments: { name: 'Платежи (ЮKassa / Telegram Pay / СБП)', price: 15000, days: 2 },
    admin: { name: 'Админ-панель управления заказами', price: 20000, days: 3 },
    sync1c: { name: 'Интеграция с 1С / СДЭК / МойСклад', price: 25000, days: 4 },
    aiassistant: { name: 'AI-ассистент / Консультант', price: 18000, days: 3 }
  };

  function updateEstimate() {
    const typeInfo = typeConfig[selectedType];
    let totalPrice = typeInfo.basePrice;
    let totalDays = typeInfo.baseDays;

    selectedFeatures.forEach(featKey => {
      const feat = featureConfig[featKey];
      if (feat) {
        totalPrice += feat.price;
        totalDays += feat.days;
      }
    });

    if (totalValEl) totalValEl.textContent = `от ${totalPrice.toLocaleString('ru-RU')} ₽`;
    if (timeValEl) timeValEl.textContent = `Срок реализации: ~${totalDays} рабочих дней`;
    if (stackValEl) stackValEl.textContent = typeInfo.stack;

    if (sendTelegramBtn) {
      const featNames = Array.from(selectedFeatures).map(f => featureConfig[f]?.name).filter(Boolean).join(', ');
      const text = encodeURIComponent(
        `Привет! Хочу обсудить проект:\n• Тип: ${typeInfo.name}\n• Опции: ${featNames || 'Базовый комплект'}\n• Оценка: от ${totalPrice.toLocaleString('ru-RU')} ₽ (~${totalDays} дн.)`
      );
      sendTelegramBtn.href = `https://t.me/gremzaa?text=${text}`;
    }
  }

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedType = btn.dataset.calcType;
      updateEstimate();
    });
  });

  featureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.calcFeature;
      if (selectedFeatures.has(key)) {
        selectedFeatures.delete(key);
        btn.classList.remove('selected');
      } else {
        selectedFeatures.add(key);
        btn.classList.add('selected');
      }
      updateEstimate();
    });
  });

  updateEstimate();
}
