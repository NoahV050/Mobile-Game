// De geluidsmachine
var audio = new AudioContext();

// Speelt een klik geluid
function speelKlik() {
  var toon = audio.createOscillator();
  toon.connect(audio.destination);
  toon.frequency.value = 0;
  toon.start();
  toon.stop(audio.currentTime + 0.08);
}

// Trilling bij game over
function trillen() {
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
}

// Knoppen met data-screen → naar dat scherm
document.querySelectorAll('[data-screen]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    speelKlik();
    showScreen(knop.dataset.screen);
  });
});

// Knoppen met data-action → voer actie uit
document.querySelectorAll('[data-action]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    if (knop.dataset.action === 'startGame') {
      speelKlik();
      startGame();
    }
    if (knop.dataset.action === 'modus knop') {
      document.body.classList.toggle('licht');
    }
  });
});

document.getElementById('knop-exit').addEventListener('click', function() {
  spelLoopt = false;
  clearInterval(scoreTimer);
  cancelAnimationFrame(animatieId);
  showScreen('start');
});