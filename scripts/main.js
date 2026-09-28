/**
 * Portfolio Interactive Logic - Sergey Sharonov
 * Operator-Turned-Builder • Business Partner
 */

const projectDetails = {
  'balance-food': {
    title: 'Telegram Mini App: Доставка для заведения без комиссий агрегаторов 20–35%',
    tag: 'Telegram Mini App • Окупаемость за 2–3 недели',
    pain: 'Кафе отдавало треть выручки сервисам доставки (Яндекс.Еда и др.), а разработка собственного мобильного приложения под iOS/Android стоила от 400 000 ₽ и требовала месяцев ожидания и публикации в App Store.',
    solution: 'Легкий интерфейс прямо внутри Telegram без скачивания из App Store: каталог меню, модификаторы блюд, корзина и отправка заказа администратору за 3 тапа. Гость сохраняет адрес один раз, повторные заказы оформляются за 15 секунд.',
    timeline: '4 дня от ТЗ до первых реальных заказов',
    roi: 'Окупается за 2–3 недели за счет перевода постоянников на прямой заказ с 0% комиссии. Вся база гостей сохраняется у кафе для бесплатных рассылок.',
    stack: ['Telegram Mini App', 'Чек на кухню за 30 сек', '0% сторонних комиссий', 'База клиентов у бизнеса', 'Модификаторы блюд']
  },
  'cdek-crm': {
    title: 'Редизайн чекаута интернет-магазина глазами операциониста',
    tag: 'Редизайн E-Commerce • Сокращение времени в 6 раз',
    pain: 'Перегруженная корзина, 8 обязательных полей для заполнения, потеря до 25% мобильных покупателей на этапе оплаты из-за долгого и неудобного интерфейса.',
    solution: 'Проектирование пути клиента на основе 5 лет опыта в складской логистике и продажах: чекаут в 1 экран, автозаполнение адреса по геолокации, устранение визуального шума и оплата через СБП в 1 клик.',
    timeline: '5 дней',
    roi: 'Сокращение времени оформления заказа с 3 минут до 30 секунд. Рост конверсии мобильного трафика в оплату на 25%.',
    stack: ['Чекаут в 1 экран', 'Автоопределение адреса', 'СБП / Оплата в 1 клик', 'Mobile-First UX', 'Без лишних полей']
  },
  'wms-logistics': {
    title: 'WMS и маркировка склада: отгрузки без пересортов и штрафов',
    tag: 'Логистика & WMS • Сборка в 3 раза быстрее',
    pain: 'Путаница в ячейках склада, регулярные пересорты при комплектации, ручное оформление накладных СДЭК и штрафы маркетплейсов за задержки отгрузок.',
    solution: 'Адресный учет по штрихкодам Code128, моментальная печать термоэтикеток на складе и автогенерация реестров СДЭК в один клик.',
    timeline: '3 дня',
    roi: '0 пересортов за все время работы. Время сборки одной позиции сократилось с 6 до 2 минут. Исключены штрафы за задержки.',
    stack: ['Штрихкодирование Code128', 'Адресный учет ячеек', 'Интеграция со СДЭК API', 'Печать этикеток в 1 клик', 'Контроль остатков']
  },
  '1c-b2b': {
    title: 'Сквозная синхронизация 1С: 100 000 товаров без тормозов сайта',
    tag: '1С:Предприятие • 100k+ SKU без подвисаний',
    pain: 'Оптовый сайт зависал при выгрузках номенклатуры из 1С, менеджеры вручную перепроверяли остатки и цены по телефону, бизнес продавал отсутствующие товары в минус.',
    solution: 'Потоковый шлюз данных: фоновый обмен остатками и ценами за секунды без падения серверов, подвисания витрины и утечек памяти.',
    timeline: '4 дня',
    roi: 'Экономия 40+ часов ручного труда менеджеров в месяц. Ноль ошибок в ценах и ноль заказов на отсутствующий товар.',
    stack: ['1С:Предприятие 8.3', 'Потоковый парсинг фидов', 'Фоновая синхронизация', 'Мгновенный фасетный поиск', 'Отказоустойчивость']
  }
};

// Интерактивный переключатель До / После для чекаута
window.switchCheckoutView = function(view) {
  const container = document.getElementById('checkout-compare');
  if (!container) return;
  const buttons = container.querySelectorAll('.compare-tab-btn');
  buttons.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-view') === view);
  });
  const panels = container.querySelectorAll('.compare-view-card');
  panels.forEach(p => {
    p.classList.toggle('active', p.classList.contains(`view-${view}`));
  });
};

