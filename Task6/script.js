document.addEventListener("DOMContentLoaded", () => {
  // 1. Array Database of Gallery Photos (Supports navigation in lightbox)
  const photosData = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      category: "mountains",
      title: "Alps Majestic Peak",
      photographer: "Jared Rice",
      desc: "A crisp sunrise bathing the snow-capped mountain peaks in golden light."
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
      category: "nature",
      title: "Green Valley Fields",
      photographer: "Kalen Emsley",
      desc: "Rolling green hills sweeping down towards a quiet pine forest valley."
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800",
      category: "wildlife",
      title: "Scarlet Fox Glance",
      photographer: "Vincent van Zalinge",
      desc: "A rare candid close-up of a scarlet fox seeking food in the winter snow."
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
      category: "sky",
      title: "Sunset Crimson Horizon",
      photographer: "Elena Mozhvilo",
      desc: "A breathtaking warm glow spreading across the evening meadow grass."
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800",
      category: "waterfalls",
      title: "Cascading Emerald Falls",
      photographer: "Bailey Alexander",
      desc: "Deep jungle stream falling down sheer rocks into an emerald-tinted plunge pool."
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800",
      category: "forests",
      title: "Suspension Bridge Pathway",
      photographer: "Eric Karits",
      desc: "A weathered rope bridge disappearing into the dense morning forest mist."
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800",
      category: "mountains",
      title: "Lake House Retreat",
      photographer: "Luca Bravo",
      desc: "A perfect red A-frame cottage sitting peacefully beside a pristine glacial lake."
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      category: "forests",
      title: "Golden Forest Sunbeams",
      photographer: "John Towner",
      desc: "Brilliant morning sunlight piercing through tall Redwood trees into damp mossy soil."
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800",
      category: "wildlife",
      title: "Stag in the Misty Woods",
      photographer: "Sven-Erik Arndt",
      desc: "An elegant wild deer pausing mid-stride under towering fir trees in autumn."
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800",
      category: "nature",
      title: "Blooming Daisy Wilderness",
      photographer: "Nathan Dumlao",
      desc: "Thousands of wild daisies stretching out under a clear spring afternoon breeze."
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800",
      category: "sky",
      title: "Midnight Aurora Reflection",
      photographer: "Tobias Sjösten",
      desc: "Stunning teal and violet colors reflected perfectly in a mirror-like lake surface."
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1510784722466-f2aa240ease?w=800",
      category: "waterfalls",
      title: "Golden Sea Shorelines",
      photographer: "Sebastian Unrau",
      desc: "Waves softly breaking on smooth coastal rocks under a brilliant golden hour sky."
    }
  ];

  // Current active filtered list of photo objects
  let activePhotos = [...photosData];
  let currentPhotoIndex = 0;

  // 2. DOM Elements
  const header = document.getElementById("main-header");
  const hamburger = document.getElementById("hamburger-menu");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-item a");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryCards = document.querySelectorAll(".gallery-card");
  const statsSection = document.getElementById("stats-section");
  const statNumbers = document.querySelectorAll(".stat-number");

  // Lightbox Elements
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxCategory = document.getElementById("lightbox-category");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  // LocalStorage Like tracking system
  let likedPhotos = JSON.parse(localStorage.getItem("likedPhotos")) || [];

  // 3. Header Scroll Styling
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 4. Mobile Hamburger Menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile navigation on link selections
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");

      // Update active navigation item link highlight
      document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
      link.parentElement.classList.add("active");
    });
  });

  // 5. Category Filtering Logic with Smooth Animation Scaling
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active classes
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      // Filter local database objects for lightbox loop
      if (filterValue === "all") {
        activePhotos = [...photosData];
      } else {
        activePhotos = photosData.filter(photo => photo.category === filterValue);
      }

      // Animate card lists in grid
      galleryCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");

        if (filterValue === "all" || cardCategory === filterValue) {
          // Slide in and show card
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1) translateY(0)";
          }, 50);
        } else {
          // Slide out and shrink card
          card.style.opacity = "0";
          card.style.transform = "scale(0.8) translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // 6. Interactive Likes System (Using localstorage tracking)
  const syncLikes = () => {
    document.querySelectorAll(".action-icon-btn.like-btn").forEach(btn => {
      const card = btn.closest(".gallery-card");
      if (card) {
        const photoId = parseInt(card.getAttribute("data-id"));
        const icon = btn.querySelector("i");
        
        if (likedPhotos.includes(photoId)) {
          btn.classList.add("liked");
          icon.className = "fa-solid fa-heart";
        } else {
          btn.classList.remove("liked");
          icon.className = "fa-regular fa-heart";
        }
      }
    });
  };

  document.addEventListener("click", (e) => {
    const likeBtn = e.target.closest(".like-btn");
    if (likeBtn) {
      e.preventDefault();
      const card = likeBtn.closest(".gallery-card");
      if (card) {
        const photoId = parseInt(card.getAttribute("data-id"));
        
        if (likedPhotos.includes(photoId)) {
          // Remove from likes
          likedPhotos = likedPhotos.filter(id => id !== photoId);
        } else {
          // Add to likes
          likedPhotos.push(photoId);
          // Small scaling impact feedback animation
          likeBtn.style.transform = "scale(1.3)";
          setTimeout(() => {
            likeBtn.style.transform = "none";
          }, 150);
        }
        
        localStorage.setItem("likedPhotos", JSON.stringify(likedPhotos));
        syncLikes();
      }
    }
  });

  syncLikes();

  // 7. Lightbox Slider Controls
  const openLightbox = (photoId) => {
    currentPhotoIndex = activePhotos.findIndex(p => p.id === photoId);
    if (currentPhotoIndex === -1) return; // Safeguard if not in filter list
    
    updateLightboxContent();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Block page scroll behind
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  };

  const updateLightboxContent = () => {
    const currentPhoto = activePhotos[currentPhotoIndex];
    if (!currentPhoto) return;

    // Load elements with transition fades
    lightboxImg.style.opacity = "0";
    setTimeout(() => {
      lightboxImg.src = currentPhoto.src;
      lightboxImg.alt = currentPhoto.title;
      lightboxTitle.textContent = currentPhoto.title;
      lightboxCategory.textContent = currentPhoto.category;
      lightboxDesc.textContent = currentPhoto.desc;
      lightboxImg.style.opacity = "1";
    }, 150);
  };

  const nextLightboxImage = () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % activePhotos.length;
    updateLightboxContent();
  };

  const prevLightboxImage = () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + activePhotos.length) % activePhotos.length;
    updateLightboxContent();
  };

  // Card click triggers lightbox loading
  document.addEventListener("click", (e) => {
    const triggerCard = e.target.closest(".gallery-card");
    // Ignore click if user clicked like or download action buttons specifically
    if (triggerCard && !e.target.closest(".action-icon-btn")) {
      e.preventDefault();
      const photoId = parseInt(triggerCard.getAttribute("data-id"));
      openLightbox(photoId);
    }
  });

  // Lightbox Close actions
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    prevLightboxImage();
  });
  lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    nextLightboxImage();
  });

  // Clicking outside image closes lightbox
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-container")) {
      closeLightbox();
    }
  });

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      nextLightboxImage();
    } else if (e.key === "ArrowLeft") {
      prevLightboxImage();
    }
  });

  // 8. Stats Count-up Animator (Scroll Triggered Intersection Observer)
  const countUpStats = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute("data-target"));
      const label = stat.getAttribute("data-label") || ""; // suffix like "+" or "k+"
      const duration = 2000; // 2 seconds animation time
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * target);
        
        // Formatter for large stats: 10K+, 50K+
        if (target >= 1000) {
          const thousands = (currentValue / 1000).toFixed(0);
          stat.textContent = thousands + "K" + label;
        } else {
          stat.textContent = currentValue + label;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Final fallback check to ensure absolute correctness on end frame
          if (target >= 1000) {
            stat.textContent = (target / 1000) + "K" + label;
          } else {
            stat.textContent = target + label;
          }
        }
      };

      requestAnimationFrame(animate);
    });
  };

  // Intersection Observer for scroll triggers
  if (statsSection) {
    let triggered = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          statsSection.querySelectorAll(".stat-item").forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("revealed");
            }, index * 150); // Stagger element fades
          });
          countUpStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 }); // Fire when 25% of the stats segment is visible

    observer.observe(statsSection);
  }

  // Helper download simulated indicator
  document.querySelectorAll(".download-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const card = btn.closest(".gallery-card");
      if (card) {
        const title = card.querySelector(".photo-title").textContent;
        alert(`Downloading "${title}" in High-Resolution... (Simulated)`);
      }
    });
  });
});
