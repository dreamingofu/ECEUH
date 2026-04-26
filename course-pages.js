(() => {
  const body = document.body;
  if (!body || !body.classList.contains('course-ui')) return;

  function injectBackButton() {
    const page = document.querySelector('.course-page');
    if (!page || document.querySelector('.course-back')) return;

    const back = document.createElement('a');
    back.className = 'course-back reveal visible';
    back.href = 'javascript:history.length > 1 ? history.back() : void 0';
    back.textContent = '< Back';
    back.addEventListener('click', (event) => {
      if (window.history.length > 1) {
        event.preventDefault();
        window.history.back();
      }
    });
    page.prepend(back);
  }

  function enableReveal() {
    const targets = document.querySelectorAll('.hero-card, .section-card, .hub-card');
    targets.forEach((node) => node.classList.add('reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
  }

  injectBackButton();
  enableReveal();
})();
