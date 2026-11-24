// Items without a route stay informational until their destination pages exist.
const CREATIVE_NAVIGATION = [
  { label: "Home", href: "#/", key: "home", type: "link" },
  {
    label: "Explore",
    key: "designs",
    spectrum: "explore",
    type: "menu",
    items: [
      { label: "Discover All", href: "#/designs" },
      { label: "Methods", href: "#/methods", key: "methods" },
      { label: "Trending Designs", placeholder: true },
      { label: "Latest Uploads", placeholder: true },
      { label: "Popular This Week", placeholder: true },
      { label: "Editor's Picks", placeholder: true },
      { label: "Featured Projects", placeholder: true },
      { label: "Most Appreciated", placeholder: true },
      { label: "Random Inspiration", placeholder: true },
    ],
  },
  {
    label: "Categories",
    key: "types",
    spectrum: "categories",
    type: "mega",
    groups: [
      {
        label: "Web & UI Design",
        spectrum: "web",
        items: [
          ["Website Design", "#/types"],
          ["Landing Pages", "#/designs?site=landing"],
          ["Login & Registration", "#/designs?site=registration"],
          ["Dashboard UI", "#/designs?site=dashboard"],
          ["E-commerce", "#/designs?site=shop"],
          ["Portfolio Websites", "#/designs?site=portfolio"],
          ["SaaS Interfaces"],
          ["Admin Panels"],
        ],
      },
      {
        label: "App Design",
        spectrum: "app",
        items: [
          ["Android Applications"],
          ["iOS Applications"],
          ["Mobile UI"],
          ["Finance Apps"],
          ["Shopping Apps"],
          ["Social Media Apps"],
          ["Education Apps"],
        ],
      },
      {
        label: "Architecture",
        spectrum: "architecture",
        items: [
          ["Modern Houses"],
          ["Luxury Villas"],
          ["Apartments"],
          ["Commercial Buildings"],
          ["Exterior Design"],
          ["Floor Plans"],
          ["Landscape Design"],
        ],
      },
      {
        label: "Interior & Home Decor",
        spectrum: "interiors",
        items: [
          ["Living Rooms"],
          ["Bedrooms"],
          ["Kitchens"],
          ["Bathrooms"],
          ["Furniture"],
          ["Lighting"],
          ["Office Interiors"],
          ["Small Spaces"],
        ],
      },
      {
        label: "3D & Digital Art",
        spectrum: "digital-art",
        items: [
          ["3D Modelling"],
          ["3D Characters"],
          ["Product Rendering"],
          ["Digital Illustration"],
          ["Game Assets"],
          ["Abstract Art"],
        ],
      },
      {
        label: "Animation & Motion",
        spectrum: "motion",
        items: [
          ["CSS Animations"],
          ["Website Interactions"],
          ["3D Animation"],
          ["Logo Animation"],
          ["Motion Graphics"],
          ["Loading Animations"],
        ],
      },
      {
        label: "Graphic Design",
        spectrum: "graphic",
        items: [
          ["Logo Design"],
          ["Brand Identity"],
          ["Posters"],
          ["Typography"],
          ["Packaging"],
          ["Social Media Design"],
        ],
      },
      {
        label: "Colors & Inspiration",
        spectrum: "inspiration",
        items: [
          ["Color Palettes"],
          ["Gradients"],
          ["Font Pairings"],
          ["Moodboards"],
          ["Textures"],
          ["Material Inspiration"],
        ],
      },
    ],
  },
  {
    label: "Creators",
    key: "creators",
    type: "menu",
    groups: [
      {
        label: "Discover",
        items: [
          "Discover Creators",
          "Featured Designers",
          "Top Artists",
          "New Creators",
          "Verified Creators",
        ].map((label) => ({ label, placeholder: true })),
      },
      {
        label: "Connect",
        items: ["Creative Studios", "Creator Rankings", "Find Collaborators"].map((label) => ({
          label,
          placeholder: true,
        })),
      },
    ],
  },
  {
    label: "Community",
    key: "community",
    type: "menu",
    groups: [
      {
        label: "Take part",
        items: ["Community Feed", "Design Challenges", "Competitions", "Events & Workshops"].map(
          (label) => ({ label, placeholder: true })
        ),
      },
      {
        label: "Share ideas",
        items: ["Discussions", "Feedback Requests", "Design Questions", "Collaboration"].map(
          (label) => ({ label, placeholder: true })
        ),
      },
    ],
  },
  {
    label: "Resources",
    key: "resources",
    type: "menu",
    groups: [
      {
        label: "Explore assets",
        items: [
          "Design Templates",
          "UI Kits",
          "Icons & Illustrations",
          "Fonts & Typography",
          "3D Assets",
          "Mockups",
          "Textures & Patterns",
        ].map((label) => ({ label, placeholder: true })),
      },
      {
        label: "Create & learn",
        items: ["Design Tools", "Color Tools", "Learning & Tutorials"].map((label) => ({
          label,
          placeholder: true,
        })),
      },
    ],
  },
];

