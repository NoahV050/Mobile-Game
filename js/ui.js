// Wisselt het actieve scherm
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(scherm) {
    scherm.classList.remove('active');
  });
  document.getElementById('screen-' + id).classList.add('active');
}


if (id === 'highscores') {
    toonHighscores();
    }

// Haal de naam op uit localStorage
// Als er nog geen naam is, vraag het dan
var spelerNaam = localStorage.getItem('spelerNaam');

if (spelerNaam === null) {
  spelerNaam = prompt('Wat is je naam?');
  localStorage.setItem('spelerNaam', spelerNaam);
}

function getScores() {
    try {
        return JSON.parse(localStorage.getItem('gymbalance.hs')) || [];
    } catch {
        return [];
    }
}

    // Score opslaan
    function saveScore(score, naam) {
        var scores = getScores();
        scores.push({ score: score, naam: naam });
        scores.sort(function(a, b) { return b.score - a.score; });
        scores = scores.slice(0, 5); // Bewaar alleen de top 5
        localStorage.setItem('gymbalance.hs', JSON.stringify(scores));
    }

    // Highscores tonen
    function toonHighscores() {
        var scores = getScores();
        var lijst = document.getElementById('hs-list');
        
        if (scores.length === 0) {
            lijst.innerHTML = '<li>Geen scores gevonden</li>';
            return;
        }

    }
    
    // medals top 5
    var medals = ['🥇', '🥈', '🥉', '🏅', '🏅'];

    list.innerHTML = "";
    
    scores.forEach(function(item, i) {
        list.innerHTML += 
        '<div class="hhs-row">' +
                '<div class="hs-rank">' + medals[i] + '</div>' +
        '<div class="hs-name">' + item.naam + '</div>' +
        '<div class="hs-pts">' + item.score + 's</div>' +
      '</div>';
  });