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
 * Interactive Hero Frame Controller (Sri Tech Style)
 * Animates Sergey Sharonov reacting to cursor zones
 */
function initInteractiveHero() {
  const canvas = document.getElementById('hero-character-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const bubbleTag = document.getElementById('bubble-tag');
  const bubbleText = document.getElementById('bubble-text');
  const contextReactionText = document.getElementById('context-reaction-text');
  const heroWrapper = document.getElementById('hero-interactive-section');

  const TOTAL_FRAMES = 144;
  const frames = [];
  let loadedCount = 0;
  let renderedInitial = false;

  // Preload all 144 WebP frames
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    const num = String(i).padStart(3, '0');
    img.src = `assets/hero_frames/frame_${num}.webp`;
    img.onload = () => {
      loadedCount++;
      if (i === 0 && !renderedInitial) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        renderedInitial = true;
      }
    };
    frames.push(img);
  }

  let currentFrame = 0;
  let targetFrame = 0;
  let isGreetingSequence = false;
  let greetingStep = 0;
  let resetTimer = null;
  let currentActiveZone = 'idle';

  // Key animation landmarks
  const POSES = {
    IDLE: 10,
    LOOK_LEFT: 44,
    LOOK_RIGHT: 70,
    CENTER_LOOK: 96,
    GREET_WAVE: 115,
    POINT_DOWN: 140
  };

  // Smooth render loop (requestAnimationFrame + lerp)
  function render() {
    if (isGreetingSequence) {
      currentFrame += (targetFrame - currentFrame) * 0.15;
      if (Math.abs(targetFrame - currentFrame) < 1.5) {
        if (greetingStep === 1) {
          greetingStep = 2;
          targetFrame = POSES.GREET_WAVE;
        } else if (greetingStep === 2) {
          greetingStep = 3;
          targetFrame = POSES.POINT_DOWN;
        }
      }
    } else {
      currentFrame += (targetFrame - currentFrame) * 0.12;
    }

    const fIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame)));
    if (frames[fIdx] && frames[fIdx].complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(frames[fIdx], 0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  function setLeftReaction() {
    clearTimeout(resetTimer);
    isGreetingSequence = false;
    targetFrame = POSES.LOOK_LEFT;

    if (bubbleTag) {
      bubbleTag.textContent = "Склады & 1С";
      bubbleTag.style.background = "#EFF6FF";
      bubbleTag.style.color = "#1855F4";
    }
    if (bubbleText) {
      bubbleText.textContent = "Смотрите складскую логистику или 1С?";
    }
    if (contextReactionText) {
      contextReactionText.textContent = "Интересует автоматизация склада, печать термоэтикеток Code128 или синхронизация 100k SKU без зависаний?";
    }

    resetTimer = setTimeout(returnToIdle, 3500);
  }

  function setRightReaction() {
    clearTimeout(resetTimer);
    isGreetingSequence = false;
    targetFrame = POSES.LOOK_RIGHT;

    if (bubbleTag) {
      bubbleTag.textContent = "Mini Apps";
      bubbleTag.style.background = "#FEF2F2";
      bubbleTag.style.color = "#EF4444";
    }
    if (bubbleText) {
      bubbleText.textContent = "Нужен Telegram Mini App или чекаут?";
    }
    if (contextReactionText) {
      contextReactionText.textContent = "Собственная доставка в Telegram без комиссий агрегаторов 20–35% или чекаут сайта за 30 секунд.";
    }

    resetTimer = setTimeout(returnToIdle, 3500);
  }

  function setCenterReaction() {
    clearTimeout(resetTimer);
    isGreetingSequence = true;
    greetingStep = 1;
    targetFrame = POSES.CENTER_LOOK;

    if (bubbleTag) {
      bubbleTag.textContent = "Привет!";
      bubbleTag.style.background = "#ECFDF5";
      bubbleTag.style.color = "#059669";
    }
    if (bubbleText) {
      bubbleText.textContent = "Я Сергей Шаронов. Кейсы с окупаемостью прямо внизу ↓";
    }
    if (contextReactionText) {
      contextReactionText.textContent = "Рад знакомству! Скролльте вниз: там 4 кейса с цифрами окупаемости и демо-видео.";
    }
  }

  function returnToIdle() {
    currentActiveZone = 'idle';
    isGreetingSequence = false;
    targetFrame = POSES.IDLE;

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
    if (contextReactionText) {
      contextReactionText.textContent = "Наведите курсор на Сергея, чтобы познакомиться, или на края экрана для выбора темы.";
    }
  }

  if (window.innerWidth <= 640) {
    returnToIdle();
  }

  // Global mouse tracking across the Hero section
  if (heroWrapper) {
    heroWrapper.addEventListener('mousemove', (e) => {
      const rect = heroWrapper.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;

      if (relX < 0.35) {
        if (currentActiveZone !== 'left') {
          currentActiveZone = 'left';
          setLeftReaction();
        }
      } else if (relX > 0.65) {
        if (currentActiveZone !== 'right') {
          currentActiveZone = 'right';
          setRightReaction();
        }
      } else {
        if (currentActiveZone !== 'center') {
          currentActiveZone = 'center';
          setCenterReaction();
        }
      }
    });

    heroWrapper.addEventListener('mouseleave', () => {
      currentActiveZone = 'idle';
      clearTimeout(resetTimer);
      resetTimer = setTimeout(returnToIdle, 1500);
    });
  }

  // Direct zone overlay hover support
  const zoneLeft = document.getElementById('zone-left');
  const zoneCenter = document.getElementById('zone-center');
  const zoneRight = document.getElementById('zone-right');

  zoneLeft?.addEventListener('mouseenter', setLeftReaction);
  zoneCenter?.addEventListener('mouseenter', setCenterReaction);
  zoneRight?.addEventListener('mouseenter', setRightReaction);

  // Mobile / Touch support
  const stage = document.getElementById('canvas-stage');
  stage?.addEventListener('click', () => {
    setCenterReaction();
  });

  // Mobile viewport entry trigger
  if ('IntersectionObserver' in window && window.innerWidth <= 768) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(setCenterReaction, 500);
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(canvas);
  }
}
