// Select all elements with the class 'highlight-box'
const boxes = document.querySelectorAll('.highlight-box');

// Options for the Intersection Observer
const options = {
    root: null, // Sets the viewport as the root
    rootMargin: '0px',
    threshold: 1 // Triggers when 50% of the box is visible
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
boxes.forEach(box => observer.observe(box));