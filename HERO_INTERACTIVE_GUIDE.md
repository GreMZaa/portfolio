# Интерактивный Hero для Сергея Шаронова
## Практическое руководство по созданию живого 3D/AI-интро в стиле Sri Tech

> **Концепция:** В главном экране (Hero) сидит персонаж (Сергей Шаронов) за рабочим ноутбуком. Он реагирует на положение курсора:
> - Курсор слева $\rightarrow$ Сергей поворачивается влево и появляется контекстный вопрос про автоматизацию и склады.
> - Курсор справа $\rightarrow$ Сергей поворачивается вправо и появляется вопрос про Telegram Mini Apps и чекаут.
> - Курсор по центру $\rightarrow$ Сергей поднимает взгляд прямо на посетителя, приветствует и жестом указывает вниз на кейсы с окупаемостью.

---

## ШАГ 1. Генерация персонажа и видеоряда (AI Video Generation)

Необходимо сгенерировать **одно непрерывное видео (5–8 секунд)** со строго фиксированной камерой (camera locked, no pan, no zoom).

### Вариант А: Использовать реальное фото Сергея (Image-to-Video)
Берем качественное портретное фото Сергея и анимируем в нейросети (**Kling AI 1.5**, **Runway Gen-3 Alpha**, **Luma Dream Machine** или **Hailuo Minimax**).

#### Промпт для первого кадра (если генерируете сначала изображение в Midjourney v6):
```text
Medium shot of a handsome 26-year-old European male entrepreneur, short clean dark brown hair, wearing a premium minimal dark graphite crewneck sweatshirt, sitting at a clean wooden desk with a modern open silver laptop in front of him. Soft cinematic studio key light, dark-to-light neutral background with subtle soft backlight glow. Professional, confident, focused, hyper-realistic, 8k resolution, photorealistic texture --ar 16:9 --style raw --v 6.1
```

#### Промпт для генерации движения (Prompt for Kling / Runway / Luma):
```text
Locked-off stationary camera, no zoom, no camera movement. A young male tech builder sitting at a desk with an open modern laptop. 
Action sequence in one smooth continuous take:
1. He is typing focused on his laptop.
2. He pauses, smoothly turns his head to look curiously to the left side of the frame for a moment.
3. He smoothly turns his head to look to the right side of the frame.
4. He turns his head back to the center, looks directly into the camera lens with a warm, confident smile.
5. He raises his right hand in a friendly confident greeting wave, then smoothly points his hand downward toward the bottom of the frame, inviting the viewer to scroll down.
Natural human motion, consistent character, clean lighting, 4k photorealistic.
```

> 💡 **Совет по съемке реального видео (Альтернатива без нейросетей):**
> Можно снять на телефон со штатива себя самого (Сергея) ровно по этому сценарию за 2 минуты:
> 1. Сидите за столом с ноутбуком, печатаете 2 секунды.
> 2. Повернули голову налево (пауза 1.5 сек).
> 3. Повернули голову направо (пауза 1.5 сек).
> 4. Посмотрели в камеру, улыбнулись, приветственный жест рукой и плавный жест пальцем вниз.
> Реальное видео смотрится еще дороже и вызывает 100% доверие!

---

## ШАГ 2. Нарезка видео на кадры (Video $\rightarrow$ Optimized WebP Frames)

Для плавной интерактивности в браузере видео конвертируется в секвенцию кадров (WebP). Это обеспечивает мгновенный отклик на мышь без лагов и задержек сетевой буферизации видеоплеера.

Готовый скрипт на Python:
```python
import cv2
import os

video_path = "sergey_hero_raw.mp4"
output_dir = "assets/hero_frames"
os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)

print(f"Total frames: {total_frames}, FPS: {fps}")

# Целевой размер для десктопа (ширина 800-1000px достаточно для центральной колонки)
TARGET_WIDTH = 900
frame_idx = 0
saved_count = 0

# Сохраняем, например, каждый 2-й кадр, если видео 60 fps (для веба оптимально 24-30 fps)
STEP = 1

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    if frame_idx % STEP == 0:
        h, w = frame.shape[:2]
        new_h = int(h * (TARGET_WIDTH / w))
        resized = cv2.resize(frame, (TARGET_WIDTH, new_h), interpolation=cv2.INTER_AREA)
        
        # Сохранение в легковесный WebP (качество 82)
        out_filename = os.path.join(output_dir, f"frame_{saved_count:04d}.webp")
        cv2.imwrite(out_filename, resized, [cv2.IMWRITE_WEBP_QUALITY, 82])
        saved_count += 1
        
    frame_idx += 1

cap.release()
print(f"Готово! Сохранено {saved_count} оптимизированных кадров в {output_dir}")
```

### Разметка таймлайна кадров:
Запишите номера кадров для каждого состояния:
- `IDLE_RANGE`: кадры `0` – `24` (работает за ноутбуком)
- `LOOK_LEFT_RANGE`: кадры `25` – `50` (поворот и взгляд влево)
- `LOOK_RIGHT_RANGE`: кадры `51` – `75` (поворот и взгляд вправо)
- `CENTER_GREET_RANGE`: кадры `76` – `120` (взгляд в камеру, приветствие)
- `POINT_DOWN_RANGE`: кадры `121` – `150` (жест вниз)

---

## ШАГ 3. Адаптированный промпт для Claude / Разработчика

Если вы передаете задачу в чат или хотите применить этот промпт, вот готовая формулировка под ваш сайт:

