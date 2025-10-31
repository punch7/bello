
async function loadTokens(){
  const res = await fetch('./data/bello-tokens.json');
  const tokens = await res.json();
  const t = tokens;

  // Kolory podstawowe
  document.documentElement.style.setProperty('--bg', t.colors.bg);
  document.documentElement.style.setProperty('--surface', t.colors.surface);
  document.documentElement.style.setProperty('--text', t.colors.text.base || t.variants?.light?.text || '#FFFFFF');
  document.documentElement.style.setProperty('--primary', t.colors.primary);
  document.documentElement.style.setProperty('--accent', t.colors.accent);
  document.documentElement.style.setProperty('--radius-xl', (t.radii?.xl || 32)+'px');
  document.documentElement.style.setProperty('--shadow-card', t.shadows?.card || '0 8px 20px rgba(0,0,0,.2)');

  // Gradient nieba z tokenów ilustracji
  const skyTop = t.colors.illustration.skyTop;
  const skyBottom = t.colors.illustration.skyBottom;
  const card = document.querySelector('.clock-card');
  card.style.background = `linear-gradient(180deg, ${skyTop} 0%, ${skyBottom} 70%)`;
}

function tick(){
  const now = new Date();
  const hh = now.getHours();
  const mm = now.getMinutes();

  // Cyfrowy wyświetlacz HH:MM
  const pad = (n)=> String(n).padStart(2,'0');
  document.getElementById('timeDisplay').textContent = `${pad(hh)}:${pad(mm)}`;

  // Wskazówka 12h
  const minutesTotal = (hh % 12) * 60 + mm;
  const angle = minutesTotal * 0.5; // 360deg / (12*60) = 0.5 deg/min
  document.getElementById('hand').style.transform = `rotate(${angle}deg)`;
}

async function boot(){
  await loadTokens();
  tick();
  setInterval(tick, 1000 * 30); // aktualizacja co 30s
}

boot();
