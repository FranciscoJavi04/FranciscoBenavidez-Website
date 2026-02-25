// --- nav toggle (mobile) ---
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#navlinks");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// --- footer year ---
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// --- project gallery data ---
const sets = {
  portraits: {
    title: "Portraits",
    desc: "Natural light, studio, and lifestyle portraits.",
    images: ["p1.jpg", "p4.jpg", "p6.jpg", "p2.jpg", "p3.jpg"]
  },
  events: {
    title: "Events",
    desc: "Coverage that captures moments and atmosphere.",
    images: ["FFGirl.jpg", "CloseUpPhone.jpg", "FFDrawing.JPG", "FFCrowd.jpg", "Back of Crowd.jpg", 
      "FFLights.jpg", "FFOutsideRestaurant.jpg", "CloseUpBand.jpg", "Stickers.jpg"]
  },

  brands: {
    title: "Brands",
    desc: "Product and lifestyle visuals for social and web.",
    images: ["p3.jpg", "p6.jpg", "p2.jpg", "p1.jpg", "p5.jpg"]
  },
  street: {
    title: "Street / Documentary",
    desc: "Real places, real moments, real stories.",
    images: ["", "p1.jpg", "p2.jpg", "p6.jpg"]
  },
  video: {
    title: "Video Stills",
    desc: "Frames from motion projects and creative experiments.",
    images: ["p5.jpg", "p3.jpg", "p2.jpg", "p4.jpg"]
  },
  mixed: {
    title: "Mixed",
    desc: "A blend of favorites and experiments.",
    images: ["p6.jpg", "p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg"]
  }
};

// --- render project page ---
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const projectGrid = document.querySelector("#projectGrid");
const projectTitle = document.querySelector("#projectTitle");
const projectDesc = document.querySelector("#projectDesc");

if (projectGrid && projectTitle) {
  const key = getQueryParam("set") || "portraits";
  const set = sets[key] || sets.portraits;

  projectTitle.textContent = set.title;
  if (projectDesc) projectDesc.textContent = set.desc;

  projectGrid.innerHTML = set.images
    .filter(Boolean)
    .map((img) => {
      const src = `assets/img/${key}/${img}`;
      return `
        <div class="shot">
          <img src="${src}" alt="${set.title} photo" loading="lazy" />
        </div>
      `;
    })
    .join("");
}