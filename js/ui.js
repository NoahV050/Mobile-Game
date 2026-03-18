// Wisselt het actieve scherm
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(scherm) {
    scherm.classList.remove('active');
  });
  document.getElementById('screen-' + id).classList.add('active');
}