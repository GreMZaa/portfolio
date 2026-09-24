/**
 * Main Application Logic for Portfolio
 * Author: Sergey (GreMZaa)
 */

import { 
  initTmaSimulator, 
  initCrmSimulator, 
  init3DCanvasDemo, 
  initProjectCalculator 
} from './demos.js';

// Project Database for Modals and Deep Dive
const projectDetails = {
  'balance-food': {
    title: 'BALANCE Food — Telegram Mini App & AI Delivery',
    tag: 'Telegram Mini App / E-commerce',
    period: '2026',
    desc: 'Веб-приложение внутри Telegram для доставки здорового питания. Включает корзину с подсчетом КБЖУ, интерактивную карту зон доставки на Leaflet, консультанта подбора рациона на Cohere AI и бэкенд на Supabase с ботом на Grammy.',
    stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Telegram WebApp SDK', 'Supabase (PostgreSQL)', 'Grammy (Telegram Bot)', 'Cohere AI', 'Leaflet Maps', 'Playwright E2E'],
    highlights: [
      'Интеграция нативного Telegram WebApp SDK: темы, haptic feedback, MainButton, валидация initData HMAC-SHA256',
      'Консультант рациона питания на базе Cohere AI с кастомным системным промптом',
      'Интерактивная карта доставки с полигонами зон и расчетом курьерского тарифа в реальном времени',
      'Автоматическое создание накладных и уведомление клиентов и операторов через бота'
    ],
    github: 'https://github.com/GreMZaa/balance-food',
    demo: '#laboratory'
  },
  'cdek-crm': {
    title: 'CDEK Warehouse CRM — Складская и логистическая система',
    tag: 'Logistics CRM / Barcodes',
    period: '2026',
    desc: 'CRM-платформа для автоматизации учета складских перемещений, маркировки посылок, сканирования штрихкодов и печати накладных в PDF. Оснащена демоном VK-бота для автоматического информирования клиентов и сотрудников.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Zustand', 'Supabase Realtime', 'JsBarcode & JsPDF', 'Node.js Daemon (VK Bot)', 'Vitest'],
    highlights: [
      'Генерация стандартных штрихкодов Code128 и экспорт накладных в PDF',
      'Realtime обновление статусов ячеек склада через Supabase WebSockets',
      'VK Bot Daemon с поддержкой очередей и повторных попыток отправки сообщений при сбоях сети',
      'Полное покрытие E2E и unit-тестами для критических сценариев'
    ],
    github: 'https://github.com/GreMZaa/cdek-warehouse-ai-crm',
    demo: '#laboratory'
  },
  'fairytale-crossroads': {
    title: 'Fairytale Crossroads — Интерактивный 3D WebGL опыт',
    tag: '3D Web / Three.js / Creative Web',
    period: '2026',
    desc: 'Трехмерный интерактивный веб-опыт на Three.js и GSAP. Проект демонстрирует работу с 3D-графикой в браузере, кинематографическими перемещениями камеры, шейдерными эффектами освещения и оптимизацией производительности.',
    stack: ['Three.js', 'GSAP 3D', 'WebGL', 'Canvas Confetti', 'Vite', 'Modern ES Modules'],
    highlights: [
      'Оптимизированный рендеринг 3D-сцены со стабильными 60 FPS на десктопе и смартфонах',
      'Плавная хореография переходов камеры с использованием GSAP Easing кривых',
      'Взаимодействие с 3D-объектами по клику и наведению с использованием Raycaster',
      'Кастомные системы частиц для создания атмосферы'
    ],
    github: 'https://github.com/GreMZaa/fairytale-crossroads',
    demo: 'https://gremzaa.github.io/fairytale-crossroads/'
  },
  '1c-b2b': {
    title: '33Sport & 1C:Enterprise — B2B Каталог и интеграционный шлюз',
    tag: 'Enterprise / B2B Integration',
    period: '2026',
    desc: 'Интеграционный пайплайн синхронизации многотысячной номенклатуры спортивных товаров между 1C:Предприятие, XML/YML фидами и современным веб-интерфейсом. Отказоустойчивая система обновления остатков, парсинга цен и поиска.',
    stack: ['Python', '1C Enterprise OData / XML', 'Vite', 'High-Performance Search', 'Design System', 'Bitrix24 API'],
    highlights: [
      'Парсинг и нормализация сотен тысяч позиций каталога без блокировок и утечек памяти',
      'Синхронизация складских остатков по филиалам в фоновом режиме',
      'Кастомная дизайн-система с поддержкой B2B заказов и оптовых спецификаций',
      'Автоматическая генерация товарных выгрузок и аналитики'
    ],
    github: 'https://github.com/GreMZaa/33sport-prototype',
    demo: '#'
  },
  'poker-assistant': {
    title: 'Poker Assistant Bot — Telegram-помощник игрока',
    tag: 'Telegram Bot / Serverless',
    period: '2026',
    desc: 'Telegram-бот с математическими алгоритмами расчета вероятностей, аутов и шансов банка в покере. Построен на архитектуре Vercel Serverless с хранилищем Supabase.',
    stack: ['Telegram Bot API', 'Node.js / TypeScript', 'Supabase PostgreSQL', 'Vercel Serverless', 'Math Algorithms'],
    highlights: [
      'Расчет вероятностей в реальном времени с минимальной задержкой',
      'Сохранение игровой истории и сессий пользователя в облаке',
      'Serverless развертывание с нулевой стоимостью простоя'
    ],
    github: 'https://github.com/GreMZaa/poker-assistant-bot',
    demo: '#'
  },
  'ai-da-umnichka': {
    title: 'Ай Да, Умничка! — Веб-платформа детского центра',
    tag: 'Web Platform / Performance',
    period: '2026',
    desc: 'Интерактивная адаптивная платформа для детского развивающего центра в Тольятти. 100 баллов Google PageSpeed, запись на пробные занятия, интеграция с мессенджерами.',
    stack: ['HTML5 / CSS3', 'JavaScript ES6', 'Responsive Web Design', 'SEO & Analytics', 'Social Media Funnels'],
    highlights: [
      '100 баллов Performance по Google Lighthouse',
      'Форма записи с автоматической маршрутизацией заявок в Telegram',
      'Адаптивность под 100% мобильных устройств и экранов'
    ],
    github: 'https://github.com/GreMZaa/ai-da-umnichka',
    demo: '#'
  }
};