```markdown
Внедри интерактивный Hero с анимацией персонажа по положению курсора (по паттерну Sri Tech) в текущий проект портфолио Сергея Шаронова.

СТЕК И ТРЕБОВАНИЯ:
- Использовать текущий Vanilla JS (ES Modules) и HTML/CSS без сторонних тяжелых библиотек.
- Анимация кадров через HTML5 Canvas и requestAnimationFrame с плавным lerp-сглаживанием.
- Предзагрузка кадров (preloader) с отображением первого кадра до завершения загрузки остальных.

ЗОНЫ ИНТЕРАКТИВА (3 горизонтальные зоны):
1. ЛЕВАЯ ЗОНА (курсор в левых 30% экрана):
   - Персонаж плавно поворачивается влево.
   - Появляется аккуратный контекстный бабл: 
     «Смотрите складскую логистику или 1С?»
   - Удержание состояния 2.5 секунды, затем плавный возврат к работе за ноутбуком.

2. ПРАВАЯ ЗОНА (курсор в правых 30% экрана):
   - Персонаж плавно поворачивается вправо.
   - Появляется контекстный бабл:
     «Нужен Telegram Mini App или быстрый чекаут?»
   - Удержание состояния 2.5 секунды, затем плавный возврат.

3. ЦЕНТРАЛЬНАЯ ЗОНА (курсор в центральных 40% экрана):
   - Главная реакция знакомства: Сергей смотрит прямо на посетителя, приветствует и жестом указывает вниз.
   - Бабл над персонажем:
     «Привет! Я Сергей Шаронов 👋»
     «Смотрите окупаемые кейсы ниже ↓»

ИНТЕРФЕЙС И ТЕКСТЫ:
- Слева от персонажа:
  «Сергей Шаронов»
  «Builder & Партнер для бизнеса»
  Подсказка: «Двигайте курсор по экрану ↗»
- Внизу персонажа:
  Плавная стрелка-индикатор скролла к секциям работ.

МОБИЛЬНАЯ ВЕРСИЯ:
- Отключить интерактивные зоны курсора (нет мыши).
- При первом скролле или тапе по экрану персонаж однократно проигрывает приветствие и указывает вниз.
- Сохранять правильные пропорции, персонаж и ноутбук не обрезаются.
```

---

## ШАГ 4. Схема внедрения в текущий `index.html` и `main.js`

### HTML структура:
```html
<section id="hero-interactive" class="hero-interactive-zone">
  <!-- 3 невидимые интерактивные зоны для курсора -->
  <div class="cursor-zone zone-left" data-zone="left"></div>
  <div class="cursor-zone zone-center" data-zone="center"></div>
  <div class="cursor-zone zone-right" data-zone="right"></div>

  <!-- Контекстные облачка реплик -->
  <div class="interactive-speech-bubble bubble-left" id="bubble-left">
    <span>Смотрите складскую логистику или 1С?</span>
  </div>
  <div class="interactive-speech-bubble bubble-right" id="bubble-right">
    <span>Нужен Telegram Mini App или чекаут?</span>
  </div>
  <div class="interactive-speech-bubble bubble-center" id="bubble-center">
    <strong>Привет! Я Сергей Шаронов</strong>
    <span>Смотрите кейсы с окупаемостью ниже ↓</span>
  </div>

  <!-- Холст для отрисовки кадров персонажа -->
  <div class="character-canvas-container">
    <canvas id="hero-character-canvas" width="900" height="600"></canvas>
  </div>
</section>
```

### JS логика контроллера кадров (`hero-interactive.js`):
```javascript
// Контроллер воспроизведения кадров по зонам с lerp-интерполяцией
class HeroCharacterController {
  constructor(canvasId, totalFrames, ranges) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.totalFrames = totalFrames;
    this.ranges = ranges; // { idle: [0, 24], left: [25, 50], right: [51, 75], center: [76, 150] }
    
    this.frames = [];
    this.currentFrame = 0;
    this.targetFrame = 0;
    this.activeZone = 'idle';
    this.timeoutId = null;

    this.preloadFrames();
    this.initCursorZones();
    this.animate();
  }

  preloadFrames() {
    for (let i = 0; i < this.totalFrames; i++) {
      const img = new Image();
      const num = String(i).padStart(4, '0');
      img.src = `assets/hero_frames/frame_${num}.webp`;
      this.frames.push(img);
    }
  }

  setZone(zone) {
    if (this.activeZone === zone) return;
    this.activeZone = zone;
    clearTimeout(this.timeoutId);

    // Устанавливаем целевой диапазон кадров
    if (zone === 'left') {
      this.targetFrame = this.ranges.left[1];
      this.showBubble('bubble-left');
      this.timeoutId = setTimeout(() => this.setZone('idle'), 2500);
    } else if (zone === 'right') {
      this.targetFrame = this.ranges.right[1];
      this.showBubble('bubble-right');
      this.timeoutId = setTimeout(() => this.setZone('idle'), 2500);
    } else if (zone === 'center') {
      this.targetFrame = this.ranges.center[1];
      this.showBubble('bubble-center');
    } else {
      this.targetFrame = this.ranges.idle[0];
      this.hideAllBubbles();
    }
  }

  animate() {
    // Плавное движение к целевому кадру через lerp
    this.currentFrame += (this.targetFrame - this.currentFrame) * 0.12;
    const rounded = Math.round(this.currentFrame);
    
    if (this.frames[rounded] && this.frames[rounded].complete) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.frames[rounded], 0, 0, this.canvas.width, this.canvas.height);
    }

    requestAnimationFrame(() => this.animate());
  }
}
```
