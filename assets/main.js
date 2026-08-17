// Escolha manual de idioma: grava a preferência para que o redirecionamento
// automático do <head> não desfaça a decisão na próxima visita.
(function () {
  document.querySelectorAll('[data-lang]').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('lang', a.dataset.lang); } catch (e) {}
    });
  });
})();

// Realça no menu lateral a seção visível. Progressive enhancement:
// sem JS o menu continua funcionando como âncoras normais.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  var sections = links.map(function (a) {
    var el = document.querySelector(a.getAttribute('href'));
    if (el) byId[el.id] = a;
    return el;
  }).filter(Boolean);

  var visible = new Set();

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    });

    // a primeira seção visível na ordem do documento é a "ativa"
    var active = sections.find(function (s) { return visible.has(s.id); });
    links.forEach(function (a) { a.classList.remove('is-active'); });
    if (active) byId[active.id].classList.add('is-active');
  }, { rootMargin: '-10% 0px -70% 0px', threshold: 0 });

  sections.forEach(function (s) { observer.observe(s); });
})();
