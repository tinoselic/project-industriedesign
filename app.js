const contact = document.getElementById('contact');
const mainMenu = document.querySelector('.mainMenu');
const openMenu = document.querySelector('.openMenu');
const home = document.getElementById('home');
const main = document.querySelector('main');
const footer = document.getElementById('copyright');
const accordion = document.getElementsByClassName('contentBox');
const modal = document.querySelector('.previewModal');
const modalImg = document.getElementById('previewImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const projects = document.querySelectorAll('.highlight-project');
let isRotated = false;


// Contact/Email button interaction
contact.addEventListener('click', function () {
	const mailtoLink = 'mailto:tino.selic@gmail.com}';
	window.location.href = mailtoLink;
});


// Nav bar interaction
openMenu.addEventListener('click', () => {
	isRotated = !isRotated;

	if (isRotated) {
		mainMenu.style.display = 'block';
		openMenu.style.transform = 'rotate(1845deg)';
		main.style.display = 'none';
		footer.style.display = 'none';
	} else {
		mainMenu.style.display = 'none';
		openMenu.style.transform = 'rotate(0deg)';
		main.style.display = 'block';
		footer.style.display = 'block';
	}
});


// Footer
document.addEventListener("DOMContentLoaded", function () {
	var footerText = "© 2025 Selić Industriedesign";
	footer.textContent = footerText;
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