// Открытие модального окна проекта по структуре «Деньги и окупаемость»
window.openProjectModal = function(projectId) {
  const p = projectDetails[projectId];
  if (!p) return;

  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (!modalOverlay || !modalBody) return;

  modalBody.innerHTML = `
    <div style="margin-bottom: 20px;">
      <span style="display:inline-block; background:#EFF6FF; color:#1D4ED8; font-weight:700; font-size:0.75rem; padding:5px 12px; border-radius:999px; margin-bottom:10px;">
        ${p.tag}
      </span>
      <h2 style="font-size: 1.45rem; font-weight:800; margin: 4px 0 16px; line-height:1.25; color:#18181B;">${p.title}</h2>
    </div>

    <!-- Боль клиента -->
    <div style="background:#FEF2F2; border-left:4px solid #EF4444; border-radius:0 12px 12px 0; padding:12px 16px; margin-bottom:14px;">
      <div style="font-size:0.8rem; font-weight:800; color:#DC2626; text-transform:uppercase; margin-bottom:4px; letter-spacing:0.04em;">
        🔴 Какая была боль клиента:
      </div>
      <p style="color:#18181B; font-size:0.92rem; line-height:1.55; margin:0;">${p.pain}</p>
    </div>

    <!-- Что внедрено -->
    <div style="background:#F0FDF4; border-left:4px solid #16A34A; border-radius:0 12px 12px 0; padding:12px 16px; margin-bottom:16px;">
      <div style="font-size:0.8rem; font-weight:800; color:#15803D; text-transform:uppercase; margin-bottom:4px; letter-spacing:0.04em;">
        🟢 Что внедрено (Решение):
      </div>
      <p style="color:#18181B; font-size:0.92rem; line-height:1.55; margin:0;">${p.solution}</p>
    </div>

    <!-- Метрики: Срок и Окупаемость -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px;">
      <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:12px 14px;">
        <div style="font-size:0.75rem; font-weight:700; color:#64748B; text-transform:uppercase; margin-bottom:4px;">⏱ Срок внедрения:</div>
        <strong style="color:#18181B; font-size:1.02rem;">${p.timeline}</strong>
      </div>
      <div style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:12px; padding:12px 14px;">
        <div style="font-size:0.75rem; font-weight:700; color:#15803D; text-transform:uppercase; margin-bottom:4px;">💰 Экономика (ROI):</div>
        <strong style="color:#15803D; font-size:1.02rem;">${p.roi}</strong>
      </div>
    </div>

    <!-- Примененные решения -->
    <div style="margin-bottom: 24px;">
      <div style="font-size: 0.8rem; font-weight:800; color: #71717A; margin-bottom: 8px; text-transform: uppercase; letter-spacing:0.04em;">
        Технические решения:
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${p.stack.map(s => `<span style="background:#F4F4F5; color:#18181B; font-weight:600; font-size:0.8rem; padding:4px 10px; border-radius:999px;">${s}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 12px; flex-wrap: wrap; padding-top: 18px; border-top: 1px solid #E4E4E7;">
      <a href="https://t.me/ssharonovv" target="_blank" rel="noopener noreferrer" class="btn-black-pill" style="font-size:0.92rem; padding:12px 24px;">
        <span>Обсудить похожее решение в Telegram</span>
        <span>↗</span>
      </a>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
  const modalOverlay = document.getElementById('project-modal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav toggle
  const mobileBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('is-active');
      const isShown = navLinks.style.display === 'flex';
      navLinks.style.display = isShown ? '' : 'flex';
      if (!isShown) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '20px';
        navLinks.style.right = '20px';
        navLinks.style.background = '#FFFFFF';
        navLinks.style.padding = '20px';
        navLinks.style.borderRadius = '16px';
        navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      }
    });
  }

  // Modal close handlers
  const modal = document.getElementById('project-modal');
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeProjectModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeProjectModal();
    }
  });

  // Initialize Interactive Hero (Sri Tech Style)
  initInteractiveHero();
});

/**
 * Interactive Hero Frame Controller (Sri Tech Style - High Definition 24fps)
 * Native 1280x720 video frames with authentic human motion
 */
