/**
 * Interactive Demos & Simulators for Portfolio
 * Sergey Sharonov — Operator-Turned-Builder
 */

// --- 1. Симулятор Telegram Mini App для доставки ---
export function initTmaSimulator() {
  const categories = {
    lunches: [
      { id: 1, name: 'Лосось на гриле с киноа', price: 620, desc: 'Без комиссии агрегатора' },
      { id: 2, name: 'Филе индейки с овощами', price: 540, desc: 'Прямо на кухню' },
      { id: 3, name: 'Стейк тунца с брокколи', price: 710, desc: 'База гостей у заведения' }
    ],
    bowls: [
      { id: 4, name: 'Поке с тигровыми креветками', price: 590, desc: 'Быстрый чекаут' },
      { id: 5, name: 'Авокадо-боул со злаками', price: 480, desc: 'Повторный заказ в 1 клик' }
    ],
    drinks: [
      { id: 6, name: 'Матча на кокосовом молоке', price: 290, desc: 'Чек без наценки сервисов' },
      { id: 7, name: 'Детокс-смузи яблоко-шпинат', price: 320, desc: 'Чекаут за 30 секунд' }
    ]
  };

  let currentCategory = 'lunches';
  let cart = [];

  const listContainer = document.getElementById('tma-items-container');
  const catButtons = document.querySelectorAll('.tma-cat-btn-light');
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
      card.className = 'tma-item-row-light';
      card.innerHTML = `
        <div>
          <div style="font-weight:700; font-size:0.86rem; margin-bottom:2px;">${item.name}</div>
          <div style="font-size:0.75rem; color:var(--color-muted);">${item.desc}</div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-weight:700; font-size:0.85rem; color:var(--cobalt-blue);">${item.price} ₽</span>
          <button class="btn btn-black" style="padding:4px 10px; font-size:0.75rem; border-radius:6px;" data-id="${item.id}">
            ${inCart > 0 ? `+ (${inCart})` : '+'}
          </button>
        </div>
      `;
      listContainer.appendChild(card);
    });

    listContainer.querySelectorAll('button[data-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
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
    if (cartTotalEl) cartTotalEl.textContent = `${total.toLocaleString('ru-RU')} ₽`;
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
        window.showToast('Добавьте позицию в корзину для проверки заказа');
        return;
      }
      const total = cart.reduce((acc, curr) => acc + curr.price, 0);
      const savedFee = Math.round(total * 0.25);
      window.showToast(`Заказ на ${total.toLocaleString('ru-RU')} ₽ оформлен! Сэкономлено на комиссии агрегатора: ~${savedFee} ₽`);
      cart = [];
      updateCartUI();
      renderItems();
    });
  }

  renderItems();
}

// --- 2. Симулятор складской маркировки и трекинга ---
export function initCrmSimulator() {
  const inputEl = document.getElementById('crm-track-input');
  const btnGen = document.getElementById('crm-btn-generate');
  const btnTrack = document.getElementById('crm-btn-track');
  const barcodeText = document.getElementById('crm-barcode-text');
  const barcodeLines = document.getElementById('crm-barcode-lines');
  const statusBadge = document.getElementById('crm-status-badge');

  const randomTracks = [
    'WH-7749102-MSK',
    'CDEK-8812903-SPB',
    'STORE-9941031-KZN',
    'ORD-5510928-SAM'
  ];

  function generateBarcode(code) {
    if (!barcodeLines) return;
    barcodeLines.innerHTML = '';
    const len = code.length;
    for (let i = 0; i < 36; i++) {
      const line = document.createElement('div');
      const mod = (code.charCodeAt(i % len) + i * 5) % 4;
      line.style.background = '#18181B';
      line.style.height = '100%';
      line.style.width = `${mod === 0 ? 1 : mod * 1.6}px`;
      barcodeLines.appendChild(line);
    }
    if (barcodeText) barcodeText.textContent = code;
  }

  if (btnGen) {
    btnGen.addEventListener('click', () => {
      const rand = randomTracks[Math.floor(Math.random() * randomTracks.length)];
      if (inputEl) inputEl.value = rand;
      generateBarcode(rand);
      if (statusBadge) statusBadge.textContent = 'Накладная сформирована';
      window.showToast(`Создана накладная: ${rand}`);
    });
  }

  if (btnTrack) {
    btnTrack.addEventListener('click', () => {
      const val = inputEl ? inputEl.value.trim() : '';
      if (!val) {
        window.showToast('Введите номер отправления');
        return;
      }
      generateBarcode(val);
      if (statusBadge) statusBadge.textContent = 'Синхронизировано со складом';
      window.showToast(`Данные отправления обновлены: ${val}`);
    });
  }

  generateBarcode('WH-7749102-MSK');
}

