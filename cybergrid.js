/**
 * Data Mesh & Cyber Grid — Высокотехнологичная интерактивная топология
 * Разработано для портфолио Сергея Шаронова (E-commerce & 1C Architect)
 * 
 * Включает:
 * - Инженерную координатную сетку с микро-крестами (+)
 * - Граф узлов шины данных (брокеры очередей, 1С, WMS, API)
 * - Потоковую передачу светящихся пакетов данных
 * - Интерактивную реакцию на курсор (магнитный хаб, динамические связи)
 * - Оптимизацию 60 FPS, поддержку Retina (DPR) и энергосбережение
 */
(function () {
  'use strict';

  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = 1;

  // Интерактивное состояние курсора
  const mouse = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    active: false,
    radius: 170
  };

  // Метки архитектуры для ключевых узлов
  const NODE_LABELS = [
    '1C:ENTERPRISE',
    'QUEUE_BROKER',
    'WMS_CORE',
    'TELEGRAM_API',
    'ASYNC_STREAM',
    'REDIS_BUFFER',
    'EVENT_BUS',
    'REST_GW',
    'POSTGRES'
  ];

  let nodes = [];
  let packets = [];
  let animId = null;
  let lastTime = performance.now();

  // Настройка размеров
  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    ctx.scale(dpr, dpr);
    initNodes();
  }

  // Генерация топологии узлов
  function initNodes() {
    nodes = [];
    packets = [];

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1200;
    const nodeCount = isMobile ? 18 : isTablet ? 30 : 45;

    for (let i = 0; i < nodeCount; i++) {
      const isHub = i < 4; // 4 главных опорных хаба
      const hasLabel = i < NODE_LABELS.length && Math.random() < 0.6;
      const label = hasLabel ? NODE_LABELS[i] : null;

      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: 0,
        baseY: 0,
        vx: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.28),
        vy: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.28),
        radius: isHub ? 3.8 : Math.random() * 1.5 + 2,
        isHub,
        label,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.025,
        activity: 0
      });
    }

    // Сохраняем базовые координаты
    nodes.forEach(n => {
      n.baseX = n.x;
      n.baseY = n.y;
    });

    // Создаем начальный пул пакетов данных
    const packetCount = isMobile ? 8 : 16;
    for (let i = 0; i < packetCount; i++) {
      spawnPacket();
    }
  }

  // Запуск пакета данных по связям
  function spawnPacket() {
    if (nodes.length < 2) return;
    const fromIdx = Math.floor(Math.random() * nodes.length);
    let toIdx = Math.floor(Math.random() * nodes.length);
    if (fromIdx === toIdx) toIdx = (toIdx + 1) % nodes.length;

    const fromNode = nodes[fromIdx];
    const toNode = nodes[toIdx];
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    const dist = Math.hypot(dx, dy);

    // Запускаем только если узлы в разумной дистанции
    const maxLinkDist = width < 768 ? 130 : 170;
    if (dist < maxLinkDist && dist > 20) {
      packets.push({
        from: fromNode,
        to: toNode,
        progress: 0,
        speed: (0.007 + Math.random() * 0.009) * (reducedMotion ? 0.4 : 1),
        color: Math.random() > 0.35 ? '#38BDF8' : '#60A5FA',
        size: Math.random() > 0.5 ? 2.5 : 2
      });
    }
  }

  // Отрисовка координатной сетки с крестами (+)
  function drawGrid() {
    const gridSize = width < 768 ? 44 : 56;
    ctx.lineWidth = 1;

    // Тонкие направляющие
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
    ctx.beginPath();
    for (let x = 0; x <= width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Микро-кресты (+) на узлах координат
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    const arm = 3.5;
    ctx.beginPath();
    for (let x = gridSize; x < width; x += gridSize * 2) {
      for (let y = gridSize; y < height; y += gridSize * 2) {
        ctx.moveTo(x - arm, y);
        ctx.lineTo(x + arm, y);
        ctx.moveTo(x, y - arm);
        ctx.lineTo(x, y + arm);
      }
    }
    ctx.stroke();
  }

  // Отрисовка ореола курсора
  function drawMouseAura() {
    if (!mouse.active) return;
    
    // Плавное следование за курсором
    mouse.x += (mouse.targetX - mouse.x) * 0.15;
    mouse.y += (mouse.targetY - mouse.y) * 0.15;

    const grad = ctx.createRadialGradient(
      mouse.x, mouse.y, 0,
      mouse.x, mouse.y, mouse.radius
    );
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.09)');
    grad.addColorStop(0.5, 'rgba(37, 99, 235, 0.04)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Основной цикл анимации
  function frame(now) {
    animId = requestAnimationFrame(frame);

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    ctx.clearRect(0, 0, width, height);

    // 1. Отрисовка координатной сетки
    drawGrid();

    // 2. Ореол под курсором
    drawMouseAura();

    // 3. Обновление положения узлов
    const maxLinkDist = width < 768 ? 120 : 160;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      // Отскок от границ
      if (n.x < 10) { n.x = 10; n.vx *= -1; }
      else if (n.x > width - 10) { n.x = width - 10; n.vx *= -1; }
      if (n.y < 10) { n.y = 10; n.vy *= -1; }
      else if (n.y > height - 10) { n.y = height - 10; n.vy *= -1; }

      // Пульсация активности
      n.pulsePhase += n.pulseSpeed;
      if (n.activity > 0) n.activity -= dt * 1.5;

      // Взаимодействие с курсором
      if (mouse.active) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.08;
          n.x += dx * force;
          n.y += dy * force;
          n.activity = Math.max(n.activity, (1 - dist / mouse.radius));

          // Связь мыши с узлом
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / mouse.radius) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }
    }

    // 4. Отрисовка связей графа
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const na = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const nb = nodes[j];
        const dx = nb.x - na.x;
        const dy = nb.y - na.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxLinkDist) {
          const alpha = (1 - dist / maxLinkDist) * 0.18;
          const boost = Math.max(na.activity, nb.activity) * 0.25;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha + boost})`;
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.stroke();
        }
      }
    }

    // 5. Отрисовка пакетов данных (Streaming Queue Pulses)
    ctx.save();
    ctx.shadowBlur = 6;
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.progress += p.speed;

      if (p.progress >= 1) {
        p.to.activity = 1.0;
        packets.splice(i, 1);
        spawnPacket();
        continue;
      }

      const px = p.from.x + (p.to.x - p.from.x) * p.progress;
      const py = p.from.y + (p.to.y - p.from.y) * p.progress;

      ctx.shadowColor = p.color;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 6. Отрисовка самих узлов и меток
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const pulse = Math.sin(n.pulsePhase) * 0.5 + 0.5;
      const currentRadius = n.radius + pulse * 0.8 + n.activity * 1.5;

      // Внешний ореол узла
      ctx.fillStyle = n.isHub 
        ? `rgba(37, 99, 235, ${0.18 + pulse * 0.15 + n.activity * 0.3})`
        : `rgba(56, 189, 248, ${0.12 + pulse * 0.12 + n.activity * 0.25})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, currentRadius * 2.4, 0, Math.PI * 2);
      ctx.fill();

      // Ядро узла
      ctx.fillStyle = n.isHub ? '#60A5FA' : (n.activity > 0.4 ? '#38BDF8' : '#CBD5E1');
      ctx.beginPath();
      ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // Микро-лейбл в моноширинном шрифте
      if (n.label && width >= 860) {
        ctx.font = '500 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = `rgba(163, 179, 205, ${0.45 + pulse * 0.25 + n.activity * 0.4})`;
        ctx.fillText(n.label, n.x + currentRadius + 5, n.y + 3);
      }
    }

    // Если пакетов стало мало, докидываем
    if (packets.length < (width < 768 ? 6 : 14) && Math.random() < 0.08) {
      spawnPacket();
    }
  }

  // Слушатели событий курсора
  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
    if (!mouse.active) {
      mouse.x = mouse.targetX;
      mouse.y = mouse.targetY;
      mouse.active = true;
    }
  }

  function onMouseLeave() {
    mouse.active = false;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);

  // Тач-устройства
  function onTouchMove(e) {
    if (!e.touches || !e.touches[0]) return;
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = e.touches[0].clientX - rect.left;
    mouse.targetY = e.touches[0].clientY - rect.top;
    if (!mouse.active) {
      mouse.x = mouse.targetX;
      mouse.y = mouse.targetY;
      mouse.active = true;
    }
  }
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchend', onMouseLeave, { passive: true });

  // Энергосбережение при сворачивании вкладки
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (animId) cancelAnimationFrame(animId);
      animId = null;
    } else {
      if (!animId) {
        lastTime = performance.now();
        animId = requestAnimationFrame(frame);
      }
    }
  });

  // Ресайз с троттлингом
  let resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 100);
  }, { passive: true });

  // Старт
  resize();
  animId = requestAnimationFrame(frame);
})();