const navigation = (() => {
  const nav = document.getElementById("mainNav");
  const navToggle = document.getElementById("navToggle");
  const searchDialog = document.getElementById("navSearchDialog");
  let accountIdentity = null;
  let focusToggleAfterRoute = false;
  let selectedDimension = null;

  function makeLink(item) {
    if (item.placeholder) {
      return `<span class="nav-placeholder">${item.label}<span>Coming soon</span></span>`;
    }
    return `<a href="${item.href}"${item.key ? ` data-nav="${item.key}"` : ""}>${item.label}</a>`;
  }

  function makeSection(item, index) {
    const id = `nav-panel-${index}`;
    let contents;
    if (item.type === "mega") {
      contents = `<div class="nav-panel mega-panel categories-panel" id="${id}" hidden>
        <div class="panel-heading"><span>THE CREATIVE INDEX</span><strong>Browse by discipline</strong></div>
        <div class="mega-groups">${item.groups
          .map(
            (group) => `<section class="mega-group" data-spectrum="${group.spectrum}"><h2><button class="dimension-trigger" type="button" aria-label="Highlight ${group.label} accent" aria-pressed="false">${group.label}</button></h2><div class="mega-links">${group.items
              .map(([label, href]) => makeLink({ label, href, placeholder: !href }))
              .join("")}</div></section>`
          )
          .join("")}</div>
      </div>`;
    } else if (item.key === "designs") {
      const [featured, ...links] = item.items;
      contents = `<div class="nav-panel explore-panel" id="${id}" hidden>
        <div class="panel-heading"><span>THE EDIT</span><strong>Explore the collection</strong></div>
        <a class="explore-feature" href="${featured.href}">
          <span><small>Start here</small><strong>${featured.label}</strong></span>
          <span class="feature-arrow" aria-hidden="true">↗</span>
        </a>
        <div class="explore-links">${links.map(makeLink).join("")}</div>
      </div>`;
    } else {
      contents = `<div class="nav-panel ${item.key}-panel" id="${id}" hidden>
        <div class="panel-heading"><span>${item.key === "creators" ? "PEOPLE & PRACTICE" : item.key === "community" ? "IN GOOD COMPANY" : "THE TOOLKIT"}</span><strong>${item.label}</strong></div>
        <div class="menu-groups">${item.groups
          .map(
            (group) => `<section class="menu-group"><h2>${group.label}</h2><div class="menu-group-links">${group.items
              .map(makeLink)
              .join("")}</div></section>`
          )
          .join("")}</div>
      </div>`;
    }
    return `<div class="nav-section nav-${item.key}-section" data-nav-section data-spectrum="${item.spectrum || item.key}">
      <button class="nav-trigger" type="button" data-nav="${item.key}" aria-expanded="false" aria-controls="${id}">${item.label}<span class="chevron" aria-hidden="true"></span></button>
      ${contents}
    </div>`;
  }

  function accountMarkup() {
    const user = typeof Api !== "undefined" ? Api.me() : null;
    const trigger = user ? escapeHtml(user.name) : "Account";
    const items = user
      ? `<a href="#/account">My Profile</a><a href="#/account">My Dashboard</a><span class="nav-placeholder">My Projects<span>Coming soon</span></span><span class="nav-placeholder">My Collections<span>Coming soon</span></span><span class="nav-placeholder">Following<span>Coming soon</span></span><span class="nav-placeholder">Account Settings<span>Coming soon</span></span><span class="nav-placeholder">Help &amp; Support<span>Coming soon</span></span><button class="nav-menu-action" id="navLogout" type="button">Log out</button>`
      : `<a href="#/login">Login</a><a href="#/register">Register</a>`;
    return `<div class="nav-section account-section" data-nav-section data-spectrum="account">
      <button class="nav-trigger account-trigger" type="button" aria-expanded="false" aria-controls="account-panel">${trigger}<span class="chevron" aria-hidden="true"></span></button>
      <div class="nav-panel account-panel" id="account-panel" hidden>${items}</div>
    </div>`;
  }

  function render() {
    const mainLinks = CREATIVE_NAVIGATION.map((item, index) =>
      item.type === "link"
        ? `<a class="nav-link" href="${item.href}" data-nav="${item.key}">${item.label}</a>`
        : makeSection(item, index)
    ).join("");
    nav.innerHTML = `<div class="nav-dock">
      ${mainLinks}
      <div class="nav-section nav-showcase-section" data-nav-section data-spectrum="showcase">
        <button class="showcase-button nav-trigger" type="button" aria-expanded="false" aria-controls="showcase-panel">
          <span>Showcase</span><span class="showcase-symbol" aria-hidden="true">+</span>
        </button>
        <div class="nav-panel showcase-panel" id="showcase-panel" hidden>
          <div class="showcase-heading"><span>MAKE IT VISIBLE</span><strong>Bring your work into view.</strong></div>
          <div class="showcase-actions">
            ${["Upload a Project", "Upload an Animation", "Upload a 3D Project", "Publish a Portfolio", "Manage My Projects"]
              .map((label) => `<span class="nav-placeholder showcase-action">${label}<span>Coming soon</span></span>`)
              .join("")}
          </div>
        </div>
      </div>
    </div>
    <div class="nav-tools">
        <button class="icon-button" id="navSearchButton" type="button" aria-label="Search" title="Search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 4.2 4.2"></path></svg></button>
        <div class="nav-section utility-section" data-nav-section data-spectrum="community">
          <button class="icon-button nav-trigger" id="navNotificationsButton" type="button" aria-label="Notifications" aria-expanded="false" aria-controls="notifications-panel" title="Notifications"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path><path d="M10 21h4"></path></svg></button>
          <div class="nav-panel utility-panel" id="notifications-panel" hidden><strong>Notifications</strong><p>Notifications will appear here when the community feed is connected.</p></div>
        </div>
        <div class="nav-section utility-section saved-section" data-nav-section data-spectrum="inspiration">
          <button class="icon-button nav-trigger" id="navSavedButton" type="button" aria-label="Saved designs" aria-expanded="false" aria-controls="saved-panel" title="Saved designs"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z"></path></svg></button>
          <div class="nav-panel utility-panel" id="saved-panel" hidden><strong>Saved designs</strong><p>Saved designs will be available when collections are connected.</p></div>
        </div>
        ${accountMarkup()}
        <div class="mode-switch" role="group" aria-label="Color mode">
          <button type="button" id="modeLight" data-theme-set="light" aria-label="Use light theme">Light</button>
          <button type="button" id="modeDark" data-theme-set="dark" aria-label="Use dark theme">Dark</button>
        </div>
    </div>`;
    sync();
  }

  function sync() {
    const route = (location.hash.slice(1).split("?")[0] || "/").replace(/^\/+/, "") || "home";
    nav.querySelectorAll("[data-nav]").forEach((link) => {
      const active = link.dataset.nav === route ||
        (route === "designs" && ["designs", "types"].includes(link.dataset.nav));
      link.classList.toggle("active", active);
      if (active && link.tagName === "A") link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    const user = typeof Api !== "undefined" ? Api.me() : null;
    const nextAccountIdentity = user ? user.id || user.email : "signed-out";
    const account = nav.querySelector(".account-section");
    if (account && accountIdentity !== nextAccountIdentity) {
      const expanded = account.querySelector(".nav-trigger").getAttribute("aria-expanded") === "true";
      const replacement = document.createElement("div");
      replacement.innerHTML = accountMarkup();
      const fresh = replacement.firstElementChild;
      account.replaceWith(fresh);
      if (expanded) setOpen(fresh, true);
      accountIdentity = nextAccountIdentity;
    }
    const accountTrigger = nav.querySelector(".account-trigger");
    if (accountTrigger) {
      accountTrigger.classList.toggle("active", ["account", "login", "register"].includes(route));
    }
    const openSection = nav.querySelector("[data-nav-section].is-open");
    setSpectrum(openSection?.dataset.spectrum || spectrumForRoute());
    const theme = document.documentElement.getAttribute("data-theme") || "dark";
    nav.querySelectorAll("[data-theme-set]").forEach((button) => {
      const selected = button.dataset.themeSet === theme;
      button.classList.toggle("on", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function spectrumForRoute() {
    const [path, query = ""] = (location.hash.slice(1) || "/").split("?");
    if (path === "/types") return "categories";
    if (path.startsWith("/designs")) {
      return new URLSearchParams(query).has("site") ? "web" : "explore";
    }
    return "brand";
  }

  function setSpectrum(spectrum) {
    nav.dataset.spectrum = spectrum;
  }

  function setOpen(section, open) {
    const trigger = section.querySelector(".nav-trigger");
    const panel = section.querySelector(".nav-panel");
    if (!trigger || !panel) return;
    if (open) {
      clearSelectedDimension();
      nav.querySelectorAll("[data-nav-section].is-open").forEach((other) => {
        if (other !== section) setOpen(other, false);
      });
    } else delete section.dataset.openedBy;
    section.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    if (open) setSpectrum(section.dataset.spectrum || "brand");
    else if (!nav.querySelector("[data-nav-section].is-open")) {
      clearSelectedDimension();
      setSpectrum(spectrumForRoute());
    }
  }

  function clearSelectedDimension() {
    selectedDimension = null;
    nav.querySelectorAll(".dimension-trigger[aria-pressed='true']").forEach((button) => {
      button.setAttribute("aria-pressed", "false");
    });
  }

  function selectDimension(group) {
    if (!group) return;
    selectedDimension = group.dataset.spectrum;
    nav.querySelectorAll(".dimension-trigger").forEach((button) => {
      const selected = button.closest(".mega-group") === group;
      button.setAttribute("aria-pressed", String(selected));
    });
    setSpectrum(selectedDimension);
  }

  function closeMenus() {
    nav.querySelectorAll("[data-nav-section].is-open").forEach((section) => setOpen(section, false));
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  }

  nav.addEventListener("click", (event) => {
    const logout = event.target.closest("#navLogout");
    if (logout) {
      Api.logout();
      render();
      closeMenus();
      toast("Signed out");
      route();
      return;
    }

    const dimensionTrigger = event.target.closest(".dimension-trigger");
    if (dimensionTrigger) {
      selectDimension(dimensionTrigger.closest(".mega-group"));
      return;
    }

    const searchButton = event.target.closest("#navSearchButton");
    if (searchButton) {
      document.getElementById("navSearchDialog").showModal();
      document.getElementById("navSearchInput").focus();
      return;
    }

    const trigger = event.target.closest(".nav-trigger");
    if (trigger) {
      const section = trigger.closest("[data-nav-section]");
      if (event.detail > 0 && section.classList.contains("is-open") && section.dataset.openedBy === "hover") {
        section.dataset.openedBy = "click";
        return;
      }
      const open = !section.classList.contains("is-open");
      setOpen(section, open);
      if (open) section.dataset.openedBy = "click";
      return;
    }

    if (event.target.closest("a[href]")) {
      const mobileOpen = nav.classList.contains("open");
      closeMenus();
      if (mobileOpen) navToggle.focus();
    }
  });

  nav.addEventListener("pointerover", (event) => {
    if (window.matchMedia("(max-width: 1280px)").matches) return;
    const group = event.target.closest(".mega-group[data-spectrum]");
    if (group && nav.contains(group)) {
      setSpectrum(group.dataset.spectrum);
      return;
    }
    const section = event.target.closest("[data-nav-section]");
    if (section && nav.contains(section) && !section.classList.contains("is-open")) {
      setOpen(section, true);
      section.dataset.openedBy = "hover";
    }
  });

  nav.addEventListener("pointerout", (event) => {
    if (window.matchMedia("(max-width: 1280px)").matches) return;
    const group = event.target.closest(".mega-group[data-spectrum]");
    if (group && !group.contains(event.relatedTarget)) {
      const openSection = nav.querySelector("[data-nav-section].is-open");
      setSpectrum(selectedDimension || openSection?.dataset.spectrum || spectrumForRoute());
    }
    const section = event.target.closest("[data-nav-section]");
    if (section && section.dataset.openedBy === "hover" && !section.contains(event.relatedTarget) && !section.contains(document.activeElement)) {
      setOpen(section, false);
    }
  });

  nav.addEventListener("focusin", (event) => {
    const group = event.target.closest(".mega-group[data-spectrum]");
    if (group) setSpectrum(group.dataset.spectrum);
  });

  nav.addEventListener("focusout", (event) => {
    const group = event.target.closest(".mega-group[data-spectrum]");
    if (group && !group.contains(event.relatedTarget)) {
      const openSection = nav.querySelector("[data-nav-section].is-open");
      setSpectrum(selectedDimension || openSection?.dataset.spectrum || spectrumForRoute());
    }
  });

  navToggle.addEventListener("click", () => {
    const open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    if (!open) closeMenus();
  });

  document.addEventListener("pointerdown", (event) => {
    if (!nav.contains(event.target) && !navToggle.contains(event.target) && !searchDialog.contains(event.target)) {
      closeMenus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (document.getElementById("navSearchDialog").open) return;
      const openSection = nav.querySelector("[data-nav-section].is-open");
      const mobileOpen = nav.classList.contains("open");
      closeMenus();
      if (mobileOpen) navToggle.focus();
      else if (openSection) openSection.querySelector(".nav-trigger").focus();
    }
  });

  document.getElementById("navSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("navSearchInput").value.trim();
    document.getElementById("navSearchDialog").close();
    const mobileOpen = nav.classList.contains("open");
    closeMenus();
    const nextHash = `#/designs${query ? `?q=${encodeURIComponent(query)}` : ""}`;
    if (mobileOpen && location.hash !== nextHash) focusToggleAfterRoute = true;
    location.hash = nextHash;
    if (mobileOpen && !focusToggleAfterRoute) navToggle.focus();
  });

  document.getElementById("navSearchClose").addEventListener("click", () => {
    document.getElementById("navSearchDialog").close();
  });

  document.getElementById("navSearchDialog").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  });

  window.addEventListener("hashchange", () => {
    closeMenus();
    sync();
    if (focusToggleAfterRoute) {
      focusToggleAfterRoute = false;
      navToggle.focus();
    }
  });

  render();
  return { close: closeMenus, sync };
})();