// --- 3. Интерактивная 3D визуализация ---
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

  let angleX = 0.2;
  let angleY = 0.4;
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
      angleY += dx * 0.008;
      angleX += dy * 0.008;
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
      angleX += 0.005;
      angleY += 0.008;
    }

    const scale = Math.min(width, height) * 0.22;
    const center = [width / 2, height / 2];

    const projected = nodes.map(n => {
      let r = rotateX(n, angleX);
      r = rotateY(r, angleY);
      const distance = 3.6;
      const z = 1 / (distance - r[2]);
      return [r[0] * z * scale + center[0], r[1] * z * scale + center[1], r[2]];
    });

    for (let edge of edges) {
      const p1 = projected[edge[0]];
      const p2 = projected[edge[1]];
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      const alpha = Math.max(0.15, Math.min(0.7, (p1[2] + p2[2] + 2) / 4));
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    projected.forEach((p, idx) => {
      ctx.beginPath();
      ctx.arc(p[0], p[1], idx >= 8 ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = idx >= 8 ? '#FF5722' : '#3B82F6';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// --- 4. Интерактивный калькулятор внедрения ---
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
    tma: { 
      name: 'Telegram Mini App (TMA доставка/витрина)', 
      basePrice: 50000, 
      baseDays: 5, 
      benefit: 'Экономия 20–35% комиссии агрегаторов, чекаут за 30 сек' 
    },
    bot: { 
      name: 'Автоматизация лидов и чат-бот', 
      basePrice: 35000, 
      baseDays: 4, 
      benefit: '0 потерянных ночных заявок, мгновенный квалификатор' 
    },
    fullstack: { 
      name: 'E-commerce витрина / Складская CRM', 
      basePrice: 85000, 
      baseDays: 10, 
      benefit: 'Быстрый сайт без тормозов, учет остатков, печать накладных' 
    },
    web3d: { 
      name: 'Интерактивная промо-страница с 3D', 
      basePrice: 60000, 
      baseDays: 7, 
      benefit: 'Высокая вовлеченность и конверсия в заявку' 
    }
  };

  const featureConfig = {
    payments: { name: 'Прием платежей (СБП / карты / Telegram Pay)', price: 15000, days: 1 },
    admin: { name: 'Панель управления заказами для сотрудников', price: 20000, days: 2 },
    sync1c: { name: 'Синхронизация с 1С / СДЭК / МойСклад', price: 25000, days: 3 },
    aiassistant: { name: 'AI-консультант подбора товаров', price: 20000, days: 2 }
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
    if (timeValEl) timeValEl.textContent = `Срок запуска: ~${totalDays} рабочих дней`;
    if (stackValEl) stackValEl.textContent = typeInfo.benefit;

    if (sendTelegramBtn) {
      const featNames = Array.from(selectedFeatures).map(f => featureConfig[f]?.name).filter(Boolean).join(', ');
      const text = encodeURIComponent(
        `Привет, Сергей! Хочу обсудить внедрение:\n• Направление: ${typeInfo.name}\n• Дополнительно: ${featNames || 'Базовый комплект'}\n• Оценка: от ${totalPrice.toLocaleString('ru-RU')} ₽ (~${totalDays} раб. дней)`
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
