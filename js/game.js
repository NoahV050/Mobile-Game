// ── Moeilijkheidsgraden ──
const DIFF = {
  easy:   { drift: .0008, rand: .0004, max: .80, corr: .020 },
  medium: { drift: .0014, rand: .0007, max: .75, corr: .018 },
  hard:   { drift: .0022, rand: .0012, max: .70, corr: .016 }
};

// ── Spelstatus ──
let tilt      = 0;
let velocity  = 0;
let isRunning = false;
let score     = 0;
let rafId     = null;
let scoreInt  = null;
let lastTime  = 0;
let gyroVal   = 0;
let leftDown  = false;
let rightDown = false;

// ── DOM ──
const bbCanvas  = document.getElementById('barbell-canvas');
const lifterEl  = document.getElementById('lifter');
const thumbEl   = document.getElementById('balance-thumb');
const hudTime   = document.getElementById('hud-time');
const hudScore  = document.getElementById('hud-score');
const instrEl   = document.getElementById('instr-text');

function startGame() {
  tilt = velocity = score = gyroVal = 0;
  leftDown = rightDown = false;
  isRunning = false;

  showScreen('game');

  clearInterval(scoreInt);
  scoreInt = setInterval(() => {
    if (!isRunning) return;
    score++;
    hudScore.textContent = score;
    spawnScorePop();
  }, 1000);

  isRunning = true;
  lastTime  = performance.now();
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(loop);

  requestGyro();
}

function loop(now) {
  if (!isRunning) return;

  const dt = Math.min(now - lastTime, 50);
  lastTime = now;
  const p  = DIFF[settings.diff];

  // Drift (halter gaat vanzelf scheef)
  velocity += (p.drift + Math.random() * p.rand) * (Math.random() < .5 ? 1 : -1);

  // Gyroscoop
  if (settings.gyro) velocity -= gyroVal * .0006 * dt;

  // Knoppen
  if (leftDown)  velocity -= p.corr * (dt / 16);
  if (rightDown) velocity += p.corr * (dt / 16);

  velocity *= .97;
  tilt = Math.max(-1, Math.min(1, tilt + velocity * (dt / 16)));

  if (Math.abs(tilt) >= p.max) { gameOver(); return; }

  drawBarbell(bbCanvas, tilt);
  updateHUD();
  updateBalanceBar(tilt);
  updateLifter(tilt);

  rafId = requestAnimationFrame(loop);
}

function updateHUD() {
  hudTime.textContent  = score + 's';
  hudScore.textContent = score;
}

function updateBalanceBar(t) {
  const pos = ((t + 1) / 2) * (190 - 28);
  thumbEl.style.left       = pos + 'px';
  const a = Math.abs(t);
  thumbEl.style.background = a < .4 ? '#27ae60' : a < .65 ? '#e67e22' : '#c0392b';
}

function updateLifter(t) {
  lifterEl.style.transform = `rotate(${t * 12}deg)`;
  const a = Math.abs(t);
  lifterEl.textContent = a < .35 ? '🧑‍🦰' : a < .6 ? '😰' : '😱';
}

function spawnScorePop() {
  const el = document.createElement('div');
  el.className   = 'score-pop';
  el.textContent = '+1';
  el.style.left  = (80 + Math.random() * 120) + 'px';
  el.style.top   = '28%';
  document.getElementById('screen-game').appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function gameOver() {
  isRunning = false;
  clearInterval(scoreInt);
  cancelAnimationFrame(rafId);
  bbCanvas.classList.add('anim-crash');
  setTimeout(() => {
    bbCanvas.classList.remove('anim-crash');
    saveAndShowGameOver(score);
  }, 600);
}

// ── Gyroscoop ──
function requestGyro() {
  if (!settings.gyro) return;
  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(s => s === 'granted' ? listenGyro() : noGyro())
      .catch(noGyro);
  } else if (typeof DeviceOrientationEvent !== 'undefined') {
    listenGyro();
  } else {
    noGyro();
  }
}
function listenGyro() {
  instrEl.textContent = '📱 Kantel je telefoon!';
  window.addEventListener('deviceorientation', e => { if (isRunning) gyroVal = e.gamma || 0; });
}
function noGyro() { instrEl.textContent = '👆 Gebruik de knoppen!'; }

// ── Knoppen / Keyboard input ──
const btnLeft  = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
let _leftPressStart  = 0;
let _rightPressStart = 0;

function applyClickImpulse(dir) {
  const p = DIFF[settings.diff];
  // kleine, niet-te-gevoelige impuls vergelijkbaar met korte kanteling
  velocity += dir * (p.corr * 0.000000000000000000000001);
}

// Pointer / mouse / touch helpers
function bindButton(btn, dir) {
  btn.addEventListener('pointerdown', e => {
    e.preventDefault();
    if (dir < 0) { _leftPressStart = Date.now(); leftDown = true; }
    else        { _rightPressStart = Date.now(); rightDown = true; }
    btn.classList.add('pressed');
  });
  btn.addEventListener('pointerup', e => {
    e.preventDefault();
    const d = dir < 0 ? Date.now() - _leftPressStart : Date.now() - _rightPressStart;
    if (dir < 0) leftDown = false; else rightDown = false;
    btn.classList.remove('pressed');
    if (d < 160) applyClickImpulse(dir); // korte tik → impuls
  });
  btn.addEventListener('pointercancel', () => { leftDown = rightDown = false; btn.classList.remove('pressed'); });
  btn.addEventListener('pointerleave', () => { leftDown = rightDown = false; btn.classList.remove('pressed'); });
}

if (btnLeft && btnRight) {
  bindButton(btnLeft, -1);
  bindButton(btnRight, 1);
}

// Keyboard: ArrowLeft/ArrowRight and A/D
const keyMap = { 'ArrowLeft': -1, 'ArrowRight': 1, 'a': -1, 'A': -1, 'd': 1, 'D': 1 };
const _keyPressStart = {};
window.addEventListener('keydown', e => {
  const dir = keyMap[e.key];
  if (!dir) return;
  if (e.repeat) return; // houd-repeat al wordt behandeld door loop via leftDown/rightDown
  e.preventDefault();
  _keyPressStart[e.key] = Date.now();
  if (dir < 0) { leftDown = true; btnLeft && btnLeft.classList.add('pressed'); }
  else         { rightDown = true; btnRight && btnRight.classList.add('pressed'); }
});
window.addEventListener('keyup', e => {
  const dir = keyMap[e.key];
  if (!dir) return;
  e.preventDefault();
  const start = _keyPressStart[e.key] || 0;
  const dur = Date.now() - start;
  if (dir < 0) { leftDown = false; btnLeft && btnLeft.classList.remove('pressed'); }
  else         { rightDown = false; btnRight && btnRight.classList.remove('pressed'); }
  if (dur < 160) applyClickImpulse(dir);
  delete _keyPressStart[e.key];
});
