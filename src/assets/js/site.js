// Progressive enhancement only — every page works without JavaScript.
(function () {
  var body = document.body;
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    document.addEventListener('click', function (e) {
      if (body.classList.contains('nav-open') && !e.target.closest('.site-nav, .nav-toggle')) toggle.click();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) toggle.click();
    });
  }

  // Mobile: tap a parent item to expand its submenu instead of navigating.
  document.querySelectorAll('.has-menu > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 960px)').matches) {
        var li = a.parentElement;
        if (!li.classList.contains('open')) { e.preventDefault(); li.classList.add('open'); }
      }
    });
  });

  // Estimate forms: validate + submit via fetch, fall back to normal POST.
  document.querySelectorAll('.estimate-form').forEach(function (form) {
    var page = form.querySelector('input[name="page"]');
    if (page) page.value = location.pathname;
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (el) {
        var bad = !el.value.trim();
        if (el.name === 'phone' && el.value.replace(/\D/g, '').length < 10) bad = true;
        el.classList.toggle('invalid', bad);
        if (bad) ok = false;
      });
      var email = form.querySelector('[name="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.classList.add('invalid'); ok = false; }
      if (!ok) {
        e.preventDefault();
        status.className = 'form-status err';
        status.textContent = 'Please fill in your name, a valid phone number and your town.';
        return;
      }
      if (!window.fetch || !window.FormData) return;
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.className = 'form-status';
      status.textContent = 'Sending…';
      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          if (!res.ok) throw new Error(res.d && res.d.error);
          form.reset();
          status.className = 'form-status ok';
          status.textContent = 'Thank you! We received your request and will call you shortly.';
          if (window.gtag) window.gtag('event', 'generate_lead', { form_location: location.pathname });
        })
        .catch(function (err) {
          status.className = 'form-status err';
          status.textContent = (err && err.message) || 'Something went wrong. Please call (908) 636-9745.';
        })
        .finally(function () { btn.disabled = false; });
    });
  });

  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
