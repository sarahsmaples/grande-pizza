console.log("Hello from main.js");

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle functionality
  const mobileMenuToggle = document.querySelector('[data-collapse-toggle="mobile-menu-2"]');
  const mobileMenu = document.getElementById('mobile-menu-2');
  const hamburgerIcon = mobileMenuToggle.querySelector('svg:first-child');
  const closeIcon = mobileMenuToggle.querySelector('svg:last-child');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');

  function toggleMobileMenu() {
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
      // Show menu
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
    } else {
      // Hide menu
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    hamburgerIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
  }

  // Toggle menu when button is clicked
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);

  // Close menu when clicking on menu links
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      if (!mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    }
  });

  // Close menu when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      closeMobileMenu();
    }
  });

  const modal = document.getElementById('gallery-modal');
  const modalImage = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.getElementById('modal-close');
  const prevBtn = document.getElementById('modal-prev');
  const nextBtn = document.getElementById('modal-next');
  const galleryImages = document.querySelectorAll('#gallery-grid figure img');
  
  let currentImageIndex = 0;
  const images = Array.from(galleryImages).map(img => ({
    src: img.dataset.fullImage,
    alt: img.alt,
    caption: img.alt
  }));

  function openModal(index) {
    currentImageIndex = index;
    updateModalImage();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  function updateModalImage() {
    const image = images[currentImageIndex];
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalCaption.textContent = image.caption;
  }

  function showPrevImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    updateModalImage();
  }

  function showNextImage() {
    currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    updateModalImage();
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
  });

  closeBtn.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('hidden')) {
      switch(e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          showPrevImage();
          break;
        case 'ArrowRight':
          showNextImage();
          break;
      }
    }
  });
});
