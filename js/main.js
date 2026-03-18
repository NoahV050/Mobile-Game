var audio = new AudioContext();

function speelKlik() {
  var toon = audio.createOscillator();
  toon.connect(audio.destination);
  toon.frequency.value = 0;
  toon.start();
  toon.stop(audio.currentTime + 0.08);
}

function gameOver(score) {
  saveAndShowGameOver(score);
}

function trillen() {
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
}

document.querySelectorAll('[data-screen]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    speelKlik();
    showScreen(knop.dataset.screen);
  });
});

document.querySelectorAll('[data-action]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    if (knop.dataset.action === 'startGame') {
      speelKlik();
      showScreen('game');
    }
  });
});

// een eventlistener op de modus knop
document.querySelector('[data-action="modus knop"]').addEventListener('click', function() {
  document.body.classList.toggle("licht");
});
