/**
 * Mobile menu functionality
 */
export function initHeader() {
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
}