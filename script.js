(function() {
  const u = 'g.saponaro99';
  const d = 'hotmail.com';
  const email = u + '@' + d;
  const link = document.getElementById('email-link');
  const val  = document.getElementById('email-val');
  if (link && val) {
    link.setAttribute('href', 'mailto:' + email);
    val.textContent = email;
  }
})();

/* ── MATRIX RAIN ── */
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let cols, drops;
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF';

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.floor(canvas.width / 18);
  drops = Array(cols).fill(0).map(() => Math.random() * -50);
}
resize();
window.addEventListener('resize', resize);

function drawMatrix() {
  ctx.fillStyle = 'rgba(5,10,14,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff88';
  ctx.font = '13px Share Tech Mono, monospace';
  drops.forEach((y, i) => {
    const ch = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(ch, i * 18, y * 18);
    if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.5;
  });
}
setInterval(drawMatrix, 55);

/* ── TYPING EFFECT ── */
const phrases = [
  'whoami → junior_pentester',
  'nmap -sV -O target.local',
  'hydra -l admin -P rockyou.txt ssh://target',
  'cat /etc/passwd | grep root',
  'nc -lvnp 4444  # listening...',
];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed-text');

function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    el.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(type, 2200); return; }
    setTimeout(type, 55 + Math.random() * 40);
  } else {
    el.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
    setTimeout(type, 25);
  }
}
setTimeout(type, 800);

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const delay = parseFloat(e.target.style.transitionDelay || 0);
      setTimeout(() => e.target.classList.add('visible'), delay || 0);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => {
  const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
  const idx = siblings.indexOf(el);
  el.style.transitionDelay = (idx * 80) + 'ms';
  obs.observe(el);
});
