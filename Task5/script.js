document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Toggle Logic
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = themeToggleBtn.querySelector("i");
  
  // Check saved theme or system preference
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.className = "fa-solid fa-sun";
    } else {
      themeIcon.className = "fa-solid fa-moon";
    }
  }

  // 2. Reading Progress Bar Fallback (for older browsers lacking animation-timeline)
  const progressBar = document.getElementById("progress-bar");
  
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    // Only run JS fallback if css animation timeline is not supported
    if (!CSS.supports('animation-timeline', 'scroll()')) {
      if (progressBar) {
        progressBar.style.width = scrollPercentage + "%";
      }
    }
  };
  
  window.addEventListener("scroll", updateScrollProgress);
  window.addEventListener("resize", updateScrollProgress);

  // 3. Sticky Header Scroll Shadow
  const mainHeader = document.getElementById("main-header");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add("scrolled");
    } else {
      mainHeader.classList.remove("scrolled");
    }
  });

  // 4. Search Bar Interactive Toggle
  const searchToggleBtn = document.getElementById("search-toggle-btn");
  const searchInputWrapper = document.getElementById("search-input-wrapper");
  const searchBoxField = document.getElementById("search-box-field");

  if (searchToggleBtn && searchInputWrapper && searchBoxField) {
    searchToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      searchInputWrapper.classList.toggle("active");
      if (searchInputWrapper.classList.contains("active")) {
        searchBoxField.focus();
      }
    });

    // Close search when clicking outside
    document.addEventListener("click", (e) => {
      if (!searchToggleBtn.contains(e.target) && !searchInputWrapper.contains(e.target)) {
        searchInputWrapper.classList.remove("active");
      }
    });

    // Interactive Feedback simulation for Search Submission
    searchBoxField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchBoxField.value.trim();
        if (query) {
          alert(`Searching TechPulse articles for: "${query}" (Simulation)`);
          searchBoxField.value = "";
          searchInputWrapper.classList.remove("active");
        }
      }
    });
  }

  // 5. Mobile Hamburg Responsive Menu
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navMenu = document.getElementById("nav-menu");

  if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener("click", () => {
      hamburgerMenu.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu on clicking nav items
    const navLinks = document.querySelectorAll(".nav-item a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburgerMenu.classList.remove("active");
        navMenu.classList.remove("active");
        
        // Set active navigation tab
        document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
        link.parentElement.classList.add("active");
      });
    });
  }

  // 6. Back-to-Top Button Handler
  const backToTopBtn = document.getElementById("back-to-top");
  
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});

// 7. Newsletter Subscribe Form simulation
function handleSubscribe() {
  const emailInput = document.getElementById("newsletter-email");
  const successMsg = document.getElementById("newsletter-success-msg");
  
  if (emailInput && emailInput.value) {
    successMsg.style.display = "flex";
    emailInput.value = "";
    
    // Hide success message after 4 seconds
    setTimeout(() => {
      successMsg.style.display = "none";
    }, 4000) ;
  }
}