// Global Toast Notification Helper
window.showToast = function(msg) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="color:var(--accent)">•</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3200);
};

// Copy text to clipboard
window.copyToClipboard = function(text, label) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(`Скопировано в буфер: ${label || text}`);
    }).catch(() => {
      window.showToast(`Контакт: ${text}`);
    });
  } else {
    window.showToast(`Контакт: ${text}`);
  }
};

// Open Project Modal
window.openProjectModal = function(projectId) {
  const p = projectDetails[projectId];
  if (!p) return;

  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (!modalOverlay || !modalBody) return;

  modalBody.innerHTML = `
    <div style="margin-bottom: 22px;">
      <span class="section-label">${p.tag}</span>
      <h2 style="font-size: 1.6rem; margin: 8px 0 14px; font-weight:700;">${p.title}</h2>
      <p style="color: var(--text-secondary); font-size: 0.98rem; line-height: 1.65; margin-bottom: 20px;">${p.desc}</p>
    </div>

    <div style="margin-bottom: 22px;">
      <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 10px; text-transform: uppercase; letter-spacing:0.06em; font-weight:600;">
        Архитектурные решения
      </div>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
        ${p.highlights.map(h => `
          <li style="display: flex; gap: 10px; font-size: 0.9rem; color: var(--text-primary);">
            <span style="color: var(--accent)">—</span> <span>${h}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div style="margin-bottom: 28px;">
      <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 10px; text-transform: uppercase; letter-spacing:0.06em; font-weight:600;">
        Технологический стек
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${p.stack.map(s => `<span class="tech-pill">${s}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 12px; flex-wrap: wrap; padding-top: 18px; border-top: 1px solid var(--border-subtle);">
      ${p.github ? `
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Репозиторий на GitHub
        </a>
      ` : ''}
      <a href="https://t.me/gremzaa" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        Обсудить реализацию
      </a>
    </div>
  `;

  modalOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
  const modalOverlay = document.getElementById('project-modal');
  if (modalOverlay) {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }
};

// Document Loaded Setup
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Interactive Simulators
  initTmaSimulator();
  initCrmSimulator();
  init3DCanvasDemo();
  initProjectCalculator();

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Lab Tabs Switching
  const labTabs = document.querySelectorAll('.lab-nav-item');
  const labPanels = document.querySelectorAll('.lab-content-panel');

  labTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      labTabs.forEach(t => t.classList.remove('active'));
      labPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.dataset.panel;
      document.getElementById(targetId)?.classList.add('active');
    });
  });

  // 5. Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = '';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '72px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#131418';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid #2a2d36';
      }
    });
  }

  // 6. Modal Interactions
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
});
