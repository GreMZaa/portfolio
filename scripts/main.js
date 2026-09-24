/**
 * Главная логика портфолио Сергея Шаронова
 * Operator-Turned-Builder • Технический партнер для бизнеса
 */

import { 
  initTmaSimulator, 
  initCrmSimulator, 
  init3DCanvasDemo, 
  initProjectCalculator 
} from './demos.js';

// Детали кейсов с точки зрения пользы для бизнеса и окупаемости
const projectDetails = {
  'balance-food': {
    title: 'Telegram Mini App для локального заведения доставки еды',
    tag: 'TMA • Замена агрегаторов доставки',
    period: '2026',
    desc: 'Замена Яндекс.Еды и Delivery Club с их комиссией 20–35% на собственную систему доставки внутри Telegram. Гость заказывает без скачивания приложений прямо в чате за 30 секунд. Заказы мгновенно уходят на принтер кухни, а база гостей сохраняется в заведении для бесплатных повторных рассылок.',
    stack: ['Telegram Mini App', 'Быстрый чекаут без регистрации', 'Зоны доставки на карте', 'AI-подбор рациона', 'Автоуведомления кухни и гостя'],
    highlights: [
      'Экономия до 35% маржи с каждого заказа — отсутствие комиссий сторонним сервисам',
      'База клиентов остается у заведения: прямой контакт для повторных продаж без затрат на рекламу',
      'Скорость чекаута: оформление за 30 секунд с сохранением адреса гостя',
      'AI-консультант меню помогает гостям выбрать подходящий рацион и увеличивает средний чек'
    ],
    github: 'https://github.com/GreMZaa/balance-food',
    demo: '#laboratory'
  },
  'cdek-crm': {
    title: 'Складская CRM и автоматизация маркировки отправлений',
    tag: 'Склад & Логистика • Исключение ошибок комплектации',
    period: '2026',
    desc: 'Система учета движения товаров, автоматической генерации штрихкодов Code128 и печати накладных в PDF. Исключает человеческий фактор при сборке и отгрузке, отслеживает адресное хранение ячеек и держит связь с клиентами через автоуведомления.',
    stack: ['Генерация штрихкодов Code128', 'Экспорт накладных в PDF', 'Адресный учет ячеек', 'Интеграция со СДЭК API', 'VK-бот демон статусов'],
    highlights: [
      'Сокращение времени сборки заказа в 3 раза за счет автоматической печати наклеек',
      'Ноль пересортов: сверка штрихкода перед отправкой исключает возвраты и штрафы логистики',
      'Автоматическое информирование покупателей о трек-номере без звонков менеджеров',
      'Полная прозрачность остатков по ячейкам склада в реальном времени'
    ],
    github: 'https://github.com/GreMZaa/cdek-warehouse-ai-crm',
    demo: '#laboratory'
  },
  'fairytale-crossroads': {
    title: 'Интерактивная 3D промо-платформа',
    tag: 'Интерактив • Высокая вовлеченность',
    period: '2026',
    desc: 'Интерактивный промо-продукт на стыке геймификации и креативной презентации. Удерживает внимание посетителя в 4-5 раз дольше стандартных посадочных страниц, создавая сильный запоминающийся контакт с брендом.',
    stack: ['Three.js', 'Плавная хореография камеры', 'Оптимизация под мобильные телефоны (60 FPS)', 'Интерактивные сценарии'],
    highlights: [
      'Увеличение времени на сайте в 4 раза за счет иммерсивного взаимодействия',
      'Стабильная работа и быстрая загрузка на любых смартфонах без лагов',
      'Нестандартная презентация продукта, выделяющаяся на фоне шаблонных лендингов'
    ],
    github: 'https://github.com/GreMZaa/fairytale-crossroads',
    demo: 'https://gremzaa.github.io/fairytale-crossroads/'
  },
  '1c-b2b': {
    title: 'B2B Каталог и сквозная синхронизация с 1С:Предприятие',
    tag: '1C Интеграция • Каталог 100 000+ товаров',
    period: '2026',
    desc: 'Интеграционный шлюз номенклатуры спортивных товаров: автоматический парсинг сотен тысяч позиций, характеристик и складских остатков по филиалам. Сайт не виснет при выгрузках из 1С, а оптовые клиенты всегда видят актуальные цены и остатки.',
    stack: ['1C:Предприятие', 'Потоковый парсинг XML без утечек памяти', 'Синхронизация цен и остатков', 'Фасетный поиск товаров'],
    highlights: [
      'Отказоустойчивая обработка больших фидов (100k+ SKU) без зависаний витрины',
      'Синхронизация остатков по складам в фоновом режиме: исключены заказы товаров не в наличии',
      'Ускорение поиска в каталоге до долей секунды для оптовых заказчиков',
      'Экономия десятков часов ручного труда операторов контента'
    ],
    github: 'https://github.com/GreMZaa/33sport-prototype',
    demo: '#'
  },
  'poker-assistant': {
    title: 'Telegram-ассистент расчетов в реальном времени',
    tag: 'Telegram Сервис • Серверлесс архитектура',
    period: '2026',
    desc: 'Утилита внутри Telegram с алгоритмами математических расчетов вероятностей и сохранения истории сессий. Серверлесс-архитектура с нулевыми затратами на содержание серверов во время простоя.',
    stack: ['Telegram API', 'Математические расчеты вероятностей', 'Серверлесс облако', 'База данных сессий'],
    highlights: [
      'Мгновенный отклик менее 100 мс прямо в диалоге Telegram',
      'Нулевые расходы на серверную инфраструктуру при отсутствии нагрузки',
      'Удобный мобильный сценарий без лишних экранов'
    ],
    github: 'https://github.com/GreMZaa/poker-assistant-bot',
    demo: '#'
  },
  'ai-da-umnichka': {
    title: 'Веб-сервис детского центра: запись и сбор лидов',
    tag: 'E-Commerce & Лидген • 100/100 Google PageSpeed',
    period: '2026',
    desc: 'Легкий и быстрый сайт детского развивающего центра. Полная оптимизация скорости загрузки (100 баллов PageSpeed), мгновенный отклик на слабых смартфонах и прямая передача заявок родителям в Telegram и мессенджеры без потерь.',
    stack: ['100/100 PageSpeed Performance', 'Интуитивная онлайн-запись', 'Маршрутизация заявок в Telegram', 'Mobile-First'],
    highlights: [
      '100 из 100 баллов скорости по Google Lighthouse: открывается мгновенно даже на плохом 3G',
      'Удобная форма записи на пробные занятия с высокой конверсией в клик',
      'Прямая отправка уведомлений администраторам в Telegram без задержек'
    ],
    github: 'https://github.com/GreMZaa/ai-da-umnichka',
    demo: '#'
  }
};

