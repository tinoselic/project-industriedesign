document.addEventListener("DOMContentLoaded", function () {
  // ========= DOM Elements ========= //
  // ====== General Elements ======
  const body = document.body;
  const bodyBg = getComputedStyle(body).backgroundColor;
  const footer = document.getElementById('copyright');
  const modal = document.querySelector('.previewModal');
  const close = document.getElementById('closePreview');

  // ====== Navigation ======
  const nav = document.querySelector('nav');
  const navContainer = document.querySelector('.nav-container');
  const mainMenu = document.querySelector('.mainMenu');
  const openMenu = document.querySelector('.openMenu');

  // ====== Language Switcher ======
  const deBtn = document.getElementById('de');
  const enBtn = document.getElementById('en');
  const englishTexts = document.querySelectorAll('.english');
  const germanTexts = document.querySelectorAll('.german');

  // ====== Gallery / Modal ======
  const dots = document.getElementsByClassName('demo');
  const slides = document.getElementsByClassName('slides');
  const thumbnails = document.querySelectorAll('.thumbnail');

  // ====== Project View ======
  const accordion = document.getElementsByClassName('contentBox');
  const filterButtons = document.querySelectorAll('.filter-button');
  const projectItems = document.querySelectorAll('.project-item');
  const projects = document.querySelectorAll('.project');
  const counter = document.getElementById('project-counter');

  // ====== "More" Toggle Content ======
  const moreButton = document.getElementById('more');
  const moreTextDe = document.getElementById('moreText-de');
  const moreTextEn = document.getElementById('moreText-en');

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
  <div class="footer-wrapper">
    <section class="address-section">
      <div class="adress-wrapper">
        <span>
          <b>Selić Industriedesign</b>
          <br>
          Schertlinstrasse 17a
          <br>
          86159 Augsburg
        </span>
      </div>
      <br>
      <div class="contact-wrapper">
        <span>
          T +49 821 3499450
          <br>
          mario@selic.de
        </span>
      </div>
      <br>
      <div class="copyright-wrapper">
        <span>
          © 2025 Selić Industriedesign<br>All rights reserved.
        </span>
      </div>
    </section>
    <section class="navigation-section">
      <ul class="footer-nav-list">
        <li>
          <a href="../">Home</a>
        </li>
        <li>
          <a href="../work">Work</a>
        </li>
        <li>
          <a href="../about">About</a>
        </li>
        <li>
          <a href="../impressum">Impressum</a>
        </li>
        <br>
        <li>
          <a href="#top">&uarr; Back to Top</a>
        </li>
      </ul>
    </section>
  </div>
  `;

  // ========= Accordion ========= //
  Array.from(accordion).forEach(box =>
    box.addEventListener('click', () => box.classList.toggle('active'))
  );


  // ========= Filter Projects ========= //
  if (filterButtons.length > 0 && projectItems.length > 0 && counter) {
    // Function to update the counter
    function updateProjectCounter() {
      const visibleCount = Array.from(projectItems).filter(item => item.style.display !== 'none').length;
      counter.textContent = `Project${visibleCount !== 1 ? 's' : ''}: ${visibleCount}`;
    }

    // Initial count on page load
    updateProjectCounter();

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.textContent.toLowerCase();
        const isActive = button.classList.contains('active');

        if (filter === 'show all') {
          // Show All logic
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          projectItems.forEach(item => {
            item.style.display = '';
          });

        } else if (isActive) {
          // Toggle off: remove filter, show all
          button.classList.remove('active');
          projectItems.forEach(item => {
            item.style.display = '';
          });

        } else {
          // Toggle on: activate filter
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          projectItems.forEach(item => {
            const categories = item.getAttribute('data-category')?.toLowerCase() || '';
            item.style.display = categories.includes(filter) ? '' : 'none';
          });
        }

        // Update the counter after filtering
        updateProjectCounter();
      });
    });
  }


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

  // Close modal if clicking directly on the background
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.closest('#closePreview')) {
      modal.style.display = 'none';
      body.style.overflow = 'auto';
    }
  });


  // ======== Set Back to Projects Button Content ========== //  
  document.querySelectorAll('.back').forEach(el => {
    el.innerHTML = `← <span class="underline">back to projects</span>`;
    el.addEventListener('click', () => {
      window.location.href = '../'; s
    });
  });


  // ======== Language Switch ========== //
  // Set button texts
  enBtn.textContent = "EN";
  deBtn.textContent = "DE";

  function setLanguage(lang) {
    if (lang === "en") {
      enBtn.classList.add("active");
      deBtn.classList.remove("active");
      englishTexts.forEach(el => el.classList.add("active"));
      germanTexts.forEach(el => el.classList.remove("active"));

      moreTextDe.classList.add("lang-hidden");
      moreTextDe.classList.remove("lang-visible");
      moreButton.textContent = "Show more";
    } else {
      deBtn.classList.add("active");
      enBtn.classList.remove("active");
      germanTexts.forEach(el => el.classList.add("active"));
      englishTexts.forEach(el => el.classList.remove("active"));

      moreTextEn.classList.add("lang-hidden");
      moreTextEn.classList.remove("lang-visible");
      moreButton.textContent = "Mehr anzeigen";
    }
  }

  // Read more toggle
  function toggleMore() {
    const isGerman = deBtn.classList.contains("active");
    const moreText = isGerman ? moreTextDe : moreTextEn;
    const isVisible = moreText.classList.contains("lang-visible");

    moreText.classList.toggle("lang-hidden");
    moreText.classList.toggle("lang-visible");

    if (isGerman) {
      moreButton.textContent = isVisible ? "Mehr anzeigen" : "Weniger anzeigen";
    } else {
      moreButton.textContent = isVisible ? "Show more" : "Show less";
    }
  }

  enBtn.addEventListener("click", () => setLanguage("en"));
  deBtn.addEventListener("click", () => setLanguage("de"));
  moreButton?.addEventListener("click", toggleMore);

  // Init default
  setLanguage("en");

  // ========= Optional Contact Email ========= //
  // document.getElementById('contact')?.addEventListener('click', () => {
  //   window.location.href = 'mailto:mario@selic.com';
  // });
});
