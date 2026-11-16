
// ===================================
// WAV_ECAPTURES - MAIN JAVASCRIPT
// ===================================


// ===================================
// ELEMENTS
// ===================================

const introScreen = document.getElementById("introScreen");
const introVideo = document.getElementById("introVideo");
const skipIntro = document.getElementById("skipIntro");
const mainWebsite = document.getElementById("mainWebsite");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

let introFinished = false;


// ===================================
// SECTION NAVIGATION
// ===================================

const sections = document.querySelectorAll(
  "#mainWebsite > section"
);

const navigationLinks = document.querySelectorAll(
  '.nav-links a[href^="#"]'
);

function showSection(sectionId) {

  const targetSection = document.getElementById(sectionId);

  if (!targetSection || !targetSection.matches("#mainWebsite > section")) {
    return;
  }

  // Hide all sections and activate selected section
  sections.forEach(section => {
    section.classList.remove("active-section");
  });

  targetSection.classList.add("active-section");

  // Remember active section for footer
  if (mainWebsite) {
    mainWebsite.dataset.activeSection = sectionId;
  }

  // Update active navigation link
  navigationLinks.forEach(link => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // Start Work section from the top
  if (sectionId === "work") {
    targetSection.scrollTop = 0;
  }

  // Close mobile navigation
  if (navLinks) {
    navLinks.classList.remove("active");
  }

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }

  // Update URL without browser scrolling
  history.replaceState(null, "", `#${sectionId}`);
}


// ===================================
// DISABLE NORMAL PAGE SCROLLING
// ===================================

document.body.style.overflow = "hidden";
document.documentElement.style.overflow = "hidden";


// ===================================
// INTRO VIDEO
// ===================================

function finishIntro() {

  if (introFinished) return;

  introFinished = true;

  if (introVideo) {
    introVideo.pause();
  }

  if (introScreen) {
    introScreen.classList.add("hide");
  }

  if (mainWebsite) {
    mainWebsite.classList.add("show");
  }

  // Always start from Home
  showSection("home");

  // Keep page scrolling disabled
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  setTimeout(() => {

    if (introScreen) {
      introScreen.remove();
    }

  }, 1300);
}


// Skip intro
if (skipIntro) {
  skipIntro.addEventListener("click", finishIntro);
}


// Video ended
if (introVideo) {

  introVideo.addEventListener("ended", finishIntro);

  introVideo.addEventListener("error", finishIntro);

  introVideo.play().catch(() => {
    console.log("Autoplay blocked. Click SKIP INTRO.");
  });
}


// If intro elements are missing
if (!introScreen || !introVideo || !mainWebsite) {
  finishIntro();
}


// ===================================
// NAVIGATION CLICK
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const sectionId = link.getAttribute("href").substring(1);

    const targetSection = document.getElementById(sectionId);

    if (!targetSection || !targetSection.matches("#mainWebsite > section")) {
      return;
    }

    event.preventDefault();

    showSection(sectionId);

  });

});


// ===================================
// MOBILE MENU
// ===================================

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

  });

}


// ===================================
// BABY & KIDS GALLERY
// ===================================

const babyGallery = document.getElementById("babyGallery");

if (babyGallery) {

  for (let i = 1; i <= 15; i++) {

    const imageNumber = String(i).padStart(2, "0");

    const galleryItem = document.createElement("div");

    galleryItem.className = "gallery-item";

    const image = document.createElement("img");

    image.src = `assets/baby/baby-${imageNumber}.jpeg`;

    image.alt = `Baby and Kids Photography ${i}`;

    image.loading = "lazy";

    galleryItem.appendChild(image);

    babyGallery.appendChild(galleryItem);

  }

}


// ===================================
// COUPLE GALLERY
// ===================================

const coupleGallery = document.getElementById("coupleGallery");

if (coupleGallery) {

  for (let i = 1; i <= 4; i++) {

    const imageNumber = String(i).padStart(2, "0");

    const galleryItem = document.createElement("div");

    galleryItem.className = "gallery-item";

    const image = document.createElement("img");

    image.src = `assets/couple/couple-${imageNumber}.jpg`;

    image.alt = `Couple Photography ${i}`;

    image.loading = "lazy";

    galleryItem.appendChild(image);

    coupleGallery.appendChild(galleryItem);

  }

}


// ===================================
// INITIAL SECTION
// ===================================

// Set Home as the initial section
showSection("home");


console.log("WAV_ECAPTURES premium website loaded!");
