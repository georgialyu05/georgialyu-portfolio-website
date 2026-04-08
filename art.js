// Scale iframes to fit their containers
const IFRAME_W = 1440;
const IFRAME_H = 1080;
function scaleIframes() {
  document.querySelectorAll('.art-item--interactive iframe').forEach(iframe => {
    const container = iframe.closest('.art-item-media');
    const w = container.clientWidth;
    const h = container.clientHeight;
    const multiplier = parseFloat(iframe.dataset.scale || 1.8);
    const scale = Math.min(w * multiplier / IFRAME_W, h * multiplier / IFRAME_H);
    iframe.style.width = IFRAME_W + 'px';
    iframe.style.height = IFRAME_H + 'px';
    iframe.style.transform = `scale(${scale})`;
  });
}
scaleIframes();
window.addEventListener('resize', scaleIframes);

// Filter
const filters = document.querySelectorAll('.art-filter');
const items = document.querySelectorAll('.art-item');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    items.forEach(item => {
      const match = cat === 'all' || item.dataset.category === cat;
      item.style.display = match ? '' : 'none';
    });
  });
});
