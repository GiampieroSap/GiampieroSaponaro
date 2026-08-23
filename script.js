
/* ============================================================
   I18N — applicazione delle traduzioni
   ============================================================ */
var LANG_META = {
  it: { flag: '\ud83c\uddee\ud83c\uddf9', code: 'IT' },
  en: { flag: '\ud83c\uddec\ud83c\udde7', code: 'EN' },
  es: { flag: '\ud83c\uddea\ud83c\uddf8', code: 'ES' },
  fr: { flag: '\ud83c\uddeb\ud83c\uddf7', code: 'FR' }
};

function getLang() {
  var saved = null;
  try { saved = localStorage.getItem('bu_lang'); } catch (e) {}
  if (saved && LANG_META[saved]) return saved;
  var nav = (navigator.language || 'it').slice(0, 2).toLowerCase();
  return LANG_META[nav] ? nav : 'it';
}

function applyLang(lang) {
  if (!window.I18N || !LANG_META[lang]) return;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var entry = window.I18N[el.getAttribute('data-i18n')];
    if (entry && entry[lang]) el.innerHTML = entry[lang];
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
    var entry = window.I18N[el.getAttribute('data-i18n-aria')];
    if (entry && entry[lang]) el.setAttribute('aria-label', entry[lang].replace(/<[^>]*>/g, ''));
  });

  var titleKey = document.body.getAttribute('data-page-title');
  if (titleKey && window.I18N[titleKey]) {
    var txt = window.I18N[titleKey][lang];
    if (txt) {
      var tmp = document.createElement('div');
      tmp.innerHTML = txt;
      document.title = tmp.textContent + ' \u2014 BlackUtopia';
    }
  }

  var btnFlag = document.querySelector('.lang-btn .lang-flag');
  var btnCode = document.querySelector('.lang-btn .lang-code');
  if (btnFlag) btnFlag.textContent = LANG_META[lang].flag;
  if (btnCode) btnCode.textContent = LANG_META[lang].code;

  document.querySelectorAll('.lang-menu button').forEach(function (b) {
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });

  try { localStorage.setItem('bu_lang', lang); } catch (e) {}
}

(function () {
  var current = getLang();
  applyLang(current);

  var wrap = document.querySelector('.lang-switch');
  var btn = document.querySelector('.lang-btn');
  if (!wrap || !btn) return;

  function setOpen(open) {
    wrap.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!wrap.classList.contains('open'));
  });

  wrap.querySelectorAll('.lang-menu button').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      applyLang(b.getAttribute('data-lang'));
      setOpen(false);
    });
  });

  document.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();

/* ============================================================
   MENU FULLSCREEN — Opzione C
   ============================================================ */
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var overlay = document.querySelector('.menu-overlay');
  var closeBtn = document.querySelector('.menu-close');
  if (!toggle || !overlay) return;

  function setOpen(open) {
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!document.body.classList.contains('menu-open'));
  });

  if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) setOpen(false);
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
  var link = document.getElementById('email-link');
  var val = document.getElementById('email-val');
  if (!link || !val) return;

  var email = 'g.saponaro99' + '@' + 'hotmail.com';
  var oggetto = 'Richiesta Informazioni';
  var testoAutomatico = "Gentilissimo Sig. BlackUtopia,\n\nCon il permesso di presentarmi con la dovuta grazia, mi rivolgo a Voi nella speranza che questa missiva giunga gradita.\n\n\u2014 Chi scrive:\nNome e Cognome: [il vostro nome]\nAzienda o Ente: [qualora vi rappresentiate sotto un blasone]\n\n\u2014 Il motivo di questa missiva:\n[Esponete pure con libert\u00e0 la ragione che vi ha condotti fin qui]\n\n\u2014 Come raggiungervi:\nNumero di telefono: [se desiderate essere contattati con la voce]\nIndirizzo PEC: [per le comunicazioni di natura pi\u00f9 formale, qualora ne foste in possesso]\n\nIn attesa di una vostra risposta, vi porgo i miei pi\u00f9 distinti ossequi.\n\nVostro/Vostra devotamente,\nMessere/Madame [il vostro nome]";

  link.setAttribute('href', 'mailto:' + email + '?subject=' + encodeURIComponent(oggetto) + '&body=' + encodeURIComponent(testoAutomatico));
  val.removeAttribute('data-i18n');
  val.textContent = email;
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var delay = parseFloat(e.target.style.transitionDelay) || 0;
        setTimeout(function () { e.target.classList.add('visible'); }, delay);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (elem) {
    var siblings = [].slice.call(elem.parentElement.children).filter(function (c) {
      return c.classList.contains('reveal');
    });
    elem.style.transitionDelay = (siblings.indexOf(elem) * 80) + 'ms';
    obs.observe(elem);
  });

  setTimeout(function () {
    items.forEach(function (el) { el.classList.add('visible'); });
  }, 1500);
})();
