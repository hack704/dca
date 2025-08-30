// Army tab interaction: show/hide sections and set active pill
document.addEventListener('DOMContentLoaded', () => {
  const tabs = Array.from(document.querySelectorAll('.army-tab'));
  const sections = Array.from(document.querySelectorAll('.army-section'));

  if (!tabs.length || !sections.length) return;

  function activate(id) {
    tabs.forEach(t => t.classList.toggle('active', t.getAttribute('href') === `#${id}`));
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // set first tab/section active by default
  const first = tabs[0] || null;
  if (first) activate(first.getAttribute('href').slice(1));

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const id = tab.getAttribute('href').slice(1);
      activate(id);
      // update URL hash without page jump
      history.replaceState(null, '', `#${id}`);
    });
  });
});