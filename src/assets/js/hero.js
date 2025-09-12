export function initHero() {
  const heroSlider = document.getElementById('hero-slider');
  if (!heroSlider) return;
  
  const slides = heroSlider.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;
  
  let currentSlide = 0;
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  // Auto-advance slides every 4 seconds
  const interval = setInterval(nextSlide, 4000);
  
  // Clean up interval when page changes (for SPAs)
  window.addEventListener('beforeunload', () => {
    clearInterval(interval);
  });
}