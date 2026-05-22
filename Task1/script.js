// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Typewriter Effect
const text = "Bhairab Choudhury";
const typewriterElement = document.getElementById('typewriter');
let index = 0;

function type() {
    if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 150);
    }
}
setTimeout(type, 500);

// Scroll Reveal Animation & Skill Bars
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
            
            // Animate skill bars if they are within this section
            const skillBars = reveals[i].querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-progress');
            });
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// Theme Toggle (Dark/Light Mode)
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
});

// Dummy PDF Download
document.getElementById('download-cv').addEventListener('click', () => {
    // Create a dummy PDF blob
    const content = "This is a dummy CV for Bhairab Choudhury.";
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Bhairab_Choudhury_CV.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});
