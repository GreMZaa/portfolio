/**
 * Main Application Logic for Portfolio
 * Author: Sergey (GreMZaa)
 */

import { 
  initAmbientCanvas, 
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
    desc: 'Высокопроизводительное веб-приложение внутри Telegram для доставки здорового и правильного питания. Включает корзину с мгновенным пересчетом КБЖУ, интерактивную карту зон доставки на Leaflet, интеллектуального помощника подбора рациона на базе Cohere AI и бэкенд на Supabase с Telegram-ботом на Grammy.',
    stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Telegram WebApp SDK', 'Supabase (PostgreSQL)', 'Grammy (Telegram Bot)', 'Cohere AI', 'Leaflet Maps', 'Playwright E2E'],
    highlights: [
      'Полная интеграция нативного Telegram WebApp API (тема, haptic feedback, кнопка MainButton, авторизация через initData)',
      'Интеллектуальный AI-консультант рациона питания на Cohere AI с контекстным промптом',
      'Интерактивная карта доставки с полигонами зон и расчетом курьерского тарифа в реальном времени',
      'Автоматическое создание накладных и уведомление клиентов и операторов через бота'
    ],
    github: 'https://github.com/GreMZaa/balance-food',
    demo: '#laboratory'
  },
  'cdek-crm': {
    title: 'CDEK Warehouse AI CRM — Складская и логистическая система',
    tag: 'AI CRM / Warehouse Logistics',
    period: '2026',
    desc: 'Комплексная CRM-платформа для автоматизации учета складских перемещений, маркировки посылок, сканирования штрихкодов и печати накладных в PDF. Оснащена демоном VK-бота для автоматического информирования клиентов и сотрудников.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Zustand', 'Supabase Realtime', 'JsBarcode & JsPDF', 'Node.js Daemon (VK Bot)', 'Vitest'],
    highlights: [
      'Генерация стандартных штрихкодов Code128 и печать накладных термопринтером / PDF',
      'Realtime обновление статусов ячеек склада через Supabase WebSockets',
      'VK Bot Daemon с поддержкой очередей и повторных попыток отправки сообщений при сбоях сети',
      'Полное покрытие E2E и unit-тестами для критических логистических сценариев'
    ],
    github: 'https://github.com/GreMZaa/cdek-warehouse-ai-crm',
    demo: '#laboratory'
  },
  'fairytale-crossroads': {
    title: 'Fairytale Crossroads — Интерактивный 3D WebGL мир',
    tag: '3D Web / Three.js / Creative Web',
    period: '2026',
    desc: 'Атмосферный трехмерный интерактивный веб-опыт сказочного перепутья на Three.js и GSAP. Проект демонстрирует мастерство работы с 3D-графикой в браузере, кинематографическими перемещениями камеры, шейдерными эффектами освещения и частицами.',
    stack: ['Three.js', 'GSAP 3D', 'WebGL', 'Canvas Confetti', 'Vite', 'Modern ES Modules'],
    highlights: [
      'Оптимизированный рендеринг 3D-сцены с поддержанием стабильных 60 FPS на десктопе и смартфонах',
      'Плавная хореография переходов камеры с использованием GSAP Easing кривых',
      'Интерактивное взаимодействие с 3D-объектами по клику и наведению с использованием Raycaster',
      'Кастомные партикловые системы для создания мистической атмосферы'
    ],
    github: 'https://github.com/GreMZaa/fairytale-crossroads',
    demo: 'https://gremzaa.github.io/fairytale-crossroads/'
  },
  '1c-b2b': {
    title: '33Sport & 1C:Enterprise — B2B Каталог и интеграционный шлюз',
    tag: 'Enterprise / B2B Integration',
    period: '2026',
    desc: 'Интеграционный пайплайн синхронизации многотысячной номенклатуры спортивных товаров между 1C:Предприятие, XML/YML фидами и современным веб-интерфейсом. Реализована отказоустойчивая система обновления остатков, парсинга цен и фасетного поиска.',
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
    title: 'Poker Assistant Bot — Умный Telegram-помощник игрока',
    tag: 'Telegram Bot / Serverless',
    period: '2026',
    desc: 'Telegram-бот и визард с математическими алгоритмами расчета вероятностей, аутов и шансов банка в покере. Построен на бессерверной архитектуре Vercel Serverless с хранилищем Supabase.',
    stack: ['Telegram Bot API', 'Node.js / TypeScript', 'Supabase PostgreSQL', 'Vercel Serverless', 'Math Algorithms'],
    highlights: [
      'Быстрый расчет вероятностей в реальном времени с минимальной задержкой',
      'Сохранение игровой истории и сессий пользователя в облаке',
      'Serverless развертывание с нулевой стоимостью простоя'
    ],
    github: 'https://github.com/GreMZaa/poker-assistant-bot',
    demo: '#'
  },
  'ai-da-umnichka': {
    title: 'Ай Да, Умничка! — Конверсионный веб-сервис для детского центра',
    tag: 'Web Platform / EdTech',
    period: '2026',
    desc: 'Интерактивная адаптивная платформа для детского развивающего центра в Тольятти. Высокая скорость загрузки (100 Google PageSpeed), удобная запись на пробные занятия, интеграция с мессенджерами и CRM.',
    stack: ['HTML5 / CSS3', 'JavaScript ES6', 'Responsive Web Design', 'SEO & Analytics', 'Social Media Funnels'],
    highlights: [
      '100 баллов Performance по Google Lighthouse',
      'Интуитивная форма записи с автоматической маршрутизацией заявок в Telegram',
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
  toast.innerHTML = `<span>⚡</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
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
    <div style="margin-bottom: 20px;">
      <span class="section-tag" style="margin-bottom: 8px;">${p.tag}</span>
      <h2 style="font-size: 1.8rem; margin: 8px 0 16px;">${p.title}</h2>
      <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7; margin-bottom: 24px;">${p.desc}</p>
    </div>

    <div style="margin-bottom: 24px;">
      <h4 style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--neon-cyan); margin-bottom: 12px; text-transform: uppercase;">
        // Ключевые архитектурные решения
      </h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
        ${p.highlights.map(h => `
          <li style="display: flex; gap: 10px; font-size: 0.95rem; color: #d0d7e2;">
            <span style="color: var(--neon-green)">✓</span> <span>${h}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div style="margin-bottom: 30px;">
      <h4 style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--neon-cyan); margin-bottom: 12px; text-transform: uppercase;">
        // Технологический стек
      </h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${p.stack.map(s => `<span class="tech-tag">${s}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 14px; flex-wrap: wrap; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
      ${p.github ? `
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Репозиторий на GitHub
        </a>
      ` : ''}
      <a href="https://t.me/gremzaa" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        Обсудить похожий проект
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
  // 1. Initialize Canvas Demos & Simulators
  initAmbientCanvas();
  initTmaSimulator();
  initCrmSimulator();
  init3DCanvasDemo();
  initProjectCalculator();

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Project Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
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
  const labTabs = document.querySelectorAll('.lab-tab');
  const labPanels = document.querySelectorAll('.lab-panel');

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
        navLinks.style.top = '74px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#0a0d14';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid rgba(0,240,255,0.2)';
      }
    });
  }

  // 6. Close modal on backdrop click or ESC
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
