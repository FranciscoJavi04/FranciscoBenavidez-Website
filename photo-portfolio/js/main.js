// --- nav toggle (mobile) ---
const toggle = document.querySelector(".nav-toggle");
const nav    = document.querySelector("#navlinks");

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
  headshots: {
    title: "Portraits",
    desc:  "Natural light, studio, and lifestyle portraits.",
    images: [
      "FranciscoSmiling.JPG", "FranciscoChinUp.JPG", "FranciscoSideAngel.JPG", "FranciscoLookingDown.JPG", "Me.jpg",
      "assets/img/photoshoots/daniela/DSC01614.webp",
      "assets/img/photoshoots/daniela/DSC01627.webp",
      "assets/img/photoshoots/daniela/DSC01671.webp",
      "assets/img/photoshoots/daniela/DSC01703.webp",
      "assets/img/photoshoots/daniela/DSC01708.webp",
      "assets/img/photoshoots/daniela/DSC01709.webp",
      "assets/img/photoshoots/daniela/DSC01721.webp",
      "assets/img/photoshoots/daniela/DSC01724.webp",
      "assets/img/photoshoots/daniela/DSC01728.webp",
      "assets/img/photoshoots/daniela/DSC01730.webp",
      "assets/img/photoshoots/daniela/DSC01731.webp",
      "assets/img/photoshoots/daniela/DSC01740.webp",
      "assets/img/photoshoots/daniela/DSC01760.webp",
      "assets/img/photoshoots/daniela/DSC01773.webp",
      "assets/img/photoshoots/daniela/DSC01774.webp",
      "assets/img/photoshoots/daniela/DSC01775.webp",
      "assets/img/photoshoots/daniela/DSC01777.webp",
      "assets/img/photoshoots/daniela/DSC01781.webp",
      "assets/img/photoshoots/daniela/DSC01784.webp",
      "assets/img/photoshoots/daniela/DSC01785.webp",
      "assets/img/photoshoots/daniela/DSC01789.webp",
      "assets/img/photoshoots/daniela/DSC01792.webp",
      "assets/img/photoshoots/daniela/DSC01797.webp",
      "assets/img/photoshoots/daniela/DSC01803.webp",
      "assets/img/photoshoots/daniela/DSC01805.webp",
      "assets/img/photoshoots/daniela/DSC01838.webp",
      "assets/img/photoshoots/daniela/DSC01841.webp",
      "assets/img/photoshoots/daniela/DSC01848.webp",
      "assets/img/photoshoots/daniela/DSC01852.webp",
      "assets/img/photoshoots/daniela/DSC01870.webp",
      "assets/img/photoshoots/daniela/DSC01876.webp",
      "assets/img/photoshoots/daniela/DSC01889.webp",
      "assets/img/photoshoots/daniela/DSC01892.webp",
      "assets/img/photoshoots/daniela/DSC01900.webp",
      "assets/img/photoshoots/daniela/DSC01904.webp",
      "assets/img/photoshoots/daniela/DSC01935.webp",
      "assets/img/photoshoots/daniela/DSC01943.webp",
      "assets/img/photoshoots/daniela/DSC01947.webp",
      "assets/img/photoshoots/daniela/DSC01950.webp",
      "assets/img/photoshoots/daniela/DSC01964.webp",
      "assets/img/photoshoots/daniela/DSC01980.webp",
      "assets/img/photoshoots/daniela/DSC01993.webp"
    ]
  },
  events: {
    title: "Events",
    desc:  "Coverage that captures moments and atmosphere.",
    images: ["FFGirl.jpg", "CloseUpPhone.jpg", "FFDrawing.JPG", "FFCrowd.jpg",
      "Back of Crowd.jpg", "FFLights.jpg", "FFOutsideRestaurant.jpg",
      "CloseUpBand.jpg", "Stickers.jpg"]
  },
  brands: {
    title: "Brands",
    desc:  "Product and lifestyle visuals for social and web.",
    images: ["p3.jpg", "p6.jpg", "p2.jpg", "p1.jpg", "p5.jpg"]
  },
  street: {
    title: "Street Photography",
    desc:  "Real places, real moments, real stories.",
    images: ["Bike.jpg", "Daisys.jpg", "DoorWithFlowers.jpg", "GasPump.jpg",
      "OutHouse.jpg", "PurpleFlowers.jpg", "Roses.jpg", "Sign.jpg", "Plants.jpg"]
  },
  video: {
    title: "Video Stills",
    desc:  "Frames from motion projects and creative experiments.",
    images: ["p5.jpg", "p3.jpg", "p2.jpg", "p4.jpg"]
  },
  mixed: {
    title: "Mixed",
    desc:  "A blend of favorites and experiments.",
    images: ["p6.jpg", "p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg"]
  }
};

// --- render project page ---
function getQueryParam(name) {
  return new URL(window.location.href).searchParams.get(name);
}

const projectGrid  = document.querySelector("#projectGrid");
const projectTitle = document.querySelector("#projectTitle");
const projectDesc  = document.querySelector("#projectDesc");

if (projectGrid && projectTitle) {
  const key = getQueryParam("set") || "portraits";
  const set = sets[key] || sets.portraits;

  projectTitle.textContent = set.title;
  if (projectDesc) projectDesc.textContent = set.desc;

  projectGrid.innerHTML = set.images
    .filter(Boolean)
    .map(img => {
      const src = img.startsWith("assets/") ? img : `assets/img/${key}/${img}`;
      return `
        <div class="shot">
          <img src="${src}" alt="${set.title} photo" loading="lazy" />
        </div>
      `;
    })
    .join("");
}