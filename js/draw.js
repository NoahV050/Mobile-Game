// ── Barbell tekenen ──
function drawBarbell(canvas, tiltValue) {
  const ctx  = canvas.getContext('2d');
  const W    = canvas.clientWidth  || 300;
  const H    = canvas.clientHeight || 90;

  // DPI scaling (eenmalig)
  if (!canvas._scaled) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);
    canvas._scaled = true;
  }

  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(tiltValue * 28 * Math.PI / 180);

  const barW = 180, barH = 11;
  const wW   = 34,  wH  = 68;

  // Stang
  const barGrad = ctx.createLinearGradient(0, -barH/2, 0, barH/2);
  barGrad.addColorStop(0,   '#d0dae3');
  barGrad.addColorStop(0.4, '#b0b8c1');
  barGrad.addColorStop(1,   '#8899a8');
  ctx.fillStyle = barGrad;
  ctx.beginPath();
  ctx.roundRect(-barW/2, -barH/2, barW, barH, 5);
  ctx.fill();

  // Klemmen
  ctx.fillStyle = '#777';
  [[-barW/2 - 5], [barW/2 - 5]].forEach(([x]) => {
    ctx.beginPath();
    ctx.roundRect(x, -barH/2 - 2, 10, barH + 4, 3);
    ctx.fill();
  });

  // Gewichten (links + rechts)
  [-1, 1].forEach(side => {
    const gx = side === -1 ? -barW/2 - wW - 4 : barW/2 + 4;
    const g  = ctx.createLinearGradient(gx, 0, gx + wW, 0);
    g.addColorStop(0,   side === -1 ? '#222' : '#2a2a2a');
    g.addColorStop(0.5, '#3a3a3a');
    g.addColorStop(1,   side === -1 ? '#2a2a2a' : '#222');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(gx, -wH/2, wW, wH, 7);
    ctx.fill();

    // Ribbels op gewicht
    ctx.strokeStyle = 'rgba(255,255,255,.07)';
    ctx.lineWidth = 2;
    for (let y = -wH/2 + 12; y < wH/2 - 8; y += 12) {
      ctx.beginPath();
      ctx.moveTo(gx + 4,    y);
      ctx.lineTo(gx + wW - 4, y);
      ctx.stroke();
    }
  });

  // Handen
  ctx.fillStyle = '#c8a07a';
  [-48, 48].forEach(x => {
    ctx.beginPath();
    ctx.ellipse(x, 0, 16, 11, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Glinstering
  ctx.fillStyle = 'rgba(255,255,255,.18)';
  ctx.beginPath();
  ctx.ellipse(0, -barH/4, 30, 2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
