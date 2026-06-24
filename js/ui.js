// ── Schermnavigatie ──
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  if (id === 'highscores') renderHighscores();
  if (id === 'start')      updateStartBest();
}

// ── Highscores (localStorage) ──
const HS_KEY = 'gymbalance_hs';

function getScores() {
  try { return JSON.parse(localStorage.getItem(HS_KEY)) || []; } catch { return []; }
}

function saveAndShowGameOver(sec) {
  const scores = getScores();
  scores.push(sec);
  scores.sort((a, b) => b - a);
  const top = scores.slice(0, 5);
  localStorage.setItem(HS_KEY, JSON.stringify(top));

  document.getElementById('go-score').textContent    = sec + 's';
  document.getElementById('go-best-val').textContent = top[0] + 's';
  document.getElementById('go-new-record').classList.toggle('show', sec === top[0]);
  showScreen('gameover');
}

function renderHighscores() {
  const scores = getScores();
  const list   = document.getElementById('hs-list');
  if (!scores.length) {
    list.innerHTML = '<div class="hs-empty">Nog geen scores!<br>Ga spelen 🏋️</div>';
    return;
  }
  const ranks = ['🥇','🥈','🥉','4.','5.'];
  list.innerHTML = scores.map((s, i) => `
    <div class="hs-row" style="animation-delay:${i * .07}s">
      <div class="hs-rank">${ranks[i]}</div>
      <div class="hs-name">Jij</div>
      <div class="hs-pts">${s}s</div>
    </div>`).join('');
}

function updateStartBest() {
  const s = getScores();
  document.getElementById('start-best-val').textContent = (s[0] || 0) + 's';
}

// ── Instellingen ──
const settings = { gyro: true, diff: 'easy' };

function toggleSetting(key) {
  settings[key] = !settings[key];
  document.getElementById('toggle-' + key).classList.toggle('on', settings[key]);
}

function setDiff(d) {
  settings.diff = d;
  document.querySelectorAll('.diff-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.diff === d));
}
