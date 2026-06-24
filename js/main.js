<<<<<<< HEAD
// Zoek alle knoppen met data-screen attribuut
// Voorbeeld: <button data-screen="highscores">
document.querySelectorAll('[data-screen]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    var schermNaam = knop.dataset.screen; // leest "highscores" of "settings" etc.
    showScreen(schermNaam);               // roept de functie hierboven aan
  });
});

// Knoppen met data-screen → navigeren naar dat scherm
=======
// De geluidsmachine
var audio = new AudioContext();

// Speelt een klik geluid
function speelKlik() {
  var toon = audio.createOscillator();
  toon.connect(audio.destination);
  toon.frequency.value = 0; // was 0, daarom geen geluid
  toon.start();
  toon.stop(audio.currentTime + 0.08);
}

// Game over functie
function gameOver(score) {
  saveAndShowGameOver(score);
}

// Trilling bij game over
function trillen() {
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
}

// Knoppen met data-screen → naar dat scherm
>>>>>>> main
document.querySelectorAll('[data-screen]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    showScreen(knop.dataset.screen);
  });
});

// Knoppen met data-action → voer die actie uit
document.querySelectorAll('[data-action]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    if (knop.dataset.action === 'startGame') {
      startGame();
    }
  });
<<<<<<< HEAD
});// Knoppen met data-screen → navigeren naar dat scherm
document.querySelectorAll('[data-screen]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    showScreen(knop.dataset.screen);
  });
});

// Knoppen met data-action → voer die actie uit
document.querySelectorAll('[data-action]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    if (knop.dataset.action === 'startGame') {
      startGame();
    }
  });
=======
>>>>>>> main
});