function initInteractiveHero() {
  const canvas = document.getElementById('hero-character-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const bubbleTag = document.getElementById('bubble-tag');
  const bubbleText = document.getElementById('bubble-text');
  const heroWrapper = document.getElementById('hero-interactive-section');

  const TOTAL_FRAMES = 144;
  const frames = new Array(TOTAL_FRAMES);
  let lastDrawnFrame = null;

  // Key animation landmarks based on САЙТ.mp4:
  // 0..35: Typing at laptop (Idle cycle)
  // 40..55: Turning head to screen-right (his left) -> LOOK_RIGHT = 46
  // 56..85: Turning head to screen-left (his right) -> LOOK_LEFT = 72
  // 90..143: Natural greeting gesture:
  //   92..104: Looks up at camera with a warm smile
  //   105..122: Raises right hand and waves hello!
  //   125..142: Points down with index finger ("кейсы прямо внизу!")
  const POSES = {
    IDLE_BASE: 14,
    IDLE_MIN: 2,
    IDLE_MAX: 26,
    LOOK_LEFT: 72,
    LOOK_RIGHT: 46,
    GREET_START: 92,
    GREET_WAVE_PEAK: 118,
    GREET_POINT: 138,
    GREET_END: 142
  };

  function drawFrame(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    lastDrawnFrame = img;
    return true;
  }

  // Preload priority frames first
  const priorityIndices = [POSES.IDLE_BASE, 0, POSES.LOOK_LEFT, POSES.LOOK_RIGHT, POSES.GREET_START, POSES.GREET_WAVE_PEAK, POSES.GREET_POINT];
  priorityIndices.forEach((idx) => {
    const img = new Image();
    const num = String(idx).padStart(3, '0');
    img.src = `assets/hero_frames/frame_${num}.webp`;
    img.onload = () => {
      frames[idx] = img;
      if (!lastDrawnFrame && (idx === POSES.IDLE_BASE || idx === 0)) {
        drawFrame(img);
      }
    };
    frames[idx] = img;
  });

  // Preload all remaining frames in background
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    if (frames[i]) continue;
    const img = new Image();
    const num = String(i).padStart(3, '0');
    img.src = `assets/hero_frames/frame_${num}.webp`;
    img.onload = () => {
      frames[i] = img;
      if (!lastDrawnFrame && i === 0) {
        drawFrame(img);
      }
    };
    frames[i] = img;
  }

  // Animation state machine
  // Modes: 'idle' | 'transition' | 'greeting' | 'holding'
  let mode = 'idle';
  let currentFrame = POSES.IDLE_BASE;
  let targetFrame = POSES.IDLE_BASE;
  let idleDirection = 1;
  let idleTickCounter = 0;
  let holdTimer = null;
  let resetToIdleTimer = null;
  let currentActiveZone = 'idle';

  // 24 FPS video clock (41.67ms per frame)
  const FRAME_INTERVAL = 1000 / 24;
  let lastFrameTime = performance.now();

  function updateAnimation(now) {
    const elapsed = now - lastFrameTime;

    if (elapsed >= FRAME_INTERVAL) {
      lastFrameTime = now - (elapsed % FRAME_INTERVAL);

      if (mode === 'greeting') {
        // Play the video greeting sequentially at natural 24 FPS: 92 -> 142
        if (currentFrame < POSES.GREET_END) {
          currentFrame += 1;
        } else {
          // Finished wave & point: hold pointing pose pleasantly
          mode = 'holding';
          clearTimeout(holdTimer);
          holdTimer = setTimeout(() => {
            returnToIdle();
          }, 2400);
        }
      } else if (mode === 'transition') {
        // Smooth head turn at natural speed
        const dist = Math.abs(targetFrame - currentFrame);
        const step = Math.sign(targetFrame - currentFrame);
        const speed = dist > 20 ? 2 : 1;

        if (dist <= 1) {
          currentFrame = targetFrame;
          mode = 'holding';
        } else {
          currentFrame += step * speed;
        }
      } else if (mode === 'idle') {
        // Gentle subtle typing loop (2..26..2) every 2 ticks
        idleTickCounter++;
        if (idleTickCounter % 2 === 0) {
          currentFrame += idleDirection;
          if (currentFrame >= POSES.IDLE_MAX) {
            idleDirection = -1;
          } else if (currentFrame <= POSES.IDLE_MIN) {
            idleDirection = 1;
          }
        }
      }

      // Draw current frame safely
      const fIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame)));
      const img = frames[fIdx];
      if (img && img.complete && img.naturalWidth > 0) {
        drawFrame(img);
      }
    }

    requestAnimationFrame(updateAnimation);
  }

  requestAnimationFrame(updateAnimation);

  function setLeftReaction() {
    clearTimeout(resetToIdleTimer);
    clearTimeout(holdTimer);
    targetFrame = POSES.LOOK_LEFT;
    mode = 'transition';

    if (bubbleTag) {
      bubbleTag.textContent = "Склады & 1С";
      bubbleTag.style.background = "#EFF6FF";
      bubbleTag.style.color = "#1855F4";
    }
    if (bubbleText) {
      bubbleText.textContent = "Смотрите складскую логистику или 1С?";
    }

    resetToIdleTimer = setTimeout(returnToIdle, 4200);
  }

  function setRightReaction() {
    clearTimeout(resetToIdleTimer);
    clearTimeout(holdTimer);
    targetFrame = POSES.LOOK_RIGHT;
    mode = 'transition';

    if (bubbleTag) {
      bubbleTag.textContent = "Mini Apps";
      bubbleTag.style.background = "#FEF2F2";
      bubbleTag.style.color = "#EF4444";
    }
    if (bubbleText) {
      bubbleText.textContent = "Нужен Telegram Mini App или чекаут?";
    }

    resetToIdleTimer = setTimeout(returnToIdle, 4200);
  }

  function setCenterReaction() {
    clearTimeout(resetToIdleTimer);
    clearTimeout(holdTimer);

    // Play greeting sequence from frame 92 at natural 24 FPS
    currentFrame = POSES.GREET_START;
    mode = 'greeting';

    if (bubbleTag) {
      bubbleTag.textContent = "Привет!";
      bubbleTag.style.background = "#ECFDF5";
      bubbleTag.style.color = "#059669";
    }
    if (bubbleText) {
      bubbleText.textContent = "Я Сергей Шаронов. Кейсы с окупаемостью прямо внизу ↓";
    }

    resetToIdleTimer = setTimeout(returnToIdle, 6000);
  }

  function returnToIdle() {
    currentActiveZone = 'idle';
    targetFrame = POSES.IDLE_BASE;
    mode = 'transition';

    const isMobile = window.innerWidth <= 640;
    if (bubbleTag) {
      bubbleTag.textContent = isMobile ? "Привет!" : "В работе";
      bubbleTag.style.background = "#F4F4F5";
      bubbleTag.style.color = "#71717A";
    }
    if (bubbleText) {
      bubbleText.textContent = isMobile 
        ? "Нажмите на экран или листайте вниз ↓" 
        : "Двигайте курсор влево, вправо или на меня";
    }
  }

  if (window.innerWidth <= 640) {
    returnToIdle();
  }

  // Global mouse tracking across Hero section
  let lastZoneChangeTime = 0;
  if (heroWrapper) {
    heroWrapper.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastZoneChangeTime < 280) return;

      const rect = heroWrapper.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;

      if (relX < 0.38) {
        if (currentActiveZone !== 'left') {
          currentActiveZone = 'left';
          lastZoneChangeTime = now;
          setLeftReaction();
        }
      } else if (relX > 0.65) {
        if (currentActiveZone !== 'right') {
          currentActiveZone = 'right';
          lastZoneChangeTime = now;
          setRightReaction();
        }
      } else {
        if (currentActiveZone !== 'center') {
          currentActiveZone = 'center';
          lastZoneChangeTime = now;
          setCenterReaction();
        }
      }
    });

    heroWrapper.addEventListener('mouseleave', () => {
      currentActiveZone = 'idle';
      clearTimeout(resetToIdleTimer);
      resetToIdleTimer = setTimeout(returnToIdle, 3000);
    });
  }

  // Direct zone overlay hover support
  const zoneLeft = document.getElementById('zone-left');
  const zoneCenter = document.getElementById('zone-center');
  const zoneRight = document.getElementById('zone-right');

  zoneLeft?.addEventListener('mouseenter', setLeftReaction);
  zoneCenter?.addEventListener('mouseenter', setCenterReaction);
  zoneRight?.addEventListener('mouseenter', setRightReaction);

  // Click / touch to trigger greeting wave
  const stage = document.getElementById('canvas-stage');
  stage?.addEventListener('click', () => {
    setCenterReaction();
  });

  // Mobile viewport auto-trigger greeting wave
  if ('IntersectionObserver' in window && window.innerWidth <= 768) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(setCenterReaction, 400);
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(canvas);
  }
}
