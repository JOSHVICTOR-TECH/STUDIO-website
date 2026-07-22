// ==========================
// Select Elements
// ==========================

const header = document.querySelector("#header");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");
const scrollTop = document.querySelector("#scroll-top");
const loader = document.querySelector("#loader");
const themeToggle = document.querySelector("#theme-toggle");
const body = document.body;

// ==========================
// Loader
// ==========================

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hide");
    }, 800);
});

// ==========================
// Mobile Menu
// ==========================

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
});

// Close menu when a link is clicked
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menuIcon.classList.remove("bx-x");
        navbar.classList.remove("active");
    });
});

// ==========================
// Header Shadow
// ==========================

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        header.classList.add("shadow");
    } else {
        header.classList.remove("shadow");
    }

});
// ==========================
// Active Navigation on Scroll
// ==========================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

});

// ==========================
// Scroll To Top Button
// ==========================

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        scrollTop.classList.add("show");
    } else {
        scrollTop.classList.remove("show");
    }

});

scrollTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ==========================
// Smooth Scrolling
// ==========================

navLinks.forEach((link) => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const target = document.querySelector(
            link.getAttribute("href")
        );

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});
// ==========================
// Typing Animation
// ==========================

const typingText = document.querySelector("#typing-text");

const words = [
    "Food",
    "Meals",
    "Pizza",
    "Burgers",
    "Chicken",
    "Drinks",
    "Desserts"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent = currentWord.substring(0, charIndex++);
        
        if (charIndex > currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    } else {

        typingText.textContent = currentWord.substring(0, charIndex--);

        if (charIndex < 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

    }

    setTimeout(typeEffect, deleting ? 70 : 120);

}

typeEffect();

// ==========================
// Counter Animation
// ==========================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;

        let count = 0;

        const updateCounter = () => {

            const increment = target / 150;

            if (count < target) {

                count += increment;
                counter.innerText = Math.ceil(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target.toLocaleString() + "+";

            }

        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

}, {
    threshold: 0.5
});

counters.forEach((counter) => {
    counterObserver.observe(counter);
});
// ==========================
// Scroll Reveal Animation
// ==========================

const hiddenElements = document.querySelectorAll(
    ".box, .chef-box, .stat-box, .contact, .footer"
);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.2
    }

);

hiddenElements.forEach((element) => {

    element.classList.add("hidden");
    revealObserver.observe(element);

});

// ==========================
// Contact Form Validation
// ==========================

const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (message.length < 10) {
        alert("Message must contain at least 10 characters.");
        return;
    }

    alert("Thank you! Your message has been sent.");

    contactForm.reset();

});

// ==========================
// Dark Mode
// ==========================

themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark-mode");

    const icon = themeToggle.querySelector("i");

    if (body.classList.contains("dark-mode")) {

        icon.classList.remove("bx-moon");
        icon.classList.add("bx-sun");

        localStorage.setItem("theme", "dark");

    } else {

        icon.classList.remove("bx-sun");
        icon.classList.add("bx-moon");

        localStorage.setItem("theme", "light");

    }

});

window.addEventListener("load", () => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        body.classList.add("dark-mode");

        const icon = themeToggle.querySelector("i");
        icon.classList.remove("bx-moon");
        icon.classList.add("bx-sun");

    }

});

// ==========================
// Hero Parallax Effect
// ==========================

const heroImage = document.querySelector(".home-img img");

window.addEventListener("scroll", () => {

    const offset = window.scrollY * 0.15;

    heroImage.style.transform = `translateY(${offset}px)`;

});