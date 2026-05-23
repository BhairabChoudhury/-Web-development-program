/**
 * NeuroFlow - Modern SaaS Startup Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Header & Scroll States ---
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Trigger once on load in case page is refreshed while scrolled
  handleScroll();

  // --- Mobile Hamburger Menu Drawer ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');
  const body = document.body;

  // Toggle Menu
  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');
  };

  // Close Menu
  const closeMenu = () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    body.classList.remove('no-scroll');
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  // Close mobile drawer when clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close mobile drawer when clicking outside the menu
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickInsideToggle = menuToggle.contains(event.target);
    
    if (navMenu.classList.contains('active') && !isClickInsideMenu && !isClickInsideToggle) {
      closeMenu();
    }
  });

  // --- Scroll Reveal Animations (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add reveal-active to trigger CSS transitions
          entry.target.classList.add('reveal-active');
          // Once animated, we don't need to observe it again
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null, // Viewport
      threshold: 0.15, // Trigger when 15% of element is visible
      rootMargin: '0px 0px -50px 0px' // Offset bottom slightly for better UX
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback: immediately show elements if IntersectionObserver is not supported
    revealElements.forEach(element => {
      element.classList.add('reveal-active');
    });
  }
});
