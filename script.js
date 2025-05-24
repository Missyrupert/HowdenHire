// Smooth scrolling for nav links
const links = document.querySelectorAll('nav a[href^="#"], .hero a[href^="#"]'); // Added hero button to smooth scroll

for (const link of links) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Calculate position of target element
      // Consider fixed header height if you have one that overlaps content
      const headerOffset = document.querySelector('header')?.offsetHeight || 0; // Get header height, default to 0
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
}

// Animate sections on scroll
const sections = document.querySelectorAll('.section');
const options = {
  root: null, // relative to document viewport
  rootMargin: '0px', // margin around root. Values are similar to css property.
  threshold: 0.1, // 10% of item has to be visible to trigger
};

const observer = new IntersectionObserver((entries, observerInstance) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: Unobserve the element after it has become visible if you don't need it to re-animate
      // observerInstance.unobserve(entry.target);
    } else {
      // Optional: Remove 'visible' class if you want elements to animate out when scrolled out of view
      // entry.target.classList.remove('visible');
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});

// Optional: Simple form submission handler (prevents default and logs data)
// For actual submission, you'll need a backend or a service like Formspree/Netlify Forms.
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    console.log('Form Data Submitted:', data);
    alert('Thank you for your message! We will get back to you soon.'); // Simple feedback
    this.reset(); // Reset form fields
  });
}