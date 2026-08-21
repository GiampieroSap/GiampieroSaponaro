/* ============================================================
   MENU FULLSCREEN — Opzione C
   ============================================================ */
(function () {
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.menu-overlay');
  if (!toggle || !overlay) return;

  function setOpen(open) {
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  toggle.addEventListener('click', function () {
    setOpen(!document.body.classList.contains('menu-open'));
  });
  overlay.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();

/* ============================================================
   EMAIL OFFUSCATA
   ============================================================ */
(function () {
  const link = document.getElementById('email-link');
  const val = document.getElementById('email-val');
  if (!link || !val) return;

  const u = 'g.saponaro99';
  const d = 'hotmail.com';
  const email = u + '@' + d;

  const oggetto = "Richiesta Informazioni";
  const testoAutomatico = "Gentilissimo Sig. BlackUtopia,\n\nCon il permesso di presentarmi con la dovuta grazia, mi rivolgo a Voi nella speranza che questa missiva giunga gradita.\n\n— Chi scrive:\nNome e Cognome: [il vostro nome]\nAzienda o Ente: [qualora vi rappresentiate sotto un blasone]\n\n— Il motivo di questa missiva:\n[Esponete pure con libertà la ragione che vi ha condotti fin qui]\n\n— Come raggiungervi:\nNumero di telefono: [se desiderate essere contattati con la voce]\nIndirizzo PEC: [per le comunicazioni di natura più formale, qualora ne foste in possesso]\n\nIn attesa di una vostra risposta, vi porgo i miei più distinti ossequi.\n\nVostro/Vostra devotamente,\nMessere/Madame [il vostro nome]";

  link.setAttribute('href', 'mailto:' + email + '?subject=' + encodeURIComponent(oggetto) + '&body=' + encodeURIComponent(testoAutomatico));
  val.textContent = email;
})();

/* ============================================================
   MATRIX RAIN
   ============================================================ */
(function () {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF';
  let cols, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(0).map(() => Math.random() * -50);
  }
  resize();
  window.addEventListener('resize', resize);

  setInterval(function () {
    ctx.fillStyle = 'rgba(5,10,14,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff88';
    ctx.font = '13px Share Tech Mono, monospace';
    drops.forEach(function (y, i) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * 18, y * 18);
      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.5;
    });
  }, 55);
})();

/* ============================================================
   TYPING TERMINALE (solo dove esiste l'hero)
   ============================================================ */
(function () {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const phrases = [
    'whoami → junior_soc_analyst',
    'nmap -sV -O target.local',
    'index=main sourcetype=WinEventLog EventCode=4625',
    'bloodyAD --host dc01 get children',
    'nc -lvnp 4444',
  ];
  let pi = 0, ci = 0, deleting = false;

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
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        const delay = parseFloat(e.target.style.transitionDelay) || 0;
        setTimeout(function () { e.target.classList.add('visible'); }, delay);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (elem) {
    const siblings = [...elem.parentElement.children].filter(c => c.classList.contains('reveal'));
    elem.style.transitionDelay = (siblings.indexOf(elem) * 80) + 'ms';
    obs.observe(elem);
  });

  setTimeout(function () {
    items.forEach(function (el) { el.classList.add('visible'); });
  }, 1500);
})();
