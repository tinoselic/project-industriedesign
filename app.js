document.addEventListener("DOMContentLoaded", function () {
  'use strict';

  // small helpers
  const qs = sel => document.querySelector(sel);
  const qsa = sel => document.querySelectorAll(sel);

  // ========= DOM Elements ========= //
  const body = document.body;
  const bodyBg = getComputedStyle(body).backgroundColor;

  const footer = qs('footer');
  const modal = qs('.previewModal');
  const closePreview = qs('#closePreview');

  // Navigation
  const nav = qs('nav');
  const navContainer = qs('.nav-container');
  const mainMenu = qs('.mainMenu');
  const openMenuBtn = qs('.openMenu');

  // Back to Top
  const backToTopButton = document.getElementById('backToTop');

  // Play / Pause
  const video = qs('#bgVideo');
  const playPauseBtn = qs('#playPauseBtn');

  // SVGs for Play/Pause
  const play_svg = `<svg width="100%" height="100%" viewBox="0 0 24 24" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M18.1,12L8.1,6.2L8.1,17.8L18.1,12Z" style="fill:#fafbfc;fill-rule:nonzero;"/><path d="M12,0C18.623,0 24,5.377 24,12C24,18.623 18.623,24 12,24C5.377,24 0,18.623 0,12C0,5.377 5.377,0 12,0ZM12,1.5C6.205,1.5 1.5,6.205 1.5,12C1.5,17.795 6.205,22.5 12,22.5C17.795,22.5 22.5,17.795 22.5,12C22.5,6.205 17.795,1.5 12,1.5Z" style="fill:#fafbfc;"/></svg>`;
  const pause_svg = `<svg width="100%" height="100%" viewBox="0 0 24 24" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g transform="matrix(0.685714,0,0,1,3.459998,0)"><rect x="6.7" y="6.2" width="3.6" height="11.6" style="fill:#fafbfc;"/></g><g transform="matrix(0.685714,0,0,1,4.082856,0)"><rect x="13.7" y="6.2" width="3.6" height="11.6" style="fill:#fafbfc;"/></g><path d="M12,0C18.623,0 24,5.377 24,12C24,18.623 18.623,24 12,24C5.377,24 0,18.623 0,12C0,5.377 5.377,0 12,0ZM12,1.5C6.205,1.5 1.5,6.205 1.5,12C1.5,17.795 6.205,22.5 12,22.5C17.795,22.5 22.5,17.795 22.5,12C22.5,6.205 17.795,1.5 12,1.5Z" style="fill:#fafbfc;"/></svg>`;

  // Language
  const deBtn = qs('#de');
  const enBtn = qs('#en');
  const moreButton = qs('#more');
  const moreTextDe = qs('#moreText-de');
  const moreTextEn = qs('#moreText-en');

  // Gallery / Projects
  const dots = document.getElementsByClassName('demo');
  const slides = document.getElementsByClassName('slides');
  const thumbnails = qsa('.thumbnail');
  const accordion = document.getElementsByClassName('contentBox');
  const filterButtons = qsa('.filter-button');
  const projectItems = qsa('.project-item');
  const counter = qs('#project-counter');

  let lastScroll = 0;
  let slideIndex = 1;

  // ========= MENU LOGIC (Consolidated) ========= //
  function toggleMenu(forceClose = false) {
    if (!nav || !navContainer || !mainMenu || !openMenuBtn) return;

    // Determine opening or closing
    const isCurrentlyOpen = body.classList.contains('menu-active');
    const shouldOpen = forceClose ? false : !isCurrentlyOpen;

    if (shouldOpen) {
      // -- OPEN STATE --
      body.classList.add('menu-active');
      nav.style.backgroundColor = bodyBg;
      navContainer.style.height = '100dvh';
      mainMenu.style.display = 'inline-flex';
      mainMenu.style.backgroundColor = bodyBg;
      openMenuBtn.style.transform = 'rotate(calc(45*7deg))';
      body.style.overflow = 'hidden'; // Lock scroll

      // Safety: Ensure nav is visible (not hidden by scroll logic)
      nav.classList.remove('hide-on-scroll');
      if (playPauseBtn) playPauseBtn.style.display = 'none';

    } else {
      // -- CLOSED STATE --
      body.classList.remove('menu-active');
      nav.style.backgroundColor = 'transparent';
      navContainer.style.height = '0';
      mainMenu.style.display = 'none';
      mainMenu.style.backgroundColor = '';
      openMenuBtn.style.transform = 'rotate(0deg)';
      body.style.overflow = 'auto';
      if (playPauseBtn) playPauseBtn.style.display = 'block';
    }
  }
  if (openMenuBtn) {
    openMenuBtn.addEventListener('click', () => toggleMenu());
  }
  document.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      toggleMenu(true);
    }
  });


  // ========= SCROLL LOGIC ========= //
  if (nav) {
    window.addEventListener('scroll', () => {
      if (body.classList.contains('menu-active')) {
        nav.classList.remove('hide-on-scroll');
        return;
      }
      const currentScroll = window.pageYOffset;
      nav.style.backgroundColor = window.scrollY > 10 ? bodyBg : 'transparent';
      const shouldHide = currentScroll > lastScroll && currentScroll > 50;
      nav.classList.toggle('hide-on-scroll', shouldHide);
      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    });
  }

  // ========= Back to Top (History Safe) ========= //
  if (backToTopButton) {
    backToTopButton.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========= FOOTER GENERATOR ========= //
  if (footer) {
    footer.innerHTML = `
      <div class="footer-wrapper">
        <section class="address-section">
          <div class="adress-wrapper">
            <span><b>Selić Industriedesign</b><br>Schertlinstrasse 17a<br>86159 Augsburg</span>
          </div><br>
          <div class="contact-wrapper">
            <span>T +49 821 3499450<br><a href="mailto:mario@selic.de" target="_blank" style="color: inherit">mario@selic.de</a></span>
          </div><br>
          <div class="copyright-wrapper">
            <span>© 2026 Selić Industriedesign<br>All rights reserved.</span>
          </div>
        </section>
        <section class="navigation-section">
          <ul class="footer-nav-list">
            <li><a href="/">Home</a></li>
            <li><a href="/work">Work</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/impressum">Impressum</a></li>
          </ul>
        </section>
      </div>
      `;
  }

  // ========= VIDEO PLAYER ========= //  
  if (video && playPauseBtn) {
    playPauseBtn.style.zIndex = playPauseBtn.style.zIndex || '9999';
    playPauseBtn.setAttribute('role', 'button');

    const syncPlayPauseBtn = () => {
      playPauseBtn.innerHTML = video.paused ? play_svg : pause_svg;
      playPauseBtn.setAttribute('aria-pressed', String(!video.paused));
      playPauseBtn.setAttribute('aria-label', video.paused ? 'Play' : 'Pause');
    };
    syncPlayPauseBtn();

    playPauseBtn.addEventListener('click', async () => {
      try {
        if (video.paused) {
          if (!video.muted) video.muted = true;
          await video.play();
        } else {
          video.pause();
        }
      } catch (err) { console.error(err); }
    });

    video.addEventListener('play', syncPlayPauseBtn);
    video.addEventListener('pause', syncPlayPauseBtn);
    video.addEventListener('loadedmetadata', syncPlayPauseBtn);
  }


  // ========= UTILS (Accordion, Filters, Lang) ========= //
  // Accordion
  Array.from(accordion).forEach(box =>
    box.addEventListener('click', () => box.classList.toggle('active'))
  );

  // Filters
  if (filterButtons.length > 0 && projectItems.length > 0 && counter) {
    function updateProjectCounter() {
      const visibleCount = Array.from(projectItems).filter(item => item.style.display !== 'none').length;
      counter.textContent = `Project${visibleCount !== 1 ? 's' : ''}: ${visibleCount}`;
    }
    updateProjectCounter();

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.textContent.toLowerCase();
        const isActive = button.classList.contains('active');

        if (filter === 'show all') {
          filterButtons.forEach(b => b.classList.remove('active'));
          button.classList.add('active');
          projectItems.forEach(item => item.style.display = '');
        } else if (isActive) {
          button.classList.remove('active');
          projectItems.forEach(item => item.style.display = '');
        } else {
          filterButtons.forEach(b => b.classList.remove('active'));
          button.classList.add('active');
          projectItems.forEach(item => {
            const categories = item.getAttribute('data-category')?.toLowerCase() || '';
            item.style.display = categories.includes(filter) ? '' : 'none';
          });
        }
        updateProjectCounter();
      });
    });
  }

  // Back Button Render
  document.querySelectorAll('.back').forEach(el => {
    el.innerHTML = `← <span class="underline">back to projects</span>`;
    el.addEventListener('click', () => window.location.href = '../');
  });

  // Language Switcher
  if (enBtn && deBtn) {
    enBtn.textContent = "EN";
    deBtn.textContent = "DE";
    setLanguage("en");
  }

  function setLanguage(lang) {
    if (lang === "en") {
      enBtn?.classList.add("active");
      deBtn?.classList.remove("active");
      qsa('.english').forEach(el => el.classList.add("active"));
      qsa('.german').forEach(el => el.classList.remove("active"));
      moreTextDe?.classList.add("lang-hidden");
      moreTextDe?.classList.remove("lang-visible");
      if (moreButton) moreButton.textContent = "Show more";
    } else {
      deBtn?.classList.add("active");
      enBtn?.classList.remove("active");
      qsa('.german').forEach(el => el.classList.add("active"));
      qsa('.english').forEach(el => el.classList.remove("active"));
      moreTextEn?.classList.add("lang-hidden");
      moreTextEn?.classList.remove("lang-visible");
      if (moreButton) moreButton.textContent = "Mehr anzeigen";
    }
  }

  if (moreButton) {
    moreButton.addEventListener("click", () => {
      const isGerman = deBtn?.classList.contains("active");
      const moreText = isGerman ? moreTextDe : moreTextEn;
      const isVisible = moreText?.classList.contains("lang-visible");
      moreText?.classList.toggle("lang-hidden");
      moreText?.classList.toggle("lang-visible");

      if (isGerman) moreButton.textContent = isVisible ? "Mehr anzeigen" : "Weniger anzeigen";
      else moreButton.textContent = isVisible ? "Show more" : "Show less";
    });
  }

  if (enBtn) enBtn.addEventListener("click", () => setLanguage("en"));
  if (deBtn) deBtn.addEventListener("click", () => setLanguage("de"));


  // ========= GALLERY & MODAL ========= //
  window.generateGallery = function (slidesId, thumbnailsId, imagePaths) {
    const slidesContainer = document.getElementById(slidesId);
    const thumbnailsContainer = document.getElementById(thumbnailsId);
    if (!slidesContainer || !thumbnailsContainer) return;

    imagePaths.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'slides';
      slide.innerHTML = `<div class="slide-container"><div class="numbertext">${i + 1} / ${imagePaths.length}</div><img src="${src}" class="slide-img"></div>`;
      slidesContainer.appendChild(slide);

      const thumb = document.createElement('div');
      thumb.className = 'slideshow-column';
      thumb.innerHTML = `<img class="demo cursor" src="${src}" style="width:100%" onclick="currentSlide(${i + 1})">`;
      thumbnailsContainer.appendChild(thumb);
    });
    showSlides(slideIndex);
  };

  window.currentSlide = function (n) { showSlides(slideIndex = n); };
  window.plusSlides = function (n) { showSlides(slideIndex += n); };

  function showSlides(n) {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    Array.from(slides).forEach(sl => sl.style.display = 'none');
    Array.from(dots).forEach(dot => dot.classList.remove('active'));
    if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = 'block';
    if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add('active');
  }

  if (modal) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        const idx = parseInt(thumbnail.getAttribute('data-index'), 10) || 1;
        modal.style.display = 'flex';
        currentSlide(idx);
        body.style.overflow = 'hidden';
      });
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal || event.target.closest('#closePreview')) {
        modal.style.display = 'none';
        body.style.overflow = 'auto';
      }
    });
  }


  // ========= INFINITE MARQUEE GENERATOR ========= //
  const marquees = document.querySelectorAll('.infinite-marquee');

  marquees.forEach(marquee => {
    const originalContent = marquee.innerHTML;
    marquee.innerHTML = '';
    const track = document.createElement('div');
    track.className = 'marquee-track';
    let segment = '';
    for (let i = 0; i < 20; i++) {
      segment += originalContent;
    }
    track.innerHTML = segment + segment;
    marquee.appendChild(track);
  });
});