// Всплывающие уведомления
window.showToast = function(msg) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="color:var(--cobalt-blue)">•</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
};

// Копирование контакта
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

// Открытие модального окна проекта
window.openProjectModal = function(projectId) {
  const p = projectDetails[projectId];
  if (!p) return;

  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (!modalOverlay || !modalBody) return;

  modalBody.innerHTML = `
    <div style="margin-bottom: 20px;">
      <span style="display:inline-block; background:var(--soft-coral); color:var(--soft-coral-text); font-weight:700; font-size:0.75rem; padding:4px 10px; border-radius:999px; margin-bottom:8px;">
        ${p.tag}
      </span>
      <h2 style="font-size: 1.5rem; font-weight:800; margin: 6px 0 12px; line-height:1.25;">${p.title}</h2>
      <p style="color: var(--color-secondary); font-size: 0.98rem; line-height: 1.65; margin-bottom: 20px;">${p.desc}</p>
    </div>

    <div style="margin-bottom: 22px;">
      <div style="font-size: 0.85rem; font-weight:800; color: var(--color-primary); margin-bottom: 10px; text-transform: uppercase; letter-spacing:0.04em;">
        Что это дает бизнесу (Результаты внедрения):
      </div>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
        ${p.highlights.map(h => `
          <li style="display: flex; gap: 10px; font-size: 0.92rem; color: var(--color-primary);">
            <span style="color: var(--cobalt-blue); font-weight:800;">✓</span> <span>${h}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div style="margin-bottom: 26px;">
      <div style="font-size: 0.85rem; font-weight:800; color: var(--color-primary); margin-bottom: 10px; text-transform: uppercase; letter-spacing:0.04em;">
        Примененные решения и инструменты:
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${p.stack.map(s => `<span class="skill-pill-white" style="font-size:0.8rem; padding:4px 10px;">${s}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 12px; flex-wrap: wrap; padding-top: 18px; border-top: 1px solid var(--color-border);">
      <a href="https://t.me/gremzaa" target="_blank" rel="noopener noreferrer" class="btn btn-blue">
        Обсудить похожее внедрение в Telegram ↗
      </a>
      ${p.github ? `
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-link-pill">
          Исходный код на GitHub →
        </a>
      ` : ''}
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

document.addEventListener('DOMContentLoaded', () => {
  initTmaSimulator();
  initCrmSimulator();
  init3DCanvasDemo();
  initProjectCalculator();

  const nav = document.querySelector('.site-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });

  const filterBtns = document.querySelectorAll('.work-filter-btn');
  const projectCards = document.querySelectorAll('.work-card');

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

  const labTabs = document.querySelectorAll('.lab-tab-btn');
  const labPanels = document.querySelectorAll('.lab-content-box');

  labTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      labTabs.forEach(t => t.classList.remove('active'));
      labPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.dataset.panel;
      document.getElementById(targetId)?.classList.add('active');
    });
  });

  const mobileBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = '';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '74px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#FAF7F2';
        navMenu.style.padding = '20px';
        navMenu.style.borderBottom = '1px solid #E8E2D8';
      }
    });
  }

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
