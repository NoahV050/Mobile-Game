// Wisselt het actieve scherm
function showScreen(id) {
  // Verberg ALLE schermen
  document.querySelectorAll('.screen').forEach(function(scherm) {
    scherm.classList.remove('active');
  });

  // Toon alleen het scherm dat we willen
  document.getElementById('screen-' + id).classList.add('active');
}