/**
 * Portfolio Interactive Logic - Sergey Sharonov
 * Operator-Turned-Builder • Business Partner
 */

const projectDetails = {
  'balance-food': {
    title: 'Telegram Mini App для локального заведения доставки еды',
    tag: 'TMA • Замена агрегаторов доставки',
    desc: 'Замена Яндекс.Еды и других сервисов доставки с их комиссией 20–35% на собственную витрину внутри Telegram. Гость заказывает без скачивания приложений прямо в чате за 30 секунд. Заказы мгновенно уходят на кухню, а база клиентов сохраняется у заведения для повторных продаж.',
    stack: ['Telegram Mini App', 'Быстрый чекаут без регистрации', 'Зоны доставки на карте', 'AI-подбор рациона', 'Автоуведомления кухни и гостя'],
    highlights: [
      'Экономия до 35% маржи с каждого чека — 0% сторонних комиссий',
      'База клиентов остается у бизнеса: прямой контакт для бесплатных повторных рассылок',
      'Оформление заказа за 30 секунд с автосохранением адреса гостя',
      'AI-консультант меню помогает выбрать подходящий рацион и увеличивает средний чек'
    ],
    github: 'https://github.com/GreMZaa/balance-food'
  },
  'cdek-crm': {
    title: 'Складская система маркировки и трекинга отправлений',
    tag: 'Склад & Логистика • Исключение ошибок комплектации',
    desc: 'Система адресного учета товаров, мгновенной генерации штрихкодов Code128 и печати термонаклеек и накладных в PDF. Исключает человеческий фактор при сборке и отгрузке, контролирует складские остатки.',
    stack: ['Генерация штрихкодов Code128', 'Экспорт накладных в PDF', 'Адресный учет ячеек', 'Интеграция со СДЭК API'],
    highlights: [
      'Сокращение времени сборки заказа в 3 раза за счет быстрой печати наклеек',
      'Ноль пересортов: сверка штрихкода перед отправкой исключает возвраты и штрафы',
      'Автоматическое информирование покупателей о трек-номере',
      'Полная прозрачность остатков по ячейкам склада в реальном времени'
    ],
    github: 'https://github.com/GreMZaa/cdek-warehouse-ai-crm'
  },
  '1c-b2b': {
    title: 'B2B Каталог и сквозная синхронизация с 1С:Предприятие',
    tag: '1C Интеграция • Каталог 100 000+ товаров',
    desc: 'Интеграционный шлюз номенклатуры спортивных товаров: автоматический парсинг сотен тысяч позиций, характеристик и складских остатков по филиалам без тормозов и зависаний витрины.',
    stack: ['1C:Предприятие', 'Потоковый парсинг XML без утечек памяти', 'Синхронизация цен и остатков', 'Фасетный поиск'],
    highlights: [
      'Отказоустойчивая обработка больших фидов (100k+ SKU) без подвисания сайта',
      'Фоновая синхронизация остатков: исключены заказы отсутствующих товаров',
      'Моментальный поиск по фильтрам для оптовых клиентов',
      'Экономия десятков часов ручного труда операторов контента'
    ],
    github: 'https://github.com/GreMZaa/33sport-prototype'
  },
  'ai-da-umnichka': {
    title: 'Веб-сервис детского центра: запись и сбор лидов',
    tag: 'E-Commerce & Лидген • 100/100 Google PageSpeed',
    desc: 'Легкий и быстрый сайт детского развивающего центра. Полная оптимизация скорости загрузки (100 баллов PageSpeed), мгновенный отклик на смартфонах и прямая маршрутизация заявок в Telegram.',
    stack: ['100/100 PageSpeed Performance', 'Интуитивная онлайн-запись', 'Маршрутизация заявок в Telegram', 'Mobile-First'],
    highlights: [
      '100 из 100 баллов скорости Google Lighthouse: мгновенная загрузка даже на слабом 3G',
      'Удобная форма записи на пробные занятия с высокой конверсией в заявку',
      'Прямая отправка уведомлений администраторам в Telegram без задержек'
    ],
    github: 'https://github.com/GreMZaa/ai-da-umnichka'
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
      <span style="display:inline-block; background:#EFF6FF; color:#2563EB; font-weight:700; font-size:0.75rem; padding:4px 10px; border-radius:999px; margin-bottom:8px;">
        ${p.tag}
      </span>
      <h2 style="font-size: 1.5rem; font-weight:800; margin: 6px 0 12px; line-height:1.25; color:#18181B;">${p.title}</h2>
      <p style="color: #52525B; font-size: 0.95rem; line-height: 1.65; margin-bottom: 20px;">${p.desc}</p>
    </div>

    <div style="margin-bottom: 22px;">
      <div style="font-size: 0.85rem; font-weight:800; color: #18181B; margin-bottom: 10px; text-transform: uppercase; letter-spacing:0.04em;">
        Что это дает бизнесу (Результаты внедрения):
      </div>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
        ${p.highlights.map(h => `
          <li style="display: flex; gap: 10px; font-size: 0.92rem; color: #18181B;">
            <span style="color: #2563EB; font-weight:800;">✓</span> <span>${h}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div style="margin-bottom: 26px;">
      <div style="font-size: 0.85rem; font-weight:800; color: #18181B; margin-bottom: 10px; text-transform: uppercase; letter-spacing:0.04em;">
        Примененные решения:
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${p.stack.map(s => `<span style="background:#F4F4F5; color:#18181B; font-weight:600; font-size:0.8rem; padding:4px 10px; border-radius:999px;">${s}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 12px; flex-wrap: wrap; padding-top: 18px; border-top: 1px solid #E4E4E7;">
      <a href="https://t.me/gremzaa" target="_blank" rel="noopener noreferrer" class="btn-blue-pill" style="font-size:0.88rem; padding:10px 20px;">
        Обсудить внедрение в Telegram ↗
      </a>
      ${p.github ? `
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn-clean-link" style="align-self:center;">
          Репозиторий на GitHub →
        </a>
      ` : ''}
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
});
