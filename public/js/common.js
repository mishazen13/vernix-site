const floater = document.querySelector('[data-floater]');
if (floater) {
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX - window.innerWidth / 2) * 0.06;
    const y = (event.clientY - window.innerHeight / 2) * 0.06;
    floater.style.transform = `translate(${x}px, ${y}px)`;
  });
}

const current = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach((link) => {
  if (link.getAttribute('href') === current || (current === '/' && link.getAttribute('href') === '/')) {
    link.classList.add('active');
  }
});
