const contact = document.getElementById('contact');
const body = document.body;
const bodyBg = getComputedStyle(body).backgroundColor;
const header = document.querySelector('header');
const mainMenu = document.querySelector('.mainMenu');
const openMenu = document.querySelector('.openMenu');
const nav = document.querySelector('nav');
const home = document.getElementById('home');
const main = document.querySelector('main');
const footer = document.getElementById('copyright');
const accordion = document.getElementsByClassName('contentBox');
const modal = document.querySelector('.previewModal');
const modalImg = document.getElementById('previewImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const projects = document.querySelectorAll('.highlight-project');
const mailtoLink = 'mailto:mario@selic.com}';
let isRotated = false;
let lastScroll = 0;


// Contact/Email button interaction
contact.addEventListener('click', function () {
	window.location.href = mailtoLink;
});


// Nav bar interaction
openMenu.addEventListener('click', () => {
	isRotated = !isRotated;
	if (isRotated) {
		nav.style.backgroundColor = bodyBg;
		mainMenu.style.backgroundColor = bodyBg;
		mainMenu.style.display = 'inline-flex';
		openMenu.style.transform = 'rotate(calc(45*7deg))'; // 1845 deg for screwdriver effect
		body.style.overflow = 'hidden';
		footer.style.display = 'none';
	} else {
		nav.style.backgroundColor = 'transparent';
		mainMenu.style.display = 'none';
		openMenu.style.transform = 'rotate(0deg)';
		body.style.overflow = 'auto';
		footer.style.display = 'block';
	}
});

// Nav bar scrolling color change
window.addEventListener('scroll', function () {
	if (window.scrollY > 10) {
		nav.style.backgroundColor = bodyBg;
	} else {
		nav.style.backgroundColor = 'transparent';
	}
});

// Nav bar hide on scroll

window.addEventListener('scroll', () => {
	const currentScroll = window.pageYOffset;
	if (currentScroll > lastScroll && currentScroll > 50) {
		// scrolling down
		nav.classList.add('hide-on-scroll');
	} else {
		// scrolling up
		nav.classList.remove('hide-on-scroll');
	}
	lastScroll = currentScroll;
});


// Footer
document.addEventListener("DOMContentLoaded", function () {
	var footerText =
		'<div class="address-section">Selic Industriedesign<br>Schertlinstrasse 17a<br>86159 Augsburg</div>' +
		'<div class="contact-section">T +49 821 3499450<br>mario@selic.de</div>' +
		'<div class="copyright-section">© 2025 Selić Industriedesign<br>All rights reserved.</div>'
		;
	footer.innerHTML = footerText;
});


// Accordion
for (let i = 0; i < accordion.length; i++) {
	accordion[i].addEventListener('click', function () {
		this.classList.toggle('active');
	});
}


// Highlight Project on Scroll
// Options for the Intersection Observer
const options = {
	root: null, // Sets the viewport as the root
	rootMargin: '0px',
	threshold: 1 // Triggers when 100% of the box is visible
};

// Callback function for the observer
function highlightOnScroll(entries, observer) {
	if (window.innerWidth <= 796) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Add the highlight class when the element is in view
				entry.target.classList.add('highlight');
			} else {
				// Optionally, remove the highlight when it’s out of view
				entry.target.classList.remove('highlight');
			}
		});
	}
}

// Create the observer with the callback and options
const observer = new IntersectionObserver(highlightOnScroll, options);

// Observe each box
projects.forEach(box => observer.observe(box));


// Preview Image
// Add click event to each image
thumbnails.forEach((thumbnail) => {
	thumbnail.addEventListener('click', function () {
		modal.style.display = 'flex'; // Show the modal
		modalImg.src = this.src; // Set the clicked image in the modal
		document.body.style.overflow = 'hidden';
	});
});

// Close the modal when clicking anywhere outside the image or on the close button
modal.addEventListener('click', function (e) {
	if (e.target !== modalImg) {
		modal.style.display = 'none';
		document.body.style.overflow = 'auto';
	}
});