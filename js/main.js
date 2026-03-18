<<<<<<< Updated upstream
=======
// Knoppen met data-action voeren een actie uit
document.querySelectorAll('[data-action]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    if (knop.dataset.action === 'startGame') {
      showScreen('game');
    }
  });
});

// De geluidsmachine - maak je 1x aan bovenaan
var audio = new AudioContext();


// Geef aan wanneer de game klaar is 
function gameOver(score) {
  saveAndShowGameOver(score);
}

// Wanneer game over is laat telefoon trillen (indien ondersteund)
function trillen() {
  if (navigator.vibrate) {
    navigator.vibrate(200); 
  }
}

// De functie die een toon speelt
function speelKlik() {
  var toon = audio.createOscillator();
  toon.connect(audio.destination);
  toon.frequency.value = 0; // hoe hoger het getal, hoe hoger de toon
  toon.start();
  toon.stop(audio.currentTime + 0.08);
}

// En dan roep je hem aan bij elke klik
document.querySelectorAll('[data-screen]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    speelKlik(); // ← dit voeg je toe
    showScreen(knop.dataset.screen);
  });
});

document.body.classList.toggle("licht");

// een eventlistener op de modus knop
document.querySelector('[data-action="modus knop"]').addEventListener('click', function() {
  document.body.classList.toggle("licht");
});
>>>>>>> Stashed changes
