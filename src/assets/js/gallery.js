/**
 * Gallery modal functionality
 */
export function initGallery() {
  const modal = document.getElementById('gallery-modal')
  const modalImage = document.getElementById('modal-image')
  const closeBtn = document.getElementById('modal-close')
  const prevBtn = document.getElementById('modal-prev')
  const nextBtn = document.getElementById('modal-next')
  const galleryImages = document.querySelectorAll('#gallery-grid figure img')

  // Exit early if required elements don't exist
  if (!modal || !modalImage || !closeBtn || !prevBtn || !nextBtn || galleryImages.length === 0) {
    return;
  }

  let currentImageIndex = 0
  const images = Array.from(galleryImages).map((img) => ({
    src: img.dataset.fullImage,
    alt: img.alt,
  }))

  function openModal(index) {
    currentImageIndex = index
    updateModalImage()
    modal.classList.remove('hidden')
    modal.classList.add('flex')
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    modal.classList.add('hidden')
    modal.classList.remove('flex')
    document.body.style.overflow = ''
  }

  function updateModalImage() {
    const image = images[currentImageIndex]
    modalImage.src = image.src
    modalImage.alt = image.alt
  }

  function showPrevImage() {
    currentImageIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1
    updateModalImage()
  }

  function showNextImage() {
    currentImageIndex =
      currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0
    updateModalImage()
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index))
  })

  if (closeBtn) closeBtn.addEventListener('click', closeModal)
  if (prevBtn) prevBtn.addEventListener('click', showPrevImage)
  if (nextBtn) nextBtn.addEventListener('click', showNextImage)

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal()
      }
    })
  }

  document.addEventListener('keydown', (e) => {
    if (modal && !modal.classList.contains('hidden')) {
      switch (e.key) {
        case 'Escape':
          closeModal()
          break
        case 'ArrowLeft':
          showPrevImage()
          break
        case 'ArrowRight':
          showNextImage()
          break
      }
    }
  })
}

