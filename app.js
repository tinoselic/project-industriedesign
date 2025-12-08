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
  const openMenu = qs('.openMenu');

  // Play / Pause
  const video = qs('#bgVideo');
  const playPauseBtn = qs('#playPauseBtn');
  const play_svg = `
  <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <path d="M18.1,12L8.1,6.2L8.1,17.8L18.1,12Z" style="fill:#fafbfc;fill-rule:nonzero;"/>
    <path d="M12,0C18.623,0 24,5.377 24,12C24,18.623 18.623,24 12,24C5.377,24 0,18.623 0,12C0,5.377 5.377,0 12,0ZM12,1.5C6.205,1.5 1.5,6.205 1.5,12C1.5,17.795 6.205,22.5 12,22.5C17.795,22.5 22.5,17.795 22.5,12C22.5,6.205 17.795,1.5 12,1.5Z" style="fill:#fafbfc;"/>
</svg>
`;

  const pause_svg = `
  <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(0.685714,0,0,1,3.459998,0)">
        <rect x="6.7" y="6.2" width="3.6" height="11.6" style="fill:#fafbfc;"/>
    </g>
    <g transform="matrix(0.685714,0,0,1,4.082856,0)">
        <rect x="13.7" y="6.2" width="3.6" height="11.6" style="fill:#fafbfc;"/>
    </g>
    <path d="M12,0C18.623,0 24,5.377 24,12C24,18.623 18.623,24 12,24C5.377,24 0,18.623 0,12C0,5.377 5.377,0 12,0ZM12,1.5C6.205,1.5 1.5,6.205 1.5,12C1.5,17.795 6.205,22.5 12,22.5C17.795,22.5 22.5,17.795 22.5,12C22.5,6.205 17.795,1.5 12,1.5Z" style="fill:#fafbfc;"/>
</svg>
`;

  // Language
  const deBtn = qs('#de');
  const enBtn = qs('#en');
  const englishTexts = qsa('.english');
  const germanTexts = qsa('.german');

  // Gallery / Modal
  const dots = document.getElementsByClassName('demo');
  const slides = document.getElementsByClassName('slides');
  const thumbnails = qsa('.thumbnail');

  // Projects
  const accordion = document.getElementsByClassName('contentBox');
  const filterButtons = qsa('.filter-button');
  const projectItems = qsa('.project-item');
  const projects = qsa('.project');
  const counter = qs('#project-counter');

  // More
  const moreButton = qs('#more');
  const moreTextDe = qs('#moreText-de');
  const moreTextEn = qs('#moreText-en');

  let isRotated = false;
  let lastScroll = 0;
  let slideIndex = 1;

  // ========= Defensive guards for DOM nodes that may not exist ========= //
  // Navigation toggle (guarded)
  if (openMenu && nav && navContainer && mainMenu) {
    openMenu.addEventListener('click', () => {
      isRotated = !isRotated;
      nav.style.backgroundColor = isRotated ? bodyBg : 'transparent';
      navContainer.style.height = isRotated ? '100dvh' : '0';
      mainMenu.style.display = isRotated ? 'inline-flex' : 'none';
      mainMenu.style.backgroundColor = isRotated ? bodyBg : '';
      openMenu.style.transform = isRotated ? 'rotate(calc(45*7deg))' : 'rotate(0deg)';
      body.style.overflow = isRotated ? 'hidden' : 'auto';
      playPauseBtn.style.display = isRotated ? 'none' : 'block';
    });
  }

  // Scroll behaviour (guarded)
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.backgroundColor = window.scrollY > 10 ? bodyBg : 'transparent';
      if (!body.classList.contains('openMenu')) {
        const currentScroll = window.pageYOffset;
        nav.classList.toggle('hide-on-scroll', currentScroll > lastScroll && currentScroll > 50);
        lastScroll = currentScroll;
      }
    });
  }

  // Footer (guarded)
  if (footer) {
    footer.innerHTML = `
      <div class="footer-wrapper">
        <section class="address-section">
          <div class="adress-wrapper">
            <span>
              <b>Selić Industriedesign</b><br>
              Schertlinstrasse 17a<br>
              86159 Augsburg
            </span>
          </div>
          <br>
          <div class="contact-wrapper">
            <span>
              T +49 821 3499450<br>
              <a href="mailto:mario@selic.de" target="_blank" style="color: inherit">mario@selic.de</a>
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
            <li><a href="/">Home</a></li>
            <li><a href="/work">Work</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/impressum">Impressum</a></li>
          </ul>
        </section>
      </div>
    `;
  }

  // ========= Play / Pause Button (robust) ========= //
  if (video && playPauseBtn) {
    // ensure the button is visible in case of z-index issues (optional)
    playPauseBtn.style.zIndex = playPauseBtn.style.zIndex || '9999';

    // accessible attributes
    playPauseBtn.setAttribute('role', 'button');
    playPauseBtn.setAttribute('aria-pressed', String(!video.paused));
    playPauseBtn.setAttribute('aria-label', video.paused ? 'Play background video' : 'Pause background video');

    const syncPlayPauseBtn = () => {
      playPauseBtn.innerHTML = video.paused ? play_svg : pause_svg;
      playPauseBtn.setAttribute('aria-pressed', String(!video.paused));
      playPauseBtn.setAttribute('aria-label', video.paused ? 'Play background video' : 'Pause background video');
    };

    // initial sync (if metadata not loaded yet, this still works)
    syncPlayPauseBtn();

    playPauseBtn.addEventListener('click', async (ev) => {
      try {
        if (video.paused) {
          // some browsers block autoplay — make sure video is muted before play()
          if (!video.muted) video.muted = true;
          const p = video.play();
          if (p instanceof Promise) await p;
        } else {
          video.pause();
        }
      } catch (err) {
        console.error('Video play() failed:', err);
      }
    });

    // keep button in sync if something else pauses/plays the video
    video.addEventListener('play', syncPlayPauseBtn);
    video.addEventListener('pause', syncPlayPauseBtn);
    // update after metadata loads (optional)
    video.addEventListener('loadedmetadata', syncPlayPauseBtn);
  } else {
    console.warn('Play/pause elements not found:', { video, playPauseBtn });
  }

  // ========= Accordion ========= //
  Array.from(accordion).forEach(box =>
    box.addEventListener('click', () => box.classList.toggle('active'))
  );

  // ========= Filter Projects ========= //
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

  // ========= Gallery Generator (keeps your original API) ========= //
  window.generateGallery = function (slidesId, thumbnailsId, imagePaths) {
    const slidesContainer = document.getElementById(slidesId);
    const thumbnailsContainer = document.getElementById(thumbnailsId);
    if (!slidesContainer || !thumbnailsContainer) return;

    imagePaths.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'slides';
      slide.innerHTML = `
        <div class="slide-container">
          <div class="numbertext">${i + 1} / ${imagePaths.length}</div>
          <img src="${src}" class="slide-img">
        </div>
      `;
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

  // ========= Modal Interaction (guarded and deduplicated) ========= //
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

  // ========= Back to projects buttons ========= //
  document.querySelectorAll('.back').forEach(el => {
    el.innerHTML = `← <span class="underline">back to projects</span>`;
    el.addEventListener('click', () => {
      window.location.href = '../';
    });
  });

  // ========= Language Switch (guarded) ========= //
  if (enBtn) enBtn.textContent = "EN";
  if (deBtn) deBtn.textContent = "DE";

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

  function toggleMore() {
    const isGerman = deBtn?.classList.contains("active");
    const moreText = isGerman ? moreTextDe : moreTextEn;
    const isVisible = moreText?.classList.contains("lang-visible");
    moreText?.classList.toggle("lang-hidden");
    moreText?.classList.toggle("lang-visible");

    if (moreButton) {
      if (isGerman) moreButton.textContent = isVisible ? "Mehr anzeigen" : "Weniger anzeigen";
      else moreButton.textContent = isVisible ? "Show more" : "Show less";
    }
  }

  enBtn?.addEventListener("click", () => setLanguage("en"));
  deBtn?.addEventListener("click", () => setLanguage("de"));
  moreButton?.addEventListener("click", toggleMore);

  // Initialize if language controls exist
  if (enBtn && deBtn) setLanguage("en");
});
