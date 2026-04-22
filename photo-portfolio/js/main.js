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
      "FranciscoSmiling.webp", "FranciscoChinUp.webp", "FranciscoSideAngel.webp", "FranciscoLookingDown.webp","assets/img/photoshoots/daniela/DSC01614.webp",
      "assets/img/photoshoots/daniela/DSC01724.webp","assets/img/photoshoots/daniela/DSC01730.webp","assets/img/photoshoots/daniela/DSC01760.webp",
      "assets/img/photoshoots/daniela/DSC01773.webp","assets/img/photoshoots/daniela/DSC01935.webp","assets/img/photoshoots/daniela/DSC01964.webp",
      "assets/img/photoshoots/daniela/DSC01980.webp"
    ]
  },
  events: {
    title: "Events",
    desc:  "Coverage that captures moments and atmosphere.",
    images: ["FFGirl.webp", "CloseUpPhone.webp", "FFDrawing.webp", "FFCrowd.webp",
      "Back of Crowd.webp", "FFLights.webp", "FFOutsideRestaurant.webp",
      "CloseUpBand.webp", "Stickers.webp"]
  },
  business: {
    title: "Business",
    desc:  "Product and lifestyle visuals for social and web.",
    subfolder: "lemonade",
    images: ["lemon01.webp", "lemon02.webp", "lemon03.webp", "lemon04.webp","lemon05.webp", 
      "lemon06.webp", "lemon07.webp", "lemon08.webp", "lemon09.webp","lemon10.webp"]
  },
  street: {
    title: "Street Photography",
    desc:  "Real places, real moments, real stories.",
    images: ["Bike.webp", "Daisys.webp", "DoorWithFlowers.webp", "GasPump.webp",
      "OutHouse.webp", "PurpleFlowers.webp", "Roses.webp", "Sign.webp", "Plants.webp"]
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
    const sub = set.subfolder ?? key;
    const src = img.startsWith("assets/") ? img : `assets/img/${key}/${sub}/${img}`;
    return `
      <div class="shot">
        <img src="${src}" alt="${set.title} photo" loading="lazy" />
      </div>
    `;
  })
  .join("");
}1