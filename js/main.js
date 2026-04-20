/* ============================================================
   MailBond Marketing Site — JavaScript
   ============================================================ */

(function () {
  'use strict';

  // ---------- Mobile Nav Toggle ----------
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      toggle.classList.toggle('open');
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        toggle.classList.remove('open');
      });
    });
  }

  // ---------- Sticky Nav Background ----------
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Contact Form ----------
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Collect form data
      var data = {
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        company: form.querySelector('#company').value.trim(),
        users: form.querySelector('#users').value,
        message: form.querySelector('#message').value.trim()
      };

      // Basic client-side validation
      if (!data.name || !data.email || !data.company) {
        btn.textContent = originalText;
        btn.disabled = false;
        return;
      }

      // For now, show success message (replace with actual endpoint later)
      setTimeout(function () {
        btn.textContent = 'Demo Requested!';
        btn.style.background = '#10b981';
        btn.style.borderColor = '#10b981';
        form.reset();

        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
        }, 3000);
      }, 800);
    });
  }

  // ---------- Scroll Reveal Animation ----------
  var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    '.feature-card, .problem-card, .step-card, .pricing-card, .trust-card, .faq-item'
  ).forEach(function (el) {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Add reveal CSS dynamically
  var style = document.createElement('style');
  style.textContent =
    '.reveal { opacity: 0; transform: translateY(24px); transition: opacity .5s ease, transform .5s ease; }' +
    '.revealed { opacity: 1; transform: translateY(0); }' +
    '.nav.scrolled { background: rgba(10, 22, 40, .98); box-shadow: 0 2px 20px rgba(0,0,0,.2); }' +
    '.nav-toggle.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }' +
    '.nav-toggle.open span:nth-child(2) { opacity: 0; }' +
    '.nav-toggle.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }';
  document.head.appendChild(style);

})();
