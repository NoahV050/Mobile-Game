// Knoppen met data-screen gaan naar dat scherm
document.querySelectorAll('[data-screen]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    showScreen(knop.dataset.screen);
  });
});

// Knoppen met data-action voeren een actie uit
document.querySelectorAll('[data-action]').forEach(function(knop) {
  knop.addEventListener('click', function() {
    if (knop.dataset.action === 'startGame') {
      showScreen('game');
    }
  });
});
