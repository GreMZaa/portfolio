/**
 * Data Mesh & Industrial Topology — Архитектурная координатная сеть
 * Разработано для портфолио Сергея Шаронова (E-commerce & 1C Architect)
 * 
 * Эстетика: Industrial Engineering & High-Precision Commerce
 * Цвета: Чистый нейтральный графит, титановый белый и сигнальный индустриальный янтарь (#FF5500).
 * Никаких синих/изумрудных градиентов и дешевых неонов.
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
    radius: 180
  };

  // Метки распределенной архитектуры
  const NODE_LABELS = [
    '1C:ENTERPRISE_8.3',
    'QUEUE_BROKER',
    'WMS_DISPATCH',
    'TELEGRAM_GATEWAY',
    'ASYNC_STREAM',
    'REDIS_BUFFER',
    'EVENT_BUS',
    'REST_SYNC',
    'POSTGRES_CORE'
  ];

  let nodes = [];
  let packets = [];
  let animId = null;
  let lastTime = performance.now();

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

  function initNodes() {
    nodes = [];
    packets = [];

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1200;
    const nodeCount = isMobile ? 18 : isTablet ? 30 : 44;

    for (let i = 0; i < nodeCount; i++) {
      const isHub = i < 4; // 4 главных опорных хаба
      const hasLabel = i < NODE_LABELS.length && Math.random() < 0.65;
      const label = hasLabel ? NODE_LABELS[i] : null;

      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: 0,
        baseY: 0,
        vx: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.25),
        vy: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.25),
        radius: isHub ? 3.5 : Math.random() * 1.4 + 2,
        isHub,
        label,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.025,
        activity: 0
      });
    }

    nodes.forEach(n => {
      n.baseX = n.x;
      n.baseY = n.y;
    });

    const packetCount = isMobile ? 8 : 15;
    for (let i = 0; i < packetCount; i++) {
      spawnPacket();
    }
  }

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

    const maxLinkDist = width < 768 ? 130 : 170;
    if (dist < maxLinkDist && dist > 25) {
      packets.push({
        from: fromNode,
        to: toNode,
        progress: 0,
        speed: (0.007 + Math.random() * 0.009) * (reducedMotion ? 0.4 : 1),
        color: Math.random() > 0.4 ? '#FF5500' : '#FFA860',
        size: Math.random() > 0.5 ? 2.5 : 2
      });
    }
  }

  // Отрисовка точной инженерной сетки с микро-крестами (+)
  function drawGrid() {
    const gridSize = width < 768 ? 44 : 56;
    ctx.lineWidth = 1;

    // Тонкие координатные линии
    ctx.strokeStyle = 'rgba(24, 24, 27, 0.045)';
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
    ctx.strokeStyle = 'rgba(24, 24, 27, 0.14)';
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

  // Деликатный световой акцент под курсором
  function drawMouseAura() {
    if (!mouse.active) return;
    
    mouse.x += (mouse.targetX - mouse.x) * 0.15;
    mouse.y += (mouse.targetY - mouse.y) * 0.15;

    const grad = ctx.createRadialGradient(
      mouse.x, mouse.y, 0,
      mouse.x, mouse.y, mouse.radius
    );
    grad.addColorStop(0, 'rgba(255, 85, 0, 0.07)');
    grad.addColorStop(0.5, 'rgba(255, 85, 0, 0.02)');
    grad.addColorStop(1, 'rgba(250, 248, 245, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function frame(now) {
    animId = requestAnimationFrame(frame);

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    ctx.clearRect(0, 0, width, height);

    drawGrid();
    drawMouseAura();

    const maxLinkDist = width < 768 ? 120 : 160;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 10) { n.x = 10; n.vx *= -1; }
      else if (n.x > width - 10) { n.x = width - 10; n.vx *= -1; }
      if (n.y < 10) { n.y = 10; n.vy *= -1; }
      else if (n.y > height - 10) { n.y = height - 10; n.vy *= -1; }

      n.pulsePhase += n.pulseSpeed;
      if (n.activity > 0) n.activity -= dt * 1.5;

      if (mouse.active) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.08;
          n.x += dx * force;
          n.y += dy * force;
          n.activity = Math.max(n.activity, (1 - dist / mouse.radius));

          // Связь мыши с узлом (сигнальный янтарный импульс)
          ctx.strokeStyle = `rgba(255, 85, 0, ${(1 - dist / mouse.radius) * 0.45})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }
    }

    // Связи между узлами
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
          const boost = Math.max(na.activity, nb.activity);
          
          if (boost > 0.1) {
            ctx.strokeStyle = `rgba(255, 85, 0, ${alpha + boost * 0.35})`;
          } else {
            ctx.strokeStyle = `rgba(24, 24, 27, ${alpha * 0.55})`;
          }
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.stroke();
        }
      }
    }

    // Пакеты данных (Streaming Queue Pulses)
    ctx.save();
    ctx.shadowBlur = 4;
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

    // Узлы и архитектурные метки
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const pulse = Math.sin(n.pulsePhase) * 0.5 + 0.5;
      const currentRadius = n.radius + pulse * 0.6 + n.activity * 1.4;

      // Ореол узла
      ctx.fillStyle = n.isHub 
        ? `rgba(255, 85, 0, ${0.16 + pulse * 0.15 + n.activity * 0.3})`
        : `rgba(24, 24, 27, ${0.05 + pulse * 0.05 + n.activity * 0.15})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, currentRadius * 2.3, 0, Math.PI * 2);
      ctx.fill();

      // Ядро узла
      ctx.fillStyle = n.isHub ? '#FF5500' : (n.activity > 0.4 ? '#FF7722' : '#71717A');
      ctx.beginPath();
      ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // Моноширинная метка узла
      if (n.label && width >= 860) {
        ctx.font = '600 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = `rgba(39, 39, 42, ${0.65 + pulse * 0.2 + n.activity * 0.25})`;
        ctx.fillText(n.label, n.x + currentRadius + 5, n.y + 3);
      }
    }

    if (packets.length < (width < 768 ? 6 : 13) && Math.random() < 0.08) {
      spawnPacket();
    }
  }

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

  let resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 100);
  }, { passive: true });

  resize();
  animId = requestAnimationFrame(frame);
})();
