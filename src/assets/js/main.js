import { initFooter } from './footer.js';
import { initHeader } from './header.js';
import { initGallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initFooter();
  initHeader();
  initGallery();
});
