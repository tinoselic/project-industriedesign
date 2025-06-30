document.addEventListener("DOMContentLoaded", function () {
  // ========= DOM Elements ========= //
  const body = document.body;
  const nav = document.querySelector('nav');
  const navContainer = document.querySelector('.nav-container');
  const mainMenu = document.querySelector('.mainMenu');
  const openMenu = document.querySelector('.openMenu');
  const footer = document.getElementById('copyright');
  const accordion = document.getElementsByClassName('contentBox');
  const filterButtons = document.querySelectorAll('.filter-button');
  const projectItems = document.querySelectorAll('.project-item');
  const projects = document.querySelectorAll('.project');
  const modal = document.querySelector('.previewModal');
  const close = document.getElementById('closePreview');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const slides = document.getElementsByClassName("slides");
  const dots = document.getElementsByClassName("demo");
  const moreText = document.getElementById("moreText");
  const readMoreButton = document.getElementById("readMore");
  const bodyBg = getComputedStyle(body).backgroundColor;

  let isRotated = false;
  let lastScroll = 0;
  let slideIndex = 1;

  // ========= Navigation Toggle ========= //
  openMenu.addEventListener('click', () => {
    isRotated = !isRotated;
    nav.style.backgroundColor = isRotated ? bodyBg : 'transparent';
    navContainer.style.height = isRotated ? '100dvh' : '0';
    mainMenu.style.display = isRotated ? 'inline-flex' : 'none';
    mainMenu.style.backgroundColor = isRotated ? bodyBg : '';
    openMenu.style.transform = isRotated ? 'rotate(calc(45*7deg))' : 'rotate(0deg)';
    body.style.overflow = isRotated ? 'hidden' : 'auto';
  });

  // ========= Scroll Behavior ========= //
  window.addEventListener('scroll', () => {
    nav.style.backgroundColor = window.scrollY > 10 ? bodyBg : 'transparent';

    if (!body.classList.contains('openMenu')) {
      const currentScroll = window.pageYOffset;
      nav.classList.toggle('hide-on-scroll', currentScroll > lastScroll && currentScroll > 50);
      lastScroll = currentScroll;
    }
  });

  // ========= Dynamic Footer ========= //
  footer.innerHTML = `
    <div class="address-section">
      Selic Industriedesign<br>Schertlinstrasse 17a<br>86159 Augsburg
    </div>
    <div class="contact-section">
      T +49 821 3499450<br>mario@selic.de
    </div>
    <div class="copyright-section">
      © 2025 Selić Industriedesign<br>All rights reserved.
    </div>
  `;

  // ========= Accordion ========= //
  Array.from(accordion).forEach(box =>
    box.addEventListener('click', () => box.classList.toggle('active'))
  );

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.textContent.toLowerCase();
      const isActive = button.classList.contains('active');

      // Toggle off: Show all
      if (isActive) {
        button.classList.remove('active');
        projectItems.forEach(item => {
          item.style.display = '';
        });
      } else {
        // Toggle on: Set active and filter
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        projectItems.forEach(item => {
          const categories = item.getAttribute('data-category')?.toLowerCase() || '';
          item.style.display = categories.includes(filter) ? '' : 'none';
        });
      }
    });
  });

  // ========= Gallery Generator ========= //
  window.generateGallery = function (slidesId, thumbnailsId, imagePaths) {
    const slidesContainer = document.getElementById(slidesId);
    const thumbnailsContainer = document.getElementById(thumbnailsId);

    imagePaths.forEach((src, i) => {
      // Create slide
      const slide = document.createElement('div');
      slide.className = 'slides';
      slide.innerHTML = `
        <div class="slide-container">
          <div class="numbertext">${i + 1} / ${imagePaths.length}</div>
          <img src="${src}" class="slide-img">
        </div>
      `;
      slidesContainer.appendChild(slide);

      // Create thumbnail
      const thumb = document.createElement('div');
      thumb.className = 'slideshow-column';
      thumb.innerHTML = `
        <img class="demo cursor" src="${src}" style="width:100%" onclick="currentSlide(${i + 1})">
      `;
      thumbnailsContainer.appendChild(thumb);
    });

    showSlides(slideIndex);
  };

  // ========= Gallery Navigation ========= //
  window.currentSlide = function (n) {
    showSlides(slideIndex = n);
  };

  window.plusSlides = function (n) {
    showSlides(slideIndex += n);
  };

  function showSlides(n) {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    Array.from(slides).forEach(slide => slide.style.display = "none");
    Array.from(dots).forEach(dot => dot.classList.remove("active"));

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1]?.classList.add("active");
  }

  // ========= Modal Interaction ========= //
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      const index = parseInt(thumbnail.getAttribute('data-index'), 10);
      modal.style.display = 'flex';
      currentSlide(index);
      body.style.overflow = 'hidden';
    });
  });

  close.addEventListener('click', () => {
    modal.style.display = 'none';
    body.style.overflow = 'auto';
  });

  // ========= Read More Toggle ========= //
  readMoreButton?.addEventListener('click', () => {
    moreText.classList.toggle("hidden");
    moreText.classList.toggle("visible");
    readMoreButton.textContent = moreText.classList.contains("visible") ? "Show less" : "Read more";
  });

  // ========= Optional Contact Email ========= //
  // document.getElementById('contact')?.addEventListener('click', () => {
  //   window.location.href = 'mailto:mario@selic.com';
  // });
});
