// Zoek alle knoppen met data-screen attribuut
// Voorbeeld: <button data-screen="highscores">
document.querySelectorAll('[data-screen]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    var schermNaam = knop.dataset.screen; // leest "highscores" of "settings" etc.
    showScreen(schermNaam);               // roept de functie hierboven aan
  });
});

// Knoppen met data-screen → navigeren naar dat scherm
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
});

